import { COMMON_TITLE } from '@/shared';

export const LoadingScreen = () => {
  return (
    <div className="bg-black w-full h-screen flex items-center justify-center text-5xl">
      {COMMON_TITLE.toUpperCase()}
    </div>
  );
};
