'use client';
import { AuthPageGateProvider } from '@/context';
import { CommonProps } from '@/shared/types';
import { CenteredContainer, HeroSection, Nav } from '@/widgets';

export default function DashboardLayout({ children }: CommonProps) {
  return (
    <AuthPageGateProvider>
      <HeroSection>
        <Nav />
        <CenteredContainer h="screen">{children}</CenteredContainer>
      </HeroSection>
    </AuthPageGateProvider>
  );
}
