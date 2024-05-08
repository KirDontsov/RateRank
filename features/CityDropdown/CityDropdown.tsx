'use client';
import { $cities, $city, setCityEvt } from '@/api';
import { FormDropdown } from '@/widgets';
import { useUnit } from 'effector-react';
import { useRouter } from 'next/navigation';
import { MouseEvent, useCallback, useState } from 'react';

export const CityDropdown = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { city, cities, setValue } = useUnit({
    city: $city,
    cities: $cities,
    setValue: setCityEvt,
  });

  const options = cities.map((city) => ({
    id: city.city_id ?? '',
    name: city.name ?? '',
    abbreviation: city.abbreviation ?? '',
  }));

  const value = {
    id: city?.city_id ?? '',
    name: city?.name ?? '',
    abbreviation: city?.abbreviation ?? '',
  };

  const handleSelect = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      setValue(!!e?.currentTarget?.id && e?.currentTarget?.id !== '' ? e?.currentTarget?.id : 'Выберите город');
      setOpen(false);

      const targetCity = e.currentTarget.getAttribute('data-route');
      router.push(`/${targetCity}`);
    },
    [setValue, router],
  );

  const handleOpen = useCallback((v: boolean) => setOpen(v), []);

  return (
    <FormDropdown
      placeholder="Выберите город"
      options={options}
      value={value}
      onSelect={handleSelect}
      open={open}
      toggleOpen={handleOpen}
    />
  );
};
