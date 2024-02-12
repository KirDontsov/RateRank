import { $types } from '@/shared';
import { useList } from 'effector-react';
import Link from 'next/link';
import { FC } from 'react';

export interface TypesProps {
  cityId: string;
  categoryId: string;
}

export const Types: FC<TypesProps> = ({ cityId, categoryId }) => {
  return useList($types, ({ type_id, name, abbreviation }) => (
    <Link href={`/city/${cityId}/category/${categoryId}/type/${abbreviation}`} key={type_id}>
      {name}
    </Link>
  ));
};
