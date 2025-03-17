import { CommonProps } from '@/shared/types';
import { CenteredContainer, HeroSection } from '@/widgets';

export default function LoginLayout({ children }: CommonProps) {
  return (
    <HeroSection>
      <CenteredContainer h="screen">{children}</CenteredContainer>
    </HeroSection>
  );
}
