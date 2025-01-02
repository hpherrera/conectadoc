'use client';

import { useState } from "react";
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

  return <div />;
}