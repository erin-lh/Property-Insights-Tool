"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { RoomData } from "@/lib/data-parser"
import { Eye, Maximize, ExternalLink, Ruler, Camera, CheckCircle, XCircle } from "lucide-react"
import { hasRecentSheetsData, getSyncStatusMessage } from "@/lib/sheets-utils"

interface RoomCardProps {
  room: RoomData
  onViewDetails: (room: RoomData) => void
}

export function RoomCard({ room, onViewDetails }: RoomCardProps) {
  const handleViewPanorama = () => {
    if (room.panoramaLinks && room.panoramaLinks.length > 0) {
      window.open(room.panoramaLinks[0], "_blank")
    }
  }

  const handleViewDrive = () => {
    if (room.driveUrl) {
      window.open(room.driveUrl, "_blank")
    }
  }

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      {/* Room Image */}
      <div className="aspect-video bg-gray-100 relative">
        {room.coverImage ? (
          <img
            src={room.coverImage || "/placeholder.svg"}
            alt={`${room.type} view`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Camera className="h-12 w-12 text-gray-400" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-white/90 text-gray-800">
            Room {room.roomNumber}
          </Badge>
        </div>
        
        {/* Sync Status Indicator */}
        <div className="absolute top-3 left-3 mt-8">
          {room.sheetData ? (
            <Badge 
              variant="outline" 
              className={`bg-white/90 text-xs ${
                hasRecentSheetsData(room) 
                  ? 'text-green-700 border-green-300' 
                  : 'text-orange-700 border-orange-300'
              }`}
              title={getSyncStatusMessage(room)}
            >
              {hasRecentSheetsData(room) ? (
                <CheckCircle className="h-3 w-3 mr-1" />
              ) : (
                <XCircle className="h-3 w-3 mr-1" />
              )}
              Sheets
            </Badge>
          ) : null}
        </div>
        
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {room.panoramaCount} 360° Views
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Room Header */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 capitalize">{room.type}</h3>
            <p className="text-sm text-gray-500">ID: {room.id.slice(0, 8)}...</p>
          </div>

          {/* Room Specs */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <Ruler className="h-4 w-4 text-gray-500" />
              <div>
                <div className="text-sm font-medium text-gray-900">{room.area.toFixed(1)} sqm</div>
                <div className="text-xs text-gray-500">Floor Area</div>
              </div>
            </div>
            {room.volume && (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-500 rounded-sm flex items-center justify-center">
                  <span className="text-xs text-white font-bold">3D</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{room.volume.toFixed(1)} m³</div>
                  <div className="text-xs text-gray-500">Volume</div>
                </div>
              </div>
            )}
          </div>

          {/* Room Features */}
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="text-xs">
              {room.flooring}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {room.wallMaterial}
            </Badge>
            {room.airConditioning && (
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                AC
              </Badge>
            )}
            {room.smokeAlarm && (
              <Badge variant="outline" className="text-xs bg-red-50 text-red-700">
                Smoke Alarm
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={() => onViewDetails(room)}>
              <Eye className="h-4 w-4 mr-1" />
              Details
            </Button>
            {room.panoramaLinks && room.panoramaLinks.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleViewPanorama}>
                <Maximize className="h-4 w-4" />
              </Button>
            )}
            {room.driveUrl && (
              <Button variant="outline" size="sm" onClick={handleViewDrive}>
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
