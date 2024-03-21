import { $categoryAbbreviation, $city, $typeAbbreviation } from '@/shared';
import { useUnit } from 'effector-react';
import { useRouter } from 'next/navigation';
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
  const { city, categoryAbbreviation } = useUnit({
    city: $city,
    categoryAbbreviation: $categoryAbbreviation,
  });

  const handleClick = useCallback(() => {
    router.push(`/city/${city?.abbreviation}/category/${categoryAbbreviation}/firm/${firm_id}`);
  }, [firm_id, city, categoryAbbreviation]);

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
