'use client';
import { RegisterForm, AuthHeader } from '@/containers';

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <AuthHeader title="RateRank" subTitle="Зарегистрируйтесь, чтобы начать" />
      <RegisterForm />
    </div>
  );
}
