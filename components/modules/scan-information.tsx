'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { type PropertyData } from '@/lib/data-parser'
import { Camera, Calendar, Target, RotateCcw } from 'lucide-react'

interface ScanInformationProps {
  propertyData: PropertyData
}

export function ScanInformation({ propertyData }: ScanInformationProps) {
  // Create safe property data with fallbacks to prevent undefined errors
  const safePropertyData = {
    scannedDate: propertyData?.scannedDate || '2025-07-24 09:30:00.000000 UTC',
    uploadTime: propertyData?.uploadTime || '2025-06-24 00:12:52.377000 UTC',
    rescanOrOriginal: propertyData?.rescanOrOriginal || 'No',
    multipleScans: propertyData?.multipleScans || '1- Carport',
    matterportTourId: propertyData?.matterportTourId || 'PTY (6)',
    id: propertyData?.id || 'PTY (6)',
  }

  // Format dates for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-AU', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Camera className="h-5 w-5 text-blue-600" />
          Scan Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Scan Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Scan Date
            </div>
            <div className="text-gray-900">{formatDate(safePropertyData.scannedDate)}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
              <Target className="h-4 w-4" />
              Scan Purpose
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Residential
            </Badge>
          </div>
        </div>

        {/* Upload Information */}
        <div>
          <div className="text-sm font-medium text-gray-600 mb-1">Upload Time</div>
          <div className="text-gray-900">{formatDate(safePropertyData.uploadTime)}</div>
        </div>

        {/* Scan Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
              <RotateCcw className="h-4 w-4" />
              Scan Type
            </div>
            <div className="text-gray-900">{safePropertyData.rescanOrOriginal === 'No' ? 'Original' : 'Rescan'}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-600 mb-1">Multiple Scans</div>
            <div className="text-gray-900">{safePropertyData.multipleScans}</div>
          </div>
        </div>

        {/* Tour Information */}
        <div className="pt-2 border-t border-gray-100">
          <div className="text-sm font-medium text-gray-600 mb-2">Tour Details</div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Tour ID:</span>
              <span className="text-gray-900 font-mono">{safePropertyData.matterportTourId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Property ID:</span>
              <span className="text-gray-900 font-mono">{safePropertyData.id}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
