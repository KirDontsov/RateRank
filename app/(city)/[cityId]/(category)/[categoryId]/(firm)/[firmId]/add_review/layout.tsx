import { CommonProps } from '@/shared/types';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Оставить отзыв — Топ выбор',
  description:
    'Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на Топвыбор.рф. Фотографии, отзывы, акции, скидки, фильтры для поиска.',
};

export default function FirmLayout({ children }: CommonProps) {
  return <>{children}</>;
}
