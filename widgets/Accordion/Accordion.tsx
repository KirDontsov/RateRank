'use client';
import { Category, Firm } from '@/api';
import { COMMON_TITLE } from '@/shared';
import cn from 'classnames';
import { FC, Fragment, useMemo, useState } from 'react';

export interface AccordionProps {
  firm: Firm | null;
  category: Category | null;
}

export const Accordion: FC<AccordionProps> = ({ firm, category }) => {
  const [open, setOpen] = useState<number | null>(null);

  const rodName = (category?.rod_name ?? '').toLowerCase();
  const predName = (category?.pred_name ?? '').toLowerCase();

  const items = useMemo(() => {
    const items = [
      {
        title: `Какой адрес у ${rodName} ${firm?.name}?`,
        text: `${category?.single_name ?? ''} ${firm?.name} расположен по адресу: ${firm?.address}`,
      },
      {
        title: `Какой номер телефона у ${rodName} ${firm?.name}?`,
        text: `Номер телефона для звонков в ${(category?.single_name ?? '').toLowerCase()} ${firm?.name}: ${firm?.default_phone}`,
      },
    ];

    if (category?.category_id === '3ebc7206-6fed-4ea7-a000-27a74e867c9a') {
      items.push({
        title: `Есть ли в ${predName} ${firm?.name} услуга "кофе с собой"?`,
        text: `Да, в ${predName} ${firm?.name} любой бодрящий напиток вы можете взять навынос.`,
      });
      items.push({
        title: `Дорого ли поужинать в ${predName} ${firm?.name}?`,
        text: `В ${predName} ${firm?.name} есть блюда и по высоким и по низким ценам.`,
      });
    }

    items.push({
      title: `Насколько точна информация о ${predName} ${firm?.name}?`,
      text: `Если вы нашли ошибку и/или являетесь владельцем ${rodName} ${firm?.name}, то можете заполнить форму обратной связи. ${COMMON_TITLE} старается сделать всё что в наших силах, чтобы предоставлять вам максимально точные и свежие данные о заведениях. `,
    });

    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category?.category_id, rodName, predName, firm]);

  return (
    <div id="accordion-flush" className="flex flex-col w-full">
      {items?.map(({ title, text }, index) => (
        <Fragment key={title}>
          <h2 id="accordion-flush-heading-1">
            <button
              onClick={() => setOpen(index !== open ? index : null)}
              type="button"
              className="flex items-center justify-between w-full py-5 font-medium rtl:text-right border-b border-zinc-200 dark:border-zinc-700 gap-3 hover:text-negroni-400 cursor-pointer"
            >
              <span className="flex items-center justify-between gap-3">
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.008-3.018a1.502 1.502 0 0 1 2.522 1.159v.024a1.44 1.44 0 0 1-1.493 1.418 1 1 0 0 0-1.037.999V14a1 1 0 1 0 2 0v-.539a3.44 3.44 0 0 0 2.529-3.256 3.502 3.502 0 0 0-7-.255 1 1 0 0 0 2 .076c.014-.398.187-.774.48-1.044Zm.982 7.026a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2h-.01Z"
                    clipRule="evenodd"
                  />
                </svg>
                {title}
              </span>
              <svg
                data-accordion-icon
                className={cn('w-3 h-3 shrink-0', {
                  'rotate-180': open === index,
                })}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>

          <div
            className={cn('flex w-full', {
              hidden: open !== index,
            })}
            id="accordion-flush-body-1"
            aria-labelledby="accordion-flush-heading-1"
          >
            <div className="flex flex-col py-5 border-b border-zinc-200 dark:border-zinc-700 w-full">
              <p className="mb-2">{text}</p>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
};
