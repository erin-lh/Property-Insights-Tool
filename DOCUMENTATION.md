# Property Insights Tool - Comprehensive Documentation

## Overview

The Property Insights Tool is a Next.js-based web application designed for comprehensive property analysis, room-by-room insights, and virtual tour integration. Built with modern React components and TypeScript, it provides an intuitive interface for property professionals to analyze properties using 360° Matterport data and detailed room metrics.

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 15.2.4 with App Router
- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4.1.9 with Radix UI components
- **Data Storage**: Google Sheets API integration and Vercel Blob storage
- **UI Components**: Custom component library built on Radix UI primitives
- **State Management**: React hooks (useState, useEffect)
- **Build Tool**: Next.js with TypeScript compilation

### Project Structure
\`\`\`
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
\`\`\`

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
\`\`\`typescript
const [propertyData, setPropertyData] = useState<PropertyData | null>(null)
const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null)
const [showSearch, setShowSearch] = useState(true)
\`\`\`

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

#### Room Detail Modal (`components/room-detail-modal.tsx`)
**Purpose**: Comprehensive room analysis interface.

**Tabs**:
- **Overview**: Basic room information
- **Condition**: Maintenance and assessment data
- **Features**: Available amenities and fixtures
- **Measurements**: Dimensional data

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

## 🗃️ Data Management

### Data Parser (`lib/data-parser.ts`)
**Purpose**: CSV data processing and type definitions.

**Key Interfaces**:
\`\`\`typescript
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
  // ... additional room fields
}
\`\`\`

**Functions**:
- `parseCSVData()`: Basic CSV parsing
- `parseCSVDataWithAllRooms()`: Enhanced parsing with full room data
- Data validation and type conversion

### Google Sheets Integration
**Purpose**: Data storage and retrieval from Google Sheets.

**Available Functions**:
\`\`\`typescript
// Property data retrieval from Google Sheets API
getRoomData(sheetName: string)
getPropertyOverview()
getEnergyEfficiencyData()
\`\`\`

**Configuration**:
- Requires `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- Requires `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
- Requires `GOOGLE_PROJECT_ID`
- Requires `GOOGLE_SERVICE_ACCOUNT_KEY_ID`

### Supabase Integration (`lib/supabase.ts`)
**Purpose**: Database connectivity and query functions.

**Available Functions**:
\`\`\`typescript
// Property data retrieval
getPropertyData(propertyId: string)
getRoomData(propertyId: string)
getEnergyEfficiencyData(propertyId: string)
getDamageData(propertyId: string)
\`\`\`

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
\`\`\`javascript
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true }
}
\`\`\`

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
\`\`\`
SearchPage → Property Selection → Main Dashboard
     ↓
CSV Data Fetch → Data Parsing → State Update → UI Render
\`\`\`

### 2. Room Interaction Flow
\`\`\`
Room Card Click → Modal Open → Tab Navigation → Data Display
     ↓
Room Comparison → Analysis → Recommendations
\`\`\`

### 3. Data Processing Pipeline
\`\`\`
Raw CSV → Parser → Type Validation → Component Props → UI Render
     ↓
Supabase Sync → Real-time Updates → State Management
\`\`\`

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
\`\`\`bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=your_private_key
GOOGLE_PROJECT_ID=your_project_id
GOOGLE_SERVICE_ACCOUNT_KEY_ID=your_key_id
BLOB_READ_WRITE_TOKEN=your_blob_token
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

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
\`\`\`typescript
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
\`\`\`

#### Adding New Tab Sections
1. Create tab component in `components/tabs/`
2. Import and add to main tabs in `app/page.tsx`
3. Update tab navigation in `TabsList`

#### Extending Room Analysis
1. Add fields to `RoomData` interface
2. Update room card display
3. Extend room detail modal tabs
4. Update comparison logic

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
4. **Google Sheets Connection**: Validate environment variables and service account permissions
5. **Supabase Connection**: Validate environment variables

## 📚 Additional Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Radix UI Components**: https://radix-ui.com
- **Tailwind CSS**: https://tailwindcss.com
- **Google Sheets API**: https://developers.google.com/sheets/api
- **Vercel Blob Storage**: https://vercel.com/docs/storage/vercel-blob
- **TypeScript Handbook**: https://typescriptlang.org/docs

---

*This documentation serves as a comprehensive guide for developers, AI agents, and stakeholders working with the Property Insights Tool. For specific implementation details, refer to the inline code comments and component documentation.*
