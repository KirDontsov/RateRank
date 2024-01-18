'use client';
import { AuthHeader } from '@/containers';
import { useUserAuth } from '@/context';
import { redirect } from 'next/navigation';

export default function Page() {
  const value = useUserAuth();

  if (value?.role == 'admin') {
    redirect('/admin/dashboard');
  }
  return (
    <div className="flex flex-col gap-4">
      <AuthHeader title="RateRank" subTitle="Личный кабинет" />
    </div>
  );
}
