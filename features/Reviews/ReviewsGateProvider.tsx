'use client';
import { $firm, ReviewsGate, ReviewsPageGate } from '@/api';
import { CommonProps } from '@/shared';
import { useGate, useUnit } from 'effector-react';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

export const ReviewsGateProvider: FC<CommonProps> = ({ children }) => {
  const searchParams = useSearchParams();

  const { firm } = useUnit({
    firm: $firm,
  });

  const firmId = firm?.firm_id ?? '';

  useGate(ReviewsPageGate, Number(searchParams.get('reviewsPage')) || 1);
  useGate(ReviewsGate, { firmId });

  return <>{children}</>;
};
