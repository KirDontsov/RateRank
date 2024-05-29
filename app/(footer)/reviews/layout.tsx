import { COMMON_DOMAIN, COMMON_TITLE } from '@/shared';
import { CommonProps } from '@/shared/types';
import { HeroSection } from '@/widgets';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${COMMON_TITLE} — отзывы клиентов`,
  description: `Посмотрите отзывы клиентов о работе компании ${COMMON_DOMAIN}. ${COMMON_TITLE} — cервис, который помогает развиваться локальному бизнесу в России.`,
};

export default function ReviewsLayout({ children }: CommonProps) {
  return <HeroSection>{children}</HeroSection>;
}
