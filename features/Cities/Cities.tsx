import { $cities } from '@/api';
import { useList } from 'effector-react';

export const Cities = () => {
  return useList($cities, ({ city_id, name, abbreviation }) => (
    <a href={`/${abbreviation}`} key={city_id} className="flex gap-4">
      <div>{name}</div>
    </a>
  ));
};
