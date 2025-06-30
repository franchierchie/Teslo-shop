import { ProductGrid, Title } from '@/components';
import { initialData } from '@/seed/seed';
// import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  }
}

const seedProducts = initialData.products;

export default async function({ params }: Props) {
  const { id } = await params;

  const products = seedProducts.filter(prod => prod.gender === id);

  // if ( id === 'kids' ) {
  //   notFound();
  // }

  return (
    <>
      <Title
        title={`${ id }'s Articles`}
        className="mb-2 first-letter:uppercase"
      />

      <ProductGrid products={ products } />
    </>
  );
}