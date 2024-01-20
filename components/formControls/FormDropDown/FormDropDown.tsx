'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, MouseEvent } from 'react';

export const FormDropDown = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(() => 'Выберите город');
  const router = useRouter();

  const handleOpen = () => setOpen((prev) => !prev);
  const handleSelect = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setValue(e?.currentTarget?.id);
    router.push(e?.currentTarget?.href);
  };

  return (
    <div className="relative inline-block ">
      {/* Dropdown toggle button */}
      <button
        onClick={handleOpen}
        className="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none"
      >
        <span className="mx-1">{value}</span>
        <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          // x-transition:enter="transition ease-out duration-100"
          // x-transition:enter-start="opacity-0 scale-90"
          // x-transition:enter-end="opacity-100 scale-100"
          // x-transition:leave="transition ease-in duration-100"
          // x-transition:leave-start="opacity-100 scale-100"
          // x-transition:leave-end="opacity-0 scale-90"
          className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
        >
          <Link
            id="Москва"
            href={`/city/msk/category/1/type/1/firms`}
            onClick={handleSelect}
            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Москва
          </Link>
          <Link
            id="Санкт-Петербург"
            href={`/city/spb/category/1/type/1/firms`}
            onClick={handleSelect}
            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Санкт-Петербург
          </Link>
        </div>
      )}
    </div>
  );
};
