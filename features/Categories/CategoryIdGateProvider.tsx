import { CategoryGate } from '@/api';
import { CommonProps } from '@/shared';
import { useGate } from 'effector-react';
import { FC } from 'react';

export interface CategoryIdGateProviderProps {
  categoryId: string;
}

export const CategoryIdGateProvider: FC<CategoryIdGateProviderProps & CommonProps> = ({ children, categoryId }) => {
  useGate(CategoryGate, { categoryId });
  return <>{children}</>;
};
