"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, TrendingUp, Phone, Mail, Calendar, Star, Plus, Filter, Search, Eye, MessageSquare, Clock } from 'lucide-react'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  source: string
  enquiryType: "General Enquiry" | "Make An Offer" | "Arrange Inspection"
  enquiryDate: string
  lastContact: string
  notes: string
  viewTime: number
  engagementLevel: "low" | "medium" | "high"
}

const sampleLeads: Lead[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+61 412 345 678",
    source: "Virtual Tour",
    enquiryType: "Make An Offer",
    enquiryDate: "2024-01-15",
    lastContact: "2024-01-15",
    notes: "Very interested in the property. Asking about settlement dates.",
    viewTime: 180,
    engagementLevel: "high",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+61 423 456 789",
    source: "Website",
    enquiryType: "Arrange Inspection",
    enquiryDate: "2024-01-12",
    lastContact: "2024-01-14",
    notes: "Scheduled for physical inspection this weekend.",
    viewTime: 240,
    engagementLevel: "high",
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma.w@email.com",
    phone: "+61 434 567 890",
    source: "Social Media",
    enquiryType: "General Enquiry",
    enquiryDate: "2024-01-10",
    lastContact: "2024-01-13",
    notes: "Initial contact made. Waiting for response.",
    viewTime: 90,
    engagementLevel: "medium",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david.brown@email.com",
    phone: "+61 445 678 901",
    source: "Virtual Tour",
    enquiryType: "General Enquiry",
    enquiryDate: "2024-01-08",
    lastContact: "2024-01-12",
    notes: "New lead from virtual tour engagement.",
    viewTime: 150,
    engagementLevel: "medium",
  },
]

export function LeadsTab() {
  const [leads, setLeads] = useState<Lead[]>(sampleLeads)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    notes: "",
  })

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || lead.enquiryType === statusFilter
    return matchesSearch && matchesStatus
  })

  const getEngagementColor = (level: string) => {
    switch (level) {
      case "high":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const handleAddLead = () => {
    const lead: Lead = {
      id: Date.now().toString(),
      ...newLead,
      enquiryType: "General Enquiry",
      enquiryDate: new Date().toISOString().split("T")[0],
      lastContact: new Date().toISOString().split("T")[0],
      viewTime: Math.floor(Math.random() * 200) + 60,
      engagementLevel: "medium",
    }
    setLeads([...leads, lead])
    setNewLead({ name: "", email: "", phone: "", source: "", notes: "" })
    setIsAddLeadOpen(false)
  }

  const leadStats = {
    total: leads.length,
    new: leads.filter((l) => l.enquiryType === "General Enquiry").length,
  }

  return (
    <div className="space-y-6">
      {/* Lead Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-white shadow-sm border-0 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{leadStats.total}</div>
                <div className="text-sm text-gray-500">Total Leads</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{leadStats.new}</div>
                <div className="text-sm text-gray-500">New Leads</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead Management */}
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by enquiry type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="General Enquiry">General Enquiry</SelectItem>
                <SelectItem value="Make An Offer">Make An Offer</SelectItem>
                <SelectItem value="Arrange Inspection">Arrange Inspection</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Leads List */}
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <Card key={lead.id} className="border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-lg font-semibold text-gray-600">
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {lead.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {lead.phone}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Button variant="outline" size="sm" className="pointer-events-none mb-2">
                          {lead.enquiryType}
                        </Button>
                        <div className="text-sm text-gray-500">
                          Enquired: {lead.enquiryDate}
                        </div>
                      </div>
                    </div>
                  </div>

                  {lead.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{lead.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedLead.name}</DialogTitle>
              <DialogDescription>Lead details and interaction history</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <p className="text-sm text-gray-600">{selectedLead.email}</p>
                </div>
                <div>
                  <Label>Phone</Label>
                  <p className="text-sm text-gray-600">{selectedLead.phone}</p>
                </div>
                <div>
                  <Label>Source</Label>
                  <p className="text-sm text-gray-600">{selectedLead.source}</p>
                </div>
                <div>
                  <Label>Enquiry Type</Label>
                  <p className="text-sm text-gray-600">{selectedLead.enquiryType}</p>
                </div>
                <div>
                  <Label>Enquiry Date</Label>
                  <p className="text-sm text-gray-600">{selectedLead.enquiryDate}</p>
                </div>
                <div>
                  <Label>Lead Score</Label>
                  <p className="text-sm text-gray-600">{selectedLead.viewTime}/100</p>
                </div>
                <div>
                  <Label>Engagement Level</Label>
                  <p className={`text-sm font-medium ${getEngagementColor(selectedLead.engagementLevel)}`}>
                    {selectedLead.engagementLevel}
                  </p>
                </div>
              </div>

              <div>
                <Label>Notes</Label>
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{selectedLead.notes}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Lead
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
