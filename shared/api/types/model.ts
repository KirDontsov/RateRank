import { PaginationOptions } from '@/shared';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

export interface Type {
  type_id: string;
  name: string;
  abbreviation: string;
}

export interface TypesQueryResult {
  status: string;
  data: {
    types: Type[];
    types_count: number;
  };
}

export const typeD = createDomain('typeD');
export const typesD = createDomain('typesD');
export const TypeGate = createGate<{ typeId: string }>('TypeGate');
export const TypesGate = createGate('TypesGate');

export const $typeAbbreviation = typeD.createStore<string | null>(null);

export const $type = typeD.createStore<Type | null>({
  type_id: 'Выберите город',
  name: 'Выберите город',
  abbreviation: 'Выберите город',
});
export const setTypeEvt = typeD.createEvent<string>();

export const $types = typesD.createStore<Type[]>([]);
export const $typesCount = typesD.createStore<number | null>(null);

sample({
  clock: setTypeEvt,
  source: $types,
  fn: (s, c) => s.find((city) => city.type_id === c) || null,
  target: $type,
});

export const getTypes = typesD.createEffect({
  handler: async ({ page, limit }: PaginationOptions): Promise<{ types: TypesQueryResult }> => {
    const res = await fetch(`http://localhost:8080/api/types?page=${page}&limit=${limit}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const types = await res.json();

    return { types };
  },
});

sample({
  clock: TypesGate.open,
  source: $types,
  filter: (c) => !c?.length,
  fn: () => ({ page: 1, limit: 10 }),
  target: getTypes,
});

sample({
  clock: getTypes.doneData,
  fn: (c) => c.types.data.types || [],
  target: $types,
});

sample({
  clock: getTypes.doneData,
  fn: (c) => c.types.data.types_count || null,
  target: $typesCount,
});

// === CITY ===

sample({
  clock: TypeGate.open,
  source: $types,
  filter: (s) => !s.length,
  fn: () => ({ page: 1, limit: 10 }),
  target: getTypes,
});

sample({
  clock: TypeGate.open,
  fn: (c) => c?.typeId,
  target: $typeAbbreviation,
});

sample({
  clock: getTypes.doneData,
  source: $typeAbbreviation,
  filter: (s, c) => s !== '',
  fn: (s, c) => c?.types?.data.types?.find((type) => type?.abbreviation === s) || null,
  target: $type,
});
