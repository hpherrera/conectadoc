"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Resumen() {
  const router = useRouter()

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
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Resumen de la consulta</h2>
            <div className="space-y-2">
              <p className="text-gray-600">Basado en tus síntomas, te recomendamos:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Consultar con un médico general para una evaluación completa</li>
                <li>Mantener un registro de la frecuencia e intensidad de los síntomas</li>
                <li>Evitar la automedicación</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-medium">Recomendación:</p>
              <p>Es importante realizar una consulta médica para un diagnóstico preciso.</p>
            </div>

            <Button 
              className="w-full"
              onClick={() => router.push("/doctores")}
            >
              Agendar cita médica
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}