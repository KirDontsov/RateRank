'use client';
import { RegisterForm, AuthHeader } from '@/features';

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <AuthHeader title="RateRank" subTitle="Зарегистрируйтесь, чтобы начать" />
      <RegisterForm />
    </div>
  );
}
