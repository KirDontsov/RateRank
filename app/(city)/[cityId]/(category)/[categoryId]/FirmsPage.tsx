'use client';
import { $firmsCount, $firmsPage, setFirmsPageEvt } from '@/api';
import {
  CategoriesGateProvider,
  CategoryIdGateProvider,
  CitiesGateProvider,
  Curve,
  FirmsGateProvider,
  FirmsList,
} from '@/features';
import { FETCH_LIMIT } from '@/shared';
import { CommonHeader, Footer, Nav, Pagination, Section } from '@/widgets';
import { useUnit } from 'effector-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback } from 'react';

export interface FirmsPageProps {
  categoryAbbr: string;
  cityAbbr: string;
}

export const FirmsPage: FC<FirmsPageProps> = ({ cityAbbr, categoryAbbr }) => {
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
    <CitiesGateProvider>
      <CategoriesGateProvider>
        <CategoryIdGateProvider categoryAbbr={categoryAbbr ?? ''}>
          <FirmsGateProvider cityAbbr={cityAbbr} categoryAbbr={categoryAbbr}>
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
      </CategoriesGateProvider>
    </CitiesGateProvider>
  );
};
