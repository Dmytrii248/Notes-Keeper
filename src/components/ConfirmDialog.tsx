import { createPortal } from "react-dom";

interface IProps {
  open: boolean;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
  title?: string;
  message?: string;
}

export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
}: IProps) => {
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg min-w-[360px] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-600 text-center mt-2">{message}</p>
        <div className="flex justify-end w-full gap-4 mt-6">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-500 text-gray-500 px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="rounded-md bg-red-500 text-white px-4 py-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
