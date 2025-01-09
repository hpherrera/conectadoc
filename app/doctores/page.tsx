"use client"

import { useState } from "react"
import { doctors } from "../data/doctors"
import { Doctor } from "../types"
import { AppointmentModal } from "@/components/appointment-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Video, UserRound } from "lucide-react"
import { Toaster } from "@/components/ui/sonner"

export default function Doctores() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setIsModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Selecciona un médico
        </h1>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="online">Telemedicina</TabsTrigger>
            <TabsTrigger value="inPerson">Presencial</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onAppointment={handleAppointment}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="online">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors
                .filter((d) => d.isOnline)
                .map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onAppointment={handleAppointment}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="inPerson">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors
                .filter((d) => d.isInPerson)
                .map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onAppointment={handleAppointment}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {selectedDoctor && (
          <AppointmentModal
            doctor={selectedDoctor}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false)
              setSelectedDoctor(null)
            }}
          />
        )}
      </div>
      <Toaster />
    </main>
  )
}

interface DoctorCardProps {
  doctor: Doctor
  onAppointment: (doctor: Doctor) => void
}

function DoctorCard({ doctor, onAppointment }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
        <p className="text-gray-600 mb-4">{doctor.specialty}</p>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">{doctor.rating}</span>
          </div>
          <div className="flex gap-2">
            {doctor.isOnline && (
              <Video className="w-4 h-4 text-blue-500" />
            )}
            {doctor.isInPerson && (
              <UserRound className="w-4 h-4 text-green-500" />
            )}
          </div>
        </div>

        <Button
          className="w-full"
          onClick={() => onAppointment(doctor)}
        >
          Agendar cita
        </Button>
      </CardContent>
    </Card>
  )
}