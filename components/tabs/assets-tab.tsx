import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { PropertyData } from "@/lib/data-parser"
import { BarChart3, Camera, Home, Copy } from 'lucide-react'
import { RoomPanoramaGrid } from "@/components/google-drive-panorama"

interface AssetsTabProps {
  propertyData: PropertyData
}

export function AssetsTab({ propertyData }: AssetsTabProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      {/* Asset Navigation */}
      <Tabs defaultValue="virtualtour" className="w-full">
        <Card className="bg-white shadow-sm border-0 rounded-2xl">
          <CardContent className="p-2">
            <TabsList className="grid w-full grid-cols-4 bg-transparent gap-1">
              <TabsTrigger
                value="virtualtour"
                className="data-[state=active]:bg-gray-100 rounded-xl py-3 text-sm flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Virtual Tour
              </TabsTrigger>
              <TabsTrigger
                value="panoramas"
                className="data-[state=active]:bg-gray-100 rounded-xl py-3 text-sm flex items-center gap-2"
              >
                <Camera className="h-4 w-4" />
                360° Panoramas
              </TabsTrigger>
              <TabsTrigger
                value="floorplans"
                className="data-[state=active]:bg-gray-100 rounded-xl py-3 text-sm flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Floor Plans
              </TabsTrigger>
              <TabsTrigger
                value="images"
                className="data-[state=active]:bg-gray-100 rounded-xl py-3 text-sm flex items-center gap-2"
              >
                <Camera className="h-4 w-4" />
                Property Images
              </TabsTrigger>
            </TabsList>
          </CardContent>
        </Card>

        {/* Virtual Tour Section */}
        <TabsContent value="virtualtour">
          <Card className="bg-white shadow-sm border-0 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Virtual Tour</CardTitle>
              <p className="text-gray-600">Interactive 360° property walkthrough</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Virtual Tour Embed */}
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    src="https://openhouse.littlehinges.com.au/tour/3_Bellavista_Terrace-_PADDINGTON_QLD_4064-3576988532719121"
                    className="w-full h-full border-0"
                    title="Virtual Property Tour"
                    allowFullScreen
                  />
                </div>
                
                {/* Copy Link Section */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 mb-1">Share Virtual Tour</p>
                    <p className="text-xs text-gray-600 font-mono break-all">
                      https://openhouse.littlehinges.com.au/tour/3_Bellavista_Terrace-_PADDINGTON_QLD_4064-3576988532719121
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white"
                    onClick={() => copyToClipboard('https://openhouse.littlehinges.com.au/tour/3_Bellavista_Terrace-_PADDINGTON_QLD_4064-3576988532719121')}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Google Drive Panoramas */}
        <TabsContent value="panoramas">
          <RoomPanoramaGrid />
        </TabsContent>

        {/* Floor Plans Section */}
        <TabsContent value="floorplans">
          <Card className="bg-white shadow-sm border-0 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Floor Plans</CardTitle>
              <p className="text-gray-600">Architectural drawings and layout plans</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Marketing Floorplan */}
                <div className="bg-gray-100 rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-white flex items-center justify-center p-2">
                    <img 
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Marketing%20Floorplan.jpg-SK2XdyMVNBuVnfBWmzyHJbN4GraY8Y.jpeg" 
                      alt="Marketing Floorplan"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm text-gray-800 mb-1">Marketing Floorplan</h4>
                    <p className="text-xs text-gray-500 mb-2">2.4 MB • JPG</p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs flex-1 bg-transparent"
                        onClick={() => window.open('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Marketing%20Floorplan.jpg-SK2XdyMVNBuVnfBWmzyHJbN4GraY8Y.jpeg', '_blank')}
                      >
                        Preview
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs flex-1 bg-transparent"
                        onClick={() => downloadFile('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Marketing%20Floorplan.jpg-SK2XdyMVNBuVnfBWmzyHJbN4GraY8Y.jpeg', 'Marketing Floorplan.jpg')}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Floor 1 */}
                <div className="bg-gray-100 rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-white flex items-center justify-center p-2">
                    <img 
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Floor%201-prIgbJqhgcZHz3e3KScv59LVtAaNye.png" 
                      alt="Floor 1"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm text-gray-800 mb-1">Floor 1</h4>
                    <p className="text-xs text-gray-500 mb-2">2.1 MB • PNG</p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs flex-1 bg-transparent"
                        onClick={() => window.open('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Floor%201-prIgbJqhgcZHz3e3KScv59LVtAaNye.png', '_blank')}
                      >
                        Preview
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs flex-1 bg-transparent"
                        onClick={() => downloadFile('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Floor%201-prIgbJqhgcZHz3e3KScv59LVtAaNye.png', 'Floor 1.png')}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Floor 2 */}
                <div className="bg-gray-100 rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-white flex items-center justify-center p-2">
                    <img 
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Floor%202-374tKBjQIizwATFYNb4IhxtYa2mLbJ.png" 
                      alt="Floor 2"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm text-gray-800 mb-1">Floor 2</h4>
                    <p className="text-xs text-gray-500 mb-2">1.8 MB • PNG</p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs flex-1 bg-transparent"
                        onClick={() => window.open('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Floor%202-374tKBjQIizwATFYNb4IhxtYa2mLbJ.png', '_blank')}
                      >
                        Preview
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs flex-1 bg-transparent"
                        onClick={() => downloadFile('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Floor%202-374tKBjQIizwATFYNb4IhxtYa2mLbJ.png', 'Floor 2.png')}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Colour Schematic- Floor 1 */}
                <div className="bg-gray-100 rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-white flex items-center justify-center p-2">
                    <img 
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Colour%20Schematic-%20Floor%201-o0l0JWtxDn7JBcgccwrusFcYOLoove.jpeg" 
                      alt="Colour Schematic- Floor 1"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm text-gray-800 mb-1">Colour Schematic- Floor 1</h4>
                    <p className="text-xs text-gray-500 mb-2">3.2 MB • JPEG</p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs flex-1 bg-transparent"
                        onClick={() => window.open('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Colour%20Schematic-%20Floor%201-o0l0JWtxDn7JBcgccwrusFcYOLoove.jpeg', '_blank')}
                      >
                        Preview
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs flex-1 bg-transparent"
                        onClick={() => downloadFile('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Colour%20Schematic-%20Floor%201-o0l0JWtxDn7JBcgccwrusFcYOLoove.jpeg', 'Colour Schematic- Floor 1.jpeg')}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Colour Schematic- Floor 2 */}
                <div className="bg-gray-100 rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-white flex items-center justify-center p-2">
                    <img 
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Colour%20Schematic-%20Floor%202-kjwJ4X2GNRraI8k5DKlxdGixhaVcsO.jpeg" 
                      alt="Colour Schematic- Floor 2"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm text-gray-800 mb-1">Colour Schematic- Floor 2</h4>
                    <p className="text-xs text-gray-500 mb-2">2.9 MB • JPEG</p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs flex-1 bg-transparent"
                        onClick={() => window.open('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Colour%20Schematic-%20Floor%202-kjwJ4X2GNRraI8k5DKlxdGixhaVcsO.jpeg', '_blank')}
                      >
                        Preview
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs flex-1 bg-transparent"
                        onClick={() => downloadFile('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Colour%20Schematic-%20Floor%202-kjwJ4X2GNRraI8k5DKlxdGixhaVcsO.jpeg', 'Colour Schematic- Floor 2.jpeg')}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Property Images Section */}
        <TabsContent value="images">
          <Card className="bg-white shadow-sm border-0 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Property Images</CardTitle>
              <p className="text-gray-600">Property photos and documentation (14 rooms + 6 exterior images)</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Property Photos */}
                {[
                  { name: "Property Exterior", color: "purple", size: "3.2 MB" },
                  { name: "Front Entrance", color: "orange", size: "2.9 MB" },
                  { name: "Living Room Overview", color: "blue", size: "2.8 MB" },
                  { name: "Kitchen Detail", color: "green", size: "2.5 MB" },
                  { name: "Master Bedroom", color: "purple", size: "2.3 MB" },
                  { name: "Main Bathroom", color: "orange", size: "1.9 MB" },
                  { name: "Outdoor Patio", color: "blue", size: "3.1 MB" },
                  { name: "Garden Area", color: "green", size: "2.7 MB" },
                ].map((image, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-lg overflow-hidden group hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <Camera className="h-12 w-12 text-gray-600" />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm text-gray-800 mb-1">{image.name}</h4>
                      <p className="text-xs text-gray-500 mb-2">{image.size} • JPG</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
                          Preview
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Room-specific Images (14 rooms max) */}
                {propertyData.rooms.slice(0, 14).map((room, index) => (
                  <div
                    key={`room-${index}`}
                    className="bg-gray-100 rounded-lg overflow-hidden group hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <Home className="h-12 w-12 text-gray-600" />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm text-gray-800 mb-1">
                        Room {index + 1}: {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">2.1 MB • JPG</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
                          Preview
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
