export default function Page({
  params,
}: {
  params: {
    cityId: string;
  };
}) {
  return <>City {params.cityId}</>;
}
