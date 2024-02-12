'use client';
import { CenteredContainer, HeroSection, Nav } from '@/widgets';
import { AuthPageGateProvider } from '@/context';
import { CommonProps } from '@/shared/types';

export default function DashboardLayout({ children }: CommonProps) {
  return (
    <>
      <AuthPageGateProvider>
        <HeroSection>
          <Nav />
          <CenteredContainer h="screen">{children}</CenteredContainer>
        </HeroSection>
      </AuthPageGateProvider>
    </>
  );
}
