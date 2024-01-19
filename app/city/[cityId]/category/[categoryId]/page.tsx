export default function Page({
  params,
}: {
  params: {
    cityId: string;
    categoryId: string;
  };
}) {
  return <div>Category {params.categoryId}</div>;
}
