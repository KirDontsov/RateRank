import { $category, $city, $firm, $images } from '@/api';
import { DEFAULT_PHOTOS_ENDPOINT, DEFAULT_PHOTOS_EXT, HeroBackground } from '@/shared';
import { ImageWithFallback } from '@/widgets';
import { useList, useUnit } from 'effector-react';

export const ImagesList = () => {
  const { firm, city, category } = useUnit({
    firm: $firm,
    city: $city,
    category: $category,
  });

  return useList($images, (img) => (
    <div key={img?.img_id} className="aspect-video relative">
      <ImageWithFallback
        src={`${DEFAULT_PHOTOS_ENDPOINT}/${city?.abbreviation}/${category?.abbreviation}/${firm?.firm_id}/${img?.img_id}.${DEFAULT_PHOTOS_EXT}`}
        fallbackSrc={HeroBackground[(firm?.category_id ?? '') as keyof typeof HeroBackground]}
        fill
        alt={`${category?.name?.slice(0, -1)} ${firm?.name ?? ''} - ${city?.name}`}
        style={{ objectFit: 'cover' }}
      />
    </div>
  ));
};
