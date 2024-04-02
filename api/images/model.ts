import { BACKEND_PORT, FirmId } from '@/shared';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

export const ImagesGate = createGate<FirmId>('ImagesGate');
export const ImageGate = createGate<{ imageId: string }>('ImageGate');

export const imagesD = createDomain('images');

export interface ImageType {
  img_id: string;
  firm_id: string;
  img_alt: string;
}

export interface ImagesQueryResult {
  status: string;
  data: {
    images: ImageType[];
    images_count: number;
  };
}

export interface ImageQueryResult {
  status: string;
  data: {
    image: ImageType;
  };
}

export const $images = imagesD.createStore<ImageType[]>([]);
export const $imagePage = imagesD.createStore<number>(1);
export const $imagesLoading = imagesD.createStore(false);
export const $imagesCount = imagesD.createStore<number | null>(null);
export const fetchImages = imagesD.createEvent<FirmId>();
export const setImagesPageEvt = imagesD.createEvent<number>();

export const getImagesFx = imagesD.createEffect({
  handler: async ({ firmId }: FirmId): Promise<{ images: ImagesQueryResult }> => {
    const res = await fetch(`${BACKEND_PORT}/api/images/${firmId}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const images = await res.json();

    return { images };
  },
});

sample({
  clock: ImagesGate.open,
  target: getImagesFx,
});

// sample({
//   clock: ImagesGate.close,
//   source: $images,
//   fn: (_, c) => [],
//   target: $images,
// });

sample({
  clock: getImagesFx.doneData,
  fn: (c) => c.images.data.images || [],
  target: $images,
});

sample({
  clock: getImagesFx.pending,
  fn: (c) => true,
  target: $imagesLoading,
});

sample({
  clock: getImagesFx.doneData,
  fn: (c) => c.images.data.images_count || null,
  target: $imagesCount,
});

sample({
  clock: setImagesPageEvt,
  target: $imagePage,
});

// === FIRM ===

export const imageD = createDomain('image');

export const $image = imageD.createStore<ImageType | null>(null);
export const fetchImageEvt = imageD.createEvent<{ imageId: string }>();

export const getImageFx = imageD.createEffect({
  handler: async ({ imageId }: { imageId: string }): Promise<{ image: ImageQueryResult }> => {
    const res = await fetch(`${BACKEND_PORT}/api/image/${imageId}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const image = await res.json();

    return { image };
  },
});

sample({
  clock: ImageGate.open,
  target: getImageFx,
});

sample({
  clock: getImageFx.doneData,
  fn: (c) => c.image.data.image || null,
  target: $image,
});

// // Pagination
// sample({
//   clock: setFirmsPageEvt,
//   source: $firm,
//   filter: (firm) => firm !== null,
//   fn: (firm, page) => ({ firmId: firm?.firm_id ?? '', page, limit: 10 }),
//   target: getImages,
// });
