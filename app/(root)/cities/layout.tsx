import { CommonProps } from '@/shared/types';
import { HeroSection } from '@/widgets';

export default function CitiesLayout({ children }: CommonProps) {
  return <HeroSection>{children}</HeroSection>;
}
