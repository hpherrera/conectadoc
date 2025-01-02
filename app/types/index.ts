export interface Patient {
  rut: string;
  name: string;
  birthDate: string;
}

export interface Symptom {
  id: string;
  text: string;
  options: string[];
  followUpQuestions?: {
    [key: string]: Symptom;
  };
}

export interface Diagnosis {
  condition: string;
  recommendations: string[];
  severity: 'low' | 'medium' | 'high';
  urgency: {
    isUrgent: boolean;
    message: string;
  };
  canScheduleOnline: boolean;
}