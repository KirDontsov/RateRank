'use client';
import { Nav, CommonHeader, Section } from '@/widgets';
import { CategoriesList, CategoriesGateProvider, Curve } from '@/features';

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
          <CategoriesList cityId={params.cityId} />
        </Section>
      </Curve>
    </CategoriesGateProvider>
  );
}
