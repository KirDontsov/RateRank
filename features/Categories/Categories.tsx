import { $categories } from '@/shared';
import { useList } from 'effector-react';
import Link from 'next/link';
import { FC } from 'react';

export interface CategoriesProps {
  cityId: string;
}
export const Categories: FC<CategoriesProps> = ({ cityId }) => {
  return useList($categories, ({ category_id, name, abbreviation }) => (
    <Link href={`/city/${cityId}/category/${abbreviation}`} key={category_id} className="flex gap-4">
      <div>{category_id}</div>
      <div>{name}</div>
    </Link>
  ));
};
