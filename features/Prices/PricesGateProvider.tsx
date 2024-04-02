'use client';
import { $firm, PricesGate } from '@/api';
import { CommonProps } from '@/shared';
import { useGate, useUnit } from 'effector-react';
import { FC } from 'react';

export interface PricesGateProvider {
  firmId: string;
}

export const PricesGateProvider: FC<PricesGateProvider & CommonProps> = ({ children, firmId }) => {
  const { firm } = useUnit({
    firm: $firm,
  });

  useGate(PricesGate, { firmId: firmId ?? firm?.firm_id });

  return <>{children}</>;
};
