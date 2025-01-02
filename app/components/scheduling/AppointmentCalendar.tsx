'use client';

import { useState } from 'react';
import { Button, Card, Typography } from "@material-tailwind/react";
import { Doctor } from '@/app/types/scheduling';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  doctor: Doctor;
  onSelectDateTime: (date: string, time: string) => void;
}

export default function AppointmentCalendar({ doctor, onSelectDateTime }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const availableDates = Object.keys(doctor.availability);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateAvailable = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return availableDates.includes(dateStr);
  };

  const handleDateSelect = (date: Date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
      const dateStr = date.toISOString().split('T')[0];
      if (doctor.availability[dateStr]?.length > 0) {
        onSelectDateTime(dateStr, doctor.availability[dateStr][0]);
      }
    }
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Button variant="text" onClick={prevMonth}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Typography variant="h6" className="capitalize">
          {monthName} {year}
        </Typography>
        <Button variant="text" onClick={nextMonth}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} />;
          }

          const isAvailable = isDateAvailable(date);
          const isSelected = selectedDate?.toDateString() === date.toDateString();

          return (
            <Button
              key={date.toISOString()}
              variant={isSelected ? "filled" : "text"}
              color={isAvailable ? "blue" : "blue-gray"}
              disabled={!isAvailable}
              className={`h-10 p-0 ${isAvailable ? 'hover:bg-blue-50' : 'opacity-50'}`}
              onClick={() => handleDateSelect(date)}
            >
              {date.getDate()}
            </Button>
          );
        })}
      </div>
    </Card>
  );
}