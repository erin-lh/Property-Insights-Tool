"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Thermometer, Zap, Leaf, ChevronDown, ChevronUp, Snowflake, AlertTriangle, XCircle } from "lucide-react"
import Image from "next/image"

export function EnergyEfficiency() {
  const [isHeatingCoolingOpen, setIsHeatingCoolingOpen] = useState(false)

  const energyData = {
    overallRating: "7.5",
    climateZone: "6",
    heatingCooling: [
      {
        type: "Split System Air Conditioner",
        brand: "Fujitsu",
        model: "AOTH24KNTA",
        capacity: "7.10kW-8.00kW",
        energyRating: "3.5 Star",
        location: "Living Room",
        image: "/images/fujitsu-ac-specs.png",
      },
      {
        type: "Split System Air Conditioner",
        brand: "Mitsubishi",
        model: "SRC35ZSA",
        capacity: "3.5kW-3.7kW",
        energyRating: "H3.5 C4",
        location: "Master Bedroom",
        image: "/images/mitsubishi-ac-specs.png",
      },
    ],
    features: [
      {
        name: "Optimal Layout",
        icon: AlertTriangle,
        status: "Top Floor- Open Plan",
        type: "warning",
      },
      {
        name: "Efficient Windows",
        icon: XCircle,
        status: "No- Single Glazing",
        type: "error",
      },
      {
        name: "Efficient Window Coverings",
        icon: XCircle,
        status: "No- only blinds downstairs- refer to images",
        type: "error",
      },
      {
        name: "Natural Ventilation",
        icon: AlertTriangle,
        status: "Moderate",
        type: "warning",
      },
      {
        name: "Efficient Hot Water",
        icon: AlertTriangle,
        status: "Hot water tank and power box present",
        type: "warning",
      },
      {
        name: "Energy Generation",
        icon: XCircle,
        status: "No",
        type: "error",
      },
      {
        name: "Energy Storage",
        icon: XCircle,
        status: "No",
        type: "error",
      },
      {
        name: "Electric Vehicle Charging",
        icon: XCircle,
        status: "No",
        type: "error",
      },
      {
        name: "Efficient Pool Pump",
        icon: XCircle,
        status: "No",
        type: "error",
      },
      {
        name: "EER (Score 0-6 stars)",
        icon: AlertTriangle,
        status: "Pending",
        type: "warning",
      },
    ],
  }

  const getStatusBadgeVariant = (type: string) => {
    switch (type) {
      case "error":
        return "destructive"
      case "warning":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusBadgeClass = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-50 text-red-700 border-red-200"
      case "warning":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-3">
            <Zap className="h-6 w-6 text-green-600" />
            Energy Efficiency Assessment
            <Badge variant="outline" className="ml-2">
              5/11
            </Badge>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Rating & Climate Zone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-700 mb-2">{energyData.overallRating}</div>
            <div className="text-sm text-green-600">Overall Energy Rating</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-700 mb-2">{energyData.climateZone}</div>
            <div className="text-sm text-blue-600">Climate Zone</div>
          </div>
        </div>

        {/* Heating & Cooling Systems */}
        <div>
          <Button
            variant="ghost"
            onClick={() => setIsHeatingCoolingOpen(!isHeatingCoolingOpen)}
            className="w-full justify-between p-0 h-auto hover:bg-transparent"
          >
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-blue-600" />
              Heating & Cooling Systems
            </h3>
            {isHeatingCoolingOpen ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </Button>

          {isHeatingCoolingOpen && (
            <div className="mt-4 space-y-4">
              {energyData.heatingCooling.map((system, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Snowflake className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{system.type}</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Brand:</span>
                          <span className="font-medium">{system.brand}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Model:</span>
                          <span className="font-medium">{system.model}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Capacity:</span>
                          <span className="font-medium">{system.capacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Energy Rating:</span>
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            {system.energyRating}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-medium">{system.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-full max-w-xs">
                        <Image
                          src={system.image || "/placeholder.svg"}
                          alt={`${system.brand} ${system.model} specifications`}
                          width={300}
                          height={200}
                          className="w-full h-auto rounded-lg border"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Energy Features */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            Energy Features
          </h3>
          <div className="space-y-3">
            {energyData.features.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <feature.icon className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium">{feature.name}</span>
                </div>
                <Badge className={getStatusBadgeClass(feature.type)}>{feature.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
