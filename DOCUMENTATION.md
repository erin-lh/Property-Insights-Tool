# Property Insights Tool - Comprehensive Documentation

## Overview

The Property Insights Tool is a Next.js-based web application designed for comprehensive property analysis, room-by-room insights, and virtual tour integration. Built with modern React components and TypeScript, it provides an intuitive interface for property professionals to analyze properties using 360° Matterport data and detailed room metrics.

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 15.2.4 with App Router
- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4.1.9 with Radix UI components
- **Database**: Supabase integration
- **UI Components**: Custom component library built on Radix UI primitives
- **State Management**: React hooks (useState, useEffect)
- **Build Tool**: Next.js with TypeScript compilation

### Project Structure
```
Property-Insights-Tool/
├── app/                      # Next.js App Router pages
├── components/               # Reusable React components
│   ├── ui/                  # Base UI components (Radix UI)
│   ├── tabs/                # Tab-specific components
│   ├── modules/             # Feature-specific modules
│   └── *.tsx                # Main components
├── lib/                     # Utilities and data processing
├── public/                  # Static assets and data
├── scripts/                 # Database and data analysis scripts
└── styles/                  # Global styles
```

## 📦 Dependencies

### Core Dependencies
- **@supabase/supabase-js**: Database integration
- **@radix-ui/react-***: Complete UI component library
- **lucide-react**: Icon library
- **recharts**: Data visualization
- **react-hook-form**: Form handling
- **zod**: Schema validation
- **tailwind-merge**: Utility class optimization
- **next-themes**: Theme management

### Development Dependencies
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **PostCSS**: CSS processing

## 🎯 Core Components

### 1. Main Application (`app/page.tsx`)
**Purpose**: Primary application entry point with property selection and insights dashboard.

**Key Features**:
- Property search interface
- Dynamic data loading from CSV
- Room visualization and interaction
- Tab-based navigation (Overview, Room Insights, Assets, Reports)
- Modal management for room details

**State Management**:
```typescript
const [propertyData, setPropertyData] = useState<PropertyData | null>(null)
const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null)
const [showSearch, setShowSearch] = useState(true)
```

**Data Flow**:
1. Fetch CSV data from `/public/data/property-data.csv`
2. Parse using `parseCSVDataWithAllRooms()` or fallback to `parseCSVData()`
3. Render property overview with room cards
4. Handle room selection and modal display

### 2. Search Interface (`components/search-page.tsx`)
**Purpose**: Property discovery and selection interface.

**Features**:
- Search functionality with real-time filtering
- Property cards with key metrics
- Sample property data for demonstration
- Responsive grid layout

**Integration Points**:
- Callback to main app: `onPropertySelect(address: string)`
- Filters properties by address, type, and price range

### 3. Room Management Components

#### Room Card (`components/room-card.tsx`)
**Purpose**: Individual room display with quick insights.

**Features**:
- Room area and condition display
- Badge system for features (AC, Smoke Alarm, etc.)
- Panorama view integration
- Quick action buttons
- **Google Sheets sync indicator**: Shows green checkmark when data is recently synced, orange warning when stale

#### Room Detail Modal (`components/room-detail-modal.tsx`)
**Purpose**: Comprehensive room analysis interface.

**Tabs**:
- **Overview**: Basic room information
- **Condition**: Maintenance and assessment data
- **Features**: Available amenities and fixtures
- **Measurements**: Dimensional data
- **Additional Details**: Google Sheets data integration

**Google Sheets Features**:
- Displays all additional data from Google Sheets
- Shows sync status and last update time
- Refresh button to manually sync data
- Graceful handling when sheets are unavailable

#### Room Comparison Modal (`components/room-comparison-modal.tsx`)
**Purpose**: Side-by-side room analysis tool.

**Features**:
- Dimensional comparison with percentage differences
- Material and finish comparison
- Feature availability matrix
- 360° panorama comparison
- Automated recommendations

### 4. Tab Components (`components/tabs/`)

#### Overview Tab (`components/tabs/overview-tab.tsx`)
- Property summary metrics
- Room grid display
- Quick statistics dashboard

#### Room Insights Tab (`components/tabs/room-insights-tab.tsx`)
- Detailed room analytics
- Comparison tools
- Room-specific insights

#### Assets Tab (`components/tabs/assets-tab.tsx`)
- Property asset management
- Document storage
- Media organization

#### Reports Tab (`components/tabs/reports-tab.tsx`)
- Generated report access
- Export functionality
- Analytics dashboard

### 5. Specialized Modules (`components/modules/`)

#### Energy Efficiency (`components/modules/energy-efficiency.tsx`)
- Energy rating analysis
- Efficiency recommendations
- Cost analysis

