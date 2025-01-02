export const getDiagnosisFromSymptoms = (symptoms: string[]) => {
  if (!symptoms.length) return null;
  
  const lastSymptom = symptoms[symptoms.length - 1];
  const mainSymptom = symptoms[0];
  
  // Lógica de diagnóstico simulada
  if (mainSymptom === 'Dolor de cabeza') {
    if (lastSymptom.includes('24 horas')) {
      return {
        condition: 'Migraña potencial',
        recommendations: [
          'Descansar en un lugar oscuro y silencioso',
          'Mantenerse hidratado',
          'Considerar medicamentos para el dolor de cabeza'
        ],
        severity: 'medium',
        urgency: {
          isUrgent: false,
          message: ''
        },
        canScheduleOnline: true
      };
    }
  }
  
  if (mainSymptom === 'Fiebre' && symptoms.includes('Más de 39°C')) {
    return {
      condition: 'Fiebre Alta',
      recommendations: [
        'Tomar antipiréticos según indicación',
        'Mantenerse hidratado',
        'Monitorear la temperatura'
      ],
      severity: 'high',
      urgency: {
        isUrgent: true,
        message: 'La fiebre alta requiere atención médica inmediata'
      },
      canScheduleOnline: false
    };
  }
  
  return {
    condition: 'Malestar general',
    recommendations: [
      'Descansar adecuadamente',
      'Mantener una buena hidratación',
      'Observar la evolución de los síntomas'
    ],
    severity: 'low',
    urgency: {
      isUrgent: false,
      message: ''
    },
    canScheduleOnline: true
  };
};