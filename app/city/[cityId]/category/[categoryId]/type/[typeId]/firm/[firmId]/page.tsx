'use client';
import { AuthHeader } from '@/containers';

export default function Page({
  params,
}: {
  params: {
    cityId: string;
    categoryId: string;
    typeId: string;
    firmId: string;
  };
}) {
  return (
    <div className="h-screen">
      <AuthHeader title={`Фирма ${params.firmId}`} subTitle="Ураа" />
    </div>
  );
}
