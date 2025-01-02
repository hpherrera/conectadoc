'use client';

import { useState } from 'react';
import PatientForm from './components/PatientForm';
import DiagnosisFlow from './components/DiagnosisFlow';
import UrgencyAction from './components/UrgencyAction';
import { Patient, Diagnosis } from './types';
import { Activity } from 'lucide-react';
import { getDiagnosisFromSymptoms } from './utils/diagnosis';

export default function Home() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);

  const handleDiagnosisComplete = (answers: string[]) => {
    const result = getDiagnosisFromSymptoms(answers);
    if (result) {
      setDiagnosis(result as Diagnosis);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Activity className="w-16 h-16 mx-auto text-primary" />
          <h1 className="mt-4 text-4xl font-bold text-gray-900">
            Sistema de Diagnóstico Médico
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Responde algunas preguntas para ayudarte a entender tus síntomas
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          {!patient && <PatientForm onSubmit={setPatient} />}
          
          {patient && !diagnosis && (
            <DiagnosisFlow onComplete={handleDiagnosisComplete} />
          )}

          {diagnosis && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Diagnóstico Preliminar
                </h2>
                <p className="mt-2 text-gray-600">
                  Basado en tus respuestas, aquí está nuestro análisis
                </p>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {diagnosis.condition}
                </h3>
                <div className="mt-4 space-y-3">
                  <h4 className="font-medium text-gray-900">Recomendaciones:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {diagnosis.recommendations.map((rec, index) => (
                      <li key={index} className="text-gray-600">{rec}</li>
                    ))}
                  </ul>
                </div>
                
                <UrgencyAction diagnosis={diagnosis} />

                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-500">
                    Este es un diagnóstico preliminar. Si los síntomas persisten o empeoran, 
                    por favor consulta a un profesional de la salud.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}