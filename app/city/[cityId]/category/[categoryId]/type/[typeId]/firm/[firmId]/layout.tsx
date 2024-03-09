'use client';
import { FirmGate, ReviewsGate } from '@/shared';
import { OaiReviewsGate } from '@/shared';
import { CommonProps } from '@/shared/types';
import { EffectorNext } from '@effector/next';
import { useGate } from 'effector-react';

export interface FirmPageParams {
  params: {
    firmId: string;
  };
}

export default function FirmLayout({ children, params }: CommonProps & FirmPageParams) {
  useGate(FirmGate, { firmId: params.firmId });

  return <EffectorNext>{children}</EffectorNext>;
}
