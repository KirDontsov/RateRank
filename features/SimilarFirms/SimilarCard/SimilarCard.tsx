'use client';
import { $firmsPage, Category, City, setFirmEvt, setFirmLoadingEvt } from '@/api';
import { transliterate } from '@/shared';
import { ImageWithFallback } from '@/widgets';
import { useUnit } from 'effector-react';
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
  city: City | null;
  category: Category | null;
}

export const SimilarCard: FC<SimilarCardProps> = ({
  firmId,
  city,
  category,
  src,
  fallbackSrc,
  alt,
  title,
  subTitle,
  address,
  url,
}) => {
  const searchParams = useSearchParams();
  const { page, setFirm, setFirmLoading } = useUnit({
    page: $firmsPage,
    setFirm: setFirmEvt,
    setFirmLoading: setFirmLoadingEvt,
  });

  const handleClick = useCallback(() => {
    setFirm({ firmUrl: url });
    setFirmLoading(true);
  }, [setFirm, setFirmLoading, url]);

  return (
    <a
      key={firmId}
      href={`/${city?.abbreviation}/${category?.abbreviation}/${url ?? transliterate(title ?? '')}?firmsPage=${Number(searchParams.get('firmsPage')) || page}`}
      onClick={handleClick}
      className="bg-white rounded-lg shadow hover:shadow-md dark:bg-eboni-800 relative cursor-pointer min-w-80 max-w-sm md:min-w-[40rem] md:max-w-lg"
    >
      <div className="relative w-full h-[15rem] md:h-[30rem] overflow-hidden">
        <ImageWithFallback
          key={firmId}
          className="w-full h-[15rem] md:h-[30rem] hover:scale-[1.1] duration-300"
          src={src}
          fallbackSrc={fallbackSrc}
          fill
          alt={alt}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="p-5 flex flex-col gap-8">
        <h3 className="font-bold tracking-tight whitespace-pre text-base xl:text-2xl flex flex-col">
          <span className="text-eboni-400 dark:text-white truncate">{`${title} `}</span>{' '}
          <span className="font-normal text-sm xl:text-base">{subTitle}</span>
        </h3>
        <p className="mb-3 font-normal text-sm xl:text-base">{address}</p>
      </div>
    </a>
  );
};
