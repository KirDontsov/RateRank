import { useUnit } from 'effector-react';
import { $store } from '.';
import { redirect } from 'next/navigation';

export function useUserAuth(redirectTo?: string) {
  const { value } = useUnit({
    value: $store,
  });

  if (redirectTo && value?.role == 'admin') {
    redirect(redirectTo);
  }

  return value;
}
