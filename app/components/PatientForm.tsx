'use client';

import { useState } from 'react';
import { Patient } from '../types';

interface Props {
  onSubmit: (patient: Patient) => void;
}

export default function PatientForm({ onSubmit }: Props) {
  const [patient, setPatient] = useState<Patient>({
    rut: '',
    name: '',
    birthDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(patient);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <div>
        <label htmlFor="rut" className="block text-sm font-medium text-gray-700">
          RUT
        </label>
        <input
          type="text"
          id="rut"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          value={patient.rut}
          onChange={(e) => setPatient({ ...patient, rut: e.target.value })}
        />
      </div>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre Completo
        </label>
        <input
          type="text"
          id="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          value={patient.name}
          onChange={(e) => setPatient({ ...patient, name: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
          Fecha de Nacimiento
        </label>
        <input
          type="date"
          id="birthDate"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          value={patient.birthDate}
          onChange={(e) => setPatient({ ...patient, birthDate: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Comenzar Diagnóstico
      </button>
    </form>
  );
}