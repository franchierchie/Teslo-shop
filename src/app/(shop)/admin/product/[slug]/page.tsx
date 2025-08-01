import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
  params: Promise<{ slug?: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [ product, categories ] = await Promise.all([
    getProductBySlug( slug!.toString() ),
    getCategories(),
  ]);

  if ( !product ) {
    redirect('/admin/products');
  }

  const title = slug!.toString() === 'new' ? 'New Product' : 'Edit Product';

  return (
    <>
      <Title title={ title } />

      <ProductForm product={ product } categories={ categories } />
    </>
  );
}