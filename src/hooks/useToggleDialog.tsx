"use client";
import { useState } from "react";

export const useToggleDialog = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    document.body.style.overflow = "hidden";
  };
  const handleClose = () => {
    setOpen(false);
    document.body.style.overflow = "auto";
  };
  return { open, handleOpen, handleClose };
};
