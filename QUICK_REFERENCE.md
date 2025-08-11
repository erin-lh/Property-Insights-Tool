# Property Insights Tool - Quick Reference Guide

## 🚀 Quick Start for AI Agents

### Immediate Actions Available
1. **View Application**: Already running at http://localhost:3000
2. **Modify Components**: All source files ready for editing
3. **Add Features**: Follow the patterns established in existing components
4. **Deploy Changes**: Automatic sync with Vercel deployment

## 📋 Component Quick Reference

### Core App Components
```
app/page.tsx              - Main application entry point
app/layout.tsx            - Root layout with metadata
app/room/[roomId]/page.tsx - Dynamic room pages
```

### UI Component Library (`components/ui/`)
```
badge.tsx                 - Status and category indicators
button.tsx                - Interactive buttons with variants
card.tsx                  - Container component with header/content
checkbox.tsx              - Form checkbox input
dialog.tsx                - Modal and popup dialogs
input.tsx                 - Text input with validation
tabs.tsx                  - Tab navigation and content
```

### Feature Components (`components/`)
```
search-page.tsx           - Property search and selection
room-card.tsx             - Individual room display cards
room-detail-modal.tsx     - Detailed room analysis modal
room-comparison-modal.tsx - Side-by-side room comparison
google-drive-panorama.tsx - 360° panorama integration
metric-card.tsx           - Metric display component
theme-provider.tsx        - Theme management
```

### Tab Components (`components/tabs/`)
```
overview-tab.tsx          - Property overview dashboard
room-insights-tab.tsx     - Room-specific analytics
assets-tab.tsx            - Property asset management
reports-tab.tsx           - Report generation and export
audience-tab.tsx          - Audience analytics
leads-tab.tsx             - Lead management
platform-engagement-tab.tsx - Engagement metrics
```

### Module Components (`components/modules/`)
```
energy-efficiency.tsx     - Energy rating analysis
flooring-materials.tsx    - Material specifications
location-details.tsx      - Geographic information
property-condition.tsx    - Condition assessment
property-inventory.tsx    - Asset inventory
property-specifications.tsx - Technical specifications
scan-information.tsx      - 3D scan metadata
virtual-tour.tsx          - Virtual tour integration
```

## 🔧 Utility Functions (`lib/`)

### Data Processing
```typescript
// lib/data-parser.ts
parseCSVData(csvText: string) -> PropertyData
parseCSVDataWithAllRooms(csvText: string) -> PropertyData
```

### Database Integration
```typescript
// lib/supabase.ts
getPropertyData(propertyId: string) -> PropertyData
getRoomData(propertyId: string) -> RoomData[]
getEnergyEfficiencyData(propertyId: string) -> EnergyData[]
getDamageData(propertyId: string) -> DamageData[]
```

### Utilities
```typescript
// lib/utils.ts
cn(...classes) -> string  // Tailwind class merger
```

## 🎯 Key Data Interfaces

### PropertyData Interface
```typescript
interface PropertyData {
  id: string
  address: string
  estimatedPrice: number
  bedrooms: number
  bathrooms: number
  carSpaces: number
  totalArea: number
  rooms: RoomData[]
  views: number
  avgDailyViews: number
  energyRating: string
  propertyCondition: string
  // ... 50+ additional fields
}
```

### RoomData Interface
```typescript
interface RoomData {
  id: string
  type: string
  area: number
  condition: string
  flooring: string
  wallMaterial: string
  ceilingType: string
  windows: number
  airConditioning: boolean
  smokeAlarm: boolean
  panoramaLinks: string[]
  panoramaCount: number
  // ... 30+ additional fields
}
```

## 🔄 Common Integration Patterns

### Adding a New Tab
```typescript
// 1. Create tab component
export function NewTab({ data }: { data: PropertyData }) {
  return (
    <Card>
      <CardContent>
        {/* Tab content */}
      </CardContent>
    </Card>
  )
}

// 2. Add to main tabs in app/page.tsx
<TabsList>
  <TabsTrigger value="new-tab">New Tab</TabsTrigger>
</TabsList>

<TabsContent value="new-tab">
  <NewTab data={propertyData} />
</TabsContent>
```

