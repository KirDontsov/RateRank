import { CommonProps } from '@/shared/types';
import { HeroSection } from '@/widgets';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'каталог организаций: отзывы, фото, рейтинг — Топ выбор',
  description:
    'Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на Топвыбор.рф. Фотографии, отзывы, акции, скидки, фильтры для поиска.',
};

export default function CategoriesLayout({ children }: CommonProps) {
  return <HeroSection>{children}</HeroSection>;
}
