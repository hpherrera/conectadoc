'use client';

import { Video } from 'lucide-react';
import { Typography, Card } from "@material-tailwind/react";
import { Doctor } from '@/app/types/scheduling';

interface Props {
  doctor: Doctor;
  selectedDate: string;
  selectedTime: string;
  meetingLink: string;
}

export default function ConfirmationStep({ doctor, selectedDate, selectedTime, meetingLink }: Props) {
  return (
    <div className="space-y-4 text-center">
      <div className="flex items-center justify-center">
        <Video className="w-8 h-8 text-green-500" />
      </div>
      <Typography variant="h4" color="blue-gray">
        ¡Consulta Agendada!
      </Typography>
      <Typography>
        Tu consulta con {doctor.name} está programada para el{' '}
        {new Date(selectedDate).toLocaleDateString()} a las {selectedTime}
      </Typography>
      <Card className="p-4 bg-blue-gray-50">
        <Typography variant="h6" color="blue-gray">
          Link de video llamada:
        </Typography>
        <a
          href={meetingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline break-all"
        >
          {meetingLink}
        </a>
      </Card>
      <Typography variant="small" color="gray">
        Se ha agregado el evento a tu calendario
      </Typography>
    </div>
  );
}