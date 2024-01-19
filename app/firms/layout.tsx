'use client';
import { FirmsGate } from '@/api';
import { CenteredContainer, HeroSection, Nav } from '@/components';
import { CommonProps } from '@/shared/types';
import { useGate } from 'effector-react';

export default function FirmsLayout({ children }: CommonProps) {
  useGate(FirmsGate);
  return (
    <>
      <HeroSection>
        <Nav />
        <CenteredContainer h="screen">{children}</CenteredContainer>
      </HeroSection>
    </>
  );
}
