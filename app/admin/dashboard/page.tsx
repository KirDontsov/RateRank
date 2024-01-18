'use client';
import { AuthHeader } from '@/containers';
import { useUserAuth } from '@/context';
import { redirect } from 'next/navigation';

export default function Page() {
  const value = useUserAuth();

  if (value?.role == 'user') {
    redirect('/dashboard');
  }

  return (
    <div className="flex flex-col gap-4">
      <AuthHeader title="RateRank" subTitle="Админ Панель" />
    </div>
  );
}
