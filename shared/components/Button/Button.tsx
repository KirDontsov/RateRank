import { FC } from 'react';
import { CommonProps } from '@/shared';

export interface ButtonProps {
  onClick: () => void;
}

export const Button: FC<CommonProps & ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
    >
      {children}
    </button>
  );
};
