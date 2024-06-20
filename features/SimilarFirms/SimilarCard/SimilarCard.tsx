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
  url: string;
}

export const SimilarCard: FC<SimilarCardProps> = ({ firmId, src, fallbackSrc, alt, title, subTitle, address, url }) => {
  const searchParams = useSearchParams();
  const { city, category, page, setFirm, setFirmLoading } = useUnit({
    city: $city,
    category: $category,
    page: $firmsPage,
    setFirm: setFirmEvt,
    setFirmLoading: setFirmLoadingEvt,
  });

  const handleClick = useCallback(() => {
    setFirm({ firmUrl: url });
    setFirmLoading(true);
  }, [setFirm, setFirmLoading, url]);

  return (
    <Link
      key={firmId}
      href={`/${city?.abbreviation}/${category?.abbreviation}/${url ?? transliterate(title ?? '')}?firmsPage=${Number(searchParams.get('firmsPage')) || page}`}
      onClick={handleClick}
      className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative cursor-pointer min-w-80 max-w-sm md:min-w-[40rem] md:max-w-lg"
    >
      <div className="relative w-full h-[15rem] md:h-[30rem] overflow-hidden">
        <ImageWithFallback
          key={firmId}
          className="w-full h-[15rem] md:h-[30rem] hover:scale-125 duration-300"
          src={src}
          fallbackSrc={fallbackSrc}
          fill
          alt={alt}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="p-5">
        <h4 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white whitespace-pre">
          {`${title} `} <br />
          <span className="my-8 font-normal text-gray-700 dark:text-gray-400">{subTitle}</span>
        </h4>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm xl:text-base">{address}</p>
      </div>
    </Link>
  );
};
