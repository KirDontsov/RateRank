import { CommonProps } from '@/shared/types';
import { CenteredContainer, HeroSection } from '@/widgets';
import { EffectorNext } from '@effector/next';
import { Suspense } from 'react';

export default function RegisterLayout({ children }: CommonProps) {
  return (
    <Suspense fallback={<></>}>
      <EffectorNext>
        <HeroSection>
          <CenteredContainer h="screen">{children}</CenteredContainer>
        </HeroSection>
      </EffectorNext>
    </Suspense>
  );
}
