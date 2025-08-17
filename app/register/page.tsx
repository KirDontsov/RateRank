'use client';
import { RegisterForm, YandexMetric } from '@/features';
import { COMMON_TITLE } from '@/shared';
import { CommonHeader } from '@/widgets';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <CommonHeader title={COMMON_TITLE} subTitle="Зарегистрируйтесь, чтобы начать" />
      <RegisterForm />
      <Suspense fallback={<></>}>
        <YandexMetric />
      </Suspense>
    </div>
  );
}
