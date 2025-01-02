export function generateMeetingLink(appointment: { doctorId: string; date: string; time: string }) {
  // Generar un ID único para la reunión basado en la información de la cita
  const meetingId = `med-${appointment.doctorId}-${appointment.date.replace(/-/g, '')}-${appointment.time.replace(':', '')}`;
  
  // Crear link de Jitsi Meet
  return `https://meet.jit.si/${meetingId}`;
}