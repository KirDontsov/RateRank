import { Rating } from '@/widgets';
import { FC } from 'react';

export interface ReviewCardProps {
  review_id: string;
  date?: string;
  author?: string;
  text?: string;
  rating?: string;
}

export const ReviewCard: FC<ReviewCardProps> = ({ review_id, date, author, text, rating }) => {
  return (
    <div key={review_id} className="container w-full p-8 bg-white dark:bg-eboni-800 rounded-lg shadow-md">
      <div className="flex items-center w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
          src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80"
          alt="avatar"
        />
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="font-bold text-eboni-600 dark:text-white" tabIndex={0} role="link">
              {author}
            </span>
            <span tabIndex={0} role="link">
              {date?.replace(', отредактирован', '')}
            </span>
          </div>
          <Rating rating={rating} />
        </div>
      </div>

      <div className="my-2">
        <p className="mt-2">{text}</p>
      </div>
    </div>
  );
};
