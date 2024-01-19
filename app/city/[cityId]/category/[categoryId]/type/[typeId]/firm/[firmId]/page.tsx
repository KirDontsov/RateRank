export default function Page({
  params,
}: {
  params: {
    cityId: string;
    categoryId: string;
    typeId: string;
    firmId: string;
  };
}) {
  return <div>Firm {params.firmId}</div>;
}
