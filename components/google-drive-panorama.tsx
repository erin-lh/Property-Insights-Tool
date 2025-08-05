"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Folder, ImageIcon, Download } from "lucide-react"

interface GoogleDrivePanoramaProps {
  roomNumber: string
  roomType: string
  driveUrl: string
  panoramaCount?: number
  coverImage?: string
}

// Google Drive folder URLs for rooms 1-4
const ROOM_DRIVE_URLS = {
  "1": "https://drive.google.com/drive/folders/1ShnpOaDEvA1sAotLzd_lxgZhcSwzK2NX?usp=sharing",
  "2": "https://drive.google.com/drive/folders/1UXZm_JE71KR36-XGZXX778SsrcwOC6II?usp=drive_link",
  "3": "https://drive.google.com/drive/folders/1VQF3UI0Swlav_f9Go4oY7p5GYVl3SG0y?usp=sharing",
  "4": "https://drive.google.com/drive/folders/1T03B_nOZwrDlRrd2otU_v99bdN0CntRV?usp=drive_link",
}

export function GoogleDrivePanorama({
  roomNumber,
  roomType,
  driveUrl,
  panoramaCount = 0,
  coverImage,
}: GoogleDrivePanoramaProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleOpenDrive = () => {
    window.open(driveUrl, "_blank")
  }

  const formatRoomType = (type: string) => {
    return type
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Folder className="h-5 w-5 text-blue-600" />
            <div>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Room {roomNumber} - {formatRoomType(roomType)}
              </CardTitle>
              <p className="text-sm text-gray-600">Google Drive Panoramic Images</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {panoramaCount} images
            </Badge>
            <Button variant="outline" size="sm" onClick={handleOpenDrive} className="bg-transparent">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Drive
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Room Cover Image */}
          {coverImage && (
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img
                src={coverImage || "/placeholder.svg"}
                alt={`${formatRoomType(roomType)} - Room ${roomNumber}`}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Drive Folder Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <ImageIcon className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-800">Panoramic Image Collection</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">Room Type:</span>
                <p className="font-semibold capitalize">{roomType}</p>
              </div>
              <div>
                <span className="text-gray-600">Image Count:</span>
                <p className="font-semibold">{panoramaCount} panoramas</p>
              </div>
              <div>
                <span className="text-gray-600">Format:</span>
                <p className="font-semibold">Matterport Skybox JPG</p>
              </div>
              <div>
                <span className="text-gray-600">Resolution:</span>
                <p className="font-semibold">High Definition</p>
              </div>
            </div>
          </div>

          {/* Sample Image Preview */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
            <ImageIcon className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <h4 className="font-semibold text-blue-800 mb-2">360° Panoramic Views</h4>
            <p className="text-sm text-blue-600 mb-4">
              High-resolution Matterport panoramic images captured from multiple angles within the room
            </p>
            <div className="flex gap-2 justify-center">
              <Button size="sm" variant="outline" onClick={handleOpenDrive} className="bg-white">
                <Folder className="h-4 w-4 mr-2" />
                View All Images
              </Button>
              <Button size="sm" variant="outline" className="bg-white">
                <Download className="h-4 w-4 mr-2" />
                Download Folder
              </Button>
            </div>
          </div>

          {/* Technical Details */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-700 mb-3">Technical Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">File Naming:</span>
                <p className="font-mono text-xs">tsmq1wak12rhgn0mawksxcwcd_*_skybox.jpg</p>
              </div>
              <div>
                <span className="text-gray-600">Source:</span>
                <p className="font-semibold">Matterport Pro2 Camera</p>
              </div>
              <div>
                <span className="text-gray-600">Processing:</span>
                <p className="font-semibold">AI-Enhanced Stitching</p>
              </div>
              <div>
                <span className="text-gray-600">Storage:</span>
                <p className="font-semibold">Google Drive Cloud</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Update the RoomPanoramaGrid to include Room 4 with gallery images
export function RoomPanoramaGrid() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Room Panoramic Image Collections</h2>
        <p className="text-gray-600">Access high-resolution 360° panoramic images for rooms 1-4</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <GoogleDrivePanorama roomNumber="1" roomType="hallway" driveUrl={ROOM_DRIVE_URLS["1"]} panoramaCount={2} />
        <GoogleDrivePanorama roomNumber="2" roomType="patio" driveUrl={ROOM_DRIVE_URLS["2"]} panoramaCount={4} />
        <GoogleDrivePanorama
          roomNumber="3"
          roomType="bathroom"
          driveUrl={ROOM_DRIVE_URLS["3"]}
          panoramaCount={4}
          coverImage="/images/room3-bathroom.png"
        />
        <GoogleDrivePanorama
          roomNumber="4"
          roomType="bedroom"
          driveUrl={ROOM_DRIVE_URLS["4"]}
          panoramaCount={5} // CORRECTED: Actual count from CSV file
          coverImage="/images/room4-bedroom-1.png"
        />
      </div>

      {/* Room 4 Bedroom Gallery */}
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <ImageIcon className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-purple-800 mb-2">Room 4 - Bedroom (Complete Data & Gallery)</h3>
              <div className="text-sm text-purple-700 space-y-1">
                <p>
                  • <strong>Area:</strong> 19.12 sqm • <strong>Volume:</strong> 38.78 m³ • <strong>Height:</strong>{" "}
                  2.41m
                </p>
                <p>
                  • <strong>Features:</strong> 1 window, 1 ceiling light, carpet flooring, drywall walls, air
                  conditioning
                </p>
                <p>
                  • <strong>Panoramas:</strong> 5 high-resolution 360° views available in Google Drive
                </p>
                <p>
                  • <strong>Gallery:</strong> 2 professional bedroom photos showing different angles
                </p>
              </div>
            </div>
          </div>

          {/* Bedroom Gallery */}
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src="/images/room4-bedroom-1.png"
                alt="Room 4 Bedroom - View 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src="/images/room4-bedroom-2.jpeg"
                alt="Room 4 Bedroom - View 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Room 3 Highlight */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <ImageIcon className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-800 mb-2">Room 3 - Bathroom (Complete Data)</h3>
              <div className="text-sm text-green-700 space-y-1">
                <p>
                  • <strong>Area:</strong> 4.25 sqm • <strong>Volume:</strong> 9.19 m³ • <strong>Height:</strong> 2.16m
                </p>
                <p>
                  • <strong>Features:</strong> 1 window, 1 ceiling light, tile flooring, plaster walls
                </p>
                <p>
                  • <strong>Panoramas:</strong> 4 high-resolution 360° views available in Google Drive
                </p>
                <p>
                  • <strong>Condition:</strong> Excellent - no damage detected in any surface
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Rooms Notice */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Folder className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Additional Rooms (5-14)</h3>
              <div className="text-sm text-yellow-700 space-y-1">
                <p>• Rooms 5-14 contain detailed measurement and specification data</p>
                <p>• Panoramic images for these rooms are available through the property tour system</p>
                <p>• Access individual room details through the Room Insights tab</p>
                <p>• Total property contains 14 rooms with comprehensive data coverage</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <ExternalLink className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Accessing Panoramic Images</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p>• Click "Open Drive" to access the full collection of panoramic images</p>
                <p>• Images are stored in high-resolution Matterport skybox format</p>
                <p>• Each room contains multiple 360° viewpoints for comprehensive coverage</p>
                <p>• Download individual images or entire folders for offline use</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
