'use server'

import db from "@/utils/db"
import { auth, currentUser } from "@clerk/nextjs/server"
import {redirect} from 'next/navigation'
import { imageSchema, productSchema, reviewSchema, validateWithZodSchema } from "./schemas"
import { uploadImage, deleteImage } from "./supabase"
import { revalidatePath } from "next/cache"
import { string } from "zod"
import { Cart } from "@prisma/client"
const getAuthUser = async () => {
    const user = await currentUser();
    if(!user) redirect('/')
    return user;
}

const getAdminUser = async () => {
    const user = await getAuthUser();
    if(user.id !== process.env.ADMIN_USER_ID) redirect('/')
    return user;
}

const renderError = (error:unknown):{message:string}=>{
    console.log(error);
    return {message:error instanceof Error ? error.message : 'An unknown error occurred'}
}

export const fetchFeaturedProducts = async () => {
    try {
        const products = await db.product.findMany({
            where: {
                featured: true
            }
        })
        return products
    } catch (error) {
        console.error('Error fetching featured products:', error);
        return []
    }
}

export const fetchAllProducts = async ({search}:{search:string}) => {
    return db.product.findMany({
        orderBy:{
            createdAt:'desc',
        },
        where:{
            OR:[
                {name:{contains:search, mode:'insensitive'}},
                {company:{contains:search, mode:'insensitive'}},
            ]
        }
    })
}

export const fetchSingleProduct = async (productId:string) => {
    const product = await db.product.findUnique({
        where:{
            id:productId,
        }
    })
    if(!product) redirect('/products')
    return product
}

export const createProduct = async(prevState:any, formData:FormData):Promise<{message:string}> => {
        const user = await getAuthUser();
    try {
        const rawData = Object.fromEntries(formData)
        const file =  formData.get('image') as File;
        const validatedFields = validateWithZodSchema(productSchema, rawData);
        const validatedFile = validateWithZodSchema(imageSchema, {image:file});
        const fullPath = await uploadImage(validatedFile.image);
        await db.product.create({
            data:{
                ...validatedFields,
                image:fullPath,
                clerkId:user.id,
            }
        })
        
    } catch (error) {
        return renderError(error);
    }
    redirect('/admin/products')
}

export const fetchAdminProducts = async () => {
    await getAdminUser();
    const products = await db.product.findMany({
        orderBy:{
            createdAt:'desc',
        }
    })
    return products;
}

export const deleteProduct = async (prevState:{productId:string}) => {
    const {productId} = prevState;
    await getAdminUser();
    try {
        const product = await db.product.delete({
            where:{
                id: productId,
            }
        })
        await deleteImage(product.image)
        revalidatePath('/admin/products')
        return {message:'Product deleted successfully'}
    } catch (error) {
        return renderError(error);
    }
}

export const fetchAdminProductDetails = async (productId:string) => {
    await getAdminUser();
    const product = await db.product.findUnique({
        where:{
            id:productId,
        },
    });
    if(!product) redirect('/admin/products')
    return product;
}

export const updateProductAction = async (prevState:any, formData:FormData) => {
    await getAdminUser();
    try {
        const productId = formData.get('id') as string;
        const rawData = Object.fromEntries(formData);
        const validatedFields = validateWithZodSchema(productSchema, rawData);

        await db.product.update({
            where:{
                id:productId,
            },
            data:{
                ...validatedFields,
            }
        })
        revalidatePath(`/admin/products/${productId}/edit`)
        return {message:'Product updated successfully'}
    } catch (error) {
        return renderError(error);
    }
}

export const updateProductImageAction = async (prevState:any, formData:FormData) => {
    await getAdminUser();
    try {
        const image = formData.get('image') as File;
        const productId = formData.get('id') as string;
        const oldImageUrl = formData.get('url') as string;
        const validatedFile = validateWithZodSchema(imageSchema, {image});
        const fullPath = await uploadImage(validatedFile.image);
        await deleteImage(oldImageUrl);
        await db.product.update({
            where:{
                id:productId,
            },
            data:{
                image:fullPath,
            },
        });
        revalidatePath(`/admin/products/${productId}/edit`)
        return {message:'Product image updated successfully'}
    } catch (error) {
        return renderError(error);
    }
}

