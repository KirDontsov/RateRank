'use client';
import {
  $firm,
  $reviewsPage,
  $reviewsCount,
  setReviewsPageEvt,
  ImagesGate,
  $images,
  PricesGate,
  $city,
  $firmName,
  $oaiReviews,
  OaiReviewsGate,
  $category,
} from '@/api';
import { DEFAULT_PHOTOS_EXT, DEFAULT_PHOTOS_ENDPOINT, HeroBackground, transliterate } from '@/shared';
import { Footer, Pagination, CommonHeader, Button, ImageWithFallback } from '@/widgets';
import { Images, Prices, ReviewsGateProvider, ReviewsList } from '@/features';
import { FETCH_LIMIT } from '@/shared';
import { useGate, useUnit } from 'effector-react';
import styles from './oaiReviewStyles.module.scss';
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const FirmId = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { firm, reviewsCount, setPage, page, oaiReviews, images, city, category, firmName } = useUnit({
    firm: $firm,
    page: $reviewsPage,
    setPage: setReviewsPageEvt,
    reviewsCount: $reviewsCount,
    oaiReviews: $oaiReviews,
    images: $images,
    city: $city,
    category: $category,
    firmName: $firmName,
  });

  const firmId = searchParams.get('firmId') || firm?.firm_id || '';

  useGate(OaiReviewsGate, { firmId });
  useGate(ImagesGate, { firmId });
  useGate(PricesGate, { firmId });

  const handleAddReview = useCallback(() => {
    router.push(`/${city?.abbreviation}/${category?.abbreviation}/${transliterate(firm?.name ?? '')}/add_review`);
  }, [router, city, category, firmName]);

  const handleChangePage = useCallback(
    (e: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('reviewsPage', `${e}`);
      router.push(pathname + '?' + params.toString());
      setPage(e);
    },
    [setPage, router, searchParams, pathname],
  );

  return (
    <ReviewsGateProvider>
      <div className="h-screen w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-8">
          <header>
            <div className="w-full bg-center bg-cover h-[38rem] relative">
              <ImageWithFallback
                className="w-full h-[38rem] absolute z-[-1]"
                src={`${DEFAULT_PHOTOS_ENDPOINT}/${city?.abbreviation}/${category?.abbreviation}/${firm?.firm_id}/${images[0]?.img_id}.${DEFAULT_PHOTOS_EXT}`}
                fallbackSrc={HeroBackground[(firm?.category_id ?? '') as keyof typeof HeroBackground]}
                fill
                alt={firm?.name || ''}
                style={{ objectFit: 'cover' }}
                placeholder="blur"
                blurDataURL={`data:image/jpeg;base64,${HeroBackground[(firm?.category_id ?? '') as keyof typeof HeroBackground]}`}
                priority={true}
              />
              <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
                <div className="text-center">
                  <h1 className="text-3xl font-semibold text-white lg:text-4xl">{`${category?.name?.slice(0, -1)} ${firm?.name}`}</h1>
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
                    {!firm?.oai_description_value || firm?.oai_description_value === ''
                      ? firm?.description
                      : firm?.oai_description_value?.replaceAll('*', '')?.replaceAll('#', '')}
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
          <div className="flex flex-col items-center gap-4 pt-4 w-full mb-auto">
            {(reviewsCount ?? 1) > 10 && (
              <Pagination
                current={Number(searchParams.get('reviewsPage')) || page}
                onChange={handleChangePage}
                total={Math.ceil(((reviewsCount ?? 0) - 1) / FETCH_LIMIT)}
              />
            )}
            <Footer />
          </div>
        </div>
      </div>
    </ReviewsGateProvider>
  );
};
