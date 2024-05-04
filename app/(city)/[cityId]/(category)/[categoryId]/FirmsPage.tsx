'use client';
import { $firmsCount, $firmsPage, setFirmsPageEvt } from '@/api';
import {
  CategoriesGateProvider,
  CategoryIdGateProvider,
  CitiesGateProvider,
  CityIdGateProvider,
  Curve,
  FirmsGateProvider,
  FirmsList,
  FirmsMap,
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
      <CityIdGateProvider cityId={cityAbbr}>
        <CategoriesGateProvider>
          <CategoryIdGateProvider categoryAbbr={categoryAbbr ?? ''}>
            <FirmsGateProvider cityAbbr={cityAbbr} categoryAbbr={categoryAbbr}>
              <Curve>
                <Nav />
                <Section pt={0}>
                  <div className="flex xl:flex-row xl:w-full flex-col-reverse px-4 xl:px-0">
                    <div className="flex flex-col gap-2 bg-white dark:bg-gray-900 xl:h-[100svh] xl:overflow-auto pt-[74px] relative w-full 2xl:w-[21%] xl:w-[41%] h-fit">
                      <CommonHeader title="Компании" subTitle="раздел" />
                      {firmsCount ? (
                        <FirmsList />
                      ) : (
                        <CommonHeader title="Нет отзывов" subTitle="Напишите отзыв первым" />
                      )}
                      <div className="flex flex-col items-center gap-4 py-4 w-full mb-auto sticky bottom-0 bg-white dark:bg-gray-900">
                        {firmsCount && (
                          <Pagination
                            current={Number(searchParams.get('firmsPage')) || page}
                            onChange={handleChangePage}
                            total={Math.ceil((firmsCount ?? 0) / FETCH_LIMIT)}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col 2xl:w-[79%] xl:w-[59%] md:w-full w-full">
                      <FirmsMap />
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-4 pt-4 w-full mb-auto">
                    <Footer />
                  </div>
                </Section>
              </Curve>
            </FirmsGateProvider>
          </CategoryIdGateProvider>
        </CategoriesGateProvider>
      </CityIdGateProvider>
    </CitiesGateProvider>
  );
};
