import { $category, $firm, $images } from '@/api';
import { useUnit } from 'effector-react';
import { ImagesList } from './ImagesList';
import { SectionHeader } from '@/widgets';
import { useMediaQuery } from '@/hooks';
import cn from 'classnames';

export const Images = () => {
  const { firm, category, images } = useUnit({
    firm: $firm,
    category: $category,
    images: $images,
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
              <ImagesList />
            </div>
          </>
        ) : (
          <SectionHeader title={`У ${category?.name?.slice(0, -1).toLowerCase()}а ${firm?.name} нет фотографий`} />
        )}
      </div>
    </>
  );
};
