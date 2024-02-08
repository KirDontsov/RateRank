import { PaginationOptions } from '@/shared';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

export interface Category {
  category_id: string;
  name: string;
  abbreviation: string;
}

export interface CategoriesQueryResult {
  status: string;
  data: {
    categories: Category[];
    categories_count: number;
  };
}

export const categoryD = createDomain('category');
export const categoriesD = createDomain('categories');
export const CategoryGate = createGate<{ categoryId: string }>('CategoryGate');
export const CategoriesGate = createGate('CategoriesGate');

export const $categoryAbbreviation = categoryD.createStore<string | null>(null);

export const $category = categoryD.createStore<Category | null>({
  category_id: '',
  name: '',
  abbreviation: '',
});
export const setCategoryEvt = categoryD.createEvent<string>();

export const $categories = categoriesD.createStore<Category[]>([]);
export const $categoriesCount = categoriesD.createStore<number | null>(null);

sample({
  clock: setCategoryEvt,
  source: $categories,
  fn: (s, c) => s.find((category) => category.category_id === c) || null,
  target: $category,
});

export const getCategories = categoriesD.createEffect({
  handler: async ({ page, limit }: PaginationOptions): Promise<{ categories: CategoriesQueryResult }> => {
    const res = await fetch(`http://localhost:8080/api/categories?page=${page}&limit=${limit}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const categories = await res.json();

    return { categories };
  },
});

sample({
  clock: CategoriesGate.open,
  source: $categories,
  filter: (c) => !c?.length,
  fn: () => ({ page: 1, limit: 10 }),
  target: getCategories,
});

sample({
  clock: getCategories.doneData,
  fn: (c) => c.categories.data.categories || [],
  target: $categories,
});

sample({
  clock: getCategories.doneData,
  fn: (c) => c.categories.data.categories_count || null,
  target: $categoriesCount,
});

// === Category ===

sample({
  clock: CategoryGate.open,
  source: $categories,
  filter: (s) => !s.length,
  fn: () => ({ page: 1, limit: 10 }),
  target: getCategories,
});

sample({
  clock: CategoryGate.open,
  fn: (c) => c?.categoryId,
  target: $categoryAbbreviation,
});

sample({
  clock: getCategories.doneData,
  source: $categoryAbbreviation,
  filter: (s, c) => s !== '',
  fn: (s, c) => c?.categories?.data.categories?.find((category) => category?.abbreviation === s) || null,
  target: $category,
});
