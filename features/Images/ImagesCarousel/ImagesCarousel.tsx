import { Category, City, Firm, ImageType } from '@/api';
import { DEFAULT_PHOTOS_ENDPOINT, DEFAULT_PHOTOS_EXT } from '@/shared';
import { motion, useMotionValue } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';

export interface ImagesCarouselProps {
  images: ImageType[] | null;
  firm: Firm | null;
  city: City | null;
  category: Category | null;
}

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: 'spring',
  mass: 3,
  stiffness: 400,
  damping: 50,
};

export const ImagesCarousel: FC<ImagesCarouselProps> = ({ firm, city, category, images }) => {
  const [imgIndex, setImgIndex] = useState(0);

  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === (images?.length ?? 0) - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragX]);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < (images?.length ?? 0) - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  return (
    <div className="relative overflow-hidden py-8">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing"
      >
        <Images imgIndex={imgIndex} firm={firm} city={city} category={category} images={images} />
      </motion.div>

      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} images={images} />
      <GradientEdges />
    </div>
  );
};

export interface ImagesProps {
  imgIndex: number;
  images: ImageType[] | null;
  firm: Firm | null;
  city: City | null;
  category: Category | null;
}

const Images: FC<ImagesProps> = ({ imgIndex, firm, city, category, images }) => {
  return (
    <>
      {images?.map((img, idx) => {
        return (
          <motion.div
            key={idx}
            style={{
              backgroundImage: `url(${DEFAULT_PHOTOS_ENDPOINT}/${city?.abbreviation}/${category?.abbreviation}/${firm?.firm_id}/${img?.img_id}.${DEFAULT_PHOTOS_EXT})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            animate={{
              scale: imgIndex === idx ? 0.95 : 0.85,
            }}
            transition={SPRING_OPTIONS}
            className="aspect-video w-full shrink-0 rounded-xl object-cover"
          />
        );
      })}
    </>
  );
};

export interface DotsProps {
  imgIndex: number;
  setImgIndex: (v: number) => void;
  images: ImageType[] | null;
}

const Dots: FC<DotsProps> = ({ imgIndex, setImgIndex, images }) => {
  return (
    <div className="mt-4 flex w-full justify-center gap-2">
      {images?.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === imgIndex ? 'bg-neutral-50' : 'bg-neutral-500'
            }`}
          />
        );
      })}
    </div>
  );
};

const GradientEdges = () => {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px]" />
    </>
  );
};
