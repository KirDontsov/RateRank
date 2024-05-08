'use client';
import { $cityError } from '@/api';
import { CategoriesGateProvider, CategoriesList, CitiesGateProvider, CityIdGateProvider, Curve } from '@/features';
import { CommonHeader, Footer, Nav, Section } from '@/widgets';
import { useUnit } from 'effector-react';
import { notFound } from 'next/navigation';

export interface CityPageProps {
  params: {
    cityId: string;
  };
}

/** Список категорий внутри города */
export default function Page({ params }: CityPageProps) {
  const cityId = params.cityId ?? '';

  const cityError = useUnit($cityError);
  if (cityError) {
    notFound();
  }
  return (
    <CitiesGateProvider>
      <CityIdGateProvider cityId={cityId}>
        <CategoriesGateProvider>
          <Curve>
            <Nav />
            <Section>
              <CommonHeader title="Категории" subTitle="раздел" />
              <div className="container flex flex-col gap-4 items-center mb-auto">
                <CategoriesList cityId={cityId} />
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
}
