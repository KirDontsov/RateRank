'use client';
import { $types } from '@/api';
import { useList } from 'effector-react';
import Link from 'next/link';

export default function Page({
  params,
}: {
  params: {
    cityId: string;
    categoryId: string;
  };
}) {
  const { cityId, categoryId } = params;

  return useList($types, ({ type_id, name, abbreviation }) => (
    <Link href={`/city/${cityId}/category/${categoryId}/type/${abbreviation}`} key={type_id}>
      {name}
    </Link>
  ));
}
