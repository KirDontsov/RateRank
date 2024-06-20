'use client';
import cn from 'classnames';
import { useEffect, useState } from 'react';

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

export const Anchors = () => {
  const getHash = () =>
    typeof window !== 'undefined' ? decodeURIComponent(window.location.hash.replace('#', '')) : undefined;

  const [hash, setHash] = useState(getHash());

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
    <div className="text-sm xl:text-base font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {ANCHORS.map(({ id, title }, index) => (
          <li key={id} className="me-2">
            <a
              href={`#${id}`}
              className={cn('inline-block p-4 border-b-2 border-transparent rounded-t-lg', {
                'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 active':
                  hash === id || (hash === '' && index === 0),
              })}
              aria-current="page"
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
