export default function Page({
  params,
}: {
  params: {
    cityId: string;
  };
}) {
  return <div>City {params.cityId}</div>;
}
