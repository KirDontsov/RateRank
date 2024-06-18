import { Page } from '@/api';
import { BACKEND_PORT } from '@/shared';

export async function getPages(): Promise<Page[] | null> {
  const firms = await fetch(`${BACKEND_PORT}/api/pages`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => {
      console.warn('error');
    });

  return firms?.data?.pages || null;
}
