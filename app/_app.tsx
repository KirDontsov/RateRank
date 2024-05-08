import { EffectorNext, getClientScope } from '@effector/next';
import { attachReduxDevTools } from '@effector/redux-devtools-adapter';
import { ErrorBoundary } from '@sentry/nextjs/types/server';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';

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
