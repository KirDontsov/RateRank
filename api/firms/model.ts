import { BACKEND_PORT, FirmId, FirmUrl, PaginationOptions } from '@/shared';
import { createDomain, sample } from 'effector';
import persist from 'effector-localstorage';
import { createGate } from 'effector-react';
import { $categories, $category, getCategoriesFx } from '../categories';
import { $cities, $city, getCitiesFx } from '../cities';
import { getTypesFx } from '../types';

export const FirmsGate = createGate<{ cityAbbr: string; categoryAbbr: string }>('FirmsGate');
export const FirmsPageGate = createGate<number>('FirmsPageGate');
export const FirmGate = createGate<FirmUrl>('FirmGate');

export const firmsD = createDomain('firms');

export interface Firm {
  firm_id: string;
  url: string;
  name: string;
  address: string;
  site: string;
  default_phone: string;
  description: string;
  category_id: string;
}

export interface FirmsQueryResult {
  status: string;
  data: {
    firms: Firm[];
    firms_count: number;
  };
}

export interface FirmQueryResult {
  status: string;
  data: {
    firm: Firm;
  };
}

export interface FirmsParams {
  city_id: string;
  category_id: string;
}

export interface FirmParamsWithPage extends FirmsParams {
  page: number;
}

export const $firms = firmsD.createStore<Firm[]>([]);
persist({
  store: $firms,
  key: 'firms',
});
export const $firmsPage = firmsD.createStore<number>(1);
export const $firmsCount = firmsD.createStore<number | null>(null);

export const setFirmsPageEvt = firmsD.createEvent<number>();

export const getFirmsFx = firmsD.createEffect({
  handler: async ({
    page,
    limit,
    city_id,
    category_id,
  }: PaginationOptions & FirmsParams): Promise<{ firms: FirmsQueryResult }> => {
    const res = await fetch(
      `${BACKEND_PORT}/api/firms_by_abbr?city_id=${city_id}&category_id=${category_id}&page=${page}&limit=${limit}`,
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
  // @ts-ignore
  clock: FirmsGate.open,
  source: [$city, $category, $firmsPage, $cities, $categories],
  fn: ([city, category, firmsPage, cities, categories], c) => {
    return {
      page: firmsPage || 1,
      limit: 10,
      // @ts-ignore
      city_id: c?.cityAbbr,
      // @ts-ignore
      category_id: c?.categoryAbbr,
    };
  },
  target: getFirmsFx,
});

sample({
  clock: getFirmsFx.doneData,
  fn: (c) => c.firms.data.firms || [],
  target: $firms,
});

sample({
  clock: getFirmsFx.doneData,
  fn: (c) => c.firms.data.firms_count || null,
  target: $firmsCount,
});

// === FIRM ===

export const firmD = createDomain('firm');

export const $firm = firmD.createStore<Firm | null>(null);
export const $firmLoading = firmD.createStore(false);
persist({
  store: $firm,
  key: 'firm',
});
export const $firmName = firmD.createStore<string | null>(null);
export const setFirmEvt = firmD.createEvent<FirmUrl>();
export const setFirmLoadingEvt = firmD.createEvent<boolean>();

export const getFirmFx = firmD.createEffect({
  handler: async ({ firmId }: FirmId): Promise<{ firm: FirmQueryResult }> => {
    const res = await fetch(`${BACKEND_PORT}/api/firm/${firmId}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const firm = await res.json();
    return { firm };
  },
});

export const getFirmByUrlFx = firmD.createEffect({
  handler: async ({ firmUrl }: FirmUrl): Promise<{ firm: FirmQueryResult }> => {
    const res = await fetch(`${BACKEND_PORT}/api/firm_url/${firmUrl}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const firm = await res.json();
    return { firm };
  },
});

sample({
  clock: FirmGate.open,
  target: getFirmByUrlFx,
});

sample({
  clock: setFirmEvt,
  fn: (c) => c,
  target: getFirmByUrlFx,
});

sample({
  clock: getFirmByUrlFx.pending,
  fn: () => true,
  target: $firmLoading,
});

sample({
  clock: setFirmLoadingEvt,
  fn: () => true,
  target: $firmLoading,
});

sample({
  clock: getFirmByUrlFx.doneData,
  fn: (c) => c.firm.data.firm || null,
  target: $firm,
});

sample({
  clock: getFirmByUrlFx.doneData,
  fn: () => false,
  target: $firmLoading,
});

sample({
  clock: FirmGate.open,
  source: $firms,
  fn: (s, c) => s?.find((firm) => firm?.url === c?.firmUrl)?.url || '',
  target: $firmName,
});

sample({
  clock: FirmsPageGate.open,
  target: $firmsPage,
});

sample({
  clock: setFirmsPageEvt,
  target: $firmsPage,
});

// sample({
//   // @ts-ignore
//   clock: [getCitiesFx.doneData, getCategoriesFx.doneData, getTypesFx.doneData],
//   source: [$city, $category, $firmsPage],
//   filter: ([city, category]) =>
//     // @ts-ignore
//     !!city?.city_id && !!category?.category_id,
//   fn: ([city, category, firmsPage]) => {
//     // @ts-ignore
//     return { page: firmsPage || 1, limit: 10, city_id: city?.city_id, category_id: category?.category_id };
//   },
//   target: getFirmsFx,
// });

// Pagination by city, category, type
sample({
  // @ts-ignore
  clock: setFirmsPageEvt,
  source: [$city, $category],
  fn: ([city, category], page) => {
    // @ts-ignore
    return { page, limit: 10, city_id: city?.abbreviation, category_id: category?.abbreviation };
  },
  target: getFirmsFx,
});
