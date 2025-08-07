"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, ChevronDown, ChevronUp, Calendar, FileIcon as FileSize } from 'lucide-react'
import type { PropertyData } from "@/lib/data-parser"
import { useState } from 'react'

interface ReportsTabProps {
  propertyData?: PropertyData
}

export function ReportsTab({ propertyData }: ReportsTabProps) {
  const [previewOpen, setPreviewOpen] = useState<number | null>(null)

  const reports = [
    {
      id: 1,
      title: "Energy Efficiency Assessment Report",
      description: "Comprehensive analysis of energy systems, HVAC efficiency, and sustainability recommendations for 3 Bellavista Terrace",
      type: "Energy Analysis",
      date: "2024-08-02",
      size: "1.8 MB",
      status: "Complete",
      downloadUrl: "https://blob.v0.dev/energy-efficiency-report.pdf",
      previewUrl: "https://blob.v0.dev/energy-efficiency-report.pdf",
      icon: <FileText className="h-5 w-5 text-green-600" />,
      color: "bg-green-50 border-green-200"
    },
    {
      id: 2,
      title: "Home Contents Report",
      description: "Detailed inventory of fixtures, fittings, and permanent installations throughout the property with total valuation of $77,750 AUD",
      type: "Contents Inventory",
      date: "2024-08-02",
      size: "2.1 MB",
      status: "Complete",
      downloadUrl: "https://blob.v0.dev/home-contents-report.pdf",
      previewUrl: "https://blob.v0.dev/home-contents-report.pdf",
      icon: <FileText className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-50 border-blue-200"
    }
  ]

  const handlePreview = (reportId: number) => {
    setPreviewOpen(previewOpen === reportId ? null : reportId)
  }

  return (
    <div className="space-y-6">
      {/* Reports Overview */}
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="h-6 w-6 text-blue-600" />
                Property Reports
              </CardTitle>
              <p className="text-gray-600">
                Comprehensive reports generated from property scan data for {propertyData?.address || "3 Bellavista Terrace, Paddington"}
              </p>
            </div>
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Reports
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-xl text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{reports.length}</div>
              <div className="text-sm text-gray-600">Total Reports</div>
            </div>
            <div className="p-4 bg-green-50 rounded-xl text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {reports.filter(r => r.status === 'Complete').length}
              </div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl text-center">
              <div className="text-2xl font-bold text-gray-600 mb-1">
                {reports.reduce((acc, r) => acc + parseFloat(r.size.replace(' MB', '')), 0).toFixed(1)} MB
              </div>
              <div className="text-sm text-gray-600">Total Size</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id} className={`${report.color} shadow-sm border rounded-2xl`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    {report.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                      <Badge variant="secondary" className="bg-white text-gray-700">
                        {report.status}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      {report.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(report.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileSize className="h-4 w-4" />
                        <span>{report.size}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {report.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <Button
                    onClick={() => handlePreview(report.id)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    {previewOpen === report.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                    Preview
                  </Button>
                </div>
              </div>
            </CardContent>
            {previewOpen === report.id && (
              <div className="border-t bg-gray-50 p-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Report Preview</h4>
                  {report.id === 1 ? (
                    // Energy Efficiency Report Preview
                    <div className="bg-white p-4 rounded-lg border text-sm">
                      <div className="mb-4">
                        <h5 className="font-semibold mb-2">Energy Efficiency Assessment Report</h5>
                        <p className="text-gray-600 mb-2">Address: 3 Bellavista Terrace</p>
                        <p className="text-gray-600 mb-2">Scanner: Noah Thompson</p>
                        <p className="text-gray-600 mb-4">Date: 2nd August 2025</p>
                      </div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4 text-xs">
                          <div className="font-semibold">Section</div>
                          <div className="font-semibold">Feature</div>
                          <div className="font-semibold">Observation</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-xs py-2 border-t">
                          <div>1</div>
                          <div>EER (Score 0-6 stars)</div>
                          <div>Pending</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-xs py-2 border-t">
                          <div>2</div>
                          <div>Climate Pattern- Climate Zone</div>
                          <div>Climate Zone 2</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-xs py-2 border-t">
                          <div>3</div>
                          <div>Orientation Living rooms</div>
                          <div>Direction of Front Door: 27° NE</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-xs py-2 border-t">
                          <div>6</div>
                          <div>Efficient Windows</div>
                          <div>No- Single Glazing</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-xs py-2 border-t">
                          <div>7</div>
                          <div>External Shading</div>
                          <div>Yes, Window shades on Northern side</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-xs py-2 border-t">
                          <div>11</div>
                          <div>Efficient Heating and Cooling</div>
                          <div>Split System (Indoor- Fujitsu)</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-xs py-2 border-t">
                          <div>12</div>
                          <div>Efficient Lighting</div>
                          <div>Yes, LEDs present</div>
                        </div>
                      </div>
                      <div className="mt-4 text-xs text-gray-500">
                        Preview showing first page - Click Download for full report
                      </div>
                    </div>
                  ) : (
                    // Home Contents Report Preview
                    <div className="bg-white p-4 rounded-lg border text-sm">
                      <div className="mb-4">
                        <h5 className="font-semibold mb-2">Home Contents Report</h5>
                        <p className="text-gray-600 mb-2">Property Address: 3 Bellavista Terrace, Paddington, QLD</p>
                        <p className="text-gray-600 mb-2">Date of Report: 2nd August 2025</p>
                        <p className="text-gray-600 mb-4">Report Reference Number: #4</p>
                      </div>
                      <div className="space-y-3">
                        <h6 className="font-semibold">Contents Inventory (Sample)</h6>
                        <div className="grid grid-cols-3 gap-4 text-xs">
                          <div className="font-semibold">Room/Location</div>
                          <div className="font-semibold">Item Description</div>
                          <div className="font-semibold">Purchase Price (AUD)</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-xs py-2 border-t">
                          <div>Hallway</div>
                          <div>Globe West Sketch Mono Console</div>
                          <div>$1,380</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-xs py-2 border-t">
                          <div>Hallway</div>
                          <div>Designer Boys "Ethereal" Framed Canvas</div>
                          <div>$1,199</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-xs py-2 border-t">
                          <div>Bathroom</div>
                          <div>Victoria + Albert "Amiata" Freestanding Bath</div>
                          <div>$5,995</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-xs py-2 border-t">
                          <div>Bedroom</div>
                          <div>Snooze "My Style" Upholstered Bed Frame</div>
                          <div>$1,890</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-xs py-2 border-t">
                          <div>Living Room</div>
                          <div>Coco Republic "Sorrento" 3-Seater Sofa</div>
                          <div>$6,995</div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 rounded">
                        <h6 className="font-semibold text-sm mb-2">Total Estimated Value</h6>
                        <div className="text-xs space-y-1">
                          <div>Bathroom: $18,105</div>
                          <div>Bedroom: $15,945</div>
                          <div>Living Room: $15,280</div>
                          <div className="font-semibold pt-2 border-t">Total: $77,750.00 AUD</div>
                        </div>
                      </div>
                      <div className="mt-4 text-xs text-gray-500">
                        Preview showing summary - Click Download for complete inventory
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Report Generation Info */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <FileText className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Report Generation Details</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• Reports generated from scan data collected on {propertyData?.scannedDate ? new Date(propertyData.scannedDate).toLocaleDateString() : "2nd August 2024"}</p>
                <p>• Scan purpose: {propertyData?.scanPurpose || "Property assessment and valuation"}</p>
                <p>• Property ID: {propertyData?.id || "3576988532719121"}</p>
                <p>• Total panoramas analyzed: {propertyData?.panoramaCount || "12"}</p>
                <p>• Room data points: {propertyData?.rooms?.length || "14"} rooms analyzed</p>
                {propertyData?.energySummary && (
                  <p>• Energy summary includes {propertyData.energySummary.airconUnits} AC units and {propertyData.energySummary.smokeAlarms} smoke alarms</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
