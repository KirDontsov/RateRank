'use client';
import { Button, CenteredContainer, HeroSection } from '@/widgets';

export const dynamic = 'error';

export default function NotFound() {
  const handleClick = () => {
    window.location.assign('/');
  };
  return (
    <HeroSection>
      <CenteredContainer h="screen">
        <div className="container flex flex-col px-4 py-8">
          <p className="mb-8">Ошибка 404</p>
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Такой страницы нет
          </h1>
          <div className="mt-4">
            <Button onClick={handleClick}>Перейти на главную</Button>
          </div>
        </div>
      </CenteredContainer>
    </HeroSection>
  );
}