#### Property Condition (`components/modules/property-condition.tsx`)
- Overall condition assessment
- Maintenance requirements
- Issue tracking

#### Virtual Tour (`components/modules/virtual-tour.tsx`)
- Matterport integration
- 360° panorama display
- Tour navigation

#### Google Sheets Integration (`app/api/sheets/route.ts`)
- **Real-time data synchronization** with Google Sheets
- **Automatic caching** (5 minutes) to optimize performance
- **Error handling** with graceful fallbacks
- **Composite key matching** using Room ID + Room Type
- **Manual refresh** capability for immediate updates

**Sheet Structure Requirements**:
- Each room should have its own sheet named 'Room 1' through 'Room 14'
- Required columns: 'Room ID' and 'Room Type' for matching
- Additional columns automatically mapped to room data
- Empty values are filtered out from display

**Features**:
- Fetches data from 14 room sheets simultaneously
- Groups data by composite room key
- Provides sync status indicators
- Supports manual refresh via UI buttons
- Handles API rate limits with caching

## 🗃️ Data Management

### Data Parser (`lib/data-parser.ts`)
**Purpose**: CSV data processing and type definitions.

**Key Interfaces**:
```typescript
interface PropertyData {
  id: string
  address: string
  estimatedPrice: number
  totalArea: number
  bedrooms: number
  bathrooms: number
  rooms: RoomData[]
  // ... additional property fields
}

interface RoomData {
  id: string
  type: string
  area: number
  condition: string
  features: string[]
  panoramaLinks: string[]
  // Google Sheets integration
  sheetData?: {
    sheetName: string
    lastSync?: number
    data: Record<string, any>
  }
  // ... additional room fields
}
```

**Functions**:
- `parseCSVData()`: Basic CSV parsing
- `parseCSVDataWithAllRooms()`: Enhanced parsing with full room data
- Data validation and type conversion

### Google Sheets Integration (`lib/sheets-utils.ts`)
**Purpose**: Integration with Google Sheets API for additional room data.

**Configuration**:
- Spreadsheet ID: `10XVAxEPF6ZfD2zlqPB0kvSyQOP41z8iF6GD9vrG4qHg`
- Fetches from sheets 'Room 1' through 'Room 14'
- Matches data using composite key: `roomId_roomType`
- 5-minute caching to avoid rate limits

**Key Functions**:
```typescript
fetchSheetsData(): Promise<SheetsApiResponse>
refreshSheetsData(): Promise<SheetsApiResponse>
mergeRoomsWithSheetsData(rooms: RoomData[], sheetsData: Record<string, RoomSheetData>): RoomData[]
formatSheetDataForDisplay(sheetData: Record<string, any>): Array<{ key: string, value: string, label: string }>
```

**API Endpoint**: `/api/sheets`
- GET: Fetch cached or fresh data from all room sheets
- POST: Force refresh and clear cache

### Supabase Integration (`lib/supabase.ts`)
**Purpose**: Database connectivity and query functions.

**Available Functions**:
```typescript
// Property data retrieval
getPropertyData(propertyId: string)
getRoomData(propertyId: string)
getEnergyEfficiencyData(propertyId: string)
getDamageData(propertyId: string)
```

**Configuration**:
- Requires `NEXT_PUBLIC_SUPABASE_URL`
- Requires `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🎨 UI Components Library

### Base Components (`components/ui/`)
Built on Radix UI primitives with custom styling:

- **Button**: Multiple variants (default, outline, ghost)
- **Card**: Container with header/content sections
- **Dialog**: Modal and popup management
- **Input**: Form input with validation
- **Tabs**: Navigation and content organization
- **Badge**: Status and category indicators
- **Checkbox**: Form controls

### Styling System
- **Tailwind CSS**: Utility-first approach
- **Class Variance Authority**: Component variant management
- **Tailwind Merge**: Conflict resolution
- **CSS Variables**: Theme customization

## 🔧 Configuration Files

### Next.js Configuration (`next.config.mjs`)
```javascript
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true }
}
```

### Tailwind Configuration
- PostCSS integration
- Custom animations
- Component-specific utilities

### TypeScript Configuration (`tsconfig.json`)
- Strict type checking
- Path aliases for components
- Next.js optimizations

## 📊 Data Flow Architecture

### 1. Application Initialization
```
SearchPage → Property Selection → Main Dashboard
     ↓
CSV Data Fetch → Data Parsing → State Update → UI Render
```

### 2. Room Interaction Flow
```
Room Card Click → Modal Open → Tab Navigation → Data Display
     ↓
Room Comparison → Analysis → Recommendations
```

### 3. Data Processing Pipeline
```
Raw CSV → Parser → Type Validation → Component Props → UI Render
     ↓
