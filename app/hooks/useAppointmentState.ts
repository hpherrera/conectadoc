'use client';

import { useState } from 'react';
import { Doctor } from '../types/scheduling';
import { generateMeetingLink } from '../utils/meeting';
import { addToCalendar } from '../utils/calendar';

type Step = 'date' | 'time' | 'email' | 'confirmation';

export function useAppointmentState(doctor: Doctor) {
  const [step, setStep] = useState<Step>('date');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [meetingLink, setMeetingLink] = useState<string>('');

  const handleDateTimeSelect = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handleNext = () => {
    if (step === 'date' && selectedDate) {
      setStep('time');
    } else if (step === 'time' && selectedTime) {
      setStep('email');
    } else if (step === 'email' && email) {
      const link = generateMeetingLink({ doctorId: doctor.id, date: selectedDate, time: selectedTime });
      setMeetingLink(link);
      setStep('confirmation');
      
      addToCalendar({
        title: `Consulta Online con ${doctor.name}`,
        date: selectedDate,
        time: selectedTime,
        details: `Link de video llamada: ${link}`
      });
    }
  };

  return {
    step,
    selectedDate,
    selectedTime,
    email,
    meetingLink,
    handleDateTimeSelect,
    handleEmailChange,
    handleNext
  };
}