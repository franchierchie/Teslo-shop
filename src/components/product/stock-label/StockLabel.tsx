import { getStockBySlug } from '@/actions';
import { titleFont } from '@/config/fonts';
import { Suspense } from 'react';


interface Props {
  slug: string;
}

export const StockLabel = async({ slug }: Props) => {
  const inStock = await getStockBySlug( slug );

  return (
    <Suspense fallback={(
      <h1 className={`${ titleFont.className } antialiased font-bold text-lg bg-gray-200 animate-pulse`}>
        &nbsp;
      </h1> 
    )}>
      <h1 className={`${ titleFont.className } antialiased font-bold text-lg`}>
        Stock: { inStock }
      </h1>
    </Suspense>
  )
}

{/* <h1 className={`${ titleFont.className } antialiased font-bold text-lg bg-gray-200 animate-pulse`}>
  &nbsp;
</h1> */}