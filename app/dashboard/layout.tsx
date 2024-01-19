'use client';
import { CenteredContainer, HeroSection, Nav } from '@/components';
import { PageGateProvider } from '@/context';
import { CommonProps } from '@/shared/types';

export default function DashboardLayout({ children }: CommonProps) {
  return (
    <>
      <PageGateProvider>
        <HeroSection>
          <Nav />
          <CenteredContainer h="screen">{children}</CenteredContainer>
        </HeroSection>
      </PageGateProvider>
    </>
  );
}
