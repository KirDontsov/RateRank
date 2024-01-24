import { createGate } from 'effector-react';
import { createDomain, sample } from 'effector';
import { PaginationOptions } from '@/shared';

export const ReviewsGate = createGate<{ firmId: string }>('ReviewsGate');
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
export const fetchReviews = reviewsD.createEvent<{ firmId: string }>();
export const setReviewsPageEvt = reviewsD.createEvent<number>();

export const getReviews = reviewsD.createEffect({
  handler: async ({
    firmId,
    page,
    limit,
  }: PaginationOptions & ReviewOptions): Promise<{ reviews: ReviewsQueryResult }> => {
    const res = await fetch(`http://localhost:8080/api/reviews/${firmId}?page=${page}&limit=${limit}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const reviews = await res.json();

    return { reviews };
  },
});

sample({
  clock: ReviewsGate.open,
  source: $reviews,
  filter: (s) => !s?.length,
  fn: (_, c) => ({ firmId: c?.firmId, page: 1, limit: 10 }),
  target: getReviews,
});

sample({
  clock: getReviews.doneData,
  fn: (c) => c.reviews.data.reviews || [],
  target: $reviews,
});

sample({
  clock: getReviews.doneData,
  fn: (c) => c.reviews.data.reviews_count || null,
  target: $reviewsCount,
});

sample({
  clock: setReviewsPageEvt,
  target: $reviewsPage,
});
