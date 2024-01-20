import { $firmsGroups } from '@/api';
import { useList } from 'effector-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { FirmsCard } from '../FirmsCard';

export const FirmsList = () => {
  return useList($firmsGroups, ({ firm_id, category_id, name, address }) => (
    <FirmsCard firm_id={firm_id} category_id={category_id} name={name} address={address} />
  ));
};
