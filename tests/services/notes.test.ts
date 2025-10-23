import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';
import prisma from '../../lib/prisma';
import {
  createNote,
  getNotesForUser,
  getNote,
  updateNote,
  deleteNote,
} from '../../lib/services/notes';

describe('notes service', () => {
  let userId: string;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    prismaClient = prisma;
    // Setup in-memory SQLite by overriding DATABASE_URL
    process.env.DATABASE_URL = 'file:.:memory:?cache=shared';
    await prismaClient.$connect();
    // Create a test user
    const user = await prismaClient.user.create({
      data: { email: 'test@example.com' }
    });
    userId = user.id;
  });

  afterAll(async () => {
    await prismaClient.note.deleteMany({});
    await prismaClient.user.deleteMany({});
    await prismaClient.$disconnect();
  });

  it('should create a note', async () => {
    const note = await createNote(userId, { title: 'Test', content: 'Content' });
    expect(note).toHaveProperty('id');
    expect(note.title).toBe('Test');
  });

  it('should get notes for user', async () => {
    const notes = await getNotesForUser(userId);
    expect(notes.length).toBeGreaterThan(0);
  });

  it('should get a single note', async () => {
    const notes = await getNotesForUser(userId);
    const note = await getNote(notes[0].id, userId);
    expect(note).not.toBeNull();
    expect(note?.title).toBe('Test');
  });

  it('should update a note', async () => {
    const notes = await getNotesForUser(userId);
    const updated = await updateNote(notes[0].id, userId, { title: 'Updated' });
    expect(updated.title).toBe('Updated');
  });

  it('should delete a note', async () => {
    const notes = await getNotesForUser(userId);
    const idToDelete = notes[0].id;
    await deleteNote(idToDelete, userId);
    const note = await getNote(idToDelete, userId);
    expect(note).toBeNull();
  });
});