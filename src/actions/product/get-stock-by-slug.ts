import { prisma } from '@/lib/prisma';

export const getStockBySlug = async( slug: string ): Promise<number> => {
  try {
    const stock = await prisma.product.findFirst({
      where: {
        slug: slug,
      },
      select: { inStock: true },
    });

    return stock?.inStock ?? 0;
    
  } catch (error) {
    console.log( error );
    throw new Error('There was an error obtaining stock by slug');
  }
}
