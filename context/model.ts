import { storage } from '@/shared';
import { createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

export interface StorageData {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

export const PageGate = createGate<{ role: string }>('page');

export const setStore = createEvent<StorageData>();
export const $store = createStore<StorageData | null>(null);

sample({
  clock: setStore,
  fn: (v) => {
    if (storage) {
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

$store.watch((value) => {
  if (!value) {
    if (storage) {
      const x = storage.getItem('user-data');
      if (x && x !== null) {
        setStore(JSON.parse(x));
        return JSON.parse(x);
      }
    }
  }
  return value;
});
