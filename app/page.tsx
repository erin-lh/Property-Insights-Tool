"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { type PropertyData, type RoomData, parseCSVData, parseCSVDataWithAllRooms } from "@/lib/data-parser"
import { fetchSheetsData, refreshSheetsData, mergeRoomsWithSheetsData, type SheetsApiResponse } from "@/lib/sheets-utils"
import { Home, BarChart3, Package, FileText, Bed, Bath, Car, Ruler, Download, ArrowLeft, RefreshCw } from "lucide-react"
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
  const [sheetsData, setSheetsData] = useState<SheetsApiResponse | null>(null)
  const [sheetsLoading, setSheetsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/property-data.csv")
        const csvText = await response.text()

        // Try to use the enhanced parser with all rooms
        try {
          const parsedData = await parseCSVDataWithAllRooms(csvText)
          setPropertyData(parsedData)
        } catch (error) {
          console.warn("Failed to load all rooms data, using basic parser:", error)
          const parsedData = parseCSVData(csvText)
          setPropertyData(parsedData)
        }

        // After property data is loaded, try to fetch Google Sheets data
        await loadSheetsData()
      } catch (error) {
        console.error("Error fetching property data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (!showSearch) {
      fetchData()
    }
  }, [showSearch])

  const loadSheetsData = async () => {
    setSheetsLoading(true)
    try {
      const response = await fetchSheetsData()
      setSheetsData(response)
      
      // Merge sheets data with property data if both are available
      if (response.success && propertyData) {
        const mergedRooms = mergeRoomsWithSheetsData(propertyData.rooms, response.data)
        setPropertyData(prev => prev ? { ...prev, rooms: mergedRooms } : null)
      }
    } catch (error) {
      console.error("Error loading sheets data:", error)
    } finally {
      setSheetsLoading(false)
    }
  }

  const handleRefreshSheets = async () => {
    setSheetsLoading(true)
    try {
      const response = await refreshSheetsData()
      setSheetsData(response)
      
      if (response.success && propertyData) {
        const mergedRooms = mergeRoomsWithSheetsData(propertyData.rooms, response.data)
        setPropertyData(prev => prev ? { ...prev, rooms: mergedRooms } : null)
        
        // Update selected room if it has new data
        if (selectedRoom) {
          const updatedRoom = mergedRooms.find(room => room.id === selectedRoom.id)
          if (updatedRoom) {
            setSelectedRoom(updatedRoom)
          }
        }
      }
    } catch (error) {
      console.error("Error refreshing sheets data:", error)
    } finally {
      setSheetsLoading(false)
    }
  }

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
        <p className="text-gray-600">Failed to load property data</p>
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
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleRefreshSheets}
                    disabled={sheetsLoading}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <RefreshCw className={`h-4 w-4 ${sheetsLoading ? 'animate-spin' : ''}`} />
                    {sheetsLoading ? 'Syncing...' : 'Sync Sheets'}
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Download className="h-4 w-4" />
                    Export Data
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{cleanAddress}</h2>
                <div className="flex items-center justify-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700 font-medium">{propertyData.propertyType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">{propertyData.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">2 bath</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">{propertyData.carSpaces} car</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">{Math.round(propertyData.totalArea)} sqm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">{propertyData.rooms.length} rooms</span>
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
        <Tabs defaultValue="overview" className="w-full">
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
          room={selectedRoom} 
          isOpen={showRoomDetail} 
          onClose={() => setShowRoomDetail(false)}
          onRefreshSheets={handleRefreshSheets}
        />
      </div>
    </div>
  )
}
