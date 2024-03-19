'use client';
import { CommonProps } from '@/shared/types';
import { EffectorNext } from '@effector/next';
import { useGate } from 'effector-react';

export default function TypesLayout({ children }: CommonProps) {
  return <EffectorNext>{children}</EffectorNext>;
}
