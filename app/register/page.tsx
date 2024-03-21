'use client';
import { RegisterForm } from '@/features';
import { CommonHeader } from '@/widgets';

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <CommonHeader title="ТОП ВЫБОР" subTitle="Зарегистрируйтесь, чтобы начать" />
      <RegisterForm />
    </div>
  );
}
