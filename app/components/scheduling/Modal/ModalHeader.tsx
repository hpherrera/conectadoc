'use client';

import { DialogHeader, IconButton } from "@material-tailwind/react";
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function ModalHeader({ onClose }: Props) {
  return (
    <DialogHeader className="flex justify-between items-center">
      <span>Agendar Consulta</span>
      <IconButton
        variant="text"
        color="blue-gray"
        onClick={onClose}
        className="rounded-full"
      >
        <X className="w-5 h-5" />
      </IconButton>
    </DialogHeader>
  );
}