"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle, ThermometerSun, Stethoscope } from "lucide-react"
import { Symptom, SymptomCheckerResult } from "@/app/types"

interface SymptomCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (result: SymptomCheckerResult) => void;
}

const commonSymptoms: Symptom[] = [
  { id: "fever", name: "Fiebre", severity: "moderate" },
  { id: "cough", name: "Tos", severity: "mild" },
  { id: "headache", name: "Dolor de cabeza", severity: "moderate" },
  { id: "sore-throat", name: "Dolor de garganta", severity: "mild" },
  { id: "fatigue", name: "Fatiga", severity: "moderate" },
  { id: "body-ache", name: "Dolor corporal", severity: "moderate" },
  { id: "difficulty-breathing", name: "Dificultad para respirar", severity: "severe" },
  { id: "chest-pain", name: "Dolor en el pecho", severity: "severe" },
]

export function SymptomCheckerModal({ isOpen, onClose, onComplete }: SymptomCheckerModalProps) {
  const [step, setStep] = useState(1)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [duration, setDuration] = useState<string>("")

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    )
  }

  const analyzeSymptoms = (): SymptomCheckerResult => {
    const symptoms = selectedSymptoms.map(id => 
      commonSymptoms.find(s => s.id === id)!
    )
    
    const hasSevereSymptoms = symptoms.some(s => s.severity === "severe")
    const hasModerateSymptoms = symptoms.some(s => s.severity === "moderate")
    
    if (hasSevereSymptoms) {
      return {
        recommendedSpecialty: "Medicina de Emergencia",
        urgency: "emergency",
        message: "Sus síntomas requieren atención médica inmediata. Por favor, diríjase a emergencias."
      }
    }

    if (hasModerateSymptoms && duration === "more-than-week") {
      return {
        recommendedSpecialty: "Medicina General",
        urgency: "urgent",
        message: "Recomendamos una consulta médica prioritaria."
      }
    }

    return {
      recommendedSpecialty: "Medicina General",
      urgency: "normal",
      message: "Puede programar una consulta médica regular."
    }
  }

  const handleComplete = () => {
    const result = analyzeSymptoms()
    onComplete(result)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5" />
            Verificación de síntomas
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Seleccione sus síntomas:</h3>
              <div className="grid grid-cols-2 gap-4">
                {commonSymptoms.map((symptom) => (
                  <div key={symptom.id} className="flex items-start space-x-2">
                    <Checkbox
                      id={symptom.id}
                      checked={selectedSymptoms.includes(symptom.id)}
                      onCheckedChange={() => handleSymptomToggle(symptom.id)}
                    />
                    <Label
                      htmlFor={symptom.id}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {symptom.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <Button
              onClick={() => setStep(2)}
              disabled={selectedSymptoms.length === 0}
              className="w-full"
            >
              Siguiente
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">¿Hace cuánto tiempo tiene estos síntomas?</h3>
              <RadioGroup value={duration} onValueChange={setDuration}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="less-than-week" id="less-than-week" />
                  <Label htmlFor="less-than-week">Menos de una semana</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="more-than-week" id="more-than-week" />
                  <Label htmlFor="more-than-week">Más de una semana</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Atrás
              </Button>
              <Button onClick={handleComplete} disabled={!duration}>
                Completar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}