export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <h1 className="text-2xl font-semibold">Edit skill: {id}</h1>
}
