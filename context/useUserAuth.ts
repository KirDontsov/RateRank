import { useUnit } from 'effector-react';
import { $store, setStore } from '.';
import { useEffect } from 'react';
import { storage } from '@/shared';

export function useUserAuth() {
  const { value, setValue } = useUnit({
    value: $store,
    setValue: setStore,
  });

  return value;
}
