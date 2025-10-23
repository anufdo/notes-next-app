import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getNote, updateNote, deleteNote } from "@/lib/services/notes";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  void _req;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const note = await getNote(params.id, session.user.id);
  if (!note) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(note);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { title, content } = body;
  if (title === undefined && content === undefined) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }
  try {
    const updated = await updateNote(params.id, session.user.id, { title, content });
    return NextResponse.json(updated);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 404 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  void _req;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await deleteNote(params.id, session.user.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 404 });
  }
}