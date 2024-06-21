import type { FC } from 'react';

export interface CommonHeaderProps {
  title: string;
  subTitle?: string;
}

export const CommonHeader: FC<CommonHeaderProps> = ({ title, subTitle }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl text-center font-[500] dark:text-negroni-400 text-negroni-400">{title.toUpperCase()}</h1>
      {subTitle && <h2 className="text-lg text-center text-gray-500">{subTitle}</h2>}
    </div>
  );
};
