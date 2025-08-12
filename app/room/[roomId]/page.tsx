"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Camera, Eye, Ruler, Home, Package, Lightbulb, Wind, Shield } from "lucide-react"
import Link from "next/link"

// Mock room data - in a real app this would come from your data source
const roomsData = {
  "1": {
    id: "1",
    name: "Room 1: Hallway",
    type: "hallway",
    area: "X",
    height: "X",
    width: "X",
    depth: "X",
    volume: "X",
    windows: "X",
    panoramaCount: "X",
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    panoramaLinks: [],
    condition: "Good",
  },
  "5": {
    id: "5",
    name: "Room 5: Patio",
    type: "patio",
    area: "X",
    height: "X",
    width: "X",
    depth: "X",
    volume: "X",
    windows: "X",
    panoramaCount: "X",
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    panoramaLinks: [],
    condition: "Good",
  },
  "6": {
    id: "6",
    name: "Room 6: Living room",
    type: "living room",
    area: "X",
    height: "X",
    width: "X",
    depth: "X",
    volume: "X",
    windows: "X",
    panoramaCount: "X",
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    panoramaLinks: [],
    condition: "Good",
  },
  "7": {
    id: "7",
    name: "Room 7: Hallway",
    type: "hallway",
    area: "X",
    height: "X",
    width: "X",
    depth: "X",
    volume: "X",
    windows: "X",
    panoramaCount: "X",
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    panoramaLinks: [],
    condition: "Good",
  },
  "8": {
    id: "8",
    name: "Room 8: Living room/ Kitchen",
    type: "living room/ kitchen",
    area: "X",
    height: "X",
    width: "X",
    depth: "X",
    volume: "X",
    windows: "X",
    panoramaCount: "X",
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    panoramaLinks: [],
    condition: "Good",
  },
  "9": {
    id: "9",
    name: "Room 9: Bathroom",
    type: "bathroom",
    area: "X",
    height: "X",
    width: "X",
    depth: "X",
    volume: "X",
    windows: "X",
    panoramaCount: "X",
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    panoramaLinks: [],
    condition: "Good",
  },
  "10": {
    id: "10",
    name: "Room 10: Hallway",
    type: "hallway",
    area: "X",
    height: "X",
    width: "X",
    depth: "X",
    volume: "X",
    windows: "X",
    panoramaCount: "X",
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    panoramaLinks: [],
    condition: "Good",
  },
  "11": {
    id: "11",
    name: "Room 11: Bathroom",
    type: "bathroom",
    area: "X",
    height: "X",
    width: "X",
    depth: "X",
    volume: "X",
    windows: "X",
    panoramaCount: "X",
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    panoramaLinks: [],
    condition: "Good",
  },
  "12": {
    id: "12",
    name: "Room 12: Bedroom",
    type: "bedroom",
    area: "X",
    height: "X",
    width: "X",
    depth: "X",
    volume: "X",
    windows: "X",
    panoramaCount: "X",
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    panoramaLinks: [],
    condition: "Good",
  },
  "13": {
    id: "13",
    name: "Room 13: Patio",
    type: "patio",
    area: "X",
    height: "X",
    width: "X",
    depth: "X",
    volume: "X",
    windows: "X",
    panoramaCount: "X",
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    panoramaLinks: [],
    condition: "Good",
  },
  "14": {
    id: "14",
    name: "Room 14: Bedroom",
    type: "bedroom",
    area: "X",
    height: "X",
    width: "X",
    depth: "X",
    volume: "X",
    windows: "X",
    panoramaCount: "X",
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    panoramaLinks: [],
    condition: "Good",
  },
}

export default function RoomDetailPage() {
  const params = useParams()
  const roomId = params.roomId as string
  const room = roomsData[roomId as keyof typeof roomsData]

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-sm border-0 rounded-2xl">
            <CardContent className="p-12 text-center">
              <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Room Not Found</h3>
              <p className="text-gray-600 mb-4">The requested room could not be found.</p>
              <Link href="/">
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Property Overview
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Property
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{room.name}</h1>
              <p className="text-gray-600">Detailed room analysis and specifications</p>
            </div>
          </div>
        </div>

        {/* Room Image */}
        <Card className="bg-white shadow-sm border-0 rounded-2xl">
          <CardContent className="p-6">
            <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100 mb-4">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">{room.name} Image</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button size="sm" variant="outline">
                <Camera className="h-4 w-4 mr-2" />
                360° View
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Room Details */}
        <Card className="bg-white shadow-sm border-0 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Room Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <Ruler className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-700">{room.area}</p>
                    <p className="text-sm text-blue-600">Area (sqm)</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <Home className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-700">{room.height}</p>
                    <p className="text-sm text-green-600">Height (m)</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <Eye className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-700">{room.windows}</p>
                    <p className="text-sm text-purple-600">Windows</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <Camera className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-orange-700">{room.panoramaCount}</p>
                    <p className="text-sm text-orange-600">360° Views</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Room Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Type:</span>
                        <Badge variant="outline">{room.type}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Condition:</span>
                        <Badge variant="default">{room.condition}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Area:</span>
                        <span className="text-sm">{room.area} sqm</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-3xl font-bold text-gray-800">{room.area}</div>
                        <div className="text-sm text-gray-600">Total Area (sqm)</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="specifications" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">Floor Area:</span>
                    <p className="text-lg font-semibold">{room.area} sqm</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">Width:</span>
                    <p className="text-lg font-semibold">{room.width}m</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">Depth:</span>
                    <p className="text-lg font-semibold">{room.depth}m</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">Height:</span>
                    <p className="text-lg font-semibold">{room.height}m</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">Volume:</span>
                    <p className="text-lg font-semibold">{room.volume} m³</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">Windows:</span>
                    <p className="text-lg font-semibold">{room.windows}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="materials" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Flooring</span>
                    </div>
                    <span className="text-gray-700 capitalize">{room.flooring}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Home className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Wall Material</span>
                    </div>
                    <span className="text-gray-700 capitalize">{room.wallMaterial}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Ruler className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Ceiling Type</span>
                    </div>
                    <span className="text-gray-700 capitalize">{room.ceilingType}</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium">{room.ceilingLights}</p>
                      <p className="text-sm text-gray-500">Ceiling Lights</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Wind className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium">{room.airConditioning ? "Yes" : "No"}</p>
                      <p className="text-sm text-gray-500">Air Conditioning</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Shield className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium">{room.smokeAlarm ? "Yes" : "No"}</p>
                      <p className="text-sm text-gray-500">Smoke Alarm</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Wind className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium">{room.ceilingFan ? "Yes" : "No"}</p>
                      <p className="text-sm text-gray-500">Ceiling Fan</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
