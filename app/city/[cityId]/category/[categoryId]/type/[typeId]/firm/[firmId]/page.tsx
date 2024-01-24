'use client';
import { $firm, $reviewsPage, $reviewsCount, setReviewsPageEvt } from '@/api';
import { Footer, Pagination } from '@/components';
import { AuthHeader, ReviewsList } from '@/containers';
import { FETCH_LIMIT } from '@/shared';
import { useUnit } from 'effector-react';
import { useState } from 'react';

export default function Page() {
  const { firm, reviewsCount, setPage, page } = useUnit({
    firm: $firm,
    page: $reviewsPage,
    setPage: setReviewsPageEvt,
    reviewsCount: $reviewsCount,
  });
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen w-full flex flex-col gap-4">
      {/* <AuthHeader title={`Фирма ${params.firmId}`} subTitle="Ураа" /> */}

      <div className="w-full flex flex-col gap-8">
        <header>
          <div
            className="w-full bg-center bg-cover h-[38rem]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
          >
            <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
              <div className="text-center">
                <h1 className="text-3xl font-semibold text-white lg:text-4xl">{firm?.name}</h1>
                <button className="w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                  Start project
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="w-full flex flex-col items-center gap-4 min-h-[500px]">
          <div className="container w-full flex flex-col gap-8 items-center px-8 py-10 overflow-hidden bg-white shadow-2xl rounded-xl dark:bg-gray-900">
            <div className="w-full flex gap-8">
              <div className="w-1/2 flex flex-col gap-4">
                <h3>Описание</h3>
              </div>
              <div className="w-1/2 flex flex-col gap-4">
                <h3>Контакты</h3>
                <div>{firm?.address}</div>
                <div>{firm?.default_phone}</div>
                <div>{firm?.site}</div>
              </div>
            </div>
          </div>
          {reviewsCount ? <ReviewsList /> : <AuthHeader title="Нет отзывов" subTitle="Напишите отзыв первым" />}
        </div>
        <div className="flex flex-col items-center gap-4 pt-4 w-full">
          {reviewsCount && (
            <Pagination current={page} onChange={setPage} total={Math.ceil((reviewsCount ?? 0) / FETCH_LIMIT)} />
          )}
          <Footer />
        </div>
      </div>
    </div>
  );
}
