"use client";

import { useEffect, useState } from "react";
import { useDatabase } from "./DBProvider";
import { TNote } from "@/types";
import { NoteListItem } from "./NoteListItem";

export const NoteList = () => {
  const database = useDatabase();
  const [notes, setNotes] = useState<TNote[] | null>(null);

  useEffect(() => {
    database.notes.find().$.subscribe((notes) => {
      setNotes(notes);
    });
  }, [database]);

  return (
    <>
      {notes?.length ? (
        <ul>
          {notes.map((note) => (
            <NoteListItem key={note.id} note={note} />
          ))}
        </ul>
      ) : (
        <div className="text-xl mt-6">There are no notes yet</div>
      )}
    </>
  );
};
