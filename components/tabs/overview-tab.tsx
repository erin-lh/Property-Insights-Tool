'use client'

import { PropertySpecifications } from '@/components/modules/property-specifications'
import { LocationDetails } from '@/components/modules/location-details'
import { ScanInformation } from '@/components/modules/scan-information'
import { PropertyCondition } from '@/components/modules/property-condition'
import { EnergyEfficiency } from '@/components/modules/energy-efficiency'
import { PropertyInventory } from '@/components/modules/property-inventory'
import { type PropertyData } from '@/lib/data-parser'

interface OverviewTabProps {
  propertyData: PropertyData
}

export function OverviewTab({ propertyData }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PropertySpecifications propertyData={propertyData} />
        <LocationDetails propertyData={propertyData} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScanInformation propertyData={propertyData} />
        <PropertyCondition propertyData={propertyData} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnergyEfficiency propertyData={propertyData} />
        <PropertyInventory propertyData={propertyData} />
      </div>
    </div>
  )
}
