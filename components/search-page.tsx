"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Home, Bed, Bath, Car, TrendingUp } from "lucide-react"
import Image from "next/image"

interface SearchPageProps {
  onPropertySelect: (address: string) => void
}

const sampleProperties = [
  {
    address: "3 Bellavista Terrace, Paddington, QLD",
    price: "$1,340,589",
    bedrooms: 3,
    bathrooms: 3,
    carSpaces: 1,
    propertyType: "House",
    lastScanned: "2 days ago",
    insights: "High engagement",
  },
  {
    address: "15 Oxford Street, Bulimba, QLD",
    price: "$890,000",
    bedrooms: 2,
    bathrooms: 1,
    carSpaces: 1,
    propertyType: "Unit",
    lastScanned: "1 week ago",
    insights: "Moderate engagement",
  },
  {
    address: "42 Stanley Street, South Brisbane, QLD",
    price: "$2,100,000",
    bedrooms: 4,
    bathrooms: 3,
    carSpaces: 2,
    propertyType: "House",
    lastScanned: "3 days ago",
    insights: "Premium listing",
  },
]

export function SearchPage({ onPropertySelect }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProperties = sampleProperties.filter((property) =>
    property.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image
              src="/images/little-hinges-logo.png"
              alt="Little Hinges Logo"
              width={60}
              height={60}
              className="object-contain"
            />
            <h1 className="text-3xl font-bold text-gray-900">Little Hinges Property Insights</h1>
          </div>
          <p className="text-gray-600 text-lg">Advanced property analysis and data visualisation platform</p>
        </div>

        {/* Search Bar */}
        <div className="mb-2">
          <Card className="bg-white shadow-sm border-0 rounded-2xl">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search by address, suburb, or postcode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Property Count */}
        <div className="text-center mb-8">
          <p className="text-gray-500 text-sm">18,456 active properties</p>
        </div>

        {/* Property Results */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {searchQuery ? `Search Results (${filteredProperties.length})` : "Recent Properties"}
          </h2>

          {filteredProperties.map((property, index) => (
            <Card key={index} className="bg-white shadow-sm border-0 rounded-2xl hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.address}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Home className="h-4 w-4" />
                            <span>{property.propertyType}</span>
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
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{property.price}</div>
                        <div className="text-sm text-gray-500">Est. Value</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>Last scanned {property.lastScanned}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          <span>{property.insights}</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => onPropertySelect(property.address)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
                      >
                        View Insights
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredProperties.length === 0 && searchQuery && (
            <Card className="bg-white shadow-sm border-0 rounded-2xl">
              <CardContent className="p-8 text-center">
                <div className="text-gray-400 mb-2">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600">Try adjusting your search terms or browse our recent properties above.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2024 Little Hinges Australia. Advanced property insights and analytics.</p>
        </div>
      </div>
    </div>
  )
}
