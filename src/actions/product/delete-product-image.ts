'use server';

import { prisma } from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const deleteProductImage = async( imageId: number, imageUrl: string ) => {
  if ( !imageUrl.startsWith('http')  ) {
    return {
      ok: false,
      message: 'The image could not be deleted.',
    }
  }

  const imageName = imageUrl.split('/').pop()
    ?.split('.')[0] ?? '';

  try {
    await cloudinary.uploader.destroy( imageName );
    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    // Revalidate paths
    revalidatePath(`/admin/products`);
    revalidatePath(`/admin/products/${ deletedImage.product.slug }`);
    revalidatePath(`/product/${ deletedImage.product.slug }`);
    
  } catch (error) {
    console.log( error );
    return {
      ok: false,
      message: 'There was an error deleting the image.',
    }
  }
}
