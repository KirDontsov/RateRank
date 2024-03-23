'use client';
import { Nav, Section } from '@/widgets';
import { Curve, FirmId, FirmIdGateProvider } from '@/features';
import { $firm } from '@/api';
import { useUnit } from 'effector-react';
import { useSearchParams } from 'next/navigation';

export const FirmIdPage = () => {
  const searchParams = useSearchParams();
  const firmId = useUnit($firm)?.firm_id ?? '';

  return (
    <FirmIdGateProvider firmId={searchParams.get('firmId') || firmId}>
      <Curve>
        <Nav />
        <Section pt={0}>
          <FirmId />
        </Section>
      </Curve>
    </FirmIdGateProvider>
  );
};
