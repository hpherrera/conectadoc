import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Asistente Virtual Médico
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Te ayudaré a entender tus síntomas y encontrar el especialista adecuado
          </p>
          <Link href="/consulta">
            <Button size="lg" className="text-lg px-8">
              Comenzar Consulta
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}