'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import type { RoomData } from '@/lib/data-parser'
import { formatSheetDataForDisplay, getSyncStatusMessage } from '@/lib/sheets-utils'
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react'

interface RoomDetailModalProps {
  room: RoomData | null
  isOpen: boolean
  onClose: () => void
  onRefreshSheets?: () => Promise<void>
}

export function RoomDetailModal({ room, isOpen, onClose, onRefreshSheets }: RoomDetailModalProps) {
  if (!room) return null

  const displayName = room.name || `${room.type} - Room ${room.roomNumber || room.id.slice(0, 8)}`
  const condition = room.condition || 'Good'
  const features = room.features || []

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold capitalize">{displayName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Room Image */}
          <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
            <Image
              src={room.coverImage || `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(displayName)}`}
              alt={displayName}
              fill
              className="object-cover"
            />
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="condition">Condition</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="measurements">Measurements</TabsTrigger>
              <TabsTrigger value="additional">Additional Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4 min-h-[300px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle className="text-lg">Room Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Type:</span>
                      <Badge variant="outline">{room.type}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Area:</span>
                      <Badge variant="outline">{room.area} m²</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Condition:</span>
                      <Badge variant={condition === 'Excellent' ? 'default' : 'secondary'}>
                        {condition}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">{room.area}</div>
                      <div className="text-sm text-muted-foreground">Square Meters</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="condition" className="space-y-4 min-h-[300px]">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Condition Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Overall Condition</h4>
                      <Badge variant={condition === 'Excellent' ? 'default' : 'secondary'} className="text-lg px-4 py-2">
                        {condition}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Maintenance Required</h4>
                      <Badge variant="outline">None</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Notes</h4>
                    <p className="text-sm text-muted-foreground">
                      Room is in {condition.toLowerCase()} condition with no immediate maintenance requirements.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-4 min-h-[300px]">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Room Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {features.length > 0 ? features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Badge variant="outline">{feature}</Badge>
                      </div>
                    )) : (
                      <p className="text-sm text-muted-foreground">No specific features listed</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="measurements" className="space-y-4 min-h-[300px]">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Measurements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">{room.area}</div>
                      <div className="text-sm text-muted-foreground">Total Area (m²)</div>
                    </div>
                    {room.height && (
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold">{room.height.toFixed(1)}</div>
                        <div className="text-sm text-muted-foreground">Ceiling Height (m)</div>
                      </div>
                    )}
                    {room.volume && (
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold">{room.volume.toFixed(1)}</div>
                        <div className="text-sm text-muted-foreground">Volume (m³)</div>
                      </div>
                    )}
                    {room.width && (
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold">{room.width.toFixed(1)}</div>
                        <div className="text-sm text-muted-foreground">Width (m)</div>
                      </div>
                    )}
                    {room.depth && (
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold">{room.depth.toFixed(1)}</div>
                        <div className="text-sm text-muted-foreground">Depth (m)</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="additional" className="space-y-4 min-h-[300px]">
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Additional Details from Google Sheets</CardTitle>
                    {onRefreshSheets && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={onRefreshSheets}
                        className="flex items-center gap-2"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Refresh
                      </Button>
                    )}
                  </div>
                  {room.sheetData && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Synced {getSyncStatusMessage(room)}</span>
                      <span className="text-xs">• Sheet: {room.sheetData.sheetName}</span>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {room.sheetData ? (
                    <div className="space-y-4">
                      {formatSheetDataForDisplay(room.sheetData.data).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {formatSheetDataForDisplay(room.sheetData.data).map((item, index) => (
                            <div key={index} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                <div className="font-medium text-sm text-gray-900">{item.label}</div>
                                <div className="text-sm text-gray-600 mt-1">{item.value}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No additional data found in Google Sheets</p>
                          <p className="text-sm text-gray-400">Check that the sheet contains data for Room ID: {room.id}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No Google Sheets data available</p>
                      <p className="text-sm text-gray-400">Data may not be synced or sheets may be unavailable</p>
                      {onRefreshSheets && (
                        <Button
                          variant="outline"
                          onClick={onRefreshSheets}
                          className="mt-4"
                        >
                          Try Refresh
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
