'use client';

import { Clock } from 'lucide-react';
import { Typography, Button } from "@material-tailwind/react";
import { Doctor } from '@/app/types/scheduling';

interface Props {
  doctor: Doctor;
  selectedDate: string;
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

export default function TimeStep({ doctor, selectedDate, selectedTime, onTimeSelect }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Clock className="w-6 h-6" />
        <Typography variant="h6">
          Selecciona un horario
        </Typography>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {doctor.availability[selectedDate]?.map((time) => (
          <Button
            key={time}
            onClick={() => onTimeSelect(time)}
            variant={selectedTime === time ? "filled" : "outlined"}
            color="blue"
            className="normal-case"
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
}