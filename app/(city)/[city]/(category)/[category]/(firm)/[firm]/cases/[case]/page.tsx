import { getCategories, getCategory, getCities, getCity, getFirm, getPageByUrl } from '@/app/api';
import { COMMON_DOMAIN, PageProps, SegmentParams } from '@/shared';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { CasePage } from './CasePage';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const paramsRes = await params;
  const city = `${paramsRes?.city ?? ''}`;
  const category = `${paramsRes?.category ?? ''}`;
  const firm = `${paramsRes?.firm ?? ''}`;
  const caseRes = `${paramsRes?.case ?? ''}`;

  const page = await getPageByUrl(caseRes);

  const title = page?.blocks?.[0]?.page_block_title ?? '';
  const description = page?.sections?.[0]?.subtitle ?? '';

  return {
    title: `${title}`,
    description: `Пример выполнения работ по ремонту фар с гарантией. ${description}`,
    alternates: { canonical: `https://топвыбор.рф/${city}/${category}/${firm}/cases/${caseRes}` },
    keywords: ['кейс', ' ремонт фар фото', ' до и после'],
    openGraph: {
      title: `${title}`,
      description: `${description}`,
      url: `https://топвыбор.рф/${city}/${category}/${firm}/cases/${caseRes}`,
      siteName: `${COMMON_DOMAIN}`,
      locale: 'ru_RU',
      type: 'website',
    },
  };
}

type Props = {
  params: Promise<SegmentParams>;
};

export default async function Page({ params }: Props) {
  const paramsRes = await params;
  const cityAbbr = `${paramsRes?.city ?? ''}`;
  const categoryAbbr = `${paramsRes?.category ?? ''}`;
  const firmUrl = `${paramsRes.firm ?? ''}`;
  const caseUrl = `${paramsRes?.case ?? ''}`;
  const firm = await getFirm(firmUrl);
  if (!firm) {
    notFound();
  }

  const cities = await getCities();
  const city = await getCity(cityAbbr);
  const categories = await getCategories(1, 10);
  const category = await getCategory(categoryAbbr);

  const page = await getPageByUrl(caseUrl);

  if (!page) {
    notFound();
  }

  return (
    <Suspense fallback={<></>}>
      <CasePage cities={cities} city={city} categories={categories} category={category} firm={firm} page={page} />
    </Suspense>
  );
}
