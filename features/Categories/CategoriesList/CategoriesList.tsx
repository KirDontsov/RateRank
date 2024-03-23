import { FC } from 'react';
import { useList } from 'effector-react';
import { $categories } from '@/api';
import { CategoryCard } from '../CategoryCard';

export interface CategoriesListProps {
  cityId: string;
}
export const CategoriesList: FC<CategoriesListProps> = ({ cityId }) => {
  return useList($categories, ({ category_id, name, abbreviation }) => (
    <CategoryCard key={category_id} categoryId={category_id} name={name} abbreviation={abbreviation} cityId={cityId} />
  ));
};
