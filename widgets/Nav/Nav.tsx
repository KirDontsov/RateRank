'use client';
import { $loading, useUserAuth } from '@/context';
import { useUnit } from 'effector-react';
import Link from 'next/link';
import { CityDropdown } from '@/features';

export const Nav = () => {
  const value = useUserAuth();

  const { loading } = useUnit({
    loading: $loading,
  });

  return (
    <nav className="w-full absolute z-30 mx-auto left-1/2 translate-x-[-50%] dark:bg-[rgba(0,0,0,0.3)] bg-[rgba(255,255,255,0.3)] ">
      <div className="container px-6 py-2 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <Link href="/">ТОП ВЫБОР</Link>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              <svg
                x-show="!isOpen"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
              </svg>

              <svg
                x-show="isOpen"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="absolute inset-x-0 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center">
          <div className="flex flex-col md:flex-row md:mx-6 items-center">
            <CityDropdown />
            <Link
              className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
              href="#"
            >
              Добавить организацию
            </Link>
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
      </div>
    </nav>
  );
};
