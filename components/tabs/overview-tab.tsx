"use client"

import { PropertyData } from "@/lib/data-parser"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EnergyEfficiency } from "@/components/modules/energy-efficiency"
import { PropertySpecifications } from "@/components/modules/property-specifications"
import { PropertyCondition } from "@/components/modules/property-condition"
import { FlooringMaterials } from "@/components/modules/flooring-materials"
import { ScanInformation } from "@/components/modules/scan-information"
import { PropertyInventory } from "@/components/modules/property-inventory"
import { VirtualTour } from "@/components/modules/virtual-tour"
import { LocationDetails } from "@/components/modules/location-details"

interface OverviewTabProps {
  propertyData: PropertyData | null
}

export function OverviewTab({ propertyData }: OverviewTabProps) {
  if (!propertyData) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Property Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy Efficiency */}
        <EnergyEfficiency propertyData={propertyData} />

        {/* Property Specifications */}
        <PropertySpecifications propertyData={propertyData} />

        {/* Property Condition */}
        <PropertyCondition propertyData={propertyData} />

        {/* Flooring Materials */}
        <FlooringMaterials propertyData={propertyData} />

        {/* Scan Information */}
        <ScanInformation propertyData={propertyData} />

        {/* Property Inventory */}
        <PropertyInventory propertyData={propertyData} />

        {/* Virtual Tour Analytics */}
        <VirtualTour propertyData={propertyData} />

        {/* Location Details */}
        <LocationDetails propertyData={propertyData} />
      </div>
    </div>
  )
}
