import { CenteredContainer, HeroSection } from '@/components';
import { CommonProps } from '@/shared/types';

export default function LoginLayout({ children }: CommonProps) {
  return (
    <HeroSection>
      <CenteredContainer h="screen">{children}</CenteredContainer>
    </HeroSection>
  );
}
