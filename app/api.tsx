import {
  CategoriesQueryResult,
  Category,
  CategoryQueryResult,
  CitiesQueryResult,
  City,
  Firm,
  FirmQueryResult,
  ImagesQueryResult,
  OaiDescriptionQueryResult,
  OaiReview,
  OaiReviewsQueryResult,
  Page,
  PageItem,
  PageQueryResult,
  PricesQueryResult,
  ReviewsQueryResult,
} from '@/api';
import { BACKEND_PORT } from '@/shared';
import { notFound } from 'next/navigation';

/** SSR */
export async function getCategories(page: number, limit: number): Promise<Category[] | null> {
  try {
    const categories: CategoriesQueryResult = await fetch(
      `${BACKEND_PORT}/api/categories?page=${page}&limit=${limit}`,
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      },
    )
      .then((res) => res.json())
      .catch(() => {
        console.warn('error');
      });

    return categories?.data?.categories?.filter((x) => x?.is_active === 'true') || null;
  } catch (error) {
    // @ts-ignore
    throw new Error(error?.message || error);
  }
}

export async function getCities(): Promise<City[] | null> {
  try {
    const cities: CitiesQueryResult = await fetch(`${BACKEND_PORT}/api/cities?page=${1}&limit=${10}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    })
      .then((res) => res.json())
      .catch(() => {
        console.warn('error');
      });

    return cities?.data?.cities?.filter((x) => x?.is_active === 'true') || null;
  } catch (error) {
    // @ts-ignore
    throw new Error(error?.message || error);
  }
}

export async function getCity(cityId: string): Promise<City | null> {
  try {
    const cities: City[] | null = await getCities();

    const city = cities?.find((city) => city?.abbreviation === cityId);

    return city || null;
  } catch (error) {
    // @ts-ignore
    throw new Error(error?.message || error);
  }
}

export async function getCategory(categoryId: string): Promise<Category | null> {
  try {
    if (!categoryId || categoryId === 'undefined') {
      return null;
    }
    const category: CategoryQueryResult = await fetch(`${BACKEND_PORT}/api/category_abbr/${categoryId}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    })
      .then((res) => res.json())
      .catch(() => {
        console.warn('error');
      });

    return category?.data?.category || null;
  } catch (error) {
    // @ts-ignore
    throw new Error(error?.message || error);
  }
}

export async function getFirms(
  cityId: string,
  categoryId: string,
  page: string,
  limit: number,
): Promise<Firm[] | null> {
  try {
    if (
      !cityId ||
      ['Выберите город', 'jobs', 'analytics', 'catalog', 'help', 'undefined'].indexOf(cityId) !== -1 ||
      !categoryId ||
      categoryId === 'undefined'
    ) {
      return null;
    }

    const firms = await fetch(
      `${BACKEND_PORT}/api/firms_by_abbr?city_id=${cityId}&category_id=${categoryId}&page=${page}&limit=${limit}`,
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      },
    )
      .then((res) => res.json())
      .catch(() => {
        console.warn('error');
      });

    return firms?.data?.firms || null;
  } catch (error) {
    // @ts-ignore
    throw new Error(error?.message || error);
  }
}

export async function getFirmsForMap(cityId: string, categoryId: string): Promise<Firm[] | null> {
  try {
    if (!cityId || !categoryId) {
      return null;
    }

    const firms = await fetch(`${BACKEND_PORT}/api/firms_by_abbr_for_map?city_id=${cityId}&category_id=${categoryId}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    })
      .then((res) => res.json())
      .catch(() => {
        console.warn('error');
      });

    return firms?.data?.firms || null;
  } catch (error) {
    // @ts-ignore
    throw new Error(error?.message || error);
  }
}

export async function getFirm(firmId: string): Promise<Firm | null> {
  try {
    const firm: FirmQueryResult = await fetch(`${BACKEND_PORT}/api/firm_by_url/${firmId}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    })
      .then((res) => res.json())
      .catch(() => {
        console.warn('error getFirm');
      });

    return firm?.data?.firm || null;
  } catch (error) {
    // @ts-ignore
    throw new Error(error?.message || error);
  }
}

