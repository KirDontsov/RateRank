import type { FC } from 'react';

export interface SectionHeaderProps {
  title: string;
  subTitle?: string;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ title, subTitle }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-[500] dark:text-blue-400 text-blue-400">{title}</h2>
      {subTitle && <p className="text-lg text-gray-500">{subTitle}</p>}
    </div>
  );
};
