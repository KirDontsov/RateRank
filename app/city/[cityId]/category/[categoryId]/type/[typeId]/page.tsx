export default function Page({
  params,
}: {
  params: {
    cityId: string;
    categoryId: string;
    typeId: string;
  };
}) {
  return <div>Type {params.typeId}</div>;
}
