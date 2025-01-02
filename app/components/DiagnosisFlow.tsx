'use client';

import { useState } from 'react';
import { Symptom } from '../types';
import { symptomsData } from '../data/symptoms';
import { Activity } from 'lucide-react';

interface Props {
  onComplete: (answers: string[]) => void;
}

export default function DiagnosisFlow({ onComplete }: Props) {
  const [currentSymptom, setCurrentSymptom] = useState<Symptom>(symptomsData.initial);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleOptionSelect = (option: string) => {
    const newAnswers = [...answers, option];
    
    const nextQuestion = currentSymptom.followUpQuestions?.[option];
    if (nextQuestion) {
      setCurrentSymptom(nextQuestion);
    } else {
      onComplete(newAnswers);
    }
    
    setAnswers(newAnswers);
  };

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      <div className="text-center">
        <Activity className="w-12 h-12 mx-auto text-primary" />
        <h2 className="mt-4 text-2xl font-bold text-gray-900">{currentSymptom.text}</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {currentSymptom.options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionSelect(option)}
            className="p-4 text-left border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <span className="font-medium text-gray-900">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
}