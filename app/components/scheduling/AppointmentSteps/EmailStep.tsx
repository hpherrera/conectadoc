'use client';

import { Mail } from 'lucide-react';
import { Typography, Input } from "@material-tailwind/react";

interface Props {
  email: string;
  onEmailChange: (email: string) => void;
}

export default function EmailStep({ email, onEmailChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Mail className="w-6 h-6" />
        <Typography variant="h6">Ingresa tu correo</Typography>
      </div>
      <Input
        type="email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        placeholder="correo@ejemplo.com"
        className="!border-t-blue-gray-200 focus:!border-t-blue-500"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        crossOrigin={undefined}
      />
    </div>
  );
}