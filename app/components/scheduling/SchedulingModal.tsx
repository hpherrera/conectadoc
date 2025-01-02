'use client';

import { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Doctor } from '@/app/types/scheduling';
import DoctorList from './DoctorList';
import AppointmentCalendar from './AppointmentCalendar';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (appointment: { doctorId: string; date: string; time: string }) => void;
  doctor: Doctor;
}

export default function SchedulingModal({ isOpen, onClose, onSchedule, doctor }: Props) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleDateTimeSelect = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleSchedule = () => {
    if (selectedDate && selectedTime) {
      onSchedule({
        doctorId: doctor.id,
        date: selectedDate,
        time: selectedTime
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/50 z-50">
        <div className="fixed inset-y-0 right-0 w-full max-w-3xl bg-white shadow-xl p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Agendar Consulta</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Selecciona fecha y hora
              </h3>
              <AppointmentCalendar
                doctor={doctor}
                onSelectDateTime={handleDateTimeSelect}
              />
            </section>

            {selectedDate && selectedTime && (
              <div className="pt-4 border-t">
                <button
                  onClick={handleSchedule}
                  className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  Confirmar Agenda
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}