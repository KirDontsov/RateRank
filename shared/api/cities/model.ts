import { PaginationOptions } from '@/shared';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

export const DEFAULT_DROPDOWN_VALUE = {
  city_id: 'Выберите город',
  name: 'Выберите город',
  abbreviation: 'Выберите город',
};

export interface City {
  city_id: string;
  name: string;
  abbreviation: string;
}

export interface CitiesQueryResult {
  status: string;
  data: {
    cities: City[];
    cities_count: number;
  };
}

export const cityD = createDomain('city');
export const citiesD = createDomain('cities');
export const CityGate = createGate<{ cityId: string }>('CityGate');
export const CitiesGate = createGate('CitiesGate');

export const $cityAbbreviation = cityD.createStore<string | null>(null);

export const $city = cityD.createStore<City | null>(DEFAULT_DROPDOWN_VALUE);
export const fetchCitiesEvt = cityD.createEvent<string>();
export const setCityEvt = cityD.createEvent<string>();

export const $cities = citiesD.createStore<City[]>([]);
export const $citiesCount = citiesD.createStore<number | null>(null);

sample({
  clock: setCityEvt,
  source: $cities,
  fn: (s, c) => s.find((city) => city.city_id === c) || null,
  target: $city,
});

export const getCities = citiesD.createEffect({
  handler: async ({ page, limit }: PaginationOptions): Promise<{ cities: CitiesQueryResult }> => {
    const res = await fetch(`http://localhost:8080/api/cities?page=${page}&limit=${limit}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const cities = await res.json();

    return { cities };
  },
});

sample({
  clock: CitiesGate.open,
  source: $cities,
  filter: (c) => !c?.length,
  fn: () => ({ page: 1, limit: 10 }),
  target: getCities,
});

sample({
  clock: getCities.doneData,
  fn: (c) => c.cities.data.cities || [],
  target: $cities,
});

sample({
  clock: getCities.doneData,
  fn: (c) => c.cities.data.cities_count || null,
  target: $citiesCount,
});

// === CITY ===

sample({
  clock: CityGate.open,
  source: $cities,
  filter: (s) => !s.length,
  fn: () => ({ page: 1, limit: 10 }),
  target: getCities,
});

sample({
  clock: CityGate.open,
  fn: (c) => c?.cityId,
  target: $cityAbbreviation,
});

sample({
  clock: getCities.doneData,
  source: $cityAbbreviation,
  filter: (s, c) => s !== '',
  fn: (s, c) => c?.cities?.data.cities?.find((city) => city?.abbreviation === s) || DEFAULT_DROPDOWN_VALUE,
  target: $city,
});