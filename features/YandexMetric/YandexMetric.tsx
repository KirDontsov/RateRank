'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const YandexMetric = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window.ym != 'undefined') {
      // @ts-ignore
      ym(97095336, 'hit', `${pathname}?${searchParams}`);
    } else {
      console.log('Метрика не инициализирована');
    }
  }, [pathname, searchParams]);

  return null;
};
