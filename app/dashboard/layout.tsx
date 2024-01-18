'use client';
import { CenteredContainer, HeroSection, Nav } from '@/components';
import { CommonProps } from '@/shared/types';

export default function DashboardLayout({ children }: CommonProps) {
  return (
    <>
      <HeroSection>
        <Nav />
        <CenteredContainer h="screen">{children}</CenteredContainer>
      </HeroSection>
    </>
  );
}
