"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Camera,
  Eye,
  Ruler,
  Home,
  Package,
  Lightbulb,
  Wind,
  Shield,
  FileText,
  MapPin,
  ExternalLink,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

// Mock room data - in a real app this would come from your data source
const roomsData = {
  "1": {
    id: "1",
    name: "Room 1: Hallway",
    roomId: "19ab05tns5h6y4qm42esqqpea",
    type: "hallway",
    area: "2.47",
    height: "2.42",
    width: "0.88",
    depth: "2.23",
    volume: "5.98",
    windows: "0",
    doors: "1",
    description:
      "This hallway features soft neutral carpeting and crisp white walls, creating a bright and airy feel. A staircase curves up on one side, while doors lead to bedrooms and a bathroom. Recessed ceiling lights add to the clean, modern look, and natural light filters in from the open staircase to the top floor and bedroom windows.",
    panoramaCount: "2",
    panoramaLinks: [
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_19ab05tns5h6y4qm42esqqpea_9atk8hw6bpr2kixswfbit6kya_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_19ab05tns5h6y4qm42esqqpea_71mwb6u62ih98rhx2bwyc8b8b_skybox.jpg",
    ],
    panoramaImages: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2JaixJDeM9NWUh5WybykRXW5Hu9oTZ.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_19ab05tns5h6y4qm42esqqpea_71mwb6u62ih98rhx2bwyc8b8b_skybox%20%281%29.jpg-hpnL3NcCfYc8k7hkQLGiG1dC6fqmPd.jpeg",
    ],
    flooring: "Carpet",
    wallMaterial: "Drywall",
    ceilingType: "Flat",
    ceilingLights: "2",
    airConditioning: false,
    smokeAlarm: true,
    ceilingFan: false,
    condition: "Good",
    roomValuation: "$7,171.29",
    smokeAlarmCount: 1,
    ceilingLightCount: 2,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 0,
    windowCover: "Other",
    floorDamage: "No",
    ceilingDamage: "No",
    wallDamage: "No",
    contents: [
      {
        name: "Atom Recessed LED Downlight",
        quantity: 2,
        rrp: "$25",
        total: "$50",
        url: "https://haymans.mmem.com.au/burleigh/atoat9034-2f-lt-2f-wh-2f-tri",
      },
    ],
  },
  "2": {
    id: "2",
    name: "Room 2: Patio",
    roomId: "2qdmc5i9byxi79ry1pxdkqzea",
    type: "patio",
    area: "5.01",
    height: "2.72",
    width: "1.58",
    depth: "2.17",
    volume: "13.61",
    windows: "2",
    doors: "1",
    description:
      "This outdoor patio space features durable tile flooring and concrete walls, creating a modern industrial aesthetic. The metal ceiling provides weather protection while maintaining an open feel. Two recessed ceiling lights illuminate the space, and large windows offer views and natural light. The patio serves as a perfect transition between indoor and outdoor living spaces.",
    panoramaCount: "4",
    panoramaLinks: [
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_zibi0h0ges2t5dxryrb7800wd_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_cct379k0f1t6gnmuutm23i4ac_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_mw5ymdiqgmkaiasgdiksy3i5a_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_pxk5thts3iiwc5azq4drsitfc_skybox.jpg",
    ],
    panoramaImages: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-12%20at%204.24.05%E2%80%AFpm-sv7yY2hY8kdqPgXTDbkPJ8XLVTiwA6.png",
    ],
    flooring: "Tile",
    wallMaterial: "Concrete",
    ceilingType: "Metal",
    ceilingLights: "2",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    condition: "Good",
    roomValuation: "$14,046.71",
    smokeAlarmCount: 0,
    ceilingLightCount: 2,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 2,
    windowCover: "None",
    floorDamage: "No",
    ceilingDamage: "No",
    wallDamage: "No",
    contents: [
      {
        name: "Outdoor Ceiling Light",
        quantity: 2,
        rrp: "$45",
        total: "$90",
        url: "https://example.com/outdoor-ceiling-light",
      },
    ],
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
    doors: "X",
    description: "",
    panoramaCount: "X",
    panoramaLinks: [],
    panoramaImages: [],
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    condition: "Good",
    roomValuation: "",
    smokeAlarmCount: 0,
    ceilingLightCount: 0,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 0,
    windowCover: "",
    floorDamage: "",
    ceilingDamage: "",
    wallDamage: "",
    contents: [],
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
    doors: "X",
    description: "",
    panoramaCount: "X",
    panoramaLinks: [],
    panoramaImages: [],
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    condition: "Good",
    roomValuation: "",
    smokeAlarmCount: 0,
    ceilingLightCount: 0,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 0,
    windowCover: "",
    floorDamage: "",
    ceilingDamage: "",
    wallDamage: "",
    contents: [],
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
    doors: "X",
    description: "",
    panoramaCount: "X",
    panoramaLinks: [],
    panoramaImages: [],
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    condition: "Good",
    roomValuation: "",
    smokeAlarmCount: 0,
    ceilingLightCount: 0,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 0,
    windowCover: "",
    floorDamage: "",
    ceilingDamage: "",
    wallDamage: "",
    contents: [],
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
    doors: "X",
    description: "",
    panoramaCount: "X",
    panoramaLinks: [],
    panoramaImages: [],
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    condition: "Good",
    roomValuation: "",
    smokeAlarmCount: 0,
    ceilingLightCount: 0,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 0,
    windowCover: "",
    floorDamage: "",
    ceilingDamage: "",
    wallDamage: "",
    contents: [],
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
    doors: "X",
    description: "",
    panoramaCount: "X",
    panoramaLinks: [],
    panoramaImages: [],
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    condition: "Good",
    roomValuation: "",
    smokeAlarmCount: 0,
    ceilingLightCount: 0,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 0,
    windowCover: "",
    floorDamage: "",
    ceilingDamage: "",
    wallDamage: "",
    contents: [],
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
    doors: "X",
    description: "",
    panoramaCount: "X",
    panoramaLinks: [],
    panoramaImages: [],
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    condition: "Good",
    roomValuation: "",
    smokeAlarmCount: 0,
    ceilingLightCount: 0,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 0,
    windowCover: "",
    floorDamage: "",
    ceilingDamage: "",
    wallDamage: "",
    contents: [],
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
    doors: "X",
    description: "",
    panoramaCount: "X",
    panoramaLinks: [],
    panoramaImages: [],
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    condition: "Good",
    roomValuation: "",
    smokeAlarmCount: 0,
    ceilingLightCount: 0,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 0,
    windowCover: "",
    floorDamage: "",
    ceilingDamage: "",
    wallDamage: "",
    contents: [],
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
    doors: "X",
    description: "",
    panoramaCount: "X",
    panoramaLinks: [],
    panoramaImages: [],
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    condition: "Good",
    roomValuation: "",
    smokeAlarmCount: 0,
    ceilingLightCount: 0,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 0,
    windowCover: "",
    floorDamage: "",
    ceilingDamage: "",
    wallDamage: "",
    contents: [],
  },
  "13": {
    id: "13",
    name: "Room 13: Bedroom",
    type: "bedroom",
    area: "X",
    height: "X",
    width: "X",
    depth: "X",
    volume: "X",
    windows: "X",
    doors: "X",
    description: "",
    panoramaCount: "X",
    panoramaLinks: [],
    panoramaImages: [],
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    condition: "Good",
    roomValuation: "",
    smokeAlarmCount: 0,
    ceilingLightCount: 0,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 0,
    windowCover: "",
    floorDamage: "",
    ceilingDamage: "",
    wallDamage: "",
    contents: [],
  },
}

