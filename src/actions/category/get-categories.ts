'use server';

import { prisma } from "@/lib/prisma";

export const getCategories = async() => {
  try {
    const categories = prisma.category.findMany({
      orderBy: {
        name: 'asc',
      }
    });

    return categories;
    
  } catch (error) {
    console.log( error );
    return [];
  }
}
