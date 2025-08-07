'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { type PropertyData } from '@/lib/data-parser'
import { Home, Layers, Hammer } from 'lucide-react'

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
      value: `Living/Dining = 3.3m, Other Rooms: ${safePropertyData.ceilingHeight.toFixed(9)}m`
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
      </CardContent>
    </Card>
  )
}
