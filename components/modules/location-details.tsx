"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { PropertyData } from "@/lib/data-parser"
import { MapPin, Navigation, Globe, Thermometer, ExternalLink } from 'lucide-react'

interface LocationDetailsProps {
  propertyData: PropertyData | null
}

export function LocationDetails({ propertyData }: LocationDetailsProps) {
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

  const handleViewOnMap = () => {
    const mapsUrl = `https://www.google.com/maps?q=${propertyData.latitude},${propertyData.longitude}`
    window.open(mapsUrl, '_blank')
  }

  const getClimateZoneColor = (zone: string) => {
    switch (zone.toLowerCase()) {
      case 'zone 1':
        return 'bg-red-100 text-red-800'
      case 'zone 2':
        return 'bg-orange-100 text-orange-800'
      case 'zone 3':
        return 'bg-yellow-100 text-yellow-800'
      case 'zone 4':
        return 'bg-green-100 text-green-800'
      case 'zone 5':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-red-600" />
          Location Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Address Information */}
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium text-gray-900 mb-1">Full Address</div>
            <div className="text-gray-700">{propertyData.address}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-900 mb-1">Locality</div>
              <div className="text-gray-700">{propertyData.locality}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-900 mb-1">Postcode</div>
              <div className="text-gray-700">{propertyData.postcode}</div>
            </div>
          </div>
        </div>

        {/* Geographic Coordinates */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <Navigation className="h-4 w-4 text-blue-600" />
            Coordinates
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900 mb-1">Latitude</div>
              <div className="font-mono text-blue-700">{propertyData.latitude}</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900 mb-1">Longitude</div>
              <div className="font-mono text-blue-700">{propertyData.longitude}</div>
            </div>
          </div>
        </div>

        {/* Climate Information */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-orange-600" />
            Climate Zone
          </h4>
          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
            <span className="text-orange-900 font-medium">{propertyData.climateZone}</span>
            <Badge className={getClimateZoneColor(propertyData.climateZone)}>
              Subtropical
            </Badge>
          </div>
        </div>

        {/* Geographic Identifiers */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <Globe className="h-4 w-4 text-green-600" />
            Geographic Identifiers
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">GNAF ID:</span>
              <span className="font-mono text-gray-900">{propertyData.gnafId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Meshblock:</span>
              <span className="font-mono text-gray-900">{propertyData.meshblock}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">SA1 ID:</span>
              <span className="font-mono text-gray-900">{propertyData.sa1Id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">SA2 ID:</span>
              <span className="font-mono text-gray-900">{propertyData.sa2Id}</span>
            </div>
          </div>
        </div>

        {/* View on Map Button */}
        <div className="pt-4 border-t border-gray-100">
          <Button 
            onClick={handleViewOnMap}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700"
          >
            <ExternalLink className="h-4 w-4" />
            View on Google Maps
          </Button>
        </div>

        {/* Location Insights */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-medium text-gray-900 mb-2">Location Insights</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <p>• Located in {propertyData.locality}, {propertyData.state}</p>
            <p>• {propertyData.climateZone} provides subtropical climate conditions</p>
            <p>• Precise geographic coordinates available for mapping</p>
            <p>• Comprehensive statistical area coverage for demographics</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
