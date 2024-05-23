'use client';
import { Category, City, Firm, ImageType, OaiDescription, OaiReview, PriceCategory, PriceItem, Review } from '@/api';
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
  city: City | null;
  category: Category | null;
  firm: Firm | null;
  images: ImageType[] | null;
  reviews: Review[] | null;
  oai_description: OaiDescription | null;
  oai_reviews: OaiReview[] | null;
  prices: { prices_items: PriceItem[] | null; prices_categories: PriceCategory[] | null };
}

export const FirmIdPage: FC<FirmIdPageProps> = ({
  cityId,
  categoryAbbr,
  firmUrl,
  city,
  category,
  firm,
  images,
  reviews,
  oai_description,
  oai_reviews,
  prices,
}) => {
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
                              <FirmId
                                city={city}
                                category={category}
                                firm={firm}
                                images={images}
                                reviews={reviews}
                                oai_reviews={oai_reviews}
                                oai_description={oai_description}
                                prices={prices}
                              />
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
