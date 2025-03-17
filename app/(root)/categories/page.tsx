import { getCategories, getCities, getCity } from '@/app/api';
import { PageProps } from '@/shared';
import { notFound } from 'next/navigation';
import { CategoriesPage } from './CategoriesPage';
import React, { Suspense } from 'react';

/** Список категорий внутри города */
export default async function Page({ params }: PageProps) {
  const paramsRes = await params;
  const cityId = `${paramsRes?.cityId ?? ''}`;

  const city = await getCity(cityId);

  if (!city) {
    notFound();
  }

  const cities = await getCities();
  const categories = await getCategories(1, 10);

  return (
    <Suspense fallback={<></>}>
      <CategoriesPage cityId={cityId} cities={cities} categories={categories} />
    </Suspense>
  );
}
