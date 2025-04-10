import { getCategories, getCategory, getCities, getCity, getFirm, getPagesByFirm } from '@/app/api';
import type { SegmentParams } from '@/shared';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { CasesPage } from './CasesPage';

type Props = {
  params: Promise<SegmentParams>;
};

export default async function Page({ params }: Props) {
  const paramsRes = await params;
  const cityAbbr = `${paramsRes?.city ?? ''}`;
  const categoryAbbr = `${paramsRes?.category ?? ''}`;
  const firmUrl = `${paramsRes.firm ?? ''}`;
  const firm = await getFirm(firmUrl);
  if (!firm) {
    notFound();
  }

  const cities = await getCities();
  const city = await getCity(cityAbbr);
  const categories = await getCategories(1, 10);
  const category = await getCategory(categoryAbbr);

  const pagesByFirm = await getPagesByFirm(firm?.firm_id ?? '');

  return (
    <Suspense fallback={<></>}>
      <CasesPage
        cities={cities}
        city={city}
        categories={categories}
        category={category}
        firm={firm}
        pagesByFirm={pagesByFirm}
      />
    </Suspense>
  );
}
