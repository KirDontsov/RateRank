import type { FC } from 'react';

export interface AuthHeaderProps {
  title: string;
  subTitle: string;
}

export const AuthHeader: FC<AuthHeaderProps> = ({ title, subTitle }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl text-center font-[500] dark:text-blue-400 text-white">{title}</h1>
      <h2 className="text-lg text-center text-gray-500">{subTitle}</h2>
    </div>
  );
};
