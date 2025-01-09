import { SymptomDetail } from "./symptom-detail"

const symptoms = {
  headache: {
    name: "Dolor de cabeza",
    locations: [
      {
        id: "frontal",
        name: "Frontal",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"
      },
      {
        id: "temporal",
        name: "Temporal",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"
      }
    ]
  },
  stomach: {
    name: "Dolor estomacal",
    locations: [
      {
        id: "upper",
        name: "Parte superior",
        image: "https://images.unsplash.com/photo-1606103836293-0a063ee20566?w=400&h=300&fit=crop"
      },
      {
        id: "lower",
        name: "Parte inferior",
        image: "https://images.unsplash.com/photo-1606103836293-0a063ee20566?w=400&h=300&fit=crop"
      }
    ]
  },
  throat: {
    name: "Dolor de garganta",
    locations: [
      {
        id: "front",
        name: "Parte frontal",
        image: "https://images.unsplash.com/photo-1600443546225-2194e5f7f66d?w=400&h=300&fit=crop"
      },
      {
        id: "sides",
        name: "Laterales",
        image: "https://images.unsplash.com/photo-1600443546225-2194e5f7f66d?w=400&h=300&fit=crop"
      }
    ]
  },
  back: {
    name: "Dolor de espalda",
    locations: [
      {
        id: "upper",
        name: "Parte superior",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"
      },
      {
        id: "lower",
        name: "Parte inferior",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"
      }
    ]
  }
}

export function generateStaticParams() {
  return Object.keys(symptoms).map((id) => ({
    id,
  }))
}

export default function Page({ params }: { params: { id: string } }) {
  const symptom = symptoms[params.id as keyof typeof symptoms]

  if (!symptom) {
    return <div>Síntoma no encontrado</div>
  }

  return <SymptomDetail symptom={symptom} />
}