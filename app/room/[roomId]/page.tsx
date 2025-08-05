"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type PropertyData, type RoomData, parseCSVData } from "@/lib/data-parser"
import {
  ArrowLeft,
  Home,
  Ruler,
  Camera,
  Eye,
  Lightbulb,
  Wind,
  Shield,
  Package,
  AlertTriangle,
  Download,
  Share,
  Maximize,
  Volume2,
  Square,
  Move3D,
  Thermometer,
  CheckCircle,
  XCircle,
  Info,
  Calendar,
  BarChart3,
} from "lucide-react"

export default function RoomDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null)
  const [room, setRoom] = useState<RoomData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/property-data.csv")
        const csvText = await response.text()
        const parsedData = parseCSVData(csvText)
        setPropertyData(parsedData)

        // Find the specific room
        const foundRoom = parsedData.rooms.find((r) => r.id === params.roomId)
        setRoom(foundRoom || null)
      } catch (error) {
        console.error("Error fetching room data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.roomId])

  const handleBack = () => {
    router.back()
  }

  const formatRoomType = (type: string) => {
    return type
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const getRoomIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "bedroom":
        return <Home className="h-6 w-6" />
      case "bathroom":
        return <Package className="h-6 w-6" />
      case "living room":
        return <Home className="h-6 w-6" />
      case "kitchen":
        return <Package className="h-6 w-6" />
      case "hallway":
        return <Move3D className="h-6 w-6" />
      default:
        return <Home className="h-6 w-6" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading room details...</p>
        </div>
      </div>
    )
  }

  if (!room || !propertyData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Room Not Found</h2>
          <p className="text-gray-600 mb-4">The requested room could not be found.</p>
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const hasDamage = room.floorDamage > 0 || room.ceilingDamage > 0 || room.wallDamage > 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Card className="bg-white shadow-sm border-0 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <Button variant="outline" onClick={handleBack} className="bg-transparent">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Property
                  </Button>
                  <div className="flex items-center gap-3">
                    {getRoomIcon(room.type)}
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{formatRoomType(room.type)} Details</h1>
                      <p className="text-gray-600">{propertyData.address}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              {/* Room ID and Status */}
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="font-mono text-xs">
                  ID: {room.id}
                </Badge>
                <Badge variant={hasDamage ? "destructive" : "default"} className="text-xs">
                  {hasDamage ? "Damage Detected" : "Good Condition"}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {room.panoramaCount} 360° Views
                </Badge>
                {room.confidentPoint && (
                  <Badge variant="outline" className="text-xs">
                    Confidence: {room.confidentPoint}%
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-50 border-blue-200 rounded-2xl">
            <CardContent className="p-6 text-center">
              <Square className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-700 mb-1">{room.area.toFixed(2)}</div>
              <div className="text-sm text-blue-600">Square Meters</div>
            </CardContent>
          </Card>

          {room.volume && (
            <Card className="bg-green-50 border-green-200 rounded-2xl">
              <CardContent className="p-6 text-center">
                <Volume2 className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-green-700 mb-1">{room.volume.toFixed(2)}</div>
                <div className="text-sm text-green-600">Cubic Meters</div>
              </CardContent>
            </Card>
          )}

          {room.height && (
            <Card className="bg-purple-50 border-purple-200 rounded-2xl">
              <CardContent className="p-6 text-center">
                <Thermometer className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-purple-700 mb-1">{room.height.toFixed(2)}m</div>
                <div className="text-sm text-purple-600">Ceiling Height</div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-orange-50 border-orange-200 rounded-2xl">
            <CardContent className="p-6 text-center">
              <Camera className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-orange-700 mb-1">{room.panoramaCount}</div>
              <div className="text-sm text-orange-600">360° Views</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <Card className="bg-white shadow-sm border-0 rounded-2xl mb-6">
            <CardContent className="p-2">
              <TabsList className="grid w-full grid-cols-7 bg-transparent gap-1">
                <TabsTrigger value="overview" className="data-[state=active]:bg-gray-100 rounded-xl py-3 text-sm">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="dimensions" className="data-[state=active]:bg-gray-100 rounded-xl py-3 text-sm">
                  Dimensions
                </TabsTrigger>
                <TabsTrigger value="materials" className="data-[state=active]:bg-gray-100 rounded-xl py-3 text-sm">
                  Materials
                </TabsTrigger>
                <TabsTrigger value="features" className="data-[state=active]:bg-gray-100 rounded-xl py-3 text-sm">
                  Features
                </TabsTrigger>
                <TabsTrigger value="condition" className="data-[state=active]:bg-gray-100 rounded-xl py-3 text-sm">
                  Condition
                </TabsTrigger>
                <TabsTrigger value="panoramas" className="data-[state=active]:bg-gray-100 rounded-xl py-3 text-sm">
                  360° Views
                </TabsTrigger>
                <TabsTrigger value="technical" className="data-[state=active]:bg-gray-100 rounded-xl py-3 text-sm">
                  Technical
                </TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-white shadow-sm border-0 rounded-2xl">
                  <CardHeader>
                    <CardTitle>Room Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {room.panoramaLinks && room.panoramaLinks.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {room.panoramaLinks.slice(0, 4).map((link, index) => (
                          <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={link || "/placeholder.svg"}
                              alt={`${room.type} - View ${index + 1}`}
                              className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = "none"
                                const parent = target.parentElement
                                if (parent) {
                                  const fallback = document.createElement("div")
                                  fallback.className = "flex items-center justify-center w-full h-full"
                                  fallback.innerHTML = `
                                    <div class="text-center">
                                      <svg class="h-8 w-8 text-gray-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                      </svg>
                                      <p class="text-xs text-gray-500">360° View ${index + 1}</p>
                                    </div>
                                  `
                                  parent.appendChild(fallback)
                                }
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center">
                          <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">No images available</p>
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Maximize className="h-4 w-4 mr-2" />
                        View All ({room.panoramaCount})
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        360° Experience
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Quick Stats */}
                <Card className="bg-white shadow-sm border-0 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Room Type</span>
                      <span className="font-semibold capitalize">{room.type}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Floor Area</span>
                      <span className="font-semibold">{room.area.toFixed(2)} sqm</span>
                    </div>
                    {room.volume && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Volume</span>
                        <span className="font-semibold">{room.volume.toFixed(2)} m³</span>
                      </div>
                    )}
                    {room.height && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Height</span>
                        <span className="font-semibold">{room.height.toFixed(2)} m</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Windows</span>
                      <span className="font-semibold">{room.windows}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Ceiling Lights</span>
                      <span className="font-semibold">{room.ceilingLights}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Room Status */}
                <Card className="bg-white shadow-sm border-0 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-lg">Room Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Overall Condition</span>
                      <Badge variant={hasDamage ? "destructive" : "default"}>
                        {hasDamage ? "Damage Present" : "Good"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Air Conditioning</span>
                      {room.airConditioning ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Smoke Alarm</span>
                      {room.smokeAlarm ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Ceiling Fan</span>
                      {room.ceilingFan ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Dimensions Tab */}
          <TabsContent value="dimensions">
            <Card className="bg-white shadow-sm border-0 rounded-2xl">
              <CardHeader>
                <CardTitle>Complete Dimensional Analysis</CardTitle>
                <p className="text-gray-600">Precise measurements and spatial calculations</p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Square className="h-6 w-6 text-blue-600" />
                      <h3 className="font-semibold text-gray-800">Floor Area</h3>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{room.area.toFixed(3)}</div>
                    <div className="text-sm text-gray-600">Square Meters</div>
                  </div>

                  {room.width && (
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <Ruler className="h-6 w-6 text-green-600" />
                        <h3 className="font-semibold text-gray-800">Width</h3>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">{room.width.toFixed(3)}</div>
                      <div className="text-sm text-gray-600">Meters</div>
                    </div>
                  )}

                  {room.depth && (
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <Move3D className="h-6 w-6 text-purple-600" />
                        <h3 className="font-semibold text-gray-800">Depth</h3>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">{room.depth.toFixed(3)}</div>
                      <div className="text-sm text-gray-600">Meters</div>
                    </div>
                  )}

                  {room.height && (
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <Thermometer className="h-6 w-6 text-orange-600" />
                        <h3 className="font-semibold text-gray-800">Height</h3>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">{room.height.toFixed(3)}</div>
                      <div className="text-sm text-gray-600">Meters</div>
                    </div>
                  )}

                  {room.volume && (
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <Volume2 className="h-6 w-6 text-red-600" />
                        <h3 className="font-semibold text-gray-800">Volume</h3>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">{room.volume.toFixed(3)}</div>
                      <div className="text-sm text-gray-600">Cubic Meters</div>
                    </div>
                  )}

                  {/* Calculated Ratios */}
                  {room.width && room.depth && (
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <BarChart3 className="h-6 w-6 text-indigo-600" />
                        <h3 className="font-semibold text-gray-800">Aspect Ratio</h3>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {(room.width / room.depth).toFixed(2)}:1
                      </div>
                      <div className="text-sm text-gray-600">Width to Depth</div>
                    </div>
                  )}
                </div>

                {/* Dimensional Summary */}
                <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-4">Dimensional Summary</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Perimeter:</span>
                      <span className="ml-2 font-semibold">
                        {room.width && room.depth ? `${(2 * (room.width + room.depth)).toFixed(2)} m` : "Not available"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Wall Area (approx):</span>
                      <span className="ml-2 font-semibold">
                        {room.width && room.depth && room.height
                          ? `${(2 * (room.width + room.depth) * room.height).toFixed(2)} sqm`
                          : "Not available"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Floor to Ceiling Volume:</span>
                      <span className="ml-2 font-semibold">
                        {room.volume ? `${room.volume.toFixed(2)} m³` : "Not available"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Space Efficiency:</span>
                      <span className="ml-2 font-semibold">
                        {room.area > 20 ? "Large" : room.area > 10 ? "Medium" : "Compact"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials">
            <Card className="bg-white shadow-sm border-0 rounded-2xl">
              <CardHeader>
                <CardTitle>Surface Materials & Finishes</CardTitle>
                <p className="text-gray-600">Complete material specification and analysis</p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Package className="h-6 w-6 text-blue-600" />
                      <h3 className="font-semibold text-gray-800">Flooring</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Material Type:</span>
                        <p className="font-semibold capitalize">{room.flooring}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Coverage Area:</span>
                        <p className="font-semibold">{room.area.toFixed(2)} sqm</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Condition:</span>
                        <Badge variant={room.floorDamage > 0 ? "destructive" : "default"} className="ml-2">
                          {room.floorDamage > 0 ? "Damage Present" : "Good"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Home className="h-6 w-6 text-green-600" />
                      <h3 className="font-semibold text-gray-800">Wall Material</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Material Type:</span>
                        <p className="font-semibold capitalize">{room.wallMaterial}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Estimated Area:</span>
                        <p className="font-semibold">
                          {room.width && room.depth && room.height
                            ? `${(2 * (room.width + room.depth) * room.height).toFixed(2)} sqm`
                            : "Not calculated"}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Condition:</span>
                        <Badge variant={room.wallDamage > 0 ? "destructive" : "default"} className="ml-2">
                          {room.wallDamage > 0 ? "Damage Present" : "Good"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Ruler className="h-6 w-6 text-purple-600" />
                      <h3 className="font-semibold text-gray-800">Ceiling</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Ceiling Type:</span>
                        <p className="font-semibold capitalize">{room.ceilingType}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Coverage Area:</span>
                        <p className="font-semibold">{room.area.toFixed(2)} sqm</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Condition:</span>
                        <Badge variant={room.ceilingDamage > 0 ? "destructive" : "default"} className="ml-2">
                          {room.ceilingDamage > 0 ? "Damage Present" : "Good"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Material Summary */}
                <div className="mt-8 p-6 bg-green-50 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-4">Material Analysis Summary</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Surface Breakdown</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Floor ({room.flooring}):</span>
                          <span className="font-semibold">{room.area.toFixed(2)} sqm</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Walls ({room.wallMaterial}):</span>
                          <span className="font-semibold">
                            {room.width && room.depth && room.height
                              ? `${(2 * (room.width + room.depth) * room.height).toFixed(2)} sqm`
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ceiling ({room.ceilingType}):</span>
                          <span className="font-semibold">{room.area.toFixed(2)} sqm</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Quality Assessment</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span>Overall Condition:</span>
                          <Badge variant={hasDamage ? "destructive" : "default"}>
                            {hasDamage ? "Needs Attention" : "Excellent"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Damage Areas:</span>
                          <span className="font-semibold">
                            {room.floorDamage + room.wallDamage + room.ceilingDamage} detected
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Material Grade:</span>
                          <span className="font-semibold">Standard</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-sm border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle>Lighting & Electrical</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Lightbulb className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium">Ceiling Lights</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{room.ceilingLights}</div>
                        <div className="text-xs text-gray-500">Fixtures</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Wind className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Ceiling Fan</span>
                      </div>
                      <div className="flex items-center">
                        {room.ceilingFan ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle>Climate & Ventilation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Wind className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Air Conditioning</span>
                      </div>
                      <div className="flex items-center">
                        {room.airConditioning ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Eye className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">Natural Ventilation</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{room.windows}</div>
                        <div className="text-xs text-gray-500">Windows</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle>Safety & Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-red-600" />
                        <span className="font-medium">Smoke Alarm</span>
                      </div>
                      <div className="flex items-center">
                        {room.smokeAlarm ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle>Window Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Eye className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">Window Count</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{room.windows}</div>
                        <div className="text-xs text-gray-500">Total</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">Window Covering</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold capitalize">{room.windowCover}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Condition Tab */}
          <TabsContent value="condition">
            <Card className="bg-white shadow-sm border-0 rounded-2xl">
              <CardHeader>
                <CardTitle>Comprehensive Condition Assessment</CardTitle>
                <p className="text-gray-600">Detailed damage analysis and condition reporting</p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div
                    className={`p-6 rounded-xl border-2 ${
                      room.floorDamage > 0 ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Package className={`h-6 w-6 ${room.floorDamage > 0 ? "text-red-600" : "text-green-600"}`} />
                      <h3 className="font-semibold text-gray-800">Floor Condition</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Status:</span>
                        <p className={`font-semibold ${room.floorDamage > 0 ? "text-red-700" : "text-green-700"}`}>
                          {room.floorDamage > 0 ? "Damage Detected" : "Good Condition"}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Damage Level:</span>
                        <p className="font-semibold">{room.floorDamage}/10</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Material:</span>
                        <p className="font-semibold capitalize">{room.flooring}</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-6 rounded-xl border-2 ${
                      room.wallDamage > 0 ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Home className={`h-6 w-6 ${room.wallDamage > 0 ? "text-red-600" : "text-green-600"}`} />
                      <h3 className="font-semibold text-gray-800">Wall Condition</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Status:</span>
                        <p className={`font-semibold ${room.wallDamage > 0 ? "text-red-700" : "text-green-700"}`}>
                          {room.wallDamage > 0 ? "Damage Detected" : "Good Condition"}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Damage Level:</span>
                        <p className="font-semibold">{room.wallDamage}/10</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Material:</span>
                        <p className="font-semibold capitalize">{room.wallMaterial}</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-6 rounded-xl border-2 ${
                      room.ceilingDamage > 0 ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Ruler className={`h-6 w-6 ${room.ceilingDamage > 0 ? "text-red-600" : "text-green-600"}`} />
                      <h3 className="font-semibold text-gray-800">Ceiling Condition</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Status:</span>
                        <p className={`font-semibold ${room.ceilingDamage > 0 ? "text-red-700" : "text-green-700"}`}>
                          {room.ceilingDamage > 0 ? "Damage Detected" : "Good Condition"}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Damage Level:</span>
                        <p className="font-semibold">{room.ceilingDamage}/10</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Type:</span>
                        <p className="font-semibold capitalize">{room.ceilingType}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overall Assessment */}
                <div className="p-6 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-4">Overall Assessment Summary</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-3">Condition Metrics</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Total Damage Points:</span>
                          <span className="font-semibold">
                            {room.floorDamage + room.wallDamage + room.ceilingDamage}/30
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Condition Score:</span>
                          <span className="font-semibold">
                            {Math.max(
                              0,
                              100 - (room.floorDamage + room.wallDamage + room.ceilingDamage) * 3.33,
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Areas Affected:</span>
                          <span className="font-semibold">
                            {[room.floorDamage > 0, room.wallDamage > 0, room.ceilingDamage > 0].filter(Boolean).length}
                            /3
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-3">Recommendations</h4>
                      <div className="space-y-2 text-sm">
                        {hasDamage ? (
                          <>
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                              <span>Professional inspection recommended</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                              <span>Document damage for insurance purposes</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Calendar className="h-4 w-4 text-purple-500 mt-0.5" />
                              <span>Schedule repairs before listing</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>Room is in excellent condition</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                              <span>Regular maintenance recommended</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Calendar className="h-4 w-4 text-purple-500 mt-0.5" />
                              <span>Ready for market presentation</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Panoramas Tab */}
          <TabsContent value="panoramas">
            <Card className="bg-white shadow-sm border-0 rounded-2xl">
              <CardHeader>
                <CardTitle>360° Panoramic Documentation</CardTitle>
                <p className="text-gray-600">Complete visual record with {room.panoramaCount} panoramic captures</p>
              </CardHeader>
              <CardContent>
                {/* Panorama IDs */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-3">Panorama Reference IDs</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {room.panoramaIds.map((id, index) => (
                      <div key={index} className="font-mono text-xs bg-white p-2 rounded border">
                        {index + 1}. {id}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Panorama Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {room.panoramaLinks.map((link, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg overflow-hidden group">
                      <div className="aspect-video relative">
                        <img
                          src={link || "/placeholder.svg"}
                          alt={`360° View ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = "none"
                            const parent = target.parentElement
                            if (parent) {
                              const fallback = document.createElement("div")
                              fallback.className = "flex flex-col items-center justify-center w-full h-full bg-gray-200"
                              fallback.innerHTML = `
                                <svg class="h-8 w-8 text-gray-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                                <p class="text-xs text-gray-500">360° View ${index + 1}</p>
                              `
                              parent.appendChild(fallback)
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <Button
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <Maximize className="h-4 w-4 mr-2" />
                            View 360°
                          </Button>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-sm text-gray-800 mb-1">Panorama {index + 1}</h4>
                        <p className="text-xs text-gray-500 mb-2">ID: {room.panoramaIds[index]}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
                            Download
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Panorama Statistics */}
                <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-4">Panorama Statistics</h3>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Total Captures:</span>
                      <p className="font-semibold text-lg">{room.panoramaCount}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Coverage Density:</span>
                      <p className="font-semibold text-lg">
                        {room.area > 0 ? (room.panoramaCount / room.area).toFixed(2) : "N/A"} per sqm
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Image Format:</span>
                      <p className="font-semibold">Skybox JPG</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Resolution:</span>
                      <p className="font-semibold">High Definition</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Technical Tab */}
          <TabsContent value="technical">
            <Card className="bg-white shadow-sm border-0 rounded-2xl">
              <CardHeader>
                <CardTitle>Technical Specifications & Metadata</CardTitle>
                <p className="text-gray-600">Complete technical data and system information</p>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Room Identifiers */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-gray-800 mb-4">Room Identifiers</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Room ID:</span>
                          <span className="font-mono font-semibold">{room.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Room Type:</span>
                          <span className="font-semibold capitalize">{room.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Property ID:</span>
                          <span className="font-mono font-semibold">{propertyData.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Matterport Tour:</span>
                          <span className="font-mono font-semibold">{propertyData.matterportTourId}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-gray-800 mb-4">Data Quality Metrics</h3>
                      <div className="space-y-3 text-sm">
                        {room.confidentPoint && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Confidence Score:</span>
                            <span className="font-semibold">{room.confidentPoint}%</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Data Completeness:</span>
                          <span className="font-semibold">
                            {Math.round(
                              (Object.values(room).filter((v) => v !== null && v !== undefined && v !== "").length /
                                Object.keys(room).length) *
                                100,
                            )}
                            %
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Panorama Coverage:</span>
                          <span className="font-semibold">{room.panoramaCount > 0 ? "Complete" : "Limited"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Measurement Precision:</span>
                          <span className="font-semibold">±0.01m</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Technical Details */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-gray-800 mb-4">Measurement Data</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Floor Area (precise):</span>
                          <span className="font-mono font-semibold">{room.area.toFixed(6)} sqm</span>
                        </div>
                        {room.volume && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Volume (precise):</span>
                            <span className="font-mono font-semibold">{room.volume.toFixed(6)} m³</span>
                          </div>
                        )}
                        {room.width && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Width (precise):</span>
                            <span className="font-mono font-semibold">{room.width.toFixed(6)} m</span>
                          </div>
                        )}
                        {room.depth && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Depth (precise):</span>
                            <span className="font-mono font-semibold">{room.depth.toFixed(6)} m</span>
                          </div>
                        )}
                        {room.height && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Height (precise):</span>
                            <span className="font-mono font-semibold">{room.height.toFixed(6)} m</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-gray-800 mb-4">System Information</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Scan Technology:</span>
                          <span className="font-semibold">Matterport Pro2</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Processing Engine:</span>
                          <span className="font-semibold">Little Hinges AI</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Data Format:</span>
                          <span className="font-semibold">JSON/CSV</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Updated:</span>
                          <span className="font-semibold">2025-01-08</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Raw Data Export */}
                <div className="mt-8 p-6 bg-yellow-50 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-4">Raw Data Export</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Export complete room data including all measurements, materials, and technical specifications.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export JSON
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export PDF Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
