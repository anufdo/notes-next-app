import prisma from "../prisma";

type CreateNoteInput = {
  title: string;
  content?: string;
};

export async function createNote(
  userId: string,
  data: CreateNoteInput
) {
  return prisma.note.create({
    data: {
      title: data.title,
      content: data.content ?? "",
      userId,
    },
  });
}

export async function getNotesForUser(userId: string) {
  return prisma.note.findMany({
    where: { userId },
  });
}

export async function getNote(
  noteId: string,
  userId: string
) {
  return prisma.note.findFirst({
    where: { id: noteId, userId },
  });
}

export async function updateNote(
  noteId: string,
  userId: string,
  data: Partial<{ title: string; content: string }>
) {
  const note = await prisma.note.findFirst({
    where: { id: noteId, userId },
  });
  if (!note) {
    throw new Error("Note not found");
  }
  return prisma.note.update({
    where: { id: noteId },
    data,
  });
}

export async function deleteNote(
  noteId: string,
  userId: string
) {
  const note = await prisma.note.findFirst({
    where: { id: noteId, userId },
  });
  if (!note) {
    throw new Error("Note not found");
  }
  return prisma.note.delete({
    where: { id: noteId },
  });
}
