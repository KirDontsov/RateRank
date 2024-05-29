import { COMMON_TITLE } from '@/shared';
import { CommonProps } from '@/shared/types';
import { HeroSection } from '@/widgets';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${COMMON_TITLE} — Политика в отношении обработки персональных данных`,
};

export default function PolicyLayout({ children }: CommonProps) {
  return <HeroSection>{children}</HeroSection>;
}
