export default async function EditMessagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <h1 className="text-2xl font-semibold">Edit message: {id}</h1>
}
