'use client'

import { PropertySpecifications } from '@/components/modules/property-specifications'
import { LocationDetails } from '@/components/modules/location-details'
import { PropertyCondition } from '@/components/modules/property-condition'
import { EnergyEfficiency } from '@/components/modules/energy-efficiency'
import { type PropertyData } from '@/lib/data-parser'

interface OverviewTabProps {
  propertyData: PropertyData
}

export function OverviewTab({ propertyData }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <PropertySpecifications propertyData={propertyData} />
        <LocationDetails propertyData={propertyData} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PropertyCondition propertyData={propertyData} />
        <EnergyEfficiency propertyData={propertyData} />
      </div>
    </div>
  )
}
