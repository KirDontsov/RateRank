'use client';
import { FC } from 'react';
import { FirmGate } from '@/api';
import { CommonProps } from '@/shared';
import { useGate } from 'effector-react';

export interface FirmIdGateProviderProps {
  firmId: string;
}

export const FirmIdGateProvider: FC<FirmIdGateProviderProps & CommonProps> = ({ children, firmId }) => {
  useGate(FirmGate, { firmId });
  return <>{children}</>;
};
