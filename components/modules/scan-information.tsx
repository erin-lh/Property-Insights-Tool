"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PropertyData } from "@/lib/data-parser"
import { Info, Calendar, Camera, Upload, Target } from 'lucide-react'

interface ScanInformationProps {
  propertyData: PropertyData | null
}

export function ScanInformation({ propertyData }: ScanInformationProps) {
  // Add null check and loading state
  if (!propertyData) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-AU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  const getScanPurposeColor = (purpose: string) => {
    switch (purpose.toLowerCase()) {
      case 'residential_sales':
        return 'bg-blue-100 text-blue-800'
      case 'commercial':
        return 'bg-green-100 text-green-800'
      case 'rental':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getScanPurposeLabel = (purpose: string) => {
    return purpose.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-600" />
          Scan Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Scan Details */}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Upload Time</span>
            </div>
            <span className="text-sm text-gray-700">{formatDate(propertyData.uploadTime)}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Scanned Date</span>
            </div>
            <span className="text-sm text-gray-700">{formatDate(propertyData.scannedDate)}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Scan Purpose</span>
            </div>
            <Badge variant="secondary" className={getScanPurposeColor(propertyData.scanPurpose)}>
              {getScanPurposeLabel(propertyData.scanPurpose)}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Scan Type</span>
            </div>
            <span className="text-sm text-gray-700">
              {propertyData.rescanOrOriginal === 'No' ? 'Original Scan' : 'Rescan'}
            </span>
          </div>
        </div>

        {/* Additional Scan Info */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-medium text-gray-900 mb-2">Scan Details</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tour ID:</span>
              <span className="font-mono text-gray-900">{propertyData.matterportTourId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Property ID:</span>
              <span className="font-mono text-gray-900">{propertyData.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Multiple Scans:</span>
              <span className="text-gray-900">{propertyData.multipleScans}</span>
            </div>
          </div>
        </div>

        {/* Scan Quality Indicators */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-medium text-gray-900 mb-3">Scan Quality</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">{propertyData.panoramaCount}</div>
              <div className="text-xs text-green-700">Panoramas</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{propertyData.rooms.length}</div>
              <div className="text-xs text-blue-700">Rooms Mapped</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
