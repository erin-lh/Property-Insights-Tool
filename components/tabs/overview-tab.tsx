'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PropertyInventory } from '@/components/modules/property-inventory'
import { PropertyCondition } from '@/components/modules/property-condition'
import { PropertySpecifications } from '@/components/modules/property-specifications'
import { EnergyEfficiency } from '@/components/modules/energy-efficiency'
import { LocationDetails } from '@/components/modules/location-details'
import { ScanInformation } from '@/components/modules/scan-information'

export function OverviewTab({ propertyData }) {
  return (
    <div className="space-y-6">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <PropertyInventory data={propertyData.inventory} />
          <PropertyCondition propertyData={propertyData} />
          <EnergyEfficiency propertyData={propertyData} />
        </div>
        <div className="space-y-6">
          <PropertySpecifications propertyData={propertyData} />
          <LocationDetails propertyData={propertyData} />
          <ScanInformation propertyData={propertyData} />
        </div>
      </div>
    </div>
  )
}
