"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      <Link href="/" className="text-xl font-bold">Notes App</Link>
      <div>
        {session ? (
          <div className="flex items-center gap-4">
            <span>{session.user?.email}</span>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link href="/signin" className="px-4 py-2 bg-blue-500 text-white rounded">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}