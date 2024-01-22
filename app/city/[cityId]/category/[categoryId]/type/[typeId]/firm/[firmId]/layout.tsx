'use client';
import { FirmGate, FirmsGate, ReviewsGate } from '@/api';
import { CenteredContainer, HeroSection, Nav } from '@/components';
import { CommonProps } from '@/shared/types';
import { useGate } from 'effector-react';

export interface FirmPageParams {
  params: {
    cityId: string;
    categoryId: string;
    typeId: string;
    firmId: string;
  };
}

export default function FirmLayout({ children, params }: CommonProps & FirmPageParams) {
  // TODO: запросить инфо по firm_id
  useGate(FirmGate, { firmId: params.firmId });
  useGate(ReviewsGate, { firmId: params.firmId });

  return <>{children}</>;
}
