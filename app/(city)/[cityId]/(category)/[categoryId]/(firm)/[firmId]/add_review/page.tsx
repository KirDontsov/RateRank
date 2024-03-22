'use client';
import { DEFAULT_PHOTOS_ENDPOINT, DEFAULT_PHOTOS_EXT, ErrorTypes, HeroBackground } from '@/shared';
import { $firm, $images, addReviewEvt } from '@/api';
import { Footer, Nav, FormInput, FormTextArea } from '@/widgets';
import { useUnit } from 'effector-react';
import { FormProvider, useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import { Curve, FirmIdGateProvider } from '@/features';
import Image from 'next/image';

import {
  AUTHOR_MAX_VALUE,
  AddReviewFields,
  DEFAULT_ADDREVIEW_FORM_VALUES,
  TEXT_INPUT_REG_EXP,
  TEXT_MAX_VALUE,
} from './constants';
import { AddReviewValues } from './interfaces';

export default function Page() {
  const { firm, images, addReview } = useUnit({
    firm: $firm,
    images: $images,
    addReview: addReviewEvt,
  });

  const firmId = firm?.firm_id ?? '';

  const form = useForm<AddReviewValues>({
    defaultValues: DEFAULT_ADDREVIEW_FORM_VALUES,
    mode: 'onBlur',
  });

  const { reset, getValues, setError, formState } = form;
  const { isDirty, isValid, errors } = formState;

  const handleReset = useCallback(() => {
    reset({
      [AddReviewFields.Author]: '',
      [AddReviewFields.Text]: '',
      [AddReviewFields.Rating]: '',
    });
  }, [reset]);

  useEffect(handleReset, [handleReset]);

  const handleSubmit = useCallback(() => {
    const values = getValues();
    addReview({ ...values, firm_id: firmId });
  }, [firmId, addReview, getValues]);

  return (
    <FirmIdGateProvider firmId={firmId}>
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
                      <h1 className="text-3xl font-semibold text-white lg:text-4xl">{`${firm?.category_id === '3ebc7206-6fed-4ea7-a000-27a74e867c9a' ? 'Отзыв о ресторане' : 'Отзыв об автосервисе'} ${firm?.name}`}</h1>
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
                    <FormProvider {...form}>
                      <div className="w-1/2 flex flex-col gap-4">
                        <h2 className="text-2xl font-[500] dark:text-blue-400 text-blue-400">{`Оцените организацию`}</h2>
                        <FormInput
                          id={AddReviewFields.Rating}
                          name={AddReviewFields.Rating}
                          type="text"
                          dataTestId="AddReviewForm.Rating"
                          label="Рейтинг"
                          placeholder="Оцените от 1 до 5"
                          rules={{
                            [ErrorTypes.Required]: 'Обязательное поле',
                            [ErrorTypes.MaxLength]: {
                              value: 1,
                              message: `Максимум ${1} символ`,
                            },
                            [ErrorTypes.Pattern]: {
                              value: /^[1-5]*$/,
                              message: 'Введены некорректные символы',
                            },
                          }}
                        />
                      </div>
                      <div className="w-1/2 flex flex-col gap-4">
                        <h2 className="text-2xl font-[500] dark:text-blue-400 text-blue-400">Оставьте отзыв</h2>

                        <FormInput
                          id={AddReviewFields.Author}
                          name={AddReviewFields.Author}
                          type="text"
                          dataTestId="AddReviewForm.Name"
                          label="Имя"
                          placeholder="Иван Иванов"
                          rules={{
                            [ErrorTypes.Required]: 'Обязательное поле',
                            [ErrorTypes.MaxLength]: {
                              value: AUTHOR_MAX_VALUE,
                              message: `Максимум ${AUTHOR_MAX_VALUE} символов`,
                            },
                            [ErrorTypes.Pattern]: {
                              value: TEXT_INPUT_REG_EXP,
                              message: 'Введены некорректные символы',
                            },
                          }}
                        />
                        <div>
                          <FormTextArea
                            id={AddReviewFields.Text}
                            name={AddReviewFields.Text}
                            dataTestId="AddReviewForm.Text"
                            label="Комментарий"
                            placeholder="Впечатления об организации"
                            rules={{
                              [ErrorTypes.Required]: 'Обязательное поле',
                              [ErrorTypes.MaxLength]: {
                                value: TEXT_MAX_VALUE,
                                message: `Максимум ${TEXT_MAX_VALUE} символов`,
                              },
                              [ErrorTypes.Pattern]: {
                                value: TEXT_INPUT_REG_EXP,
                                message: 'Введены некорректные символы',
                              },
                            }}
                          />
                        </div>

                        <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                          <button
                            type="button"
                            disabled={!isDirty || !isValid}
                            onClick={handleSubmit}
                            className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                          >
                            Отправить отзыв
                          </button>
                        </div>
                      </div>
                    </FormProvider>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 pt-4 w-full">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </Curve>
    </FirmIdGateProvider>
  );
}