export const fetchFavoriteId = async ({productId}:{productId:string})=>{
    const user = await getAuthUser();
    const favorite = await db.favorite.findFirst({
        where:{
            productId,
            clerkId:user.id,
        },
        select:{
            id:true,
        }
    })
    return favorite?.id || null;
}

export const toggleFavoriteAction = async (prevState:{
    productId:string;
    favoriteId: string | null;
    pathname:string;
})=>{
    const user = await getAuthUser();
    const {productId, favoriteId, pathname} = prevState;
    try {
        if(favoriteId){
            await db.favorite.delete({
                where:{
                    id: favoriteId,
                }
            })
        } else{
            await db.favorite.create({
                data:{
                    productId,
                        clerkId:user.id,
                    }
            })
        }
        revalidatePath(pathname)
        return {message: favoriteId ? 'Removed from favorites' : 'Added to favorites'}
    } catch (error) {
        return renderError(error);
    }
}

export const fetchUserFavorites = async () =>{
    const user = await getAuthUser();
    const favorites = await db.favorite.findMany({
        where:{
            clerkId:user.id,
        },
        include:{
            product:true,
        },
    })
    return favorites;
}

export const createReview = async (prevState:any, formData:FormData) => {
    const user = await getAuthUser();
    try {
        const rawData = Object.fromEntries(formData)
        const validatedFields = validateWithZodSchema(reviewSchema, rawData);
        await db.review.create({
            data:{
                ...validatedFields,
                clerkId:user.id,
            }
        })
        revalidatePath(`/products/${validatedFields.productId}`)
        return {message:'Review created successfully'}
    } catch (error) {
        return renderError(error);
    }
}

export const fetchProductReviews = async (productId:string) => {
    const reviews = await db.review.findMany({
        where:{
            productId,
        },
        orderBy:{
            createdAt:'desc',
        },
    })
    return reviews;
};

export const fetchProductRating = async (productId:string) => {
    const result = await db.review.groupBy({
        by: ['productId'],
        _avg:{
            rating: true,
        },
        _count:{
            rating: true,
        },
        where:{
            productId,
        }
    })
    return {
        rating: result[0]?._avg.rating?.toFixed(1) || 0,
        count: result[0]?._count.rating || 0,
    }
};

export const fetchProductReviewsByUser = async () => {
    const user = await getAuthUser();
    const reviews = await db.review.findMany({
        where:{
            clerkId:user.id,
        },
        select:{
            id:true,
            rating:true,
            comment:true,
            product:{
                select:{
                    name:true,
                    image:true,
                }
            }
        }
    })
    return reviews;
};

export const deleteReviewAction = async (prevState:{reviewId:string}) => {
    const {reviewId} = prevState;
    const user = await getAuthUser();
    try {
        await db.review.delete({
            where:{
                id:reviewId,
                clerkId:user.id,
            }
        })
        revalidatePath('/reviews')
        return {message:'Review deleted successfully'}
    } catch (error) {
        return renderError(error);
    }
};

export const findExistingReview = async (userId:string, productId:string) => {
    return db.review.findFirst({
        where:{
            clerkId:userId,
            productId,
        }
    })
};

export const fetchCartItems = async () => {
    const {userId} = await auth();
    const cart = await db.cart.findFirst({
        where:{
            clerkId:userId ?? ' ', 
        },
        select: {
            numItemsInCart:true,
        }
    })
    return cart?.numItemsInCart || 0;
};

const fetchProduct = async (productId:string) => {
    const product = await db.product.findUnique({
        where:{
            id:productId,
        },
    });
    if(!product){
        throw new Error('Product not found');
    }
    return product;
};

const includeProductClause = {
    cartItems:{
            include:{
                product:true,
            },
        },
};

export const fetchOrCreateCart = async ({userId, errorOnFailure=false}:{userId:string, errorOnFailure?:boolean}) => {
    let cart = await db.cart.findFirst({
        where:{
            clerkId:userId,
        },
        include:includeProductClause,
    })
    if(!cart && errorOnFailure){
        throw new Error('Cart not found');
    }
    if(!cart){
        cart = await db.cart.create({
            data:{
                clerkId:userId,
            },
            include:includeProductClause,
        })
    }
    return cart;
};

