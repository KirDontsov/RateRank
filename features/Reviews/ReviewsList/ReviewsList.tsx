import { $reviews } from '@/shared';
import { useList } from 'effector-react';
import { ReviewCard } from '../ReviewCard';

export const ReviewsList = () => {
  return useList($reviews, ({ review_id, author, text, date, rating }) => (
    <ReviewCard key={review_id} review_id={review_id} date={date} author={author} text={text} rating={rating} />
  ));
};
