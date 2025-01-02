'use client';

import { useState } from 'react';
import { doctors } from '../data/doctors';
import DoctorCard from '../components/scheduling/DoctorCard';
import SchedulingModal from '../components/scheduling/SchedulingModal';
import { Doctor } from '../types/scheduling';
import { generateMeetingLink } from '../utils/meeting';

export default function SchedulingPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false);

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsSchedulingOpen(true);
  };

  const handleScheduleComplete = async (appointment: { doctorId: string; date: string; time: string }) => {
    // Generar link de Jitsi Meet
    const meetingLink = generateMeetingLink(appointment);
    
    // Aquí se conectaría con el backend para guardar la cita
    const appointmentWithMeeting = {
      ...appointment,
      meetingLink
    };
    
    console.log('Cita agendada:', appointmentWithMeeting);
    setIsSchedulingOpen(false);
    
    // Mostrar confirmación con el link de la videollamada
    alert(`¡Cita agendada con éxito!\nLink de la videollamada: ${meetingLink}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">
          Profesionales Disponibles
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Selecciona un profesional para agendar tu consulta
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onSelect={() => handleDoctorSelect(doctor)}
          />
        ))}
      </div>

      {selectedDoctor && (
        <SchedulingModal
          isOpen={isSchedulingOpen}
          onClose={() => setIsSchedulingOpen(false)}
          onSchedule={handleScheduleComplete}
          doctor={selectedDoctor}
        />
      )}
    </div>
  );
}