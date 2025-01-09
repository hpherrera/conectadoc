"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"

interface Location {
  id: string
  name: string
  image: string
}

interface Symptom {
  name: string
  locations: Location[]
}

interface SymptomDetailProps {
  symptom: Symptom
}

export function SymptomDetail({ symptom }: SymptomDetailProps) {
  const router = useRouter()
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId)
    // Show summary after a brief delay
    setTimeout(() => {
      router.push("/resumen")
    }, 500)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-semibold">Asistente Virtual Médico</h1>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <p className="text-lg">¿En qué parte sientes el {symptom.name.toLowerCase()}?</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          {symptom.locations.map((location) => (
            <Card
              key={location.id}
              className={`cursor-pointer transition-shadow hover:shadow-lg ${
                selectedLocation === location.id ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => handleLocationSelect(location.id)}
            >
              <CardContent className="p-4">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-medium text-center">{location.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}