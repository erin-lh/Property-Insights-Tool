"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PropertyData } from "@/lib/data-parser"
import { Home, Layers, Hammer } from "lucide-react"

interface PropertySpecificationsProps {
  propertyData: PropertyData
}

export function PropertySpecifications({ propertyData }: PropertySpecificationsProps) {
  // Provide fallback values to prevent undefined errors
  const safePropertyData = {
    primaryFlooringType: propertyData?.primaryFlooringType || "Hardwood",
    primaryWallType: propertyData?.primaryWallType || "Plaster",
    primaryInternalColor: propertyData?.primaryInternalColor || "#FFFFFF",
    primaryCeilingType: propertyData?.primaryCeilingType || "Plasterboard with decorative cornice",
    bedrooms: propertyData?.bedrooms || 3,
    bathrooms: propertyData?.bathrooms || 3,
    carSpaces: propertyData?.carSpaces || 1,
    floors: propertyData?.floors || 2,
    buildYear: propertyData?.buildYear || "Unknown",
    propertyType: propertyData?.propertyType || "HOUSE",
    totalArea: propertyData?.totalArea || 142.6283016,
    floorArea: propertyData?.floorArea || 115,
    landArea: propertyData?.landArea || 255,
    ceilingHeight: propertyData?.ceilingHeight || 2.415555451,
    ...propertyData,
  }

  const specifications = [
    {
      icon: <Home className="h-4 w-4 text-blue-600" />,
      label: "Property Type",
      value: "House",
    },
    {
      icon: <Home className="h-4 w-4 text-green-600" />,
      label: "Build Year",
      value: safePropertyData.buildYear,
    },
    {
      icon: <Layers className="h-4 w-4 text-purple-600" />,
      label: "Floors",
      value: safePropertyData.floors.toString(),
    },
    {
      icon: <Hammer className="h-4 w-4 text-orange-600" />,
      label: "Ceiling Height",
      value: "2.42m",
    },
  ]

  const areas = [
    { label: "Floor Area", value: "142.63 m²", color: "bg-green-50 text-green-700 border-green-200" },
    { label: "Bed Area", value: "17.67 m²", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { label: "Bath Area", value: "13.32 m²", color: "bg-purple-50 text-purple-700 border-purple-200" },
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
              <Badge variant="outline" className="bg-white">
                {spec.value}
              </Badge>
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
                <Badge variant="outline" className={area.color}>
                  {area.value}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Property Inventory */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800 flex items-center gap-2">
            <Home className="h-4 w-4 text-blue-600" />
            Property Inventory
          </h4>

          {/* Room Count */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">{safePropertyData.bedrooms}</div>
              <div className="text-sm text-muted-foreground">Bedrooms</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">{safePropertyData.bathrooms}</div>
              <div className="text-sm text-muted-foreground">Bathrooms</div>
            </div>
          </div>

          {/* Carpark */}
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">{safePropertyData.carSpaces}</div>
              <div className="text-sm text-muted-foreground">Carpark</div>
            </div>
          </div>

          {/* Primary Materials */}
          <div className="space-y-3">
            <h5 className="font-medium text-gray-700">Primary Materials</h5>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Flooring Type</span>
                <Badge variant="outline" className="bg-white">
                  {safePropertyData.primaryFlooringType}
                </Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Wall Material</span>
                <Badge variant="outline" className="bg-white">
                  {safePropertyData.primaryWallType}
                </Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Internal Wall Colour</span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded border border-gray-300"
                    style={{ backgroundColor: safePropertyData.primaryInternalColor }}
                  ></div>
                  <Badge variant="outline" className="bg-white">
                    {safePropertyData.primaryInternalColor}
                  </Badge>
                </div>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Ceiling Type</span>
                <Badge variant="outline" className="bg-white">
                  {safePropertyData.primaryCeilingType}
                </Badge>
              </div>
            </div>
          </div>

          {/* Safety Features */}
          <div className="space-y-3">
            <h5 className="font-medium text-gray-700">Safety Features</h5>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="text-sm">Smoke Alarms</span>
              <Badge variant="outline" className="bg-white">
                6
              </Badge>
            </div>
          </div>

          {/* Material Analysis */}
          <div className="space-y-3">
            <h5 className="font-medium text-gray-700">Material Analysis</h5>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Hardwood Area</span>
                <Badge variant="outline" className="bg-white">
                  49 sqm
                </Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Tile Area</span>
                <Badge variant="outline" className="bg-white">
                  36 sqm
                </Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Carpet Area</span>
                <Badge variant="outline" className="bg-white">
                  39 sqm
                </Badge>
              </div>
            </div>
          </div>

          {/* Features & Fixtures */}
          <div className="space-y-3">
            <h5 className="font-medium text-gray-700">Features & Fixtures</h5>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Air Conditioning Units</span>
                <Badge variant="outline" className="bg-white">
                  3
                </Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Ceiling Lights</span>
                <Badge variant="outline" className="bg-white">
                  15
                </Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Doors</span>
                <Badge variant="outline" className="bg-white">
                  20
                </Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Windows</span>
                <Badge variant="outline" className="bg-white">
                  12
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
