export const revalidate = 60; // 60 seconds

import { redirect } from 'next/navigation';

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const { page: pageParams } = await searchParams;
  const page = pageParams ? parseInt( pageParams ) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page });

  if ( products.length === 0 ) {
    redirect('/');
  }

  return (
    <>
      <Title
        title="Shop"
        subtitle="All products"
        className="mb-2"
      />

      <ProductGrid products={ products } />

      <Pagination totalPages={ totalPages } />
    </>
  );
}
