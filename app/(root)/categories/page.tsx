'use client';
import { Nav, CommonHeader, Section, Footer } from '@/widgets';
import { CategoriesList, CategoriesGateProvider, Curve, CityIdGateProvider } from '@/features';

export default function Page({
  params,
}: {
  params: {
    cityId: string;
  };
}) {
  const cityId = params.cityId ?? '';
  return (
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
  );
}
