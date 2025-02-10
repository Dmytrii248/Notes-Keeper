"use client";

import { useToggleDialog } from "@/hooks";
import { FormDialog } from "./FormDialog";
import { TNote } from "@/types";
import { useDatabase } from "./DBProvider";

export const PageHeader = () => {
  const { open, handleClose, handleOpen } = useToggleDialog();
  const database = useDatabase();

  const handleSubmit = async (data: TNote) => {
    await database.notes.insert(data);

    handleClose();
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-4xl font-semibold text-gray-700">NoteList</h1>
        <button
          onClick={handleOpen}
          className="rounded-md bg-slate-500 text-white p-4 size-8 flex items-center justify-center"
        >
          +
        </button>
      </div>

      <FormDialog
        title="Create New Note"
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
