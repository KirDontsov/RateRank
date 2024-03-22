'use client';
import { $firmsCount, $firmsPage, setFirmsPageEvt } from '@/api';
import { Footer, Nav, Pagination, CommonHeader, Section } from '@/widgets';
import { CategoryIdGateProvider, Curve, FirmsList } from '@/features';
import { FETCH_LIMIT } from '@/shared';
import { useUnit } from 'effector-react';
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

export default function Page({ params }: CategoryPageProps) {
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
      params.set('page', `${e}`);
      router.push(pathname + '?' + params.toString());
      setPage(e);
    },
    [setPage, router, searchParams, pathname],
  );

  return (
    <CategoryIdGateProvider categoryId={params.categoryId}>
      <Curve>
        <Nav />
        <Section>
          <CommonHeader title="Компании" subTitle="раздел" />
          {firmsCount ? <FirmsList /> : <CommonHeader title="Нет отзывов" subTitle="Напишите отзыв первым" />}

          <div className="flex flex-col items-center gap-4 pt-4 w-full">
            {firmsCount && (
              <Pagination
                current={Number(searchParams.get('page')) || page}
                onChange={handleChangePage}
                total={Math.ceil((firmsCount ?? 0) / FETCH_LIMIT)}
              />
            )}
            <Footer />
          </div>
        </Section>
      </Curve>
    </CategoryIdGateProvider>
  );
}
