'use client';
import { CommonProps, storage } from '@/shared';
import { LoadingGate, PageGate } from '.';
import { useGate } from 'effector-react';
import { FC } from 'react';

export const PageGateProvider: FC<CommonProps> = ({ children }) => {
  let x: string | null | undefined;
  if (typeof window !== 'undefined') {
    x = storage ? storage.getItem('user-data') : null;
  }

  useGate(PageGate, JSON.parse(x || '{}'));

  return <>{children}</>;
};
