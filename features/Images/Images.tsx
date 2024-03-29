import { $images } from '@/api';
import { useUnit } from 'effector-react';
import { ImagesList } from './ImagesList';

export const Images = () => {
  const images = useUnit($images);

  return (
    <>
      <div className="flex flex-col gap-4 w-1/2">
        {images?.length ? (
          <>
            <h2 className="text-2xl font-[500] dark:text-blue-400 text-blue-400">Фото</h2>

            <div className="w-full flex flex-col gap-4">
              <ImagesList />
            </div>
          </>
        ) : (
          <h2 className="text-2xl font-[500] dark:text-blue-400 text-blue-400">Нет фото</h2>
        )}
      </div>
    </>
  );
};
