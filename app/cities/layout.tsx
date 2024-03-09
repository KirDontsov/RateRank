'use client';
import { CitiesGate } from '@/shared';
import { HeroSection, Nav } from '@/widgets';
import { CommonProps } from '@/shared/types';
import { useGate } from 'effector-react';
import { EffectorNext } from '@effector/next';

export default function CitiesLayout({ children }: CommonProps) {
  useGate(CitiesGate);
  return (
    <EffectorNext>
      <HeroSection>{children}</HeroSection>
    </EffectorNext>
  );
}
