'use client';
import { CommonHeader } from '@/widgets';
import { useUserAuth } from '@/context';

export default function Page() {
  useUserAuth('/admin/dashboard');

  return (
    <div className="flex flex-col gap-4">
      <CommonHeader title="ТОП ВЫБОР" subTitle="Личный кабинет" />
    </div>
  );
}
