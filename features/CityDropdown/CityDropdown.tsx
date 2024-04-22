'use client';
import { $cities, $city, setCityEvt } from '@/api';
import { FormDropdown } from '@/widgets';
import { useUnit } from 'effector-react';

export const CityDropdown = () => {
  const { city, cities, setCity } = useUnit({
    city: $city,
    cities: $cities,
    setCity: setCityEvt,
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

  return <FormDropdown options={options} value={value} setValue={setCity} placeholder="Выберите город" />;
};
