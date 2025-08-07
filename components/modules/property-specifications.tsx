'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { type PropertyData } from '@/lib/data-parser'
import { Home, Layers, Palette, Hammer } from 'lucide-react'

interface PropertySpecificationsProps {
  propertyData: PropertyData
}

export function PropertySpecifications({ propertyData }: PropertySpecificationsProps) {
  // Provide fallback values to prevent undefined errors
  const safePropertyData = {
    primaryFlooringType: propertyData?.primaryFlooringType || 'Hardwood',
    primaryWallType: propertyData?.primaryWallType || 'Plaster',
    primaryInternalColor: propertyData?.primaryInternalColor || '#d2d0ca',
    primaryCeilingType: propertyData?.primaryCeilingType || 'Plasterboard with decorative cornice',
    bedrooms: propertyData?.bedrooms || 3,
    bathrooms: propertyData?.bathrooms || 2,
    carSpaces: propertyData?.carSpaces || 1,
    floors: propertyData?.floors || 2,
    buildYear: propertyData?.buildYear || 'Unknown',
    propertyType: propertyData?.propertyType || 'HOUSE',
    totalArea: propertyData?.totalArea || 142.6283016,
    floorArea: propertyData?.floorArea || 115,
    landArea: propertyData?.landArea || 255,
    ceilingHeight: propertyData?.ceilingHeight || 2.415555451,
    ...propertyData
  }

  const specifications = [
    {
      icon: <Home className="h-4 w-4 text-blue-600" />,
      label: 'Property Type',
      value: safePropertyData.propertyType
    },
    {
      icon: <Home className="h-4 w-4 text-green-600" />,
      label: 'Build Year',
      value: safePropertyData.buildYear
    },
    {
      icon: <Layers className="h-4 w-4 text-purple-600" />,
      label: 'Floors',
      value: safePropertyData.floors.toString()
    },
    {
      icon: <Hammer className="h-4 w-4 text-orange-600" />,
      label: 'Ceiling Height',
      value: `${safePropertyData.ceilingHeight.toFixed(2)}m`
    }
  ]

  const areas = [
    { label: 'Total Area', value: `${safePropertyData.totalArea.toFixed(1)} m²`, color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { label: 'Floor Area', value: `${safePropertyData.floorArea} m²`, color: 'bg-green-50 text-green-700 border-green-200' },
    { label: 'Land Area', value: `${safePropertyData.landArea} m²`, color: 'bg-orange-50 text-orange-700 border-orange-200' }
  ]

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Home className="h-5 w-5 text-blue-600" />
          Property Specifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Specifications */}
        <div className="space-y-3">
          {specifications.map((spec, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {spec.icon}
                <span className="font-medium text-gray-700">{spec.label}</span>
              </div>
              <Badge variant="outline" className="bg-white">{spec.value}</Badge>
            </div>
          ))}
        </div>

        {/* Area Information */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800">Area Breakdown</h4>
          <div className="space-y-2">
            {areas.map((area, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">{area.label}</span>
                <Badge variant="outline" className={area.color}>{area.value}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Materials */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800">Primary Materials</h4>
          <div className="space-y-3">
            {/* Flooring Type */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Layers className="h-4 w-4 text-amber-600" />
                <span className="font-medium text-gray-700">Flooring Type</span>
              </div>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 capitalize">
                {safePropertyData.primaryFlooringType}
              </Badge>
            </div>

            {/* Wall Material */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Home className="h-4 w-4 text-stone-600" />
                <span className="font-medium text-gray-700">Wall Material</span>
              </div>
              <Badge variant="outline" className="bg-stone-50 text-stone-700 border-stone-200 capitalize">
                {safePropertyData.primaryWallType}
              </Badge>
            </div>

            {/* Internal Wall Color */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Palette className="h-4 w-4 text-pink-600" />
                <span className="font-medium text-gray-700">Internal Wall Colour</span>
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: safePropertyData.primaryInternalColor }}
                />
                <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200 font-mono">
                  {safePropertyData.primaryInternalColor}
                </Badge>
              </div>
            </div>

            {/* Ceiling Type */}
            <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Layers className="h-4 w-4 text-indigo-600 mt-0.5" />
                <span className="font-medium text-gray-700">Ceiling Type</span>
              </div>
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 text-right max-w-[200px] whitespace-normal leading-relaxed capitalize">
                {safePropertyData.primaryCeilingType}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
