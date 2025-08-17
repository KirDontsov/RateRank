'use client';
import { LoginForm, YandexMetric } from '@/features';
import { CommonHeader } from '@/widgets';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <CommonHeader title="Войдите в свой аккаунт" subTitle="Введите email и пароль" />
      <LoginForm />
      <Suspense fallback={<></>}>
        <YandexMetric />
      </Suspense>
    </div>
  );
}
