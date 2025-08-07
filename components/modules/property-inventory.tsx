"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PropertyData } from "@/lib/data-parser"
import { Package, Lightbulb, Wind, Shield, Flame, DoorOpen } from 'lucide-react'

interface PropertyInventoryProps {
  propertyData: PropertyData | null
}

export function PropertyInventory({ propertyData }: PropertyInventoryProps) {
  // Add null check and loading state
  if (!propertyData) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  const inventoryItems = [
    {
      icon: <Wind className="h-5 w-5 text-blue-600" />,
      label: "Air Conditioning",
      count: propertyData.airConditioningCount,
      detail: propertyData.airConditioningType || "Climate control units",
      category: "HVAC"
    },
    {
      icon: <Shield className="h-5 w-5 text-red-600" />,
      label: "Smoke Alarms",
      count: propertyData.smokeAlarmCount,
      detail: "Safety detection systems",
      category: "Safety"
    },
    {
      icon: <Lightbulb className="h-5 w-5 text-yellow-600" />,
      label: "Ceiling Lights",
      count: propertyData.ceilingLightCount,
      detail: "Lighting fixtures throughout",
      category: "Electrical"
    },
    {
      icon: <DoorOpen className="h-5 w-5 text-gray-600" />,
      label: "Doors",
      count: propertyData.doorCount,
      detail: "Interior and exterior doors",
      category: "Structure"
    },
    {
      icon: <Flame className="h-5 w-5 text-orange-600" />,
      label: "Fireplace",
      count: propertyData.fireplace === 'Yes' ? 1 : 0,
      detail: propertyData.fireplace === 'Yes' ? "Heating feature" : "No fireplace",
      category: "Heating"
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'HVAC':
        return 'bg-blue-100 text-blue-800'
      case 'Safety':
        return 'bg-red-100 text-red-800'
      case 'Electrical':
        return 'bg-yellow-100 text-yellow-800'
      case 'Structure':
        return 'bg-gray-100 text-gray-800'
      case 'Heating':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const totalItems = inventoryItems.reduce((sum, item) => sum + item.count, 0)

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Package className="h-5 w-5 text-purple-600" />
          Property Inventory
        </CardTitle>
        <p className="text-sm text-gray-600">
          {totalItems} total items across {inventoryItems.length} categories
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Inventory Items */}
        <div className="space-y-3">
          {inventoryItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {item.icon}
                <div>
                  <h4 className="font-semibold text-gray-900">{item.label}</h4>
                  <p className="text-sm text-gray-600">{item.detail}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">{item.count}</div>
                <Badge variant="secondary" className={`text-xs ${getCategoryColor(item.category)}`}>
                  {item.category}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Inventory Summary */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-medium text-gray-900 mb-3">Inventory Summary</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{propertyData.airConditioningCount}</div>
              <div className="text-xs text-blue-700">Climate Units</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-lg font-bold text-red-600">{propertyData.smokeAlarmCount}</div>
              <div className="text-xs text-red-700">Safety Devices</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-lg font-bold text-yellow-600">{propertyData.ceilingLightCount}</div>
              <div className="text-xs text-yellow-700">Light Fixtures</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-600">{propertyData.doorCount}</div>
              <div className="text-xs text-gray-700">Doors Total</div>
            </div>
          </div>
        </div>

        {/* Maintenance Notes */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-medium text-gray-900 mb-2">Maintenance Notes</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            All systems appear to be in working order. Regular maintenance schedules should be 
            maintained for HVAC systems and safety devices. Smoke alarm batteries should be 
            checked annually.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
