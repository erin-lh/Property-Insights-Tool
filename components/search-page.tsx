"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Home, Bed, Bath, Car, Ruler, Download } from "lucide-react"

interface SearchPageProps {
  onPropertySelect: (address: string) => void
}

const mockProperties = [
  {
    address: "3 Bellavista Terrace, Paddington, QLD, 4064",
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    carSpaces: 2,
    area: 607,
    estimatedValue: 2850000,
    isMainProperty: true,
  },
  {
    address: "15 Oxford Street, Paddington, QLD, 4064",
    type: "House",
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 1,
    area: 485,
    estimatedValue: 2100000,
    isMainProperty: false,
  },
  {
    address: "42 Given Terrace, Paddington, QLD, 4064",
    type: "House",
    bedrooms: 5,
    bathrooms: 3,
    carSpaces: 2,
    area: 720,
    estimatedValue: 3200000,
    isMainProperty: false,
  },
  {
    address: "8 Latrobe Terrace, Paddington, QLD, 4064",
    type: "House",
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 1,
    area: 520,
    estimatedValue: 2400000,
    isMainProperty: false,
  },
  {
    address: "27 Hale Street, Paddington, QLD, 4064",
    type: "House",
    bedrooms: 4,
    bathrooms: 2,
    carSpaces: 2,
    area: 580,
    estimatedValue: 2650000,
    isMainProperty: false,
  },
]

export function SearchPage({ onPropertySelect }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showResults, setShowResults] = useState(false)

  const handleSearch = () => {
    setShowResults(true)
  }

  const handlePropertyClick = (address: string) => {
    onPropertySelect(address)
  }

  const filteredProperties = mockProperties.filter((property) =>
    property.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4 max-w-7xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded border border-gray-300 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">Hinges</span>
                </div>
                <h1 className="text-xl font-semibold text-gray-900">Little Hinges Property Insights</h1>
              </div>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            <div className="relative max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Search for a property address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-4 pr-12 text-lg border-gray-300 rounded-lg shadow-sm"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button
                onClick={handleSearch}
                className="absolute right-2 top-2 h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="space-y-4">
            {filteredProperties.map((property, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  property.isMainProperty ? "ring-2 ring-blue-500 bg-blue-50" : "bg-white"
                }`}
                onClick={() => handlePropertyClick(property.address)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.address}</h3>
                      <div className="flex items-center gap-6 text-gray-600">
                        <div className="flex items-center gap-1">
                          <Home className="h-4 w-4" />
                          <span>{property.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          <span>{property.bedrooms} bed</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="h-4 w-4" />
                          <span>{property.bathrooms} bath</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Car className="h-4 w-4" />
                          <span>{property.carSpaces} car</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Ruler className="h-4 w-4" />
                          <span>{property.area} sqm</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        ${property.estimatedValue.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">Est. Value</div>
                    </div>
                  </div>
                  {property.isMainProperty && (
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <div className="flex items-center gap-2 text-blue-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm font-medium">Full insights available</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded border border-gray-300 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">Hinges</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Little Hinges Property Insights</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center max-w-2xl mx-auto px-4">
          {/* Search Icon */}
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <Search className="h-8 w-8 text-white" />
          </div>

          {/* Welcome Text */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Property Insights</h2>
          <p className="text-lg text-gray-600 mb-8">
            Search for a property above to access comprehensive data visualization, room insights, and analytics.
          </p>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Input
              type="text"
              placeholder="Search for a property address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-6 pr-14 text-lg border-gray-300 rounded-xl shadow-sm"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              onClick={handleSearch}
              className="absolute right-3 top-3 h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Sample Property Button */}
          <Button
            onClick={() => handlePropertyClick("3 Bellavista Terrace, Paddington, QLD, 4064")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-xl"
          >
            View Sample Property
          </Button>
        </div>
      </div>
    </div>
  )
}
