import { CommonProps } from '@/shared';
import cn from 'classnames';
import { FC } from 'react';

export interface SectionProps {
  pt?: number;
}

export const Section: FC<SectionProps & CommonProps> = ({ children, pt = 74 }) => {
  return (
    <section
      className={cn(
        'h-[100vh] pt-[${pt}px] w-full flex flex-col items-center overflow-y-auto overflow-x-hidden scroll-smooth focus:scroll-auto gap-4 justify-between',
        {
          'pt-[74px]': pt === 74,
          'pt-0': pt === 0,
        },
      )}
    >
      {children}
    </section>
  );
};
