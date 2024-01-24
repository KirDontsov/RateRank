'use client';
import { CenteredContainer, HeroSection, Nav } from '@/components';
import { AuthPageGateProvider } from '@/context';
import { CommonProps } from '@/shared/types';

export default function AdminDashboardLayout({ children }: CommonProps) {
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
