import { HeroSection, Nav, Pagination } from '@/components';
import { Footer } from '@/components/Footer';
import { CommonProps } from '@/shared/types';

export default function CityLayout({ children }: CommonProps) {
  return (
    <>
      <HeroSection>
        <Nav />
        <div className="h-[calc(100vh-70px)] w-full flex flex-col items-center overflow-auto pt-4 gap-4">
          {children}

          <div className="flex flex-col items-center gap-4 pt-4 w-full">
            <Pagination />
            <Footer />
          </div>
        </div>
      </HeroSection>
    </>
  );
}