### Adding a New Room Feature
```typescript
// 1. Extend RoomData interface in lib/data-parser.ts
interface RoomData {
  // ... existing fields
  newFeature: string
}

// 2. Update room card display
<Badge variant="outline">
  {room.newFeature}
</Badge>

// 3. Add to room detail modal
<div className="flex justify-between">
  <span>New Feature:</span>
  <span>{room.newFeature}</span>
</div>
```

### Creating a New Module
```typescript
// components/modules/new-module.tsx
export function NewModule({ data }: { data: PropertyData }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>New Module</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Module content */}
        </CardContent>
      </Card>
    </div>
  )
}
```

## 📊 Data Sources

### CSV Data Structure
Located: `public/data/property-data.csv`
- Property-level information
- Room-by-room details
- Energy efficiency data
- Damage assessments
- Scan metadata

### Supabase Tables
```sql
-- Properties table
properties (
  property_id,
  address,
  price,
  bedrooms,
  bathrooms,
  -- ... additional columns
)

-- Rooms table
rooms (
  room_id,
  property_id,
  room_type,
  area,
  condition,
  -- ... additional columns
)

-- Energy efficiency table
energy_efficiency (
  id,
  property_id,
  section,
  rating,
  -- ... additional columns
)
```

## 🎨 Styling Guidelines

### Tailwind Classes
```css
/* Layout */
container mx-auto px-4 py-8 max-w-7xl

/* Cards */
bg-white shadow-sm border-0 rounded-2xl

/* Buttons */
bg-blue-600 hover:bg-blue-700 text-white

/* Text */
text-gray-600 font-medium text-sm

/* Responsive */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

### Component Variants
```typescript
// Button variants
<Button variant="default">Primary</Button>
<Button variant="outline">Secondary</Button>
<Button variant="ghost">Subtle</Button>

// Badge variants
<Badge variant="default">Status</Badge>
<Badge variant="outline">Category</Badge>
<Badge variant="secondary">Info</Badge>
```

## 🚨 Error Handling

### Common Error Scenarios
1. **CSV Parse Errors**: Fallback to basic parser
2. **Missing Images**: Placeholder image display
3. **API Failures**: Graceful degradation
4. **Type Mismatches**: Runtime type checking

### Error Boundary Pattern
```typescript
try {
  const parsedData = await parseCSVDataWithAllRooms(csvText)
  setPropertyData(parsedData)
} catch (error) {
  console.warn("Failed to load all rooms data, using basic parser:", error)
  const parsedData = parseCSVData(csvText)
  setPropertyData(parsedData)
}
```

## 📱 Responsive Design

### Breakpoints
- `sm`: 640px and up
- `md`: 768px and up  
- `lg`: 1024px and up
- `xl`: 1280px and up
- `2xl`: 1536px and up

### Grid Patterns
```css
/* Mobile-first responsive grid */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3

/* Flexible card layout */
grid grid-cols-1 md:grid-cols-2 gap-4

/* Dashboard layout */
grid grid-cols-12 gap-6
```

## 🔧 Development Commands

```bash
# Development
npm run dev           # Start development server
npm run build         # Production build
npm run start         # Start production server
npm run lint          # Run linting

# Package management
npm install --legacy-peer-deps  # Install with legacy deps
npm update            # Update dependencies
```

## 🚀 Deployment Status

- **Platform**: Vercel
- **URL**: https://vercel.com/littlehingesvtt-8060s-projects/v0-property-insights-tool
- **Auto-deploy**: Connected to v0.dev project
- **Build Status**: ✅ Successful
- **Runtime**: ✅ Functional

---

*This quick reference provides immediate access to the most commonly needed information for rapid development and integration.*
