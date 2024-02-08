import { $firms } from '@/shared';
import { useList } from 'effector-react';
import { FirmCard } from '../FirmCard';

export const FirmsList = () => {
  return useList($firms, ({ firm_id, category_id, name, address }) => (
    <FirmCard firm_id={firm_id} category_id={category_id} name={name} address={address} />
  ));
};
