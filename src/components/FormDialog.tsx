import { TNote } from "@/types";
import { FormEvent } from "react";
import { createPortal } from "react-dom";

interface IProps {
  title: string;
  open: boolean;
  onClose: VoidFunction;
  onSubmit: (data: TNote) => void;
  noteToEdit?: TNote;
}

export const FormDialog = ({
  title,
  open,
  onClose,
  onSubmit,
  noteToEdit,
}: IProps) => {
  if (!open) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    onSubmit({
      id: noteToEdit?.id || crypto.randomUUID(),
      userId: 11,
      title: formData.get("title") as string,
      body: (formData.get("body") as string) || "",
    });
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg min-w-[420px] flex flex-col items-start"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold">{title}</h3>
        <form
          className="flex flex-col gap-2 mt-8 w-full"
          onSubmit={handleSubmit}
        >
          <input
            name="title"
            type="text"
            placeholder="Title"
            required
            defaultValue={noteToEdit?.title || ""}
            className="border border-gray-200 rounded-md px-2 py-1"
          />
          <textarea
            name="body"
            required
            defaultValue={noteToEdit?.body || ""}
            placeholder="Description"
            className="border border-gray-200 rounded-md px-2 py-1 min-h-32"
          />
          <div className="flex justify-end w-full gap-4 mt-2">
            <button
              type="submit"
              onClick={onClose}
              className="rounded-md border border-slate-500 text-slate-500 px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-slate-500 text-white px-4 py-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
