import { FC } from 'react';
import { CommonProps } from '@/shared';

export const Section: FC<CommonProps> = ({ children }) => {
  return (
    <section className="h-[100vh] pt-[74px] w-full flex flex-col items-center overflow-auto gap-4">{children}</section>
  );
};
