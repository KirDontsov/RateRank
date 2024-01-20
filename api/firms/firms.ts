import { createEffect, createStore, forward, sample } from 'effector';
import { createGate } from 'effector-react';

export const FirmsGate = createGate('FirmsGate');

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface Firm {
  firm_id: string;
  two_gis_firm_id: string;
  category_id: string;
  name: string;
  description: string;
  address: string;
  floor: string;
  site: string;
  default_email: string;
  default_phone: string;
  created_ts: string;
  updated_ts: string;
}

export interface FirmsQueryResult {
  status: string;
  data: {
    firms: Firm[];
  };
}

export const getFirms = createEffect({
  handler: async ({ page, limit }: PaginationOptions): Promise<{ firms: FirmsQueryResult }> => {
    const res = await fetch(`http://localhost:8080/api/firms?page=${page}&limit=${limit}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const firms = await res.json();

    return { firms };
  },
});

sample({
  clock: FirmsGate.open,
  fn: () => ({ page: 1, limit: 10 }),
  target: getFirms,
});

export const $firmsGroups = createStore<Firm[]>([]);

sample({
  clock: getFirms.doneData,
  fn: (c) => {
    return c.firms.data.firms;
  },
  target: $firmsGroups,
});
