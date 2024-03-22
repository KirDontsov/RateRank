'use client';
import { FC } from 'react';
import { CommonProps } from '@/shared';
import { FirmsGate } from '@/api';
import { useGate } from 'effector-react';

export const FirmsGateProvider: FC<CommonProps> = ({ children }) => {
  useGate(FirmsGate);
  return <>{children}</>;
};
