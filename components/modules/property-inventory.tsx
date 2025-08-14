"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PropertyInventory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Inventory</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Room Count */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-muted-foreground">Bedrooms</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-muted-foreground">Bathrooms</div>
          </div>
        </div>

        {/* Carpark */}
        <div className="grid grid-cols-1 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold">1</div>
            <div className="text-sm text-muted-foreground">Carpark</div>
          </div>
        </div>

        {/* Primary Materials */}
        <div className="space-y-3">
          <h4 className="font-medium">Primary Materials</h4>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Flooring Type</span>
              <Badge variant="outline">Hardwood</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Wall Material</span>
              <Badge variant="outline">Plaster</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Internal Wall Colour</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border border-gray-300" style={{ backgroundColor: "#d2d0ca" }}></div>
                <Badge variant="outline">#d2d0ca</Badge>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Ceiling Type</span>
              <Badge variant="outline">Flat</Badge>
            </div>
          </div>
        </div>

        {/* Safety Features */}
        <div className="space-y-3">
          <h4 className="font-medium">Safety Features</h4>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Smoke Alarms</span>
              <Badge variant="outline">6</Badge>
            </div>
          </div>
        </div>

        {/* Material Analysis */}
        <div className="space-y-3">
          <h4 className="font-medium">Material Analysis</h4>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Hardwood Area</span>
              <Badge variant="outline">49 sqm</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Tile Area</span>
              <Badge variant="outline">36 sqm</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Carpet Area</span>
              <Badge variant="outline">39 sqm</Badge>
            </div>
          </div>
        </div>

        {/* Features & Fixtures */}
        <div className="space-y-3">
          <h4 className="font-medium">Features & Fixtures</h4>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Air Conditioning Units</span>
              <Badge variant="outline">3</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Ceiling Lights</span>
              <Badge variant="outline">15</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Doors</span>
              <Badge variant="outline">20</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Windows</span>
              <Badge variant="outline">12</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
