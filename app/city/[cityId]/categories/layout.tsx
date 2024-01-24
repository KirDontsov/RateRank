'use client';
import { CategoriesGate } from '@/api';
import { CommonProps } from '@/shared/types';
import { useGate } from 'effector-react';

export default function CategoriesLayout({ children }: CommonProps) {
  useGate(CategoriesGate);
  return <>{children}</>;
}
