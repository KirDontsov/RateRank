import { HeroSection, Nav } from '@/components';
import { CommonProps } from '@/shared/types';

export default function CityLayout({ children }: CommonProps) {
  return (
    <>
      <HeroSection>
        <Nav />
        <div className="h-[calc(100vh-54px)] w-full flex flex-col items-center overflow-auto gap-4">{children}</div>
      </HeroSection>
    </>
  );
}
