'use client';
import { $firmsCount, $firmsPage, setFirmsPageEvt } from '@/api';
import { Footer, Nav, Pagination, CommonHeader, Section } from '@/widgets';
import { Curve, FirmsGateProvider, FirmsList } from '@/features';
import { COMMON_TITLE, FETCH_LIMIT } from '@/shared';
import { useUnit } from 'effector-react';

export default function Page() {
  const { firmsCount, setPage, page } = useUnit({
    page: $firmsPage,
    setPage: setFirmsPageEvt,
    firmsCount: $firmsCount,
  });

  return (
    <FirmsGateProvider>
      <Curve>
        <Nav />
        <Section>
          <CommonHeader title={COMMON_TITLE} subTitle="Фирмы" />
          {firmsCount ? <FirmsList /> : <CommonHeader title="Нет отзывов" subTitle="Напишите отзыв первым" />}

          <div className="flex flex-col items-center gap-4 pt-4 w-full">
            {firmsCount && (
              <Pagination current={page} onChange={setPage} total={Math.ceil((firmsCount ?? 0) / FETCH_LIMIT)} />
            )}
            <Footer />
          </div>
        </Section>
      </Curve>
    </FirmsGateProvider>
  );
}
