import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Notes() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/signin")
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Your Notes</h1>
      <p>Welcome, {session.user?.email}!</p>
      {/* Add notes list here later */}
    </div>
  )
}