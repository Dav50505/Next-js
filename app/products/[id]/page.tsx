import BreadCrumbs from '@/components/single-product/BreadCrumbs';
import { fetchSingleProduct, findExistingReview } from '@/utils/actions';
import Image from 'next/image';
import { formatCurrency } from '@/utils/format';
import FavoriteToggleButton from '@/components/products/FavoriteToggleButton';
import AddToCart from '@/components/single-product/AddToCart';
import ProductRating from '@/components/single-product/ProductRating';
import ShareButton from '@/components/single-product/ShareButton';
import SubmitReview from '@/components/reviews/SubmitReview';
import ProductReviews from '@/components/reviews/ProductReviews';
import {auth} from '@clerk/nextjs/server'

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SingleProductPage({ params }: Props) {
  try {
    const { id } = await params;
    const product = await fetchSingleProduct(id);
    
    if (!product) {
      return <div>Product not found</div>;
    }

    const {name, image, company, description, price} = product;
    const dollarsAmount = formatCurrency(price);
    const { userId } = await auth();
    const reviewDoesNotExist = userId ? !(await findExistingReview(userId, product.id)) : false;

    return (
      <section>
          <BreadCrumbs name={name}/>
          <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
              <div className='relative h-96'>
                  <Image src={image} alt={name} 
                  fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                   priority className='w-full rounded-lg object-cover' />
              </div>
              <div>
                  <div className='flex items-center justify-between'>
                      <h1 className='capitalize text-3xl font-bold'>{name}</h1>
                      <div className="flex items-center gap-2">
                          <ShareButton productId={id} name={name} />
                          <FavoriteToggleButton productId={id}/>
                      </div>
                  </div>
                  <ProductRating productId={id}/>
                  <h4 className='text-xl mt-2'>{company}</h4>
                  <p className='mt-3 text-xl font-bold bg-muted p-2 rounded-md inline-block'>
                      {dollarsAmount}
                  </p>
                  <p className='mt-6 leading-8 text-muted-foreground'>{description}</p>
                  <AddToCart productId={id} />
              </div>
          </div>
          <ProductReviews productId={id}/>
          {reviewDoesNotExist && <SubmitReview productId={id}/>}
      </section>
    );
  } catch (error) {
    console.error('Error in SingleProductPage:', error);
    return <div>Error loading product</div>;
  }
} 