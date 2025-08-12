"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, ChevronDown, ChevronUp, Calendar, FileIcon as FileSize } from "lucide-react"
import type { PropertyData } from "@/lib/data-parser"
import { useState } from "react"
import jsPDF from "jspdf"

interface ReportsTabProps {
  propertyData?: PropertyData
}

export function ReportsTab({ propertyData }: ReportsTabProps) {
  const [previewOpen, setPreviewOpen] = useState<number | null>(null)

  const reports = [
    {
      id: 1,
      title: "Energy Efficiency Assessment Report",
      description:
        "Comprehensive analysis of energy systems, HVAC efficiency, and sustainability recommendations for 3 Bellavista Terrace",
      type: "Energy Analysis",
      date: "2024-08-02",
      size: "1.8 MB",
      status: "Complete",
      downloadUrl: "https://blob.v0.dev/energy-efficiency-report.pdf",
      previewUrl: "https://blob.v0.dev/energy-efficiency-report.pdf",
      icon: <FileText className="h-5 w-5 text-green-600" />,
      color: "bg-green-50 border-green-200",
    },
    {
      id: 2,
      title: "Home Contents Report",
      description:
        "Detailed inventory of fixtures, fittings, and permanent installations throughout the property with total valuation of $77,750 AUD",
      type: "Contents Inventory",
      date: "2024-08-02",
      size: "2.1 MB",
      status: "Complete",
      downloadUrl: "https://blob.v0.dev/home-contents-report.pdf",
      previewUrl: "https://blob.v0.dev/home-contents-report.pdf",
      icon: <FileText className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-50 border-blue-200",
    },
  ]

  const handlePreview = (reportId: number) => {
    setPreviewOpen(previewOpen === reportId ? null : reportId)
  }

  const handleDownloadEnergyReport = async () => {
    const doc = new jsPDF()

    // Header
    doc.setFontSize(16)
    doc.text("Energy Efficiency Assessment Report", 20, 20)

    doc.setFontSize(12)
    doc.text("Address: 3 Bellavista Terrace", 20, 35)
    doc.text("Scanner: Noah Thompson", 20, 45)
    doc.text("Date: 2nd August 2025", 20, 55)

    // Table header
    doc.setFontSize(10)
    let yPos = 75
    doc.text("Section", 20, yPos)
    doc.text("Energy Feature", 60, yPos)
    doc.text("Observation", 120, yPos)

    // Table data
    const data = [
      ["1", "EER (Score 0-6 stars)", "Pending"],
      ["1", "Home Energy Rating (Score 0-100)", "Pending (for scores 101+ default is 100+)"],
      ["1", "NABERS for Apartment Buildings (Score 0-6 stars)", "Not Relevant"],
      ["2", "Climate Pattern- Climate Zone", "Climate Zone 2"],
      ["3", "Orientation Living rooms Direction of Front Door", "27° NE"],
      ["3", "Direction of Windows in Living Room", "27° NE"],
      ["4", "Optimal Layout", "Top Floor- Open Plan, one door to bathroom, one door to balcony"],
      ["4", "", "Bottom Floor- all rooms have doors, open hallway up stairs"],
      ["6", "Efficient Windows", "No- Single Glazing"],
      ["7", "External Shading", "Yes, Window shades on Northern side, Shaded deck on Western Side"],
      ["8", "Efficient Window Coverings", "No- only blinds downstairs- refer to images"],
      ["9", "Natural Ventilation", "Moderate - Limited to no cross ventilation pathways upstairs"],
      ["9", "", "Some cross ventilation in master bedroom"],
      ["11", "Efficient Heating and Cooling", "Split System (Indoor- Fujitsu)"],
      ["12", "Efficient Lighting", "Yes, LEDs present"],
      ["13", "Efficient Hot Water", "Hot water tank and power box present, no solar present"],
      ["14", "Efficient Cooking", "Yes- Induction"],
      ["15", "Energy Generation", "No, not present"],
      ["16", "Energy Storage", "No, not present"],
      ["17", "Electric Vehicle Charging", "No, not present"],
      ["18", "Efficient Pool Pump", "No, not present"],
      ["20", "All Electric Home", "Yes, No Gas Present"],
    ]

    yPos += 10
    data.forEach((row) => {
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
      }
      doc.text(row[0], 20, yPos)
      doc.text(row[1], 60, yPos, { maxWidth: 55 })
      doc.text(row[2], 120, yPos, { maxWidth: 70 })
      yPos += 10
    })

    doc.save("Energy_Efficiency_Assessment_Report.pdf")
  }

  const handleDownloadContentsReport = async () => {
    const doc = new jsPDF()

    // Header
    doc.setFontSize(16)
    doc.text("Little Hinges Australia", 20, 20)
    doc.text("Home Contents Report", 20, 30)

    doc.setFontSize(12)
    doc.text("Property Address: 3 Bellavista Terrace, Paddington, QLD", 20, 45)
    doc.text("Date of Report: 2nd August 2025", 20, 55)
    doc.text("Report Reference Number: #4", 20, 65)

    doc.setFontSize(14)
    doc.text("1. Summary", 20, 80)
    doc.setFontSize(10)
    doc.text("Purpose of Report: Item descriptions and contents valuation based on RRP.", 20, 90)
    doc.text("Date of Inspection: 2nd August 2025", 20, 100)
    doc.text("Scope of Report: Includes all household furniture and contents at the property.", 20, 110)

    doc.setFontSize(14)
    doc.text("3. Contents Inventory", 20, 125)

    // Table header
    doc.setFontSize(8)
    let yPos = 135
    doc.text("Room/Location", 20, yPos)
    doc.text("Item Description", 70, yPos)
    doc.text("Price (AUD)", 150, yPos)

    // Inventory data
    const inventory = [
      ["Hallway", "Globe West Sketch Mono Console", "$1,380"],
      ["Hallway", 'Designer Boys "Ethereal" Framed Canvas', "$1,199"],
      ["Hallway", "Atom Recessed LED Downlight (each)", "$25"],
      ["Patio", 'Barbeques Galore "Captiva" 7-Piece Dining Set', "$1,499"],
      ["Patio", "BeefEater 1600 Series 5 Burner BBQ", "$1,280"],
      ["Patio", 'Beacon Lighting "Lucci Air" Ceiling Fan', "$299"],
      ["Patio", 'Havit "Leva" Up/Down Exterior Wall Light', "$119"],
      ["Bathroom", 'Victoria + Albert "Amiata" Freestanding Bath', "$5,995"],
      ["Bathroom", "Meir Round Floor Mounted Bath Mixer", "$1,279"],
      ["Bathroom", 'ADP "Clifton" Wall Hung Vanity', "$2,150"],
      ["Bathroom", 'ADP "Arch" Mirror', "$499"],
      ["Bathroom", 'Milli "Pure" Heated Towel Rail', "$986"],
      ["Bathroom", 'Stegbar "Grange" Frameless Shower Screen', "$1,200"],
      ["Bathroom", 'Phoenix "Vivid" Twin Shower', "$652"],
      ["Bathroom", 'Caroma "Luna" Cleanflush Back-to-Wall Toilet', "$799"],
      ["Bedroom", 'Snooze "My Style" Upholstered Bed Frame', "$1,890"],
      ["Bedroom", 'Globe West "Elle" Bedside Table (each)', "$1,090"],
      ["Bedroom", 'Beacon Lighting "Husk" Table Lamp', "$199"],
      ["Bedroom", "DIY Blinds White Plantation Shutters", "$750"],
      ["Bedroom", 'Hunter "Pacific" 4-Blade Ceiling Fan with Light', "$349"],
      ["Bedroom", 'Stegbar "Glengary" Sliding Wardrobe Doors', "$1,500"],
      ["Patio", 'Globe West "Maui" Outdoor Sofa', "$3,495"],
      ["Patio", 'Globe West "Maui" Outdoor Coffee Table', "$1,295"],
      ["Living", 'King "Jasper" L-Shaped Sofa', "$5,990"],
      ["Living", 'Nick Scali "Cooper" TV Unit', "$1,590"],
      ["Living", 'Armadillo "Granada" Rug', "$2,950"],
      ["Hallway", 'Armadillo "Sierra" Hall Runner', "$1,250"],
      ["Living Room", 'Coco Republic "Sorrento" 3-Seater Sofa', "$6,995"],
      ["Living Room", 'Coco Republic "Montauk" Occasional Chair', "$3,495"],
      ["Living Room", 'Samsung 65" The Frame QLED Smart TV', "$2,895"],
      ["Living Room", 'Globe West "Vittoria" Coffee Table', "$1,895"],
      ["Bathroom", 'Caroma "Newbury" Shower Bath', "$950"],
      ["Bathroom", 'Arova "Luxe" Mirrored Cabinet', "$550"],
      ["Hallway", 'West Elm "Metal Frame" Arched Wall Mirror', "$599"],
      ["Bathroom", 'Reece "Posh" Domaine Double Vanity', "$1,800"],
      ["Bathroom", 'Hydrotherm "TR2" Heated Towel Ladder', "$1,245"],
      ["Bedroom", 'Freedom "Floating" Bed Base', "$1,299"],
      ["Bedroom", 'Freedom "Frank" Chest of Drawers', "$1,499"],
      ["Bedroom", 'Freedom "Frank" Bedside Table (each)', "$599"],
      ["Patio", 'Tait "Jak" Outdoor Bar Table & Stools', "$3,500"],
      ["Patio", 'Tait "Trace" Armchair', "$1,950"],
      ["Bedroom", 'King "Encore" Bed', "$3,990"],
      ["Bedroom", 'King "Oliver" Tub Chair', "$1,890"],
      ["Bedroom", 'King "Encore" Bedside Table (each)', "$890"],
    ]

    yPos += 10
    inventory.forEach((row) => {
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
      }
      doc.text(row[0], 20, yPos, { maxWidth: 45 })
      doc.text(row[1], 70, yPos, { maxWidth: 75 })
      doc.text(row[2], 150, yPos)
      yPos += 8
    })

    // Add totals on new page
    doc.addPage()
    doc.setFontSize(14)
    doc.text("6. Total Estimated Value", 20, 30)
    doc.setFontSize(10)
    doc.text("Bathroom: $18,105", 20, 45)
    doc.text("Bedroom: $15,945", 20, 55)
    doc.text("Hallway: $4,453", 20, 65)
    doc.text("Living: $10,530", 20, 75)
    doc.text("Living Room: $15,280", 20, 85)
    doc.text("Patio: $13,437", 20, 95)
    doc.setFontSize(12)
    doc.text("Total: $77,750.00 AUD", 20, 110)

    doc.save("Home_Contents_Report.pdf")
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
                Comprehensive reports generated from property scan data for{" "}
                {propertyData?.address || "3 Bellavista Terrace, Paddington"}
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
                {reports.filter((r) => r.status === "Complete").length}
              </div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl text-center">
              <div className="text-2xl font-bold text-gray-600 mb-1">
                {reports.reduce((acc, r) => acc + Number.parseFloat(r.size.replace(" MB", "")), 0).toFixed(1)} MB
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
                  <div className="p-3 bg-white rounded-lg shadow-sm">{report.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                      <Badge variant="secondary" className="bg-white text-gray-700">
                        {report.status}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-3 leading-relaxed">{report.description}</p>
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
                    onClick={report.id === 1 ? handleDownloadEnergyReport : handleDownloadContentsReport}
                    variant="default"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
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
                          <div>Yes, Window shades on Northern side, Shaded deck on Western Side</div>
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
                <p>
                  • Reports generated from scan data collected on{" "}
                  {propertyData?.scannedDate
                    ? new Date(propertyData.scannedDate).toLocaleDateString()
                    : "2nd August 2024"}
                </p>
                <p>• Scan purpose: {propertyData?.scanPurpose || "Property assessment and valuation"}</p>
                <p>• Property ID: {propertyData?.id || "3576988532719121"}</p>
                <p>• Total panoramas analyzed: {propertyData?.panoramaCount || "12"}</p>
                <p>• Room data points: {propertyData?.rooms?.length || "14"} rooms analyzed</p>
                {propertyData?.energySummary && (
                  <p>
                    • Energy summary includes {propertyData.energySummary.airconUnits} AC units and{" "}
                    {propertyData.energySummary.smokeAlarms} smoke alarms
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
