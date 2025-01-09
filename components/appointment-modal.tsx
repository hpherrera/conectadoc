"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Doctor, AppointmentFormData, PaymentOption } from "@/app/types"
import { CreditCard, Building2, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface AppointmentModalProps {
  doctor: Doctor
  isOpen: boolean
  onClose: () => void
}

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
]

export function AppointmentModal({ doctor, isOpen, onClose }: AppointmentModalProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<AppointmentFormData>({
    email: "",
    date: undefined,
    time: "",
    doctorId: doctor.id
  })
  const [paymentOption, setPaymentOption] = useState<PaymentOption>('now')

  const handleDateSelect = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, date }))
  }

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, time }))
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, email: e.target.value }))
  }

  const handleSubmit = () => {
    setStep(4)
  }

  const handlePaymentSelection = async () => {
    setLoading(true)
    
    const params = new URLSearchParams({
      doctor: doctor.name,
      date: formData.date ? formData.date.toLocaleDateString() : '',
      time: formData.time,
      reason: "Consulta médica",
      payment: paymentOption === 'now' ? 'Pago en línea' : 'Pago en clínica'
    })

    // Add a small delay to ensure the loading state is visible
    await new Promise(resolve => setTimeout(resolve, 500))
    
    onClose()
    
    if (paymentOption === 'now') {
      router.push(`/pago?${params.toString()}`)
    } else {
      router.push(`/confirmacion?${params.toString()}`)
    }
    
    // Reset the form state
    setLoading(false)
    setStep(1)
    setFormData({
      email: "",
      date: undefined,
      time: "",
      doctorId: doctor.id
    })
    setPaymentOption('now')
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!formData.date
      case 2:
        return !!formData.time
      case 3:
        return !!formData.email && formData.email.includes("@")
      case 4:
        return !!paymentOption && !loading
      default:
        return false
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {step === 4 ? "Método de pago" : `Agendar cita con ${doctor.name}`}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={formData.date}
              onSelect={handleDateSelect}
              disabled={(date) => 
                date < new Date() || 
                date.getDay() === 0 || 
                date.getDay() === 6
              }
              className="rounded-md border"
            />
            <Button 
              onClick={() => setStep(2)} 
              disabled={!canProceed()}
              className="w-full"
            >
              Siguiente
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <RadioGroup
              value={formData.time}
              onValueChange={handleTimeSelect}
              className="grid grid-cols-2 gap-2"
            >
              {timeSlots.map((time) => (
                <div key={time} className="flex items-center space-x-2">
                  <RadioGroupItem value={time} id={time} />
                  <Label htmlFor={time}>{time}</Label>
                </div>
              ))}
            </RadioGroup>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Atrás
              </Button>
              <Button onClick={() => setStep(3)} disabled={!canProceed()}>
                Siguiente
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleEmailChange}
                placeholder="tu@email.com"
              />
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Atrás
              </Button>
              <Button onClick={handleSubmit} disabled={!canProceed()}>
                Siguiente
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentOption === 'now'
                    ? 'border-primary bg-primary/5'
                    : 'hover:border-primary/50'
                } ${loading ? 'pointer-events-none opacity-50' : ''}`}
                onClick={() => setPaymentOption('now')}
              >
                <CreditCard className="w-6 h-6 mb-2" />
                <h3 className="font-medium">Pagar ahora</h3>
                <p className="text-sm text-muted-foreground">
                  Pago seguro en línea
                </p>
              </div>
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentOption === 'later'
                    ? 'border-primary bg-primary/5'
                    : 'hover:border-primary/50'
                } ${loading ? 'pointer-events-none opacity-50' : ''}`}
                onClick={() => setPaymentOption('later')}
              >
                <Building2 className="w-6 h-6 mb-2" />
                <h3 className="font-medium">Pagar después</h3>
                <p className="text-sm text-muted-foreground">
                  Pago en la clínica
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setStep(3)}
                disabled={loading}
              >
                Atrás
              </Button>
              <Button 
                onClick={handlePaymentSelection}
                disabled={!canProceed()}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  'Confirmar'
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}