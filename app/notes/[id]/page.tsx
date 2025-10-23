import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getNote } from "@/lib/services/notes"
import Editor from "@/components/Editor"

export default async function NotePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/signin")
  }
  const note = await getNote(params.id, session.user.id)
  if (!note) redirect("/notes")
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>
      <Editor note={note} />
    </div>
  )
}