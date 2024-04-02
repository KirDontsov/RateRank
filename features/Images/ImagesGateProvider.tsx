'use client';
import { $firm, ImagesGate, ReviewsGate, ReviewsPageGate } from '@/api';
import { CommonProps } from '@/shared';
import { useGate, useUnit } from 'effector-react';
import { FC } from 'react';

export interface ImagesGateProviderProps {
  firmId: string;
}

export const ImagesGateProvider: FC<ImagesGateProviderProps & CommonProps> = ({ children, firmId }) => {
  const { firm } = useUnit({
    firm: $firm,
  });

  useGate(ImagesGate, { firmId: firmId ?? firm?.firm_id });

  return <>{children}</>;
};
