import { $category, $city, $firmName, $firmsPage, $typeAbbreviation, fetchFirmEvt } from '@/api';
import { transliterate } from '@/shared';
import { useUnit } from 'effector-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback } from 'react';

export interface FirmsCardProps {
  firm_id: string;
  category_id?: string;
  name?: string;
  address?: string;
  descriptioin?: string;
}

export const FirmCard: FC<FirmsCardProps> = ({ firm_id, name, address }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { city, category, page } = useUnit({
    city: $city,
    category: $category,
    page: $firmsPage,
  });

  const handleClick = useCallback(() => {
    fetchFirmEvt({ firmId: firm_id });
    router.push(
      `/${city?.abbreviation}/${category?.abbreviation}/${transliterate(name ?? '')}?firmId=${firm_id}&firmsPage=${Number(searchParams.get('firmsPage')) || page}`,
    );
  }, [city, category, firm_id, name]);

  return (
    <div
      key={firm_id}
      onClick={handleClick}
      role="button"
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
    </div>
  );
};
