'use client';
import { AuthHeader } from '@/features';
import { $loading, useUserAuth } from '@/context';
import { useUnit } from 'effector-react';
import { redirect } from 'next/navigation';

export default function Page() {
  const value = useUserAuth();
  const { loading } = useUnit({
    loading: $loading,
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (value?.role == 'user') {
    redirect('/dashboard');
  }

  return (
    <div className="flex flex-col gap-4">
      <AuthHeader title="RateRank" subTitle="Админ Панель" />
    </div>
  );
}
