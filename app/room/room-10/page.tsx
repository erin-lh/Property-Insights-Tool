"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Ruler, Thermometer, Zap, Droplets, Wind, Sun, Shield, Navigation } from "lucide-react"
import Link from "next/link"

export default function Room10Detail() {
  const [activeTab, setActiveTab] = useState("overview")

  const roomData = {
    id: "room-10",
    name: "Hallway",
    type: "Circulation Space",
    area: "X sqm",
    volume: "X m³",
    condition: "Good",
    lastUpdated: "2024-01-15",
    temperature: "X°C",
    humidity: "X%",
    lightLevel: "X lux",
    airQuality: "Good",
    specifications: {
      dimensions: {
        length: "X m",
        width: "X m",
        height: "X m",
      },
      flooring: {
        material: "Hardwood",
        condition: "Good",
        area: "X sqm",
      },
      walls: {
        material: "Plasterboard",
        condition: "Good",
        area: "X sqm",
      },
      ceiling: {
        material: "Plasterboard",
        condition: "Good",
        height: "X m",
      },
    },
    materials: [
      { name: "Hardwood Flooring", condition: "Good", area: "X sqm", value: "$X" },
      { name: "Plasterboard Walls", condition: "Good", area: "X sqm", value: "$X" },
      { name: "Ceiling", condition: "Good", area: "X sqm", value: "$X" },
      { name: "Light Fixtures", condition: "Good", quantity: "X", value: "$X" },
    ],
    features: [
      { name: "Artificial Lighting", status: "Good", icon: Sun },
      { name: "Ventilation", status: "Adequate", icon: Wind },
      { name: "Access Routes", status: "Clear", icon: Navigation },
      { name: "Storage", status: "Limited", icon: Shield },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Card className="bg-white shadow-sm border-0 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Link href="/">
                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                      <ArrowLeft className="h-4 w-4" />
                      Back to Property
                    </Button>
                  </Link>
                  <div className="h-8 w-px bg-gray-200" />
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">{roomData.name}</h1>
                    <p className="text-sm text-gray-500">{roomData.type}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {roomData.condition}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900">{roomData.area}</div>
                  <div className="text-xs text-gray-500">Area</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900">{roomData.volume}</div>
                  <div className="text-xs text-gray-500">Volume</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900">{roomData.temperature}</div>
                  <div className="text-xs text-gray-500">Temperature</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900">{roomData.humidity}</div>
                  <div className="text-xs text-gray-500">Humidity</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-8">
            <Card className="bg-white shadow-sm border-0 rounded-2xl">
              <CardContent className="p-2">
                <TabsList className="grid w-full grid-cols-4 bg-transparent gap-1">
                  <TabsTrigger
                    value="overview"
                    className="flex items-center gap-2 data-[state=active]:bg-gray-100 rounded-xl py-3"
                  >
                    <Home className="h-4 w-4" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="specifications"
                    className="flex items-center gap-2 data-[state=active]:bg-gray-100 rounded-xl py-3"
                  >
                    <Ruler className="h-4 w-4" />
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="materials"
                    className="flex items-center gap-2 data-[state=active]:bg-gray-100 rounded-xl py-3"
                  >
                    <Shield className="h-4 w-4" />
                    Materials
                  </TabsTrigger>
                  <TabsTrigger
                    value="features"
                    className="flex items-center gap-2 data-[state=active]:bg-gray-100 rounded-xl py-3"
                  >
                    <Zap className="h-4 w-4" />
                    Features
                  </TabsTrigger>
                </TabsList>
              </CardContent>
            </Card>
          </div>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-sm border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Room Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Room Type</div>
                      <div className="font-medium">{roomData.type}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Condition</div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {roomData.condition}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Area</div>
                      <div className="font-medium">{roomData.area}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Volume</div>
                      <div className="font-medium">{roomData.volume}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Environmental Conditions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Thermometer className="h-5 w-5 text-red-500" />
                      <div>
                        <div className="text-sm text-gray-500">Temperature</div>
                        <div className="font-medium">{roomData.temperature}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Droplets className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="text-sm text-gray-500">Humidity</div>
                        <div className="font-medium">{roomData.humidity}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sun className="h-5 w-5 text-yellow-500" />
                      <div>
                        <div className="text-sm text-gray-500">Light Level</div>
                        <div className="font-medium">{roomData.lightLevel}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Wind className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="text-sm text-gray-500">Air Quality</div>
                        <div className="font-medium">{roomData.airQuality}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="specifications">
            <Card className="bg-white shadow-sm border-0 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Room Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Dimensions</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Length</span>
                        <span className="text-sm font-medium">{roomData.specifications.dimensions.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Width</span>
                        <span className="text-sm font-medium">{roomData.specifications.dimensions.width}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Height</span>
                        <span className="text-sm font-medium">{roomData.specifications.dimensions.height}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Flooring</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Material</span>
                        <span className="text-sm font-medium">{roomData.specifications.flooring.material}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Condition</span>
                        <span className="text-sm font-medium">{roomData.specifications.flooring.condition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Area</span>
                        <span className="text-sm font-medium">{roomData.specifications.flooring.area}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Walls</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Material</span>
                        <span className="text-sm font-medium">{roomData.specifications.walls.material}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Condition</span>
                        <span className="text-sm font-medium">{roomData.specifications.walls.condition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Area</span>
                        <span className="text-sm font-medium">{roomData.specifications.walls.area}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials">
            <Card className="bg-white shadow-sm border-0 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Materials & Components</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roomData.materials.map((material, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{material.name}</div>
                        <div className="text-sm text-gray-500">
                          {material.area && `Area: ${material.area}`}
                          {material.quantity && `Quantity: ${material.quantity}`}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{material.value}</div>
                        <Badge variant="outline" className="text-xs">
                          {material.condition}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features">
            <Card className="bg-white shadow-sm border-0 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Room Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roomData.features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <feature.icon className="h-5 w-5 text-gray-600" />
                        <span className="font-medium text-gray-900">{feature.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {feature.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
