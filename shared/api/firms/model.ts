import { PaginationOptions } from '@/shared';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

export const FirmsGate = createGate('FirmsGate');
export const FirmGate = createGate<{ firmId: string }>('FirmGate');

export const firmsD = createDomain('firms');

export interface ExtFirmWithOaiDescription {
  firm_id: string;
  name: string;
  address: string;
  site: string;
  default_phone: string;
  oai_description_value: string;
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

export const $firms = firmsD.createStore<ExtFirmWithOaiDescription[]>([]);
export const $firmsPage = firmsD.createStore<number>(1);
export const $firmsCount = firmsD.createStore<number | null>(null);
export const fetchFirms = firmsD.createEvent<{ firmId: string }>();
export const setFirmsPageEvt = firmsD.createEvent<number>();

export const getFirms = firmsD.createEffect({
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
  source: $firms,
  filter: (s) => !s?.length,
  fn: () => ({ page: 1, limit: 10 }),
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

export const $firm = firmD.createStore<ExtFirmWithOaiDescription | null>(null);
export const fetchFirmEvt = firmD.createEvent<{ firmId: string }>();

export const getFirm = firmD.createEffect({
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
  target: getFirm,
});

sample({
  clock: getFirm.doneData,
  fn: (c) => c.firm.data.firm || null,
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
