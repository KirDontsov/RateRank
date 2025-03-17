'use client';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import Tippy, { useSingleton } from '@tippyjs/react';

import 'tippy.js/dist/tippy.css';

export interface AnchorsProps {
  rodName?: string;
  firmName?: string;
}

const ANCHORS = [
  {
    id: 'contacts',
    title: 'Контакты',
  },
  {
    id: 'description',
    title: 'Описание',
  },
  {
    id: 'prices',
    title: 'Цены',
  },
  {
    id: 'faq',
    title: 'FAQ',
  },
  {
    id: 'reviews',
    title: 'Отзывы',
  },
];

export const Anchors: FC<AnchorsProps> = ({ rodName, firmName }) => {
  const getHash = () =>
    typeof window !== 'undefined' ? decodeURIComponent(window.location.hash.replace('#', '')) : undefined;

  const [hash, setHash] = useState(getHash());
  const [source, target] = useSingleton();

  useEffect(() => {
    const handleHashChange = () => {
      setHash(getHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="text-sm xl:text-base font-medium text-center border-b text-eboni-400 border-eboni-200 dark:text-white dark:border-negroni-400">
      <ul className="flex flex-wrap -mb-px">
        <Tippy singleton={source} delay={500} />
        {ANCHORS.map(({ id, title }, index) => (
          <li key={id} className="me-2">
            <Tippy
              singleton={target}
              content={
                <div
                  id="tooltip-default"
                  role="tooltip"
                  className="z-10 inline-block px-3 py-2 text-sm font-medium text-white duration-300 bg-gray-900 rounded-3xl shadow-xs tooltip dark:bg-gray-700"
                >
                  <h3>
                    {title} {rodName ?? ''} {firmName ?? ''}
                  </h3>
                  <div className="tooltip-arrow"></div>
                </div>
              }
            >
              <a
                href={`#${id}`}
                className={cn('inline-block p-4 border-b border-transparent rounded-t-lg hover:text-negroni-400', {
                  'text-white dark:text-eboni-400 border-negroni-400 active bg-eboni-800 dark:bg-negroni-400 hover:text-eboni-700':
                    hash === id || (hash === '' && index === 0),
                })}
                aria-current="page"
              >
                {title}
              </a>
            </Tippy>
          </li>
        ))}
      </ul>
    </div>
  );
};
