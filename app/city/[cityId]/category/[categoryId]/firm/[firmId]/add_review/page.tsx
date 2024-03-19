'use client';
import { $firm, $images, $city, $categoryAbbreviation, addReviewEvt, ErrorTypes } from '@/shared';
import { Footer, Nav, FormInput, FormTextArea } from '@/widgets';
import { useUnit } from 'effector-react';
import { FormProvider, useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import { Curve } from '@/features';

export const enum AddReviewFields {
  Author = 'author',
  Text = 'text',
  Rating = 'rating',
}

export const AUTHOR_MAX_VALUE = 100;
export const TEXT_MAX_VALUE = 2000;
export const TEXT_INPUT_REG_EXP = /^[Ёёа-яА-Яa-zA-Z0-9 –“«».,/\-()№"']*$/;

export const DEFAULT_ADDREVIEW_FORM_VALUES = {
  [AddReviewFields.Author]: '',
  [AddReviewFields.Text]: '',
  [AddReviewFields.Rating]: '',
};

export interface AddReviewValues {
  [AddReviewFields.Author]: string;
  [AddReviewFields.Text]: string;
  [AddReviewFields.Rating]: string;
}

export const HeroBackground = {
  '3ebc7206-6fed-4ea7-a000-27a74e867c9a':
    "url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center / cover no-repeat",
  '565ad1cb-b891-4185-ac75-24ab3898cf22':
    "url('https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center / cover no-repeat",
};

export interface FirmPageParams {
  params: {
    firmId: string;
  };
}

export default function Page({ params }: FirmPageParams) {
  const { firm, city, categoryAbbreviation, images, addReview } = useUnit({
    firm: $firm,
    city: $city,
    categoryAbbreviation: $categoryAbbreviation,
    images: $images,
    addReview: addReviewEvt,
  });

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
    console.log('values', values);
    addReview({ ...values, firm_id: firm?.firm_id ?? '' });
  }, [firm]);

  return (
    <Curve>
      <Nav />
      <div className="h-[100vh] w-full flex flex-col items-center overflow-auto gap-4">
        <div className="h-screen w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-8">
            <header>
              <div
                className="w-full bg-center bg-cover h-[38rem]"
                style={{
                  background: images?.length
                    ? `url('/output/${firm?.firm_id}/${images[0]?.img_id}.jpg') center / cover no-repeat`
                    : HeroBackground[(firm?.category_id ?? '') as keyof typeof HeroBackground],
                }}
              >
                <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
                  <div className="text-center">
                    <h1 className="text-3xl font-semibold text-white lg:text-4xl">{`${firm?.category_id === '3ebc7206-6fed-4ea7-a000-27a74e867c9a' ? 'Отзыв о ресторане' : 'Отзыв об автосервисе'} ${firm?.name}`}</h1>
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
  );
}
