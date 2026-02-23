export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <h1 className="text-2xl font-semibold">Edit project: {id}</h1>
}
