export const revalidate = 604800; // 7 days

import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import { titleFont } from '@/config/fonts';
import { ProductMobileSlideshow, ProductSlideshow, StockLabel } from '@/components';
import { getProductBySlug } from '@/actions';
import { AddToCart } from './ui/AddToCart';

interface Props {
  params: Promise<{ slug: string }>;
}


export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug

  // fetch data
  const product = await getProductBySlug( slug );

  return {
    title: product?.title ?? 'Product Not Found',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Product Not Found',
      description: product?.description ?? '',
      images: [`/products/${ product?.images[1] }`],
    }
  }
}


export default async function ProductBySlugPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug( slug );

  if ( !product ) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
        {/* Mobile slideshow */}
        <ProductMobileSlideshow
          title={ product.title }
          images={ product.images }
          className="block md:hidden"
        />

        {/* Desktop slideshow */}
        <ProductSlideshow
          title={ product.title }
          images={ product.images }
          className="hidden md:block"
        />
      </div>

      {/* Details */}
      <div className="col-span-1 px-5">
        <StockLabel slug={ slug } />

        <h1 className={`${ titleFont.className } antialiased font-bold text-xl`}>
          { product.title }
        </h1>

        <p className="text-lg mb-5">${ product.price.toFixed(2) }</p>

        <AddToCart product={ product } />

        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{ product.description }</p>
      </div>
    </div>
  );
}