const updateOrCreateCartItem = async ({productId, cartId, amount}:{productId:string, cartId:string, amount:number}) => {
    let cartItem = await db.cartItem.findFirst({
        where:{
            productId,
            cartId,
        }
    })
    if(cartItem){
        cartItem = await db.cartItem.update({
            where:{
                id:cartItem.id,
            },
            data:{
                amount: cartItem.amount + amount,
            },
        })
    } else{
        cartItem = await db.cartItem.create({
            data:{
                productId,
                cartId,
                amount,
            }
        })
    }
}

export const updateCart = async (cart:Cart) => {
    const cartItems = await db.cartItem.findMany({
        where:{
            cartId:cart.id,
        },
        include:{
            product:true,
        },
        orderBy:{
            createdAt:'asc',
        }
    })
    let numItemsInCart = 0;
    let cartTotal = 0;
    for(const item of cartItems){
        numItemsInCart += item.amount;
        cartTotal += item.amount * item.product.price;
    }
    const tax = cartTotal * cart.taxRate;
    const shipping = cartTotal? cart.shipping : 0;
    const orderTotal = cartTotal + tax + shipping;
    const currentCart = await db.cart.update({
        where:{
            id:cart.id,
        },
        data:{
            numItemsInCart,
            cartTotal,
            tax,
            orderTotal,
        },
        include:includeProductClause,
    })
    return {cartItems, currentCart}
};

export const addToCartAction = async (prevState:any, formData:FormData) => {
    const user = await getAuthUser();
    try {
        const productId = formData.get('productId') as string;
        const amount = Number(formData.get('amount'));
        await fetchProduct(productId);
        const cart = await fetchOrCreateCart({userId:user.id});
        await updateOrCreateCartItem({productId, cartId: cart.id, amount});
        await updateCart(cart)
    } catch (error) {
        return renderError(error);
    }
    redirect('/cart')
};

export const removeCartItemAction = async (
  prevState: any,
  formData: FormData
) => {
    const user = await getAuthUser();
    try {
        const cartItemId = formData.get('id') as string;
        const cart = await fetchOrCreateCart({
            userId:user.id,
            errorOnFailure:true,
        });
        await db.cartItem.delete({
            where:{
                id:cartItemId,
                cartId:cart.id,
            }
        })
        await updateCart(cart);
        revalidatePath('/cart');
        return { message: "Item removed from cart" };
    } catch (error) {
        return renderError(error);
    }
};

export const updateCartItemAction = async ({amount, cartItemId}:{amount:number, cartItemId:string}) => {
    const user = await getAuthUser();
    try {
        const cart = await fetchOrCreateCart({
            userId:user.id, 
            errorOnFailure:true,
        });
        await db.cartItem.update({
            where:{
                id:cartItemId,
                cartId: cart.id,
            },
            data:{
                amount,
            }
        })
        await updateCart(cart);
        revalidatePath('/cart');
        return {message:'Cart item updated successfully'}
    } catch (error) {
        return renderError(error);
    }
};

export const createOrderAction = async (prevState:any, formData:FormData) => {
    const user = await getAuthUser();
    try {
        const cart = await fetchOrCreateCart({
            userId:user.id,
            errorOnFailure:true,
        })
        const order = await db.order.create({
            data:{
                clerkId:user.id,
                products:cart.numItemsInCart,
                orderTotal:cart.cartTotal,
                tax:cart.tax,
                shipping:cart.shipping,
                email:user.emailAddresses[0].emailAddress,
            }
        })
        await db.cart.delete({
            where:{
                id:cart.id,
            }
        })   

    } catch (error) {
        return renderError(error);
    }
    redirect('/orders')
}

export const fetchUserOrders = async () =>{
    const user = await getAuthUser();
    const orders = await db.order.findMany({
        where:{
            clerkId:user.id,
            isPaid:true,
        },
        orderBy:{
            createdAt:'desc',
        },
    })
    return orders;
}

export const fetchAdminOrders = async () =>{
     await getAdminUser();

    const orders = await db.order.findMany({
        where:{
            isPaid:true,
        },
        orderBy:{
            createdAt:'desc',
        }
    })
    return orders;
}