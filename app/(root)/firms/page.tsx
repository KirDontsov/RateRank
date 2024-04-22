'use client';
import { $firmsCount, $firmsPage, setFirmsPageEvt } from '@/api';
import { Curve, FirmsGateProvider, FirmsList } from '@/features';
import { COMMON_TITLE, FETCH_LIMIT } from '@/shared';
import { CommonHeader, Footer, Nav, Pagination, Section } from '@/widgets';
import { useUnit } from 'effector-react';

export interface CategoryPageProps {
  params: { cityId: string; categoryId: string };
}

export default function Page({ params }: CategoryPageProps) {
  const { firmsCount, setPage, page } = useUnit({
    page: $firmsPage,
    setPage: setFirmsPageEvt,
    firmsCount: $firmsCount,
  });

  const categoryAbbr = params?.categoryId ?? '';
  const cityAbbr = params?.cityId ?? '';

  return (
    <FirmsGateProvider cityAbbr={cityAbbr} categoryAbbr={categoryAbbr}>
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