export default function RoomDetailPage({ params }: { params: { roomId: string } }) {
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
    <div className="min-h-screen bg-gray-50">
      <div className="pt-8">
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
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Room Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Room Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-12%20at%204.24.05%E2%80%AFpm-sv7yY2hY8kdqPgXTDbkPJ8XLVTiwA6.png"
                    alt="Room location in property"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Assets */}
            <Card className="bg-white shadow-sm border-0 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Assets</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="panoramas" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="panoramas">Property Panoramas</TabsTrigger>
                    <TabsTrigger value="images">Property Images</TabsTrigger>
                  </TabsList>

                  <TabsContent value="panoramas" className="space-y-4 mt-6">
                    <div className="relative">
                      <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
                        {room.panoramaImages.map((imageSrc, index) => (
                          <div
                            key={index}
                            className="flex-shrink-0 w-80 aspect-video relative rounded-lg overflow-hidden bg-gray-100"
                          >
                            <img
                              src={imageSrc || "/placeholder.svg"}
                              alt={`Panorama ${index + 1}`}
                              className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                              onClick={() => window.open(room.panoramaLinks[index], "_blank")}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all cursor-pointer flex items-center justify-center">
                              <div className="opacity-0 hover:opacity-100 transition-opacity">
                                <Eye className="h-8 w-8 text-white" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                        onClick={() => {
                          const container = document.querySelector(".flex.overflow-x-auto")
                          if (container) container.scrollLeft -= 320
                        }}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                        onClick={() => {
                          const container = document.querySelector(".flex.overflow-x-auto")
                          if (container) container.scrollLeft += 320
                        }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </TabsContent>

                  <TabsContent value="images" className="space-y-4 mt-6">
                    <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">Property Images</p>
                          <p className="text-xs text-gray-400">Coming soon</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Room Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Room Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{room.description}</p>
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
                        <p className="text-2xl font-bold text-blue-700">{room.area} m²</p>
                        <p className="text-sm text-blue-600">Floor Area</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <Home className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-700">{room.volume} m³</p>
                        <p className="text-sm text-green-600">Volume</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <Home className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-purple-700">{room.height} m</p>
                        <p className="text-sm text-purple-600">Height</p>
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
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Damage Assessment</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Floor Damage:</span>
                            <Badge variant={room.floorDamage === "No" ? "default" : "destructive"}>
                              {room.floorDamage}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Ceiling Damage:</span>
                            <Badge variant={room.ceilingDamage === "No" ? "default" : "destructive"}>
                              {room.ceilingDamage}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Wall Damage:</span>
                            <Badge variant={room.wallDamage === "No" ? "default" : "destructive"}>
                              {room.wallDamage}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="specifications" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">Floor Area:</span>
                        <p className="text-lg font-semibold">{room.area} m²</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">Width:</span>
                        <p className="text-lg font-semibold">{room.width} m</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">Depth:</span>
                        <p className="text-lg font-semibold">{room.depth} m</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">Height:</span>
                        <p className="text-lg font-semibold">{room.height} m</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">Volume:</span>
                        <p className="text-lg font-semibold">{room.volume} m³</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">Windows:</span>
                        <p className="text-lg font-semibold">{room.windows}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">Doors:</span>
                        <p className="text-lg font-semibold">{room.doors}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">Window Cover:</span>
                        <p className="text-lg font-semibold">{room.windowCover}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">Panorama Count:</span>
                        <p className="text-lg font-semibold">{room.panoramaCount}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">Downlight Type:</span>
                        <p className="text-lg font-semibold">Recessed</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">Room Valuation:</span>
                        <p className="text-lg font-semibold text-green-600">{room.roomValuation}</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="materials" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Package className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">Flooring:</span>
                        </div>
                        <span className="text-gray-700 capitalize">{room.flooring}</span>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Home className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">Walls:</span>
                        </div>
                        <span className="text-gray-700 capitalize">{room.wallMaterial}</span>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Ruler className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">Windows:</span>
                        </div>
                        <span className="text-gray-700">{room.windowCount === 0 ? "None" : room.windowCount}</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="features" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <Lightbulb className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium">{room.ceilingLightCount}</p>
                          <p className="text-sm text-gray-500">Ceiling Lights</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <Wind className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium">{room.airConditioningCount}</p>
                          <p className="text-sm text-gray-500">Air Conditioning Units</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <Shield className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium">{room.smokeAlarmCount}</p>
                          <p className="text-sm text-gray-500">Smoke Alarms</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <Wind className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium">{room.ceilingFanCount}</p>
                          <p className="text-sm text-gray-500">Ceiling Fans</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Contents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Contents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {room.contents?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity} | RRP: {item.rrp} each
                        </p>
                        <p className="text-sm font-medium text-green-600">Total: {item.total}</p>
                      </div>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Product
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right sidebar content if needed */}
          <div className="space-y-6"></div>
        </div>
      </main>
    </div>
  )
}
