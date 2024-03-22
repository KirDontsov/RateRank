import { $reviews } from '@/api';
import { useList } from 'effector-react';
import { ReviewCard } from '../ReviewCard';

export const ReviewsList = () => {
  return useList($reviews, ({ review_id, author, text, date, rating }) => (
    <ReviewCard review_id={review_id} date={date} author={author} text={text} rating={rating} />
  ));
};
