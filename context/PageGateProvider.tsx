'use client';
import { CommonProps } from '@/shared';
import { useGate } from 'effector-react';
import { FC } from 'react';
import { CategoriesGate, CitiesGate, FirmsGate } from '@/shared';

export const PageGateProvider: FC<CommonProps> = ({ children }) => {
  useGate(CitiesGate);
  useGate(CategoriesGate);
  useGate(FirmsGate);

  return <>{children}</>;
};
