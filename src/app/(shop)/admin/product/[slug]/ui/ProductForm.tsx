"use client";

import { useForm } from 'react-hook-form';

import { Category, Product } from '@/interfaces';
import clsx from 'clsx';

interface Props {
  product: Product;
  categories: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: 'men'|'women'|'kid'|'unisex',
  categoryId: string;
}

export const ProductForm = ({ product, categories }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags.join(', '),
      sizes: product.sizes ?? [],
    }
  });

  const onSubmit = async( data: FormInputs ) => {
    console.log({ data });
  }

  return (
    <form onSubmit={ handleSubmit( onSubmit ) } className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      {/* Texts */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Title</span>
          <input type="text" className="p-2 border border-gray-200 rounded-md bg-gray-200" {...register('title', { required: true })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input type="text" className="p-2 border border-gray-200 rounded-md bg-gray-200" {...register('slug', { required: true })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Description</span>
          <textarea
            rows={5}
            className="p-2 border border-gray-200 rounded-md bg-gray-200"
            {...register('description', { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input type="number" className="p-2 border border-gray-200 rounded-md bg-gray-200" {...register('price', { required: true, min: 0 })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input type="text" className="p-2 border border-gray-200 rounded-md bg-gray-200" {...register('tags', { required: true })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select className="p-2 border border-gray-200 rounded-md bg-gray-200" {...register('gender', { required: true })}>
            <option value="">[Select]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Category</span>
          <select className="p-2 border border-gray-200 rounded-md bg-gray-200" {...register('categoryId', { required: true })}>
            <option value="">[Select]</option>
            {
              categories.map(category => (
                <option key={ category.id } value={ category.id }>{ category.name }</option>
              ))
            }
          </select>
        </div>

        <button
          // disabled={ isValid }
          // className={
          //   clsx(
          //     "btn-primary w-full",
          //     { 'btn-primary': isValid, 'btn-disabled': !isValid }
          //   )
          // }
          // type="submit"
          className="btn-primary w-full"
        >
            Save
        </button>
      </div>

      {/* Sizes and photos selectos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Sizes</span>
          <div className="flex flex-wrap">
            { sizes.map((size) => (
              // bg-blue-500 text-white <--- if it is selected
              <div
                key={size}
                className="flex items-center justify-center w-10 h-10 mr-2 border border-gray-200 rounded-md"
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Images</span>
            <input
              type="file"
              multiple
              className="p-2 border border-gray-200 rounded-md bg-gray-200"
              accept="image/png, image/jpeg"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
