'use client';
import { $firmsCount, $firmsPage, setFirmsPageEvt } from '@/api';
import { Footer, Pagination } from '@/components';
import { AuthHeader, FirmsList } from '@/containers';
import { FETCH_LIMIT } from '@/shared';
import { useUnit } from 'effector-react';

export default function Page() {
  const { firmsCount, setPage, page } = useUnit({
    page: $firmsPage,
    setPage: setFirmsPageEvt,
    firmsCount: $firmsCount,
  });

  return (
    <>
      <AuthHeader title="RateRank" subTitle="Firms" />
      {firmsCount ? <FirmsList /> : <AuthHeader title="Нет отзывов" subTitle="Напишите отзыв первым" />}

      <div className="flex flex-col items-center gap-4 pt-4 w-full">
        {firmsCount && (
          <Pagination current={page} onChange={setPage} total={Math.ceil((firmsCount ?? 0) / FETCH_LIMIT)} />
        )}
        <Footer />
      </div>
    </>
  );
}
