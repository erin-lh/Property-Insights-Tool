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

interface EmbeddedPanoramaProps {
  roomNumber: string
  roomType: string
  panoramaImages?: string[]
  panoramaCount: number
  source: string
}

function EmbeddedPanorama({ roomNumber, roomType, panoramaImages = [], panoramaCount, source }: EmbeddedPanoramaProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const formatRoomType = (type: string) => {
    return type
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const hasImages = panoramaImages.length > 0

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Panorama Preview */}
      <div className="aspect-video bg-gray-100 relative">
        {hasImages ? (
          <img
            src={panoramaImages[0] || "/placeholder.svg"}
            alt={`Room ${roomNumber} - ${formatRoomType(roomType)} 360° View`}
            className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setSelectedImage(panoramaImages[0])}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No panoramic images available</p>
            </div>
          </div>
        )}

        {/* Panorama Count Badge */}
        {panoramaCount > 0 && (
          <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
            {panoramaCount} views
          </div>
        )}
      </div>

      {/* Room Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">
          Room {roomNumber}: {formatRoomType(roomType)}
        </h3>
        <p className="text-sm text-gray-600 mb-2">Source: {source}</p>

        {hasImages && (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setSelectedImage(panoramaImages[0])} className="text-xs">
              View 360°
            </Button>
            {panoramaImages.length > 1 && (
              <Button size="sm" variant="outline" className="text-xs bg-transparent">
                View All ({panoramaImages.length})
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Modal for full-size panorama */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-full">
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="360° Panoramic View"
              className="max-w-full max-h-full object-contain"
            />
            <Button
              variant="outline"
              size="sm"
              className="absolute top-4 right-4 bg-white"
              onClick={() => setSelectedImage(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

const ROOM_DATA = {
  "1": {
    type: "hallway",
    panoramaCount: 2,
    panoramaImages: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%201-%20Pano%201.jpg-WLLUUFwjKVMeOIgjQrogLGoAOrqQQk.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%201-%20Pano%202.jpg.jpg-Kdk5JO9RxikhkYCPJK3f6ejijcb8J1.jpeg",
    ],
  },
  "2": {
    type: "patio",
    panoramaCount: 5,
    panoramaImages: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%202-%20pano%201.jpg-7vVHTvsOQxjDU2zya2W1jQfDVotfSp.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%202-%20pano%202.jpg-j8ZRK8FWH8m0YjOvobGPNyl1e1o0Pq.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%202-%20pano%203.jpg-9WlJc1Piu8tUHzWxcjRSU85eLNkVem.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%202-%20pano%205.jpg-E7U8EUjzqeB19ATFjrNS2GxcGeuHTt.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%202-%20pano%204.jpg-fh2vPh1ECaODut06CW7WXwqoV7HhWt.jpeg",
    ],
  },
  "3": {
    type: "bathroom",
    panoramaCount: 4,
    panoramaImages: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_3m54yff1z7crxaywd8if9rb0d_983x6xg3ixwh2n54sdw8k76ad_skybox.jpg-DybvROpI27IWHSdHb2KCEVDQKjA8sw.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_3m54yff1z7crxaywd8if9rb0d_mu9uxdez3ha971p08w8nqkn3a_skybox.jpg-0U773bQXctTFUI3oCYs4MjGGChlV4X.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_3m54yff1z7crxaywd8if9rb0d_xx97uf4cdb80cba9uy8u539rd_skybox.jpg-38W7KABIGlqKllAWl8riaQGzo8HHg2.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_3m54yff1z7crxaywd8if9rb0d_m4rcxhtirqgqh9enyg9zy5pyd_skybox.jpg-qTthxDlQMoEP0VTeF87su16QkDKGzg.jpeg",
    ],
  },
  "4": {
    type: "master bedroom",
    panoramaCount: 5,
    panoramaImages: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_bcmacw08fqdi7acr9x6shfi4b_skybox.jpg-fsUN4KHF3Ave2J76VIl49FVVJwyFnh.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_3ax98exw84easbammy1kdy59a_skybox.jpg-8q3pEN2vs0zn7UPO1QDUoQoFcoTQB9.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_yq3ye9yehkru7142z65q2acwa_skybox.jpg-A1K49g6osUSUpFF5NwMUM3JY7HqRxt.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_n62yt7zbfe8gbthibrauparaa_skybox.jpg-Z0JJ2kLwXejM19pfvYzEQtuNr4Reiv.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_q30i0t1qaqnm9w9ahabpw94qd_skybox.jpg-Dl7Zn5dyH3MEVoBEnMqHnLX8fTAASe.jpeg",
    ],
  },
  "5": {
    type: "living room",
    panoramaCount: 13,
    panoramaImages: [
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_k2zwk015t51gw99zpztx4egaa_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_ecdy23xprhp3q3f0rth5c5hac_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_5wza109uxdtiah3khz7teiwna_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_txkwf277fq24hepe3gi002nfa_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_tx5m3eudcum0iigcxbu2rpbka_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_udkrwr2wfte2anpi6taw68ycb_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_wds8heu9aarna9tk8t9s9ygwc_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_yehgh6y0ztzq71b0dckb5795d_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_aq8zqxp329yhkc290pzgm9h3b_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_uf6ssx7puqskhh5dibe1tp8aa_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_37r3c3nk8ud8rkpb9a28eyd1a_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_cr857sqay5qbzbe8xdx784acb_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_m96rn180d4f690kwy89umae0c_skybox.jpg",
    ],
  },
  "6": { type: "bedroom", panoramaCount: 0, panoramaImages: [] },
  "7": { type: "bathroom", panoramaCount: 0, panoramaImages: [] },
  "8": { type: "bedroom", panoramaCount: 0, panoramaImages: [] },
  "9": { type: "bedroom", panoramaCount: 0, panoramaImages: [] },
  "10": { type: "bedroom", panoramaCount: 0, panoramaImages: [] },
  "11": { type: "bedroom", panoramaCount: 0, panoramaImages: [] },
  "12": { type: "bedroom", panoramaCount: 0, panoramaImages: [] },
  "13": { type: "bedroom", panoramaCount: 0, panoramaImages: [] },
}

export function RoomPanoramaGrid() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">360° Panoramic Images</h2>
        <p className="text-gray-600">High-resolution panoramic views for all property rooms</p>
      </div>

      {/* All rooms with embedded panoramic previews */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">All Rooms (Embedded Panoramic Views)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* All rooms 1-13 */}
          {Object.entries(ROOM_DATA).map(([roomNumber, roomData]) => (
            <EmbeddedPanorama
              key={roomNumber}
              roomNumber={roomNumber}
              roomType={roomData.type}
              panoramaImages={roomData.panoramaImages}
              panoramaCount={roomData.panoramaCount}
              source="Matterport Pro2 Camera"
            />
          ))}
        </div>
      </div>

      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <ImageIcon className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">360° Panoramic Image Information</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p>• Rooms 1-5: Embedded panoramic views with clickable previews</p>
                <p>• Room 5: 13 high-resolution embedded panoramic views available</p>
                <p>• Rooms 6-13: Panoramic data collection in progress</p>
                <p>• All images captured using Matterport Pro2 Camera technology</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
