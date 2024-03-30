'use client';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string;
}

export const ImageWithFallback = (props: ImageWithFallbackProps) => {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        if (fallbackSrc) setImgSrc(fallbackSrc);
      }}
    />
  );
};
