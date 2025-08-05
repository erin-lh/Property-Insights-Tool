"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PropertyData } from "@/lib/data-parser"
import { Ruler, Layers } from "lucide-react"

interface PropertySpecificationsProps {
  propertyData: PropertyData
}

export function PropertySpecifications({ propertyData }: PropertySpecificationsProps) {
  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Ruler className="h-5 w-5 text-blue-600" />
          Property Specifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Total Area</div>
            <div className="font-medium text-gray-900">{Math.round(propertyData.totalArea)} sqm</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Floor Area</div>
            <div className="font-medium text-gray-900">{propertyData.floorArea} sqm</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Land Size</div>
            <div className="font-medium text-gray-900">{propertyData.landArea} sqm</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Ceiling Height</div>
            <div className="font-medium text-gray-900">{propertyData.ceilingHeight}m</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Bed Area</div>
            <div className="font-medium text-gray-900">{Math.round(propertyData.bedArea)} sqm</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Bath Area</div>
            <div className="font-medium text-gray-900">{Math.round(propertyData.bathArea)} sqm</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Property Type</div>
            <div className="font-medium text-gray-900">{propertyData.propertyType}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Build Year</div>
            <div className="font-medium text-gray-900">{propertyData.buildYear}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Floors</div>
            <div className="font-medium text-gray-900">{propertyData.floors}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Hallway Width</div>
            <div className="font-medium text-gray-900">{propertyData.hallwayAvgWidth.toFixed(2)}m</div>
          </div>
        </div>

        {/* Primary Materials */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Layers className="h-4 w-4 text-gray-600" />
            Primary Materials
          </h4>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Ceiling Type</span>
              <span className="text-sm text-gray-600 capitalize">{propertyData.primaryCeilingType}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Wall Type</span>
              <span className="text-sm text-gray-600 capitalize">{propertyData.primaryWallType}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Flooring Type</span>
              <span className="text-sm text-gray-600 capitalize">{propertyData.primaryFlooringType}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
