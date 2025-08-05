"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PropertyData } from "@/lib/data-parser"
import { MapPin, Navigation, Hash } from "lucide-react"

interface LocationDetailsProps {
  propertyData: PropertyData
}

export function LocationDetails({ propertyData }: LocationDetailsProps) {
  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-red-600" />
          Location Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Address Components */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Street Number</div>
            <div className="font-medium text-gray-900">{propertyData.streetNo}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Street Name</div>
            <div className="font-medium text-gray-900">{propertyData.streetName}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Street Type</div>
            <div className="font-medium text-gray-900">{propertyData.streetType}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Locality</div>
            <div className="font-medium text-gray-900">{propertyData.locality}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500">State</div>
            <div className="font-medium text-gray-900">{propertyData.state}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Postcode</div>
            <div className="font-medium text-gray-900">{propertyData.postcode}</div>
          </div>
        </div>

        {/* Coordinates */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Navigation className="h-4 w-4 text-gray-600" />
            Geographic Coordinates
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Latitude</span>
              <span className="text-sm text-gray-600">{propertyData.latitude.toFixed(6)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Longitude</span>
              <span className="text-sm text-gray-600">{propertyData.longitude.toFixed(6)}</span>
            </div>
          </div>
        </div>

        {/* Geographic Identifiers */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Hash className="h-4 w-4 text-gray-600" />
            Geographic Identifiers
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">GNAF ID</span>
              <span className="text-sm text-gray-600 font-mono">{propertyData.gnafId}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Meshblock</span>
              <span className="text-sm text-gray-600 font-mono">{propertyData.meshblock}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">SA1 ID</span>
              <span className="text-sm text-gray-600 font-mono">{propertyData.sa1Id}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">SA2 ID</span>
              <span className="text-sm text-gray-600 font-mono">{propertyData.sa2Id}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
