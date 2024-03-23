import { createGate } from 'effector-react';
import { createDomain, sample } from 'effector';
import { BACKEND_PORT, PaginationOptions } from '@/shared';
import { $firm } from '..';

export const ReviewsGate = createGate<{ firmId: string }>('ReviewsGate');
export const ReviewsPageGate = createGate<number>('ReviewsPageGate');
export const reviewsD = createDomain('reviews');

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

export interface AddReview {
  firm_id: string;
  author?: string;
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

export const $reviews = reviewsD.createStore<Review[]>([]);
export const $reviewsPage = reviewsD.createStore<number>(1);
export const $reviewsCount = reviewsD.createStore<number | null>(null);
export const fetchReviewsEvt = reviewsD.createEvent<{ firmId: string }>();
export const setReviewsPageEvt = reviewsD.createEvent<number>();
export const addReviewEvt = reviewsD.createEvent<AddReview>();

export const getReviewsFx = reviewsD.createEffect({
  handler: async ({
    firmId,
    page,
    limit,
  }: PaginationOptions & ReviewOptions): Promise<{ reviews: ReviewsQueryResult }> => {
    const res = await fetch(`${BACKEND_PORT}/api/reviews/${firmId}?page=${page}&limit=${limit}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const reviews = await res.json();

    return { reviews };
  },
});

sample({
  // @ts-ignore
  clock: ReviewsGate.open,
  source: [$reviews, $reviewsPage],
  // @ts-ignore
  filter: ([s]) => !s?.length,
  fn: ([_, reviewsPage], c) => {
    return { firmId: c?.firmId, page: reviewsPage || 1, limit: 10 };
  },
  target: getReviewsFx,
});

sample({
  clock: getReviewsFx.doneData,
  fn: (c) => c.reviews.data.reviews || [],
  target: $reviews,
});

sample({
  clock: getReviewsFx.doneData,
  fn: (c) => c.reviews.data.reviews_count || null,
  target: $reviewsCount,
});

sample({
  clock: ReviewsGate.close,
  source: $reviews,
  fn: (_, c) => [],
  target: $reviews,
});

// Pagination
sample({
  clock: setReviewsPageEvt,
  source: $firm,
  filter: (firm) => firm !== null,
  fn: (firm, page) => ({ firmId: firm?.firm_id ?? '', page, limit: 10 }),
  target: getReviewsFx,
});

sample({
  clock: setReviewsPageEvt,
  target: $reviewsPage,
});

sample({
  clock: ReviewsPageGate.open,
  target: $reviewsPage,
});

sample({
  source: $firm,
  fn: (c) => ({ firmId: c?.firm_id || '' }),
  target: fetchReviewsEvt,
});

export const addReviewFx = reviewsD.createEffect({
  handler: async (variables: AddReview): Promise<{ reviews: ReviewsQueryResult }> => {
    const { firm_id } = variables;
    const res = await fetch(`${BACKEND_PORT}/api/review/${firm_id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(variables),
    });
    const reviews = await res.json();

    return { reviews };
  },
});

sample({
  clock: addReviewEvt,
  target: addReviewFx,
});
