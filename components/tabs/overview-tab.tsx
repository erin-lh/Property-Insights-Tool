"use client"

import { PropertySpecifications } from "@/components/modules/property-specifications"
import { LocationDetails } from "@/components/modules/location-details"
import { ScanInformation } from "@/components/modules/scan-information"
import { EnergyEfficiency } from "@/components/modules/energy-efficiency"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { PropertyData } from "@/lib/data-parser"
import { Home, Package, Thermometer, Shield, Lightbulb, DoorOpen, Maximize, Copy } from "lucide-react"

interface OverviewTabProps {
  propertyData: PropertyData
}

export function OverviewTab({ propertyData }: OverviewTabProps) {
  const virtualTourUrl =
    "https://openhouse.littlehinges.com.au/tour/3_Bellavista_Terrace-_PADDINGTON_QLD_4064-3576988532719121"

  const handleFullScreen = () => {
    window.open(virtualTourUrl, "_blank")
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(virtualTourUrl)
  }

  return (
    <div className="space-y-6">
      {/* Virtual Tour Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Virtual Tour - Embedded */}
        <Card className="bg-white shadow-sm border-0 rounded-2xl lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Virtual Tour</CardTitle>
            <p className="text-gray-600">Interactive Matterport 3D Experience</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Embedded Virtual Tour */}
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
              <iframe
                src={virtualTourUrl}
                className="w-full h-full border-0"
                allow="fullscreen; gyroscope; accelerometer"
                allowFullScreen
                title="Virtual Property Tour"
              />
            </div>

            {/* Tour Controls */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={handleCopyLink}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
              <Button className="flex-1 bg-gray-900 text-white hover:bg-gray-800" onClick={handleFullScreen}>
                <Maximize className="h-4 w-4 mr-2" />
                Open Full Screen
              </Button>
            </div>

            <p className="text-sm text-gray-500 text-center">
              Tour ID: {propertyData.matterportTourId} • {propertyData.panoramaCount} 360° Views
            </p>
          </CardContent>
        </Card>

        {/* Property Inventory */}
        <Card className="bg-white shadow-sm border-0 rounded-2xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-gray-600" />
              <CardTitle className="text-xl font-semibold text-gray-800">Property Inventory</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Air Conditioning */}
              <div className="flex items-center gap-3">
                <Thermometer className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-500">Air Conditioning</h4>
                  <p className="font-semibold text-gray-800">{propertyData.airConditioningCount} Units</p>
                  <p className="text-sm text-gray-600">{propertyData.airConditioningType}</p>
                </div>
              </div>

              {/* Ceiling Lights */}
              <div className="flex items-center gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-500">Ceiling Lights</h4>
                  <p className="font-semibold text-gray-800">{propertyData.ceilingLightCount} Fixtures</p>
                  <p className="text-sm text-gray-600">Throughout property</p>
                </div>
              </div>

              {/* Smoke Alarms */}
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-red-600" />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-500">Smoke Alarms</h4>
                  <p className="font-semibold text-gray-800">{propertyData.smokeAlarmCount} Units</p>
                  <p className="text-sm text-gray-600">Safety compliant</p>
                </div>
              </div>

              {/* Doors */}
              <div className="flex items-center gap-3">
                <DoorOpen className="h-5 w-5 text-gray-600" />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-500">Doors</h4>
                  <p className="font-semibold text-gray-800">{propertyData.doorCount} Total</p>
                  <p className="text-sm text-gray-600">Interior & exterior</p>
                </div>
              </div>

              {/* Fireplace */}
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 bg-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">🔥</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-500">Fireplace</h4>
                  <p className="font-semibold text-gray-800">{propertyData.fireplace}</p>
                  <p className="text-sm text-gray-600">Heating feature</p>
                </div>
              </div>

              {/* Material Distribution */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-500 mb-3">Material Distribution</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Hardwood</span>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      {Math.round(propertyData.hardwoodArea)} sqm
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Tile</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {Math.round(propertyData.tileArea)} sqm
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Carpet</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {Math.round(propertyData.carpetArea)} sqm
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property Details Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        <PropertySpecifications propertyData={propertyData} />
        <EnergyEfficiency propertyData={propertyData} />
      </div>

      {/* Location and Scan Information */}
      <div className="grid lg:grid-cols-2 gap-6">
        <LocationDetails propertyData={propertyData} />
        <ScanInformation propertyData={propertyData} />
      </div>

      {/* Property Description */}
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5 text-gray-600" />
            <CardTitle className="text-xl font-semibold text-gray-800">Property Description</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Overview</h4>
              <p className="text-gray-700 leading-relaxed">{propertyData.propertyDescription}</p>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h4 className="font-medium text-gray-900 mb-2">Unique Features</h4>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">{propertyData.uniqueFeatures}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
