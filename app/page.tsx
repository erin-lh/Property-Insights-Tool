"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { type PropertyData, type RoomData, parseCSVData, parseCSVDataWithAllRooms } from "@/lib/data-parser"
import { Home, BarChart3, Package, FileText, Bed, Bath, Car, Ruler, Download, ArrowLeft } from "lucide-react"
import { RoomDetailModal } from "@/components/room-detail-modal"
import { OverviewTab } from "@/components/tabs/overview-tab"
import { RoomInsightsTab } from "@/components/tabs/room-insights-tab"
import { AssetsTab } from "@/components/tabs/assets-tab"
import { ReportsTab } from "@/components/tabs/reports-tab"
import { SearchPage } from "@/components/search-page"
import Image from "next/image"

export default function PropertyInsightsTool() {
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showRoomDetail, setShowRoomDetail] = useState(false)
  const [showSearch, setShowSearch] = useState(true)
  const [selectedAddress, setSelectedAddress] = useState<string>("")
  const [activeTab, setActiveTab] = useState<string>("overview")

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tabParam = urlParams.get("tab")

    if (tabParam) {
      setShowSearch(false)
      setActiveTab(tabParam)
      setSelectedAddress("3 Bellavista Terrace, Paddington, QLD") // Default property for tab navigation
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Attempting to fetch property data...")
        const response = await fetch("/data/property-data.csv", {
          method: "GET",
          headers: {
            "Content-Type": "text/csv",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const csvText = await response.text()

        if (!csvText || csvText.trim().length === 0) {
          throw new Error("CSV file is empty or could not be read")
        }

        console.log("CSV data loaded successfully, parsing...")

        // Try to use the enhanced parser with all rooms
        try {
          const parsedData = await parseCSVDataWithAllRooms(csvText)
          setPropertyData(parsedData)
          console.log("Successfully parsed data with all rooms")
        } catch (error) {
          console.warn("Failed to load all rooms data, using basic parser:", error)
          try {
            const parsedData = await parseCSVData(csvText)
            setPropertyData(parsedData)
            console.log("Successfully parsed data with basic parser")
          } catch (basicError) {
            console.error("Both parsers failed:", basicError)
            // Set to null to indicate error state
            setPropertyData(null)
          }
        }
      } catch (error) {
        console.error("Error fetching property data:", error)
        // Set to null to indicate error state
        setPropertyData(null)
      } finally {
        setLoading(false)
      }
    }

    if (!showSearch) {
      fetchData()
    } else {
      setLoading(false)
    }
  }, [showSearch])

  const handlePropertySelect = (address: string) => {
    setSelectedAddress(address)
    setShowSearch(false)
  }

  const handleBackToSearch = () => {
    setShowSearch(true)
    setSelectedAddress("")
  }

  const handleRoomClick = (room: RoomData) => {
    setSelectedRoom(room)
    setShowRoomDetail(true)
  }

  if (showSearch) {
    return <SearchPage onPropertySelect={handlePropertySelect} />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property data...</p>
        </div>
      </div>
    )
  }

  if (!propertyData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Property Data</p>
        </div>
      </div>
    )
  }

  // Clean address by removing quotes
  const cleanAddress = propertyData.address.replace(/"/g, "")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Enhanced Header - CORRECTED DATA DISPLAY */}
        <div className="mb-8">
          <Card className="bg-white shadow-sm border-0 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBackToSearch}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Search
                  </Button>
                  <Image
                    src="/images/little-hinges-logo.png"
                    alt="Little Hinges Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                  <h1 className="text-xl font-semibold text-gray-900">Little Hinges Property Insights</h1>
                </div>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Export Data
                </Button>
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{cleanAddress}</h2>
                <div className="flex items-center justify-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700 font-medium">{propertyData.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">3 bath</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">1 car</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">{Math.round(propertyData.totalArea)} sqm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">13 rooms</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">$1,340,589</div>
                  <div className="text-sm text-gray-500">Est. Value</div>
                  <div className="text-sm text-gray-400 mt-1">
                    Last Sale: ${propertyData.lastSalePrice.toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
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
                    value="room-insights"
                    className="flex items-center gap-2 data-[state=active]:bg-gray-100 rounded-xl py-3"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Room Insights
                  </TabsTrigger>
                  <TabsTrigger
                    value="assets"
                    className="flex items-center gap-2 data-[state=active]:bg-gray-100 rounded-xl py-3"
                  >
                    <Package className="h-4 w-4" />
                    Assets
                  </TabsTrigger>
                  <TabsTrigger
                    value="reports"
                    className="flex items-center gap-2 data-[state=active]:bg-gray-100 rounded-xl py-3"
                  >
                    <FileText className="h-4 w-4" />
                    Reports
                  </TabsTrigger>
                </TabsList>
              </CardContent>
            </Card>
          </div>

          <TabsContent value="overview">
            <OverviewTab propertyData={propertyData} />
          </TabsContent>

          <TabsContent value="room-insights">
            <RoomInsightsTab />
          </TabsContent>

          <TabsContent value="assets">
            <AssetsTab propertyData={propertyData} />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsTab />
          </TabsContent>
        </Tabs>

        {/* Room Detail Modal */}
        <RoomDetailModal
          room={
            selectedRoom
              ? {
                  id: selectedRoom.id,
                  name: selectedRoom.name || "Unknown Room",
                  type: selectedRoom.type,
                  area: selectedRoom.area,
                  condition: "Good", // Default value since RoomData doesn't have condition
                  features: [], // Default empty array since RoomData doesn't have features
                  hasSheetData: false,
                }
              : null
          }
          isOpen={showRoomDetail}
          onClose={() => setShowRoomDetail(false)}
        />
      </div>
    </div>
  )
}
