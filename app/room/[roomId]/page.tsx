"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X } from "lucide-react"
import {
  ArrowLeft,
  Camera,
  Eye,
  Ruler,
  Home,
  Package,
  Lightbulb,
  Wind,
  Shield,
  FileText,
  MapPin,
  ExternalLink,
  Thermometer,
} from "lucide-react"

// Mock room data - in a real app this would come from your data source
interface Room {
  id: string
  name: string
  type: string
  area: string
  volume: string
  height: string
  depth: string
  width: string
  valuation: string
  condition: string
  doors: number
  windows: number
  description: string
  panoramaCount: string
  panoramaLinks: string[]
  panoramaImages: string[]
  roomLocationImage: string
  flooring: string
  wallMaterial: string
  ceilingType: string
  ceilingLights: string
  ceilingLightType?: string
  contents: {
    name: string
    quantity: number
    rrp: string
    total: string
    url: string
  }[]
}

const roomsData: Record<string, Room> = {
  "1": {
    id: "1",
    name: "Room 1: Hallway",
    type: "Hallway",
    area: "2.47",
    volume: "5.98",
    height: "2.42",
    depth: "2.23",
    width: "0.88",
    valuation: "$7,171.29",
    condition: "Complete",
    doors: 1,
    windows: 0,
    description:
      "This hallway features soft neutral carpeting and crisp white walls, creating a bright and airy feel. A staircase curves up on one side, while doors lead to bedrooms and a bathroom. Recessed ceiling lights add to the clean, modern look, and natural light filters in from the open staircase to the top floor and bedroom windows.",
    panoramaCount: "2",
    panoramaLinks: [
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_19ab05tns5h6y4qm42esqqpea_9atk8hw6bpr2kixswfbit6kya_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_19ab05tns5h6y4qm42esqqpea_71mwb6u62ih98rhx2bwyc8b8b_skybox.jpg",
    ],
    panoramaImages: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_19ab05tns5h6y4qm42esqqpea_9atk8hw6bpr2kixswfbit6kya_skybox%20%281%29.jpg-VQ1rRU14Q114Ge0td1DRgV5HrkSZ8n.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_19ab05tns5h6y4qm42esqqpea_71mwb6u62ih98rhx2bwyc8b8b_skybox%20%281%29.jpg-hpnL3NcCfYc8k7hkQLGiG1dC6fqmPd.jpeg",
    ],
    roomLocationImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2JaixJDeM9NWUh5WybykRXW5Hu9oTZ.png",
    flooring: "Carpet",
    wallMaterial: "Drywall",
    ceilingType: "Flat",
    ceilingLights: "2",
    airConditioning: false,
    smokeAlarm: true,
    ceilingFan: false,
    smokeAlarmCount: 1,
    ceilingLightCount: 2,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 0,
    windowCover: "Other",
    floorDamage: "No",
    ceilingDamage: "No",
    wallDamage: "No",
    contents: [
      {
        name: "Atom Recessed LED Downlight",
        quantity: 2,
        rrp: "$25",
        total: "$50",
        url: "https://haymans.mmem.com.au/burleigh/atoat9034-2f-lt-2f-wh-2f-tri",
      },
    ],
  },
  "2": {
    id: "2",
    name: "Room 2: Patio",
    type: "Patio",
    area: "5.01",
    volume: "13.61",
    height: "2.72",
    depth: "2.17",
    width: "1.58",
    valuation: "$14,046.71",
    condition: "Complete",
    doors: 1,
    windows: 2,
    description:
      "This outdoor patio space features durable tile flooring and concrete walls, designed for entertaining and relaxation. The space includes modern outdoor lighting and provides seamless indoor-outdoor living with easy access from the main living areas.",
    panoramaCount: "4",
    panoramaLinks: [
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_zibi0h0ges2t5dxryrb7800wd_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_cct379k0f1t6gnmuutm23i4ac_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_mw5ymdiqgmkaiasgdiksy3i5a_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_pxk5thts3iiwc5azq4drsitfc_skybox.jpg",
    ],
    panoramaImages: [
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_zibi0h0ges2t5dxryrb7800wd_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_cct379k0f1t6gnmuutm23i4ac_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_mw5ymdiqgmkaiasgdiksy3i5a_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_pxk5thts3iiwc5azq4drsitfc_skybox.jpg",
    ],
    roomLocationImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-12%20at%204.24.05%E2%80%AFpm-sv7yY2hY8kdqPgXTDbkPJ8XLVTiwA6.png",
    flooring: "Tile",
    wallMaterial: "Concrete",
    ceilingType: "Metal",
    ceilingLights: "2",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    smokeAlarmCount: 0,
    ceilingLightCount: 2,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 2,
    windowCover: "None",
    floorDamage: "No",
    ceilingDamage: "No",
    wallDamage: "No",
    contents: [
      {
        name: "Outdoor Ceiling Light",
        quantity: 2,
        rrp: "$45",
        total: "$90",
        url: "https://example.com/outdoor-ceiling-light",
      },
    ],
  },
  "3": {
    id: "3",
    name: "Room 3: Bathroom",
    type: "Bathroom",
    area: "4.25",
    volume: "9.19",
    height: "2.16",
    depth: "2.04",
    width: "1.87",
    valuation: "$13,025.63",
    condition: "Complete",
    doors: 1,
    windows: 1,
    description:
      "This bathroom features a corner glass-enclosed shower, a white toilet, and a compact vanity with a curved countertop, integrated basin, and under-bench storage. Twin frosted windows provide natural light while maintaining privacy, complemented by a wall-mounted mirrored cabinet. The space is tiled throughout, with mild wear and tear visible on the floor tiles, consistent with regular use.",
    panoramaCount: "4",
    panoramaLinks: [
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_3m54yff1z7crxaywd8if9rb0d_983x6xg3ixwh2n54sdw8k76ad_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_3m54yff1z7crxaywd8if9rb0d_mu9uxdez3ha971p08w8nqkn3a_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_3m54yff1z7crxaywd8if9rb0d_xx97uf4cdb80cba9uy8u539rd_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_3m54yff1z7crxaywd8if9rb0d_m4rcxhtirqgqh9enyg9zy5pyd_skybox.jpg",
    ],
    panoramaImages: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_3m54yff1z7crxaywd8if9rb0d_983x6xg3ixwh2n54sdw8k76ad_skybox.jpg-DybvROpI27IWHSdHb2KCEVDQKjA8sw.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_3m54yff1z7crxaywd8if9rb0d_mu9uxdez3ha971p08w8nqkn3a_skybox.jpg-0U773bQXctTFUI3oCYs4MjGGChlV4X.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_3m54yff1z7crxaywd8if9rb0d_xx97uf4cdb80cba9uy8u539rd_skybox.jpg-38W7KABIGlqKllAWl8riaQGzo8HHg2.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_3m54yff1z7crxaywd8if9rb0d_m4rcxhtirqgqh9enyg9zy5pyd_skybox.jpg-qTthxDlQMoEP0VTeF87su16QkDKGzg.jpeg",
    ],
    roomLocationImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-12%20at%208.28.33%E2%80%AFpm-zTl3ItG3cvPV7cIoKuSUk6o1uYEcno.png",
    flooring: "Tile",
    wallMaterial: "Plaster",
    ceilingType: "Flat",
    ceilingLights: "1",
    ceilingLightType: "Recessed",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    smokeAlarmCount: 0,
    ceilingLightCount: 1,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 1,
    windowCover: "Other",
    floorDamage: "Yes (Wear and Tear)",
    ceilingDamage: "No",
    wallDamage: "No",
    contents: [
      {
        name: "Bathroom Recessed LED Downlight",
        quantity: 1,
        rrp: "$35",
        total: "$35",
        url: "https://example.com/bathroom-recessed-light",
      },
    ],
  },
  "4": {
    id: "4",
    name: "Room 4: Master Bedroom",
    type: "Bedroom",
    area: "19.12",
    volume: "38.78",
    height: "2.41",
    depth: "2.89",
    width: "5.85",
    valuation: "$56,428.32",
    condition: "Complete",
    doors: 5,
    windows: 1,
    description:
      "This master bedroom is bright and inviting, featuring a large bed with a deep blue upholstered headboard, flanked by matching white bedside tables and lamps. Neutral carpet flooring adds warmth underfoot, complemented by crisp white walls and contemporary décor. A sliding glass door opens to a private balcony overlooking lush greenery, while a large window on the adjacent wall brings in additional natural light. The space includes built-in wardrobes with sliding doors, airconditioning, and a decorative timber-framed artwork above a wooden console table, enhancing the room's modern yet comfortable feel.",
    panoramaCount: "7",
    panoramaLinks: [
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_3ax98exw84easbammy1kdy59a_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_q30i0t1qaqnm9w9ahabpw94qd_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_bcmacw08fqdi7acr9x6shfi4b_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_n62yt7zbfe8gbthibrauparaa_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_yq3ye9yehkru7142z65q2acwa_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_37fty8w3n4tw0nkac909ri7pc_skybox.jpg",
      "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_1hsznrxt775cdf5e5fr400crc_skybox.jpg",
    ],
    panoramaImages: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_bcmacw08fqdi7acr9x6shfi4b_skybox.jpg-fsUN4KHF3Ave2J76VIl49FVVJwyFnh.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_3ax98exw84easbammy1kdy59a_skybox.jpg-8q3pEN2vs0zn7UPO1QDUoQoFcoTQB9.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_yq3ye9yehkru7142z65q2acwa_skybox.jpg-A1K49g6osUSUpFF5NwMUM3JY7HqRxt.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_n62yt7zbfe8gbthibrauparaa_skybox.jpg-Z0JJ2kLwXejM19pfvYzEQtuNr4Reiv.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_q30i0t1qaqnm9w9ahabpw94qd_skybox.jpg-Dl7Zn5dyH3MEVoBEnMqHnLX8fTAASe.jpeg",
    ],
    roomLocationImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-E5vtmbTffEJBOpzsVn67E3E2OpOMXJ.png",
    flooring: "Carpet",
    wallMaterial: "Drywall",
    ceilingType: "Flat",
    ceilingLights: "2",
    ceilingLightType: "Recessed",
    airConditioning: true,
    smokeAlarm: true,
    ceilingFan: false,
    smokeAlarmCount: 1,
    ceilingLightCount: 2,
    ceilingFanCount: 0,
    airConditioningCount: 1,
    windowCount: 1,
    windowCover: "Other",
    floorDamage: "No",
    ceilingDamage: "No",
    wallDamage: "No",
    contents: [
      {
        name: "Master Bedroom Recessed LED Downlight",
        quantity: 2,
        rrp: "$40",
        total: "$80",
        url: "https://example.com/master-bedroom-recessed-light",
      },
    ],
  },
  "5": {
    id: "5",
    name: "Room 5: Patio",
    type: "Patio",
    area: "X",
    height: "X",
    width: "X",
    depth: "X",
    volume: "X",
    windows: "X",
    doors: "X",
    description: "",
    panoramaCount: "X",
    panoramaLinks: [],
    panoramaImages: [],
    roomLocationImage: "",
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    smokeAlarmCount: 0,
    ceilingLightCount: 0,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 0,
    windowCover: "",
    floorDamage: "",
    ceilingDamage: "",
    wallDamage: "",
    contents: [],
  },
  "6": {
    id: "6",
    name: "Room 6: Living room",
    type: "Living room",
    area: "X",
    height: "X",
    width: "X",
    depth: "X",
    volume: "X",
    windows: "X",
    doors: "X",
    description: "",
    panoramaCount: "X",
    panoramaLinks: [],
    panoramaImages: [],
    // Added dedicated room location image for living room
    roomLocationImage: "",
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    smokeAlarmCount: 0,
    ceilingLightCount: 0,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 0,
    windowCover: "",
    floorDamage: "",
    ceilingDamage: "",
    wallDamage: "",
    contents: [],
  },
  "7": {
    id: "7",
    name: "Room 7: Hallway",
    type: "Hallway",
    area: "X",
    height: "X",
    width: "X",
    depth: "X",
    volume: "X",
    windows: "X",
    doors: "X",
    description: "",
    panoramaCount: "X",
    panoramaLinks: [],
    panoramaImages: [],
    roomLocationImage: "",
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    smokeAlarmCount: 0,
    ceilingLightCount: 0,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 0,
    windowCover: "",
    floorDamage: "",
    ceilingDamage: "",
    wallDamage: "",
    contents: [],
  },
  "8": {
    id: "8",
    name: "Room 8: Living room/ Kitchen",
    type: "Living room/ Kitchen",
    area: "X",
    height: "X",
    width: "X",
    depth: "X",
    volume: "X",
    windows: "X",
    doors: "X",
    description: "",
    panoramaCount: "X",
    panoramaLinks: [],
    panoramaImages: [],
    // Added dedicated room location image for living room/ kitchen
    roomLocationImage: "",
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    smokeAlarmCount: 0,
    ceilingLightCount: 0,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 0,
    windowCover: "",
    floorDamage: "",
    ceilingDamage: "",
    wallDamage: "",
    contents: [],
  },
  "9": {
    id: "9",
    name: "Room 9: Bathroom",
    type: "Bathroom",
    area: "X",
    height: "X",
    width: "X",
    depth: "X",
    volume: "X",
    windows: "X",
    doors: "X",
    description: "",
    panoramaCount: "X",
    panoramaLinks: [],
    panoramaImages: [],
    roomLocationImage: "",
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    smokeAlarmCount: 0,
    ceilingLightCount: 0,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 0,
    windowCover: "",
    floorDamage: "",
    ceilingDamage: "",
    wallDamage: "",
    contents: [],
  },
  "10": {
    id: "10",
    name: "Room 10: Hallway",
    type: "Hallway",
    area: "X",
    height: "X",
    width: "X",
    depth: "X",
    volume: "X",
    windows: "X",
    doors: "X",
    description: "",
    panoramaCount: "X",
    panoramaLinks: [],
    panoramaImages: [],
    roomLocationImage: "",
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    smokeAlarmCount: 0,
    ceilingLightCount: 0,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 0,
    windowCover: "",
    floorDamage: "",
    ceilingDamage: "",
    wallDamage: "",
    contents: [],
  },
  "11": {
    id: "11",
    name: "Room 11: Bathroom",
    type: "Bathroom",
    area: "X",
    height: "X",
    width: "X",
    depth: "X",
    volume: "X",
    windows: "X",
    doors: "X",
    description: "",
    panoramaCount: "X",
    panoramaLinks: [],
    panoramaImages: [],
    roomLocationImage: "",
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    smokeAlarmCount: 0,
    ceilingLightCount: 0,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 0,
    windowCover: "",
    floorDamage: "",
    ceilingDamage: "",
    wallDamage: "",
    contents: [],
  },
  "12": {
    id: "12",
    name: "Room 12: Bedroom",
    type: "Bedroom",
    area: "X",
    height: "X",
    width: "X",
    depth: "X",
    volume: "X",
    windows: "X",
    doors: "X",
    description: "",
    panoramaCount: "X",
    panoramaLinks: [],
    panoramaImages: [],
    // Added dedicated room location image for bedroom
    roomLocationImage: "",
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    smokeAlarmCount: 0,
    ceilingLightCount: 0,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 0,
    windowCover: "",
    floorDamage: "",
    ceilingDamage: "",
    wallDamage: "",
    contents: [],
  },
  "13": {
    id: "13",
    name: "Room 13: Bedroom",
    type: "Bedroom",
    area: "X",
    height: "X",
    width: "X",
    depth: "X",
    volume: "X",
    windows: "X",
    doors: "X",
    description: "",
    panoramaCount: "X",
    panoramaLinks: [],
    panoramaImages: [],
    // Added dedicated room location image for bedroom
    roomLocationImage: "",
    flooring: "X",
    wallMaterial: "X",
    ceilingType: "X",
    ceilingLights: "X",
    airConditioning: false,
    smokeAlarm: false,
    ceilingFan: false,
    smokeAlarmCount: 0,
    ceilingLightCount: 0,
    ceilingFanCount: 0,
    airConditioningCount: 0,
    windowCount: 0,
    windowCover: "",
    floorDamage: "",
    ceilingDamage: "",
    wallDamage: "",
    contents: [],
  },
}

