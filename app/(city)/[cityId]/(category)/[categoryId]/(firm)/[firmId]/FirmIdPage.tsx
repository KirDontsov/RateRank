'use client';
import {
  CategoriesGateProvider,
  CategoryIdGateProvider,
  CitiesGateProvider,
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
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

// TODO: заменить во всех провайдерах firmId на firmUrl

export interface FirmIdPageProps {
  cityId: string;
  categoryAbbr: string;
  firmUrl: string;
}

export const FirmIdPage: FC<FirmIdPageProps> = ({ cityId, categoryAbbr, firmUrl }) => {
  const searchParams = useSearchParams();

  return (
    <CitiesGateProvider>
      <CityIdGateProvider cityId={cityId}>
        <CategoriesGateProvider>
          <CategoryIdGateProvider categoryAbbr={categoryAbbr ?? ''}>
            <FirmsGateProvider cityAbbr={cityId} categoryAbbr={categoryAbbr ?? ''}>
              <FirmIdGateProvider firmUrl={firmUrl}>
                <ImagesGateProvider firmUrl={firmUrl}>
                  <PricesGateProvider firmUrl={firmUrl}>
                    <ReviewsGateProvider firmUrl={firmUrl} reviewsPage={Number(searchParams.get('reviewsPage')) || 1}>
                      <OaiDescriptionGateProvider firmUrl={firmUrl}>
                        <SimilarImagesGateProvider key={firmUrl}>
                          <Curve>
                            <Nav />
                            <Section pt={0}>
                              <FirmId />
                            </Section>
                          </Curve>
                        </SimilarImagesGateProvider>
                      </OaiDescriptionGateProvider>
                    </ReviewsGateProvider>
                  </PricesGateProvider>
                </ImagesGateProvider>
              </FirmIdGateProvider>
            </FirmsGateProvider>
          </CategoryIdGateProvider>
        </CategoriesGateProvider>
      </CityIdGateProvider>
    </CitiesGateProvider>
  );
};
