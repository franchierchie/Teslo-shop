import { notFound } from 'next/navigation';

import { initialData } from '@/seed/seed';
import { titleFont } from '@/config/fonts';
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector } from '@/components';

interface Props {
  params: {
    slug: string;
  }
}

export default async function({ params }: Props) {
  const { slug } = await params;
  const product = initialData.products.find(prod => prod.slug === slug);

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
        <h1 className={`${ titleFont.className } antialiased font-bold text-xl`}>
          { product.title }
        </h1>

        <p className="text-lg mb-5">${ product.price.toFixed(2) }</p>

        {/* Sizes */}
        <SizeSelector
          availableSizes={ product.sizes }
          selectedSize={ product.sizes[0] }
        />

        {/* Amount */}
        <QuantitySelector quantity={ 1 } />

        <button
          className="btn-primary my-5"
        >
          Add to cart
        </button>

        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{ product.description }</p>
      </div>
    </div>
  );
}