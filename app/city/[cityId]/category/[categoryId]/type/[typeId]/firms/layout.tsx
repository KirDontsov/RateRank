'use client';
import { FirmsGate } from '@/api';
import { CommonProps } from '@/shared/types';
import { useGate } from 'effector-react';

export default function FirmsLayout({ children }: CommonProps) {
  useGate(FirmsGate);
  return <>{children}</>;
}
