import { sample } from 'effector';
import { $categories, CityGate, getCategories } from '..';

sample({
  clock: CityGate.open,
  source: $categories,
  filter: (s) => !s.length,
  fn: (_) => ({ page: 1, limit: 10 }),
  target: getCategories,
});
