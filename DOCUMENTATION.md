# Property Insights Tool - Comprehensive Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Setup and Installation](#setup-and-installation)
4. [Core Components](#core-components)
5. [Data Layer](#data-layer)
6. [UI Components](#ui-components)
7. [Dependencies](#dependencies)
8. [Deployment](#deployment)
9. [Development Guidelines](#development-guidelines)
10. [API Reference](#api-reference)

## Project Overview

The Property Insights Tool is a comprehensive real estate analysis platform built with Next.js and React. It provides advanced property analytics, room-by-room insights, virtual tour integration, and energy efficiency assessments for real estate professionals.

### Key Features
- **Property Analysis**: Comprehensive property data analysis with 100+ metrics
- **Room-by-Room Insights**: Detailed analysis of individual rooms with panoramic views
- **Virtual Tour Integration**: Matterport 3D tour integration
- **Energy Efficiency Assessment**: Energy ratings and improvement recommendations
- **Property Condition Reports**: Damage assessment and condition analysis
- **Interactive Search**: Property search and comparison tools
- **Export Capabilities**: Data export functionality for reports

### Technology Stack
- **Frontend**: Next.js 15.2.4 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives
- **Database**: Supabase (PostgreSQL)
- **Data Visualization**: Recharts
- **Deployment**: Vercel platform

## Architecture

### Application Structure
```
Property-Insights-Tool/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Main application entry point
│   ├── loading.tsx        # Loading component
│   ├── globals.css        # Global styles
│   └── room/              # Dynamic room pages
│       ├── [roomId]/      # Dynamic room routing
│       └── room-[X]/      # Static room pages (5-14)
├── components/            # React components
│   ├── ui/               # Base UI components (Radix UI)
│   ├── tabs/             # Tab-specific components
│   ├── modules/          # Feature modules
│   └── *.tsx             # Shared components
├── lib/                  # Utility libraries
│   ├── data-parser.ts    # CSV data parsing logic
│   ├── supabase.ts       # Database client
│   └── utils.ts          # Helper functions
├── public/               # Static assets
│   ├── data/            # CSV data files
│   └── images/          # Image assets
└── styles/              # Additional styles
```

### Data Flow Architecture
```
External CSV Data → Data Parser → PropertyData Interface → React Components → UI
                 ↓
            Supabase Database ← → API Functions ← → Components
                 ↓
              Caching Layer
```

## Setup and Installation

### Prerequisites
- Node.js 18+ 
- npm or pnpm package manager
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/erin-lh/Property-Insights-Tool.git
   cd Property-Insights-Tool
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   # or
   pnpm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

### Vercel Deployment
The project is configured for automatic Vercel deployment:
- Connected to v0.dev for automatic syncing
- Builds automatically on push to main branch
- Environment variables managed through Vercel dashboard

## Core Components

### Main Application (`app/page.tsx`)
The main application component orchestrates the entire user experience:

**Key Features:**
- Property search interface
- Tabbed navigation (Overview, Room Insights, Assets, Reports)
- Property header with key metrics
- Room detail modal system
- Data loading and error handling

**State Management:**
- `propertyData`: Main property information
- `selectedRoom`: Currently selected room for detailed view
- `showSearch`: Controls search vs. property view
- `loading`: Application loading state

### Tab Components (`components/tabs/`)

#### Overview Tab (`overview-tab.tsx`)
Displays comprehensive property overview information:
- Property specifications
- Location details
- Property condition assessment
- Energy efficiency metrics

#### Room Insights Tab (`room-insights-tab.tsx`)
Provides detailed room-by-room analysis:
- Room cards with panoramic images
- Room metrics (area, volume, features)
- Interactive room selection
- Room comparison capabilities

#### Assets Tab (`assets-tab.tsx`)
Asset and inventory management:
- Property asset inventory
- Material analysis
- Equipment and fixtures
- Asset valuation information

#### Reports Tab (`reports-tab.tsx`)
Report generation and export functionality:
- Comprehensive property reports
- Export options (PDF, CSV)
- Historical data analysis
- Performance metrics

### Module Components (`components/modules/`)

#### Property Specifications (`property-specifications.tsx`)
Displays core property metrics:
- Property type and size
- Bedroom/bathroom counts
- Building specifications
- Construction details

#### Location Details (`location-details.tsx`)
Geographic and location information:
- Address and coordinates
- Neighborhood data
- Climate zone information
- Accessibility metrics

#### Property Condition (`property-condition.tsx`)
Condition assessment and damage reporting:
- Overall condition rating
- Room-by-room damage assessment
- Maintenance requirements
- Structural issues

#### Energy Efficiency (`energy-efficiency.tsx`)
Energy performance and sustainability:
- Energy rating display
- Efficiency recommendations
- System information (HVAC, insulation)
- Cost projections

#### Virtual Tour (`virtual-tour.tsx`)
Matterport integration and panoramic views:
- 3D tour embedding
- Panoramic image display
- Tour navigation controls
- Engagement metrics

#### Scan Information (`scan-information.tsx`)
Property scanning metadata:
- Scan date and duration
- Scan quality metrics
- Equipment used
- Scan coverage area

#### Flooring Materials (`flooring-materials.tsx`)
Detailed flooring analysis:
- Material type breakdown
- Area coverage by material
- Condition assessment
- Replacement recommendations

#### Property Inventory (`property-inventory.tsx`)
Comprehensive property asset inventory:
- Room-by-room inventory
- Equipment and fixtures
- Asset condition
- Valuation information

## Data Layer

### Data Parser (`lib/data-parser.ts`)
Comprehensive CSV data parsing and property data management:

**Key Interfaces:**
```typescript
interface PropertyData {
  // Property identification
  id: string
  matterportTourId: string
  address: string
  
  // Financial data
  estimatedPrice: number
  lowPrice: number
  highPrice: number
  lastSalePrice: number
  propertyValuation: number
  
  // Physical specifications
  totalArea: number
  floorArea: number
  landArea: number
  bedrooms: number
  bathrooms: number
  carSpaces: number
  
  // Room data
  rooms: RoomData[]
  
  // Materials and features
  hardwoodArea: number
  tileArea: number
  carpetArea: number
  
  // Condition and damage
  damageWalls: string
  damageFloor: string
  damageCeiling: string
  overallCondition: string
  
  // Location data
  latitude: number
  longitude: number
  postcode: string
  climateZone: string
  
  // Many more fields (100+ total)
}

interface RoomData {
  id: string
  type: string
  area: number
  volume: number
  flooring: string
  wallMaterial: string
  ceilingType: string
  windows: number
  panoramaLinks: string[]
  features: string[]
  condition: string
  // Additional room-specific metrics
}
```

**Key Functions:**
- `fetchPropertyData()`: Retrieves and parses property data from external CSV
- `getRoomById(roomId)`: Fetches specific room data
- `getRoomsByType(type)`: Filters rooms by type
- `getTotalArea()`: Calculates total property area
- `getRoomsWithDamage()`: Identifies damaged rooms

### Supabase Integration (`lib/supabase.ts`)
Database client and helper functions:

**Configuration:**
```typescript
const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

**Database Functions:**
- `getPropertyData(propertyId)`: Fetch property from database
- `getRoomData(propertyId)`: Fetch room data for property
- `getEnergyEfficiencyData(propertyId)`: Fetch energy metrics
- `upsertPropertyData(propertyData)`: Update/insert property data

### Data Sources
The application integrates data from multiple sources:

1. **Primary CSV Data**: Property specifications and metrics
   - URL: `https://hebbkx1anhila5yf.public.blob.vercel-storage.com/...`
   - Contains 100+ property fields

2. **Damage Assessment CSV**: Detailed damage reporting
   - Separate CSV for condition assessment
   - Wall, floor, and ceiling damage metrics

3. **Google Drive Integration**: Panoramic images
   - Room-specific Google Drive folders
   - High-resolution panoramic images

4. **Matterport API**: Virtual tour data
   - 3D tour integration
   - Panoramic skybox images

## UI Components

### Base UI Components (`components/ui/`)
Radix UI-based component library:

- **Button** (`button.tsx`): Customizable button component
- **Card** (`card.tsx`): Container component for content sections
- **Dialog** (`dialog.tsx`): Modal and popup components
- **Input** (`input.tsx`): Form input components
- **Tabs** (`tabs.tsx`): Navigation tab components
- **Badge** (`badge.tsx`): Status and label indicators
- **Checkbox** (`checkbox.tsx`): Form checkbox components

### Shared Components
- **MetricCard** (`metric-card.tsx`): Display key metrics with icons
- **RoomCard** (`room-card.tsx`): Room preview cards with images
- **RoomDetailModal** (`room-detail-modal.tsx`): Detailed room information
- **RoomComparisonModal** (`room-comparison-modal.tsx`): Room comparison interface
- **GoogleDrivePanorama** (`google-drive-panorama.tsx`): Google Drive image display
- **SearchPage** (`search-page.tsx`): Property search interface
- **ThemeProvider** (`theme-provider.tsx`): Theme management

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Styled with className utilities
- **Responsive Design**: Mobile-first responsive layouts
- **Color System**: Consistent color palette
- **Typography**: Standardized text styles

## Dependencies

### Core Dependencies
```json
{
  "next": "15.2.4",              // React framework
  "react": "^19",                // UI library
  "typescript": "^5",            // Type safety
  "@supabase/supabase-js": "latest" // Database client
}
```

### UI and Styling
```json
{
  "@radix-ui/*": "latest",       // UI primitives
  "tailwindcss": "^4.1.9",      // CSS framework
  "lucide-react": "^0.454.0",   // Icon library
  "class-variance-authority": "^0.7.1", // Component variants
  "tailwind-merge": "^2.5.5",   // Tailwind utility merging
  "tailwindcss-animate": "^1.0.7" // Animation utilities
}
```

### Forms and Validation
```json
{
  "react-hook-form": "^7.60.0",  // Form management
  "@hookform/resolvers": "^3.10.0", // Form validation
  "zod": "3.25.67"               // Schema validation
}
```

### Data Visualization
```json
{
  "recharts": "2.15.4"           // Chart library
}
```

### Additional Features
```json
{
  "date-fns": "4.1.0",          // Date utilities
  "embla-carousel-react": "8.5.1", // Carousel component
  "react-resizable-panels": "^2.1.7", // Resizable layouts
  "sonner": "^1.7.4",           // Toast notifications
  "next-themes": "latest",       // Theme management
  "input-otp": "1.4.1",         // OTP input component
  "cmdk": "1.0.4",               // Command palette
  "vaul": "^0.9.9",              // Drawer component
  "react-day-picker": "9.8.0"   // Date picker
}
```

### Development Dependencies
```json
{
  "@types/node": "^22",          // Node.js types
  "@types/react": "^19",         // React types
  "@types/react-dom": "^19",     // React DOM types
  "postcss": "^8.5",            // CSS processing
  "autoprefixer": "^10.4.20"    // CSS vendor prefixes
}
```

## Deployment

### Vercel Configuration
The project is optimized for Vercel deployment with the following configuration:

**Next.js Config** (`next.config.mjs`):
```javascript
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,    // Skip linting during builds
  },
  typescript: {
    ignoreBuildErrors: true,     // Skip TypeScript errors during builds
  },
  images: {
    unoptimized: true,           // Disable image optimization
  },
}
```

**Build Process:**
1. Automatic builds on git push
2. Static generation for optimal performance
3. Edge function support for API routes
4. Automatic compression and optimization

**Environment Variables:**
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key

### v0.dev Integration
- Automatic syncing with v0.dev platform
- Changes from v0.dev are automatically pushed to repository
- Continuous deployment pipeline

## Development Guidelines

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Configured with Next.js rules (disabled during builds)
- **Prettier**: Code formatting (recommended)
- **Component Structure**: Functional components with hooks
- **File Naming**: kebab-case for files, PascalCase for components

### Best Practices

#### Component Development
1. Use TypeScript interfaces for all props
2. Implement proper error boundaries
3. Use React hooks for state management
4. Implement loading and error states
5. Follow Radix UI patterns for accessibility

#### Data Management
1. Use caching for expensive operations
2. Implement proper error handling for API calls
3. Validate data with Zod schemas
4. Use TypeScript for type safety
5. Implement proper loading states

#### Performance
1. Use Next.js Image component for optimized images
2. Implement code splitting for large components
3. Use React.memo() for expensive re-renders
4. Optimize bundle size with tree shaking
5. Implement proper caching strategies

### Testing
While no testing framework is currently configured, recommended additions:
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Cypress**: End-to-end testing
- **Playwright**: Browser testing

### Development Workflow
1. Create feature branches from main
2. Implement changes with proper TypeScript types
3. Test locally with `npm run dev`
4. Build and verify with `npm run build`
5. Create pull request for review
6. Automatic deployment on merge to main

## API Reference

### Data Parser Functions

#### `fetchPropertyData(): Promise<PropertyData | null>`
Fetches and parses property data from external CSV source.

**Returns:** PropertyData object or null if error

**Example:**
```typescript
const propertyData = await fetchPropertyData()
if (propertyData) {
  console.log(`Property: ${propertyData.address}`)
  console.log(`Bedrooms: ${propertyData.bedrooms}`)
}
```

#### `getRoomById(roomId: string): Promise<RoomData | null>`
Retrieves specific room data by ID.

**Parameters:**
- `roomId`: Unique room identifier

**Returns:** RoomData object or null if not found

#### `getRoomsByType(type: string): RoomData[]`
Filters rooms by type (bedroom, bathroom, kitchen, etc.).

**Parameters:**
- `type`: Room type to filter by

**Returns:** Array of matching RoomData objects

#### `getTotalArea(): number`
Calculates total area of all rooms.

**Returns:** Total area in square meters

#### `getRoomsWithDamage(): RoomData[]`
Identifies rooms with any damage (floor, wall, or ceiling).

**Returns:** Array of RoomData objects with damage

#### `getAverageRoomSize(): number`
Calculates average room size across all rooms.

**Returns:** Average area per room in square meters

### Supabase Functions

#### `getPropertyData(propertyId: string)`
Fetches property data from Supabase database.

**Parameters:**
- `propertyId`: Property identifier

**Returns:** Promise resolving to property data or null

#### `getRoomData(propertyId: string)`
Fetches all room data for a property from Supabase.

**Parameters:**
- `propertyId`: Property identifier

**Returns:** Promise resolving to array of room data

#### `getEnergyEfficiencyData(propertyId: string)`
Fetches energy efficiency metrics from Supabase.

**Parameters:**
- `propertyId`: Property identifier

**Returns:** Promise resolving to energy efficiency data

#### `upsertPropertyData(propertyData: any)`
Updates or inserts property data in Supabase.

**Parameters:**
- `propertyData`: Property data object to upsert

**Returns:** Promise resolving to operation result

### Component Props

#### PropertyData Interface
Core property data structure with 100+ fields including:
- **Identification**: id, address, matterportTourId
- **Financial**: estimatedPrice, lastSalePrice, propertyValuation
- **Physical**: totalArea, bedrooms, bathrooms, floors
- **Materials**: hardwoodArea, tileArea, carpetArea
- **Condition**: damageWalls, damageFloor, overallCondition
- **Location**: latitude, longitude, postcode, climateZone
- **Systems**: airConditioningCount, heatingCooling, energyRating

#### RoomData Interface
Individual room data structure including:
- **Identification**: id, type, roomNumber
- **Dimensions**: area, volume, width, height, depth
- **Materials**: flooring, wallMaterial, ceilingType
- **Features**: windows, airConditioning, smokeAlarm, ceilingLights
- **Condition**: floorDamage, wallDamage, ceilingDamage
- **Media**: panoramaLinks, galleryImages, coverImage

---

*This documentation is maintained as part of the Property Insights Tool project. For questions or updates, please refer to the project repository or contact the development team.*