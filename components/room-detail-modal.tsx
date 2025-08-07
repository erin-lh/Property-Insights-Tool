'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'

interface Room {
  id: string
  name: string
  type: string
  area: number
  condition: string
  features: string[]
  image?: string
}

interface RoomDetailModalProps {
  room: Room | null
  isOpen: boolean
  onClose: () => void
}

export function RoomDetailModal({ room, isOpen, onClose }: RoomDetailModalProps) {
  if (!room) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{room.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Room Image */}
          <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
            <Image
              src={room.image || `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(room.name)}`}
              alt={room.name}
              fill
              className="object-cover"
            />
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="condition">Condition</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="measurements">Measurements</TabsTrigger>
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
                      <Badge variant={room.condition === 'Excellent' ? 'default' : 'secondary'}>
                        {room.condition}
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
                      <Badge variant={room.condition === 'Excellent' ? 'default' : 'secondary'} className="text-lg px-4 py-2">
                        {room.condition}
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
                      Room is in {room.condition.toLowerCase()} condition with no immediate maintenance requirements.
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
                    {room.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Badge variant="outline">{feature}</Badge>
                      </div>
                    ))}
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
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">2.7</div>
                      <div className="text-sm text-muted-foreground">Ceiling Height (m)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
