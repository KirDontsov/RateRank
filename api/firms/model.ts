import { BACKEND_PORT, PaginationOptions, transliterate } from '@/shared';
import { $city, DEFAULT_DROPDOWN_VALUE, getCities } from '../cities';
import { $category, getCategories } from '../categories';
import { $type, getTypes } from '../types';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import persist from 'effector-localstorage';

export const FirmsGate = createGate('FirmsGate');
export const FirmGate = createGate<FirmId>('FirmGate');

export const firmsD = createDomain('firms');

export interface ExtFirmWithOaiDescription {
  firm_id: string;
  name: string;
  address: string;
  site: string;
  default_phone: string;
  oai_description_value: string;
  description: string;
  category_id: string;
}

export interface FirmsQueryResult {
  status: string;
  data: {
    firms: ExtFirmWithOaiDescription[];
    firms_count: number;
  };
}

export interface FirmQueryResult {
  status: string;
  data: {
    firm: ExtFirmWithOaiDescription;
  };
}

export interface FirmsParams {
  city_id: string;
  category_id: string;
}

export interface FirmParamsWithPage extends FirmsParams {
  page: number;
}

export const $firms = firmsD.createStore<ExtFirmWithOaiDescription[]>([]);
export const $firmsPage = firmsD.createStore<number>(1);
export const $firmsCount = firmsD.createStore<number | null>(null);
export const fetchFirms = firmsD.createEvent<FirmId>();
export const setFirmsPageEvt = firmsD.createEvent<number>();

export const getFirms = firmsD.createEffect({
  handler: async ({
    page,
    limit,
    city_id,
    category_id,
  }: PaginationOptions & FirmsParams): Promise<{ firms: FirmsQueryResult }> => {
    const res = await fetch(
      `${BACKEND_PORT}/api/firms?city_id=${city_id}&category_id=${category_id}&page=${page}&limit=${limit}`,
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      },
    );
    const firms = await res.json();

    return { firms };
  },
});

sample({
  clock: FirmsGate.open,
  source: [$city, $category],
  // @ts-ignore
  filter: ([city, category]) => !!city?.city_id && !!category?.category_id,
  fn: ([city, category]) => {
    // @ts-ignore
    return { page: 1, limit: 10, city_id: city?.city_id, category_id: category?.category_id };
  },
  target: getFirms,
});

sample({
  clock: getFirms.doneData,
  fn: (c) => c.firms.data.firms || [],
  target: $firms,
});

sample({
  clock: getFirms.doneData,
  fn: (c) => c.firms.data.firms_count || null,
  target: $firmsCount,
});

sample({
  clock: setFirmsPageEvt,
  target: $firmsPage,
});

// === FIRM ===

export const firmD = createDomain('firm');

export interface FirmId {
  firmId: string;
}

export const $firm = firmD.createStore<ExtFirmWithOaiDescription | null>(null);
persist({
  store: $firm,
  key: 'firm',
});
export const $firmName = firmD.createStore<string | null>(null);
export const fetchFirmEvt = firmD.createEvent<FirmId>();

export const getFirm = firmD.createEffect({
  handler: async ({ firmId }: FirmId): Promise<{ firm: FirmQueryResult }> => {
    const res = await fetch(`${BACKEND_PORT}/api/firm/${firmId}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const firm = await res.json();

    return { firm };
  },
});

// sample({
//   clock: FirmGate.open,
//   target: getFirm,
// });

sample({
  clock: fetchFirmEvt,
  fn: (c) => c,
  target: getFirm,
});

sample({
  clock: getFirm.doneData,
  fn: (c) => c.firm.data.firm || null,
  target: $firm,
});

sample({
  clock: FirmGate.open,
  source: $firms,
  fn: (s, c) => transliterate(s?.find((firm) => firm?.firm_id === c?.firmId)?.name || ''),
  target: $firmName,
});

// Pagination by city, category, type
sample({
  clock: setFirmsPageEvt,
  source: [$city, $category],
  fn: ([city, category], page) => {
    // @ts-ignore
    return { page, limit: 10, city_id: city?.city_id, category_id: category?.category_id };
  },
  target: getFirms,
});

sample({
  clock: [getCities.doneData, getCategories.doneData, getTypes.doneData],
  source: [$city, $category],
  filter: ([city, category]) =>
    // @ts-ignore
    !!city?.city_id && !!category?.category_id,
  fn: ([city, category]) => {
    // @ts-ignore
    return { page: 1, limit: 10, city_id: city?.city_id, category_id: category?.category_id };
  },
  target: getFirms,
});
