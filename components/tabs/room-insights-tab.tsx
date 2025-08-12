"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Eye,
  BarChart3,
  Home,
  Wrench,
  Palette,
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Database,
  Camera,
  Package,
  Ruler,
} from "lucide-react"
import Link from "next/link"
import { refreshSheetData } from "@/lib/data-parser"

export function RoomInsightsTab() {
  const [selectedRooms, setSelectedRooms] = useState<string[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const propertyData = {
    rooms: [
      {
        id: "1",
        name: "Room 1: Hallway",
        roomId: "19ab05tns5h6y4qm42esqqpea",
        panoramaIds: ["9atk8hw6bpr2kixswfbit6kya", "71mwb6u62ih98rhx2bwyc8b8b"],
        panoramaLinks: [
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_19ab05tns5h6y4qm42esqqpea_9atk8hw6bpr2kixswfbit6kya_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_19ab05tns5h6y4qm42esqqpea_71mwb6u62ih98rhx2bwyc8b8b_skybox.jpg",
        ],
        roomType: "hallway",
        area: "2.47 m²",
        volume: "5.98 m³",
        depth: "2.23 m",
        height: "2.42 m",
        width: "0.88 m",
        condition: "Good",
        temperature: "22°C",
        humidity: "45%",
        hasSheetData: true,
        roomValuation: "$7,171.29",
        smokeAlarmCount: 1,
        floorDamage: "No",
        ceilingDamage: "No",
        wallDamage: "No",
        windowCount: 0,
        ceilingLightCount: 2,
        ceilingFanCount: 0,
        airConditioningCount: 0,
        specifications: {
          floorArea: "2.47 m²",
          ceilingHeight: "2.42 m",
          wallArea: "41.0 m²",
          windowArea: "0 m²",
          doorArea: "3.5 m²",
          depth: "2.23 m",
          width: "0.88 m",
          volume: "5.98 m³",
        },
        materials: {
          flooring: "Carpet",
          walls: "Drywall",
          ceiling: "Flat",
          windows: "None",
          doors: "Timber",
          windowCover: "Other",
        },
        features: [
          { name: "Smoke Alarm", status: "installed", icon: "shield", count: 1 },
          { name: "Ceiling Lights", status: "installed", icon: "lightbulb", count: 2 },
          { name: "Ceiling Fan", status: "none", icon: "wind", count: 0 },
          { name: "Air Conditioning", status: "none", icon: "snowflake", count: 0 },
          { name: "Windows", status: "none", icon: "square", count: 0 },
        ],
        damage: {
          floor: "No",
          ceiling: "No",
          walls: "No",
        },
      },
      {
        id: "2",
        name: "Room 2: Patio",
        roomId: "2qdmc5i9byxi79ry1pxdkqzea",
        panoramaIds: [
          "zibi0h0ges2t5dxryrb7800wd",
          "cct379k0f1t6gnmuutm23i4ac",
          "mw5ymdiqgmkaiasgdiksy3i5a",
          "pxk5thts3iiwc5azq4drsitfc",
        ],
        panoramaLinks: [
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_zibi0h0ges2t5dxryrb7800wd_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_cct379k0f1t6gnmuutm23i4ac_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_mw5ymdiqgmkaiasgdiksy3i5a_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_pxk5thts3iiwc5azq4drsitfc_skybox.jpg",
        ],
        roomType: "patio",
        area: "5.01 m²",
        volume: "13.61 m³",
        depth: "2.17 m",
        height: "2.72 m",
        width: "1.58 m",
        condition: "Good",
        temperature: "24°C",
        humidity: "50%",
        hasSheetData: true,
        roomValuation: "$14,046.71",
        smokeAlarmCount: 0,
        floorDamage: "No",
        ceilingDamage: "No",
        wallDamage: "No",
        windowCount: 2,
        doorCount: 1,
        ceilingLightCount: 2,
        ceilingLightType: "Recessed",
        ceilingFanCount: 0,
        airConditioningCount: 0,
        specifications: {
          floorArea: "5.01 m²",
          ceilingHeight: "2.72 m",
          wallArea: "15.2 m²",
          windowArea: "4.5 m²",
          doorArea: "2.1 m²",
          depth: "2.17 m",
          width: "1.58 m",
          volume: "13.61 m³",
        },
        materials: {
          flooring: "Tile",
          walls: "Concrete",
          ceiling: "Metal",
          windows: "None",
          doors: "Timber",
          windowCover: "None",
        },
        features: [
          { name: "Smoke Alarm", status: "none", icon: "shield", count: 0 },
          { name: "Ceiling Lights", status: "installed", icon: "lightbulb", count: 2 },
          { name: "Ceiling Fan", status: "none", icon: "wind", count: 0 },
          { name: "Air Conditioning", status: "none", icon: "snowflake", count: 0 },
          { name: "Windows", status: "installed", icon: "square", count: 2 },
          { name: "Doors", status: "installed", icon: "door-open", count: 1 },
        ],
        damage: {
          floor: "No",
          ceiling: "No",
          walls: "No",
        },
      },
      {
        id: "3",
        name: "Room 3: Bathroom",
        area: "4.25 m²",
        volume: "9.19 m³",
        condition: "Good",
        temperature: "23°C",
        humidity: "55%",
        hasSheetData: true,
        specifications: {
          floorArea: "4.25 m²",
          ceilingHeight: "2.16 m",
          wallArea: "18.2 m²",
          windowArea: "0.8 m²",
          doorArea: "1.8 m²",
          depth: "2.04 m",
          width: "1.87 m",
          doors: "1",
          windows: "1",
        },
        materials: {
          flooring: "Tile",
          walls: "Plaster",
          ceiling: "Flat",
          windows: "Other",
          doors: "Timber",
        },
        features: [
          { name: "Ceiling Lights", status: "installed", icon: "lightbulb", count: 1 },
          { name: "Recessed Lighting", status: "installed", icon: "zap" },
          { name: "Natural Light", status: "good", icon: "sun" },
          { name: "Floor Damage", status: "yes (wear and tear)", icon: "alert-triangle" },
        ],
        damageAssessment: {
          floorDamage: "Yes (Wear and Tear)",
          ceilingDamage: "No",
          wallDamage: "No",
        },
        valuation: "$13,025.63",
      },
      {
        id: "4",
        name: "Room 4: Master Bedroom",
        area: "19.12 m²",
        volume: "38.78 m³",
        condition: "Good", // Updated Room 4 condition from Complete to Good
        temperature: "22°C",
        humidity: "45%",
        hasSheetData: true,
        valuation: "$56,428.32",
        panoramaCount: 7,
        specifications: {
          floorArea: "19.12 m²",
          ceilingHeight: "2.41 m",
          wallArea: "41.8 m²",
          windowArea: "2.8 m²",
          depth: "2.89 m",
          width: "5.85 m",
          windows: "1",
          doors: "5",
        },
        materials: {
          flooring: "Carpet",
          walls: "Drywall",
          ceiling: "Flat",
          windows: "Other",
          doors: "Multiple Access Points",
        },
        features: [
          { name: "Smoke Alarm", status: "installed", count: 1, icon: "shield-check" },
          { name: "Ceiling Lights", status: "installed", count: 2, icon: "lightbulb" },
          { name: "Ceiling Fan", status: "not-installed", count: 0, icon: "fan" },
          { name: "Air Conditioning", status: "installed", count: 1, icon: "snowflake" },
          { name: "Windows", status: "installed", count: 1, icon: "square" },
          { name: "Doors", status: "installed", count: 5, icon: "door-open" },
        ],
        damageAssessment: {
          floor: "No",
          walls: "No",
          ceiling: "No",
        },
        panoramaLinks: [
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_3ax98exw84easbammy1kdy59a_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_q30i0t1qaqnm9w9ahabpw94qd_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_bcmacw08fqdi7acr9x6shfi4b_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_n62yt7zbfe8gbthibrauparaa_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_yq3ye9yehkru7142z65q2acwa_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_37fty8w3n4tw0nkac909ri7pc_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_1hsznrxt775cdf5e5fr400crc_skybox.jpg",
        ],
      },
      {
        id: "5",
        name: "Room 5: Patio",
        area: "X m²",
        volume: "X m³",
        condition: "X",
        temperature: "X°C",
        humidity: "X%",
        hasSheetData: false,
        specifications: {
          floorArea: "X m²",
          ceilingHeight: "X m",
          wallArea: "X m²",
          windowArea: "X m²",
          doorArea: "X m²",
        },
        materials: {
          flooring: "Concrete",
          walls: "Brick",
          ceiling: "Open",
          windows: "None",
          doors: "Glass Sliding",
        },
        features: [
          { name: "Outdoor Space", status: "available", icon: "sun" },
          { name: "Weather Protection", status: "partial", icon: "umbrella" },
          { name: "Drainage", status: "adequate", icon: "droplets" },
          { name: "Privacy", status: "good", icon: "shield" },
        ],
      },
      {
        id: "6",
        name: "Room 6: Living room",
        area: "X m²",
        volume: "X m³",
        condition: "X",
        temperature: "X°C",
        humidity: "X%",
        hasSheetData: true,
        specifications: {
          floorArea: "X m²",
          ceilingHeight: "X m",
          wallArea: "X m²",
          windowArea: "X m²",
          doorArea: "X m²",
        },
        materials: {
          flooring: "Timber",
          walls: "Plasterboard",
          ceiling: "Plasterboard",
          windows: "Aluminium Frame",
          doors: "Timber",
        },
        features: [
          { name: "Natural Light", status: "good", icon: "sun" },
          { name: "Ventilation", status: "adequate", icon: "wind" },
          { name: "Electrical Outlets", status: "sufficient", icon: "zap" },
          { name: "Storage", status: "limited", icon: "archive" },
        ],
      },
      {
        id: "7",
        name: "Room 7: Hallway",
        area: "X m²",
        volume: "X m³",
        condition: "X",
        temperature: "X°C",
        humidity: "X%",
        hasSheetData: false,
        specifications: {
          floorArea: "X m²",
          ceilingHeight: "X m",
          wallArea: "X m²",
          windowArea: "X m²",
          doorArea: "X m²",
        },
        materials: {
          flooring: "Timber",
          walls: "Plasterboard",
          ceiling: "Plasterboard",
          windows: "Aluminium Frame",
          doors: "Timber",
        },
        features: [
          { name: "Natural Light", status: "limited", icon: "sun" },
          { name: "Ventilation", status: "adequate", icon: "wind" },
          { name: "Electrical Outlets", status: "sufficient", icon: "zap" },
          { name: "Storage", status: "none", icon: "archive" },
        ],
      },
      {
        id: "8",
        name: "Room 8: Living room/ Kitchen",
        area: "X m²",
        volume: "X m³",
        condition: "X",
        temperature: "X°C",
        humidity: "X%",
        hasSheetData: true,
        specifications: {
          floorArea: "X m²",
          ceilingHeight: "X m",
          wallArea: "X m²",
          windowArea: "X m²",
          doorArea: "X m²",
        },
        materials: {
          flooring: "Timber",
          walls: "Plasterboard",
          ceiling: "Plasterboard",
          windows: "Aluminium Frame",
          doors: "Timber",
        },
        features: [
          { name: "Natural Light", status: "excellent", icon: "sun" },
          { name: "Ventilation", status: "good", icon: "wind" },
          { name: "Kitchen Appliances", status: "modern", icon: "chef-hat" },
          { name: "Storage", status: "ample", icon: "archive" },
        ],
      },
      {
        id: "9",
        name: "Room 9: Bathroom",
        area: "X m²",
        volume: "X m³",
        condition: "X",
        temperature: "X°C",
        humidity: "X%",
        hasSheetData: false,
        specifications: {
          floorArea: "X m²",
          ceilingHeight: "X m",
          wallArea: "X m²",
          windowArea: "X m²",
          doorArea: "X m²",
        },
        materials: {
          flooring: "Ceramic Tiles",
          walls: "Ceramic Tiles",
          ceiling: "Plasterboard",
          windows: "Aluminium Frame",
          doors: "Timber",
        },
        features: [
          { name: "Ventilation Fan", status: "installed", icon: "fan" },
          { name: "Waterproofing", status: "good", icon: "shield" },
          { name: "Fixtures", status: "modern", icon: "wrench" },
          { name: "Storage", status: "adequate", icon: "archive" },
        ],
      },
      {
        id: "10",
        name: "Room 10: Hallway",
        area: "X m²",
        volume: "X m³",
        condition: "X",
        temperature: "X°C",
        humidity: "X%",
        hasSheetData: true,
        specifications: {
          floorArea: "X m²",
          ceilingHeight: "X m",
          wallArea: "X m²",
          windowArea: "X m²",
          doorArea: "X m²",
        },
        materials: {
          flooring: "Timber",
          walls: "Plasterboard",
          ceiling: "Plasterboard",
          windows: "Aluminium Frame",
          doors: "Timber",
        },
        features: [
          { name: "Natural Light", status: "limited", icon: "sun" },
          { name: "Ventilation", status: "adequate", icon: "wind" },
          { name: "Electrical Outlets", status: "sufficient", icon: "zap" },
          { name: "Storage", status: "none", icon: "archive" },
        ],
      },
      {
        id: "11",
        name: "Room 11: Bathroom",
        area: "X m²",
        volume: "X m³",
        condition: "X",
        temperature: "X°C",
        humidity: "X%",
        hasSheetData: false,
        specifications: {
          floorArea: "X m²",
          ceilingHeight: "X m",
          wallArea: "X m²",
          windowArea: "X m²",
          doorArea: "X m²",
        },
        materials: {
          flooring: "Ceramic Tiles",
          walls: "Ceramic Tiles",
          ceiling: "Plasterboard",
          windows: "Aluminium Frame",
          doors: "Timber",
        },
        features: [
          { name: "Ventilation Fan", status: "installed", icon: "fan" },
          { name: "Waterproofing", status: "good", icon: "shield" },
          { name: "Fixtures", status: "modern", icon: "wrench" },
          { name: "Storage", status: "adequate", icon: "archive" },
        ],
      },
      {
        id: "12",
        name: "Room 12: Bedroom",
        area: "X m²",
        volume: "X m³",
        condition: "X",
        temperature: "X°C",
        humidity: "X%",
        hasSheetData: true,
        specifications: {
          floorArea: "X m²",
          ceilingHeight: "X m",
          wallArea: "X m²",
          windowArea: "X m²",
          doorArea: "X m²",
        },
        materials: {
          flooring: "Carpet",
          walls: "Plasterboard",
          ceiling: "Plasterboard",
          windows: "Aluminium Frame",
          doors: "Timber",
        },
        features: [
          { name: "Natural Light", status: "good", icon: "sun" },
          { name: "Ventilation", status: "adequate", icon: "wind" },
          { name: "Built-in Wardrobe", status: "present", icon: "archive" },
          { name: "Electrical Outlets", status: "sufficient", icon: "zap" },
        ],
      },
      {
        id: "13",
        name: "Room 13: Bedroom",
        area: "X m²",
        volume: "X m³",
        condition: "X",
        temperature: "X°C",
        humidity: "X%",
        hasSheetData: true,
        specifications: {
          floorArea: "X m²",
          ceilingHeight: "X m",
          wallArea: "X m²",
          windowArea: "X m²",
          doorArea: "X m²",
        },
        materials: {
          flooring: "Carpet",
          walls: "Plasterboard",
          ceiling: "Plasterboard",
          windows: "Aluminium Frame",
          doors: "Timber",
        },
        features: [
          { name: "Natural Light", status: "good", icon: "sun" },
          { name: "Ventilation", status: "adequate", icon: "wind" },
          { name: "Built-in Wardrobe", status: "present", icon: "archive" },
          { name: "Electrical Outlets", status: "sufficient", icon: "zap" },
        ],
      },
    ],
  }

  // Combine original rooms with additional rooms
  const allRooms = [...propertyData.rooms]

  const handleRoomSelection = (roomId: string, checked: boolean) => {
    if (checked) {
      setSelectedRooms([...selectedRooms, roomId])
    } else {
      setSelectedRooms(selectedRooms.filter((id) => id !== roomId))
    }
  }

  const handleRefreshSheetData = async () => {
    setIsRefreshing(true)
    try {
      await refreshSheetData()
      // Optionally reload the page or refetch data
      window.location.reload()
    } catch (error) {
      console.error("Failed to refresh sheet data:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "excellent":
      case "good":
      case "modern":
      case "installed":
      case "present":
      case "available":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "adequate":
      case "sufficient":
      case "partial":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "limited":
      case "none":
      case "yes":
      case "yes (wear and tear)":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Room Insights</h2>
          <p className="text-gray-600">Comprehensive analysis of all property rooms</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleRefreshSheetData} disabled={isRefreshing} variant="outline" size="sm">
            {isRefreshing ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Database className="h-4 w-4 mr-2" />}
            {isRefreshing ? "Refreshing..." : "Refresh Data"}
          </Button>
        </div>
      </div>

      {/* Room Cards */}
      <div className="grid gap-4">
        {allRooms.map((room) => (
          <Card key={room.id} className="bg-white shadow-sm border-0 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={selectedRooms.includes(room.id)}
                    onCheckedChange={(checked) => handleRoomSelection(room.id, checked as boolean)}
                  />
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                      <Home className="h-5 w-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-800">{room.name}</h3>
                      {room.hasSheetData && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          <Database className="h-3 w-3" />
                          Complete
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{room.area}</div>
                        <div className="text-sm text-gray-600">Floor Area</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{room.volume}</div>
                        <div className="text-sm text-gray-600">Volume</div>
                      </div>
                      {room.valuation && (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{room.valuation}</div>
                          <div className="text-sm text-gray-600">Valuation</div>
                        </div>
                      )}
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{room.panoramaIds?.length || 0}</div>
                        <div className="text-sm text-gray-600">360° Views</div>
                      </div>
                    </div>

                    {/* Specifications */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Ruler className="h-4 w-4 text-gray-600" />
                        <span className="font-medium text-gray-800">Specifications</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ceiling Height:</span>
                          <span className="font-medium">{room.specifications?.ceilingHeight}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Wall Area:</span>
                          <span className="font-medium">{room.specifications?.wallArea}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Window Area:</span>
                          <span className="font-medium">{room.specifications?.windowArea}</span>
                        </div>
                        {room.specifications?.depth && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Depth:</span>
                            <span className="font-medium">{room.specifications.depth}</span>
                          </div>
                        )}
                        {room.specifications?.width && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Width:</span>
                            <span className="font-medium">{room.specifications.width}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Materials & Features */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Palette className="h-4 w-4 text-gray-600" />
                        <span className="font-medium text-gray-800">Materials & Features</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Flooring:</span>
                          <span className="font-medium">{room.materials?.flooring}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Walls:</span>
                          <span className="font-medium">{room.materials?.walls}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Windows:</span>
                          <span className="font-medium">{room.materials?.windows}</span>
                        </div>
                      </div>
                    </div>

                    {/* Installed Features */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Wrench className="h-4 w-4 text-gray-600" />
                        <span className="font-medium text-gray-800">Installed Features</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {room.features?.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            {getStatusIcon(feature.status)}
                            <span className="text-sm">
                              {feature.name}
                              {feature.count !== undefined && ` (${feature.count})`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-blue-800">Property Panoramas</p>
                        <p className="text-xs text-blue-600">{room.panoramaIds?.length || 0} available</p>
                        {room.panoramaLinks && room.panoramaLinks.length > 0 && (
                          <div className="mt-2">
                            <div className="flex gap-1 overflow-x-auto">
                              {room.panoramaLinks.slice(0, 3).map((link, index) => (
                                <div key={index} className="flex-shrink-0 w-12 h-8 rounded overflow-hidden bg-gray-100">
                                  <img
                                    src={link || "/placeholder.svg"}
                                    alt={`Panorama ${index + 1}`}
                                    className="w-full h-full object-cover cursor-pointer hover:opacity-80"
                                    onClick={() => window.open(link, "_blank")}
                                    onError={(e) => {
                                      const target = e.currentTarget
                                      target.src = `data:image/svg+xml;base64,${btoa(`
                                        <svg width="48" height="32" xmlns="http://www.w3.org/2000/svg">
                                          <rect width="48" height="32" fill="#f3f4f6"/>
                                          <text x="24" y="18" textAnchor="middle" fill="#9ca3af" fontSize="8">360°</text>
                                        </svg>
                                      `)}`
                                    }}
                                    onLoad={(e) => {
                                      const target = e.currentTarget
                                      if (target.naturalWidth === 0) {
                                        target.src = `data:image/svg+xml;base64,${btoa(`
                                          <svg width="48" height="32" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="48" height="32" fill="#f3f4f6"/>
                                            <text x="24" y="18" textAnchor="middle" fill="#9ca3af" fontSize="8">360°</text>
                                          </svg>
                                        `)}`
                                      }
                                    }}
                                  />
                                </div>
                              ))}
                              {room.panoramaLinks.length > 3 && (
                                <div className="flex-shrink-0 w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-600">
                                  +{room.panoramaLinks.length - 3}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Camera className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-green-800">Property Images</p>
                        <p className="text-xs text-green-600">Coming soon</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Package className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-purple-800">Contents</p>
                        <p className="text-xs text-purple-600">Coming soon</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/room/${room.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Summary */}
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Room Analytics Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">{allRooms.length}</div>
              <div className="text-sm text-blue-600">Total Rooms</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">
                {allRooms.filter((room) => room.hasSheetData).length}
              </div>
              <div className="text-sm text-green-600">With Complete Data</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">
                {allRooms.reduce((total, room) => total + (room.panoramaIds?.length || 0), 0)}
              </div>
              <div className="text-sm text-purple-600">360° Views</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-700">
                {allRooms.filter((room) => room.condition === "Good" || room.condition === "Excellent").length}
              </div>
              <div className="text-sm text-orange-600">Good Condition</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
