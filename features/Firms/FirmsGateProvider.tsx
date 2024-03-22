'use client';
import { FC } from 'react';
import { CommonProps } from '@/shared';
import { FirmsGate, FirmsPageGate } from '@/api';
import { useGate } from 'effector-react';
import { useSearchParams } from 'next/navigation';

export const FirmsGateProvider: FC<CommonProps> = ({ children }) => {
  const searchParams = useSearchParams();
  useGate(FirmsPageGate, Number(searchParams?.get('firmsPage')) || 1);
  useGate(FirmsGate);
  return <>{children}</>;
};
