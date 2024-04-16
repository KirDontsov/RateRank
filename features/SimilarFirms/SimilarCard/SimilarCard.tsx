'use client';
import { $category, $city, $firmsPage, setFirmEvt, setFirmLoadingEvt } from '@/api';
import { transliterate } from '@/shared';
import { ImageWithFallback } from '@/widgets';
import { useUnit } from 'effector-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC, useCallback } from 'react';

export interface SimilarCardProps {
  src: string;
  fallbackSrc: string;
  alt: string;
  title: string;
  subTitle: string;
  address: string;
  firmId: string;
}

export const SimilarCard: FC<SimilarCardProps> = ({ firmId, src, fallbackSrc, alt, title, subTitle, address }) => {
  const searchParams = useSearchParams();
  const { city, category, page, setFirm, setFirmLoading } = useUnit({
    city: $city,
    category: $category,
    page: $firmsPage,
    setFirm: setFirmEvt,
    setFirmLoading: setFirmLoadingEvt,
  });

  const handleClick = useCallback(() => {
    setFirm({ firmId });
    setFirmLoading(true);
  }, [setFirm, setFirmLoading, firmId]);

  return (
    <Link
      key={firmId}
      href={`/${city?.abbreviation}/${category?.abbreviation}/${transliterate(title ?? '')}?categoryId=${category?.category_id}&firmId=${firmId}&firmsPage=${Number(searchParams.get('firmsPage')) || page}`}
      onClick={handleClick}
      className="max-w-sm min-w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative cursor-pointer"
    >
      <div className="relative w-full h-[15rem]">
        <ImageWithFallback
          className="w-full h-[38rem]"
          src={src}
          fallbackSrc={fallbackSrc}
          fill
          alt={alt}
          style={{ objectFit: 'cover' }}
          placeholder="blur"
          blurDataURL={`data:image/jpeg;base64,${fallbackSrc}`}
          priority={true}
        />
      </div>
      <div className="p-5">
        <h4 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white whitespace-pre">
          {`${title} `} <br />
          <span className="my-8 text-base font-normal text-gray-700 dark:text-gray-400">{subTitle}</span>
        </h4>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{address}</p>
      </div>
    </Link>
  );
};
