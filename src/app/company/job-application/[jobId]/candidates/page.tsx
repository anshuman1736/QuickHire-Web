import CandiatesCompo from "@/components/company/candiatesApplication/Candiates";

export default async function Candiate({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  return <CandiatesCompo jobId={Number(jobId)} />;
}
