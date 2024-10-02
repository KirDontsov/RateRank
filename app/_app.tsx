import { EffectorNext } from '@effector/next';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { Suspense } from 'react';

import '../configs/dayjs.config';

function App({ Component, pageProps }: AppProps<{ values: Record<string, unknown> }>) {
  const { values } = pageProps;

  return (
    <Suspense fallback={<></>}>
      <EffectorNext values={values}>
        <AnimatePresence mode="wait">
          <Component />
        </AnimatePresence>
      </EffectorNext>
    </Suspense>
  );
}

export default App;
