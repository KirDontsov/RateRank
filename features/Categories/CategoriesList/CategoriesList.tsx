import { Category } from '@/api';
import { FC } from 'react';
import { CategoryCard } from '../CategoryCard';

export interface CategoriesListProps {
  cityId: string;
  categories: Category[] | null;
}
export const CategoriesList: FC<CategoriesListProps> = ({ cityId, categories }) => {
  return (
    <>
      {!!categories?.length &&
        categories
          ?.sort((a, b) => Number(a?.order_number) - Number(b?.order_number))
          ?.map(({ category_id, name, abbreviation }) => {
            return (
              <CategoryCard
                key={category_id}
                categoryId={category_id}
                name={name}
                abbreviation={abbreviation}
                cityId={cityId}
              />
            );
          })}
    </>
  );
};
