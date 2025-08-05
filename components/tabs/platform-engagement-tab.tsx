"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PropertyData } from "@/lib/data-parser"
import { Play, Eye, Clock, Home, Map, Ruler, RotateCcw, Target, Activity } from "lucide-react"

interface PlatformEngagementTabProps {
  propertyData: PropertyData
}

export function PlatformEngagementTab({ propertyData }: PlatformEngagementTabProps) {
  return (
    <div className="space-y-6">
      {/* Platform Overview Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="bg-blue-50 border-blue-100 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Play className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Virtual Tour Starts</span>
            </div>
            <div className="text-3xl font-bold text-blue-700 mb-2">1,247</div>
            <div className="text-sm text-blue-600">+18% vs last month</div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-100 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Target className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">Tour Completions</span>
            </div>
            <div className="text-3xl font-bold text-green-700 mb-2">892</div>
            <div className="text-sm text-green-600">71.5% completion rate</div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-100 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">Avg. Tour Duration</span>
            </div>
            <div className="text-3xl font-bold text-purple-700 mb-2">2m 47s</div>
            <div className="text-sm text-purple-600">Above industry avg</div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-100 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-orange-600">Room Views/Session</span>
            </div>
            <div className="text-3xl font-bold text-orange-700 mb-2">8.3</div>
            <div className="text-sm text-orange-600">High engagement</div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Usage Analytics */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm border-0 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Feature Usage Analytics</CardTitle>
            <p className="text-gray-600">How visitors interact with tour features</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">360° Interactions</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">2,156</div>
                  <div className="text-sm text-gray-500">1.7 per visitor</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Home className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Dollhouse Views</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">445</div>
                  <div className="text-sm text-gray-500">35.7% usage rate</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Map className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Floor Plan Views</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">667</div>
                  <div className="text-sm text-gray-500">53.5% usage rate</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Ruler className="h-5 w-5 text-orange-600" />
                  <span className="font-medium">Measurement Tool</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">234</div>
                  <div className="text-sm text-gray-500">18.8% usage rate</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Engagement Quality</CardTitle>
            <p className="text-gray-600">Visitor behavior and interaction depth</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Tour Completion Rate</span>
                  <span className="text-sm font-bold text-gray-900">71.5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "71.5%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Feature Interaction Rate</span>
                  <span className="text-sm font-bold text-gray-900">84.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "84.2%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Return Visitor Rate</span>
                  <span className="text-sm font-bold text-gray-900">23.1%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: "23.1%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Deep Engagement Score</span>
                  <span className="text-sm font-bold text-gray-900">78.9%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: "78.9%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Room-Level Analytics */}
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">Room-Level Engagement</CardTitle>
          <p className="text-gray-600">Most viewed and engaged rooms in the property</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { room: "Living Room", views: 1247, avgTime: "45s", engagement: "92%", color: "blue" },
              { room: "Master Bedroom", views: 1089, avgTime: "38s", engagement: "87%", color: "green" },
              { room: "Kitchen", views: 1034, avgTime: "42s", engagement: "89%", color: "purple" },
              { room: "Main Bathroom", views: 892, avgTime: "28s", engagement: "76%", color: "orange" },
              { room: "Bedroom 2", views: 756, avgTime: "32s", engagement: "71%", color: "red" },
              { room: "Outdoor Patio", views: 623, avgTime: "35s", engagement: "68%", color: "indigo" },
            ].map((room, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-800">{room.room}</h4>
                  <Badge variant="outline" className={`text-${room.color}-600 border-${room.color}-200`}>
                    #{index + 1}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Views:</span>
                    <span className="font-semibold">{room.views.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg. Time:</span>
                    <span className="font-semibold">{room.avgTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Engagement:</span>
                    <span className="font-semibold">{room.engagement}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Time-Based Analytics */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm border-0 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Peak Viewing Times</CardTitle>
            <p className="text-gray-600">When visitors are most active</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "7:00 PM - 9:00 PM", visitors: 342, percentage: "27.4%" },
                { time: "12:00 PM - 2:00 PM", visitors: 298, percentage: "23.9%" },
                { time: "9:00 AM - 11:00 AM", visitors: 234, percentage: "18.8%" },
                { time: "2:00 PM - 4:00 PM", visitors: 189, percentage: "15.2%" },
                { time: "4:00 PM - 6:00 PM", visitors: 156, percentage: "12.5%" },
                { time: "Other Times", visitors: 28, percentage: "2.2%" },
              ].map((slot, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{slot.time}</span>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-800 h-2 rounded-full" style={{ width: slot.percentage }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-900">{slot.visitors}</span>
                    <Badge variant="outline" className="text-xs">
                      {slot.percentage}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Weekly Trends</CardTitle>
            <p className="text-gray-600">Visitor patterns by day of week</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { day: "Saturday", visitors: 245, growth: "+12%", width: "100%" },
                { day: "Sunday", visitors: 223, growth: "+8%", width: "91%" },
                { day: "Wednesday", visitors: 189, growth: "+15%", width: "77%" },
                { day: "Thursday", visitors: 167, growth: "+22%", width: "68%" },
                { day: "Friday", visitors: 156, growth: "+18%", width: "64%" },
                { day: "Tuesday", visitors: 134, growth: "+5%", width: "55%" },
                { day: "Monday", visitors: 133, growth: "+3%", width: "54%" },
              ].map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <Activity className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 w-20">{day.day}</span>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-800 h-2 rounded-full" style={{ width: day.width }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-900">{day.visitors}</span>
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-xs">
                      {day.growth}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">Engagement Funnel</CardTitle>
          <p className="text-gray-600">Visitor journey through the virtual tour experience</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { stage: "Tour Started", count: 1247, percentage: "100%", color: "blue" },
              { stage: "First Room Viewed", count: 1189, percentage: "95.3%", color: "green" },
              { stage: "Multiple Rooms Viewed", count: 1034, percentage: "82.9%", color: "purple" },
              { stage: "Feature Interaction", count: 892, percentage: "71.5%", color: "orange" },
              { stage: "Tour Completed", count: 756, percentage: "60.6%", color: "red" },
              { stage: "Contact/Inquiry", count: 52, percentage: "4.2%", color: "indigo" },
            ].map((stage, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-${stage.color}-500`}></div>
                    <span className="font-medium text-gray-800">{stage.stage}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{stage.count.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{stage.percentage}</div>
                    </div>
                    <div className="w-24">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`bg-${stage.color}-500 h-2 rounded-full`}
                          style={{ width: stage.percentage }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                {index < 5 && <div className="absolute left-6 top-full w-0.5 h-4 bg-gray-300"></div>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
