"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PropertyData } from "@/lib/data-parser"
import { Zap, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

interface EnergyEfficiencyProps {
  propertyData: PropertyData
}

export function EnergyEfficiency({ propertyData }: EnergyEfficiencyProps) {
  // Calculate energy efficiency score based on available data
  const calculateEnergyScore = () => {
    let score = 0
    let maxScore = 0

    // Air conditioning efficiency (modern systems score higher)
    if (propertyData.airConditioningType.toLowerCase().includes("inverter")) {
      score += 25
    } else if (propertyData.airConditioningCount > 0) {
      score += 15
    }
    maxScore += 25

    // Lighting efficiency (LED assumed for newer properties)
    if (propertyData.ceilingLightCount > 0) {
      score += 20 // Assume modern LED lighting
    }
    maxScore += 20

    // Insulation and materials (hardwood and modern materials)
    if (propertyData.primaryFlooringType === "hardwood") {
      score += 15
    }
    if (propertyData.primaryWallType === "plaster") {
      score += 10
    }
    maxScore += 25

    // Safety systems
    if (propertyData.smokeAlarmCount >= 6) {
      score += 15
    } else if (propertyData.smokeAlarmCount > 0) {
      score += 10
    }
    maxScore += 15

    // Building age and design
    if (propertyData.floors === 2) {
      score += 10 // Multi-level design can be more efficient
    }
    maxScore += 15

    return Math.round((score / maxScore) * 100)
  }

  const energyScore = calculateEnergyScore()
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { label: "Excellent", variant: "default" as const, color: "bg-green-100 text-green-800" }
    if (score >= 60) return { label: "Good", variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800" }
    return { label: "Needs Improvement", variant: "destructive" as const, color: "bg-red-100 text-red-800" }
  }

  const scoreBadge = getScoreBadge(energyScore)

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-600" />
          Energy Efficiency Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Energy Score */}
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <div className={`text-3xl font-bold ${getScoreColor(energyScore)}`}>{energyScore}%</div>
          <div className="text-sm text-gray-500 mb-2">Energy Efficiency Score</div>
          <Badge className={scoreBadge.color}>{scoreBadge.label}</Badge>
        </div>

        {/* Energy Features */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Energy Features</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-900">Modern AC System</span>
              </div>
              <span className="text-sm text-gray-600">{propertyData.airConditioningType}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">LED Lighting</span>
              </div>
              <span className="text-sm text-gray-600">{propertyData.ceilingLightCount} fixtures</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-900">Safety Systems</span>
              </div>
              <span className="text-sm text-gray-600">{propertyData.smokeAlarmCount} smoke alarms</span>
            </div>
          </div>
        </div>

        {/* Damage Assessment */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Property Condition</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              {propertyData.damageWalls === "No" ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <span className="text-sm text-gray-700">Wall Condition</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              {propertyData.damageFloor === "No" ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <span className="text-sm text-gray-700">Floor Condition</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              {propertyData.damageCeiling === "No" ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <span className="text-sm text-gray-700">Ceiling Condition</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              {propertyData.damageKnown === "No" ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              )}
              <span className="text-sm text-gray-700">Overall Status</span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <h5 className="font-medium text-blue-900 mb-2">Energy Recommendations</h5>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Continue regular maintenance of {propertyData.airConditioningCount} AC units</li>
            <li>• Consider smart lighting controls for {propertyData.ceilingLightCount} fixtures</li>
            <li>• Monitor energy usage across {propertyData.totalArea} sqm floor area</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
