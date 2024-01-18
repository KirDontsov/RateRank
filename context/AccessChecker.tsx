'use client';
import { CommonProps, storage } from '@/shared';
import { $store, setStore } from '.';
import { useUnit } from 'effector-react';
import { redirect } from 'next/navigation';
import { FC, useEffect } from 'react';

export const AccessChecker: FC<CommonProps> = ({ children }) => {
  const { value, setValue } = useUnit({
    value: $store,
    setValue: setStore,
  });

  console.log('value', value);

  useEffect(() => {
    if (!value) {
      if (storage) {
        const x = storage.getItem('user-data');
        if (x && x !== null) {
          setValue(JSON.parse(x));
        }
      }
    }
  }, [value]);

  // TODO: 403
  if (value?.role == 'admin') {
    redirect('/admin/dashboard');
  }
  // TODO: 403
  else if (value?.role == 'user') {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
  return <>{children}</>;
};
