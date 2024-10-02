'use client';
import { CategoriesGateProvider, CategoriesList, CitiesGateProvider, CityIdGateProvider, Curve } from '@/features';
import { CommonNavProps } from '@/shared';
import { Footer, LoadingComponent, Nav, Section, SectionHeader } from '@/widgets';
import { FC, Suspense } from 'react';

export interface CategoriesPageProps {
  cityId: string;
}

/** Список категорий внутри города */
export const CategoriesPage: FC<CategoriesPageProps & CommonNavProps> = ({ cityId, cities, categories }) => {
  return (
    <CitiesGateProvider>
      <CityIdGateProvider cityId={cityId}>
        <CategoriesGateProvider>
          <Curve>
            <Nav cities={cities} categories={categories} />
            <Section>
              <div className="py-8 flex flex-col gap-4 items-center mb-auto">
                <SectionHeader title="Категории" subTitle="раздел" />
                <div className="py-8 flex gap-4 mb-auto flex-wrap">
                  <Suspense fallback={<LoadingComponent />}>
                    <CategoriesList cityId={cityId} categories={categories} />
                  </Suspense>
                </div>
              </div>

              <div className="flex w-full">
                <Footer />
              </div>
            </Section>
          </Curve>
        </CategoriesGateProvider>
      </CityIdGateProvider>
    </CitiesGateProvider>
  );
};
