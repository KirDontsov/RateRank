import { $category, $city, $firmsPage, setFirmEvt } from '@/api';
import { transliterate } from '@/shared';
import { Rating } from '@/widgets';
import { useUnit } from 'effector-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC, useCallback } from 'react';

export interface FirmsCardProps {
  firm_id: string;
  url: string;
  category_id?: string;
  name?: string;
  address?: string;
  descriptioin?: string;
  rating?: string;
  reviews_count?: string;
}

export const FirmCard: FC<FirmsCardProps> = ({ firm_id, url, name, address, rating, reviews_count }) => {
  const searchParams = useSearchParams();
  const { city, category, page, setFirm } = useUnit({
    city: $city,
    category: $category,
    page: $firmsPage,
    setFirm: setFirmEvt,
  });

  const handleClick = useCallback(() => {
    setFirm({ firmUrl: url });
  }, [setFirm, url]);

  return (
    <Link
      key={firm_id}
      href={`/${city?.abbreviation}/${category?.abbreviation}/${url || transliterate(name ?? '')}?firmsPage=${Number(searchParams.get('firmsPage')) || page}`}
      onClick={handleClick}
      className="max-w-2xl w-full px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800 cursor-pointer"
    >
      <div className="mt-2">
        <div className="text-xl flex justify-between items-center font-bold text-gray-700 dark:text-white" tabIndex={0}>
          {name}
          <Rating rating={rating} />
        </div>
        {Number(reviews_count) > 0 && !!rating && (
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            <span>Рейтинг: {rating}</span> /{' '}
            <span>{`${reviews_count} ${Number(reviews_count) === 1 ? 'отзыв' : (Number(reviews_count) ?? 0) <= 4 ? 'отзывa' : 'отзывов'}`}</span>
          </p>
        )}

        <p className="mt-2 text-gray-600 dark:text-gray-300">{address}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-blue-600 dark:text-blue-400 hover:underline" tabIndex={0}>
          Подробнее
        </div>
      </div>
    </Link>
  );
};
