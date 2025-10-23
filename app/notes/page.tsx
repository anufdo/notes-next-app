import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getNotesForUser } from "@/lib/services/notes"
import NoteCard from "@/components/NoteCard"
import Link from "next/link"

export default async function Notes() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/signin")
  }
  const notes = await getNotesForUser(session.user.id)
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Notes</h1>
        <Link href="/notes/new" className="px-4 py-2 bg-blue-600 text-white rounded">New Note</Link>
      </div>
      {notes.length === 0 ? (
        <p>No notes yet. Create one!</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  )
}