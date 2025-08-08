'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, Upload, RotateCcw, Copy, Building } from 'lucide-react'
import { type PropertyData } from '@/lib/data-parser'

interface LocationDetailsProps {
  propertyData?: PropertyData
}

export function LocationDetails({ propertyData }: LocationDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Street Address</span>
            <span className="text-sm text-muted-foreground">3 Bellavista Terrace</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Suburb</span>
            <span className="text-sm text-muted-foreground">PADDINGTON</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">State</span>
            <span className="text-sm text-muted-foreground">QLD</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Postcode</span>
            <span className="text-sm text-muted-foreground">4064</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">LGA</span>
            <span className="text-sm text-muted-foreground">City of Brisbane; (Paddington Ward)</span>
          </div>
        </div>

        {/* Map */}
        <div className="mt-6 mb-6">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ipnf2XodU88pDi12N9n3ebe9nz8PLk.png" 
            alt="Property location map showing Paddington area in Brisbane" 
            className="w-full h-64 object-cover rounded-lg border"
          />
        </div>

        {/* Scan Information */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 mb-4">
            <Building className="h-5 w-5" />
            <h3 className="font-semibold">Scan Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm font-medium">Scan Date</span>
              </div>
              <p className="text-sm text-muted-foreground">24 July 2025, 07:30 pm</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span className="text-sm font-medium">Scan Purpose</span>
              </div>
              <Badge variant="secondary">Residential</Badge>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span className="text-sm font-medium">Upload Time</span>
            </div>
            <p className="text-sm text-muted-foreground">24 June 2025, 10:12 am</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                <span className="text-sm font-medium">Scan Type</span>
              </div>
              <p className="text-sm text-muted-foreground">Original</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span className="text-sm font-medium">Multiple Scans</span>
              </div>
              <p className="text-sm text-muted-foreground">1- Carport</p>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium mb-2">Tour Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Tour ID:</span>
                <span className="text-sm text-muted-foreground">ZUCRWEgFkxk</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Property ID:</span>
                <span className="text-sm text-muted-foreground">25763</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
