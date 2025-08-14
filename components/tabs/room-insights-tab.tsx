"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Eye,
  BarChart3,
  Home,
  Wrench,
  Palette,
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Database,
  Ruler,
  Building,
} from "lucide-react"
import Link from "next/link"
import { refreshSheetData } from "@/lib/data-parser"

export function RoomInsightsTab() {
  const [selectedRooms, setSelectedRooms] = useState<string[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const propertyData = {
    rooms: [
      {
        id: "1",
        name: "Room 1: Hallway",
        roomId: "19ab05tns5h6y4qm42esqqpea",
        panoramaIds: ["9atk8hw6bpr2kixswfbit6kya", "71mwb6u62ih98rhx2bwyc8b8b"],
        panoramaLinks: [
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_19ab05tns5h6y4qm42esqqpea_9atk8hw6bpr2kixswfbit6kya_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_19ab05tns5h6y4qm42esqqpea_71mwb6u62ih98rhx2bwyc8b8b_skybox.jpg",
        ],
        propertyImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2JaixJDeM9NWUh5WybykRXW5Hu9oTZ.png",
        ],
        roomType: "hallway",
        area: "2.47 m²",
        volume: "5.98 m³",
        depth: "2.23 m",
        height: "2.42 m",
        width: "0.88 m",
        condition: "Good",
        temperature: "22°C",
        humidity: "45%",
        hasSheetData: true,
        roomValuation: "$7,171.29",
        smokeAlarmCount: 1,
        floorDamage: "No",
        ceilingDamage: "No",
        wallDamage: "No",
        windowCount: 0,
        ceilingLightCount: 2,
        ceilingFanCount: 0,
        airConditioningCount: 0,
        specifications: {
          floorArea: "2.47 m²",
          ceilingHeight: "2.42 m",
          wallArea: "41.0 m²",
          windowArea: "0 m²",
          doorArea: "3.5 m²",
          depth: "2.23 m",
          width: "0.88 m",
          volume: "5.98 m³",
        },
        materials: {
          flooring: "Carpet",
          walls: "Drywall",
          ceiling: "Flat",
          windows: "None",
          doors: "Timber",
          windowCover: "Other",
        },
        features: [
          { name: "Smoke Alarm", status: "installed", icon: "shield", count: 1 },
          { name: "Ceiling Lights", status: "installed", icon: "lightbulb", count: 2 },
          { name: "Ceiling Fan", status: "none", icon: "wind", count: 0 },
          { name: "Air Conditioning", status: "none", icon: "snowflake", count: 0 },
          { name: "Windows", status: "none", icon: "square", count: 0 },
        ],
        damage: {
          floor: "No",
          ceiling: "No",
          walls: "No",
        },
      },
      {
        id: "2",
        name: "Room 2: Patio",
        roomId: "2qdmc5i9byxi79ry1pxdkqzea",
        panoramaIds: [
          "zibi0h0ges2t5dxryrb7800wd",
          "cct379k0f1t6gnmuutm23i4ac",
          "mw5ymdiqgmkaiasgdiksy3i5a",
          "pxk5thts3iiwc5azq4drsitfc",
        ],
        panoramaLinks: [
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_zibi0h0ges2t5dxryrb7800wd_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_cct379k0f1t6gnmuutm23i4ac_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_mw5ymdiqgmkaiasgdiksy3i5a_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_pxk5thts3iiwc5azq4drsitfc_skybox.jpg",
        ],
        propertyImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-12%20at%204.24.05%E2%80%AFpm-sv7yY2hY8kdqPgXTDbkPJ8XLVTiwA6.png",
        ],
        roomType: "patio",
        area: "5.01 m²",
        volume: "13.61 m³",
        depth: "2.17 m",
        height: "2.72 m",
        width: "1.58 m",
        condition: "Good",
        temperature: "24°C",
        humidity: "50%",
        hasSheetData: true,
        roomValuation: "$14,046.71",
        smokeAlarmCount: 0,
        floorDamage: "No",
        ceilingDamage: "No",
        wallDamage: "No",
        windowCount: 2,
        doorCount: 1,
        ceilingLightCount: 2,
        ceilingLightType: "Recessed",
        ceilingFanCount: 0,
        airConditioningCount: 0,
        specifications: {
          floorArea: "5.01 m²",
          ceilingHeight: "2.72 m",
          wallArea: "15.2 m²",
          windowArea: "4.5 m²",
          doorArea: "2.1 m²",
          depth: "2.17 m",
          width: "1.58 m",
          volume: "13.61 m³",
        },
        materials: {
          flooring: "Tile",
          walls: "Concrete",
          ceiling: "Metal",
          windows: "None",
          doors: "Timber",
          windowCover: "None",
        },
        features: [
          { name: "Smoke Alarm", status: "none", icon: "shield", count: 0 },
          { name: "Ceiling Lights", status: "installed", icon: "lightbulb", count: 2 },
          { name: "Ceiling Fan", status: "none", icon: "wind", count: 0 },
          { name: "Air Conditioning", status: "none", icon: "snowflake", count: 0 },
          { name: "Windows", status: "installed", icon: "square", count: 2 },
          { name: "Doors", status: "installed", icon: "door-open", count: 1 },
        ],
        damage: {
          floor: "No",
          ceiling: "No",
          walls: "No",
        },
      },
      {
        id: "3",
        name: "Room 3: Bathroom",
        propertyImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-Bellavista-Tce-08012025_220829%20%281%29.jpg-17gJ1YdLFJxcEJL6JUAa0mIIGvWdJW.jpeg",
        ],
        area: "4.25 m²",
        volume: "9.19 m³",
        condition: "Good",
        temperature: "23°C",
        humidity: "55%",
        hasSheetData: true,
        specifications: {
          floorArea: "4.25 m²",
          ceilingHeight: "2.16 m",
          wallArea: "18.2 m²",
          windowArea: "0.8 m²",
          doorArea: "1.8 m²",
          depth: "2.04 m",
          width: "1.87 m",
          doors: "1",
          windows: "1",
        },
        materials: {
          flooring: "Tile",
          walls: "Plaster",
          ceiling: "Flat",
          windows: "Other",
          doors: "Timber",
        },
        features: [
          { name: "Ceiling Lights", status: "installed", icon: "lightbulb", count: 1 },
          { name: "Recessed Lighting", status: "installed", icon: "zap" },
          { name: "Natural Light", status: "good", icon: "sun" },
          { name: "Floor Damage", status: "yes (wear and tear)", icon: "alert-triangle" },
        ],
        damageAssessment: {
          floorDamage: "Yes (Wear and Tear)",
          ceilingDamage: "No",
          wallDamage: "No",
        },
        valuation: "$13,025.63",
      },
      {
        id: "4",
        name: "Room 4: Master Bedroom",
        propertyImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-Bellavista-Tce-08012025_220648%20%281%29.jpg-RzynbqvbKwtcva7gQR1MNthn2cHACQ.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-Bellavista-Tce-08012025_220608%20%281%29.jpg-CJAERaRUTF3zUevupoVz1GYKz5tYh4.jpeg",
        ],
        area: "19.12 m²",
        volume: "38.78 m³",
        condition: "Good", // Updated Room 4 condition from Complete to Good
        temperature: "22°C",
        humidity: "45%",
        hasSheetData: true,
        valuation: "$56,428.32",
        panoramaCount: 7,
        specifications: {
          floorArea: "19.12 m²",
          ceilingHeight: "2.41 m",
          wallArea: "41.8 m²",
          windowArea: "2.8 m²",
          depth: "2.89 m",
          width: "5.85 m",
          windows: "1",
          doors: "5",
        },
        materials: {
          flooring: "Carpet",
          walls: "Drywall",
          ceiling: "Flat",
          windows: "Other",
          doors: "Multiple Access Points",
        },
        features: [
          { name: "Smoke Alarm", status: "installed", count: 1, icon: "shield-check" },
          { name: "Ceiling Lights", status: "installed", count: 2, icon: "lightbulb" },
          { name: "Ceiling Fan", status: "not-installed", count: 0, icon: "fan" },
          { name: "Air Conditioning", status: "installed", count: 1, icon: "snowflake" },
          { name: "Windows", status: "installed", count: 1, icon: "square" },
          { name: "Doors", status: "installed", count: 5, icon: "door-open" },
        ],
        damageAssessment: {
          floor: "No",
          walls: "No",
          ceiling: "No",
        },
        panoramaLinks: [
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_3ax98exw84easbammy1kdy59a_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_q30i0t1qaqnm9w9ahabpw94qd_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_bcmacw08fqdi7acr9x6shfi4b_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_n62yt7zbfe8gbthibrauparaa_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_yq3ye9yehkru7142z65q2acwa_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_37fty8w3n4tw0nkac909ri7pc_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_1hsznrxt775cdf5e5fr400crc_skybox.jpg",
        ],
      },
      {
        id: "5",
        name: "Room 5: Living Room",
        roomId: "b4qtykzcazp4iumkamm7y7h2b",
        panoramaIds: [
          "k2zwk015t51gw99zpztx4egaa",
          "ecdy23xprhp3q3f0rth5c5hac",
          "5wza109uxdtiah3khz7teiwna",
          "txkwf277fq24hepe3gi002nfa",
          "tx5m3eudcum0iigcxbu2rpbka",
          "udkrwr2wfte2anpi6taw68ycb",
          "wds8heu9aarna9tk8t9s9ygwc",
          "yehgh6y0ztzq71b0dckb5795d",
          "aq8zqxp329yhkc290pzgm9h3b",
          "uf6ssx7puqskhh5dibe1tp8aa",
          "37r3c3nk8ud8rkpb9a28eyd1a",
          "cr857sqay5qbzbe8xdx784acb",
          "0rgwxt1ets18w34c1n8sh4idb",
          "380yg5497h86wkdc5wq4r6fhc",
          "m96rn180d4f690kwy89umae0c",
        ],
        panoramaLinks: [
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_k2zwk015t51gw99zpztx4egaa_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_ecdy23xprhp3q3f0rth5c5hac_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_5wza109uxdtiah3khz7teiwna_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_txkwf277fq24hepe3gi002nfa_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_tx5m3eudcum0iigcxbu2rpbka_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_udkrwr2wfte2anpi6taw68ycb_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_wds8heu9aarna9tk8t9s9ygwc_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_yehgh6y0ztzq71b0dckb5795d_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_aq8zqxp329yhkc290pzgm9h3b_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_uf6ssx7puqskhh5dibe1tp8aa_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_37r3c3nk8ud8rkpb9a28eyd1a_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_cr857sqay5qbzbe8xdx784acb_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_0rgwxt1ets18w34c1n8sh4idb_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_380yg5497h86wkdc5wq4r6fhc_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_m96rn180d4f690kwy89umae0c_skybox.jpg",
        ],
        propertyImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-Bellavista-Tce-08012025_215315.jpg-LZxLaUFYfeHL5UFpogUiQYO72hTE36.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-Bellavista-Tce-08012025_215410.jpg-7KvF1eN6eqcBYEJhsSIiN22uIKob4A.jpeg",
        ],
        roomType: "living room",
        area: "39.83 m²",
        volume: "N/A",
        condition: "Good",
        temperature: "22°C",
        humidity: "45%",
        hasSheetData: true,
        roomValuation: "$124,609.35",
        smokeAlarmCount: 1,
        floorDamage: "No",
        ceilingDamage: "No",
        wallDamage: "No",
        windowCount: 6,
        doorCount: 3,
        ceilingLightCount: 1,
        ceilingFanCount: 1,
        airConditioningCount: 1,
        specifications: {
          floorArea: "39.83 m²",
          ceilingHeight: "N/A",
          wallArea: "N/A",
          windowArea: "N/A",
          doorArea: "N/A",
          width: "4.86 m",
          doors: "3",
          windows: "6",
        },
        materials: {
          flooring: "Hardwood",
          walls: "Gypsum",
          ceiling: "Gypsum",
          windows: "Other",
          doors: "Multiple Access Points",
          windowCover: "Other",
        },
        features: [
          { name: "Smoke Alarm", status: "installed", count: 1, icon: "shield" },
          { name: "Ceiling Lights", status: "installed", count: 1, icon: "lightbulb", type: "Recessed" },
          { name: "Ceiling Fan", status: "installed", count: 1, icon: "wind" },
          { name: "Air Conditioning", status: "installed", count: 1, icon: "snowflake" },
          { name: "Windows", status: "installed", count: 6, icon: "square" },
          { name: "Doors", status: "installed", count: 3, icon: "door-open" },
        ],
        damage: {
          floor: "No",
          ceiling: "No",
          walls: "No",
        },
        valuation: "$124,609.35",
      },
      {
        id: "6",
        name: "Room 6: Hallway",
        roomId: "cdz3fkt38kae7tapstpt0eaeb",
        panoramaIds: [
          "mnz5qufzx838bh2ifngu1t43d",
          "mndhi0uf7rsb24icpat8x03pd",
          "u5nmsfeun7ye1cxfr7q9kcfzc",
          "nzzaazqnf0qxcfz412mcbfuhb",
          "0hfne4usqcy0ew5dxycbhh9fc",
        ],
        panoramaLinks: [
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_cdz3fkt38kae7tapstpt0eaeb_mnz5qufzx838bh2ifngu1t43d_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_cdz3fkt38kae7tapstpt0eaeb_mndhi0uf7rsb24icpat8x03pd_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_cdz3fkt38kae7tapstpt0eaeb_u5nmsfeun7ye1cxfr7q9kcfzc_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_cdz3fkt38kae7tapstpt0eaeb_nzzaazqnf0qxcfz412mcbfuhb_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_cdz3fkt38kae7tapstpt0eaeb_0hfne4usqcy0ew5dxycbhh9fc_skybox.jpg",
        ],
        propertyImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7Ox7Nu4RJOTOfUdLVbEyfeU70BkQHl.png",
        ],
        roomType: "hallway",
        area: "6.41 m²",
        volume: "15.45 m³",
        depth: "0.88 m",
        height: "2.41 m",
        width: "6.52 m",
        condition: "Good",
        temperature: "22°C",
        humidity: "45%",
        hasSheetData: true,
        roomValuation: "$18,591.02",
        smokeAlarmCount: 1,
        floorDamage: "No",
        ceilingDamage: "No",
        wallDamage: "No",
        windowCount: 0,
        ceilingLightCount: 1,
        ceilingFanCount: 0,
        airConditioningCount: 0,
        specifications: {
          floorArea: "6.41 m²",
          ceilingHeight: "2.41 m",
          wallArea: "15.7 m²",
          windowArea: "0 m²",
          doorArea: "2.1 m²",
          depth: "0.88 m",
          width: "6.52 m",
          volume: "15.45 m³",
        },
        materials: {
          flooring: "Carpet",
          walls: "Drywall",
          ceiling: "Flat",
          windows: "None",
          doors: "Timber",
        },
        features: [
          { name: "Smoke Alarm", status: "installed", count: 1, icon: "shield-check" },
          { name: "Ceiling Lights", status: "installed", count: 1, icon: "lightbulb", type: "Recessed" },
          { name: "Ceiling Fan", status: "none", count: 0, icon: "fan" },
          { name: "Air Conditioning", status: "none", count: 0, icon: "snowflake" },
          { name: "Windows", status: "none", count: 0, icon: "square" },
        ],
        roomDescription:
          "This hallway features soft carpet underfoot and clean white walls, with a staircase connecting the upper and lower levels via timber railings and cable balustrades. Multiple doorways lead to bedrooms and other living spaces, while downlights keep the area bright. The layout provides clear sightlines from one end of the hall to the other, giving a sense of openness despite its functional, transitional purpose.",
      },
      {
        id: "7",
        name: "Room 7: Kitchen/Dining",
        area: "18.91 m²",
        volume: "62.40 m³",
        condition: "Complete",
        temperature: "22°C",
        humidity: "45%",
        hasSheetData: true,
        propertyImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-Bellavista-Tce-08012025_215738.jpg-NDOSKYpOP9WoJz4GstaBdtCGz5ZcAB.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/08012025_221050.jpg-Eakha1hrOXZwwUmi3eXE83q2Z5ANjG.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-Bellavista-Tce-08012025_215446.jpg-WHxk0rx2NEh415vnFNkbUDuHBdMIMP.jpeg",
        ],
        specifications: {
          floorArea: "18.91 m²",
          ceilingHeight: "3.30 m",
          wallArea: "62.40 m²",
          windowArea: "12.00 m²",
          doorArea: "4.20 m²",
          width: "4.86 m",
        },
        materials: {
          flooring: "Hardwood and Tile",
          walls: "Drywall",
          ceiling: "Flat",
          windows: "Other",
          doors: "Timber",
          cooktopType: "Induction",
          benchMaterial: "Laminate",
          kitchenLayout: "U-shaped",
        },
        features: [
          { name: "Smoke Alarm", status: "installed", count: 1, icon: "shield-check" },
          { name: "Ceiling Lights", status: "installed", count: 1, type: "Recessed", icon: "lightbulb" },
          { name: "Ceiling Fan", status: "installed", count: 1, icon: "fan" },
          { name: "Air Conditioning", status: "installed", count: 1, icon: "snowflake" },
          { name: "Windows", status: "installed", count: 6, icon: "square" },
        ],
        valuation: 57335.78,
        panoramaCount: 8,
        description:
          "This open-plan living and dining area is light-filled and spacious, featuring polished timber floors and high ceilings with a skylight for added natural illumination. The dining zone is anchored by a large timber table paired with sleek black chairs, while the adjacent lounge offers a comfortable setting with a sofa and contemporary décor. Full-height sliding glass doors open to a covered balcony, seamlessly blending indoor and outdoor living. The kitchen, finished in warm wood cabinetry with dark benchtops, includes stainless steel appliances, a central island, and ample counter space, creating a practical yet welcoming hub for cooking and entertaining.",
      },
      {
        id: "8",
        name: "Room 8: Bathroom + Euro Laundry",
        area: "6.89 m²",
        volume: "16.26 m³",
        condition: "Good",
        temperature: "22°C",
        humidity: "65%",
        hasSheetData: true,
        propertyImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4694-OB0ze190MICuCDChoaoMNhGGAFGtIz.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8MnQOobGwBAsAYlubSY1PeGbzVAqiD.png",
        ],
        specifications: {
          floorArea: "6.89 m²",
          ceilingHeight: "2.36 m",
          depth: "3.88 m",
          width: "1.51 m",
          windowArea: "2 windows",
        },
        materials: {
          flooring: "Tile",
          walls: "Drywall",
          ceiling: "Drywall",
          windows: "Frosted Glass",
          doors: "Standard",
        },
        features: [
          { name: "Double Vanity", status: "excellent", icon: "droplets" },
          { name: "Glass Shower", status: "good", icon: "shower" },
          { name: "Euro Laundry", status: "compact", icon: "washing-machine" },
          { name: "Natural Light", status: "good", icon: "sun" },
        ],
      },
      {
        id: "9",
        name: "Room 9: Hallway",
        area: "2.39 m²",
        volume: "5.77 m³",
        condition: "Good",
        temperature: "22°C",
        humidity: "45%",
        hasSheetData: true,
        propertyImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_m8npxsuk79xy21dd09x9wtped_77bug6dex2fzdp3my4up5x3dd_skybox.jpg-g3Wto7raScQe6uumg1NvFoApCptGHq.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_m8npxsuk79xy21dd09x9wtped_a7h77eu1i3kdnwz5ypd0dhbbc_skybox.jpg-5gtUvIwpQdIOc6Gz5Vechm2uk6EkdI.jpeg",
        ],
        specifications: {
          floorArea: "2.39 m²",
          ceilingHeight: "2.41 m",
          depth: "0.79 m",
          width: "2.43 m",
        },
        materials: {
          flooring: "Carpet",
          walls: "Painted Drywall",
          ceiling: "Flat",
          windows: "None",
          doors: "Multiple Access Points",
        },
        features: [
          { name: "Smoke Alarm", status: "none", icon: "shield" },
          { name: "Ceiling Lights", status: "1 Recessed", icon: "lightbulb" },
          { name: "Ceiling Fan", status: "none", icon: "fan" },
          { name: "Air Conditioning", status: "none", icon: "snowflake" },
          { name: "Windows", status: "none", icon: "square" },
        ],
      },
      {
        id: "10",
        name: "Room 10: Bathroom",
        propertyImages: [],
        area: "2.18 m²",
        volume: "5.25 m³",
        condition: "Good",
        temperature: "22°C",
        humidity: "65%",
        hasSheetData: true,
        panoramaCount: 3,
        specifications: {
          floorArea: "2.18 m²",
          ceilingHeight: "2.41 m",
          wallArea: "N/A",
          windowArea: "N/A",
          doorArea: "N/A",
          width: "1.48 m",
        },
        materials: {
          flooring: "Tile",
          walls: "Plaster",
          ceiling: "Flat",
          windows: "Other",
          doors: "Timber",
        },
        features: [
          { name: "Smoke Alarm", status: "none", count: 1, icon: "shield-alert" },
          { name: "Ceiling Lights", status: "installed", count: 1, icon: "lightbulb", type: "Recessed" },
          { name: "Ceiling Fan", status: "none", count: 0, icon: "fan" },
          { name: "Air Conditioning", status: "none", count: 0, icon: "snowflake" },
          { name: "Windows", status: "installed", count: 3, icon: "square" },
        ],
        roomLocationImage:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%2010-%20location%20image-QiP0IrKqDQWulDXz1DEKmBjEUgZWGV.png",
      },
      {
        id: "11",
        name: "Room 11: Bathroom",
        area: "X m²",
        volume: "X m³",
        condition: "X",
        temperature: "X°C",
        humidity: "X%",
        hasSheetData: false,
        specifications: {
          floorArea: "X m²",
          ceilingHeight: "X m",
          wallArea: "X m²",
          windowArea: "X m²",
          doorArea: "X m²",
        },
        materials: {
          flooring: "Ceramic Tiles",
          walls: "Ceramic Tiles",
          ceiling: "Plasterboard",
          windows: "Aluminium Frame",
          doors: "Timber",
        },
        features: [
          { name: "Ventilation Fan", status: "installed", icon: "fan" },
          { name: "Waterproofing", status: "good", icon: "shield" },
          { name: "Fixtures", status: "modern", icon: "wrench" },
          { name: "Storage", status: "adequate", icon: "archive" },
        ],
      },
      {
        id: "12",
        name: "Room 12: Bedroom",
        area: "X m²",
        volume: "X m³",
        condition: "X",
        temperature: "X°C",
        humidity: "X%",
        hasSheetData: true,
        specifications: {
          floorArea: "X m²",
          ceilingHeight: "X m",
          wallArea: "X m²",
          windowArea: "X m²",
          doorArea: "X m²",
        },
        materials: {
          flooring: "Carpet",
          walls: "Plasterboard",
          ceiling: "Plasterboard",
          windows: "Aluminium Frame",
          doors: "Timber",
        },
        features: [
          { name: "Natural Light", status: "good", icon: "sun" },
          { name: "Ventilation", status: "adequate", icon: "wind" },
          { name: "Built-in Wardrobe", status: "present", icon: "archive" },
          { name: "Electrical Outlets", status: "sufficient", icon: "zap" },
        ],
      },
      {
        id: "13",
        name: "Room 13: Bedroom",
        area: "X m²",
        volume: "X m³",
        condition: "X",
        temperature: "X°C",
        humidity: "X%",
        hasSheetData: true,
        specifications: {
          floorArea: "X m²",
          ceilingHeight: "X m",
          wallArea: "X m²",
          windowArea: "X m²",
          doorArea: "X m²",
        },
        materials: {
          flooring: "Carpet",
          walls: "Plasterboard",
          ceiling: "Plasterboard",
          windows: "Aluminium Frame",
          doors: "Timber",
        },
        features: [
          { name: "Natural Light", status: "good", icon: "sun" },
          { name: "Ventilation", status: "adequate", icon: "wind" },
          { name: "Built-in Wardrobe", status: "present", icon: "archive" },
          { name: "Electrical Outlets", status: "sufficient", icon: "zap" },
        ],
      },
    ],
  }

  // Combine original rooms with additional rooms
  const allRooms = [...propertyData.rooms]

  const handleRoomSelection = (roomId: string, checked: boolean) => {
    if (checked) {
      setSelectedRooms([...selectedRooms, roomId])
    } else {
      setSelectedRooms(selectedRooms.filter((id) => id !== roomId))
    }
  }

  const handleRefreshSheetData = async () => {
    setIsRefreshing(true)
    try {
      await refreshSheetData()
      // Optionally reload the page or refetch data
      window.location.reload()
    } catch (error) {
      console.error("Failed to refresh sheet data:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "excellent":
      case "good":
      case "modern":
      case "installed":
      case "present":
      case "available":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "adequate":
      case "sufficient":
      case "partial":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "limited":
      case "none":
      case "yes":
      case "yes (wear and tear)":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Room Insights</h2>
          <p className="text-gray-600">Comprehensive analysis of all property rooms</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleRefreshSheetData} disabled={isRefreshing} variant="outline" size="sm">
            {isRefreshing ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Database className="h-4 w-4 mr-2" />}
            {isRefreshing ? "Refreshing..." : "Refresh Data"}
          </Button>
        </div>
      </div>

      {/* Room Cards */}
      <div className="grid gap-4">
        {allRooms.map((room) => (
          <Card key={room.id} className="bg-white shadow-sm border-0 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-6 flex-1">
                  <Checkbox
                    checked={selectedRooms.includes(room.id)}
                    onCheckedChange={(checked) => handleRoomSelection(room.id, checked as boolean)}
                  />

                  {/* Property Image */}
                  {room.propertyImages && room.propertyImages.length > 0 && (
                    <div className="flex-shrink-0">
                      <div className="w-32 h-24 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={room.propertyImages[0] || "/placeholder.svg"}
                          alt={`${room.name} property view`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.currentTarget
                            target.src = "/placeholder.svg?height=96&width=128&text=Property+Image"
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                      <Home className="h-5 w-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-800">{room.name}</h3>
                      {room.hasSheetData && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          <Database className="h-3 w-3" />
                          Complete
                        </div>
                      )}
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{room.area}</div>
                        <div className="text-sm text-gray-600">Floor Area</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{room.volume}</div>
                        <div className="text-sm text-gray-600">Volume</div>
                      </div>
                      {room.roomValuation && (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{room.roomValuation}</div>
                          <div className="text-sm text-gray-600">Valuation</div>
                        </div>
                      )}
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{room.panoramaIds?.length || 0}</div>
                        <div className="text-sm text-gray-600">360° Views</div>
                      </div>
                    </div>

                    {/* Specifications - Improved Layout */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Ruler className="h-4 w-4 text-gray-600" />
                          <span className="font-medium text-gray-800">Dimensions</span>
                        </div>
                        <div className="space-y-2">
                          {room.specifications?.ceilingHeight && (
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600">Height:</span>
                              <span className="font-medium">{room.specifications.ceilingHeight}</span>
                            </div>
                          )}
                          {room.specifications?.depth && (
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600">Depth:</span>
                              <span className="font-medium">{room.specifications.depth}</span>
                            </div>
                          )}
                          {room.specifications?.width && (
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600">Width:</span>
                              <span className="font-medium">{room.specifications.width}</span>
                            </div>
                          )}
                          {room.specifications?.floorArea && (
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600">Floor Area:</span>
                              <span className="font-medium">{room.specifications.floorArea}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Palette className="h-4 w-4 text-gray-600" />
                          <span className="font-medium text-gray-800">Materials</span>
                        </div>
                        <div className="space-y-2">
                          {room.materials?.flooring && (
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600">Flooring:</span>
                              <span className="font-medium">{room.materials.flooring}</span>
                            </div>
                          )}
                          {room.materials?.walls && (
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600">Walls:</span>
                              <span className="font-medium">{room.materials.walls}</span>
                            </div>
                          )}
                          {room.materials?.ceiling && (
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600">Ceiling:</span>
                              <span className="font-medium">{room.materials.ceiling}</span>
                            </div>
                          )}
                          {room.specifications?.windows && (
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600">Windows:</span>
                              <span className="font-medium">{room.specifications.windows}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Installed Features */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Wrench className="h-4 w-4 text-gray-600" />
                        <span className="font-medium text-gray-800">Installed Features</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {room.features?.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            {getStatusIcon(feature.status)}
                            <span className="text-sm">
                              {feature.name}
                              {feature.count !== undefined && ` (${feature.count})`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/room/${room.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Exterior Module */}
        <Card className="bg-white shadow-sm border-0 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-6 flex-1">
                <Checkbox disabled />

                {/* Exterior Property Images */}
                <div className="flex-shrink-0 space-y-3">
                  <div className="w-32 h-24 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-Bellavista-Tce-08012025_220204.jpg-HSjLcBgMPfjaiDwuRACztXSt4ia1Iu.jpeg"
                      alt="Property front exterior view"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget
                        target.src = "/placeholder.svg?height=96&width=128&text=Front+Exterior"
                      }}
                    />
                  </div>
                  <div className="w-32 h-24 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-Bellavista-Tce-08012025_220003.jpg-oua7mYFwwy3lO0VgAihCdyV3QbMmpu.jpeg"
                      alt="Property backyard exterior view"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget
                        target.src = "/placeholder.svg?height=96&width=128&text=Backyard+View"
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Exterior</h3>
                    <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      <Database className="h-3 w-3" />
                      Property Features
                    </div>
                  </div>

                  {/* Key Metrics - Exterior specific */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">Corrugated Metal</div>
                      <div className="text-sm text-gray-600">Roof Material</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">Timber</div>
                      <div className="text-sm text-gray-600">Fencing Type</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">No</div>
                      <div className="text-sm text-gray-600">Pool</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">Unknown</div>
                      <div className="text-sm text-gray-600">Solar</div>
                    </div>
                  </div>

                  {/* Exterior Specifications */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Building className="h-4 w-4 text-gray-600" />
                        <span className="font-medium text-gray-800">Structure</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Roof Material:</span>
                          <span className="font-medium">Corrugated Metal</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Fencing Type:</span>
                          <span className="font-medium">Timber</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Driveway Material:</span>
                          <span className="font-medium">Concrete</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Wrench className="h-4 w-4 text-gray-600" />
                        <span className="font-medium text-gray-800">Features</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Pool:</span>
                          <span className="font-medium">No</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Solar:</span>
                          <span className="font-medium">Unknown</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Parking:</span>
                          <span className="font-medium">Concrete Driveway</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Exterior Features */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Palette className="h-4 w-4 text-gray-600" />
                      <span className="font-medium text-gray-800">Exterior Features</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Modern Design</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Timber Fencing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Concrete Driveway</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <span className="text-sm">No Pool</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm">Solar Unknown</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Metal Roofing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button size="sm" variant="outline" disabled>
                  <Eye className="h-4 w-4 mr-2" />
                  Exterior View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Summary */}
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Room Analytics Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">{allRooms.length}</div>
              <div className="text-sm text-blue-600">Total Rooms</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">
                {allRooms.filter((room) => room.hasSheetData).length}
              </div>
              <div className="text-sm text-green-600">With Complete Data</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">
                {allRooms.reduce((total, room) => total + (room.panoramaIds?.length || 0), 0)}
              </div>
              <div className="text-sm text-purple-600">360° Views</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-700">
                {allRooms.filter((room) => room.condition === "Good" || room.condition === "Excellent").length}
              </div>
              <div className="text-sm text-orange-600">Good Condition</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
