'use client';
import { CommonHeader } from '@/widgets';
import { $loading, useUserAuth } from '@/context';
import { useUnit } from 'effector-react';
import { redirect } from 'next/navigation';
import { COMMON_TITLE } from '@/shared';

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
      <CommonHeader title={COMMON_TITLE} subTitle="Админ Панель" />
    </div>
  );
}
