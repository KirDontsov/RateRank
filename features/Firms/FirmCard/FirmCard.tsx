import { $category, $city, $firmsPage, setFirmEvt } from '@/api';
import { transliterate } from '@/shared';
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
}

export const FirmCard: FC<FirmsCardProps> = ({ firm_id, url, name, address }) => {
  const searchParams = useSearchParams();
  const { city, category, page, setFirm } = useUnit({
    city: $city,
    category: $category,
    page: $firmsPage,
    setFirm: setFirmEvt,
  });

  const handleClick = useCallback(() => {
    setFirm({ firmId: firm_id });
  }, [setFirm, firm_id]);

  return (
    <Link
      key={firm_id}
      href={`/${city?.abbreviation}/${category?.abbreviation}/${url || transliterate(name ?? '')}?categoryId=${category?.category_id}&firmId=${firm_id}&firmsPage=${Number(searchParams.get('firmsPage')) || page}`}
      onClick={handleClick}
      className="max-w-2xl w-full px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800 cursor-pointer"
    >
      <div className="mt-2">
        <div className="text-xl font-bold text-gray-700 dark:text-white" tabIndex={0}>
          {name}
        </div>
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
