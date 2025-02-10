import { TNote } from "@/types";
import Image from "next/image";
import { FormDialog } from "./FormDialog";
import { useToggleDialog } from "@/hooks";
import { useDatabase } from "./DBProvider";
import { ConfirmDialog } from "./ConfirmDialog";

interface IProps {
  note: TNote;
}

export const NoteListItem = ({ note }: IProps) => {
  const { open, handleClose, handleOpen } = useToggleDialog();
  const {
    open: openRemoving,
    handleClose: handleCloseRemoving,
    handleOpen: handleOpenRemoving,
  } = useToggleDialog();
  const database = useDatabase();

  const handleEdit = async (data: TNote) => {
    await database.notes
      .findOne({ selector: { id: data.id } })
      .update({ $set: data });

    handleClose();
  };

  const handleRemove = async () => {
    await database.notes.findOne({ selector: { id: note.id } }).remove();

    handleOpenRemoving();
  };

  return (
    <li
      className="shadow-lg mt-4 py-2 px-4 bg-neutral-50 group relative"
      key={note.id}
    >
      <span className="text-xl font-medium">{note.title}</span>
      {note.body && <p className="mt-2">{note.body}</p>}
      <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1 flex-col right-[-36] top-0 ">
        <button className="p-[6px]" onClick={handleOpen}>
          <Image src="/edit.svg" alt="edit icon" width={24} height={24} />
        </button>
        <button className="p-[6px]" onClick={handleRemove}>
          <Image src="/trash.svg" alt="edit icon" width={24} height={24} />
        </button>
      </div>
      <FormDialog
        title="Edit Note"
        open={open}
        onClose={handleClose}
        onSubmit={handleEdit}
        noteToEdit={note}
      />
      <ConfirmDialog
        open={openRemoving}
        onClose={handleCloseRemoving}
        onConfirm={handleRemove}
      />
    </li>
  );
};
