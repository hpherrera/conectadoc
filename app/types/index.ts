export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  isOnline: boolean;
  isInPerson: boolean;
  rating: number;
}

export interface AppointmentFormData {
  email: string;
  date: Date | undefined;
  time: string;
  doctorId: string;
}

export type PaymentOption = "now" | "later";

export interface Symptom {
  id: string;
  name: string;
  severity: "mild" | "moderate" | "severe";
}

export interface SymptomCheckerResult {
  recommendedSpecialty: string;
  urgency: "normal" | "urgent" | "emergency";
  message: string;
}
