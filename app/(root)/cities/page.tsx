import { CitiesList } from '@/features';
import { getCities } from '@/app/api';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <Suspense fallback={<></>}>
      <div className="py-8 flex gap-4 mb-auto flex-wrap">cities</div>
    </Suspense>
  );
}
