import { Category, City, Firm, ImageType } from '@/api';
import { useMediaQuery } from '@/hooks';
import { SectionHeader } from '@/widgets';
import cn from 'classnames';
import { FC } from 'react';
import { ImagesCarousel } from './ImagesCarousel';

export interface ImagesProps {
  images: ImageType[] | null;
  firm: Firm | null;
  city: City | null;
  category: Category | null;
}

export const Images: FC<ImagesProps> = ({ images, city, firm, category }) => {
  const tablet = useMediaQuery('(max-width: 768px)');
  return (
    <div className="w-full flex flex-col gap-4">
      {images?.length ? (
        <>
          <SectionHeader title={`Фотографии ${category?.name?.slice(0, -1).toLowerCase()}а ${firm?.name}`} />

          <div
            className={cn('flex flex-col gap-4', {
              'w-[calc(100% + 80px)] mx-[-40px]': tablet,
              'w-[calc(100% + 60px)] mx-[-30px]': !tablet,
            })}
          >
            <ImagesCarousel firm={firm} city={city} category={category} images={images} />
          </div>
        </>
      ) : (
        <SectionHeader title={`У ${category?.name?.slice(0, -1).toLowerCase()}а ${firm?.name} нет фотографий`} />
      )}
    </div>
  );
};
