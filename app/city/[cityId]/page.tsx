'use client';
import { Nav, CommonHeader, Section } from '@/widgets';
import { Categories, Curve } from '@/features';

export default function Page({
  params,
}: {
  params: {
    cityId: string;
  };
}) {
  return (
    <Curve>
      <Nav />
      <Section>
        <CommonHeader title="Категории" subTitle="раздел" />
        <Categories cityId={params.cityId} />
      </Section>
    </Curve>
  );
}
