'use server';

import type { Post } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export const getAllWorkplaces = async (): Promise<Post[]> => {
  return [];

  return await prisma.post.findMany();
};

export const getWorkplaceById = async (
  id: number,
): Promise<Post | null> => {
  return null;

  return await prisma.post.findUnique({
    where: {
      id,
    },
  });
};

export const deleteWorkplaceById = async (id: number): Promise<boolean> => {
  return !!(await prisma.post.delete({
    where: {
      id,
    },
  }));
};
