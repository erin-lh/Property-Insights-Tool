"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Home, Ruler, Eye, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function RoomPage({ params }) {
  const [selectedImage, setSelectedImage] = useState(null)

  const roomData = {
    "1": {
      id: "1",
      name: "Room 1: Hallway",
      type: "Hallway",
      area: "2.47 m²",
      height: "2.42 m",
      width: "0.88 m",
      depth: "2.23 m",
      volume: "5.98 m³",
      windows: "0",
      doors: "N/A",
      valuation: "$7,171.29",
      condition: "Complete",
      description:
        "Entry hallway with carpet flooring and drywall walls. Features ceiling lights and connects to main living areas.",
      panoramaCount: "2",
      panoramaLinks: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%201-%20Pano%201.jpg-WLLUUFwjKVMeOIgjQrogLGoAOrqQQk.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%201-%20Pano%202.jpg.jpg-Kdk5JO9RxikhkYCPJK3f6ejijcb8J1.jpeg",
      ],
      roomLocationImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7Ox7Nu4RJOTOfUdLVbEyfeU70BkQHl.png",
      propertyImages: [],
      flooring: "Carpet",
      wallMaterial: "Drywall",
      ceilingType: "Flat",
      ceilingLights: "Standard",
      airConditioning: false,
      smokeAlarm: true,
      ceilingFan: false,
      smokeAlarmCount: 1,
      ceilingLightCount: 2,
      ceilingFanCount: 0,
      airConditioningCount: 0,
      windowCount: 0,
      windowCover: "None",
      floorDamage: "No",
      ceilingDamage: "No",
      wallDamage: "No",
      contents: "No contents were detected in this room.",
    },
    "2": {
      id: "2",
      name: "Room 2: Patio",
      type: "Patio",
      area: "5.01 m²",
      height: "2.72 m",
      width: "1.58 m",
      depth: "2.17 m",
      volume: "13.61 m³",
      windows: "2",
      doors: "1",
      valuation: "$14,046.71",
      condition: "Complete",
      description:
        "Covered outdoor patio area with curved corrugated metal roof, tile flooring, modern outdoor furniture, and panoramic garden views.",
      panoramaCount: "4",
      panoramaLinks: [
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_zibi0h0ges2t5dxryrb7800wd_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_cct379k0f1t6gnmuutm23i4ac_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_mw5ymdiqgmkaiasgdiksy3i5a_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_pxk5thts3iiwc5azq4drsitfc_skybox.jpg",
      ],
      roomLocationImage: "https://blobs.vusercontent.net/blob/image-OvrUOeTBdatNOU1fXFzGljEpu4al2A.png",
      propertyImages: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%202-%20property%20image.jpg-67yN9sVAqOf1D8NSUlGF6b1rrw3pVh.jpeg",
      ],
      flooring: "Tile",
      wallMaterial: "Concrete",
      ceilingType: "Metal",
      ceilingLights: "Recessed",
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
          category: "Furniture",
          product: "Outdoor Rope Lounge Chair",
          quantity: 2,
          totalEstimation: "$670",
          details:
            "A low-profile, white metal frame chair with a woven rope seat. The valuation is for the frame only.",
          productLink: "https://lifeinteriors.com.au/products/life-interiors-studio-wire-lounge-chair",
        },
        {
          category: "Furniture",
          product: "Hourglass Side Table",
          quantity: 1,
          totalEstimation: "$170",
          details: "A white, stone-look hourglass-shaped side table.",
          productLink: "https://www.templeandwebster.com.au/White-Kate-Hourglass-Shaped-Side-Table-LVBS1071.html",
        },
        {
          category: "Other",
          product: "Outdoor Seat Cushion",
          quantity: 2,
          totalEstimation: "$78",
          details:
            "A plain, white/light-coloured, square seat cushion suitable for outdoor use. Often sold separately from frames.",
          productLink: "https://www.templeandwebster.com.au/Plain-Outdoor-Cushion-TMPL3983.html",
        },
        {
          category: "Other",
          product: "Small White Ceramic Pot",
          quantity: 1,
          totalEstimation: "$15",
          details: "A small, simple, white ceramic pot for indoor/outdoor use.",
          productLink: "https://theplantsproject.com.au/collections/pots-and-planters/products/small-white-pot",
        },
        {
          category: "Other",
          product: "Small Artificial Plant",
          quantity: 1,
          totalEstimation: "$20",
          details: "A small, artificial green plant insert, similar in appearance to the one pictured.",
          productLink: "https://theplantsproject.com.au/products/artificial-eucalyptus-stem",
        },
      ],
    },
    "3": {
      id: "3",
      name: "Room 3: Bathroom",
      type: "Bathroom",
      area: "4.25 m²",
      height: "2.16 m",
      width: "1.87 m",
      depth: "2.04 m",
      volume: "9.19 m³",
      windows: "1",
      doors: "1",
      valuation: "$12,750.00",
      condition: "Good",
      description:
        "Compact bathroom with tile flooring and plaster walls. Features recessed lighting and natural light from window.",
      panoramaCount: "4",
      panoramaLinks: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%203-%20Pano%201.jpg-3YKPoqnRE6gz5JPtXmMXV3SUpC0l2K.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%203-%20Pano%202.jpg-wBKE8q3lUJxs8ueTthmSy0Pc6seE8n.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%203-%20pano%203.jpg-T1F6bCIPBCWpstb1b2Fbz0bdHP4zOr.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%203-%20Pano%204.jpg-vdflvnGza1d3RKBDkHjuP4cN2gvlh9.jpeg",
      ],
      roomLocationImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-D6ymHOPAPDVRRv8srvo10ZGcexl5Ll.png",
      propertyImages: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%203-%20property%20image.jpg-fYzbBkGbez0UyyC09ne1gwZKPxcoJg.jpeg",
      ],
      flooring: "Tile",
      wallMaterial: "Plaster",
      ceilingType: "Flat",
      ceilingLights: "Recessed",
      airConditioning: false,
      smokeAlarm: false,
      ceilingFan: false,
      smokeAlarmCount: 0,
      ceilingLightCount: 1,
      ceilingFanCount: 0,
      airConditioningCount: 0,
      windowCount: 1,
      windowCover: "Other",
      floorDamage: "Yes (wear and tear)",
      ceilingDamage: "No",
      wallDamage: "No",
      contents: [
        {
          category: "Other Belongings",
          product: "Liquid Soap Dispenser",
          quantity: 1,
          totalEstimation: "$25.97",
          details:
            "A black, wall-mounted liquid soap dispenser. The item in the image appears to be a basic, modern design consistent with this product.",
          productLink: "https://fusionloc.com.au/product/fusion-loc-suction-bathroom-tumbler-matte-black/",
        },
        {
          category: "Other Belongings",
          product: "Bathroom Tumbler",
          quantity: 1,
          totalEstimation: "$25.97",
          details: "A black, wall-mounted tumbler for toothbrushes. It matches the soap dispenser.",
          productLink: "https://fusionloc.com.au/product/fusion-loc-suction-bathroom-tumbler-matte-black/",
        },
        {
          category: "Other Belongings",
          product: "White Hand Towel",
          quantity: 1,
          totalEstimation: "$4",
          details: "A standard, plain white cotton hand towel.",
          productLink: "https://www.bigw.com.au/product/openook-australian-cotton-hand-towel-white/p/140667",
        },
        {
          category: "Other Belongings",
          product: "Small Black Pot",
          quantity: 1,
          totalEstimation: "$4",
          details: "A small, black, cylindrical pot.",
          productLink: "https://www.ikea.com.au/en/p/nypon-plant-pot-in-outdoor-black-20476211/",
        },
        {
          category: "Other Belongings",
          product: "Small Artificial Plant",
          quantity: 1,
          totalEstimation: "$5",
          details: "A small, artificial green plant insert.",
          productLink: "https://www.ikea.com.au/en/p/fejka-artificial-potted-plant-in-outdoor-grass-30395342/",
        },
      ],
    },
    "4": {
      id: "4",
      name: "Room 4: Master Bedroom",
      type: "Master Bedroom",
      area: "19.12 m²",
      height: "2.41 m",
      width: "5.85 m",
      depth: "2.89 m",
      volume: "38.78 m³",
      windows: "1",
      doors: "5",
      valuation: "$56,428.32",
      condition: "Good",
      description:
        "Spacious master bedroom with carpet flooring and multiple access points. Features air conditioning, smoke alarm, and ceiling lights for comfort and safety.",
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
      roomLocationImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ovqqovg6G4qwOTH66jAhMmEMZp4iH2.png",
      propertyImages: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-Bellavista-Tce-08012025_220648%20%281%29.jpg-RzynbqvbKwtcva7gQR1MNthn2cHACQ.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-Bellavista-Tce-08012025_220608%20%281%29.jpg-CJAERaRUTF3zUevupoVz1GYKz5tYh4.jpeg",
      ],
      flooring: "Carpet",
      wallMaterial: "Drywall",
      ceilingType: "Flat",
      ceilingLights: "Recessed",
      airConditioning: true,
      smokeAlarm: true,
      ceilingFan: false,
      smokeAlarmCount: 1,
      ceilingLightCount: 2,
      ceilingFanCount: 0,
      contents: [
        {
          category: "Furniture",
          product: "Upholstered Bed Frame",
          quantity: "1",
          totalEstimation: "$299",
          productLink: "https://www.fortywinks.com.au/products/lane-qb-channelled-headboard-bed/",
          details: "A queen-sized bed frame with a light grey upholstered, channelled headboard.",
        },
        {
          category: "Furniture",
          product: "Queen Mattress",
          quantity: "1",
          totalEstimation: "$399",
          productLink: "https://www.ikea.com/au/en/p/valevag-pocket-sprung-mattress-firm-light-blue-40470014/",
          details: "A standard queen-sized mattress. Valuation based on a popular, basic pocket-sprung model.",
        },
        {
          category: "Furniture",
          product: "Bedside Table",
          quantity: "2",
          totalEstimation: "$123.90",
          productLink: "https://www.bunnings.com.au/artiss-white-storage-bedside-table-with-shelf_p0225911",
          details: "A simple, white bedside table with an open lower shelf, consistent with the style shown.",
        },
        {
          category: "Other Belongings",
          product: "Quilt Cover Set",
          quantity: "1",
          totalEstimation: "$119.99",
          productLink:
            "https://www.manchesterwarehouse.com.au/products/linen-house-lifestyle-nara-400thc-bamboo-cotton-quilt-cover-set-range-white",
          details: "A plain, white, queen-sized quilt cover set.",
        },
        {
          category: "Other Belongings",
          product: "Standard Pillow",
          quantity: "2",
          totalEstimation: "$62.98",
          productLink:
            "https://www.sheridanoutlet.com.au/sheridan-outlet-polyester-fresh-sleep-medium-pillow-t2707-b100-c200-na-white.html",
          details: "Standard-sized bed pillows.",
        },
        {
          category: "Other Belongings",
          product: "Decorative Cushion",
          quantity: "1",
          totalEstimation: "$29.95",
          productLink: "https://www.willowhomeliving.com.au/products/light-grey-cushion-cover",
          details: "A light grey, textured, square decorative cushion.",
        },
        {
          category: "Electronics",
          product: "Bedside Table Lamp",
          quantity: "2",
          totalEstimation: "$129.82",
          productLink: "https://www.myer.com.au/p/oriel-lighting-lenny-mesh-bedside-table-lamp-in-black",
          details: "A small, modern black table lamp with a mesh or wire style shade.",
        },
        {
          category: "Other Belongings",
          product: "Book",
          quantity: "2",
          totalEstimation: "$39.98",
          productLink: "https://www.booktopia.com.au/the-last-thing-he-told-me-laura-dave/book/9781761103362.html",
          details: "Standard hardcover books. Valuation is an average estimate per book.",
        },
        {
          category: "Artwork and Valuables",
          product: "Framed Wall Art",
          quantity: "1",
          totalEstimation: "$65",
          productLink:
            "https://www.iheartwallart.com.au/products/lush-two-piece-abstract-green-print-set-by-dan-hobday",
          details:
            "A large, framed abstract art print with green and neutral tones. Valuation is for a single print of a similar size and style.",
        },
      ],
      airConditioningCount: 1,
      windowCount: 1,
      windowCover: "Other",
      floorDamage: "No",
      ceilingDamage: "No",
      wallDamage: "No",
    },
    "5": {
      id: "5",
      name: "Room 5: Living Room",
      type: "living room",
      area: "15.20 m²",
      height: "N/A",
      width: "4.86 m",
      depth: "N/A",
      volume: "36.63 m³",
      windows: "6",
      doors: "3",
      valuation: "$45,600.00",
      condition: "Good",
      description:
        "This open-plan living area combines lounge, dining, and kitchen spaces in a bright, airy setting. Polished timber floors and high ceilings with feature windows create a warm, inviting atmosphere, while a skylight adds extra natural light. The lounge area is styled with a modern grey sofa, round white coffee table, and neutral rug, positioned near the dining space with a timber table and black chairs. The kitchen features warm wood cabinetry, a contrasting island with dark benchtops, and stainless steel appliances, creating a practical yet welcoming hub for cooking and entertaining.",
      panoramaCount: "5",
      panoramaLinks: [
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_k2zwk015t51gw99zpztx4egaa_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_ecdy23xprhp3q3f0rth5c5hac_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_5wza109uxdtiah3khz7teiwna_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_txkwf277fq24hepe3gi002nfa_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_b4qtykzcazp4iumkamm7y7h2b_tx5m3eudcum0iigcxbu2rpbka_skybox.jpg",
      ],
      roomLocationImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-D6ymHOPAPDVRRv8srvo10ZGcexl5Ll.png",
      propertyImages: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-Bellavista-Tce-08012025_215315.jpg-LZxLaUFYfeHL5UFpogUiQYO72hTE36.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-Bellavista-Tce-08012025_215410.jpg-7KvF1eN6eqcBYEJhsSIiN22uIKob4A.jpeg",
      ],
      flooring: "Hardwood",
      wallMaterial: "Gypsum",
      ceilingType: "Gypsum",
      ceilingLights: "Recessed",
      airConditioning: true,
      smokeAlarm: true,
      ceilingFan: true,
      smokeAlarmCount: 1,
      ceilingLightCount: 1,
      ceilingFanCount: 1,
      airConditioningCount: 1,
      windowCount: 6,
      windowCover: "Other",
      floorDamage: "No",
      ceilingDamage: "No",
      wallDamage: "No",
      contents: [
        {
          category: "Furniture",
          product: "3-Seater Fabric Sofa",
          quantity: "1",
          totalEstimation: "$1,299",
          productLink: "https://www.loungelovers.com.au/linda-3-seat-sofa-coral-bay-textured-light-grey",
          details: "A 3-seater sofa in a light grey textured fabric with light oak legs.",
        },
        {
          category: "Furniture",
          product: "Rattan Buffet Sideboard",
          quantity: "1",
          totalEstimation: "$899",
          productLink: "https://www.templeandwebster.com.au/Cannes-Rattan-4-Door-Buffet-Sideboard-HANS1001.html",
          details: "An oak-finish sideboard with four woven rattan/wicker doors.",
        },
        {
          category: "Furniture",
          product: "Boucle Accent Chair",
          quantity: "1",
          totalEstimation: "$549",
          productLink: "https://www.templeandwebster.com.au/Togo-Boucle-Armchair-TPWT2954.html",
          details: "A modern tub-style armchair upholstered in a dark grey/charcoal boucle fabric.",
        },
        {
          category: "Furniture",
          product: "Round Low Coffee Table",
          quantity: "1",
          totalEstimation: "$279",
          productLink: "https://www.freedom.com.au/product/24216858",
          details: "A large, round, low-profile coffee table in a plain white finish.",
        },
        {
          category: "Furniture",
          product: "Marble Side Table",
          quantity: "1",
          totalEstimation: "$149",
          productLink: "https://www.castlery.com/au/products/odette-marble-side-table",
          details: "A small, round side table with a white marble top and a white tulip-style pedestal base.",
        },
        {
          category: "Furniture",
          product: "Slim Console Table",
          quantity: "1",
          totalEstimation: "$199",
          productLink: "https://www.freedom.com.au/product/24329245",
          details: "A slim, minimalist console table with a black metal frame and a white/light-coloured top.",
        },
        {
          category: "Other Belongings",
          product: "Large Patterned Rug",
          quantity: "1",
          totalEstimation: "$499",
          productLink: "https://www.templeandwebster.com.au/Ivory-and-Grey-Skandi-Diamond-Wool-Rug-VRAI1266.html",
          details: "A large, textured floor rug with a grey and ivory diamond pattern.",
        },
        {
          category: "Other Belongings",
          product: "Decorative Cushion (Beige/Gold)",
          quantity: "2",
          totalEstimation: "$79.90",
          productLink: "https://www.pillowtalk.com.au/products/heath-cushion-sahara",
          details: "A square decorative cushion with a beige and mustard/gold geometric pattern.",
        },
        {
          category: "Other Belongings",
          product: "Decorative Cushion (Cream)",
          quantity: "2",
          totalEstimation: "$69.90",
          productLink: "https://www.adairs.com.au/homewares/cushions/home-republic/stonewashed-cotton-cream-cushion/",
          details: "A square decorative cushion in a plain, textured cream/off-white fabric.",
        },
        {
          category: "Other Belongings",
          product: "Decorative Cushion (White)",
          quantity: "1",
          totalEstimation: "$29.95",
          productLink: "https://www.templeandwebster.com.au/Linen-House-Lifestyle-Delray-Cushion-LHLF1109.html",
          details: "A small, white rectangular cushion with corner tassels, placed on the accent chair.",
        },
        {
          category: "Artwork and Valuables",
          product: "Large Abstract Figure Art",
          quantity: "1",
          totalEstimation: "$380",
          productLink:
            "https://www.theblockshop.com.au/product/figurative-art-print-by-adrian-o-labrador-dawn-by-the-sea/",
          details: "A large, framed canvas print of an abstract figure in a striped robe.",
        },
        {
          category: "Artwork and Valuables",
          product: "Framed Beach Scene Art",
          quantity: "1",
          totalEstimation: "$250",
          productLink: "https://www.oliveetoriel.com/products/sorrento-ii-framed-canvas-art-print",
          details: "A framed print depicting a beach/pool scene with a straw hat and sunglasses.",
        },
        {
          category: "Artwork and Valuables",
          product: "Round Wall Mirror",
          quantity: "1",
          totalEstimation: "$229",
          productLink: "https://www.adairs.com.au/homewares/mirrors/home-republic/marley-mirror-gold/",
          details: "A medium-sized round wall mirror with a thin gold/brass metal frame.",
        },
        {
          category: "Other Belongings",
          product: "Large White Vase",
          quantity: "1",
          totalEstimation: "$49.95",
          productLink: "https://www.pillowtalk.com.au/products/habitate-cali-vase-white",
          details: "A large, round, matte white ceramic vase, on the coffee table.",
        },
        {
          category: "Other Belongings",
          product: "Clear Glass Vase",
          quantity: "1",
          totalEstimation: "$35",
          productLink: "https://www.countryroad.com.au/arlo-vase-60265818-1",
          details: "A medium-sized, clear glass vase with a flared opening, on the sideboard.",
        },
        {
          category: "Other Belongings",
          product: "Dried Branches/Stems",
          quantity: "1",
          totalEstimation: "$24.95",
          productLink:
            "https://www.adairs.com.au/homewares/artificial-plants--flowers/home-republic/dried-look-eucalyptus-spray-brown/",
          details: "A bunch of dried decorative branches or stems.",
        },
        {
          category: "Other Belongings",
          product: "At Home Hardcover Book",
          quantity: "1",
          totalEstimation: "$51.25",
          productLink: "https://www.booktopia.com.au/at-home-brian-paquette/book/9781423648937.html",
          details: "At Home by Brian Paquette, used as a decorative book on the coffee table.",
        },
      ],
      contentsTotal: "$5,072.90",
    },
    "6": {
      id: "6",
      name: "Room 6: Hallway",
      type: "Hallway",
      area: "6.41 m²",
      height: "2.41 m",
      width: "6.52 m",
      depth: "0.88 m",
      volume: "15.45 m³",
      windows: "0",
      doors: "3",
      valuation: "$18,591.02",
      condition: "Good",
      description:
        "This hallway features soft carpet underfoot and clean white walls, with a staircase connecting the upper and lower levels via timber railings and cable balustrades. Multiple doorways lead to bedrooms and other living spaces, while downlights keep the area bright. The layout provides clear sightlines from one end of the hall to the other, giving a sense of openness despite its functional, transitional purpose.",
      panoramaCount: "5",
      panoramaLinks: [
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_cdz3fkt38kae7tapstpt0eaeb_mnz5qufzx838bh2ifngu1t43d_skyboxrhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_cdz3fkt38kae7tapstpt0eaeb_mnz5qufzx838bh2ifngu1t43d_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_cdz3fkt38kae7tapstpt0eaeb_mndhi0uf7rsb24icpat8x03pd_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_cdz3fkt38kae7tapstpt0eaeb_u5nmsfeun7ye1cxfr7q9kcfzc_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_cdz3fkt38kae7tapstpt0eaeb_nzzaazqnf0qxcfz412mcbfuhb_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_cdz3fkt38kae7tapstpt0eaeb_0hfne4usqcy0ew5dxycbhh9fc_skybox.jpg",
      ],
      roomLocationImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7Ox7Nu4RJOTOfUdLVbEyfeU70BkQHl.png",
      propertyImages: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7Ox7Nu4RJOTOfUdLVbEyfeU70BkQHl.png",
      ],
      flooring: "Carpet",
      wallMaterial: "Drywall",
      ceilingType: "Flat",
      ceilingLights: "Recessed",
      airConditioning: false,
      smokeAlarm: true,
      ceilingFan: false,
      smokeAlarmCount: 1,
      ceilingLightCount: 1,
      ceilingFanCount: 0,
      airConditioningCount: 0,
      windowCount: 0,
      windowCover: "None",
      floorDamage: "No",
      ceilingDamage: "No",
      wallDamage: "No",
      contents: [],
    },
    "7": {
      id: "7",
      name: "Room 7: Kitchen/Dining",
      type: "Kitchen/Dining",
      area: "18.91 m²",
      height: "3.30 m",
      width: "4.86 m",
      depth: "N/A",
      volume: "62.40 m³",
      windows: "6",
      doors: "N/A",
      valuation: "$57,335.78",
      condition: "Complete",
      description:
        "This open-plan living and dining area is light-filled and spacious, featuring polished timber floors and high ceilings with a skylight for added natural illumination. The dining zone is anchored by a large timber table paired with sleek black chairs, while the adjacent lounge offers a comfortable setting with a sofa and contemporary décor. Full-height sliding glass doors open to a covered balcony, seamlessly blending indoor and outdoor living. The kitchen, finished in warm wood cabinetry with dark benchtops, includes stainless steel appliances, a central island, and ample counter space, creating a practical yet welcoming hub for cooking and entertaining.",
      panoramaCount: "8",
      panoramaLinks: [
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_ediidma5zg15dufx3n0qyq21a_giepn8c8hn3s2zfp2t4sheh1b_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_ediidma5zg15dufx3n0qyq21a_7a02a7k2dmbaq0szbqpci6a8c_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_ediidma5zg15dufx3n0qyq21a_5uwdq5n5n42c0sg009u035ged_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_ediidma5zg15dufx3n0qyq21a_iwr0u8kdin6z0bde33ngqucec_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_ediidma5zg15dufx3n0qyq21a_mz4h00qx18y13hsi0fti8a3gb_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_ediidma5zg15dufx3n0qyq21a_pgpbabyyi5nne2168asks2kud_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_ediidma5zg15dufx3n0qyq21a_r8i08rum266tkqq5kuqgcm9mb_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_ediidma5zg15dufx3n0qyq21a_m1m8dxa3uufnzrmxgen3i84ab_skybox.jpg",
      ],
      roomLocationImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-D6ymHOPAPDVRRv8srvo10ZGcexl5Ll.png",
      propertyImages: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-Bellavista-Tce-08012025_215738.jpg-NDOSKYpOP9WoJz4GstaBdtCGz5ZcAB.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/08012025_221050.jpg-Eakha1hrOXZwwUmi3eXE83q2Z5ANjG.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-Bellavista-Tce-08012025_215446.jpg-WHxk0rx2NEh415vnFNkbUDuHBdMIMP.jpeg",
      ],
      flooring: "Hardwood and Tile",
      wallMaterial: "Drywall",
      ceilingType: "Flat",
      ceilingLights: "Recessed",
      airConditioning: true,
      smokeAlarm: true,
      ceilingFan: true,
      smokeAlarmCount: 1,
      ceilingLightCount: 1,
      ceilingFanCount: 1,
      airConditioningCount: 1,
      windowCount: 6,
      windowCover: "Other",
      floorDamage: "No",
      ceilingDamage: "No",
      wallDamage: "No",
      contents: [
        {
          category: "Furniture",
          product: "Rectangular Dining Table",
          quantity: "1",
          totalEstimation: "$949",
          productLink: "https://oakfurniturestore.com.au/products/seattle-natural-solid-oak-large-dining-table",
          details: "A large, rectangular dining table made from solid light/natural oak.",
        },
        {
          category: "Furniture",
          product: "Black Timber Dining Chair",
          quantity: "6",
          totalEstimation: "$1,794",
          productLink: "https://berkowitz.com.au/product/vick-dining-chair-black/",
          details: "A black, solid timber dining chair with a curved backrest.",
        },
        {
          category: "Furniture",
          product: "Kitchen Bar Stool",
          quantity: "4",
          totalEstimation: "$916",
          productLink:
            "https://www.theblockshop.com.au/product/b2c-furniture-gaudi-hardwood-counter-bar-stool-black-beige-fabric/",
          details: "A counter-height bar stool with a black timber frame, oak seat, and low backrest.",
        },
        {
          category: "Appliances",
          product: "Kettle",
          quantity: "1",
          totalEstimation: "$249",
          productLink: "https://www.jbhifi.com.au/products/smeg-50s-style-1-7l-kettle-black",
        },
        {
          category: "Appliances",
          product: "Toaster",
          quantity: "1",
          totalEstimation: "$229",
          productLink: "https://www.thegoodguys.com.au/smeg-50s-style-2-slice-toaster-black-tsf01blau",
          details: "A Smeg 50's Retro Style 2-slice toaster in black.",
        },
        {
          category: "Other Belongings",
          product: "Pepper Grinder",
          quantity: "1",
          totalEstimation: "$9.95",
          productLink: "https://www.target.com.au/p/black-classic-pepper-grinder/59997375",
          details: "A tall, black, manual pepper grinder.",
        },
        {
          category: "Other Belongings",
          product: "Large Serving Bowl",
          quantity: "1",
          totalEstimation: "$29.95",
          productLink: "https://www.freedom.com.au/product/24581297",
          details: "A large, white, low-profile ceramic serving bowl, displayed on the dining table.",
        },
        {
          category: "Other Belongings",
          product: "Large Glass Vase",
          quantity: "1",
          totalEstimation: "$79.95",
          productLink: "https://www.myer.com.au/p/heritage-alcot-glass-vessel-large-32cm-in-clear",
          details: "A large, clear glass vase with a wide body and narrow neck, on the dining table.",
        },
        {
          category: "Other Belongings",
          product: "Artificial Eucalyptus Stems",
          quantity: "1",
          totalEstimation: "$18",
          productLink: "https://handcraftedflowers.com.au/products/eucalyptus-bush-artificial",
          details: "A bunch of artificial eucalyptus stems inside the glass vase.",
        },
      ],
    },
    "8": {
      id: "8",
      name: "Room 8: Bathroom + Euro Laundry",
      type: "Bathroom + Euro Laundry",
      area: "6.89 m²",
      height: "2.36 m",
      width: "1.51 m",
      depth: "3.88 m",
      volume: "16.26 m³",
      windows: "2",
      doors: "N/A",
      valuation: "$21,108.60",
      condition: "Good",
      description:
        "This spacious bathroom features a large mirrored wall above a double vanity with vessel sinks, dark benchtops, and a mix of timber and lime-green cabinetry for a pop of colour. A glass-enclosed shower sits beside the toilet, with frosted windows allowing natural light while maintaining privacy. The floor is fully tiled in a neutral tone, showing mild signs of wear consistent with use. Built-in storage cupboards and a towel rail add practicality, making the space both functional and bright. This property includes a compact Euro laundry discreetly tucked behind concertina doors. It features a stainless steel sink with tiled splashback, and wall taps for both washing machine and dryer connections.",
      panoramaCount: "4",
      panoramaLinks: [
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_h26t7ky77ew74yb0pg8qqf5rd_myhwqxziu77419ti4sgkrba4b_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_h26t7ky77ew74yb0pg8qqf5rd_uzh5ar9q3b9muaafm5nuqnk4c_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_h26t7ky77ew74yb0pg8qqf5rd_b8r10ewiy8yrasbrq6kr82afb_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_h26t7ky77ew74yb0pg8qqf5rd_d83wu89trcyu4f4z3f4crcfxc_skybox.jpg",
      ],
      roomLocationImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ovqqovg6G4qwOTH66jAhMmEMZp4iH2.png",
      propertyImages: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8MnQOobGwBAsAYlubSY1PeGbzVAqiD.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4694-OB0ze190MICuCDChoaoMNhGGAFGtIz.jpeg",
      ],
      flooring: "Tile",
      wallMaterial: "Drywall",
      ceilingType: "Drywall",
      ceilingLights: "Recessed",
      airConditioning: false,
      smokeAlarm: false,
      ceilingFan: false,
      smokeAlarmCount: 0,
      ceilingLightCount: 1,
      ceilingFanCount: 0,
      airConditioningCount: 0,
      windowCount: 2,
      windowCover: "Other",
      floorDamage: "Yes (Wear and Tear)",
      ceilingDamage: "No",
      wallDamage: "No",
      contents: [
        {
          productNumber: "841",
          category: "Other Belongings",
          productFixture: "Ceramic Soap Dispenser",
          quantity: 1,
          estimatedValuation: 19.95,
          totalEstimation: 19.95,
          linkToProduct: "https://www.myer.com.au/p/salt-pepper-suds-hepburn-soap-pump-350ml-in-black",
          details: "A black, ceramic, freestanding soap dispenser with a pump.",
        },
        {
          productNumber: "842",
          category: "Other Belongings",
          productFixture: "Ceramic Tumbler",
          quantity: 1,
          estimatedValuation: 7,
          totalEstimation: 7,
          linkToProduct: "https://www.bigw.com.au/product/openook-ceramic-toothbrush-holder-black/p/240695",
          details: "A black, ceramic tumbler, matching the soap dispenser.",
        },
        {
          productNumber: "843",
          category: "Other Belongings",
          productFixture: "White Hand Towel",
          quantity: 1,
          estimatedValuation: 29.9,
          totalEstimation: 29.9,
          linkToProduct: "https://www.homegoodshardware.com.au/products/ribbed-hand-towel-white",
          details: "A white, cotton hand towel with a ribbed texture.",
        },
        {
          productNumber: "845",
          category: "Other Belongings",
          productFixture: "Artificial Orchid + Small Black Pot",
          quantity: 1,
          estimatedValuation: 97.9,
          totalEstimation: 97.9,
          linkToProduct: "https://www.artificialplantshop.com.au/medium-orchid-in-black-pot-40cm",
          details: "A small, black, ceramic pot containing a small, artificial white phalaenopsis orchid.",
        },
      ],
    },
    "9": {
      id: "9",
      name: "Room 9: Hallway",
      type: "Hallway",
      area: "2.39 m²",
      height: "2.41 m",
      width: "2.43 m",
      depth: "0.79 m",
      volume: "5.77 m³",
      windows: "0",
      doors: "N/A",
      valuation: "$6,938.72",
      condition: "Good",
      description:
        "This short hallway connects directly to the bathroom (with integrated Euro-laundry) and a bedroom. It is carpeted in a soft, neutral-toned pile that contrasts with the tiled bathroom flooring. The walls are painted in a crisp white, creating a bright and open feel. A single downlight overhead provides illumination, while the curved wall lines give the space a smooth, modern flow. The hallway is wide enough for easy movement between rooms and frames a clear sightline straight through to the double vanity area in the bathroom.",
      panoramaCount: "2",
      panoramaLinks: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_m8npxsuk79xy21dd09x9wtped_77bug6dex2fzdp3my4up5x3dd_skybox.jpg-g3Wto7raScQe6uumg1NvFoApCptGHq.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_m8npxsuk79xy21dd09x9wtped_a7h77eu1i3kdnwz5ypd0dhbbc_skybox.jpg-5gtUvIwpQdIOc6Gz5Vechm2uk6EkdI.jpeg",
      ],
      roomLocationImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7QJ3KYpzVFb1ZmWTWAEMRZy5ODalIa.png",
      propertyImages: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_m8npxsuk79xy21dd09x9wtped_77bug6dex2fzdp3my4up5x3dd_skybox.jpg-g3Wto7raScQe6uumg1NvFoApCptGHq.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_m8npxsuk79xy21dd09x9wtped_a7h77eu1i3kdnwz5ypd0dhbbc_skybox.jpg-5gtUvIwpQdIOc6Gz5Vechm2uk6EkdI.jpeg",
      ],
      flooring: "Carpet",
      wallMaterial: "Painted Drywall",
      ceilingType: "Flat",
      ceilingLights: "Recessed",
      airConditioning: false,
      smokeAlarm: false,
      ceilingFan: false,
      smokeAlarmCount: 0,
      ceilingLightCount: 1,
      ceilingFanCount: 0,
      airConditioningCount: 0,
      windowCount: 0,
      windowCover: "Other",
      floorDamage: "No",
      ceilingDamage: "No",
      wallDamage: "No",
      contents: "No contents detected",
    },
    "10": {
      id: "10",
      name: "Room 10: Bathroom",
      type: "Bathroom",
      area: "2.18 m²",
      height: "2.41 m",
      width: "1.48 m",
      depth: "N/A",
      volume: "N/A",
      windows: "3",
      doors: "N/A",
      valuation: "$6,679.75",
      condition: "Good",
      description:
        "This bathroom is a compact powder room featuring a corner-mounted wall basin with a chrome tap and exposed plumbing, paired with a close-coupled toilet. The space is brightened by a trio of high-set and mid-height frosted glass windows framed in black, providing privacy while allowing natural light to filter in. White walls and matching white sanitaryware create a clean, fresh feel, while brown-toned floor tiles add warmth. A chrome towel ring and toilet roll holder complete the functional setup, with a small wall-mounted soap dispenser adding a touch of convenience. The entry opens directly to a landing area with polished timber floors, enhancing the light and airy atmosphere",
      panoramaCount: "3",
      panoramaLinks: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/room%2010-%20pano%201.jpg-wVoPxRYyKW9j17pUPwMNmrxI244fUb.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%2010-%20pano%202.jpg-oxkuRGbEWLYrxYmVYstCmiKHtYgBCO.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/room%2010-%20pano%203.jpg-yjWy5ItyecRBnjzDd54o1TRm0KNIYX.jpeg",
      ],
      roomLocationImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%2010-%20location%20image-QiP0IrKqDQWulDXz1DEKmBjEUgZWGV.png",
      propertyImages: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room-10-property-image.jpg-q0eLCT6Ei1mKjk06ROI4uGeSYsByJ1.jpeg",
      ],
      flooring: "Tile",
      wallMaterial: "Plaster",
      ceilingType: "Flat",
      ceilingLights: "Recessed",
      airConditioning: false,
      smokeAlarm: false,
      ceilingFan: false,
      smokeAlarmCount: 0,
      ceilingLightCount: 1,
      ceilingFanCount: 0,
      airConditioningCount: 0,
      windowCount: 3,
      windowCover: "Other",
      floorDamage: "Yes",
      ceilingDamage: "No",
      wallDamage: "No",
      contents: [
        {
          productNumber: "1046",
          category: "Other Belongings",
          productFixture: "Ceramic Soap Dispenser",
          quantity: 1,
          estimatedValuation: 19.95,
          totalEstimation: 19.95,
          linkToProduct: "https://www.myer.com.au/p/salt-pepper-suds-hepburn-soap-pump-350ml-in-black",
          details: "A black, ceramic, freestanding soap dispenser with a pump.",
        },
        {
          productNumber: "1047",
          category: "Other Belongings",
          productFixture: "Ceramic Tumbler",
          quantity: 1,
          estimatedValuation: 7,
          totalEstimation: 7,
          linkToProduct: "https://www.bigw.com.au/product/openook-ceramic-toothbrush-holder-black/p/240695",
          details: "A black, ceramic tumbler, matching the soap dispenser.",
        },
        {
          productNumber: "1048",
          category: "Other Belongings",
          productFixture: "White Hand Towel",
          quantity: 1,
          estimatedValuation: 29.9,
          totalEstimation: 29.9,
          linkToProduct: "https://www.homegoodshardware.com.au/products/ribbed-hand-towel-white",
          details: "A white, cotton hand towel with a ribbed texture.",
        },
      ],
      contentsTotal: "$56.85",
    },
    "11": {
      id: "11",
      name: "Room 11: Bedroom",
      type: "Bedroom",
      area: "12.50 m²",
      height: "2.41 m",
      width: "4.20 m",
      depth: "2.98 m",
      volume: "30.13 m³",
      windows: "2",
      doors: "1",
      valuation: "$36,875.00",
      condition: "Good",
      description:
        "Secondary bedroom with carpet flooring and built-in wardrobes. Features natural light from windows and ceiling lighting.",
      panoramaCount: "3",
      panoramaLinks: [],
      roomLocationImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7Ox7Nu4RJOTOfUdLVbEyfeU70BkQHl.png",
      propertyImages: [],
      flooring: "Carpet",
      wallMaterial: "Drywall",
      ceilingType: "Flat",
      ceilingLights: "Recessed",
      airConditioning: false,
      smokeAlarm: true,
      ceilingFan: false,
      smokeAlarmCount: 1,
      ceilingLightCount: 2,
      ceilingFanCount: 0,
      airConditioningCount: 0,
      windowCount: 2,
      windowCover: "Blinds",
      floorDamage: "No",
      ceilingDamage: "No",
      wallDamage: "No",
      contents: [
        {
          category: "Furniture",
          product: "Upholstered Bed Frame",
          quantity: "1",
          totalEstimation: "$356",
          productLink: "https://sleepcenterbeds.com.au/products/modern-headboard-bed-frame-queen-charcoal",
          details: "A queen-sized bed frame with a dark grey/charcoal upholstered headboard.",
        },
        {
          category: "Furniture",
          product: "Queen Mattress",
          quantity: "1",
          totalEstimation: "$399",
          productLink: "https://www.ikea.com/au/en/p/valevag-pocket-sprung-mattress-firm-light-blue-40470014/",
          details: "A standard queen-sized mattress. Valuation based on a popular, basic pocket-sprung model.",
        },
        {
          category: "Furniture",
          product: "Bedside Table",
          quantity: "2",
          totalEstimation: "$123.90",
          productLink: "https://www.bunnings.com.au/artiss-white-storage-bedside-table-with-shelf_p0225911",
          details: "A simple, white bedside table with an open lower shelf.",
        },
        {
          category: "Other Belongings",
          product: "Quilt Cover Set",
          quantity: "1",
          totalEstimation: "$149.99",
          productLink: "https://www.myer.com.au/p/linen-house-nara-400tc-bamboo-cotton-quilt-cover-set-in-white",
          details: "A plain, white, queen-sized quilt cover set.",
        },
        {
          category: "Other Belongings",
          product: "Standard Pillow",
          quantity: "2",
          totalEstimation: "$60",
          productLink: "https://www.pillowtalk.com.au/products/essentials-standard-pillow-twin-pack",
          details: "Standard-sized bed pillows. Valuation based on a twin-pack.",
        },
        {
          category: "Other Belongings",
          product: "Decorative Cushion (Dark Grey)",
          quantity: "1",
          totalEstimation: "$40.95",
          productLink: "https://mylinen.com.au/products/hallston-charcoal-square-filled-cushion",
          details: "A square, decorative cushion in a dark grey/charcoal colour.",
        },
        {
          category: "Other Belongings",
          product: "Decorative Cushion (Light Grey)",
          quantity: "1",
          totalEstimation: "$49",
          productLink: "https://www.revivedartisan.com.au/products/french-linen-geometric-grey-cushion-scroll-dove",
          details: "A square, decorative cushion in a light grey with a geometric pattern.",
        },
        {
          category: "Electronics",
          product: "Bedside Table Lamp",
          quantity: "2",
          totalEstimation: "$129.80",
          productLink: "https://www.myer.com.au/p/oriel-lighting-lenny-mesh-bedside-table-lamp-in-black",
          details: "A small, modern black table lamp with a mesh or wire style shade.",
        },
        {
          category: "Artwork and Valuables",
          product: "Framed Wall Art",
          quantity: "1",
          totalEstimation: "$69.99",
          productLink: "https://www.wallartprints.com.au/canvas-prints/abstract/forever-flourish/",
          details: "A large, framed abstract art print with a neutral and dark colour palette.",
        },
      ],
      contentsTotal: "$1,378.63",
    },
    "12": {
      id: "12",
      name: "Room 12: Balcony",
      type: "Balcony",
      area: "8.75 m²",
      height: "2.41 m",
      width: "3.50 m",
      depth: "2.50 m",
      volume: "21.09 m³",
      windows: "0",
      doors: "1",
      valuation: "$26,250.00",
      condition: "Good",
      description:
        "Covered outdoor balcony with tile flooring and outdoor furniture. Features panoramic views and natural lighting.",
      panoramaCount: "2",
      panoramaLinks: [],
      roomLocationImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ovqqovg6G4qwOTH66jAhMmEMZp4iH2.png",
      propertyImages: [],
      flooring: "Tile",
      wallMaterial: "Concrete",
      ceilingType: "Concrete",
      ceilingLights: "None",
      airConditioning: false,
      smokeAlarm: false,
      ceilingFan: false,
      smokeAlarmCount: 0,
      ceilingLightCount: 0,
      ceilingFanCount: 0,
      airConditioningCount: 0,
      windowCount: 0,
      windowCover: "None",
      floorDamage: "No",
      ceilingDamage: "No",
      wallDamage: "No",
      contents: [
        {
          category: "Furniture",
          product: "Outdoor Cafe Table",
          quantity: "1",
          totalEstimation: "$139",
          productLink: "https://www.replicafurniture.com.au/ozone-black-round-outdoor-dining-table-60-cm-diameter",
          details: "A small, round, black outdoor cafe/bistro table with a pedestal base.",
        },
        {
          category: "Furniture",
          product: "Outdoor Rope Dining Chair",
          quantity: "2",
          totalEstimation: "$478",
          productLink: "https://www.marcandmain.com.au/products/dillon-rope-dining-chair-in-black",
          details: "A black outdoor dining chair with a woven rope seat and back, on a black metal frame.",
        },
        {
          category: "Other Belongings",
          product: "Small Artificial Plant",
          quantity: "1",
          totalEstimation: "$12",
          productLink: "https://www.kmart.com.au/product/artificial-plant-in-cement-pot-42964393/",
          details: "A small artificial succulent in a simple, small pot, for decorative purposes.",
        },
      ],
      contentsTotal: "$629",
    },
    "13": {
      id: "13",
      name: "Room 13: Bedroom",
      type: "Bedroom",
      area: "14.25 m²",
      height: "2.41 m",
      width: "4.75 m",
      depth: "3.00 m",
      volume: "34.34 m³",
      windows: "2",
      doors: "1",
      valuation: "$42,112.50",
      condition: "Good",
      description:
        "Third bedroom with carpet flooring and built-in storage. Features natural light and modern fixtures.",
      panoramaCount: "4",
      panoramaLinks: [],
      roomLocationImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-D6ymHOPAPDVRRv8srvo10ZGcexl5Ll.png",
      propertyImages: [],
      flooring: "Carpet",
      wallMaterial: "Drywall",
      ceilingType: "Flat",
      ceilingLights: "Recessed",
      airConditioning: false,
      smokeAlarm: true,
      ceilingFan: false,
      smokeAlarmCount: 1,
      ceilingLightCount: 2,
      ceilingFanCount: 0,
      airConditioningCount: 0,
      windowCount: 2,
      windowCover: "Blinds",
      floorDamage: "No",
      ceilingDamage: "No",
      wallDamage: "No",
      contents: [
        {
          category: "Furniture",
          product: "Upholstered Bed Frame",
          quantity: "1",
          totalEstimation: "$399",
          productLink:
            "https://furnituretrader.com.au/all-furniture/bedroom/beds/queen/orchard-queen-bed-dark-grey.html",
          details: "A queen-sized bed frame with a dark grey/charcoal upholstered headboard.",
        },
        {
          category: "Furniture",
          product: "Queen Mattress",
          quantity: "1",
          totalEstimation: "$399",
          productLink: "https://www.ikea.com/au/en/p/valevag-pocket-sprung-mattress-firm-light-blue-40470014/",
          details: "A standard queen-sized mattress. Valuation based on a popular, basic pocket-sprung model.",
        },
        {
          category: "Furniture",
          product: "Bedside Table",
          quantity: "2",
          totalEstimation: "$127.90",
          productLink: "https://www.bunnings.com.au/artiss-oak-2-drawer-shelf-storage-bedside-table_p0225916",
          details: "A simple, white bedside table with a single drawer and an open lower shelf.",
        },
        {
          category: "Other Belongings",
          product: "Quilt Cover Set",
          quantity: "1",
          totalEstimation: "$149.99",
          productLink: "https://www.myer.com.au/p/linen-house-nara-400tc-bamboo-cotton-quilt-cover-set-in-white",
          details: "A plain, white, queen-sized quilt cover set.",
        },
        {
          category: "Other Belongings",
          product: "Standard Pillow",
          quantity: "2",
          totalEstimation: "$60",
          productLink: "https://www.pillowtalk.com.au/products/essentials-standard-pillow-twin-pack",
          details: "Standard-sized bed pillows. Valuation based on a twin-pack.",
        },
        {
          category: "Other Belongings",
          product: "Decorative Cushion (Dark Grey)",
          quantity: "1",
          totalEstimation: "$40.95",
          productLink: "https://mylinen.com.au/products/hallston-charcoal-square-filled-cushion",
          details: "A square, decorative cushion in a dark grey/charcoal colour.",
        },
        {
          category: "Other Belongings",
          product: "Decorative Cushion (Light Grey)",
          quantity: "1",
          totalEstimation: "$49",
          productLink: "https://www.revivedartisan.com.au/products/french-linen-geometric-grey-cushion-scroll-dove",
          details: "A square, decorative cushion in a light grey with a geometric pattern.",
        },
        {
          category: "Electronics",
          product: "Bedside Table Lamp",
          quantity: "2",
          totalEstimation: "$129.80",
          productLink: "https://www.myer.com.au/p/oriel-lighting-lenny-mesh-bedside-table-lamp-in-black",
          details: "A small, modern black table lamp with a mesh or wire style shade.",
        },
        {
          category: "Artwork and Valuables",
          product: "Framed Wall Art",
          quantity: "1",
          totalEstimation: "$74.95",
          productLink: "https://oliveetoriel.com/products/palmeras-by-julie-celina-framed-canvas-art-print",
          details: "A large, framed abstract art print with a neutral colour palette.",
        },
      ],
      contentsTotal: "$1,430.59",
    },
    "14": {
      id: "14",
      name: "Room 14: Laundry",
      type: "Laundry",
      area: "5.00 m²",
      height: "2.41 m",
      width: "2.50 m",
      depth: "2.00 m",
      volume: "12.05 m³",
      windows: "1",
      doors: "1",
      valuation: "$15,000.00",
      condition: "Good",
      description:
        "Dedicated laundry room with tile flooring and modern appliances. Features natural light and ample storage space.",
      panoramaCount: "1",
      panoramaLinks: [],
      roomLocationImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-D6ymHOPAPDVRRv8srvo10ZGcexl5Ll.png",
      propertyImages: [],
      flooring: "Tile",
      wallMaterial: "Drywall",
      ceilingType: "Flat",
      ceilingLights: "Recessed",
      airConditioning: false,
      smokeAlarm: false,
      ceilingFan: false,
      smokeAlarmCount: 0,
      ceilingLightCount: 1,
      ceilingFanCount: 0,
      airConditioningCount: 0,
      windowCount: 1,
      windowCover: "Blinds",
      floorDamage: "No",
      ceilingDamage: "No",
      wallDamage: "No",
      contents: [
        {
          category: "Appliances",
          product: "Washing Machine",
          quantity: "1",
          totalEstimation: "$799",
          productLink: "https://www.thegoodguys.com.au/lg-85kg-front-load-washing-machine-wv5148wg",
          details: "A modern front load washing machine.",
        },
        {
          category: "Appliances",
          product: "Clothes Dryer",
          quantity: "1",
          totalEstimation: "$699",
          productLink: "https://www.thegoodguys.com.au/lg-8kg-heat-pump-dryer-dv90bb",
          details: "A modern heat pump clothes dryer.",
        },
        {
          category: "Furniture",
          product: "Laundry Tub",
          quantity: "1",
          totalEstimation: "$249",
          productLink: "https://www.bunnings.com.au/flexispace-45l-white-laundry-tub-and-cabinet_p0097987",
          details: "A white laundry tub with a cabinet.",
        },
        {
          category: "Other Belongings",
          product: "Laundry Basket",
          quantity: "1",
          totalEstimation: "$25",
          productLink: "https://www.kmart.com.au/product/40l-bamboo-laundry-basket-43077591/",
          details: "A bamboo laundry basket.",
        },
        {
          category: "Other Belongings",
          product: "Ironing Board",
          quantity: "1",
          totalEstimation: "$39",
          productLink: "https://www.kmart.com.au/product/ironing-board-with-iron-rest-42878828/",
          details: "A standard ironing board.",
        },
      ],
      contentsTotal: "$1,811",
    },
  }

  const room = roomData[params.roomId]

  if (!room) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">Room Not Found</h1>
        <p className="text-gray-600 mt-2">
          Room {params.roomId} data is not available. Please check the room number and try again.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/?tab=room-insights">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Rooms</span>
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900">{room.name}</h1>
              <Badge variant={room.condition === "Complete" ? "default" : "secondary"}>{room.condition}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Room Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
                  <Ruler className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">{room.area}</div>
                <div className="text-sm text-gray-500">Floor Area</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4">
                  <Home className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">{room.volume}</div>
                <div className="text-sm text-gray-500">Volume</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
                  <Ruler className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600">{room.height}</div>
                <div className="text-sm text-gray-500">Height</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>360° Views</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{room.panoramaCount}</div>
                <div className="text-sm text-gray-500">360° Views</div>
              </CardContent>
            </Card>
          </div>

          {/* Room Location and Property Images */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Room Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Home className="h-5 w-5" />
                  <span>Room Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={room.roomLocationImage || "/placeholder.svg"}
                    alt="Room location in property"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Property Images */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Property Images</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {room.propertyImages.length > 0 ? (
                  <div
                    className={`grid gap-4 ${room.propertyImages.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}
                  >
                    {room.propertyImages.map((image, index) => (
                      <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Property view ${index + 1}`}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => setSelectedImage(image)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">No images currently available to display</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Room Details */}
          <Card>
            <CardHeader>
              <CardTitle>Room Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-2 gap-8">
                {/* Dimensions */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <Ruler className="h-5 w-5" />
                    <span>Dimensions</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Height:</span>
                      <span className="font-medium">{room.height}</span>
                    </div>
                    {room.depth !== "N/A" && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Depth:</span>
                        <span className="font-medium">{room.depth}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Width:</span>
                      <span className="font-medium">{room.width}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Floor Area:</span>
                      <span className="font-medium">{room.area}</span>
                    </div>
                  </div>
                </div>

                {/* Materials */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <Home className="h-5 w-5" />
                    <span>Materials</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Flooring:</span>
                      <span className="font-medium">{room.flooring}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Walls:</span>
                      <span className="font-medium">{room.wallMaterial}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ceiling:</span>
                      <span className="font-medium">{room.ceilingType}</span>
                    </div>
                  </div>
                </div>

                {/* Installed Features */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Installed Features</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Smoke Alarm:</span>
                      <div className="flex items-center space-x-2">
                        {room.smokeAlarmCount > 0 ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="font-medium">({room.smokeAlarmCount})</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Ceiling Lights:</span>
                      <div className="flex items-center space-x-2">
                        {room.ceilingLightCount > 0 ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="font-medium">({room.ceilingLightCount})</span>
                      </div>
                    </div>
                    {room.ceilingLights && room.ceilingLights !== "Standard" && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Light Type:</span>
                        <span className="font-medium">{room.ceilingLights}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Ceiling Fan:</span>
                      <div className="flex items-center space-x-2">
                        {room.ceilingFanCount > 0 ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="font-medium">({room.ceilingFanCount})</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Air Conditioning:</span>
                      <div className="flex items-center space-x-2">
                        {room.airConditioningCount > 0 ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="font-medium">({room.airConditioningCount})</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Windows:</span>
                      <div className="flex items-center space-x-2">
                        {room.windowCount > 0 ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="font-medium">({room.windowCount})</span>
                      </div>
                    </div>
                    {room.doors && room.doors !== "N/A" && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Doors:</span>
                        <span className="font-medium">{room.doors}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Room Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Room Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{room.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Condition:</span>
                      <span className="font-medium">{room.condition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valuation:</span>
                      <span className="font-medium text-green-600">{room.valuation}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Room Description */}
              {room.description && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{room.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contents Report */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span>Contents Report</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {typeof room.contents === "string" ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">{room.contents}</p>
                </div>
              ) : room.contents.length > 0 ? (
                <div className="space-y-4">
                  {room.id === "5" ? (
                    <>
                      {/* Show first 10 products */}
                      {room.contents.slice(0, 10).map((content, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div>
                              <span className="text-sm font-medium text-gray-600">Category:</span>
                              <p className="text-gray-900">{content.category}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-600">Product/Fixture:</span>
                              <p className="text-gray-900">{content.product}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-600">Quantity:</span>
                              <p className="text-gray-900">{content.quantity}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-600">Total Estimation:</span>
                              <p className="text-green-600 font-semibold">{content.totalEstimation}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <span className="text-sm font-medium text-gray-600">Details:</span>
                              <p className="text-gray-700">{content.details}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-600">Product Link:</span>
                              <a
                                href={content.productLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline"
                              >
                                View Product
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Dropdown for remaining products */}
                      {room.contents.length > 10 && (
                        <details className="group">
                          <summary className="cursor-pointer bg-blue-100 hover:bg-blue-200 rounded-lg p-4 flex items-center justify-between">
                            <span className="font-medium text-blue-900">
                              Show {room.contents.length - 10} more items
                            </span>
                            <svg
                              className="w-5 h-5 text-blue-600 group-open:rotate-180 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </summary>
                          <div className="mt-4 space-y-4">
                            {room.contents.slice(10).map((content, index) => (
                              <div key={index + 10} className="bg-gray-50 rounded-lg p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                  <div>
                                    <span className="text-sm font-medium text-gray-600">Category:</span>
                                    <p className="text-gray-900">{content.category}</p>
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium text-gray-600">Product/Fixture:</span>
                                    <p className="text-gray-900">{content.product}</p>
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium text-gray-600">Quantity:</span>
                                    <p className="text-gray-900">{content.quantity}</p>
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium text-gray-600">Total Estimation:</span>
                                    <p className="text-green-600 font-semibold">{content.totalEstimation}</p>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div>
                                    <span className="text-sm font-medium text-gray-600">Details:</span>
                                    <p className="text-gray-700">{content.details}</p>
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium text-gray-600">Product Link:</span>
                                    <a
                                      href={content.productLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-800 underline"
                                    >
                                      View Product
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </details>
                      )}
                    </>
                  ) : (
                    /* Regular display for other rooms */
                    room.contents.map((content, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div>
                            <span className="text-sm font-medium text-gray-600">Category:</span>
                            <p className="text-gray-900">{content.category}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600">Product/Fixture:</span>
                            <p className="text-gray-900">{content.product}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600">Quantity:</span>
                            <p className="text-gray-900">{content.quantity}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600">Total Estimation:</span>
                            <p className="text-green-600 font-semibold">{content.totalEstimation}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm font-medium text-gray-600">Details:</span>
                            <p className="text-gray-700">{content.details}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600">Product Link:</span>
                            <a
                              href={content.productLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline"
                            >
                              View Product
                            </a>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  {room.id === "2" && (
                    <div className="bg-blue-50 rounded-lg p-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Room Total:</span>
                        <span className="text-xl font-bold text-green-600">$953</span>
                      </div>
                    </div>
                  )}
                  {room.id === "3" && (
                    <div className="bg-blue-50 rounded-lg p-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Room Total:</span>
                        <span className="text-xl font-bold text-green-600">$64.94</span>
                      </div>
                    </div>
                  )}
                  {room.id === "4" && (
                    <div className="bg-blue-50 rounded-lg p-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Room Total:</span>
                        <span className="text-xl font-bold text-green-600">$1,269.60</span>
                      </div>
                    </div>
                  )}
                  {room.id === "5" && (
                    <div className="bg-blue-50 rounded-lg p-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Room Total:</span>
                        <span className="text-xl font-bold text-green-600">$5,072.90</span>
                      </div>
                    </div>
                  )}
                  {room.id === "7" && (
                    <div className="bg-blue-50 rounded-lg p-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Room Total:</span>
                        <span className="text-xl font-bold text-green-600">$4,274.85</span>
                      </div>
                    </div>
                  )}
                  {room.id === "8" && (
                    <div className="bg-blue-50 rounded-lg p-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Room Total:</span>
                        <span className="text-xl font-bold text-green-600">$154.75</span>
                      </div>
                    </div>
                  )}
                  {room.id === "9" && room.contents !== "No contents detected" && (
                    <div className="bg-blue-50 rounded-lg p-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Room Total:</span>
                        <span className="text-xl font-bold text-green-600">$0.00</span>
                      </div>
                    </div>
                  )}
                  {room.id === "10" && (
                    <div className="bg-blue-50 rounded-lg p-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Room Total:</span>
                        <span className="text-xl font-bold text-green-600">{room.contentsTotal}</span>
                      </div>
                    </div>
                  )}
                  {room.id === "11" && (
                    <div className="bg-blue-50 rounded-lg p-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Room Total:</span>
                        <span className="text-xl font-bold text-green-600">$1,378.63</span>
                      </div>
                    </div>
                  )}
                  {room.id === "12" && (
                    <div className="bg-blue-50 rounded-lg p-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Room Total:</span>
                        <span className="text-xl font-bold text-green-600">$629</span>
                      </div>
                    </div>
                  )}
                  {room.id === "13" && (
                    <div className="bg-blue-50 rounded-lg p-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Room Total:</span>
                        <span className="text-xl font-bold text-green-600">$1,430.59</span>
                      </div>
                    </div>
                  )}
                  {room.id === "14" && (
                    <div className="bg-blue-50 rounded-lg p-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Room Total:</span>
                        <span className="text-xl font-bold text-green-600">$1,811</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Contents report not available for this room.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Panoramic Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Panoramic Images</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {room.panoramaLinks.map((link, index) => (
                  <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={link || "/placeholder.svg"}
                      alt={`360° view ${index + 1}`}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage(link)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={selectedImage || "/placeholder.svg"}
              alt="Full size view"
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain"
            />
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4"
              onClick={() => setSelectedImage(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
