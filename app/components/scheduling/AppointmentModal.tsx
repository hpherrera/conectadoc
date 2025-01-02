'use client';

import { useState } from 'react';
import { Dialog } from "@material-tailwind/react";
import { Doctor } from '@/app/types/scheduling';
import ModalHeader from './Modal/ModalHeader';
import ModalBody from './Modal/ModalBody';
import { useAppointmentState } from '@/app/hooks/useAppointmentState';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor;
}

export default function AppointmentModal({ isOpen, onClose, doctor }: Props) {
  const {
    step,
    selectedDate,
    selectedTime,
    email,
    meetingLink,
    handleDateTimeSelect,
    handleNext,
    handleEmailChange
  } = useAppointmentState(doctor);

  return (
    <Dialog 
      open={isOpen} 
      handler={onClose} 
      size="xl"
      className="bg-white"
      dismiss={{ outsidePress: false }}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <ModalHeader onClose={onClose} />
      <ModalBody
        step={step}
        doctor={doctor}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        email={email}
        meetingLink={meetingLink}
        onDateTimeSelect={handleDateTimeSelect}
        onEmailChange={handleEmailChange}
        onNext={handleNext}
      />
    </Dialog>
  );
}