"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { RoomData } from "@/lib/data-parser"
import {
  Camera,
  Ruler,
  Eye,
  Lightbulb,
  Wind,
  Shield,
  Package,
  Home,
  Download,
  Share,
  Maximize,
  AlertTriangle,
} from "lucide-react"

interface RoomDetailModalProps {
  room: RoomData | null
  isOpen: boolean
  onClose: () => void
}

export function RoomDetailModal({ room, isOpen, onClose }: RoomDetailModalProps) {
  if (!room) return null

  const formatRoomType = (type: string) => {
    return type
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const hasDamage = room.floorDamage > 0 || room.ceilingDamage > 0 || room.wallDamage > 0

  // Update the handleImageError function to support gallery images
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, index: number) => {
    const target = e.target as HTMLImageElement
    target.style.display = "none"
    const parent = target.parentElement
    if (parent) {
      const fallback = document.createElement("div")
      fallback.className = "flex items-center justify-center w-full h-full bg-gray-100"
      fallback.innerHTML = `
      <div class="text-center">
        <div class="h-8 w-8 text-gray-400 mx-auto mb-2">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <p class="text-xs text-gray-500">View ${index + 1}</p>
      </div>
    `
      parent.appendChild(fallback)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-800">{formatRoomType(room.type)} Details</DialogTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          {room.id && <p className="text-sm text-gray-500 font-mono">Room ID: {room.id}</p>}
        </DialogHeader>

        <div className="space-y-6">
          {/* Room Images and Key Metrics */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Room Images */}
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-4">
                  {room.galleryImages && room.galleryImages.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {room.galleryImages.slice(0, 4).map((image, index) => (
                        <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`${room.type} - Gallery ${index + 1}`}
                            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                            onError={(e) => handleImageError(e, index)}
                          />
                        </div>
                      ))}
                    </div>
                  ) : room.panoramaLinks && room.panoramaLinks.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {room.panoramaLinks.slice(0, 4).map((link, index) => (
                        <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={link || "/placeholder.svg"}
                            alt={`${room.type} - View ${index + 1}`}
                            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                            onError={(e) => handleImageError(e, index)}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">No images available</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 mt-4">
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

            {/* Key Metrics */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <Ruler className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-700">{room.area.toFixed(1)}</p>
                    <p className="text-sm text-blue-600">Square Meters</p>
                  </CardContent>
                </Card>

                {room.height && (
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4 text-center">
                      <Home className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-700">{room.height.toFixed(2)}m</p>
                      <p className="text-sm text-green-600">Ceiling Height</p>
                    </CardContent>
                  </Card>
                )}

                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-4 text-center">
                    <Camera className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-700">{room.panoramaCount}</p>
                    <p className="text-sm text-purple-600">360° Views</p>
                  </CardContent>
                </Card>

                {hasDamage && (
                  <Card className="bg-red-50 border-red-200">
                    <CardContent className="p-4 text-center">
                      <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-red-700">Damage Detected</p>
                      <p className="text-xs text-red-600">See condition tab</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="condition">Condition</TabsTrigger>
              <TabsTrigger value="panoramas">360° Views</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Room Dimensions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Floor Area</span>
                      <p className="text-lg font-semibold">{room.area.toFixed(2)} sqm</p>
                    </div>
                    {room.width && (
                      <div>
                        <span className="text-sm text-gray-500">Width</span>
                        <p className="text-lg font-semibold">{room.width.toFixed(2)}m</p>
                      </div>
                    )}
                    {room.depth && (
                      <div>
                        <span className="text-sm text-gray-500">Depth</span>
                        <p className="text-lg font-semibold">{room.depth.toFixed(2)}m</p>
                      </div>
                    )}
                    {room.height && (
                      <div>
                        <span className="text-sm text-gray-500">Height</span>
                        <p className="text-lg font-semibold">{room.height.toFixed(2)}m</p>
                      </div>
                    )}
                    {room.volume && (
                      <div>
                        <span className="text-sm text-gray-500">Volume</span>
                        <p className="text-lg font-semibold">{room.volume.toFixed(2)} m³</p>
                      </div>
                    )}
                    <div>
                      <span className="text-sm text-gray-500">Windows</span>
                      <p className="text-lg font-semibold">{room.windows}</p>
                    </div>
                    {room.windowCover && room.windowCover !== "Other" && (
                      <div>
                        <span className="text-sm text-gray-500">Window Cover</span>
                        <p className="text-lg font-semibold">{room.windowCover}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="materials" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Surface Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">Flooring</span>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {room.flooring}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Home className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">Wall Material</span>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {room.wallMaterial}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Ruler className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">Ceiling Type</span>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {room.ceilingType}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Room Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Lightbulb className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                      <p className="font-semibold">{room.ceilingLights}</p>
                      <p className="text-sm text-gray-600">Ceiling Lights</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Eye className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                      <p className="font-semibold">{room.windows}</p>
                      <p className="text-sm text-gray-600">Windows</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Wind className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                      <p className="font-semibold">{room.airConditioning ? "Yes" : "No"}</p>
                      <p className="text-sm text-gray-600">Air Conditioning</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Shield className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                      <p className="font-semibold">{room.smokeAlarm ? "Yes" : "No"}</p>
                      <p className="text-sm text-gray-600">Smoke Alarm</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Wind className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                      <p className="font-semibold">{room.ceilingFan ? "Yes" : "No"}</p>
                      <p className="text-sm text-gray-600">Ceiling Fan</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="condition" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Room Condition Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div
                      className={`text-center p-4 rounded-lg ${
                        room.floorDamage > 0 ? "bg-red-50 border border-red-200" : "bg-green-50 border border-green-200"
                      }`}
                    >
                      <Package
                        className={`h-6 w-6 mx-auto mb-2 ${room.floorDamage > 0 ? "text-red-600" : "text-green-600"}`}
                      />
                      <p className={`font-semibold ${room.floorDamage > 0 ? "text-red-700" : "text-green-700"}`}>
                        {room.floorDamage > 0 ? "Damage Detected" : "Good Condition"}
                      </p>
                      <p className={`text-sm ${room.floorDamage > 0 ? "text-red-600" : "text-green-600"}`}>Floor</p>
                    </div>
                    <div
                      className={`text-center p-4 rounded-lg ${
                        room.wallDamage > 0 ? "bg-red-50 border border-red-200" : "bg-green-50 border border-green-200"
                      }`}
                    >
                      <Home
                        className={`h-6 w-6 mx-auto mb-2 ${room.wallDamage > 0 ? "text-red-600" : "text-green-600"}`}
                      />
                      <p className={`font-semibold ${room.wallDamage > 0 ? "text-red-700" : "text-green-700"}`}>
                        {room.wallDamage > 0 ? "Damage Detected" : "Good Condition"}
                      </p>
                      <p className={`text-sm ${room.wallDamage > 0 ? "text-red-600" : "text-green-600"}`}>Walls</p>
                    </div>
                    <div
                      className={`text-center p-4 rounded-lg ${
                        room.ceilingDamage > 0
                          ? "bg-red-50 border border-red-200"
                          : "bg-green-50 border border-green-200"
                      }`}
                    >
                      <Ruler
                        className={`h-6 w-6 mx-auto mb-2 ${room.ceilingDamage > 0 ? "text-red-600" : "text-green-600"}`}
                      />
                      <p className={`font-semibold ${room.ceilingDamage > 0 ? "text-red-700" : "text-green-700"}`}>
                        {room.ceilingDamage > 0 ? "Damage Detected" : "Good Condition"}
                      </p>
                      <p className={`text-sm ${room.ceilingDamage > 0 ? "text-red-600" : "text-green-600"}`}>Ceiling</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="panoramas" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>360° Panoramic Views ({room.panoramaCount})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {room.panoramaLinks.map((link, index) => (
                      <div
                        key={index}
                        className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors overflow-hidden"
                      >
                        <img
                          src={link || "/placeholder.svg"}
                          alt={`360° View ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = "none"
                            const parent = target.parentElement
                            if (parent) {
                              const fallback = document.createElement("div")
                              fallback.className = "flex flex-col items-center justify-center w-full h-full"
                              const cameraIcon = document.createElement("div")
                              cameraIcon.innerHTML = `
                                <svg class="h-8 w-8 text-gray-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                              `
                              const label = document.createElement("p")
                              label.className = "text-sm text-gray-500"
                              label.textContent = `360° View ${index + 1}`

                              fallback.appendChild(cameraIcon)
                              fallback.appendChild(label)
                              parent.appendChild(fallback)
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
