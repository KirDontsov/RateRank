import { getCategories, getCities, getFirm } from '@/app/api';
import { SegmentParams } from '@/shared';
import { notFound } from 'next/navigation';
import { AddReviewPage } from './AddReviewPage';
import { Suspense } from 'react';

type Props = {
  params: Promise<SegmentParams>;
};

export default async function Page({ params }: Props) {
  const paramsRes = await params;
  const firmUrl = `${paramsRes.firm ?? ''}`;
  const firm = await getFirm(firmUrl);
  if (!firm) {
    notFound();
  }

  const cities = await getCities();
  const categories = await getCategories(1, 10);

  return (
    <Suspense fallback={<></>}>
      <AddReviewPage cities={cities} categories={categories} params={paramsRes} />
    </Suspense>
  );
}
