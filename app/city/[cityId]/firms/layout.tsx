'use client';
import { FirmsGate } from '@/shared';
import { CommonProps } from '@/shared/types';
import { useGate } from 'effector-react';

export default function FirmsLayout({ children }: CommonProps) {
  useGate(FirmsGate);
  return <>{children}</>;
}
