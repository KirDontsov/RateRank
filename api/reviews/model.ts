import { createGate } from 'effector-react';
import { $firm, Firm, FirmGate, PaginationOptions } from '../firms';
import { Domain, Unit, createDomain, createEffect, createEvent, createStore, guard, sample } from 'effector';

export const ReviewsGate = createGate<{ firmId: string }>('ReviewsGate');

/** Фильтрует значение, исключая null */
export function notNull<T>(source: Unit<T>, domain?: Domain) {
  const d = domain ?? createDomain();

  const x = d.createEvent<NonNullable<T>>();

  return sample({
    source,
    filter: (value) => value != null,
    fn: (v) => v! as NonNullable<T>,
    target: x,
  });
}

export interface ReviewOptions {
  firmId: string;
}

export interface Review {
  review_id: string;
  firm_id: string;
  two_gis_firm_id?: string;
  author?: string;
  date?: string;
  rating?: string;
  text?: string;
}
export interface ReviewsQueryResult {
  status: string;
  data: {
    reviews: Review[];
    reviews_count: number;
  };
}

export const $reviews = createStore<Review[]>([]);
export const $reviewsPage = createStore<number>(1);
export const $reviewsCount = createStore<number | null>(null);
export const fetchReviews = createEvent<{ firmId: string }>();
export const setReviewsPageEvt = createEvent<number>();

export const getReviews = createEffect({
  handler: async ({
    firmId,
    page,
    limit,
  }: PaginationOptions & ReviewOptions): Promise<{ reviews: ReviewsQueryResult }> => {
    console.log('here');
    const res = await fetch(`http://localhost:8080/api/reviews/${firmId}?page=${page}&limit=${limit}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const reviews = await res.json();

    return { reviews };
  },
});

// sample({
//   clock: ReviewsGate.open,
//   target: fetchReviews,
// });

sample({
  clock: ReviewsGate.open,
  fn: (s) => ({ firmId: s?.firmId, page: 1, limit: 10 }),
  target: getReviews,
});

sample({
  clock: getReviews.doneData,
  fn: (c) => {
    return c.reviews.data.reviews;
  },
  target: $reviews,
});

sample({
  clock: getReviews.doneData,
  fn: (c) => {
    return c.reviews.data.reviews_count || null;
  },
  target: $reviewsCount,
});

sample({
  clock: setReviewsPageEvt,
  target: $reviewsPage,
});