Supabase Sync → Real-time Updates → State Management
```

## 🚀 Development Guidelines

### Adding New Components
1. **Create Component File**: Follow naming convention `ComponentName.tsx`
2. **Define Interfaces**: TypeScript interfaces for props and data
3. **Implement Component**: Use functional components with hooks
4. **Add Styling**: Tailwind classes with responsive design
5. **Export Component**: Named export for tree-shaking

### Extending Data Models
1. **Update Interfaces**: Modify `lib/data-parser.ts`
2. **Update Parser Functions**: Handle new data fields
3. **Update Components**: Consume new data properties
4. **Update Database Schema**: Sync with Supabase tables

### Performance Optimization
- **Code Splitting**: Dynamic imports for large components
- **Image Optimization**: Next.js Image component
- **State Management**: Minimize re-renders with proper dependencies
- **Bundle Analysis**: Monitor build size and optimize

## 🔐 Environment Variables

Required environment variables:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Sheets API Configuration
GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key

# Optional Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Google Sheets API Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API
4. Create credentials (API Key)
5. Restrict the API key to Google Sheets API only
6. Add the API key to your environment variables

## 🧪 Testing Strategy

### Component Testing
- Unit tests for individual components
- Props validation and rendering
- User interaction testing

### Integration Testing
- Data flow validation
- API integration testing
- Modal and navigation testing

### E2E Testing
- Complete user workflows
- Cross-browser compatibility
- Performance testing

## 📝 AI Agent Integration Guide

### Quick Start for AI Agents
1. **Primary Entry Point**: `app/page.tsx` - Main application logic
2. **Data Models**: `lib/data-parser.ts` - All TypeScript interfaces
3. **Component Library**: `components/ui/` - Reusable UI components
4. **Feature Modules**: `components/modules/` - Specific functionality

### Common Integration Patterns

#### Adding New Features
```typescript
// 1. Define data interface
interface NewFeatureData {
  id: string
  name: string
  // ... additional fields
}

// 2. Create component
export function NewFeatureComponent({ data }: { data: NewFeatureData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Feature content */}
      </CardContent>
    </Card>
  )
}

// 3. Integrate into main application
<Tabs>
  <TabsContent value="new-feature">
    <NewFeatureComponent data={featureData} />
  </TabsContent>
</Tabs>
```

#### Adding New Tab Sections
1. Create tab component in `components/tabs/`
2. Import and add to main tabs in `app/page.tsx`
3. Update tab navigation in `TabsList`

#### Extending Room Analysis
1. Add fields to `RoomData` interface
2. Update room card display
3. Extend room detail modal tabs
4. Update comparison logic

#### Integrating with Google Sheets
```typescript
// 1. Extend sheet data processing
export function processCustomSheetData(sheetData: Record<string, any>): CustomData {
  return {
    customField: sheetData.custom_field,
    calculatedValue: parseFloat(sheetData.raw_value) * 2
  }
}

// 2. Add to room detail modal
<TabsContent value="custom-analysis">
  <Card>
    <CardHeader>
      <CardTitle>Custom Analysis</CardTitle>
    </CardHeader>
    <CardContent>
      {room.sheetData && (
        <CustomAnalysisComponent data={processCustomSheetData(room.sheetData.data)} />
      )}
    </CardContent>
  </Card>
</TabsContent>

// 3. Update API route for additional processing
const processedData = await processCustomSheetData(rawSheetData)
```

## 🔄 Deployment

### Vercel Deployment
- **Automatic**: Connected to v0.dev project
- **Manual**: `npm run build` then deploy dist
- **Environment**: Configure variables in Vercel dashboard

### Production Checklist
- [ ] Environment variables configured
- [ ] Database connections tested
- [ ] Image optimization enabled
- [ ] Error handling implemented
- [ ] Performance monitoring setup

## 🐛 Troubleshooting

### Common Issues
1. **Dependency Conflicts**: Use `--legacy-peer-deps` flag
2. **Build Errors**: Check TypeScript configuration
3. **Data Loading**: Verify CSV file path and format
4. **Supabase Connection**: Validate environment variables

### Debug Mode
Enable development mode:
```bash
npm run dev
```

Access at `http://localhost:3000`

## 📚 Additional Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Radix UI Components**: https://radix-ui.com
- **Tailwind CSS**: https://tailwindcss.com
- **Supabase Documentation**: https://supabase.com/docs
- **TypeScript Handbook**: https://typescriptlang.org/docs

---

*This documentation serves as a comprehensive guide for developers, AI agents, and stakeholders working with the Property Insights Tool. For specific implementation details, refer to the inline code comments and component documentation.*
