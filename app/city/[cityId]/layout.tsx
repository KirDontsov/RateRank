'use client';
import { CategoriesGate, CityGate } from '@/shared';
import { HeroSection, Nav } from '@/widgets';
import { CommonProps } from '@/shared/types';
import { useGate } from 'effector-react';

export default function CityLayout({
  children,
  params,
}: CommonProps & {
  params: {
    cityId: string;
  };
}) {
  useGate(CityGate, { cityId: params.cityId });
  useGate(CategoriesGate, { cityId: params.cityId });
  return (
    <>
      <HeroSection>{children}</HeroSection>
    </>
  );
}
