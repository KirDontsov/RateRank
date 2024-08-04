import { Category, City, Firm, ImageType } from '@/api';
import { getCategoryName } from '@/shared';
import { SectionHeader } from '@/widgets';
import cn from 'classnames';
import { FC } from 'react';
import { ImagesCarousel } from './ImagesCarousel';

export interface ImagesProps {
  images: ImageType[] | null;
  firm: Firm | null;
  city: City | null;
  category: Category | null;
  tablet: boolean;
}

export const Images: FC<ImagesProps> = ({ images, city, firm, category, tablet }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {images?.length ? (
        <>
          <SectionHeader
            title={`Фотографии ${getCategoryName({ name: category?.name, rod: true }).toLowerCase()} ${firm?.name}`}
          />

          <div
            className={cn('flex flex-col gap-4', {
              'w-[calc(100% + 80px)] mx-[-40px]': tablet,
              'w-[calc(100% + 60px)] mx-[-30px]': !tablet,
            })}
          >
            <ImagesCarousel firm={firm} city={city} category={category} images={images} tablet={tablet} />
          </div>
        </>
      ) : (
        <SectionHeader
          title={`У ${getCategoryName({ name: category?.name, rod: true }).toLowerCase()} ${firm?.name} нет фотографий`}
        />
      )}
    </div>
  );
};
