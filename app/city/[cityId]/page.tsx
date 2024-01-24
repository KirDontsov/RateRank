'use client';
import { $categories } from '@/api';
import { useList } from 'effector-react';
import Link from 'next/link';

export default function Page({
  params,
}: {
  params: {
    cityId: string;
  };
}) {
  return useList($categories, ({ category_id, name, abbreviation }) => (
    <Link href={`/city/${params.cityId}/category/${abbreviation}`} key={category_id} className="flex gap-4">
      <div>{category_id}</div>
      <div>{name}</div>
    </Link>
  ));
}
