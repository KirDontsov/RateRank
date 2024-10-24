import { CommonProps } from '@/shared/types';
import { Suspense } from 'react';

export default function CategoryLayout({ children }: CommonProps) {
  return <Suspense fallback={<></>}>{children}</Suspense>;
}
