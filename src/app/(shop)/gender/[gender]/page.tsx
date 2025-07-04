export const revalidate = 60; // 60 seconds

import { redirect } from 'next/navigation';
import { Gender } from '@/generated/prisma';

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';

interface Props {
  params: Promise<{ gender: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function GenderByPage({ params, searchParams }: Props) {
  const { gender } = await params;
  const { page: pageParams } = await searchParams;
  const page = pageParams ? parseInt( pageParams ) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender,
  });

  if ( products.length === 0 ) {
    redirect(`/gender/${ gender }`);
  }

  return (
    <>
      <Title
        title={`${ gender }'s Articles`}
        className="mb-2 first-letter:uppercase"
      />

      <ProductGrid products={ products } />

      <Pagination totalPages={ totalPages } />
    </>
  );
}