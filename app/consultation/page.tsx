'use client';

import { useState } from 'react';
import { Activity } from 'lucide-react';
import { doctors } from '../data/doctors';
import DoctorCard from '../components/scheduling/DoctorCard';
import AppointmentModal from '../components/scheduling/AppointmentModal';

export default function ConsultationPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Activity className="w-16 h-16 mx-auto text-primary" />
          <h1 className="mt-4 text-4xl font-bold text-gray-900">
            Consulta Médica Online
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Agenda una consulta con nuestros profesionales especializados
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onSelect={() => {
                setSelectedDoctor(doctor);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>

        {selectedDoctor && (
          <AppointmentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            doctor={selectedDoctor}
          />
        )}
      </div>
    </div>
  );
}