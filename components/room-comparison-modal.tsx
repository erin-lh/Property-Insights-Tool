"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { RoomData } from "@/lib/data-parser"
import { Camera, Ruler, Lightbulb, Package, ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface RoomComparisonModalProps {
  rooms: RoomData[]
  isOpen: boolean
  onClose: () => void
}

export function RoomComparisonModal({ rooms, isOpen, onClose }: RoomComparisonModalProps) {
  if (!rooms || rooms.length < 2) return null

  const formatRoomType = (type: string) => {
    return type
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const getComparisonIcon = (value1: number, value2: number) => {
    if (value1 > value2) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (value1 < value2) return <TrendingDown className="h-4 w-4 text-red-600" />
    return <Minus className="h-4 w-4 text-gray-400" />
  }

  const getPercentageDiff = (value1: number, value2: number) => {
    if (value2 === 0) return "N/A"
    const diff = ((value1 - value2) / value2) * 100
    return `${diff > 0 ? "+" : ""}${diff.toFixed(1)}%`
  }

  const room1 = rooms[0]
  const room2 = rooms[1]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">Room Comparison</DialogTitle>
          <p className="text-gray-600">
            Detailed comparison between {formatRoomType(room1.type)} and {formatRoomType(room2.type)}
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Room Headers */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-blue-800">{formatRoomType(room1.type)}</CardTitle>
                <p className="text-sm text-blue-600 font-mono">{room1.id}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-blue-600">Area:</span>
                    <p className="font-semibold text-blue-800">{room1.area.toFixed(2)} sqm</p>
                  </div>
                  <div>
                    <span className="text-blue-600">Views:</span>
                    <p className="font-semibold text-blue-800">{room1.panoramaCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-green-800">{formatRoomType(room2.type)}</CardTitle>
                <p className="text-sm text-green-600 font-mono">{room2.id}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-green-600">Area:</span>
                    <p className="font-semibold text-green-800">{room2.area.toFixed(2)} sqm</p>
                  </div>
                  <div>
                    <span className="text-green-600">Views:</span>
                    <p className="font-semibold text-green-800">{room2.panoramaCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dimensional Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="h-5 w-5" />
                Dimensional Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-4 items-center">
                  <div className="font-medium text-gray-700">Floor Area</div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-700">{room1.area.toFixed(2)} sqm</div>
                  </div>
                  <div className="flex justify-center">{getComparisonIcon(room1.area, room2.area)}</div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-700">{room2.area.toFixed(2)} sqm</div>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="text-xs">
                      {getPercentageDiff(room1.area, room2.area)}
                    </Badge>
                  </div>
                </div>

                {room1.volume && room2.volume && (
                  <div className="grid grid-cols-5 gap-4 items-center">
                    <div className="font-medium text-gray-700">Volume</div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-700">{room1.volume.toFixed(2)} m³</div>
                    </div>
                    <div className="flex justify-center">{getComparisonIcon(room1.volume, room2.volume)}</div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-700">{room2.volume.toFixed(2)} m³</div>
                    </div>
                    <div className="text-center">
                      <Badge variant="outline" className="text-xs">
                        {getPercentageDiff(room1.volume, room2.volume)}
                      </Badge>
                    </div>
                  </div>
                )}

                {room1.height && room2.height && (
                  <div className="grid grid-cols-5 gap-4 items-center">
                    <div className="font-medium text-gray-700">Height</div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-700">{room1.height.toFixed(2)} m</div>
                    </div>
                    <div className="flex justify-center">{getComparisonIcon(room1.height, room2.height)}</div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-700">{room2.height.toFixed(2)} m</div>
                    </div>
                    <div className="text-center">
                      <Badge variant="outline" className="text-xs">
                        {getPercentageDiff(room1.height, room2.height)}
                      </Badge>
                    </div>
                  </div>
                )}

                {room1.width && room2.width && (
                  <div className="grid grid-cols-5 gap-4 items-center">
                    <div className="font-medium text-gray-700">Width</div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-700">{room1.width.toFixed(2)} m</div>
                    </div>
                    <div className="flex justify-center">{getComparisonIcon(room1.width, room2.width)}</div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-700">{room2.width.toFixed(2)} m</div>
                    </div>
                    <div className="text-center">
                      <Badge variant="outline" className="text-xs">
                        {getPercentageDiff(room1.width, room2.width)}
                      </Badge>
                    </div>
                  </div>
                )}

                {room1.depth && room2.depth && (
                  <div className="grid grid-cols-5 gap-4 items-center">
                    <div className="font-medium text-gray-700">Depth</div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-700">{room1.depth.toFixed(2)} m</div>
                    </div>
                    <div className="flex justify-center">{getComparisonIcon(room1.depth, room2.depth)}</div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-700">{room2.depth.toFixed(2)} m</div>
                    </div>
                    <div className="text-center">
                      <Badge variant="outline" className="text-xs">
                        {getPercentageDiff(room1.depth, room2.depth)}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Materials Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Materials & Finishes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Flooring</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-blue-600">Room 1</div>
                      <div className="font-semibold text-blue-800 capitalize">{room1.flooring}</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-green-600">Room 2</div>
                      <div className="font-semibold text-green-800 capitalize">{room2.flooring}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Wall Material</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-blue-600">Room 1</div>
                      <div className="font-semibold text-blue-800 capitalize">{room1.wallMaterial}</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-green-600">Room 2</div>
                      <div className="font-semibold text-green-800 capitalize">{room2.wallMaterial}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Ceiling Type</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-blue-600">Room 1</div>
                      <div className="font-semibold text-blue-800 capitalize">{room1.ceilingType}</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-green-600">Room 2</div>
                      <div className="font-semibold text-green-800 capitalize">{room2.ceilingType}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Features & Amenities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-4 items-center">
                  <div className="font-medium text-gray-700">Windows</div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-700">{room1.windows}</div>
                  </div>
                  <div className="flex justify-center">{getComparisonIcon(room1.windows, room2.windows)}</div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-700">{room2.windows}</div>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="text-xs">
                      {room1.windows === room2.windows
                        ? "Equal"
                        : `${room1.windows - room2.windows > 0 ? "+" : ""}${room1.windows - room2.windows}`}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-4 items-center">
                  <div className="font-medium text-gray-700">Ceiling Lights</div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-700">{room1.ceilingLights}</div>
                  </div>
                  <div className="flex justify-center">
                    {getComparisonIcon(room1.ceilingLights, room2.ceilingLights)}
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-700">{room2.ceilingLights}</div>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="text-xs">
                      {room1.ceilingLights === room2.ceilingLights
                        ? "Equal"
                        : `${room1.ceilingLights - room2.ceilingLights > 0 ? "+" : ""}${room1.ceilingLights - room2.ceilingLights}`}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-4 items-center">
                  <div className="font-medium text-gray-700">Air Conditioning</div>
                  <div className="text-center">
                    <Badge variant={room1.airConditioning ? "default" : "secondary"}>
                      {room1.airConditioning ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="text-center">
                    <Badge variant={room2.airConditioning ? "default" : "secondary"}>
                      {room2.airConditioning ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="text-xs">
                      {room1.airConditioning === room2.airConditioning ? "Same" : "Different"}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-4 items-center">
                  <div className="font-medium text-gray-700">Smoke Alarm</div>
                  <div className="text-center">
                    <Badge variant={room1.smokeAlarm ? "default" : "secondary"}>
                      {room1.smokeAlarm ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="text-center">
                    <Badge variant={room2.smokeAlarm ? "default" : "secondary"}>
                      {room2.smokeAlarm ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="text-xs">
                      {room1.smokeAlarm === room2.smokeAlarm ? "Same" : "Different"}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-4 items-center">
                  <div className="font-medium text-gray-700">Ceiling Fan</div>
                  <div className="text-center">
                    <Badge variant={room1.ceilingFan ? "default" : "secondary"}>
                      {room1.ceilingFan ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="text-center">
                    <Badge variant={room2.ceilingFan ? "default" : "secondary"}>
                      {room2.ceilingFan ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="text-xs">
                      {room1.ceilingFan === room2.ceilingFan ? "Same" : "Different"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Panorama Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                360° Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">
                    {formatRoomType(room1.type)} - {room1.panoramaCount} Views
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {room1.panoramaLinks.slice(0, 4).map((link, index) => (
                      <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={link || "/placeholder.svg"}
                          alt={`${room1.type} - View ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = "none"
                            const parent = target.parentElement
                            if (parent) {
                              const fallback = document.createElement("div")
                              fallback.className = "flex items-center justify-center w-full h-full"
                              fallback.innerHTML = `
                                <div class="text-center">
                                  <svg class="h-6 w-6 text-gray-400 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                  </svg>
                                  <p class="text-xs text-gray-500">View ${index + 1}</p>
                                </div>
                              `
                              parent.appendChild(fallback)
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">
                    {formatRoomType(room2.type)} - {room2.panoramaCount} Views
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {room2.panoramaLinks.slice(0, 4).map((link, index) => (
                      <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={link || "/placeholder.svg"}
                          alt={`${room2.type} - View ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = "none"
                            const parent = target.parentElement
                            if (parent) {
                              const fallback = document.createElement("div")
                              fallback.className = "flex items-center justify-center w-full h-full"
                              fallback.innerHTML = `
                                <div class="text-center">
                                  <svg class="h-6 w-6 text-gray-400 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                  </svg>
                                  <p class="text-xs text-gray-500">View ${index + 1}</p>
                                </div>
                              `
                              parent.appendChild(fallback)
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle>Comparison Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Key Differences</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Size:</span>{" "}
                      {room1.area > room2.area
                        ? `${formatRoomType(room1.type)} is ${(((room1.area - room2.area) / room2.area) * 100).toFixed(1)}% larger`
                        : room2.area > room1.area
                          ? `${formatRoomType(room2.type)} is ${(((room2.area - room1.area) / room1.area) * 100).toFixed(1)}% larger`
                          : "Same size"}
                    </div>
                    <div>
                      <span className="font-medium">Documentation:</span>{" "}
                      {room1.panoramaCount > room2.panoramaCount
                        ? `${formatRoomType(room1.type)} has ${room1.panoramaCount - room2.panoramaCount} more views`
                        : room2.panoramaCount > room1.panoramaCount
                          ? `${formatRoomType(room2.type)} has ${room2.panoramaCount - room1.panoramaCount} more views`
                          : "Same number of views"}
                    </div>
                    <div>
                      <span className="font-medium">Materials:</span>{" "}
                      {room1.flooring !== room2.flooring
                        ? `Different flooring (${room1.flooring} vs ${room2.flooring})`
                        : "Same flooring material"}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Recommendations</h4>
                  <div className="space-y-2 text-sm">
                    <div>• Consider standardizing materials across similar room types</div>
                    <div>• Ensure consistent lighting and safety features</div>
                    <div>• Document all rooms with similar panorama coverage</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
