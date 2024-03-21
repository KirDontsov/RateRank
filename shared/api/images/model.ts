import { BACKEND_PORT } from '@/shared';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

export const ImagesGate = createGate<{ firmId: string }>('ImagesGate');
export const ImageGate = createGate<{ imageId: string }>('ImageGate');

export const imagesD = createDomain('images');

export interface Image {
  img_id: string;
  firm_id: string;
  img_alt: string;
}

export interface ImagesQueryResult {
  status: string;
  data: {
    images: Image[];
    images_count: number;
  };
}

export interface ImageQueryResult {
  status: string;
  data: {
    image: Image;
  };
}

export const $images = imagesD.createStore<Image[]>([]);
export const $imagePage = imagesD.createStore<number>(1);
export const $imagesLoading = imagesD.createStore(false);
export const $imagesCount = imagesD.createStore<number | null>(null);
export const fetchImages = imagesD.createEvent<{ firmId: string }>();
export const setImagesPageEvt = imagesD.createEvent<number>();

export const getImages = imagesD.createEffect({
  handler: async ({ firmId }: { firmId: string }): Promise<{ images: ImagesQueryResult }> => {
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
  target: getImages,
});

// sample({
//   clock: ImagesGate.close,
//   source: $images,
//   fn: (_, c) => [],
//   target: $images,
// });

sample({
  clock: getImages.doneData,
  fn: (c) => c.images.data.images || [],
  target: $images,
});

sample({
  clock: getImages.pending,
  fn: (c) => true,
  target: $imagesLoading,
});

sample({
  clock: getImages.doneData,
  fn: (c) => c.images.data.images_count || null,
  target: $imagesCount,
});

sample({
  clock: setImagesPageEvt,
  target: $imagePage,
});

// === FIRM ===

export const imageD = createDomain('image');

export const $image = imageD.createStore<Image | null>(null);
export const fetchImageEvt = imageD.createEvent<{ imageId: string }>();

export const getImage = imageD.createEffect({
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
  target: getImage,
});

sample({
  clock: getImage.doneData,
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
