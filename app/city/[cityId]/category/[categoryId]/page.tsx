'use client';
import { Nav, CommonHeader } from '@/widgets';
import { Types } from '@/features';

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
        <CommonHeader title="Types" subTitle="раздел" />
        <Types cityId={cityId} categoryId={categoryId} />
      </div>
    </>
  );
}
