'use client';
import { CommonHeader } from '@/widgets';
import { useUserAuth } from '@/context';
import { COMMON_TITLE } from '@/shared';
import { Suspense } from 'react';
import { YandexMetric } from '@/features';

export default function Page() {
  useUserAuth('/admin/dashboard');

  return (
    <div className="flex flex-col gap-4">
      <CommonHeader title={COMMON_TITLE} subTitle="Личный кабинет" />
      <Suspense fallback={<></>}>
        <YandexMetric />
      </Suspense>
    </div>
  );
}
