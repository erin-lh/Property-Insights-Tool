"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, BarChart3, Home, Wrench, Palette, CheckCircle, AlertTriangle, XCircle } from "lucide-react"
import Link from "next/link"

export function RoomInsightsTab() {
  const [selectedRooms, setSelectedRooms] = useState<string[]>([])

  const propertyData = {
    rooms: [
      {
        id: "1",
        name: "Room 1: Hallway",
        area: "8.2 m²",
        volume: "20.5 m³",
        condition: "Good",
        temperature: "22°C",
        humidity: "45%",
        specifications: {
          floorArea: "8.2 m²",
          ceilingHeight: "2.5 m",
          wallArea: "41.0 m²",
          windowArea: "2.1 m²",
          doorArea: "3.5 m²",
        },
        materials: {
          flooring: "Timber",
          walls: "Plasterboard",
          ceiling: "Plasterboard",
          windows: "Aluminium Frame",
          doors: "Timber",
        },
        features: [
          { name: "Natural Light", status: "good", icon: "sun" },
          { name: "Ventilation", status: "adequate", icon: "wind" },
          { name: "Electrical Outlets", status: "sufficient", icon: "zap" },
          { name: "Storage", status: "limited", icon: "archive" },
        ],
      },
      {
        id: "2",
        name: "Room 2: Living Room/Kitchen",
        area: "45.8 m²",
        volume: "114.5 m³",
        condition: "Excellent",
        temperature: "21°C",
        humidity: "42%",
        specifications: {
          floorArea: "45.8 m²",
          ceilingHeight: "2.5 m",
          wallArea: "91.6 m²",
          windowArea: "12.3 m²",
          doorArea: "7.0 m²",
        },
        materials: {
          flooring: "Timber",
          walls: "Plasterboard",
          ceiling: "Plasterboard",
          windows: "Aluminium Frame",
          doors: "Timber",
        },
        features: [
          { name: "Natural Light", status: "excellent", icon: "sun" },
          { name: "Ventilation", status: "good", icon: "wind" },
          { name: "Kitchen Appliances", status: "modern", icon: "chef-hat" },
          { name: "Storage", status: "ample", icon: "archive" },
        ],
      },
      {
        id: "3",
        name: "Room 3: Bathroom",
        area: "6.1 m²",
        volume: "15.3 m³",
        condition: "Good",
        temperature: "23°C",
        humidity: "55%",
        specifications: {
          floorArea: "6.1 m²",
          ceilingHeight: "2.5 m",
          wallArea: "30.5 m²",
          windowArea: "0.8 m²",
          doorArea: "1.8 m²",
        },
        materials: {
          flooring: "Ceramic Tiles",
          walls: "Ceramic Tiles",
          ceiling: "Plasterboard",
          windows: "Aluminium Frame",
          doors: "Timber",
        },
        features: [
          { name: "Ventilation Fan", status: "installed", icon: "fan" },
          { name: "Waterproofing", status: "good", icon: "shield" },
          { name: "Fixtures", status: "modern", icon: "wrench" },
          { name: "Storage", status: "adequate", icon: "archive" },
        ],
      },
      {
        id: "4",
        name: "Room 4: Bedroom",
        area: "12.4 m²",
        volume: "31.0 m³",
        condition: "Good",
        temperature: "20°C",
        humidity: "40%",
        specifications: {
          floorArea: "12.4 m²",
          ceilingHeight: "2.5 m",
          wallArea: "62.0 m²",
          windowArea: "3.2 m²",
          doorArea: "1.8 m²",
        },
        materials: {
          flooring: "Carpet",
          walls: "Plasterboard",
          ceiling: "Plasterboard",
          windows: "Aluminium Frame",
          doors: "Timber",
        },
        features: [
          { name: "Natural Light", status: "good", icon: "sun" },
          { name: "Ventilation", status: "adequate", icon: "wind" },
          { name: "Built-in Wardrobe", status: "present", icon: "archive" },
          { name: "Electrical Outlets", status: "sufficient", icon: "zap" },
        ],
      },
    ],
  }

  // Additional rooms data
  const additionalRooms = [
    {
      id: "5",
      name: "Room 5: Patio",
      area: "X m²",
      volume: "X m³",
      condition: "X",
      temperature: "X°C",
      humidity: "X%",
      specifications: {
        floorArea: "X m²",
        ceilingHeight: "X m",
        wallArea: "X m²",
        windowArea: "X m²",
        doorArea: "X m²",
      },
      materials: {
        flooring: "Concrete",
        walls: "Brick",
        ceiling: "Open",
        windows: "None",
        doors: "Glass Sliding",
      },
      features: [
        { name: "Outdoor Space", status: "available", icon: "sun" },
        { name: "Weather Protection", status: "partial", icon: "umbrella" },
        { name: "Drainage", status: "adequate", icon: "droplets" },
        { name: "Privacy", status: "good", icon: "shield" },
      ],
    },
    {
      id: "6",
      name: "Room 6: Living room",
      area: "X m²",
      volume: "X m³",
      condition: "X",
      temperature: "X°C",
      humidity: "X%",
      specifications: {
        floorArea: "X m²",
        ceilingHeight: "X m",
        wallArea: "X m²",
        windowArea: "X m²",
        doorArea: "X m²",
      },
      materials: {
        flooring: "Timber",
        walls: "Plasterboard",
        ceiling: "Plasterboard",
        windows: "Aluminium Frame",
        doors: "Timber",
      },
      features: [
        { name: "Natural Light", status: "good", icon: "sun" },
        { name: "Ventilation", status: "adequate", icon: "wind" },
        { name: "Electrical Outlets", status: "sufficient", icon: "zap" },
        { name: "Storage", status: "limited", icon: "archive" },
      ],
    },
    {
      id: "7",
      name: "Room 7: Hallway",
      area: "X m²",
      volume: "X m³",
      condition: "X",
      temperature: "X°C",
      humidity: "X%",
      specifications: {
        floorArea: "X m²",
        ceilingHeight: "X m",
        wallArea: "X m²",
        windowArea: "X m²",
        doorArea: "X m²",
      },
      materials: {
        flooring: "Timber",
        walls: "Plasterboard",
        ceiling: "Plasterboard",
        windows: "Aluminium Frame",
        doors: "Timber",
      },
      features: [
        { name: "Natural Light", status: "limited", icon: "sun" },
        { name: "Ventilation", status: "adequate", icon: "wind" },
        { name: "Electrical Outlets", status: "sufficient", icon: "zap" },
        { name: "Storage", status: "none", icon: "archive" },
      ],
    },
    {
      id: "8",
      name: "Room 8: Living room/ Kitchen",
      area: "X m²",
      volume: "X m³",
      condition: "X",
      temperature: "X°C",
      humidity: "X%",
      specifications: {
        floorArea: "X m²",
        ceilingHeight: "X m",
        wallArea: "X m²",
        windowArea: "X m²",
        doorArea: "X m²",
      },
      materials: {
        flooring: "Timber",
        walls: "Plasterboard",
        ceiling: "Plasterboard",
        windows: "Aluminium Frame",
        doors: "Timber",
      },
      features: [
        { name: "Natural Light", status: "excellent", icon: "sun" },
        { name: "Ventilation", status: "good", icon: "wind" },
        { name: "Kitchen Appliances", status: "modern", icon: "chef-hat" },
        { name: "Storage", status: "ample", icon: "archive" },
      ],
    },
    {
      id: "9",
      name: "Room 9: Bathroom",
      area: "X m²",
      volume: "X m³",
      condition: "X",
      temperature: "X°C",
      humidity: "X%",
      specifications: {
        floorArea: "X m²",
        ceilingHeight: "X m",
        wallArea: "X m²",
        windowArea: "X m²",
        doorArea: "X m²",
      },
      materials: {
        flooring: "Ceramic Tiles",
        walls: "Ceramic Tiles",
        ceiling: "Plasterboard",
        windows: "Aluminium Frame",
        doors: "Timber",
      },
      features: [
        { name: "Ventilation Fan", status: "installed", icon: "fan" },
        { name: "Waterproofing", status: "good", icon: "shield" },
        { name: "Fixtures", status: "modern", icon: "wrench" },
        { name: "Storage", status: "adequate", icon: "archive" },
      ],
    },
    {
      id: "10",
      name: "Room 10: Hallway",
      area: "X m²",
      volume: "X m³",
      condition: "X",
      temperature: "X°C",
      humidity: "X%",
      specifications: {
        floorArea: "X m²",
        ceilingHeight: "X m",
        wallArea: "X m²",
        windowArea: "X m²",
        doorArea: "X m²",
      },
      materials: {
        flooring: "Timber",
        walls: "Plasterboard",
        ceiling: "Plasterboard",
        windows: "Aluminium Frame",
        doors: "Timber",
      },
      features: [
        { name: "Natural Light", status: "limited", icon: "sun" },
        { name: "Ventilation", status: "adequate", icon: "wind" },
        { name: "Electrical Outlets", status: "sufficient", icon: "zap" },
        { name: "Storage", status: "none", icon: "archive" },
      ],
    },
    {
      id: "11",
      name: "Room 11: Bathroom",
      area: "X m²",
      volume: "X m³",
      condition: "X",
      temperature: "X°C",
      humidity: "X%",
      specifications: {
        floorArea: "X m²",
        ceilingHeight: "X m",
        wallArea: "X m²",
        windowArea: "X m²",
        doorArea: "X m²",
      },
      materials: {
        flooring: "Ceramic Tiles",
        walls: "Ceramic Tiles",
        ceiling: "Plasterboard",
        windows: "Aluminium Frame",
        doors: "Timber",
      },
      features: [
        { name: "Ventilation Fan", status: "installed", icon: "fan" },
        { name: "Waterproofing", status: "good", icon: "shield" },
        { name: "Fixtures", status: "modern", icon: "wrench" },
        { name: "Storage", status: "adequate", icon: "archive" },
      ],
    },
    {
      id: "12",
      name: "Room 12: Bedroom",
      area: "X m²",
      volume: "X m³",
      condition: "X",
      temperature: "X°C",
      humidity: "X%",
      specifications: {
        floorArea: "X m²",
        ceilingHeight: "X m",
        wallArea: "X m²",
        windowArea: "X m²",
        doorArea: "X m²",
      },
      materials: {
        flooring: "Carpet",
        walls: "Plasterboard",
        ceiling: "Plasterboard",
        windows: "Aluminium Frame",
        doors: "Timber",
      },
      features: [
        { name: "Natural Light", status: "good", icon: "sun" },
        { name: "Ventilation", status: "adequate", icon: "wind" },
        { name: "Built-in Wardrobe", status: "present", icon: "archive" },
        { name: "Electrical Outlets", status: "sufficient", icon: "zap" },
      ],
    },
    {
      id: "13",
      name: "Room 13: Patio",
      area: "X m²",
      volume: "X m³",
      condition: "X",
      temperature: "X°C",
      humidity: "X%",
      specifications: {
        floorArea: "X m²",
        ceilingHeight: "X m",
        wallArea: "X m²",
        windowArea: "X m²",
        doorArea: "X m²",
      },
      materials: {
        flooring: "Concrete",
        walls: "Brick",
        ceiling: "Open",
        windows: "None",
        doors: "Glass Sliding",
      },
      features: [
        { name: "Outdoor Space", status: "available", icon: "sun" },
        { name: "Weather Protection", status: "partial", icon: "umbrella" },
        { name: "Drainage", status: "adequate", icon: "droplets" },
        { name: "Privacy", status: "good", icon: "shield" },
      ],
    },
    {
      id: "14",
      name: "Room 14: Bedroom",
      area: "X m²",
      volume: "X m³",
      condition: "X",
      temperature: "X°C",
      humidity: "X%",
      specifications: {
        floorArea: "X m²",
        ceilingHeight: "X m",
        wallArea: "X m²",
        windowArea: "X m²",
        doorArea: "X m²",
      },
      materials: {
        flooring: "Carpet",
        walls: "Plasterboard",
        ceiling: "Plasterboard",
        windows: "Aluminium Frame",
        doors: "Timber",
      },
      features: [
        { name: "Natural Light", status: "good", icon: "sun" },
        { name: "Ventilation", status: "adequate", icon: "wind" },
        { name: "Built-in Wardrobe", status: "present", icon: "archive" },
        { name: "Electrical Outlets", status: "sufficient", icon: "zap" },
      ],
    },
  ]

  // Combine original rooms with additional rooms
  const allRooms = [...propertyData.rooms, ...additionalRooms]

  const handleRoomSelection = (roomId: string, checked: boolean) => {
    if (checked) {
      setSelectedRooms([...selectedRooms, roomId])
    } else {
      setSelectedRooms(selectedRooms.filter((id) => id !== roomId))
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "excellent":
      case "good":
      case "modern":
      case "installed":
      case "present":
      case "available":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "adequate":
      case "sufficient":
      case "partial":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "limited":
      case "none":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Room Comparison Section */}
      {selectedRooms.length > 1 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">{selectedRooms.length} rooms selected for comparison</span>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Compare Rooms
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allRooms.map((room) => (
          <Card key={room.id} className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedRooms.includes(room.id)}
                    onCheckedChange={(checked) => handleRoomSelection(room.id, checked as boolean)}
                  />
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-800">{room.name}</CardTitle>
                  </div>
                </div>
                <Link href={`/room/${room.id}`}>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-800">{room.area}</div>
                  <div className="text-xs text-gray-600">Floor Area</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-800">{room.volume}</div>
                  <div className="text-xs text-gray-600">Volume</div>
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  Specifications
                </h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Ceiling Height:</span>
                    <span>{room.specifications.ceilingHeight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wall Area:</span>
                    <span>{room.specifications.wallArea}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Window Area:</span>
                    <span>{room.specifications.windowArea}</span>
                  </div>
                </div>
              </div>

              {/* Materials & Features */}
              <div>
                <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-1">
                  <Palette className="h-4 w-4" />
                  Materials & Features
                </h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Flooring:</span>
                    <span>{room.materials.flooring}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Walls:</span>
                    <span>{room.materials.walls}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Windows:</span>
                    <span>{room.materials.windows}</span>
                  </div>
                </div>
              </div>

              {/* Installed Features */}
              <div>
                <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-1">
                  <Wrench className="h-4 w-4" />
                  Installed Features
                </h4>
                <div className="grid grid-cols-2 gap-1">
                  {room.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-1 text-xs">
                      {getStatusIcon(feature.status)}
                      <span className="text-gray-700 truncate">{feature.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* View Details Button */}
              <Link href={`/room/${room.id}`}>
                <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
