"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Note = {
  id: string;
  title: string;
  content: string;
};

export default function NoteCard({ note }: { note: Note }) {
  const router = useRouter();
  const handleDelete = async () => {
    if (!confirm("Delete this note?")) return;
    await fetch(`/api/notes/${note.id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div className="p-4 border rounded-md">
      <Link href={`/notes/${note.id}`}>  
        <h2 className="text-lg font-semibold">{note.title}</h2>
      </Link>
      <p className="text-sm mt-2">{note.content.slice(0, 100)}{note.content.length > 100 ? "..." : ""}</p>
      <button onClick={handleDelete} className="text-red-600 text-sm mt-2">
        Delete
      </button>
    </div>
  );
}