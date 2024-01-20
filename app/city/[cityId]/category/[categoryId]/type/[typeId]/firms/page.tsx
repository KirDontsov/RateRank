'use client';
import { AuthHeader, FirmsList } from '@/containers';

export default function Page() {
  return (
    <>
      <AuthHeader title="RateRank" subTitle="Firms" />
      <FirmsList />
    </>
  );
}
