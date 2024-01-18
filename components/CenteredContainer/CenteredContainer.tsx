import type { CommonProps } from '@/shared/types';
import type { FC } from 'react';
import cn from 'classnames';

export interface CenteredContainerProps extends CommonProps {
  h?: string;
  w?: string;
}

export const CenteredContainer: FC<CenteredContainerProps> = ({ children, h, w = 'full' }) => {
  return (
    <div
      className={cn('centered-container flex items-center justify-center', {
        [`h-${h}`]: true,
        [`w-${w}`]: true,
      })}
    >
      {children}
    </div>
  );
};
