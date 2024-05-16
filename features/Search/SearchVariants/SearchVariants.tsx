import {
  $categories,
  $cities,
  $firmsPage,
  $searchVariants,
  $searchVariantsExpanded,
  toggleSearchVariantsEvt,
} from '@/api';
import { useOnClickOutside } from '@/hooks';
import { Button } from '@/widgets';
import { useUnit } from 'effector-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MouseEvent, useCallback, useRef } from 'react';

export const SearchVariants = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dropdownRef = useRef(null);
  const { cities, categories, firmsPage, searchVariants, searchVariantsExpanded, toggleSearchVariants } = useUnit({
    cities: $cities,
    categories: $categories,
    firmsPage: $firmsPage,
    searchVariants: $searchVariants,
    searchVariantsExpanded: $searchVariantsExpanded,
    toggleSearchVariants: toggleSearchVariantsEvt,
  });

  const handleClick = useCallback(
    ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
      console.log('currentTarget?.id', currentTarget?.id);
      const variantFirm = searchVariants?.find((item) => item?.url === currentTarget?.id);

      const city = cities?.find((item) => item?.city_id === variantFirm?.city_id);
      const category = categories?.find((item) => item?.category_id === variantFirm?.category_id);

      router.push(
        `/${city?.abbreviation}/${category?.abbreviation}/${currentTarget?.id}?firmsPage=${Number(searchParams.get('firmsPage')) || firmsPage}`,
      );
      toggleSearchVariants(false);
    },
    [cities, categories, searchVariants, firmsPage, searchParams, router, toggleSearchVariants],
  );

  const handleClickOutside = useCallback(() => {
    toggleSearchVariants(false);
  }, [toggleSearchVariants]);

  useOnClickOutside(dropdownRef, handleClickOutside);

  return (
    <>
      {searchVariants?.length && searchVariantsExpanded && (
        <div
          ref={dropdownRef}
          className="flex flex-col bg-white dark:bg-gray-900 relative w-full h-fit top-[54px] px-8  items-center justify-center overflow-hidden bg-opacity-5"
        >
          <div className="container flex flex-wrap gap-x-4 overflow-auto px-8 relative w-full max-h-[100svh] pt-4 pb-[74px]">
            {searchVariants?.map((variant) => (
              <Button id={variant?.url} key={variant?.firm_id} onClick={handleClick}>
                {`${categories?.find((item) => item?.category_id === variant?.category_id)?.name?.slice(0, -1)} - ${variant?.name}`}
              </Button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
