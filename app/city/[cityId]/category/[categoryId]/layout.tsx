'use client';
import { CategoryGate } from '@/api';
import { CommonProps } from '@/shared/types';
import { useGate } from 'effector-react';

export default function CategoryLayout({
  children,
  params,
}: CommonProps & {
  params: {
    categoryId: string;
  };
}) {
  const { categoryId } = params;

  useGate(CategoryGate, { categoryId });
  return <>{children}</>;
}
