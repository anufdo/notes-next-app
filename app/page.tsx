import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Link from "next/link"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome to Notes App
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {session ? (
              <>
                Hello {session.user?.name}! Go to your{" "}
                <Link href="/notes" className="font-medium text-zinc-950 dark:text-zinc-50 underline">
                  notes
                </Link>
                .
              </>
            ) : (
              <>
                Please{" "}
                <Link href="/signin" className="font-medium text-zinc-950 dark:text-zinc-50 underline">
                  sign in
                </Link>{" "}
                to access your notes.
              </>
            )}
          </p>
        </div>
      </main>
    </div>
  )
}
