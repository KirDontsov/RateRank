import { storage } from '@/shared';
import { createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

export interface StorageData {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

export const PageGate = createGate<StorageData>('PageGate');
export const LoadingGate = createGate<boolean>('LoadingGate');

export const setStore = createEvent<StorageData>();
export const $store = createStore<StorageData | null>(null);

export const setLoading = createEvent<boolean>();
export const $loading = createStore<boolean>(true);

// При логине добавляю токен в сторейдж и стейт
sample({
  clock: setStore,
  fn: (v) => {
    if (typeof window !== 'undefined') {
      const x = storage.getItem('user-data');
      if (x && x !== null) {
        return JSON.parse(x);
      } else {
        return v;
      }
    }
  },
  target: $store,
});

// При открытии каждой страницы надо либо слать запрос на бэк либо лезть в сторейдж
sample({
  clock: PageGate.open,
  fn: (v) => {
    if (typeof window !== 'undefined') {
      const x = storage.getItem('user-data');
      if (x && x !== null) {
        console.log('gate', v);
        return JSON.parse(x);
      } else {
        return v;
      }
    }
  },
  target: $store,
});

sample({
  clock: setStore,
  fn: (v) => {
    if (typeof window !== 'undefined') {
      const x = storage.getItem('user-data');
      if (x && x !== null) {
        return JSON.parse(x);
      } else {
        return v;
      }
    }
  },
  target: $store,
});

// При открытии каждой страницы надо либо слать запрос на бэк либо лезть в сторейдж
sample({
  clock: PageGate.open,
  source: $store,
  fn: (s, v) => {
    return false;
  },
  target: $loading,
});
