export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  availability: {
    [date: string]: string[]; // Array of available times
  };
}

export interface Appointment {
  doctorId: string;
  date: string;
  time: string;
  patientId: string;
}