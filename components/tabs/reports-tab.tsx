"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  Download,
  Calendar,
  Clock,
  Plus,
  Filter,
  Search,
  Eye,
  Share,
  Settings,
  BarChart3,
  TrendingUp,
  Users,
} from "lucide-react"

interface Report {
  id: string
  name: string
  type: "property" | "analytics" | "leads" | "market" | "custom"
  status: "draft" | "generating" | "ready" | "scheduled"
  createdDate: string
  lastGenerated?: string
  size: string
  format: "PDF" | "Excel" | "CSV"
  description: string
  scheduled?: boolean
  frequency?: "daily" | "weekly" | "monthly"
}

const sampleReports: Report[] = [
  {
    id: "1",
    name: "Property Overview Report",
    type: "property",
    status: "ready",
    createdDate: "2024-01-15",
    lastGenerated: "2024-01-15",
    size: "2.4 MB",
    format: "PDF",
    description: "Comprehensive property analysis including specifications, virtual tour metrics, and lead data.",
    scheduled: false,
  },
  {
    id: "2",
    name: "Virtual Tour Analytics",
    type: "analytics",
    status: "ready",
    createdDate: "2024-01-14",
    lastGenerated: "2024-01-14",
    size: "1.8 MB",
    format: "Excel",
    description: "Detailed analytics on virtual tour engagement, visitor behavior, and conversion metrics.",
    scheduled: true,
    frequency: "weekly",
  },
  {
    id: "3",
    name: "Lead Generation Summary",
    type: "leads",
    status: "generating",
    createdDate: "2024-01-13",
    size: "1.2 MB",
    format: "PDF",
    description: "Summary of all leads generated, their sources, and conversion status.",
    scheduled: false,
  },
  {
    id: "4",
    name: "Market Comparison Analysis",
    type: "market",
    status: "draft",
    createdDate: "2024-01-12",
    size: "3.1 MB",
    format: "PDF",
    description: "Comparative analysis with similar properties in the area including pricing and features.",
    scheduled: false,
  },
]

const reportTemplates = [
  {
    id: "property-overview",
    name: "Property Overview",
    description: "Complete property analysis with specifications and metrics",
    type: "property",
    sections: ["Property Details", "Virtual Tour Metrics", "Lead Summary", "Material Analysis"],
  },
  {
    id: "analytics-deep-dive",
    name: "Analytics Deep Dive",
    description: "Detailed virtual tour and engagement analytics",
    type: "analytics",
    sections: ["Visitor Analytics", "Engagement Metrics", "Conversion Rates", "Time Analysis"],
  },
  {
    id: "lead-report",
    name: "Lead Generation Report",
    description: "Comprehensive lead tracking and conversion analysis",
    type: "leads",
    sections: ["Lead Sources", "Qualification Status", "Contact History", "Conversion Funnel"],
  },
  {
    id: "market-analysis",
    name: "Market Analysis",
    description: "Market comparison and pricing analysis",
    type: "market",
    sections: ["Comparable Properties", "Price Analysis", "Market Trends", "Recommendations"],
  },
]

