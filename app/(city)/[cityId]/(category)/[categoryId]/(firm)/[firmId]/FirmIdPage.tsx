'use client';
import { Nav, Section } from '@/widgets';
import {
  CategoryIdGateProvider,
  CityIdGateProvider,
  Curve,
  FirmId,
  FirmIdGateProvider,
  ImagesGateProvider,
  PricesGateProvider,
  ReviewsGateProvider,
} from '@/features';
import { $firm } from '@/api';
import { useUnit } from 'effector-react';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

export interface FirmIdPageProps {
  cityId: string;
}

export const FirmIdPage: FC<FirmIdPageProps> = ({ cityId }) => {
  const searchParams = useSearchParams();
  const firm = useUnit($firm);

  const firmId = searchParams.get('firmId') || firm?.firm_id || '';

  return (
    <CityIdGateProvider cityId={cityId}>
      <CategoryIdGateProvider categoryId={searchParams.get('categoryId') ?? ''}>
        <FirmIdGateProvider firmId={firmId}>
          <ImagesGateProvider firmId={firmId}>
            <PricesGateProvider firmId={firmId}>
              <ReviewsGateProvider firmId={firmId} reviewsPage={Number(searchParams.get('reviewsPage')) || 1}>
                <Curve>
                  <Nav />
                  <Section pt={0}>
                    <FirmId />
                  </Section>
                </Curve>
              </ReviewsGateProvider>
            </PricesGateProvider>
          </ImagesGateProvider>
        </FirmIdGateProvider>
      </CategoryIdGateProvider>
    </CityIdGateProvider>
  );
};
