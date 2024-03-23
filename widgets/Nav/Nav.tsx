'use client';
import { $loading, useUserAuth } from '@/context';
import { useUnit } from 'effector-react';
import Link from 'next/link';
import { CityDropdown } from '@/features';
import { useMediaQuery } from '@/hooks';
import { useCallback, useState } from 'react';
import cn from 'classnames';

export const Nav = () => {
  const value = useUserAuth();

  const { loading } = useUnit({
    loading: $loading,
  });

  const tablet = useMediaQuery('(max-width: 768px)');

  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen((prevState) => !prevState), []);

  return (
    <nav
      className={cn('w-full absolute z-30 mx-auto left-1/2 translate-x-[-50%]', {
        'dark:bg-[rgba(0,0,0,0.3)] bg-[rgba(255,255,255,0.3)]': !open,
        'dark:bg-gray-700 bg-white': open,
      })}
    >
      <div
        className={cn('container px-6 py-2 mx-auto', {
          'flex justify-between items-center': !tablet,
        })}
      >
        <div className="flex items-center justify-between">
          <Link href="/">ТОП ВЫБОР</Link>

          {tablet && (
            <div className="flex lg:hidden">
              <button
                onClick={handleOpen}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {open ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>

        {!tablet && !open && (
          <div className="mt-0 p-0 top-0 relative bg-transparent w-auto opacity-100 translate-x-0 flex items-center">
            <div className="flex flex-row mx-6 items-center">
              <CityDropdown />
              {/* <Link
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                href="#"
              >
                Добавить организацию
              </Link> */}
              {!value && !loading && (
                <Link
                  className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                  href="/login"
                >
                  Вход
                </Link>
              )}

              <Link
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                href="/dashboard"
              >
                Dashboard
              </Link>
            </div>
          </div>
        )}

        {tablet && open && (
          <div className="absolute inset-x-0 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-700">
            <div className="flex flex-col items-center">
              <CityDropdown />
              {/* <Link
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                href="#"
              >
                Добавить организацию
              </Link> */}
              {!value && !loading && (
                <Link
                  className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                  href="/login"
                >
                  Вход
                </Link>
              )}

              <Link
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                href="/dashboard"
              >
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
