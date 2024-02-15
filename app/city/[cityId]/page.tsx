'use client';
import { Nav, CommonHeader } from '@/widgets';
import { Categories } from '@/features';

export default function Page({
  params,
}: {
  params: {
    cityId: string;
  };
}) {
  return (
    <>
      <Nav />
      <div className="h-[calc(100vh-54px)] w-full flex flex-col items-center overflow-auto gap-4">
        <CommonHeader title="Сategories" subTitle="раздел" />
        <Categories cityId={params.cityId} />
      </div>
    </>
  );
}
