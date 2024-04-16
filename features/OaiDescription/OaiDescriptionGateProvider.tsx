'use client';
import { $firm, OaiDescriptionGate } from '@/api';
import { CommonProps } from '@/shared';
import { useGate, useUnit } from 'effector-react';
import { FC } from 'react';

export interface OaiDescriptionGateProviderProps {
  firmId: string;
}

export const OaiDescriptionGateProvider: FC<OaiDescriptionGateProviderProps & CommonProps> = ({ children, firmId }) => {
  const { firm } = useUnit({
    firm: $firm,
  });

  useGate(OaiDescriptionGate, { firmId: firmId ?? firm?.firm_id });

  return <>{children}</>;
};