export default function RoomDetailPage({ params }: { params: { roomId: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [selectedPanorama, setSelectedPanorama] = useState<string | null>(null)
  const roomId = Number.parseInt(params.roomId)
  const room = roomsData[roomId as keyof typeof roomsData]

  useEffect(() => {
    setLoading(false)
  }, [])

  if (!room || loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-sm border-0 rounded-2xl">
            <CardContent className="p-12 text-center">
              <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Room Not Found</h3>
              <p className="text-gray-600 mb-4">The requested room could not be found.</p>
              <Button onClick={() => (window.location.href = "/?tab=room-insights")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Property Overview
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => (window.location.href = "/?tab=room-insights")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Property
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{room.name}</h1>
              <p className="text-gray-600">Detailed room analysis and specifications</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Room Location */}
            <Card className="bg-white shadow-sm border-0 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-800 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Room Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={room.roomLocationImage || "/placeholder.svg"}
                    alt="Room location in property"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Assets */}
            <Card className="bg-white shadow-sm border-0 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Assets</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="panoramas" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="panoramas">Property Panoramas</TabsTrigger>
                    <TabsTrigger value="images">Property Images</TabsTrigger>
                  </TabsList>

                  <TabsContent value="panoramas" className="space-y-4 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {room.panoramaImages
                        .filter((img) => img && img !== "/placeholder.svg")
                        .map((imageSrc, index) => (
                          <div
                            key={index}
                            className="aspect-video relative rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 border border-gray-300 cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => setSelectedPanorama(imageSrc)}
                          >
                            <img
                              src={imageSrc || "/placeholder.svg"}
                              alt={`360° Panorama View ${index + 1}`}
                              className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                              onError={(e) => {
                                // Hide the broken image and show fallback
                                e.currentTarget.style.display = "none"
                              }}
                              onLoad={(e) => {
                                // Ensure image is visible when it loads successfully
                                e.currentTarget.style.display = "block"
                              }}
                            />
                            {/* Fallback content when image fails to load */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                              <div className="text-center">
                                <Eye className="h-12 w-12 mx-auto mb-2 text-blue-600" />
                                <div className="text-blue-800 font-medium">360° View {index + 1}</div>
                                <div className="text-blue-600 text-sm">Click to open</div>
                              </div>
                            </div>
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all flex items-center justify-center">
                              <div className="opacity-0 hover:opacity-100 transition-opacity">
                                <Eye className="h-8 w-8 text-white drop-shadow-lg" />
                              </div>
                            </div>
                            {/* Label */}
                            <div className="absolute bottom-2 left-2 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                              360° View {index + 1}
                            </div>
                          </div>
                        ))}
                    </div>
                    {room.panoramaImages.filter((img) => img && img !== "/placeholder.svg").length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <Eye className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <div className="text-lg font-medium">No panoramic images available</div>
                        <div className="text-sm">Panoramic views will appear here when available</div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="images" className="space-y-4 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {room.panoramaImages?.map((imageSrc, index) => (
                        <div key={index} className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={imageSrc || "/placeholder.svg"}
                            alt={`Property Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Room Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Room Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{room.description}</p>
              </CardContent>
            </Card>

            {/* Room Details */}
            <Card className="bg-white shadow-sm border-0 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Room Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="specifications">Specifications</TabsTrigger>
                    <TabsTrigger value="materials">Materials</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6 mt-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <Ruler className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-blue-700">{room.area} m²</p>
                        <p className="text-sm text-blue-600">Floor Area</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <Home className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-700">{room.volume} m³</p>
                        <p className="text-sm text-green-600">Volume</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <Home className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-purple-700">{room.height} m</p>
                        <p className="text-sm text-purple-600">Height</p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg text-center">
                        <Camera className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-orange-700">{room.panoramaCount}</p>
                        <p className="text-sm text-orange-600">360° Views</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Room Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Type:</span>
                            <Badge variant="outline">{room.type}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Condition:</span>
                            <Badge variant="default">{room.condition}</Badge>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Damage Assessment</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Floor Damage:</span>
                            <Badge variant={room.floorDamage === "No" ? "default" : "destructive"}>
                              {room.floorDamage}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Ceiling Damage:</span>
                            <Badge variant={room.ceilingDamage === "No" ? "default" : "destructive"}>
                              {room.ceilingDamage}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Wall Damage:</span>
                            <Badge variant={room.wallDamage === "No" ? "default" : "destructive"}>
                              {room.wallDamage}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="specifications" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">Floor Area:</span>
                        <p className="text-lg font-semibold">{room.area} m²</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">Width:</span>
                        <p className="text-lg font-semibold">{room.width} m</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">Depth:</span>
                        <p className="text-lg font-semibold">{room.depth} m</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">Height:</span>
                        <p className="text-lg font-semibold">{room.height} m</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">Volume:</span>
                        <p className="text-lg font-semibold">{room.volume} m³</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">Windows:</span>
                        <p className="text-lg font-semibold">{room.windows}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">Doors:</span>
                        <p className="text-lg font-semibold">{room.doors}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">Window Cover:</span>
                        <p className="text-lg font-semibold">{room.windowCover}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">Panorama Count:</span>
                        <p className="text-lg font-semibold">{room.panoramaCount}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">Downlight Type:</span>
                        <p className="text-lg font-semibold">Recessed</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">Room Valuation:</span>
                        <p className="text-lg font-semibold text-green-600">{room.valuation}</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="materials" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Package className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">Flooring:</span>
                        </div>
                        <span className="text-gray-700 capitalize">{room.flooring}</span>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Home className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">Walls:</span>
                        </div>
                        <span className="text-gray-700 capitalize">{room.wallMaterial}</span>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Ruler className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">Windows:</span>
                        </div>
                        <span className="text-gray-700">{room.windowCount === 0 ? "None" : room.windowCount}</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="features" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <Lightbulb className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium">{room.ceilingLightCount}</p>
                          <p className="text-sm text-gray-500">Ceiling Lights</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <Thermometer className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium">{room.airConditioningCount}</p>
                          <p className="text-sm text-gray-500">Air Conditioning Units</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <Shield className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium">{room.smokeAlarmCount}</p>
                          <p className="text-sm text-gray-500">Smoke Alarms</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <Wind className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium">{room.ceilingFanCount}</p>
                          <p className="text-sm text-gray-500">Ceiling Fans</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Contents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Contents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {room.contents?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity} | RRP: {item.rrp} each
                        </p>
                        <p className="text-sm font-medium text-green-600">Total: {item.total}</p>
                      </div>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Product
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right sidebar content if needed */}
          <div className="space-y-6"></div>
        </div>
      </main>

      {selectedPanorama && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPanorama(null)}
        >
          <div className="relative max-w-6xl max-h-full">
            <button
              onClick={() => setSelectedPanorama(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={selectedPanorama || "/placeholder.svg"}
              alt="360° Panorama View"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}