export async function getImages(firmUrl: string) {
  try {
    const images: ImagesQueryResult = await fetch(`${BACKEND_PORT}/api/images_by_url/${firmUrl}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    })
      .then((res) => res.json())
      .catch(() => {
        console.warn('error getImages');
      });

    return images?.data?.images || null;
  } catch (error) {
    // @ts-ignore
    throw new Error(error?.message || error);
  }
}

export async function getReviews(firmUrl: string, page: string, limit: number) {
  try {
    const reviews: ReviewsQueryResult = await fetch(
      `${BACKEND_PORT}/api/reviews_by_url/${firmUrl}?page=${page}&limit=${limit}`,
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      },
    )
      .then((res) => res.json())
      .catch(() => {
        console.warn('error getReviews');
      });

    return reviews?.data?.reviews || null;
  } catch (error) {
    // @ts-ignore
    throw new Error(error?.message || error);
  }
}

export async function getOaiReviews(firmUrl: string) {
  try {
    const oai_reviews: OaiReviewsQueryResult = await fetch(`${BACKEND_PORT}/api/oai_reviews_by_url/${firmUrl}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    })
      .then((res) => res.json())
      .catch(() => {
        console.warn('error getReviews');
      });

    return oai_reviews?.data?.oai_reviews || null;
  } catch (error) {
    // @ts-ignore
    throw new Error(error?.message || error);
  }
}

export async function getOaiDescription(firmUrl: string) {
  try {
    const oai_description: OaiDescriptionQueryResult = await fetch(
      `${BACKEND_PORT}/api/oai_description_by_url/${firmUrl}`,
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      },
    )
      .then((res) => res.json())
      .catch(() => {
        console.warn('error getReviews');
      });

    return oai_description?.data?.oai_description || null;
  } catch (error) {
    // @ts-ignore
    throw new Error(error?.message || error);
  }
}

export async function getPrices(firmUrl: string) {
  try {
    const oai_reviews: PricesQueryResult = await fetch(`${BACKEND_PORT}/api/prices_by_url/${firmUrl}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    })
      .then((res) => res.json())
      .catch(() => {
        console.warn('error getReviews');
      });

    return {
      prices_items: oai_reviews?.data?.prices_items || null,
      prices_categories: oai_reviews?.data?.prices_categories || null,
    };
  } catch (error) {
    // @ts-ignore
    throw new Error(error?.message || error);
  }
}

export async function getSimilarFirmsImages(firmUrls: string[]): Promise<ImagesQueryResult[]> {
  try {
    const requests: Promise<ImagesQueryResult>[] = [];

    firmUrls.forEach((url: string) => {
      requests.push(
        fetch(`${BACKEND_PORT}/api/image_by_url/${url}`, {
          headers: { 'Content-Type': 'application/json' },
          method: 'GET',
        })
          .then((res) => res.json())
          .catch(() => {
            console.warn('error getSimilarFirmsImages');
          }),
      );
    });

    const similarImages = await Promise.all(requests);

    return similarImages || null;
  } catch (error) {
    // @ts-ignore
    throw new Error(error?.message || error);
  }
}

export async function getPages(): Promise<PageItem[] | null> {
  try {
    const firms = await fetch(`${BACKEND_PORT}/api/pages`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    })
      .then((res) => res.json())
      .catch(() => {
        console.warn('error');
      });

    return firms?.data?.pages || null;
  } catch (error) {
    // @ts-ignore
    throw new Error(error?.message || error);
  }
}

export async function getPageByUrl(pageUrl: string): Promise<Page | null> {
  try {
    const page: PageQueryResult = await fetch(`${BACKEND_PORT}/api/page_by_url/${pageUrl}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    })
      .then((res) => res.json())
      .catch(() => {
        console.warn('error getFirm');
      });

    if (!page?.data) {
      notFound();
    }

    return page?.data || null;
  } catch (error) {
    // @ts-ignore
    throw new Error(error?.message || error);
  }
}

export async function getOaiReviewsForFirms(firms: Firm[] | null): Promise<OaiReview[] | null> {
  try {
    if (!firms?.length) {
      return null;
    }

    const requests: Promise<OaiReviewsQueryResult>[] = [];

    firms.forEach(({ url }: Firm) => {
      requests.push(
        fetch(`${BACKEND_PORT}/api/oai_reviews_by_url/${url}`, {
          headers: { 'Content-Type': 'application/json' },
          method: 'GET',
        })
          .then((res) => res.json())
          .catch(() => {
            console.warn('error getOaiReviewsForFirms');
          }),
      );
    });

    const oai_reviews = await Promise.all(requests);

    return oai_reviews.map((x) => x?.data?.oai_reviews).flat() || null;
  } catch (error) {
    // @ts-ignore
    throw new Error(error?.message || error);
  }
}
