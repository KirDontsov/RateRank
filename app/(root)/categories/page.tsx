'use client';
import { Nav, CommonHeader, Section } from '@/widgets';
import { Categories, CategoriesGateProvider, Curve } from '@/features';

export default function Page({
  params,
}: {
  params: {
    cityId: string;
  };
}) {
  return (
    <CategoriesGateProvider>
      <Curve>
        <Nav />
        <Section>
          <CommonHeader title="Все категории" subTitle="раздел" />
          <Categories cityId={params.cityId} />
        </Section>
      </Curve>
    </CategoriesGateProvider>
  );
}
