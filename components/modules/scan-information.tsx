"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PropertyData } from "@/lib/data-parser"
import { Camera, Calendar, Target, RotateCcw } from "lucide-react"

interface ScanInformationProps {
  propertyData: PropertyData
}

export function ScanInformation({ propertyData }: ScanInformationProps) {
  // Format dates for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-AU", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return dateString
    }
  }

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Camera className="h-5 w-5 text-purple-600" />
          Scan Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Scan Dates */}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Upload Time</span>
            </div>
            <span className="text-sm text-gray-600">{formatDate(propertyData.uploadTime)}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Scanned Date</span>
            </div>
            <span className="text-sm text-gray-600">{formatDate(propertyData.scannedDate)}</span>
          </div>
        </div>

        {/* Scan Details */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-gray-600" />
            Scan Details
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Scan Purpose</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {propertyData.scanPurpose.replace(/_/g, " ")}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Scan Type</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {propertyData.rescanOrOriginal === "No" ? "Original" : "Rescan"}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Multiple Scans</span>
              <span className="text-sm text-gray-600">{propertyData.multipleScans}</span>
            </div>
          </div>
        </div>

        {/* Tour Information */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-gray-600" />
            Virtual Tour
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-gray-500">Tour ID</div>
              <div className="font-medium text-gray-900 font-mono text-xs">{propertyData.matterportTourId}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-500">Property ID</div>
              <div className="font-medium text-gray-900 font-mono text-xs">{propertyData.id}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
