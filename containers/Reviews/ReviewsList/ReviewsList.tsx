import { $reviews } from '@/api';
import { FirmsCard } from '@/containers';
import { useList } from 'effector-react';

export const ReviewsList = () => {
  return useList($reviews, ({ review_id, author, text, date }) => (
    // TODO: карточки отзывов
    <FirmsCard firm_id={review_id} category_id={date} name={author} address={text} />
  ));
};
