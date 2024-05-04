import type { FC } from 'react';

export interface SectionHeaderProps {
  title: string;
  subTitle?: string;
  id?: string;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ title, subTitle, id = '' }) => {
  return (
    <div className="flex flex-col gap-2 scroll-mt-14 w-full" id={id}>
      <h2 className="text-lg lg:text-2xl font-[500] dark:text-blue-400 text-blue-400">{title}</h2>
      {subTitle && <p className="text-sm lg:text-lg text-gray-500">{subTitle}</p>}
    </div>
  );
};
