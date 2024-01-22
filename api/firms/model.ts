import { createEffect, createEvent, createStore, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { getReviews, notNull } from '../reviews/model';

export const FirmsGate = createGate('FirmsGate');
export const FirmGate = createGate<{ firmId: string }>('FirmGate');

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
    firms_count: number;
  };
}

export interface FirmQueryResult {
  status: string;
  data: {
    firm: Firm;
  };
}

export const $firmsGroups = createStore<Firm[]>([]);
export const $firmsPage = createStore<number>(1);
export const $firmsCount = createStore<number | null>(null);
export const fetchFirms = createEvent<{ firmId: string }>();
export const setFirmsPageEvt = createEvent<number>();

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
  target: [getFirms, getReviews],
});

sample({
  clock: getFirms.doneData,
  fn: (c) => {
    return c.firms.data.firms;
  },
  target: $firmsGroups,
});

sample({
  clock: getFirms.doneData,
  fn: (c) => {
    return c.firms.data.firms_count || null;
  },
  target: $firmsCount,
});

sample({
  clock: setFirmsPageEvt,
  target: $firmsPage,
});

// === FIRM ===

export const $firm = createStore<Firm | null>(null);
export const fetchFirmEvt = createEvent<{ firmId: string }>();

export const getFirm = createEffect({
  handler: async ({ firmId }: { firmId: string }): Promise<{ firm: FirmQueryResult }> => {
    const res = await fetch(`http://localhost:8080/api/firm/${firmId}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const firm = await res.json();

    return { firm };
  },
});

sample({
  clock: FirmGate.open,
  fn: (v) => v,
  target: getFirm,
});

sample({
  clock: getFirm.doneData,
  fn: (c) => c.firm.data.firm,
  target: $firm,
});

// Pagination
sample({
  clock: setFirmsPageEvt,
  source: $firm,
  filter: (firm) => firm !== null,
  fn: (firm, page) => ({ firmId: firm?.firm_id ?? '', page, limit: 10 }),
  target: getFirms,
});
