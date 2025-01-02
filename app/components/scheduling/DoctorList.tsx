'use client';

import { Doctor } from '@/app/types/scheduling';
import Image from 'next/image';

interface Props {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  onSelectDoctor: (doctor: Doctor) => void;
}

export default function DoctorList({ doctors, selectedDoctor, onSelectDoctor }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
            selectedDoctor?.id === doctor.id
              ? 'border-primary bg-primary/5'
              : 'hover:border-gray-300'
          }`}
          onClick={() => onSelectDoctor(doctor)}
        >
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16">
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{doctor.name}</h3>
              <p className="text-sm text-gray-500">{doctor.specialty}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}