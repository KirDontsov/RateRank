'use client';
import { AuthPageGateProvider } from '@/context';
import { CommonProps } from '@/shared/types';
import { CenteredContainer, HeroSection, Nav } from '@/widgets';
import { EffectorNext } from '@effector/next';
import { Suspense } from 'react';

export default function AdminDashboardLayout({ children }: CommonProps) {
  return (
    <Suspense fallback={<></>}>
      <EffectorNext>
        <AuthPageGateProvider>
          <HeroSection>
            <Nav />
            <CenteredContainer h="screen">{children}</CenteredContainer>
          </HeroSection>
        </AuthPageGateProvider>
      </EffectorNext>
    </Suspense>
  );
}
