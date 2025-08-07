"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PropertyData } from "@/lib/data-parser"
import { Shield, CheckCircle } from 'lucide-react'

interface PropertyConditionProps {
  propertyData: PropertyData | null
}

export function PropertyCondition({ propertyData }: PropertyConditionProps) {
  // Add null check to prevent errors
  if (!propertyData) {
    return (
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getConditionColour = (condition: string | undefined) => {
    if (!condition || condition.toLowerCase() === 'no') {
      return 'bg-green-100 text-green-800'
    }
    return 'bg-red-100 text-red-800'
  }

  const getConditionIcon = (condition: string | undefined) => {
    if (!condition || condition.toLowerCase() === 'no') {
      return <CheckCircle className="h-4 w-4 text-green-600" />
    }
    return <CheckCircle className="h-4 w-4 text-red-600" />
  }

  const getConditionText = (condition: string | undefined) => {
    return condition || 'No'
  }

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          Property Condition
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Condition */}
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">Overall Condition</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Excellent
            </Badge>
          </div>
          <p className="text-sm text-green-700 font-medium">
            {propertyData.overallCondition}
          </p>
        </div>

        {/* Condition Breakdown */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {getConditionIcon(propertyData.damageWalls)}
              <span className="text-sm font-medium text-gray-900">Wall Damage</span>
            </div>
            <Badge variant="secondary" className={getConditionColour(propertyData.damageWalls)}>
              {getConditionText(propertyData.damageWalls)}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {getConditionIcon(propertyData.damageFloor)}
              <span className="text-sm font-medium text-gray-900">Floor Damage</span>
            </div>
            <Badge variant="secondary" className={getConditionColour(propertyData.damageFloor)}>
              {getConditionText(propertyData.damageFloor)}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {getConditionIcon(propertyData.damageCeiling)}
              <span className="text-sm font-medium text-gray-900">Ceiling Damage</span>
            </div>
            <Badge variant="secondary" className={getConditionColour(propertyData.damageCeiling)}>
              {getConditionText(propertyData.damageCeiling)}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {getConditionIcon(propertyData.damageKnown)}
              <span className="text-sm font-medium text-gray-900">Any Known Damage</span>
            </div>
            <Badge variant="secondary" className={getConditionColour(propertyData.damageKnown)}>
              {getConditionText(propertyData.damageKnown)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
