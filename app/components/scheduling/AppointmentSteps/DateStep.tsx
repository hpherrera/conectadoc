'use client';

import { Calendar } from 'lucide-react';
import { Typography } from "@material-tailwind/react";
import AppointmentCalendar from '../AppointmentCalendar';
import { Doctor } from '@/app/types/scheduling';

interface Props {
  doctor: Doctor;
  onDateTimeSelect: (date: string, time: string) => void;
}

export default function DateStep({ doctor, onDateTimeSelect }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Calendar className="w-6 h-6" />
        <Typography variant="h6">
          Selecciona una fecha
        </Typography>
      </div>
      <AppointmentCalendar
        doctor={doctor}
        onSelectDateTime={onDateTimeSelect}
      />
    </div>
  );
}