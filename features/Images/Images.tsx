import { DEFAULT_PHOTOS_ENDPOINT, DEFAULT_PHOTOS_EXT } from '@/shared';
import { $category, $city, $firm, $images } from '@/api';
import { useUnit } from 'effector-react';
import Image from 'next/image';

export const Images = () => {
  const { firm, city, category, images } = useUnit({
    firm: $firm,
    city: $city,
    category: $category,
    images: $images,
  });

  return (
    <>
      <div className="flex flex-col gap-4 w-1/2">
        <h3 className="text-2xl font-[500] dark:text-blue-400 text-blue-400">Фото</h3>
        <div className="w-full flex flex-col gap-4">
          {images?.length ? (
            images.map((img) => {
              return (
                <div key={img?.img_id} className="aspect-video relative">
                  <Image
                    src={`${DEFAULT_PHOTOS_ENDPOINT}/${city?.abbreviation}/${category?.abbreviation}/${firm?.firm_id}/${img?.img_id}.${DEFAULT_PHOTOS_EXT}`}
                    fill
                    alt={firm?.name ?? ''}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              );
            })
          ) : (
            <h2 className="text-2xl font-[500] dark:text-blue-400 text-blue-400">Нет фото</h2>
          )}
        </div>
      </div>
    </>
  );
};
