'use client';
import { FirmsGate, TypeGate } from '@/shared';
import { CommonProps } from '@/shared/types';
import { EffectorNext } from '@effector/next';
import { useGate } from 'effector-react';

export default function TypeLayout({
  children,
  params,
}: CommonProps & {
  params: {
    typeId: string;
  };
}) {
  const { typeId } = params;

  useGate(TypeGate, { typeId });
  useGate(FirmsGate);
  return <EffectorNext>{children}</EffectorNext>;
}
