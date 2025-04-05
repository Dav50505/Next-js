import { PrismaClient } from '@prisma/client';
import products from './products.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  
  for (const product of products) {
    const result = await prisma.product.create({
      data: {
        name: product.name,
        company: product.company,
        description: product.description,
        featured: product.featured,
        image: product.image,
        price: product.price,
        clerkId: product.clerkId,
      },
    });
    console.log(`Created product with id: ${result.id}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 