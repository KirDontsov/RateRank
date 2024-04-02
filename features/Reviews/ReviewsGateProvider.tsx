'use client';
import { $firm, OaiReviewsGate, ReviewsGate, ReviewsPageGate } from '@/api';
import { CommonProps } from '@/shared';
import { useGate, useUnit } from 'effector-react';
import { FC } from 'react';

export interface ReviewsGateProviderProps {
  firmId: string;
  reviewsPage: number;
}

export const ReviewsGateProvider: FC<ReviewsGateProviderProps & CommonProps> = ({ children, firmId, reviewsPage }) => {
  const { firm } = useUnit({
    firm: $firm,
  });

  useGate(ReviewsGate, { firmId: firmId ?? firm?.firm_id });
  useGate(ReviewsPageGate, reviewsPage);
  useGate(OaiReviewsGate, { firmId: firmId ?? firm?.firm_id });

  return <>{children}</>;
};
