'use client';
import { Nav } from '@/widgets';
import { AuthHeader, Categories } from '@/features';

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
        <AuthHeader title="Сategories" subTitle="раздел" />
        <Categories cityId={params.cityId} />
      </div>
    </>
  );
}
