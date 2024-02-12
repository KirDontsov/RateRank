import { FC } from 'react';

export interface ReviewCardProps {
  review_id: string;
  date?: string;
  author?: string;
  text?: string;
}

export const ReviewCard: FC<ReviewCardProps> = ({ review_id, date, author, text }) => {
  return (
    <div key={review_id} className="max-w-2xl w-full px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center w-full">
        <img
          className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
          src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80"
          alt="avatar"
        />
        <div className="flex items-center justify-between w-full">
          <span className="font-bold text-gray-700 dark:text-gray-200" tabIndex={0} role="link">
            {author}
          </span>
          <span
            className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded hover:bg-gray-500"
            tabIndex={0}
          >
            {date}
          </span>
        </div>
      </div>

      <div className="mt-2">
        <p className="mt-2 text-gray-600 dark:text-gray-300">{text}</p>
      </div>
    </div>
  );
};
