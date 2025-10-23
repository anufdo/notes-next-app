import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createNote, getNotesForUser } from "@/lib/services/notes";

export async function GET(_req: Request) {
  void _req;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const notes = await getNotesForUser(session.user.id);
  return NextResponse.json(notes);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { title, content } = body;
  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  const note = await createNote(session.user.id, { title, content });
  return NextResponse.json(note, { status: 201 });
}