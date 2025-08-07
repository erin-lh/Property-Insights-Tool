"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, ExternalLink, Calendar, FileIcon as FileSize } from 'lucide-react'
import type { PropertyData } from "@/lib/data-parser"

interface ReportsTabProps {
  propertyData: PropertyData
}

export function ReportsTab({ propertyData }: ReportsTabProps) {
  const reports = [
    {
      id: 1,
      title: "Energy Efficiency Report",
      description: "Comprehensive analysis of energy systems, HVAC efficiency, and sustainability recommendations",
      type: "Energy Analysis",
      date: "2024-07-24",
      size: "2.4 MB",
      status: "Complete",
      downloadUrl: "https://drive.google.com/file/d/1example_energy_report/view?usp=sharing",
      previewUrl: "https://drive.google.com/file/d/1example_energy_report/preview",
      icon: <FileText className="h-5 w-5 text-green-600" />,
      color: "bg-green-50 border-green-200"
    },
    {
      id: 2,
      title: "Home Contents Report",
      description: "Detailed inventory of fixtures, fittings, and permanent installations throughout the property",
      type: "Contents Inventory",
      date: "2024-07-24",
      size: "3.1 MB",
      status: "Complete",
      downloadUrl: "https://drive.google.com/file/d/1example_contents_report/view?usp=sharing",
      previewUrl: "https://drive.google.com/file/d/1example_contents_report/preview",
      icon: <FileText className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-50 border-blue-200"
    }
  ]

  const handleDownload = (url: string, title: string) => {
    window.open(url, '_blank')
  }

  const handlePreview = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <div className="space-y-6">
      {/* Reports Overview */}
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            Property Reports
          </CardTitle>
          <p className="text-gray-600">
            Comprehensive reports generated from property scan data for {propertyData.address}
          </p>
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
                    onClick={() => handlePreview(report.previewUrl)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Preview
                  </Button>
                  <Button
                    onClick={() => handleDownload(report.downloadUrl, report.title)}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
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
                <p>• Reports generated from scan data collected on {new Date(propertyData.scannedDate).toLocaleDateString()}</p>
                <p>• Scan purpose: {propertyData.scanPurpose}</p>
                <p>• Property ID: {propertyData.id}</p>
                <p>• Total panoramas analyzed: {propertyData.panoramaCount}</p>
                <p>• Room data points: {propertyData.rooms.length} rooms analyzed</p>
                {propertyData.energySummary && (
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
