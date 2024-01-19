'use client';
import { FirmsGate } from '@/api';
import { CenteredContainer, HeroSection, Nav } from '@/components';
import { CommonProps } from '@/shared/types';

export default function CategoryLayout({ children }: CommonProps) {
  // TODO: запросить инфо по category_id
  // useGate(CategoryGate)
  return <>{children}</>;
}
