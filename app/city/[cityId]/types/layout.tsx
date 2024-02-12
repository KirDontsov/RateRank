'use client';
import { TypesGate } from '@/shared';
import { CommonProps } from '@/shared/types';
import { useGate } from 'effector-react';

export default function TypesLayout({ children }: CommonProps) {
  useGate(TypesGate);
  return <>{children}</>;
}
