'use client';
import { $categories, $city } from '@/api';
import { useList, useUnit } from 'effector-react';
import Link from 'next/link';

export default function Page() {
  const { city } = useUnit({
    city: $city,
  });
  return useList($categories, ({ category_id, name, abbreviation }) => (
    <Link href={`/city/${city?.abbreviation}/category/${abbreviation}`} key={category_id}>
      {name}
    </Link>
  ));
}
