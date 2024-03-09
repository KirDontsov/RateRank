'use client';
import { CategoryGate } from '@/shared';
import { CommonProps } from '@/shared/types';
import { EffectorNext } from '@effector/next';
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
  return <EffectorNext>{children}</EffectorNext>;
}
