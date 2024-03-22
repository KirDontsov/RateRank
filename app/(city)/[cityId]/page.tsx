'use client';
import { Nav, CommonHeader, Section } from '@/widgets';
import { Categories, CityIdGateProvider, Curve } from '@/features';

export interface CityPageProps {
  params: {
    cityId: string;
  };
}

export default function Page({ params }: CityPageProps) {
  const cityId = params.cityId ?? '';
  return (
    <CityIdGateProvider cityId={cityId}>
      <Curve>
        <Nav />
        <Section>
          <CommonHeader title="Категории" subTitle="раздел" />
          <Categories cityId={cityId} />
        </Section>
      </Curve>
    </CityIdGateProvider>
  );
}
