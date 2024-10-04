import { Firm, ImageType } from '@/api';
import { getCategories, getCities, getFirm, getImages, getPageByUrl } from '@/app/api';
import { COMMON_DOMAIN, PageProps } from '@/shared';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { ArticlePage } from './ArticlePage';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const paramsRes = await params;
  const pageUrl = `${paramsRes?.article ?? ''}`;

  const page = await getPageByUrl(pageUrl);

  const title = page?.sections?.[0]?.title ?? '';
  const description = page?.sections?.[0]?.subtitle ?? '';
  const url = page?.page?.url ?? '';

  return {
    title: `${title}`,
    description: `${description}`,
    alternates: { canonical: `https://топвыбор.рф/blog/${url}` },
    keywords: ['отзывы', ' рейтинг'],
    openGraph: {
      title: `${title}`,
      description: `${description}`,
      url: `https://топвыбор.рф/blog/${url}`,
      siteName: `${COMMON_DOMAIN}`,
      locale: 'ru_RU',
      type: 'website',
    },
  };
}

/** Страница статьи */
export default async function Page({ params }: PageProps) {
  const paramsRes = await params;
  const pageUrl = `${paramsRes?.article ?? ''}`;

  const page = await getPageByUrl(pageUrl);

  const map = new Map<string, ImageType[]>();
  const firms: Firm[] | null = [];

  const x = await Promise.all(
    // @ts-ignore
    (page?.sections ?? [])?.map(async (section) => {
      const images = await getImages(section?.url ?? '');
      const firm = await getFirm(section?.url ?? '');

      if (firm) {
        firms.push(firm);
      }

      if (images?.length) {
        map.set(section?.page_block_section_id ?? '', images.slice(0, 3));
      }

      return map;
    }),
  );

  const cities = await getCities();
  const categories = await getCategories(1, 10);

  return (
    <Suspense fallback={<></>}>
      <ArticlePage page={page} cities={cities} categories={categories} firms={firms} images={map} />
    </Suspense>
  );
}
