'use client';
import { FirmsGate } from '@/api';
import { CenteredContainer, HeroSection, Nav } from '@/components';
import { CommonProps } from '@/shared/types';

export default function TypeLayout({ children }: CommonProps) {
  // TODO: запросить инфо по firm_id
  // useGate(TypeGate)
  return <>{children}</>;
}
