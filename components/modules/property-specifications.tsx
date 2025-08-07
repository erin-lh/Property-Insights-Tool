"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PropertyData } from "@/lib/data-parser"
import { Home, Bed, Bath, Car, Ruler, Building, Calendar, MapPin } from 'lucide-react'

interface PropertySpecificationsProps {
  propertyData: PropertyData
}

export function PropertySpecifications({ propertyData }: PropertySpecificationsProps) {
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
      </CardContent>
    </Card>
  )
}