export function ReportsTab() {
  const [reports, setReports] = useState<Report[]>(sampleReports)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isCreateReportOpen, setIsCreateReportOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [reportName, setReportName] = useState("")
  const [reportDescription, setReportDescription] = useState("")
  const [selectedSections, setSelectedSections] = useState<string[]>([])
  const [reportFormat, setReportFormat] = useState("PDF")
  const [scheduleReport, setScheduleReport] = useState(false)
  const [scheduleFrequency, setScheduleFrequency] = useState("weekly")

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || report.type === typeFilter
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "generating":
        return "bg-yellow-100 text-yellow-800"
      case "ready":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "property":
        return <FileText className="h-4 w-4" />
      case "analytics":
        return <BarChart3 className="h-4 w-4" />
      case "leads":
        return <Users className="h-4 w-4" />
      case "market":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleCreateReport = () => {
    const template = reportTemplates.find((t) => t.id === selectedTemplate)
    if (!template) return

    const newReport: Report = {
      id: Date.now().toString(),
      name: reportName || template.name,
      type: template.type as Report["type"],
      status: "generating",
      createdDate: new Date().toISOString().split("T")[0],
      size: "0 MB",
      format: reportFormat as Report["format"],
      description: reportDescription || template.description,
      scheduled: scheduleReport,
      frequency: scheduleReport ? (scheduleFrequency as Report["frequency"]) : undefined,
    }

    setReports([newReport, ...reports])

    // Reset form
    setSelectedTemplate("")
    setReportName("")
    setReportDescription("")
    setSelectedSections([])
    setReportFormat("PDF")
    setScheduleReport(false)
    setScheduleFrequency("weekly")
    setIsCreateReportOpen(false)

    // Simulate report generation
    setTimeout(() => {
      setReports((prev) =>
        prev.map((r) =>
          r.id === newReport.id
            ? {
                ...r,
                status: "ready",
                lastGenerated: new Date().toISOString().split("T")[0],
                size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
              }
            : r,
        ),
      )
    }, 3000)
  }

  const handleTemplateSelect = (templateId: string) => {
    const template = reportTemplates.find((t) => t.id === templateId)
    if (template) {
      setSelectedTemplate(templateId)
      setReportName(template.name)
      setReportDescription(template.description)
      setSelectedSections(template.sections)
    }
  }

  const reportStats = {
    total: reports.length,
    ready: reports.filter((r) => r.status === "ready").length,
    generating: reports.filter((r) => r.status === "generating").length,
    scheduled: reports.filter((r) => r.scheduled).length,
  }

  return (
    <div className="space-y-6">
      {/* Report Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white shadow-sm border-0 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{reportStats.total}</div>
                <div className="text-sm text-gray-500">Total Reports</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Download className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{reportStats.ready}</div>
                <div className="text-sm text-gray-500">Ready to Download</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{reportStats.generating}</div>
                <div className="text-sm text-gray-500">Generating</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{reportStats.scheduled}</div>
                <div className="text-sm text-gray-500">Scheduled</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Management */}
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-800">Report Management</CardTitle>
            <Dialog open={isCreateReportOpen} onOpenChange={setIsCreateReportOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Report
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Report</DialogTitle>
                  <DialogDescription>Choose a template and customize your report settings.</DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Template Selection */}
                  <div>
                    <Label className="text-base font-medium">Report Template</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {reportTemplates.map((template) => (
                        <Card
                          key={template.id}
                          className={`cursor-pointer transition-colors ${
                            selectedTemplate === template.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => handleTemplateSelect(template.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              {getTypeIcon(template.type)}
                              <div>
                                <h4 className="font-medium text-gray-900">{template.name}</h4>
                                <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {selectedTemplate && (
                    <>
                      {/* Report Details */}
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="reportName">Report Name</Label>
                          <Input
                            id="reportName"
                            value={reportName}
                            onChange={(e) => setReportName(e.target.value)}
                            placeholder="Enter report name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="reportDescription">Description</Label>
                          <Textarea
                            id="reportDescription"
                            value={reportDescription}
                            onChange={(e) => setReportDescription(e.target.value)}
                            placeholder="Enter report description"
                            rows={3}
                          />
                        </div>
                      </div>

                      {/* Report Sections */}
                      <div>
                        <Label className="text-base font-medium">Report Sections</Label>
                        <div className="space-y-2 mt-2">
                          {reportTemplates
                            .find((t) => t.id === selectedTemplate)
                            ?.sections.map((section) => (
                              <div key={section} className="flex items-center space-x-2">
                                <Checkbox
                                  id={section}
                                  checked={selectedSections.includes(section)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedSections([...selectedSections, section])
                                    } else {
                                      setSelectedSections(selectedSections.filter((s) => s !== section))
                                    }
                                  }}
                                />
                                <Label htmlFor={section} className="text-sm">
                                  {section}
                                </Label>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Report Settings */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Format</Label>
                          <Select value={reportFormat} onValueChange={setReportFormat}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PDF">PDF</SelectItem>
                              <SelectItem value="Excel">Excel</SelectItem>
                              <SelectItem value="CSV">CSV</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Schedule</Label>
                          <div className="flex items-center space-x-2 mt-2">
                            <Checkbox id="schedule" checked={scheduleReport} onCheckedChange={setScheduleReport} />
                            <Label htmlFor="schedule" className="text-sm">
                              Schedule automatic generation
                            </Label>
                          </div>
                        </div>
                      </div>

                      {scheduleReport && (
                        <div>
                          <Label>Frequency</Label>
                          <Select value={scheduleFrequency} onValueChange={setScheduleFrequency}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div className="flex gap-2 pt-4">
                        <Button onClick={handleCreateReport} className="flex-1">
                          Create Report
                        </Button>
                        <Button variant="outline" onClick={() => setIsCreateReportOpen(false)} className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="property">Property</SelectItem>
                <SelectItem value="analytics">Analytics</SelectItem>
                <SelectItem value="leads">Leads</SelectItem>
                <SelectItem value="market">Market</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="generating">Generating</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reports List */}
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className="border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        {getTypeIcon(report.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{report.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Created: {report.createdDate}
                          </div>
                          {report.lastGenerated && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              Generated: {report.lastGenerated}
                            </div>
                          )}
                          <div>{report.size}</div>
                          <div>{report.format}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                          {report.scheduled && (
                            <Badge variant="outline" className="text-xs">
                              {report.frequency}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {report.status === "ready" && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
