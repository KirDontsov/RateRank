import { $types } from '@/api';
import { useList } from 'effector-react';
import { FC } from 'react';

export interface TypesProps {
  cityId: string;
  categoryId: string;
}

export const Types: FC<TypesProps> = ({ cityId, categoryId }) => {
  return useList($types, ({ type_id, name, abbreviation }) => (
    <a href={`/${cityId}/${categoryId}/type/${abbreviation}`} key={type_id}>
      {name}
    </a>
  ));
};
