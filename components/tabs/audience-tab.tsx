"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { PropertyData } from "@/lib/data-parser"
import {
  Users,
  Eye,
  Clock,
  TrendingUp,
  Smartphone,
  Monitor,
  Tablet,
  MapPin,
  Globe,
  Search,
  Share2,
  Mail,
  ExternalLink,
} from "lucide-react"

interface AudienceTabProps {
  propertyData: PropertyData
}

export function AudienceTab({ propertyData }: AudienceTabProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("30 Days")
  const [selectedTab, setSelectedTab] = useState("Devices")

  const periods = ["7 Days", "30 Days", "90 Days"]
  const tabs = ["Geographic", "Devices", "Behavior", "Timing", "Trends"]

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold text-gray-800">In-Depth Audience Tracking</CardTitle>
              <p className="text-gray-600 mt-1">Comprehensive visitor analytics and behavior insights • Last 30 days</p>
            </div>
            <div className="flex gap-2">
              {periods.map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                  className={selectedPeriod === period ? "bg-gray-900 text-white" : "bg-transparent"}
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="bg-blue-50 border-blue-100 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Total Visitors</span>
            </div>
            <div className="text-3xl font-bold text-blue-700 mb-2">1,247</div>
            <div className="text-sm text-blue-600">+X.X% vs last period</div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-100 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">Page Views</span>
            </div>
            <div className="text-3xl font-bold text-green-700 mb-2">3,891</div>
            <div className="text-sm text-green-600">X.X pages per visitor</div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-100 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">Avg. Session</span>
            </div>
            <div className="text-3xl font-bold text-purple-700 mb-2">2m 47s</div>
            <div className="text-sm text-purple-600">High engagement time</div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-100 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-orange-600">Conversion Rate</span>
            </div>
            <div className="text-3xl font-bold text-orange-700 mb-2">4.2%</div>
            <div className="text-sm text-orange-600">Above industry average</div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardContent className="p-2">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant={selectedTab === tab ? "default" : "ghost"}
                onClick={() => setSelectedTab(tab)}
                className={`flex-1 ${
                  selectedTab === tab
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {tab}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Based on Selected Tab */}
      {selectedTab === "Devices" && (
        <Card className="bg-white shadow-sm border-0 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Device & Platform Analysis</CardTitle>
            <p className="text-gray-600">How visitors access and interact with your listing</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-8">
              {/* Mobile */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Smartphone className="h-12 w-12 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Mobile</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">71%</div>
                <div className="text-sm text-gray-600 mb-2">885 visitors</div>
                <div className="text-sm text-gray-500 mb-4">Avg: 2m 12s</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-800 h-2 rounded-full" style={{ width: "71%" }}></div>
                </div>
              </div>

              {/* Desktop */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Monitor className="h-12 w-12 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Desktop</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">22%</div>
                <div className="text-sm text-gray-600 mb-2">274 visitors</div>
                <div className="text-sm text-gray-500 mb-4">Avg: 4m 18s</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-800 h-2 rounded-full" style={{ width: "22%" }}></div>
                </div>
              </div>

              {/* Tablet */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Tablet className="h-12 w-12 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Tablet</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">7%</div>
                <div className="text-sm text-gray-600 mb-2">88 visitors</div>
                <div className="text-sm text-gray-500 mb-4">Avg: 3m 05s</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-800 h-2 rounded-full" style={{ width: "7%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTab === "Geographic" && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Geographic Distribution */}
          <Card className="bg-white shadow-sm border-0 rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-gray-600" />
                <CardTitle className="text-xl font-semibold text-gray-800">Geographic Distribution</CardTitle>
              </div>
              <p className="text-gray-600">Visitor locations and regional growth</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { city: "Brisbane, QLD", visitors: "542 visitors", growth: "+18%", width: "100%" },
                { city: "Sydney, NSW", visitors: "271 visitors", growth: "+12%", width: "50%" },
                { city: "Melbourne, VIC", visitors: "198 visitors", growth: "+8%", width: "40%" },
                { city: "Gold Coast, QLD", visitors: "134 visitors", growth: "+15%", width: "27%" },
                { city: "Perth, WA", visitors: "67 visitors", growth: "+22%", width: "19%" },
                { city: "Adelaide, SA", visitors: "23 visitors", growth: "+5%", width: "14%" },
                { city: "Other Australia", visitors: "12 visitors", growth: "+31%", width: "13%" },
                { city: "International", visitors: "XX", growth: "+XX%", width: "6%" },
              ].map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{location.city}</span>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-800 h-2 rounded-full" style={{ width: location.width }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-900">{location.visitors}</span>
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                      {location.growth}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card className="bg-white shadow-sm border-0 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Traffic Sources</CardTitle>
              <p className="text-gray-600">How visitors discover your property</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { source: "Direct Traffic", visitors: "542 (43%)", avg: "Avg: 3m 12s", color: "blue", width: "100%" },
                { source: "Social Media", visitors: "374 (30%)", avg: "Avg: 2m 08s", color: "green", width: "69%" },
                { source: "Search Engines", visitors: "298 (24%)", avg: "Avg: 2m 45s", color: "purple", width: "55%" },
                {
                  source: "Real Estate Portals",
                  visitors: "33 (3%)",
                  avg: "Avg: 4m 22s",
                  color: "orange",
                  width: "33%",
                },
                { source: "Email Marketing", visitors: "XX (X%)", avg: "Avg: Xm XXs", color: "red", width: "14%" },
                { source: "Referral Sites", visitors: "XX (X%)", avg: "Avg: Xm XXs", color: "indigo", width: "6%" },
              ].map((source, index) => {
                const icons = {
                  "Direct Traffic": <Globe className="h-4 w-4" />,
                  "Social Media": <Share2 className="h-4 w-4" />,
                  "Search Engines": <Search className="h-4 w-4" />,
                  "Real Estate Portals": <ExternalLink className="h-4 w-4" />,
                  "Email Marketing": <Mail className="h-4 w-4" />,
                  "Referral Sites": <ExternalLink className="h-4 w-4" />,
                }

                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-3 h-3 rounded-full bg-${source.color}-500`}></div>
                      {icons[source.source as keyof typeof icons]}
                      <span className="text-sm font-medium text-gray-700">{source.source}</span>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-gray-800 h-2 rounded-full" style={{ width: source.width }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">{source.visitors}</div>
                      <div className="text-xs text-gray-500">{source.avg}</div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Platform Engagement */}
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">Platform Engagement</CardTitle>
          <p className="text-gray-600">How visitors engage with the platform features</p>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold text-gray-700">Virtual Tour Starts</div>
            <div className="text-2xl font-bold text-gray-900">1,247</div>
          </div>
          <div>
            <div className="font-semibold text-gray-700">Tour Completions</div>
            <div className="text-2xl font-bold text-gray-900">892 (71.5%)</div>
          </div>
          <div>
            <div className="font-semibold text-gray-700">Average Tour Duration</div>
            <div className="text-2xl font-bold text-gray-900">2m 47s</div>
          </div>
          <div>
            <div className="font-semibold text-gray-700">Room Views per Session</div>
            <div className="text-2xl font-bold text-gray-900">8.3</div>
          </div>
          <div>
            <div className="font-semibold text-gray-700">360° Interactions</div>
            <div className="text-2xl font-bold text-gray-900">2,156</div>
          </div>
          <div>
            <div className="font-semibold text-gray-700">Dollhouse Views</div>
            <div className="text-2xl font-bold text-gray-900">445</div>
          </div>
          <div>
            <div className="font-semibold text-gray-700">Floor Plan Views</div>
            <div className="text-2xl font-bold text-gray-900">667</div>
          </div>
          <div>
            <div className="font-semibold text-gray-700">Measurement Tool Usage</div>
            <div className="text-2xl font-bold text-gray-900">234</div>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder for other tabs */}
      {!["Devices", "Geographic"].includes(selectedTab) && (
        <Card className="bg-white shadow-sm border-0 rounded-2xl">
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              {selectedTab === "Behavior" && <Users className="h-16 w-16 mx-auto" />}
              {selectedTab === "Timing" && <Clock className="h-16 w-16 mx-auto" />}
              {selectedTab === "Trends" && <TrendingUp className="h-16 w-16 mx-auto" />}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{selectedTab} Analytics</h3>
            <p className="text-gray-600">{selectedTab} data will be displayed here</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
