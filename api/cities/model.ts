import { BACKEND_PORT, PaginationOptions } from '@/shared';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { persist } from 'effector-storage/local';

export const DEFAULT_DROPDOWN_VALUE = {
  city_id: 'Выберите город',
  name: 'Выберите город',
  abbreviation: 'Выберите город',
};

export interface City {
  city_id: string;
  name: string;
  abbreviation: string;
  coords: string;
}

export interface CitiesQueryResult {
  status: string;
  data: {
    cities: City[];
    cities_count: number;
  };
}

export interface CityQueryResult {
  status: string;
  data: {
    city: City;
  };
}

export const cityD = createDomain('city');
export const citiesD = createDomain('cities');
export const CityGate = createGate<{ cityId: string }>('CityGate');
export const CitiesGate = createGate('CitiesGate');

export const $cityAbbreviation = cityD.createStore<string | null>(null);

export const $city = cityD.createStore<City | null>(null);
persist({ store: $city, key: 'city' });
export const fetchCitiesEvt = cityD.createEvent<string>();
export const setCityEvt = cityD.createEvent<string>();

export const $cities = citiesD.createStore<City[]>([]);
persist({ store: $cities, key: 'cities' });
export const $citiesCount = citiesD.createStore<number | null>(null);

sample({
  clock: setCityEvt,
  source: $cities,
  fn: (s, c) => s.find((city) => city.city_id === c) || null,
  target: $city,
});

export const getCitiesFx = citiesD.createEffect({
  handler: async ({ page, limit }: PaginationOptions): Promise<{ cities: CitiesQueryResult }> => {
    const res = await fetch(`${BACKEND_PORT}/api/cities?page=${page}&limit=${limit}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const cities = await res.json();

    return { cities };
  },
});

sample({
  clock: CitiesGate.open,
  // source: $cities,
  // filter: (c) => !c?.length,
  fn: () => ({ page: 1, limit: 10 }),
  target: getCitiesFx,
});

sample({
  clock: getCitiesFx.doneData,
  fn: (c) => c.cities.data.cities || [],
  target: $cities,
});

sample({
  clock: getCitiesFx.doneData,
  fn: (c) => c.cities.data.cities_count || null,
  target: $citiesCount,
});

// === CITY ===

sample({
  clock: CityGate.open,
  // source: $cities,
  // filter: (s) => !s.length,
  fn: () => ({ page: 1, limit: 10 }),
  target: getCitiesFx,
});

sample({
  clock: CityGate.open,
  fn: (c) => c?.cityId,
  target: $cityAbbreviation,
});

sample({
  source: [$cityAbbreviation, $cities],
  // filter: (s, c) => s !== '',
  // @ts-ignore
  fn: ([s, c]) => c?.find((city) => city?.abbreviation === s) || DEFAULT_DROPDOWN_VALUE,
  target: $city,
});

// sample({
//   clock: CityGate.close,
//   fn: () => null,
//   target: $city,
// });
