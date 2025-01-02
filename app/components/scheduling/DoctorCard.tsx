'use client';

import { Doctor } from '@/app/types/scheduling';
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import Image from 'next/image';
import { Calendar } from 'lucide-react';

interface Props {
  doctor: Doctor;
  onSelect: () => void;
}

export default function DoctorCard({ doctor, onSelect }: Props) {
  const availableDatesCount = Object.keys(doctor.availability).length;

  return (
    <Card className="overflow-hidden">
      <CardHeader 
        floated={false} 
        className="relative h-48"
      >
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          className="object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray">
          {doctor.name}
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          {doctor.specialty}
        </Typography>
        
        <div className="flex items-center mt-4 text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <Typography variant="small">
            {availableDatesCount} días disponibles
          </Typography>
        </div>

        <Button
          onClick={onSelect}
          className="w-full mt-4"
          color="blue"
        >
          Ver Disponibilidad
        </Button>
      </CardBody>
    </Card>
  );
}