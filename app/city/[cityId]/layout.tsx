'use client';
import { CategoriesGate, CityGate } from '@/api';
import { HeroSection, Nav } from '@/components';
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
      <HeroSection>
        <Nav />
        <div className="h-[calc(100vh-54px)] w-full flex flex-col items-center overflow-auto gap-4">{children}</div>
      </HeroSection>
    </>
  );
}
