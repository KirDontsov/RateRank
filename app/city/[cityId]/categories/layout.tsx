'use client';
import { CategoriesGate } from '@/shared';
import { CommonProps } from '@/shared/types';
import { EffectorNext } from '@effector/next';
import { useGate } from 'effector-react';

export default function CategoriesLayout({ children }: CommonProps) {
  useGate(CategoriesGate);
  return <EffectorNext>{children}</EffectorNext>;
}
