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
        "Detailed inventory of fixtures, fittings, and permanent installations throughout the property with total valuation of $21,220.16 AUD",
      type: "Contents Inventory",
      date: "2025-08-21",
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
    doc.text("Home Contents Report", 20, 20)

    doc.setFontSize(12)
    doc.text("Property Address: 3 Bellavista Terrace, Paddington, QLD", 20, 35)
    doc.text("Date of Report: 21 August 2025", 20, 45)
    doc.text("Report Reference Number: #21", 20, 55)

    doc.setFontSize(14)
    doc.text("Summary", 20, 70)
    doc.setFontSize(10)
    doc.text("Purpose of Report: Item descriptions and contents valuation based on RRP.", 20, 80)
    doc.text("Date of Inspection: 21 August 2025", 20, 90)
    doc.text("Scope of Report: Includes all household furniture and contents at the property.", 20, 100)

    let yPos = 115

    // Room 2 - Outdoor Furniture
    doc.setFontSize(12)
    doc.text("Room 2 - Outdoor Furniture", 20, yPos)
    yPos += 10
    doc.setFontSize(8)
    doc.text("Category", 20, yPos)
    doc.text("Item", 50, yPos)
    doc.text("Qty", 120, yPos)
    doc.text("Price (each)", 140, yPos)
    doc.text("Total", 170, yPos)

    const room2Items = [
      ["Furniture", "Outdoor Rope Lounge Chair", "2", "$335", "$670"],
      ["Furniture", "Hourglass Side Table", "1", "$170", "$170"],
      ["Other", "Outdoor Seat Cushion", "2", "$39", "$78"],
      ["Other", "Small White Ceramic Pot", "1", "$15", "$15"],
      ["Other", "Small Artificial Plant", "1", "$20", "$20"],
    ]

    yPos += 5
    room2Items.forEach((item) => {
      yPos += 8
      doc.text(item[0], 20, yPos, { maxWidth: 25 })
      doc.text(item[1], 50, yPos, { maxWidth: 65 })
      doc.text(item[2], 120, yPos)
      doc.text(item[3], 140, yPos)
      doc.text(item[4], 170, yPos)
    })
    yPos += 10
    doc.setFontSize(10)
    doc.text("Room Total: $953", 20, yPos)

    // Room 3 - Bathroom Accessories
    yPos += 15
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }
    doc.setFontSize(12)
    doc.text("Room 3 - Bathroom Accessories", 20, yPos)
    yPos += 10
    doc.setFontSize(8)
    doc.text("Category", 20, yPos)
    doc.text("Item", 50, yPos)
    doc.text("Qty", 120, yPos)
    doc.text("Price (each)", 140, yPos)
    doc.text("Total", 170, yPos)

    const room3Items = [
      ["Other", "Liquid Soap Dispenser", "1", "$25.97", "$25.97"],
      ["Other", "Bathroom Tumbler", "1", "$25.97", "$25.97"],
      ["Other", "White Hand Towel", "1", "$4", "$4"],
      ["Other", "Small Black Pot", "1", "$4", "$4"],
      ["Other", "Small Artificial Plant", "1", "$5", "$5"],
    ]

    yPos += 5
    room3Items.forEach((item) => {
      yPos += 8
      doc.text(item[0], 20, yPos, { maxWidth: 25 })
      doc.text(item[1], 50, yPos, { maxWidth: 65 })
      doc.text(item[2], 120, yPos)
      doc.text(item[3], 140, yPos)
      doc.text(item[4], 170, yPos)
    })
    yPos += 10
    doc.setFontSize(10)
    doc.text("Room Total: $64.94", 20, yPos)

    // Room 4 - Bedroom
    yPos += 15
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }
    doc.setFontSize(12)
    doc.text("Room 4 - Bedroom", 20, yPos)
    yPos += 10
    doc.setFontSize(8)
    doc.text("Category", 20, yPos)
    doc.text("Item", 50, yPos)
    doc.text("Qty", 120, yPos)
    doc.text("Price (each)", 140, yPos)
    doc.text("Total", 170, yPos)

    const room4Items = [
      ["Furniture", "Upholstered Bed Frame", "1", "$299", "$299"],
      ["Furniture", "Queen Mattress", "1", "$399", "$399"],
      ["Furniture", "Bedside Table", "2", "$61.95", "$123.90"],
      ["Other", "Quilt Cover Set", "1", "$119.99", "$119.99"],
      ["Other", "Standard Pillow", "2", "$31.49", "$62.98"],
      ["Other", "Decorative Cushion", "1", "$29.95", "$29.95"],
      ["Electronics", "Bedside Table Lamp", "2", "$64.90", "$129.80"],
      ["Other", "Book", "2", "$19.99", "$39.98"],
      ["Artwork", "Framed Wall Art", "1", "$65", "$65"],
    ]

    yPos += 5
    room4Items.forEach((item) => {
      yPos += 8
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
      }
      doc.text(item[0], 20, yPos, { maxWidth: 25 })
      doc.text(item[1], 50, yPos, { maxWidth: 65 })
      doc.text(item[2], 120, yPos)
      doc.text(item[3], 140, yPos)
      doc.text(item[4], 170, yPos)
    })
    yPos += 10
    doc.setFontSize(10)
    doc.text("Room Total: $1,269.60", 20, yPos)

    // Room 5 - Living Room
    yPos += 15
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }
    doc.setFontSize(12)
    doc.text("Room 5 - Living Room", 20, yPos)
    yPos += 10
    doc.setFontSize(8)
    doc.text("Category", 20, yPos)
    doc.text("Item", 50, yPos)
    doc.text("Qty", 120, yPos)
    doc.text("Price (each)", 140, yPos)
    doc.text("Total", 170, yPos)

    const room5Items = [
      ["Furniture", "3-Seater Fabric Sofa", "1", "$1299", "$1299"],
      ["Furniture", "Rattan Buffet Sideboard", "1", "$4100", "$4100"],
      ["Furniture", "Boucle Accent Chair", "1", "$549", "$549"],
      ["Furniture", "Round Low Coffee Table", "1", "$279", "$279"],
      ["Furniture", "Marble Side Table", "1", "$149", "$149"],
      ["Furniture", "Slim Console Table", "1", "$199", "$199"],
      ["Other", "Large Patterned Rug", "1", "$499", "$499"],
      ["Other", "Decorative Cushion (Beige/Gold)", "2", "$39.95", "$79.90"],
      ["Other", "Decorative Cushion (Cream)", "2", "$34.95", "$69.90"],
      ["Other", "Decorative Cushion (White)", "1", "$29.95", "$29.95"],
      ["Artwork", "Large Abstract Figure Art", "1", "$380", "$380"],
      ["Artwork", "Framed Beach Scene Art", "1", "$250", "$250"],
      ["Artwork", "Designer Boys 'Ethereal' Framed Canvas", "1", "$1199", "$1199"],
      ["Artwork", "Round Wall Mirror", "1", "$229", "$229"],
      ["Other", "Large White Vase", "1", "$49.95", "$49.95"],
      ["Other", "Clear Glass Vase", "1", "$35", "$35"],
      ["Other", "Dried Branches/Stems", "1", "$24.95", "$24.95"],
      ["Other", "At Home Hardcover Book", "1", "$51.25", "$51.25"],
    ]

    yPos += 5
    room5Items.forEach((item) => {
      yPos += 8
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
      }
      doc.text(item[0], 20, yPos, { maxWidth: 25 })
      doc.text(item[1], 50, yPos, { maxWidth: 65 })
      doc.text(item[2], 120, yPos)
      doc.text(item[3], 140, yPos)
      doc.text(item[4], 170, yPos)
    })
    yPos += 10
    doc.setFontSize(10)
    doc.text("Room Total: $9,472.90", 20, yPos)

    // Room 7 - Kitchen & Dining
    yPos += 15
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }
    doc.setFontSize(12)
    doc.text("Room 7 - Kitchen & Dining", 20, yPos)
    yPos += 10
    doc.setFontSize(8)
    doc.text("Category", 20, yPos)
    doc.text("Item", 50, yPos)
    doc.text("Qty", 120, yPos)
    doc.text("Price (each)", 140, yPos)
    doc.text("Total", 170, yPos)

    const room7Items = [
      ["Appliances", "Dishwasher - Blanco", "1", "$799", "$799"],
      ["Other", "Mortar and Pestle", "1", "$61.95", "$61.95"],
      ["Furniture", "Rectangular Dining Table", "1", "$949", "$949"],
      ["Furniture", "Black Timber Dining Chair", "6", "$299", "$1794"],
      ["Furniture", "Kitchen Bar Stool", "4", "$229", "$916"],
      ["Appliances", "Kettle", "1", "$249", "$249"],
      ["Appliances", "Toaster", "1", "$229", "$229"],
      ["Other", "Pepper Grinder", "1", "$9.95", "$9.95"],
      ["Other", "Large Serving Bowl", "1", "$29.95", "$29.95"],
      ["Other", "Large Glass Vase", "1", "$79.95", "$79.95"],
      ["Other", "Artificial Eucalyptus Stems", "1", "$18", "$18"],
    ]

    yPos += 5
    room7Items.forEach((item) => {
      yPos += 8
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
      }
      doc.text(item[0], 20, yPos, { maxWidth: 25 })
      doc.text(item[1], 50, yPos, { maxWidth: 65 })
      doc.text(item[2], 120, yPos)
      doc.text(item[3], 140, yPos)
      doc.text(item[4], 170, yPos)
    })
    yPos += 10
    doc.setFontSize(10)
    doc.text("Room Total: $5,135.80", 20, yPos)

    // Room 8 - Bathroom
    yPos += 15
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }
    doc.setFontSize(12)
    doc.text("Room 8 - Bathroom", 20, yPos)
    yPos += 10
    doc.setFontSize(8)
    doc.text("Category", 20, yPos)
    doc.text("Item", 50, yPos)
    doc.text("Qty", 120, yPos)
    doc.text("Price (each)", 140, yPos)
    doc.text("Total", 170, yPos)

    const room8Items = [
      ["Other", "Ceramic Soap Dispenser", "1", "$19.95", "$19.95"],
      ["Other", "Ceramic Tumbler", "1", "$7", "$7"],
      ["Other", "White Hand Towel", "1", "$29.90", "$29.90"],
      ["Other", "Artificial Orchid + Small Black Pot", "1", "$97.90", "$97.90"],
    ]

    yPos += 5
    room8Items.forEach((item) => {
      yPos += 8
      doc.text(item[0], 20, yPos, { maxWidth: 25 })
      doc.text(item[1], 50, yPos, { maxWidth: 65 })
      doc.text(item[2], 120, yPos)
      doc.text(item[3], 140, yPos)
      doc.text(item[4], 170, yPos)
    })
    yPos += 10
    doc.setFontSize(10)
    doc.text("Room Total: $154.75", 20, yPos)

    // Room 10 - Bathroom
    yPos += 15
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }
    doc.setFontSize(12)
    doc.text("Room 10 - Bathroom", 20, yPos)
    yPos += 10
    doc.setFontSize(8)
    doc.text("Category", 20, yPos)
    doc.text("Item", 50, yPos)
    doc.text("Qty", 120, yPos)
    doc.text("Price (each)", 140, yPos)
    doc.text("Total", 170, yPos)

    const room10Items = [
      ["Other", "Ceramic Soap Dispenser", "1", "$19.95", "$19.95"],
      ["Other", "Ceramic Tumbler", "1", "$7", "$7"],
      ["Other", "White Hand Towel", "1", "$29.90", "$29.90"],
    ]

    yPos += 5
    room10Items.forEach((item) => {
      yPos += 8
      doc.text(item[0], 20, yPos, { maxWidth: 25 })
      doc.text(item[1], 50, yPos, { maxWidth: 65 })
      doc.text(item[2], 120, yPos)
      doc.text(item[3], 140, yPos)
      doc.text(item[4], 170, yPos)
    })
    yPos += 10
    doc.setFontSize(10)
    doc.text("Room Total: $56.85", 20, yPos)

    // Room 11 - Bedroom
    yPos += 15
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }
    doc.setFontSize(12)
    doc.text("Room 11 - Bedroom", 20, yPos)
    yPos += 10
    doc.setFontSize(8)
    doc.text("Category", 20, yPos)
    doc.text("Item", 50, yPos)
    doc.text("Qty", 120, yPos)
    doc.text("Price (each)", 140, yPos)
    doc.text("Total", 170, yPos)

    const room11Items = [
      ["Furniture", "Upholstered Bed Frame", "1", "$356", "$356"],
      ["Furniture", "Queen Mattress", "1", "$399", "$399"],
      ["Furniture", "Bedside Table", "2", "$399", "$798"],
      ["Other", "Quilt Cover Set", "1", "$149.99", "$149.99"],
      ["Other", "Standard Pillow", "2", "$30", "$60"],
      ["Other", "Decorative Cushion (Dark Grey)", "1", "$40.95", "$40.95"],
      ["Other", "Decorative Cushion (Light Grey)", "1", "$49", "$49"],
      ["Electronics", "Bedside Table Lamp", "2", "$64.90", "$129.80"],
      ["Artwork", "Framed Wall Art", "1", "$69.99", "$69.99"],
    ]

    yPos += 5
    room11Items.forEach((item) => {
      yPos += 8
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
      }
      doc.text(item[0], 20, yPos, { maxWidth: 25 })
      doc.text(item[1], 50, yPos, { maxWidth: 65 })
      doc.text(item[2], 120, yPos)
      doc.text(item[3], 140, yPos)
      doc.text(item[4], 170, yPos)
    })
    yPos += 10
    doc.setFontSize(10)
    doc.text("Room Total: $2,052.73", 20, yPos)

    // Room 12 - Outdoor Dining
    yPos += 15
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }
    doc.setFontSize(12)
    doc.text("Room 12 - Outdoor Dining", 20, yPos)
    yPos += 10
    doc.setFontSize(8)
    doc.text("Category", 20, yPos)
    doc.text("Item", 50, yPos)
    doc.text("Qty", 120, yPos)
    doc.text("Price (each)", 140, yPos)
    doc.text("Total", 170, yPos)

    const room12Items = [
      ["Furniture", "Outdoor Cafe Table", "1", "$139", "$139"],
      ["Furniture", "Outdoor Rope Dining Chair", "2", "$239", "$478"],
      ["Other", "Small Artificial Plant", "1", "$12", "$12"],
    ]

    yPos += 5
    room12Items.forEach((item) => {
      yPos += 8
      doc.text(item[0], 20, yPos, { maxWidth: 25 })
      doc.text(item[1], 50, yPos, { maxWidth: 65 })
      doc.text(item[2], 120, yPos)
      doc.text(item[3], 140, yPos)
      doc.text(item[4], 170, yPos)
    })
    yPos += 10
    doc.setFontSize(10)
    doc.text("Room Total: $629", 20, yPos)

    // Room 13 - Bedroom
    yPos += 15
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }
    doc.setFontSize(12)
    doc.text("Room 13 - Bedroom", 20, yPos)
    yPos += 10
    doc.setFontSize(8)
    doc.text("Category", 20, yPos)
    doc.text("Item", 50, yPos)
    doc.text("Qty", 120, yPos)
    doc.text("Price (each)", 140, yPos)
    doc.text("Total", 170, yPos)

    const room13Items = [
      ["Furniture", "Upholstered Bed Frame", "1", "$399", "$399"],
      ["Furniture", "Queen Mattress", "1", "$399", "$399"],
      ["Furniture", "Bedside Table", "2", "$63.95", "$127.90"],
      ["Other", "Quilt Cover Set", "1", "$149.99", "$149.99"],
      ["Other", "Standard Pillow", "2", "$30", "$60"],
      ["Other", "Decorative Cushion (Dark Grey)", "1", "$40.95", "$40.95"],
      ["Other", "Decorative Cushion (Light Grey)", "1", "$49", "$49"],
      ["Electronics", "Bedside Table Lamp", "2", "$64.90", "$129.80"],
      ["Artwork", "Framed Wall Art", "1", "$74.95", "$74.95"],
    ]

    yPos += 5
    room13Items.forEach((item) => {
      yPos += 8
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
      }
      doc.text(item[0], 20, yPos, { maxWidth: 25 })
      doc.text(item[1], 50, yPos, { maxWidth: 65 })
      doc.text(item[2], 120, yPos)
      doc.text(item[3], 140, yPos)
      doc.text(item[4], 170, yPos)
    })
    yPos += 10
    doc.setFontSize(10)
    doc.text("Room Total: $1,430.59", 20, yPos)

    // Total Estimated Value
    yPos += 20
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }
    doc.setFontSize(14)
    doc.text("Total Estimated Value", 20, yPos)
    yPos += 15
    doc.setFontSize(10)
    doc.text("Room 2 - Outdoor Furniture: $953", 20, yPos)
    yPos += 10
    doc.text("Room 3 - Bathroom Accessories: $64.94", 20, yPos)
    yPos += 10
    doc.text("Room 4 - Bedroom: $1,269.60", 20, yPos)
    yPos += 10
    doc.text("Room 5 - Living Room: $9,472.90", 20, yPos)
    yPos += 10
    doc.text("Room 7 - Kitchen & Dining: $5,135.80", 20, yPos)
    yPos += 10
    doc.text("Room 8 - Bathroom: $154.75", 20, yPos)
    yPos += 10
    doc.text("Room 10 - Bathroom: $56.85", 20, yPos)
    yPos += 10
    doc.text("Room 11 - Bedroom: $2,052.73", 20, yPos)
    yPos += 10
    doc.text("Room 12 - Outdoor Dining: $629", 20, yPos)
    yPos += 10
    doc.text("Room 13 - Bedroom: $1,430.59", 20, yPos)
    yPos += 15
    doc.setFontSize(12)
    doc.text("House Total: $21,220.16 AUD", 20, yPos)

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
                        <p className="text-gray-600 mb-2">Date of Report: 21 August 2025</p>
                        <p className="text-gray-600 mb-4">Report Reference Number: #21</p>
                      </div>
                      <div className="space-y-3">
                        <h6 className="font-semibold">Contents Inventory (Sample)</h6>
                        <div className="grid grid-cols-4 gap-4 text-xs">
                          <div className="font-semibold">Room</div>
                          <div className="font-semibold">Category</div>
                          <div className="font-semibold">Item</div>
                          <div className="font-semibold">Total</div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-xs py-2 border-t">
                          <div>Room 2</div>
                          <div>Furniture</div>
                          <div>Outdoor Rope Lounge Chair (2)</div>
                          <div>$670</div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-xs py-2 border-t">
                          <div>Room 3</div>
                          <div>Other</div>
                          <div>Liquid Soap Dispenser</div>
                          <div>$25.97</div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-xs py-2 border-t">
                          <div>Room 4</div>
                          <div>Furniture</div>
                          <div>Queen Mattress</div>
                          <div>$399</div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-xs py-2 border-t">
                          <div>Room 5</div>
                          <div>Furniture</div>
                          <div>Rattan Buffet Sideboard</div>
                          <div>$4,100</div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-xs py-2 border-t">
                          <div>Room 7</div>
                          <div>Furniture</div>
                          <div>Rectangular Dining Table</div>
                          <div>$949</div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 rounded">
                        <h6 className="font-semibold text-sm mb-2">Total Estimated Value</h6>
                        <div className="text-xs space-y-1">
                          <div>Room 2 - Outdoor Furniture: $953</div>
                          <div>Room 3 - Bathroom Accessories: $64.94</div>
                          <div>Room 4 - Bedroom: $1,269.60</div>
                          <div>Room 5 - Living Room: $9,472.90</div>
                          <div>Room 7 - Kitchen & Dining: $5,135.80</div>
                          <div>Room 8 - Bathroom: $154.75</div>
                          <div>Room 10 - Bathroom: $56.85</div>
                          <div>Room 11 - Bedroom: $2,052.73</div>
                          <div>Room 12 - Outdoor Dining: $629</div>
                          <div>Room 13 - Bedroom: $1,430.59</div>
                          <div className="font-semibold pt-2 border-t">House Total: $21,220.16 AUD</div>
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
