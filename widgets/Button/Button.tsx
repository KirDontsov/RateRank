import { CommonProps } from '@/shared';
import { FC, MouseEvent, useCallback } from 'react';

export interface ButtonProps {
  id?: string;
  onClick?: (v: MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FC<CommonProps & ButtonProps> = ({ id, onClick, children }) => {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
    },
    [onClick],
  );

  return (
    <button
      {...(id ? { id: `${id}` } : {})}
      onClick={handleClick}
      className="w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500 whitespace-nowrap"
    >
      {children}
    </button>
  );
};
