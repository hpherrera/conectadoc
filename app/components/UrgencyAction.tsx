'use client';

import { useRouter } from 'next/navigation';
import { Diagnosis } from '../types';
import { AlertTriangle, Calendar, PhoneCall } from 'lucide-react';

interface Props {
  diagnosis: Diagnosis;
}

export default function UrgencyAction({ diagnosis }: Props) {
  const router = useRouter();

  const handleScheduleAppointment = () => {
    router.push('/consultation');
  };

  return (
    <div className="mt-6 space-y-4">
      {diagnosis.urgency.isUrgent ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <p className="ml-3 text-red-700">
              {diagnosis.urgency.message}
            </p>
          </div>
          <div className="mt-4">
            <a
              href="tel:131"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              Llamar a Emergencias (131)
            </a>
          </div>
        </div>
      ) : diagnosis.canScheduleOnline ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-green-500" />
              <p className="ml-3 text-green-700">
                Puedes agendar una consulta en línea
              </p>
            </div>
            <button
              onClick={handleScheduleAppointment}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              Agendar Consulta
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-700">
            Te recomendamos agendar una consulta con tu médico de cabecera en los próximos días.
          </p>
        </div>
      )}
    </div>
  );
}