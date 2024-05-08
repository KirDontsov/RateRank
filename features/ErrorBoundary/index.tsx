import * as Sentry from '@sentry/react';
import React, { ComponentType, PureComponent, ReactNode } from 'react';

import type { ErrorBoundaryProps, ErrorBoundaryState } from './interfaces';

/** Error boundary перехватывающий ошибки при рендере компонентов */
class ErrorBoundary extends PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    const { message } = error;

    console.error(message);
  }

  render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) return <></>;

    return children;
  }
}

// export default Sentry.withErrorBoundary(ErrorBoundary, {
//   fallback: <div>{'an error has occurred'}</div>,
// }) as ComponentType<ErrorBoundaryProps>;

export default ErrorBoundary;
