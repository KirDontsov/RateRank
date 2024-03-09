import { sample } from 'effector';
import { $categories, $firms, $types, CategoryGate, CityGate, TypeGate, getAllFirms, getCategories, getTypes } from '..';

sample({
  clock: CityGate.open,
  source: $categories,
  filter: (s) => !s.length,
  fn: (_) => ({ page: 1, limit: 10 }),
  target: getCategories,
});

sample({
  clock: CategoryGate.open,
  source: $types,
  filter: (s) => !s.length,
  fn: (_) => ({ page: 1, limit: 10 }),
  target: getTypes,
});

// sample({
//   clock: TypeGate.open,
//   source: $firms,
//   filter: (s) => !s.length,
//   fn: () => ({ page: 1, limit: 10 }),
//   target: getAllFirms,
// });