import { $category, Firm, ImageType } from '@/api';
import { useMediaQuery } from '@/hooks';
import { SectionHeader } from '@/widgets';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { FC } from 'react';
import { ImagesList } from './ImagesList';

export interface ImagesProps {
  images: ImageType[] | null;
  firm: Firm | null;
}

export const Images: FC<ImagesProps> = ({ images, firm }) => {
  const { category } = useUnit({
    category: $category,
  });

  const tablet = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <div
        className={cn('flex flex-col gap-4 w-1/2', {
          'w-full': tablet,
        })}
      >
        {images?.length ? (
          <>
            <SectionHeader title={`Фотографии ${category?.name?.slice(0, -1).toLowerCase()}а ${firm?.name}`} />

            <div className="w-full flex flex-col gap-4">
              <ImagesList images={images} />
            </div>
          </>
        ) : (
          <SectionHeader title={`У ${category?.name?.slice(0, -1).toLowerCase()}а ${firm?.name} нет фотографий`} />
        )}
      </div>
    </>
  );
};
