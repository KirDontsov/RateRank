import { CommonProps } from '@/shared/types';
import { CenteredContainer, HeroSection } from '@/widgets';

export default function RegisterLayout({ children }: CommonProps) {
  return (
    <HeroSection>
      <CenteredContainer h="screen">{children}</CenteredContainer>
    </HeroSection>
  );
}
