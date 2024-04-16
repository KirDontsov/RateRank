'use client';
import { $firm, $firmLoading } from '@/api';
import {
  CategoryIdGateProvider,
  CityIdGateProvider,
  Curve,
  FirmId,
  FirmIdGateProvider,
  FirmsGateProvider,
  ImagesGateProvider,
  OaiDescriptionGateProvider,
  PricesGateProvider,
  ReviewsGateProvider,
  SimilarImagesGateProvider,
} from '@/features';
import { Nav, Section } from '@/widgets';
import { useUnit } from 'effector-react';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

export interface FirmIdPageProps {
  cityId: string;
}

export const FirmIdPage: FC<FirmIdPageProps> = ({ cityId }) => {
  const searchParams = useSearchParams();
  const { firm, firmLoading } = useUnit({
    firm: $firm,
    firmLoading: $firmLoading,
  });

  const firmId = searchParams.get('firmId') || firm?.firm_id || '';

  return (
    <CityIdGateProvider cityId={cityId}>
      <CategoryIdGateProvider categoryId={searchParams.get('categoryId') ?? ''}>
        <FirmsGateProvider>
          <FirmIdGateProvider firmId={firmId}>
            <ImagesGateProvider firmId={firmId}>
              <SimilarImagesGateProvider>
                <PricesGateProvider firmId={firmId}>
                  <ReviewsGateProvider firmId={firmId} reviewsPage={Number(searchParams.get('reviewsPage')) || 1}>
                    <OaiDescriptionGateProvider firmId={firmId}>
                      <Curve>
                        <Nav />
                        <Section pt={0}>
                          <FirmId />
                        </Section>
                      </Curve>
                    </OaiDescriptionGateProvider>
                  </ReviewsGateProvider>
                </PricesGateProvider>
              </SimilarImagesGateProvider>
            </ImagesGateProvider>
          </FirmIdGateProvider>
        </FirmsGateProvider>
      </CategoryIdGateProvider>
    </CityIdGateProvider>
  );
};
