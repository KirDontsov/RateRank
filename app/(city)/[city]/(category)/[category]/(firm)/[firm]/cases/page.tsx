import { getCategories, getCategory, getCities, getCity, getFirm, getPagesByFirm } from '@/app/api';
import { COMMON_DOMAIN, PageProps } from '@/shared';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { CasesPage } from './CasesPage';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const paramsRes = await params;
  const cityAbbr = `${paramsRes?.city ?? ''}`;
  const categoryAbbr = `${paramsRes?.category ?? ''}`;
  const firmUrl = `${paramsRes?.firm ?? ''}`;

  const category = await getCategory(categoryAbbr);

  const firm = await getFirm(firmUrl);

  const firmName = firm?.name ?? '';

  const categoryNameAndFirmName =
    firmName?.indexOf(category?.single_name ?? '') !== -1 ? firmName : `${category?.single_name} ${firmName}`;

  const title = `Ремонт фар ${categoryNameAndFirmName}: реальные кейсы и результаты до/после | Гарантия качества`;
  const description = `Примеры работ по ремонту фар с гарантией ${categoryNameAndFirmName}. Быстро, качественно, с гарантией. Восстановление вместо покупки новых фар!`;

  return {
    title: `${title}`,
    description: `${description}`,
    alternates: { canonical: `https://топвыбор.рф/${cityAbbr}/${categoryAbbr}/${firmUrl}/cases` },
    keywords: ['кейсы', ' ремонт фар фото', ' до и после'],
    openGraph: {
      title: `${title}`,
      description: `${description}`,
      url: `https://топвыбор.рф/${cityAbbr}/${categoryAbbr}/${firmUrl}/cases`,
      siteName: `${COMMON_DOMAIN}`,
      locale: 'ru_RU',
      type: 'website',
    },
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const paramsRes = await params;
  const searchParamsRes = await searchParams;
  const cityAbbr = `${paramsRes?.city ?? ''}`;
  const categoryAbbr = `${paramsRes?.category ?? ''}`;
  const firmUrl = `${paramsRes?.firm ?? ''}`;
  const casesPage = `${searchParamsRes?.casesPage ?? '1'}`;
  const firm = await getFirm(firmUrl);
  if (!firm) {
    notFound();
  }

  const cities = await getCities();
  const city = await getCity(cityAbbr);
  const categories = await getCategories(1, 10);
  const category = await getCategory(categoryAbbr);

  const pagesByFirm = await getPagesByFirm(firm?.firm_id ?? '', casesPage, 10);

  return (
    <Suspense fallback={<></>}>
      <CasesPage
        cities={cities}
        city={city}
        categories={categories}
        category={category}
        firm={firm}
        pagesByFirm={pagesByFirm?.pages}
        pagesCount={pagesByFirm?.pages_count}
      />
    </Suspense>
  );
}
