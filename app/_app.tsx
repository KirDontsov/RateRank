import type { AppProps } from 'next/app';
import { EffectorNext, getClientScope } from '@effector/next';
import { attachReduxDevTools } from '@effector/redux-devtools-adapter';
import { AnimatePresence } from 'framer-motion';

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
    <EffectorNext values={values}>
      <AnimatePresence mode="wait">
        <Component />
      </AnimatePresence>
    </EffectorNext>
  );
}

export default App;
