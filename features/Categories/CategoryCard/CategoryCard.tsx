import { setCategoryEvt } from '@/api';
import { useUnit } from 'effector-react';
import Link from 'next/link';
import { FC, useCallback } from 'react';

export interface CategoryCardProps {
  categoryId: string;
  name: string;
  abbreviation: string;
  cityId: string;
}

export const CategoryCard: FC<CategoryCardProps> = ({ categoryId, abbreviation, name, cityId }) => {
  const setCategory = useUnit(setCategoryEvt);

  const handleChangeCategory = useCallback(() => {
    setCategory(categoryId);
  }, [setCategory]);

  return (
    <Link
      key={categoryId}
      onClick={handleChangeCategory}
      href={`/${cityId}/${abbreviation}?categoryId=${categoryId}`}
      className="flex flex-col w-full md:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">Лучшие {name} в городе</p>
    </Link>
  );
};
