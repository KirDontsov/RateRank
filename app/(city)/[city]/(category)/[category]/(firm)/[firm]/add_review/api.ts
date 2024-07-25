import { CategoriesQueryResult, Category, CitiesQueryResult, City, Firm, FirmQueryResult } from '@/api';
import { BACKEND_PORT } from '@/shared';

/** SSR */
export async function getCities(): Promise<City[] | null> {
  const cities: CitiesQueryResult = await fetch(`${BACKEND_PORT}/api/cities?page=${1}&limit=${10}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => {
      console.warn('error');
    });

  return cities?.data?.cities || null;
}

export async function getCategories(page: number, limit: number): Promise<Category[] | null> {
  const categories: CategoriesQueryResult = await fetch(`${BACKEND_PORT}/api/categories?page=${page}&limit=${limit}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => {
      console.warn('error');
    });

  return categories?.data?.categories || null;
}

export async function getFirm(firmId: string): Promise<Firm | null> {
  const firm: FirmQueryResult = await fetch(`${BACKEND_PORT}/api/firm_by_url/${firmId}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => {
      console.warn('error getFirm');
    });

  return firm?.data?.firm || null;
}
