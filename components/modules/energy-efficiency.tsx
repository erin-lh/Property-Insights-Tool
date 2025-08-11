"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { PropertyData } from "@/lib/data-parser"
import {
  Zap,
  Home,
  Wind,
  Droplets,
  Sun,
  Battery,
  Car,
  Waves,
  Star,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { useState } from "react"

interface EnergyEfficiencyProps {
  propertyData: PropertyData
}

export function EnergyEfficiency({ propertyData }: EnergyEfficiencyProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Create energy data with safe fallbacks
  const energyData = {
    overallRating: "7.5",
    climateZone: propertyData?.climateZone || "Zone 2",
    scanDate: propertyData?.scannedDate || "2025-07-24 09:30:00.000000 UTC",
    uploadDate: propertyData?.uploadTime || "2025-06-24 00:12:52.377000 UTC",
  }

  // Format dates for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-AU", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  // Energy features with original data
  const energyFeatures = [
    {
      name: "Optimal Layout",
      value: "Top Floor- Open Plan",
      status: "warning",
      icon: Home,
    },
    {
      name: "Efficient Windows",
      value: "No- Single Glazing",
      status: "error",
      icon: Home,
    },
    {
      name: "Efficient Window Coverings",
      value: "No- only blinds downstairs- refer to images",
      status: "error",
      icon: Home,
    },
    {
      name: "Natural Ventilation",
      value: "Moderate",
      status: "warning",
      icon: Wind,
    },
    {
      name: "Efficient Hot Water",
      value: "Hot water tank and power box present",
      status: "warning",
      icon: Droplets,
    },
    {
      name: "Energy Generation",
      value: "No",
      status: "error",
      icon: Sun,
    },
    {
      name: "Energy Storage",
      value: "No",
      status: "error",
      icon: Battery,
    },
    {
      name: "Electric Vehicle Charging",
      value: "No",
      status: "error",
      icon: Car,
    },
    {
      name: "Efficient Pool Pump",
      value: "No",
      status: "error",
      icon: Waves,
    },
    {
      name: "EER (Score 0-6 stars)",
      value: "Pending",
      status: "warning",
      icon: Star,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "success":
        return "default"
      case "warning":
        return "secondary"
      case "error":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-between bg-transparent">
          <span className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Energy Efficiency
          </span>
          <Badge variant="secondary">5/11</Badge>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            Energy Efficiency Analysis
            <Badge variant="secondary">5/11</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overall Rating & Climate Zone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">{energyData.overallRating}</div>
              <div className="text-sm text-green-600">Overall Energy Rating</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-700 mb-2">{energyData.climateZone}</div>
              <div className="text-sm text-blue-600">Climate Zone</div>
            </div>
          </div>

          {/* Energy Features */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">Energy Features Assessment</h3>
            <div className="space-y-2">
              {energyFeatures.map((feature, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(feature.status)}
                    <span className="font-medium text-gray-700">{feature.name}</span>
                  </div>
                  <Badge variant={getStatusBadgeVariant(feature.status)}>{feature.value}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Heating & Cooling Systems */}
          <div className="space-y-3">
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full justify-between p-0 h-auto"
            >
              <h3 className="text-lg font-semibold text-gray-800">Heating & Cooling Systems</h3>
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            {isExpanded && (
              <div className="space-y-4 pl-4 border-l-2 border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700">Air Conditioning Units</h4>
                    <div className="text-sm text-gray-600">
                      <div>Count: {propertyData?.airConditioningCount || 3}</div>
                      <div>Type: {propertyData?.airConditioningType || "Fujitsu Inverter Split System"}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700">System Specifications</h4>
                    <div className="text-sm text-gray-600">
                      <div>Energy Rating: 4.5 stars</div>
                      <div>Cooling Capacity: 7.1kW</div>
                      <div>Heating Capacity: 8.0kW</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">System Details</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div>• Inverter technology for energy efficiency</div>
                    <div>• Multi-zone climate control</div>
                    <div>• Advanced filtration system</div>
                    <div>• Smart temperature control</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Scan Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Assessment Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <span className="font-medium">Scan Date:</span> {formatDate(energyData.scanDate)}
              </div>
              <div>
                <span className="font-medium">Upload Date:</span> {formatDate(energyData.uploadDate)}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
