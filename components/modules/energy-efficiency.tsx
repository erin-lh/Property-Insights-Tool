"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { PropertyData } from "@/lib/data-parser"
import { Zap, TrendingUp, CheckCircle, AlertTriangle, XCircle, ChevronDown, ChevronUp, Info, Thermometer } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface EnergyEfficiencyProps {
  propertyData: PropertyData | null
}

interface EnergyEfficiencyData {
  section: string
  nameLabel: string
  result: string
}

interface EnergySection {
  [key: string]: EnergyEfficiencyData[]
}

export function EnergyEfficiency({ propertyData }: EnergyEfficiencyProps) {
  const [energyData, setEnergyData] = useState<EnergySection>({})
  const [loading, setLoading] = useState(true)
  const [showDetails, setShowDetails] = useState(false)
  const [showHeatingCooling, setShowHeatingCooling] = useState(false)

  useEffect(() => {
    async function fetchEnergyEfficiencyData() {
      try {
        const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20Bellavista%20Terrace%20_%20Full%20Data%20Schema%20-%20Copy%20of%20Energy%20Effiency%20_%20Full%20Scope-8f3vurgkGCtOH4nlvirNFTyVenwjOs.csv')
        const csvText = await response.text()
        
        // Parse CSV
        const lines = csvText.split('\n').filter(line => line.trim() !== '')
        const allData: EnergyEfficiencyData[] = []
        
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''))
          if (values.length >= 3) {
            allData.push({
              section: values[0] || '',
              nameLabel: values[1] || '',
              result: values[2] || ''
            })
          }
        }
        
        // Group by section
        const sections: EnergySection = {}
        allData.forEach(item => {
          if (!sections[item.section]) {
            sections[item.section] = []
          }
          sections[item.section].push(item)
        })
        
        setEnergyData(sections)
      } catch (error) {
        console.error('Error fetching energy efficiency data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEnergyEfficiencyData()
  }, [])

  const getResultIcon = (result: string) => {
    const lowerResult = result.toLowerCase()
    if (lowerResult.includes('yes') || lowerResult.includes('good') || lowerResult.includes('excellent')) {
      return <CheckCircle className="h-4 w-4 text-green-600" />
    } else if (lowerResult.includes('no') || lowerResult.includes('poor') || lowerResult.includes('none')) {
      return <XCircle className="h-4 w-4 text-red-600" />
    } else {
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    }
  }

  const getResultBadgeColor = (result: string) => {
    const lowerResult = result.toLowerCase()
    if (lowerResult.includes('yes') || lowerResult.includes('good') || lowerResult.includes('excellent')) {
      return 'bg-green-100 text-green-800'
    } else if (lowerResult.includes('no') || lowerResult.includes('poor') || lowerResult.includes('none')) {
      return 'bg-red-100 text-red-800'
    } else {
      return 'bg-yellow-100 text-yellow-800'
    }
  }

  const isPassingResult = (result: string) => {
    const lowerResult = result.toLowerCase()
    return lowerResult.includes('yes') || lowerResult.includes('good') || lowerResult.includes('excellent')
  }

  // Get overview sections (3,7,11,12,14,20) and calculate pass rate
  const getOverviewData = () => {
    const overviewSections = ['3', '7', '11', '12', '14', '20']
    const overviewItems: EnergyEfficiencyData[] = []
    
    overviewSections.forEach(sectionKey => {
      if (energyData[sectionKey]) {
        overviewItems.push(...energyData[sectionKey])
      }
    })
    
    // Filter out Climate Zone from overview items and handle it separately
    const filteredOverviewItems = overviewItems.filter(item => 
      !item.nameLabel.toLowerCase().includes('climate zone')
    )
    
    return { overviewItems: filteredOverviewItems }
  }

  // Get climate zone data
  const getClimateZoneData = () => {
    let climateZoneItem = null
    Object.values(energyData).forEach(sectionItems => {
      sectionItems.forEach(item => {
        if (item.nameLabel.toLowerCase().includes('climate zone')) {
          climateZoneItem = item
        }
      })
    })
    return climateZoneItem
  }

  // Get remaining sections (excluding 1 and overview sections)
  const getRemainingData = () => {
    const overviewSections = ['1', '3', '7', '11', '12', '14', '20']
    const remainingSections: EnergySection = {}
    
    Object.entries(energyData).forEach(([sectionKey, sectionItems]) => {
      if (!overviewSections.includes(sectionKey)) {
        remainingSections[sectionKey] = sectionItems
      }
    })
    
    return remainingSections
  }

  // Get section 1 info data
  const getInfoData = () => {
    return energyData['1'] || []
  }

  // Check if there's an "Efficient heating and cooling" item
  const getHeatingCoolingItem = () => {
    let heatingCoolingItem = null
    Object.values(energyData).forEach(sectionItems => {
      sectionItems.forEach(item => {
        if (item.nameLabel.toLowerCase().includes('efficient heating and cooling')) {
          heatingCoolingItem = item
        }
      })
    })
    return heatingCoolingItem
  }

  if (loading) {
    return (
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { overviewItems } = getOverviewData()
  const remainingSections = getRemainingData()
  const infoData = getInfoData()
  const climateZoneItem = getClimateZoneData()
  const heatingCoolingItem = getHeatingCoolingItem()

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-600" />
          Energy Efficiency
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Feature Count and Score */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-gray-900">Energy Features</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                5/11
              </div>
              <div className="text-sm text-gray-600">
                Features Passing
              </div>
            </div>
          </div>
        </div>

        {/* Climate Zone Info */}
        {climateZoneItem && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-4 w-4 text-gray-600" />
              <span className="font-medium text-gray-900">Climate Information</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">{climateZoneItem.nameLabel}</span>
              <span className="text-sm font-medium text-gray-900">{climateZoneItem.result}</span>
            </div>
          </div>
        )}

        {/* Section 1 Info (No Pass/Fail) */}
        {infoData.length > 0 && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-4 w-4 text-gray-600" />
              <span className="font-medium text-gray-900">Property Information</span>
            </div>
            <div className="space-y-2">
              {infoData.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{item.nameLabel}</span>
                  <span className="text-sm font-medium text-gray-900">{item.result}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Overview - Passing Features */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Key Energy Features</h4>
          {overviewItems.map((item, index) => (
            <div key={index}>
              {item.nameLabel.toLowerCase().includes('efficient heating and cooling') ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      {getResultIcon(item.result)}
                      <span className="text-sm text-gray-700">{item.nameLabel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={getResultBadgeColor(item.result)}>
                        {item.result}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowHeatingCooling(!showHeatingCooling)}
                        className="p-1 h-6 w-6"
                      >
                        {showHeatingCooling ? (
                          <ChevronUp className="h-3 w-3 text-gray-600" />
                        ) : (
                          <ChevronDown className="h-3 w-3 text-gray-600" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  {showHeatingCooling && (
                    <div className="ml-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Thermometer className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">3 air conditioning units found</span>
                      </div>
                      
                      <div className="mb-3">
                        <Image
                          src="/images/fujitsu-ac-specs.png"
                          alt="Fujitsu Air Conditioning Unit Specifications"
                          width={400}
                          height={300}
                          className="rounded-lg border border-gray-200"
                        />
                      </div>
                      
                      <div className="space-y-2 text-sm text-blue-800">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="font-medium">Brand:</span> FUJITSU
                          </div>
                          <div>
                            <span className="font-medium">Model:</span> AOTH24KNTA/ASTH24KNTA
                          </div>
                          <div>
                            <span className="font-medium">10 Year Cost:</span> $9015.20
                          </div>
                          <div>
                            <span className="font-medium">Energy Rating:</span> 3.5 Stars
                          </div>
                        </div>
                        <div className="pt-2 border-t border-blue-200">
                          <p className="text-xs text-blue-700">
                            High-efficiency reverse cycle air conditioning units providing both heating (8.00 kW) and cooling (7.10 kW) capacity with excellent energy ratings.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    {getResultIcon(item.result)}
                    <span className="text-sm text-gray-700">{item.nameLabel}</span>
                  </div>
                  <Badge variant="secondary" className={getResultBadgeColor(item.result)}>
                    {item.result}
                  </Badge>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dropdown for Additional Features */}
        {Object.keys(remainingSections).length > 0 && (
          <div className="border-t border-gray-100 pt-4">
            <Button
              variant="ghost"
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between p-2 hover:bg-gray-50"
            >
              <span className="font-medium text-gray-900">Additional Energy Features</span>
              {showDetails ? (
                <ChevronUp className="h-4 w-4 text-gray-600" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-600" />
              )}
            </Button>
            
            {showDetails && (
              <div className="mt-3 space-y-3">
                {Object.entries(remainingSections).map(([sectionKey, sectionItems]) => (
                  <div key={sectionKey} className="border border-gray-200 rounded-lg p-3">
                    <div className="space-y-2">
                      {sectionItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            {getResultIcon(item.result)}
                            <span className="text-sm text-gray-700">{item.nameLabel}</span>
                          </div>
                          <Badge variant="secondary" className={getResultBadgeColor(item.result)}>
                            {item.result}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
