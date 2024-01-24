'use client';
import { FirmGate, ReviewsGate } from '@/api';
import { CommonProps } from '@/shared/types';
import { useGate } from 'effector-react';

export interface FirmPageParams {
  params: {
    firmId: string;
  };
}

export default function FirmLayout({ children, params }: CommonProps & FirmPageParams) {
  useGate(FirmGate, { firmId: params.firmId });
  useGate(ReviewsGate, { firmId: params.firmId });

  return <>{children}</>;
}
