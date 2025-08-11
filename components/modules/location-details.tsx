'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { type PropertyData } from '@/lib/data-parser'
import { MapPin, Calendar, Upload, RotateCcw, FileText, Camera } from 'lucide-react'
import Image from 'next/image'

interface LocationDetailsProps {
  propertyData?: PropertyData
}

export function LocationDetails({ propertyData }: LocationDetailsProps) {
  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          Location Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Street Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">Street Address</span>
            <Badge variant="outline" className="bg-white">3 Bellavista Terrace</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">Suburb</span>
            <Badge variant="outline" className="bg-white">PADDINGTON</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">State</span>
            <Badge variant="outline" className="bg-white">QLD</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">Postcode</span>
            <Badge variant="outline" className="bg-white">4064</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">LGA</span>
            <Badge variant="outline" className="bg-white">City of Brisbane; (Paddington Ward)</Badge>
          </div>
        </div>

        {/* Map */}
        <div className="space-y-3">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ipnf2XodU88pDi12N9n3ebe9nz8PLk.png"
              alt="Property Location Map"
              width={600}
              height={400}
              className="w-full h-64 object-cover"
            />
          </div>
        </div>

        {/* Scan Information */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800 flex items-center gap-2">
            <Camera className="h-4 w-4 text-blue-600" />
            Scan Information
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Scan Date</span>
              </div>
              <div className="text-gray-900">2025-07-24 09:30:00PM UTC</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Scan Purpose</span>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Residential</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Upload className="h-4 w-4" />
              <span className="font-medium">Upload Time</span>
            </div>
            <div className="text-gray-900">2025-07-24 12:12:52PM</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <RotateCcw className="h-4 w-4" />
                <span className="font-medium">Scan Type</span>
              </div>
              <div className="text-gray-900">Original</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Multiple Scans</span>
              </div>
              <div className="text-gray-900">Additional space- carport</div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-gray-200">
            <h5 className="font-medium text-gray-700">Tour Details</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">Tour ID:</span>
                <Badge variant="outline" className="bg-white">ZUCRWEgFkxk</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">Property ID:</span>
                <Badge variant="outline" className="bg-white">25763</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
