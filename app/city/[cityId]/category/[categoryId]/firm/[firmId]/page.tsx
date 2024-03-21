'use client';
import {
  $firm,
  $reviewsPage,
  $reviewsCount,
  setReviewsPageEvt,
  ReviewsGate,
  ImagesGate,
  $images,
  PricesGate,
  $categoryAbbreviation,
  $city,
  DEFAULT_PHOTOS_EXT,
  DEFAULT_PHOTOS_ENDPOINT,
} from '@/shared';
import { $oaiReviews, OaiReviewsGate } from '@/shared';
import { Footer, Nav, Pagination, CommonHeader, Button } from '@/widgets';
import { Curve, Images, Prices, ReviewsList } from '@/features';
import { FETCH_LIMIT } from '@/shared';
import { useGate, useUnit } from 'effector-react';
import styles from './oaiReviewStyles.module.scss';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export interface FirmPageParams {
  params: {
    firmId: string;
  };
}

export const HeroBackground = {
  '3ebc7206-6fed-4ea7-a000-27a74e867c9a':
    'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  '565ad1cb-b891-4185-ac75-24ab3898cf22':
    'https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

export default function Page({ params }: FirmPageParams) {
  const router = useRouter();
  useGate(ReviewsGate, { firmId: params.firmId });
  useGate(OaiReviewsGate, { firmId: params.firmId });
  useGate(ImagesGate, { firmId: params.firmId });
  useGate(PricesGate, { firmId: params.firmId });

  const firm_id = params.firmId;

  const { firm, reviewsCount, setPage, page, oaiReviews, images, city, categoryAbbreviation } = useUnit({
    firm: $firm,
    page: $reviewsPage,
    setPage: setReviewsPageEvt,
    reviewsCount: $reviewsCount,
    oaiReviews: $oaiReviews,
    images: $images,
    city: $city,
    categoryAbbreviation: $categoryAbbreviation,
  });

  const handleAddReview = useCallback(() => {
    router.push(`/city/${city?.abbreviation}/category/${categoryAbbreviation}/firm/${firm_id}/add_review`);
  }, [router, city, categoryAbbreviation, firm_id]);

  return (
    <Curve>
      <Nav />
      <div className="h-[100vh] w-full flex flex-col items-center overflow-auto gap-4">
        <div className="h-screen w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-8">
            <header>
              <div className="w-full bg-center bg-cover h-[38rem] relative">
                <Image
                  className="w-full h-[38rem] absolute z-[-1]"
                  src={
                    images?.length
                      ? `${DEFAULT_PHOTOS_ENDPOINT}/${firm?.firm_id}/${images[0]?.img_id}.${DEFAULT_PHOTOS_EXT}`
                      : HeroBackground[(firm?.category_id ?? '') as keyof typeof HeroBackground]
                  }
                  fill
                  alt={images[0]?.img_alt}
                  style={{ objectFit: 'cover' }}
                  placeholder="blur"
                  blurDataURL={`data:image/jpeg;base64,${HeroBackground[(firm?.category_id ?? '') as keyof typeof HeroBackground]}`}
                  priority={true}
                />
                <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
                  <div className="text-center">
                    <h1 className="text-3xl font-semibold text-white lg:text-4xl">{`${firm?.category_id === '3ebc7206-6fed-4ea7-a000-27a74e867c9a' ? 'Ресторан' : 'Автосервис'} ${firm?.name}`}</h1>
                    <button className="w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                      Позвонить
                    </button>
                  </div>
                </div>
              </div>
            </header>

            <div className="w-full flex flex-col items-center gap-4 min-h-[500px]">
              <div className="container w-full flex flex-col gap-8 items-center px-8 py-10 overflow-hidden bg-white shadow-2xl rounded-xl dark:bg-gray-900">
                <div className="w-full flex gap-8">
                  <Images />
                  <div className="w-1/2 flex flex-col gap-4">
                    <h2 className="text-2xl font-[500] dark:text-blue-400 text-blue-400">Контакты</h2>
                    <div>{firm?.address}</div>
                    <div>{firm?.default_phone}</div>
                    <div>{firm?.site.indexOf('Показать телефон') !== -1 ? '' : firm?.site}</div>
                    <h3 className="text-2xl font-[500] dark:text-blue-400 text-blue-400">Описание</h3>
                    <div className={`${styles.myCustomStyle} list-disc`}>
                      {firm?.oai_description_value !== ''
                        ? firm?.oai_description_value.replaceAll('*', '').replaceAll('#', '')
                        : firm?.description}
                    </div>
                    <Prices />
                  </div>
                </div>
              </div>
              {oaiReviews.length ? (
                <>
                  <div className="my-4">
                    <CommonHeader
                      title="Краткое содержание отзывов"
                      subTitle="Выводы сделаны нейросетью на основе отзывов пользователей"
                    />
                  </div>
                  <div className="container w-full p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className={`${styles.myCustomStyle} list-disc`}>{oaiReviews?.[0]?.text ?? ''}</div>
                  </div>
                </>
              ) : (
                <></>
              )}
              {reviewsCount ? (
                <>
                  <div className="container flex items-center justify-between my-4">
                    <CommonHeader title="Отзывы пользователей" />
                    <Button onClick={handleAddReview}>Написать отзыв</Button>
                  </div>
                  <ReviewsList />
                </>
              ) : (
                <>
                  <CommonHeader title="Нет отзывов" subTitle="Напишите отзыв первым об этой организации" />
                  <Button onClick={handleAddReview}>Написать отзыв</Button>
                </>
              )}
            </div>
            <div className="flex flex-col items-center gap-4 pt-4 w-full">
              {(reviewsCount ?? 1) > 10 && (
                <Pagination
                  current={page}
                  onChange={setPage}
                  total={Math.ceil(((reviewsCount ?? 0) - 1) / FETCH_LIMIT)}
                />
              )}
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </Curve>
  );
}
