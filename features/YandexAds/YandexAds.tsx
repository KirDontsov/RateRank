'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Extend the Window interface to include the Yandex Ads properties
declare global {
  interface Window {
    yaContextCb: Array<() => void>;
  }
  
  const Ya: {
    Context: {
      AdvManager: {
        render: (params: { blockId: string; renderTo: string }) => void;
      };
    };
  };
}

export const YandexAds = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.yaContextCb) {
      window.yaContextCb.push(() => {
        if (typeof Ya !== 'undefined' && Ya.Context && Ya.Context.AdvManager) {
          Ya.Context.AdvManager.render({
            blockId: 'R-A-17553177-1',
            renderTo: 'yandex_rtb_R-A-17553177-1',
          });
        }
      });
    }
  }, [usePathname, useSearchParams]);

  return <div id="yandex_rtb_R-A-17553177-1" className="sticky"></div>;
};
