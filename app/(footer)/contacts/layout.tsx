import { COMMON_TITLE } from '@/shared';
import { CommonProps } from '@/shared/types';
import { HeroSection } from '@/widgets';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: `${COMMON_TITLE} — Контакты`,
  description: `${COMMON_TITLE} — Контакты для обратной связи или партнерства.`,
};

export default function ContactsLayout({ children }: CommonProps) {
  return (
    <HeroSection>
      <Suspense fallback={<></>}>{children}</Suspense>
    </HeroSection>
  );
}
