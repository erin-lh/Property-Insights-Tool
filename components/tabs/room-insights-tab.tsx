"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import type { PropertyData, RoomData } from "@/lib/data-parser"
import { Camera, Eye, Ruler, Home, Package, Lightbulb, Wind, Shield, GitCompare } from "lucide-react"
import { RoomComparisonModal } from "@/components/room-comparison-modal"

interface RoomInsightsTabProps {
  propertyData: PropertyData
  onRoomClick?: (room: RoomData) => void
}

export function RoomInsightsTab({ propertyData, onRoomClick }: RoomInsightsTabProps) {
  const router = useRouter()
  const [selectedRooms, setSelectedRooms] = useState<RoomData[]>([])
  const [showComparison, setShowComparison] = useState(false)

  const handleViewDetails = (room: RoomData) => {
    router.push(`/room/${room.id}`)
  }

  const handleRoomSelect = (room: RoomData) => {
    setSelectedRooms((prev) => {
      const isSelected = prev.some((r) => r.id === room.id)
      if (isSelected) {
        return prev.filter((r) => r.id !== room.id)
      } else if (prev.length < 2) {
        return [...prev, room]
      } else {
        return [prev[1], room] // Replace first with new selection
      }
    })
  }

  const handleCompareRooms = () => {
    if (selectedRooms.length === 2) {
      setShowComparison(true)
    }
  }

  if (propertyData.rooms.length === 0) {
    return (
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardContent className="p-12 text-center">
          <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Room Data Available</h3>
          <p className="text-gray-600">Room insights will appear here once property data is loaded.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Comparison Controls */}
      {propertyData.rooms.length > 1 && (
        <Card className="bg-white shadow-sm border-0 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GitCompare className="h-5 w-5 text-gray-600" />
                <div>
                  <h3 className="font-semibold text-gray-800">Room Comparison</h3>
                  <p className="text-sm text-gray-600">
                    Select up to 2 rooms to compare their features and specifications
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-600">{selectedRooms.length}/2 selected</div>
                <Button
                  onClick={handleCompareRooms}
                  disabled={selectedRooms.length !== 2}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Compare Rooms
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Room Cards */}
      <div className="grid gap-6">
        {propertyData.rooms.map((room, index) => {
          const isSelected = selectedRooms.some((r) => r.id === room.id)

          return (
            <Card
              key={room.id || index}
              className={`bg-white shadow-sm border-0 rounded-2xl transition-all ${
                isSelected ? "ring-2 ring-blue-500 bg-blue-50" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleRoomSelect(room)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div>
                      <CardTitle className="text-xl font-semibold text-gray-800">
                        Room {index + 1}: {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                      </CardTitle>
                      <p className="text-gray-600 mt-1">
                        {room.area.toFixed(1)} sqm • {room.panoramaCount} 360° views
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => handleViewDetails(room)}>
                    View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Room Image */}
                  <div className="lg:col-span-1">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      {room.panoramaLinks && room.panoramaLinks.length > 0 ? (
                        <img
                          src={room.panoramaLinks[0] || "/placeholder.svg"}
                          alt={`${room.type} panorama`}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = "none"
                            const parent = target.parentElement
                            if (parent) {
                              const fallback = document.createElement("div")
                              fallback.className = "flex flex-col items-center justify-center w-full h-full text-center"
                              fallback.innerHTML = `
                                <svg class="h-12 w-12 text-gray-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                                <p class="text-sm text-gray-500">Room ${index + 1} Image</p>
                              `
                              parent.appendChild(fallback)
                            }
                          }}
                        />
                      ) : (
                        <div className="text-center">
                          <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Room {index + 1} Image</p>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Camera className="h-4 w-4 mr-2" />
                        360° View
                      </Button>
                    </div>
                  </div>

                  {/* Room Data Insights */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Key Metrics */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Key Metrics</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                          <Ruler className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                          <p className="text-lg font-bold text-blue-700">{room.area.toFixed(1)}</p>
                          <p className="text-xs text-blue-600">sqm</p>
                        </div>
                        {room.height && (
                          <div className="bg-green-50 p-3 rounded-lg text-center">
                            <Home className="h-5 w-5 text-green-600 mx-auto mb-1" />
                            <p className="text-lg font-bold text-green-700">{room.height.toFixed(1)}</p>
                            <p className="text-xs text-green-600">height (m)</p>
                          </div>
                        )}
                        <div className="bg-purple-50 p-3 rounded-lg text-center">
                          <Eye className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                          <p className="text-lg font-bold text-purple-700">{room.windows}</p>
                          <p className="text-xs text-purple-600">windows</p>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg text-center">
                          <Camera className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                          <p className="text-lg font-bold text-orange-700">{room.panoramaCount}</p>
                          <p className="text-xs text-orange-600">360° views</p>
                        </div>
                      </div>
                    </div>

                    {/* Room Specifications */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Specifications</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Floor Area:</span>
                          <p className="font-medium">{room.area.toFixed(1)} sqm</p>
                        </div>
                        {room.width && (
                          <div>
                            <span className="text-gray-500">Width:</span>
                            <p className="font-medium">{room.width.toFixed(1)}m</p>
                          </div>
                        )}
                        {room.depth && (
                          <div>
                            <span className="text-gray-500">Depth:</span>
                            <p className="font-medium">{room.depth.toFixed(1)}m</p>
                          </div>
                        )}
                        {room.height && (
                          <div>
                            <span className="text-gray-500">Height:</span>
                            <p className="font-medium">{room.height.toFixed(1)}m</p>
                          </div>
                        )}
                        {room.volume && (
                          <div>
                            <span className="text-gray-500">Volume:</span>
                            <p className="font-medium">{room.volume.toFixed(1)} m³</p>
                          </div>
                        )}
                        <div>
                          <span className="text-gray-500">Windows:</span>
                          <p className="font-medium">{room.windows}</p>
                        </div>
                      </div>
                    </div>

                    {/* Materials & Features */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Materials & Features</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Package className="h-4 w-4 text-gray-600" />
                            <span className="text-sm font-medium">Flooring</span>
                          </div>
                          <span className="text-sm text-gray-700 capitalize">{room.flooring}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Home className="h-4 w-4 text-gray-600" />
                            <span className="text-sm font-medium">Wall Material</span>
                          </div>
                          <span className="text-sm text-gray-700 capitalize">{room.wallMaterial}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Ruler className="h-4 w-4 text-gray-600" />
                            <span className="text-sm font-medium">Ceiling Type</span>
                          </div>
                          <span className="text-sm text-gray-700 capitalize">{room.ceilingType}</span>
                        </div>
                      </div>
                    </div>

                    {/* Room Features */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Installed Features</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <Lightbulb className="h-4 w-4 text-gray-600" />
                          <div>
                            <p className="text-sm font-medium">{room.ceilingLights}</p>
                            <p className="text-xs text-gray-500">Ceiling Lights</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <Wind className="h-4 w-4 text-gray-600" />
                          <div>
                            <p className="text-sm font-medium">{room.airConditioning ? "Yes" : "No"}</p>
                            <p className="text-xs text-gray-500">Air Conditioning</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <Shield className="h-4 w-4 text-gray-600" />
                          <div>
                            <p className="text-sm font-medium">{room.smokeAlarm ? "Yes" : "No"}</p>
                            <p className="text-xs text-gray-500">Smoke Alarm</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <Wind className="h-4 w-4 text-gray-600" />
                          <div>
                            <p className="text-sm font-medium">{room.ceilingFan ? "Yes" : "No"}</p>
                            <p className="text-xs text-gray-500">Ceiling Fan</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Room Comparison Modal */}
      <RoomComparisonModal rooms={selectedRooms} isOpen={showComparison} onClose={() => setShowComparison(false)} />
    </div>
  )
}
