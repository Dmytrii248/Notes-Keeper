import { TDatabase } from "@/db";
import Api from "@/api";

export const bulkDB = async (db: TDatabase) => {
  const notes = await Api.getNotes();

  const formattedNotes = notes.map((note) => ({
    ...note,
    id: crypto.randomUUID(),
  }));

  await db.notes.bulkInsert(formattedNotes);
};
