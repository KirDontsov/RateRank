'use client';
import { useOnClickOutside } from '@/shared';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, MouseEvent, useRef, useCallback, FC } from 'react';

export interface FormDropdownOption {
  id: string;
  name: string;
  abbreviation: string;
}

export interface FormDropdownProps {
  options: FormDropdownOption[];
  value: FormDropdownOption;
  setValue: (id: string) => void;
}

export const FormDropdown: FC<FormDropdownProps> = ({ options, value, setValue }) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOpen = () => setOpen((prev) => !prev);
  const handleSelect = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setValue(e?.currentTarget?.id);
      setOpen(false);
      router.push(e?.currentTarget?.href);
    },
    [setValue, router],
  );

  const handleClickOutside = () => {
    setOpen(false);
  };

  useOnClickOutside(dropdownRef, handleClickOutside);

  return (
    <div ref={dropdownRef} className="relative inline-block ">
      {/* Dropdown toggle button */}
      <button
        onClick={handleOpen}
        className="relative z-10 p-2 flex items-center text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none"
      >
        <span className="mx-1">{value.name}</span>
        <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800">
          {options.map(({ id, name, abbreviation }) => (
            <Link
              id={id}
              href={`/city/${abbreviation}/category/1/type/1/firms`}
              onClick={handleSelect}
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
