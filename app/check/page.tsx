'use client';
import { CenteredContainer, HeroSection } from '@/components';
import { AccessChecker } from '@/context';

export default function Page() {
  return (
    <AccessChecker>
      <HeroSection>
        <CenteredContainer h="screen">Check</CenteredContainer>
      </HeroSection>
    </AccessChecker>
  );
}
