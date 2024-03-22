'use client';
import { Nav, Section } from '@/widgets';
import { Curve, FirmId, FirmIdGateProvider } from '@/features';
import { $firm } from '@/api';
import { useUnit } from 'effector-react';

export const FirmIdPage = () => {
  const firmId = useUnit($firm)?.firm_id ?? '';

  return (
    <FirmIdGateProvider firmId={firmId}>
      <Curve>
        <Nav />
        <Section pt={0}>
          <FirmId />
        </Section>
      </Curve>
    </FirmIdGateProvider>
  );
};
