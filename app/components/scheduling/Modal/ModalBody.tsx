'use client';

import { DialogBody, Button } from "@material-tailwind/react";
import { Doctor } from '@/app/types/scheduling';
import DateStep from '../AppointmentSteps/DateStep';
import TimeStep from '../AppointmentSteps/TimeStep';
import EmailStep from '../AppointmentSteps/EmailStep';
import ConfirmationStep from '../AppointmentSteps/ConfirmationStep';

interface Props {
  step: string;
  doctor: Doctor;
  selectedDate: string;
  selectedTime: string;
  email: string;
  meetingLink: string;
  onDateTimeSelect: (date: string, time: string) => void;
  onEmailChange: (email: string) => void;
  onNext: () => void;
}

export default function ModalBody({
  step,
  doctor,
  selectedDate,
  selectedTime,
  email,
  meetingLink,
  onDateTimeSelect,
  onEmailChange,
  onNext
}: Props) {
  const renderStep = () => {
    const steps = {
      date: <DateStep doctor={doctor} onDateTimeSelect={onDateTimeSelect} />,
      time: <TimeStep doctor={doctor} selectedDate={selectedDate} selectedTime={selectedTime} onTimeSelect={(time) => onDateTimeSelect(selectedDate, time)} />,
      email: <EmailStep email={email} onEmailChange={onEmailChange} />,
      confirmation: <ConfirmationStep doctor={doctor} selectedDate={selectedDate} selectedTime={selectedTime} meetingLink={meetingLink} />
    };

    return steps[step as keyof typeof steps];
  };

  return (
    <DialogBody className="h-[calc(100vh-30rem)] overflow-y-auto p-6">
      <div className="space-y-8">
        {renderStep()}

        {step !== 'confirmation' && (
          <div className="pt-4 border-t">
            <Button
              onClick={onNext}
              disabled={
                (step === 'date' && !selectedDate) ||
                (step === 'time' && !selectedTime) ||
                (step === 'email' && !email)
              }
              className="w-full"
              color="blue"
            >
              Continuar
            </Button>
          </div>
        )}
      </div>
    </DialogBody>
  );
}