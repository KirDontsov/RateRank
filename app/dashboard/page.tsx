'use client';
import { AuthHeader } from '@/features';
import { useUserAuth } from '@/context';

export default function Page() {
  useUserAuth('/admin/dashboard');

  return (
    <div className="flex flex-col gap-4">
      <AuthHeader title="RateRank" subTitle="Личный кабинет" />
    </div>
  );
}
