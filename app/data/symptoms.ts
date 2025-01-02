export const symptomsData = {
  initial: {
    id: 'main-symptom',
    text: '¿Cuál es tu síntoma principal?',
    options: [
      'Dolor de cabeza',
      'Dolor de estómago',
      'Fiebre',
      'Tos',
      'Fatiga'
    ],
    followUpQuestions: {
      'Dolor de cabeza': {
        id: 'headache-type',
        text: '¿Cómo describirías el dolor?',
        options: [
          'Pulsante',
          'Presión',
          'Punzante',
          'Constante'
        ],
        followUpQuestions: {
          'Pulsante': {
            id: 'headache-duration',
            text: '¿Cuánto tiempo lleva el dolor?',
            options: [
              'Menos de 4 horas',
              '4-24 horas',
              'Más de 24 horas'
            ]
          }
        }
      },
      'Dolor de estómago': {
        id: 'stomach-pain',
        text: '¿En qué parte del estómago sientes el dolor?',
        options: [
          'Parte superior',
          'Alrededor del ombligo',
          'Parte baja',
          'Todo el estómago'
        ]
      }
      // Otros síntomas seguirían el mismo patrón
    }
  }
};