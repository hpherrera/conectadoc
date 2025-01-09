"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Calendar, Clock, User, CheckCircle2, CreditCard } from "lucide-react"

export default function Confirmacion() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const appointmentDetails = {
    doctorName: searchParams.get('doctor') || "Dr. Nombre",
    date: searchParams.get('date') || "Fecha no especificada",
    time: searchParams.get('time') || "Hora no especificada",
    reason: searchParams.get('reason') || "Consulta general",
    paymentMethod: searchParams.get('payment') || "En clínica"
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-semibold">¡Cita Confirmada!</h1>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Doctor</p>
                  <p className="text-gray-600">{appointmentDetails.doctorName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Fecha</p>
                  <p className="text-gray-600">{appointmentDetails.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Hora</p>
                  <p className="text-gray-600">{appointmentDetails.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Motivo de la consulta</p>
                  <p className="text-gray-600">{appointmentDetails.reason}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Método de pago</p>
                  <p className="text-gray-600">{appointmentDetails.paymentMethod}</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                onClick={() => router.push("/")}
                className="w-full"
              >
                Terminar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}