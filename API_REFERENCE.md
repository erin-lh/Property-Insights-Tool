# Property Insights Tool - API & Data Reference

## 📊 Data Models & Interfaces

### PropertyData Interface
Complete property-level data structure from `lib/data-parser.ts`:

\`\`\`typescript
export interface PropertyData {
  // Core Identifiers
  id: string
  matterportTourId: string
  address: string
  
  // Pricing Information
  estimatedPrice: number
  lowPrice: number
  highPrice: number
  lastSalePrice: number
  propertyValuation: number
  
  // Physical Dimensions
  totalArea: number
  floorArea: number
  landArea: number
  bedArea: number
  masterBedArea: number
  bathArea: number
  
  // Room Counts
  bedrooms: number
  bathrooms: number
  carSpaces: number
  
  // Property Details
  buildYear: string
  propertyType: string
  floors: number
  ceilingHeight: number
  hallwayAvgWidth: number
  climateZone: string
  postcode: string
  sqft: number
  yearBuilt: number
  lotSize: string
  parkingSpaces: number
  
  // Analytics Data
  views: number
  avgDailyViews: number
  avgSessionTime: number
  engagedInspections: number
  engagedVisitors: number
  panoramaCount: number
  
  // Scan Information
  scanPurpose: string
  scanDate: string
  scanDuration: string
  scanQuality: string
  
  // Condition Assessment
  propertyCondition: string
  maintenanceRequired: string
  structuralIssues: string
  
  // Energy & Materials
  energyRating: string
  heatingCooling: string
  insulation: string
  windows: string
  flooringType: string
  wallMaterial: string
  
  // Room Data
  rooms: RoomData[]
}
\`\`\`

### RoomData Interface
Individual room data structure:

\`\`\`typescript
export interface RoomData {
  // Core Identifiers
  id: string
  propertyId: string
  roomNumber: number
  type: string
  name: string
  
  // Physical Dimensions
  area: number
  volume?: number
  width?: number
  depth?: number
  height?: number
  
  // Condition & Materials
  condition: string
  flooring: string
  wallMaterial: string
  ceilingType: string
  
  // Features & Amenities
  windows: number
  doors: number
  airConditioning: boolean
  heatingVents: number
  ceilingFan: boolean
  ceilingLights: number
  wallLights: number
  powerPoints: number
  smokeAlarm: boolean
  
  // Documentation
  panoramaLinks: string[]
  panoramaCount: number
  
  // Special Features (room-type specific)
  builtInWardrobe?: boolean
  ensuite?: boolean
  walkInRobe?: boolean
  kitchenIsland?: boolean
  splashback?: string
  benchtopMaterial?: string
  cabinetMaterial?: string
  appliances?: string[]
  
  // Damage Assessment
  damageLevel?: string
  damageDescription?: string
  maintenanceRequired?: string
}
\`\`\`

## 🔌 Data Processing Functions

### CSV Parser Functions
Located in `lib/data-parser.ts`:

\`\`\`typescript
/**
 * Basic CSV data parser
 * @param csvText Raw CSV data as string
 * @returns Parsed PropertyData object
 */
export function parseCSVData(csvText: string): PropertyData

/**
 * Enhanced CSV parser with full room data
 * @param csvText Raw CSV data as string
 * @returns PropertyData with complete room information
 */
export function parseCSVDataWithAllRooms(csvText: string): PropertyData

/**
 * Parse individual room data from CSV row
 * @param row CSV row data
 * @param propertyId Associated property identifier
 * @returns RoomData object
 */
function parseRoomData(row: any, propertyId: string): RoomData

/**
 * Clean and validate numeric values
 * @param value Raw value from CSV
 * @param defaultValue Fallback value
 * @returns Cleaned numeric value
 */
function cleanNumeric(value: any, defaultValue: number = 0): number

/**
 * Clean and validate string values
 * @param value Raw value from CSV
 * @param defaultValue Fallback value
 * @returns Cleaned string value
 */
function cleanString(value: any, defaultValue: string = ""): string
\`\`\`

## 🗄️ Supabase Database Functions

### Property Data Functions
Located in `lib/supabase.ts`:

\`\`\`typescript
/**
 * Retrieve property data by ID
 * @param propertyId Unique property identifier
 * @returns Promise<PropertyData | null>
 */
export async function getPropertyData(propertyId: string): Promise<PropertyData | null>

/**
 * Retrieve all rooms for a property
 * @param propertyId Property identifier
 * @returns Promise<RoomData[]>
 */
export async function getRoomData(propertyId: string): Promise<RoomData[]>

/**
 * Retrieve energy efficiency data
 * @param propertyId Property identifier
 * @returns Promise<EnergyEfficiencyData[]>
 */
export async function getEnergyEfficiencyData(propertyId: string): Promise<EnergyEfficiencyData[]>

/**
 * Retrieve damage assessment data
 * @param propertyId Property identifier
 * @returns Promise<DamageData[]>
 */
export async function getDamageData(propertyId: string): Promise<DamageData[]>

/**
 * Insert or update property data
 * @param propertyData Complete property data object
 * @returns Promise<boolean>
 */
export async function upsertPropertyData(propertyData: PropertyData): Promise<boolean>

/**
 * Insert or update room data
 * @param roomData Room data object
 * @returns Promise<boolean>
 */
export async function upsertRoomData(roomData: RoomData): Promise<boolean>
\`\`\`

## 🗄️ Google Sheets Integration

### Property Data Functions
Located in `app/api/sheets/route.ts`:

\`\`\`typescript
/**
 * Retrieve property data from Google Sheets
 * @param sheetName Sheet identifier
 * @returns Promise<PropertyData | null>
 */
export async function getPropertyData(sheetName: string): Promise<PropertyData | null>

/**
 * Retrieve all rooms for a property
 * @param propertyId Property identifier
 * @returns Promise<RoomData[]>
 */
export async function getRoomData(propertyId: string): Promise<RoomData[]>

/**
 * Retrieve energy efficiency data
 * @param propertyId Property identifier
 * @returns Promise<EnergyEfficiencyData[]>
 */
export async function getEnergyEfficiencyData(propertyId: string): Promise<EnergyEfficiencyData[]>
\`\`\`

## 🎨 UI Component Props

### Core Component Interfaces

#### RoomCard Props
\`\`\`typescript
interface RoomCardProps {
  room: RoomData
  onViewDetails: (room: RoomData) => void
  onViewPanorama?: (room: RoomData) => void
  onCompare?: (room: RoomData) => void
}
\`\`\`

#### RoomDetailModal Props
\`\`\`typescript
interface RoomDetailModalProps {
  room: RoomData | null
  isOpen: boolean
  onClose: () => void
}
\`\`\`

#### RoomComparisonModal Props
\`\`\`typescript
interface RoomComparisonModalProps {
  rooms: RoomData[]
  isOpen: boolean
  onClose: () => void
}
\`\`\`

#### SearchPage Props
\`\`\`typescript
interface SearchPageProps {
  onPropertySelect: (address: string) => void
}
\`\`\`

#### Tab Component Props
\`\`\`typescript
interface TabComponentProps {
  propertyData: PropertyData
  onRoomSelect?: (room: RoomData) => void
  onRoomCompare?: (rooms: RoomData[]) => void
}
\`\`\`

## 🔧 Utility Functions

### Class Name Utilities
Located in `lib/utils.ts`:

\`\`\`typescript
/**
 * Merge Tailwind CSS classes with proper conflict resolution
 * @param inputs Class names to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string

/**
 * Format room type for display
 * @param roomType Raw room type
 * @returns Formatted display name
 */
export function formatRoomType(roomType: string): string

/**
 * Calculate percentage difference between values
 * @param value1 First value
 * @param value2 Second value
 * @returns Formatted percentage difference
 */
export function getPercentageDiff(value1: number, value2: number): string

/**
 * Format currency values
 * @param amount Numeric amount
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string

/**
 * Format area measurements
 * @param area Area in square meters
 * @returns Formatted area string
 */
export function formatArea(area: number): string
\`\`\`

## 📊 Component State Management

### Main Application State
\`\`\`typescript
// Primary application state
const [propertyData, setPropertyData] = useState<PropertyData | null>(null)
const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null)
const [loading, setLoading] = useState(true)
const [showRoomDetail, setShowRoomDetail] = useState(false)
const [showSearch, setShowSearch] = useState(true)
const [selectedAddress, setSelectedAddress] = useState<string>("")

// Room comparison state
const [selectedRooms, setSelectedRooms] = useState<RoomData[]>([])
const [showComparison, setShowComparison] = useState(false)

// Tab navigation state
const [activeTab, setActiveTab] = useState("overview")
\`\`\`

### Event Handlers
\`\`\`typescript
// Property selection
const handlePropertySelect = (address: string) => {
  setSelectedAddress(address)
  setShowSearch(false)
}

// Room interaction
const handleRoomClick = (room: RoomData) => {
  setSelectedRoom(room)
  setShowRoomDetail(true)
}

// Room comparison
const handleRoomCompare = (rooms: RoomData[]) => {
  setSelectedRooms(rooms)
  setShowComparison(true)
}

// Navigation
const handleBackToSearch = () => {
  setShowSearch(true)
  setSelectedAddress("")
}
\`\`\`

## 🎯 Component Integration Examples

### Adding a New Property Feature
\`\`\`typescript
// 1. Extend PropertyData interface
interface PropertyData {
  // ... existing fields
  newFeature: string
  newFeatureData: NewFeatureData[]
}

// 2. Create component
export function NewFeatureComponent({ data }: { data: PropertyData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Feature: {data.newFeature}</CardTitle>
      </CardHeader>
      <CardContent>
        {data.newFeatureData.map((item) => (
          <div key={item.id}>
            {/* Feature content */}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// 3. Add to main application
<Tabs>
  <TabsContent value="new-feature">
    <NewFeatureComponent data={propertyData} />
  </TabsContent>
</Tabs>
\`\`\`

### Creating a Custom Room Analysis
\`\`\`typescript
// Custom analysis component
export function CustomRoomAnalysis({ rooms }: { rooms: RoomData[] }) {
  const analysis = useMemo(() => {
    // Perform analysis on room data
    return {
      averageArea: rooms.reduce((sum, room) => sum + room.area, 0) / rooms.length,
      totalRooms: rooms.length,
      conditionDistribution: groupBy(rooms, 'condition'),
      // ... additional analysis
    }
  }, [rooms])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        title="Average Room Area"
        value={`${analysis.averageArea.toFixed(2)} m²`}
        icon={<Ruler className="h-5 w-5" />}
      />
      {/* Additional metrics */}
    </div>
  )
}
\`\`\`

## 🔒 Environment Configuration

### Required Environment Variables
\`\`\`bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Sheets API Configuration
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=your_private_key
GOOGLE_PROJECT_ID=your_project_id
GOOGLE_SERVICE_ACCOUNT_KEY_ID=your_key_id

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=your_blob_token

# Optional Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
\`\`\`

### Configuration Validation
\`\`\`typescript
// Environment validation utility
export function validateEnvironment() {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    'GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY',
    'GOOGLE_PROJECT_ID',
    'GOOGLE_SERVICE_ACCOUNT_KEY_ID'
  ]
  
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}
\`\`\`

## 📱 Responsive Design Patterns

### Breakpoint Utilities
\`\`\`typescript
// Custom hooks for responsive behavior
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState('sm')
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width >= 1280) setBreakpoint('xl')
      else if (width >= 1024) setBreakpoint('lg')
      else if (width >= 768) setBreakpoint('md')
      else setBreakpoint('sm')
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return breakpoint
}
\`\`\`

### Grid System Classes
\`\`\`css
/* Responsive grid patterns */
.property-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}

.room-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4;
}

.dashboard-layout {
  @apply grid grid-cols-1 lg:grid-cols-12 gap-6;
}
\`\`\`

---

*This API reference provides complete interface definitions and function signatures for seamless integration and development.*
