import { $reviews } from '@/api';
import { useList } from 'effector-react';
import { ReviewCard } from '../ReviewCard';

export const ReviewsList = () => {
  return useList($reviews, ({ review_id, author, text, date }) => (
    // TODO: карточки отзывов
    <ReviewCard review_id={review_id} date={date} author={author} text={text} />
  ));
};
