import { createGate } from 'effector-react';
import { createDomain, sample } from 'effector';
import { BACKEND_PORT, PaginationOptions } from '@/shared';
import { $firm } from '..';

export const OaiReviewsGate = createGate<{ firmId: string }>('OaiReviewsGate');
export const oaiReviewsD = createDomain('reviews');

export interface OaiReviewOptions {
  firmId: string;
}

export interface OaiReview {
  oai_review_id: string;
  firm_id: string;
  text?: string;
}
export interface OaiReviewsQueryResult {
  status: string;
  data: {
    oai_reviews: OaiReview[];
    oai_reviews_count: number;
  };
}

export const $oaiReviews = oaiReviewsD.createStore<OaiReview[]>([]);
export const $oaiReviewsPage = oaiReviewsD.createStore<number>(1);
export const $oaiReviewsCount = oaiReviewsD.createStore<number | null>(null);
export const fetchOaiReviewsEvt = oaiReviewsD.createEvent<{ firmId: string }>();
export const setOaiReviewsPageEvt = oaiReviewsD.createEvent<number>();

export const getOaiReviewsFx = oaiReviewsD.createEffect({
  handler: async ({
    firmId,
    page,
    limit,
  }: PaginationOptions & OaiReviewOptions): Promise<{ oai_reviews: OaiReviewsQueryResult }> => {
    const res = await fetch(`${BACKEND_PORT}/api/oai_reviews/${firmId}?page=${page}&limit=${limit}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const oai_reviews = await res.json();

    return { oai_reviews };
  },
});

sample({
  clock: OaiReviewsGate.open,
  source: $oaiReviews,
  filter: (s) => !s?.length,
  fn: (_, c) => ({ firmId: c?.firmId, page: 1, limit: 10 }),
  target: getOaiReviewsFx,
});

sample({
  clock: OaiReviewsGate.close,
  source: $oaiReviews,
  fn: (_, c) => [],
  target: $oaiReviews,
});

sample({
  clock: getOaiReviewsFx.doneData,
  fn: (c) => c.oai_reviews.data.oai_reviews || [],
  target: $oaiReviews,
});

sample({
  clock: getOaiReviewsFx.doneData,
  fn: (c) => c.oai_reviews.data.oai_reviews_count || null,
  target: $oaiReviewsCount,
});

// sample({
//   clock: setOaiReviewsPageEvt,
//   target: $oaiReviewsPage,
// });

// // Pagination
// sample({
//   clock: setOaiReviewsPageEvt,
//   source: $firm,
//   filter: (firm) => firm !== null,
//   fn: (firm, page) => ({ firmId: firm?.firm_id ?? '', page, limit: 10 }),
//   target: getOaiReviews,
// });

sample({
  source: $firm,
  fn: (c) => ({ firmId: c?.firm_id || '' }),
  target: fetchOaiReviewsEvt,
});
