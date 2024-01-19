'use client';
import { $firmsGroups } from '@/api';
import { AuthHeader, FirmsList } from '@/containers';
import { useUnit } from 'effector-react';

export default function Page() {
  const { firmsGroups } = useUnit({
    firmsGroups: $firmsGroups,
  });

  console.log('firmsGroups', firmsGroups);

  return (
    <div className="flex flex-col gap-4">
      <AuthHeader title="RateRank" subTitle="Firms" />
      <FirmsList />
    </div>
  );
}
