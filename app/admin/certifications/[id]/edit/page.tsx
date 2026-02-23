export default async function EditCertificationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <h1 className="text-2xl font-semibold">Edit certification: {id}</h1>
}
