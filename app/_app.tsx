import { ErrorBoundary } from '@/features/ErrorBoundary';
import { EffectorNext, getClientScope } from '@effector/next';
import { attachReduxDevTools } from '@effector/redux-devtools-adapter';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import '../configs/dayjs.config';

const clientScope = getClientScope();

if (clientScope) {
  attachReduxDevTools({
    scope: clientScope,
    name: 'playground-app',
    trace: true,
  });
}

function App({ Component, pageProps }: AppProps<{ values: Record<string, unknown> }>) {
  const { values } = pageProps;

  return (
    <ErrorBoundary>
      <EffectorNext values={values}>
        <AnimatePresence mode="wait">
          <Component />
        </AnimatePresence>
      </EffectorNext>
    </ErrorBoundary>
  );
}

export default App;
