import { $firms } from '@/api';
import { useList } from 'effector-react';
import { FirmCard } from '../FirmCard';

export const FirmsList = () => {
  return useList($firms, ({ firm_id, name, address, url }) => (
    <FirmCard firm_id={firm_id} url={url} name={name} address={address} />
  ));
};
