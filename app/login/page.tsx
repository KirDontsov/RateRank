'use client';
import { LoginForm, AuthHeader } from '@/features';

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <AuthHeader title="Войдите в свой аккаунт" subTitle="Введите email и пароль" />
      <LoginForm />
    </div>
  );
}
