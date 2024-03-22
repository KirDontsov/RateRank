import { createGate } from 'effector-react';
import { createDomain, sample } from 'effector';
import { BACKEND_PORT, PaginationOptions } from '@/shared';
import { $firm } from '..';

export const PricesGate = createGate<{ firmId: string }>('PricesGate');
export const pricesD = createDomain('reviews');

export interface PricesOptions {
  firmId: string;
}

export interface PriceItem {
  price_item_id: string;
  firm_id: string;
  price_category_id?: string;
  name?: string;
  value?: string;
}

export interface PriceCategory {
  price_category_id: string;
  firm_id: string;
  name?: string;
  value?: string;
}
export interface PricesQueryResult {
  status: string;
  data: {
    prices_categories: PriceCategory[];
    prices_items: PriceItem[];
    prices_count: number;
  };
}

export const $pricesItems = pricesD.createStore<PriceItem[]>([]);
export const $pricesCategories = pricesD.createStore<PriceCategory[]>([]);
export const $pricesPage = pricesD.createStore<number>(1);
export const $pricesCount = pricesD.createStore<number | null>(null);
export const fetchPricesEvt = pricesD.createEvent<{ firmId: string }>();
export const setPricesPageEvt = pricesD.createEvent<number>();

export const getPricesFx = pricesD.createEffect({
  handler: async ({
    firmId,
    page,
    limit,
  }: PaginationOptions & PricesOptions): Promise<{ prices: PricesQueryResult }> => {
    const res = await fetch(`${BACKEND_PORT}/api/prices/${firmId}?page=${page}&limit=${limit}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const prices = await res.json();

    return { prices };
  },
});

sample({
  clock: PricesGate.open,
  source: $pricesItems,
  filter: (s) => !s?.length,
  fn: (_, c) => ({ firmId: c?.firmId, page: 1, limit: 10 }),
  target: getPricesFx,
});

sample({
  clock: PricesGate.close,
  source: $pricesItems,
  fn: (_, c) => [],
  target: $pricesItems,
});

sample({
  clock: getPricesFx.doneData,
  fn: (c) => c.prices.data.prices_items || [],
  target: $pricesItems,
});

sample({
  clock: getPricesFx.doneData,
  fn: (c) => c.prices.data.prices_categories || [],
  target: $pricesCategories,
});

sample({
  clock: getPricesFx.doneData,
  fn: (c) => c.prices.data.prices_count || null,
  target: $pricesCount,
});

sample({
  clock: setPricesPageEvt,
  target: $pricesPage,
});

// Pagination
sample({
  clock: setPricesPageEvt,
  source: $firm,
  filter: (firm) => firm !== null,
  fn: (firm, page) => ({ firmId: firm?.firm_id ?? '', page, limit: 10 }),
  target: getPricesFx,
});

sample({
  source: $firm,
  fn: (c) => ({ firmId: c?.firm_id || '' }),
  target: fetchPricesEvt,
});
