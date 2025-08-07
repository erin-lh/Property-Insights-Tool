"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PropertyData } from "@/lib/data-parser"
import { Layers, Square, Palette, Home, TrendingUp } from 'lucide-react'

interface FlooringMaterialsProps {
  propertyData: PropertyData | null
}

export function FlooringMaterials({ propertyData }: FlooringMaterialsProps) {
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

  // Use energy summary data if available, otherwise fall back to property data
  const primaryFlooringType = propertyData.energySummary?.flooringType ?? propertyData.primaryFlooringType ?? "Unknown"
  const hardwoodArea = propertyData.hardwoodArea ?? 0
  const tileArea = propertyData.tileArea ?? 0
  const carpetArea = propertyData.carpetArea ?? 0
  const totalFlooringArea = hardwoodArea + tileArea + carpetArea

  const flooringBreakdown = [
    {
      type: "Hardwood",
      area: hardwoodArea,
      percentage: ((hardwoodArea / totalFlooringArea) * 100).toFixed(1),
      colour: "bg-amber-100 border-amber-300 text-amber-800"
    },
    {
      type: "Tile",
      area: tileArea,
      percentage: ((tileArea / totalFlooringArea) * 100).toFixed(1),
      colour: "bg-slate-100 border-slate-300 text-slate-800"
    },
    {
      type: "Carpet",
      area: carpetArea,
      percentage: ((carpetArea / totalFlooringArea) * 100).toFixed(1),
      colour: "bg-blue-100 border-blue-300 text-blue-800"
    }
  ]

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Layers className="h-5 w-5 text-purple-600" />
          Primary Materials
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primary Materials Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <div className="text-sm font-medium text-gray-900 mb-1">Ceiling Type</div>
            <div className="text-lg font-semibold text-gray-800 capitalize">
              {propertyData.primaryCeilingType}
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <div className="text-sm font-medium text-gray-900 mb-1">Ceiling Material</div>
            <div className="text-lg font-semibold text-gray-800">
              Plasterboard
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <div className="text-sm font-medium text-gray-900 mb-1">Wall Type</div>
            <div className="text-lg font-semibold text-gray-800 capitalize">
              {propertyData.primaryWallType}
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <div className="text-sm font-medium text-gray-900 mb-1">Flooring Type</div>
            <div className="text-lg font-semibold text-gray-800 capitalize">
              {primaryFlooringType}
            </div>
          </div>
        </div>

        {/* Material Distribution */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Square className="h-4 w-4 text-gray-600" />
            <h4 className="font-medium text-gray-900">Material Distribution</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {flooringBreakdown.map((material, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${material.colour}`}>
                <div className="text-center">
                  <div className="text-sm font-medium mb-1">{material.type}</div>
                  <div className="text-2xl font-bold mb-1">{material.area.toFixed(1)}</div>
                  <div className="text-xs">sqm ({material.percentage}%)</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 text-center">
              <span className="font-medium">Total Flooring Area:</span> {totalFlooringArea.toFixed(1)} sqm
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
