'use client';
import { Nav, CommonHeader, Section } from '@/widgets';
import { CategoriesList, CityIdGateProvider, Curve } from '@/features';

export interface CityPageProps {
  params: {
    cityId: string;
  };
}

/** Список категорий внутри города */
export default function Page({ params }: CityPageProps) {
  const cityId = params.cityId ?? '';
  return (
    <CityIdGateProvider cityId={cityId}>
      <Curve>
        <Nav />
        <Section>
          <CommonHeader title="Категории" subTitle="раздел" />
          <div className="container flex flex-col gap-4 items-center">
            <CategoriesList cityId={cityId} />
          </div>
        </Section>
      </Curve>
    </CityIdGateProvider>
  );
}
