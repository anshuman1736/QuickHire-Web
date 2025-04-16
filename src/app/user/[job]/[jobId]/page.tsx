import JobView from "@/components/user/jobView/jobView";

export default async function page({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  const intId = Number(jobId); 
  return <JobView jobId={intId} />;
}
