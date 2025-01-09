"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { MessageCircle } from "lucide-react"

interface UserInfo {
  name: string
  rut: string
  birthDate: string
}

export default function Consulta() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    rut: "",
    birthDate: ""
  })

  const handleUserInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
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

        {step === 1 && (
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleUserInfoSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    required
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rut">RUT</Label>
                  <Input
                    id="rut"
                    required
                    value={userInfo.rut}
                    onChange={(e) => setUserInfo({ ...userInfo, rut: e.target.value })}
                    placeholder="12.345.678-9"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">Fecha de nacimiento</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    required
                    value={userInfo.birthDate}
                    onChange={(e) => setUserInfo({ ...userInfo, birthDate: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Continuar
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <Card className="p-6">
              <p className="text-lg mb-4">Hola {userInfo.name}, ¿cómo te sientes hoy?</p>
              <p className="text-gray-600">Selecciona el síntoma principal que presentas:</p>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              {symptoms.map((symptom) => (
                <Card
                  key={symptom.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => router.push(`/sintomas/${symptom.id}`)}
                >
                  <CardContent className="p-4">
                    <img
                      src={symptom.image}
                      alt={symptom.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-medium text-center">{symptom.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

const symptoms = [
  {
    id: "headache",
    name: "Dolor de cabeza",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop"
  },
  {
    id: "stomach",
    name: "Dolor estomacal",
    image: "https://images.unsplash.com/photo-1606103836293-0a063ee20566?w=400&h=300&fit=crop"
  },
  {
    id: "throat",
    name: "Dolor de garganta",
    image: "https://images.unsplash.com/photo-1600443546225-2194e5f7f66d?w=400&h=300&fit=crop"
  },
  {
    id: "back",
    name: "Dolor de espalda",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"
  }
]