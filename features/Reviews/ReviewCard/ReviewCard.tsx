import { sequenceGenerator } from '@/shared';
import { FC } from 'react';

export interface ReviewCardProps {
  review_id: string;
  date?: string;
  author?: string;
  text?: string;
  rating?: string;
}

export const ReviewCard: FC<ReviewCardProps> = ({ review_id, date, author, text, rating }) => {
  const positiveArray = Array.from(sequenceGenerator(Number(rating || 0)));
  const positiveValue = positiveArray.length;
  const negativeArray = Array.from(sequenceGenerator(Number(5 - positiveValue)));

  return (
    <div key={review_id} className="container w-full p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center w-full">
        <img
          className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
          src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80"
          alt="avatar"
        />
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="font-bold text-gray-700 dark:text-gray-200" tabIndex={0} role="link">
              {author}
            </span>
            <span className="text-gray-500 dark:text-gray-500" tabIndex={0} role="link">
              {date?.replace(', отредактирован', '')}
            </span>
          </div>
          <span
            className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-100 dark:bg-gray-600 rounded hover:bg-gray-500 flex"
            tabIndex={0}
          >
            {positiveArray.map((x) => (
              <svg
                key={x}
                className="w-6 h-6 text-blue-500 dark:text-blue-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            ))}
            {negativeArray.map((x) => (
              <svg
                key={x}
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
                />
              </svg>
            ))}
          </span>
        </div>
      </div>

      <div className="my-2">
        <p className="mt-2 text-gray-600 dark:text-gray-300">{text}</p>
      </div>
    </div>
  );
};
