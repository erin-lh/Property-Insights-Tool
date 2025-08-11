# Property Insights Tool

*Advanced real estate analysis and insights platform*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/littlehingesvtt-8060s-projects/v0-property-insights-tool)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/kpnY9auyA3V)

## Overview

The Property Insights Tool is a comprehensive real estate analysis platform that provides advanced property analytics, room-by-room insights, virtual tour integration, and energy efficiency assessments for real estate professionals.

### 🏠 Key Features

- **Property Analysis**: Comprehensive analysis with 100+ property metrics
- **Room-by-Room Insights**: Detailed room analysis with panoramic views
- **Virtual Tours**: Matterport 3D tour integration
- **Energy Efficiency**: Energy ratings and improvement recommendations
- **Property Condition**: Damage assessment and condition reporting
- **Interactive Search**: Property search and comparison tools
- **Export Capabilities**: Data export for reports and analysis

### 🛠 Technology Stack

- **Frontend**: Next.js 15.2.4 with React 19 and TypeScript
- **Styling**: Tailwind CSS with Radix UI components
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel with v0.dev integration
- **Data Visualization**: Recharts for analytics

## Quick Start

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/erin-lh/Property-Insights-Tool.git
   cd Property-Insights-Tool
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Environment setup**
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
Property-Insights-Tool/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Main application
│   ├── layout.tsx         # Root layout
│   └── room/              # Room-specific pages
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── tabs/             # Tab components
│   ├── modules/          # Feature modules
│   └── *.tsx             # Shared components
├── lib/                  # Utilities and services
│   ├── data-parser.ts    # CSV data parsing
│   ├── supabase.ts       # Database client
│   └── utils.ts          # Helper functions
├── public/               # Static assets
│   ├── data/            # CSV data files
│   └── images/          # Image assets
└── DOCUMENTATION.md      # Comprehensive documentation
```

## Core Components

### Main Application Features
- **Property Search**: Find and select properties for analysis
- **Overview Tab**: Property specifications and location details
- **Room Insights**: Individual room analysis with panoramic views
- **Assets Tab**: Property inventory and asset management
- **Reports Tab**: Generate and export comprehensive reports

### Data Integration
- **CSV Data Parsing**: Processes property data from external sources
- **Supabase Integration**: Database storage and retrieval
- **Google Drive**: Panoramic image storage
- **Matterport API**: Virtual tour integration

## Documentation

For comprehensive documentation covering all components, services, and dependencies, see [DOCUMENTATION.md](./DOCUMENTATION.md).

The documentation includes:
- Detailed architecture overview
- Component documentation
- API references
- Data structure definitions
- Development guidelines
- Deployment instructions

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Development Guidelines

1. Use TypeScript for all new code
2. Follow Radix UI patterns for accessibility
3. Implement proper error handling
4. Use caching for expensive operations
5. Test builds locally before deploying

## Deployment

### Vercel Integration
This project is configured for automatic Vercel deployment:
- Builds automatically on push to main branch
- Environment variables managed through Vercel dashboard
- Optimized for static generation and edge functions

### v0.dev Sync
- Automatically synced with v0.dev deployments
- Changes from v0.dev are pushed to this repository
- Continue development at: [v0.dev project](https://v0.dev/chat/projects/kpnY9auyA3V)

## Live Demo

**[https://vercel.com/littlehingesvtt-8060s-projects/v0-property-insights-tool](https://vercel.com/littlehingesvtt-8060s-projects/v0-property-insights-tool)**

## Contributing

1. Create a feature branch from main
2. Implement changes with proper TypeScript types
3. Test locally and ensure builds pass
4. Create pull request for review
5. Automatic deployment on merge to main

## Support

For questions, issues, or feature requests, please:
1. Check the [comprehensive documentation](./DOCUMENTATION.md)
2. Review existing issues in the repository
3. Create a new issue with detailed information

---

*Built with ❤️ using Next.js, React, and modern web technologies*
