import UploadImage from "$components/admin/UploadImage";

export default function ({ params }: { params: { id: string } }) {
  return <UploadImage id={params.id} />;
}
