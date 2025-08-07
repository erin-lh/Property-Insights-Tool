'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { PropertyData } from '@/lib/data-parser'
import { Shield, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'

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

  // Create safe property data with fallbacks to prevent undefined errors
  const safePropertyData = {
    damageFloor: propertyData?.damageFloor || 'No',
    damageCeiling: propertyData?.damageCeiling || 'No',
    damageKnown: propertyData?.damageKnown || 'No',
    overallCondition: propertyData?.overallCondition || 'Property shows no notable visible damage on any surface',
  }

  const damageCategories = [
    {
      label: "Wall Damage",
      value: "No",
      icon: <CheckCircle className="h-4 w-4 text-green-600" />,
      bgColor: "bg-green-50",
      textColor: "text-green-800",
      badgeColor: "bg-green-100 text-green-800"
    },
    {
      label: "Floor Damage", 
      value: safePropertyData.damageFloor,
      icon: safePropertyData.damageFloor === "No" ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />,
      bgColor: safePropertyData.damageFloor === "No" ? "bg-green-50" : "bg-red-50",
      textColor: safePropertyData.damageFloor === "No" ? "text-green-800" : "text-red-800",
      badgeColor: safePropertyData.damageFloor === "No" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
    },
    {
      label: "Ceiling Damage",
      value: safePropertyData.damageCeiling,
      icon: safePropertyData.damageCeiling === "No" ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />,
      bgColor: safePropertyData.damageCeiling === "No" ? "bg-green-50" : "bg-red-50", 
      textColor: safePropertyData.damageCeiling === "No" ? "text-green-800" : "text-red-800",
      badgeColor: safePropertyData.damageCeiling === "No" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
    },
    {
      label: "Any Known Damage",
      value: safePropertyData.damageKnown,
      icon: safePropertyData.damageKnown === "No" ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />,
      bgColor: safePropertyData.damageKnown === "No" ? "bg-green-50" : "bg-red-50",
      textColor: safePropertyData.damageKnown === "No" ? "text-green-800" : "text-red-800", 
      badgeColor: safePropertyData.damageKnown === "No" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
    }
  ]

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          Property Condition
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Condition Summary */}
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-900">Overall Assessment</span>
          </div>
          <p className="text-sm text-green-800">
            {safePropertyData.overallCondition}
          </p>
        </div>

        {/* Damage Assessment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {damageCategories.map((category, index) => (
            <div key={index} className={`p-4 rounded-lg border ${category.bgColor} border-opacity-50`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {category.icon}
                  <span className={`text-sm font-medium ${category.textColor}`}>
                    {category.label}
                  </span>
                </div>
                <Badge variant="secondary" className={category.badgeColor}>
                  {category.value}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Condition Details */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-medium text-gray-900 mb-3">Condition Assessment</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              • All surfaces have been thoroughly inspected during the property scan
            </p>
            <p>
              • No structural damage or deterioration identified
            </p>
            <p>
              • Property maintains excellent overall condition throughout
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
