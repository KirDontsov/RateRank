import { Firm } from '@/api';
import { FC } from 'react';
import { FirmCard } from '../FirmCard';

export interface FirmsListProps {
  firms: Firm[] | null;
}

export const FirmsList: FC<FirmsListProps> = ({ firms }) => {
  return (
    <>
      {!!firms?.length &&
        firms?.map(({ firm_id, name, address, url, rating, reviews_count }) => {
          return (
            <FirmCard
              key={firm_id}
              firm_id={firm_id}
              url={url}
              name={name}
              address={address}
              rating={rating}
              reviews_count={reviews_count}
            />
          );
        })}
    </>
  );
};
