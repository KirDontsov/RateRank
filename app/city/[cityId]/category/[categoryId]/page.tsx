'use client';
import { $types } from '@/shared';
import { Nav } from '@/widgets';
import { AuthHeader, Types } from '@/features';
import { useList } from 'effector-react';
import Link from 'next/link';

export default function Page({
  params,
}: {
  params: {
    cityId: string;
    categoryId: string;
  };
}) {
  const { cityId, categoryId } = params;

  return (
    <>
      <Nav />
      <div className="h-[calc(100vh-54px)] w-full flex flex-col items-center overflow-auto gap-4">
        <AuthHeader title="Types" subTitle="раздел" />
        <Types cityId={cityId} categoryId={categoryId} />
      </div>
    </>
  );
}
