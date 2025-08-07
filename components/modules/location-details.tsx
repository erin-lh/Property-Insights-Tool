'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { type PropertyData } from '@/lib/data-parser'
import { MapPin, Globe, Navigation } from 'lucide-react'

interface LocationDetailsProps {
  propertyData: PropertyData
}

export function LocationDetails({ propertyData }: LocationDetailsProps) {
  // Create safe property data with fallbacks to prevent undefined errors
  const safePropertyData = {
    address: propertyData?.address || '3 Bellavista Terrace, PADDINGTON QLD 4064',
    locality: propertyData?.locality || 'PADDINGTON',
    state: propertyData?.state || 'QLD',
    latitude: propertyData?.latitude || -27.455381,
    longitude: propertyData?.longitude || 152.988639,
    gnafId: propertyData?.gnafId || 'GAQLD155682091',
    meshblock: propertyData?.meshblock || 'MB2130563208900',
    sa1Id: propertyData?.sa1Id || 30504113517,
    sa2Id: propertyData?.sa2Id || 305041135,
  }

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          Location Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Address */}
        <div>
          <div className="text-sm font-medium text-gray-600 mb-1">Full Address</div>
          <div className="text-gray-900">{safePropertyData.address}</div>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium text-gray-600 mb-1">Locality</div>
            <div className="text-gray-900">{safePropertyData.locality}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-600 mb-1">State</div>
            <div className="text-gray-900">{safePropertyData.state}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-600 mb-1">Postcode</div>
            <div className="text-gray-900">4064</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-600 mb-1">Climate Zone</div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Zone 2
            </Badge>
          </div>
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
              <Navigation className="h-4 w-4" />
              Latitude
            </div>
            <div className="text-gray-900 font-mono text-sm">{safePropertyData.latitude.toFixed(6)}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
              <Navigation className="h-4 w-4" />
              Longitude
            </div>
            <div className="text-gray-900 font-mono text-sm">{safePropertyData.longitude.toFixed(6)}</div>
          </div>
        </div>

        {/* Geographic Identifiers */}
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <div className="text-sm font-medium text-gray-600 flex items-center gap-1">
            <Globe className="h-4 w-4" />
            Geographic Identifiers
          </div>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">GNAF ID:</span>
              <span className="text-gray-900 font-mono">{safePropertyData.gnafId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Meshblock:</span>
              <span className="text-gray-900 font-mono">{safePropertyData.meshblock}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">SA1 ID:</span>
              <span className="text-gray-900 font-mono">{safePropertyData.sa1Id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">SA2 ID:</span>
              <span className="text-gray-900 font-mono">{safePropertyData.sa2Id}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
