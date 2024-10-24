import { CommonProps } from '@/shared/types';
import { HeroSection } from '@/widgets';
import { Suspense } from 'react';

export default function PolicyLayout({ children }: CommonProps) {
  return (
    <HeroSection>
      <Suspense fallback={<></>}>{children}</Suspense>
    </HeroSection>
  );
}
