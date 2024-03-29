'use client';
import { $firmsCount, $firmsPage, setFirmsPageEvt } from '@/api';
import { Footer, Nav, Pagination, CommonHeader, Section } from '@/widgets';
import { CategoryIdGateProvider, Curve, FirmsGateProvider, FirmsList } from '@/features';
import { FETCH_LIMIT } from '@/shared';
import { useUnit } from 'effector-react';
import { FC, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const FirmsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { firmsCount, setPage, page } = useUnit({
    page: $firmsPage,
    setPage: setFirmsPageEvt,
    firmsCount: $firmsCount,
  });

  const handleChangePage = useCallback(
    (e: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('firmsPage', `${e}`);
      router.push(pathname + '?' + params.toString());
      setPage(e);
    },
    [setPage, router, searchParams, pathname],
  );

  return (
    <CategoryIdGateProvider categoryId={searchParams.get('categoryId') ?? ''}>
      <FirmsGateProvider>
        <Curve>
          <Nav />
          <Section>
            <CommonHeader title="Компании" subTitle="раздел" />
            {firmsCount ? <FirmsList /> : <CommonHeader title="Нет отзывов" subTitle="Напишите отзыв первым" />}

            <div className="flex flex-col items-center gap-4 pt-4 w-full mb-auto">
              {firmsCount && (
                <Pagination
                  current={Number(searchParams.get('firmsPage')) || page}
                  onChange={handleChangePage}
                  total={Math.ceil((firmsCount ?? 0) / FETCH_LIMIT)}
                />
              )}
              <Footer />
            </div>
          </Section>
        </Curve>
      </FirmsGateProvider>
    </CategoryIdGateProvider>
  );
};
