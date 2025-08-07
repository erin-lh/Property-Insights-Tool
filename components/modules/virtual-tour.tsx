"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { PropertyData } from "@/lib/data-parser"
import { Play, Eye, Clock, Users, Camera, ExternalLink } from 'lucide-react'

interface VirtualTourProps {
  propertyData: PropertyData | null
}

export function VirtualTour({ propertyData }: VirtualTourProps) {
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

  const tourStats = [
    {
      icon: <Eye className="h-4 w-4 text-blue-600" />,
      label: "Total Views",
      value: propertyData.views.toLocaleString(),
      change: "+12%"
    },
    {
      icon: <Clock className="h-4 w-4 text-green-600" />,
      label: "Avg Session",
      value: `${Math.round(propertyData.avgSessionTime)}s`,
      change: "+8%"
    },
    {
      icon: <Users className="h-4 w-4 text-purple-600" />,
      label: "Engaged Visitors",
      value: propertyData.engagedVisitors.toString(),
      change: "+15%"
    },
    {
      icon: <Camera className="h-4 w-4 text-orange-600" />,
      label: "Panoramas",
      value: propertyData.panoramaCount.toString(),
      change: "Complete"
    }
  ]

  const handleViewTour = () => {
    // Open Matterport tour in new window
    const tourUrl = `https://my.matterport.com/show/?m=${propertyData.matterportTourId}`
    window.open(tourUrl, '_blank')
  }

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Play className="h-5 w-5 text-green-600" />
          Virtual Tour Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tour Stats */}
        <div className="grid grid-cols-2 gap-3">
          {tourStats.map((stat, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                {stat.icon}
                <span className="text-xs text-gray-600">{stat.label}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                  {stat.change}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Tour Details */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tour ID:</span>
            <span className="font-mono text-gray-900">{propertyData.matterportTourId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Daily Average Views:</span>
            <span className="text-gray-900">{propertyData.avgDailyViews.toFixed(1)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Engaged Inspections:</span>
            <span className="text-gray-900">{propertyData.engagedInspections}</span>
          </div>
        </div>

        {/* View Tour Button */}
        <div className="pt-4 border-t border-gray-100">
          <Button 
            onClick={handleViewTour}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <ExternalLink className="h-4 w-4" />
            View 3D Virtual Tour
          </Button>
        </div>

        {/* Performance Insights */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-medium text-gray-900 mb-2">Performance Insights</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <p>• High engagement rate with {propertyData.engagedVisitors} engaged visitors</p>
            <p>• Above average session time indicates strong interest</p>
            <p>• Comprehensive {propertyData.panoramaCount} panorama coverage</p>
            <p>• Consistent daily viewing activity</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
