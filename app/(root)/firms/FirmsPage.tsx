'use client';
import { $firmsCount, $firmsError, $firmsPage, Category, Firm, setFirmsPageEvt } from '@/api';
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
import { CommonNavProps, FETCH_LIMIT } from '@/shared';
import { CommonHeader, Footer, Nav, Pagination, Section } from '@/widgets';
import { useUnit } from 'effector-react';
import { notFound, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback } from 'react';

export interface FirmsPageProps {
  categoryAbbr: string;
  cityAbbr: string;
  firms: Firm[] | null;
}

export const FirmsPage: FC<FirmsPageProps & CommonNavProps> = ({
  cityAbbr,
  categoryAbbr,
  firms,
  cities,
  categories,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { firmsCount, setPage, page, firmsError } = useUnit({
    page: $firmsPage,
    setPage: setFirmsPageEvt,
    firmsCount: $firmsCount,
    firmsError: $firmsError,
  });

  if (firmsError) {
    notFound();
  }

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
                <Nav cities={cities} categories={categories} />
                <Section pt={0}>
                  <div className="flex w-full xl:flex-row flex-col-reverse px-4 xl:px-0 overflow-y-auto">
                    <div className="flex flex-col gap-2 bg-white dark:bg-eboni-900 xl:h-[100svh] xl:overflow-y-auto pt-[96px] relative w-full 2xl:w-[21%] xl:w-[41%] h-fit">
                      <CommonHeader title="Компании" subTitle="раздел" />
                      {firmsCount ? (
                        <FirmsList firms={firms} />
                      ) : (
                        <CommonHeader title="Нет отзывов" subTitle="Напишите отзыв первым" />
                      )}
                      <div className="flex flex-col items-center gap-4 py-4 w-full mb-auto sticky bottom-0 bg-white dark:bg-eboni-900">
                        {firmsCount && (
                          <Pagination
                            current={Number(searchParams.get('firmsPage')) || page}
                            onChange={handleChangePage}
                            total={Math.ceil((firmsCount ?? 0) / FETCH_LIMIT)}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col 2xl:w-[79%] xl:w-[59%] md:w-full w-full px-2 md:px-0">
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
