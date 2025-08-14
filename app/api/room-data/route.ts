import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: NextRequest) {
  try {
    const { roomId, roomData } = await request.json()

    if (!roomId || !roomData) {
      return NextResponse.json({ error: "Room ID and room data are required" }, { status: 400 })
    }

    // Save room data to Vercel Blob storage
    const blob = await put(`room-data/room-${roomId}.json`, JSON.stringify(roomData, null, 2), {
      access: "public",
      contentType: "application/json",
    })

    return NextResponse.json({
      success: true,
      message: "Room data saved successfully",
      url: blob.url,
      roomId,
    })
  } catch (error) {
    console.error("Error saving room data:", error)
    return NextResponse.json({ error: "Failed to save room data" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const roomId = searchParams.get("roomId")

    if (!roomId) {
      return NextResponse.json({ error: "Room ID is required" }, { status: 400 })
    }

    const allRoomsData = {
      "1": {
        roomId: "19ab05tns5h6y4qm42esqqpea",
        name: "Room 1: Hallway",
        type: "hallway",
        area: "2.47 m²",
        volume: "5.98 m³",
        height: "2.42 m",
        valuation: "$7,171.29",
        panoramaCount: 2,
        condition: "Complete",
        roomLocationImage:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=300&width=400&query=3D+dollhouse+view+room+1+hallway+location",
        propertyImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=300&width=400&query=hallway+carpet+flooring+ceiling+lights",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=300&width=400&query=hallway+entrance+drywall+walls",
        ],
        panoramaImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%201-%20Pano%201.jpg-WLLUUFwjKVMeOIgjQrogLGoAOrqQQk.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%201-%20Pano%202.jpg.jpg-Kdk5JO9RxikhkYCPJK3f6ejijcb8J1.jpeg",
        ],
        flooringType: "carpet",
        wallMaterial: "drywall",
        ceilingType: "flat",
        floorDamage: "No",
        wallDamage: "No",
        ceilingDamage: "No",
        smokeAlarmCount: 1,
        ceilingLightCount: 2,
        ceilingFanCount: 0,
        windowCount: 0,
        airConditioningCount: 0,
        description:
          "Entry hallway with carpet flooring and drywall walls. Features ceiling lights and connects to main living areas.",
      },
      "2": {
        roomId: "2qdmc5i9byxi79ry1pxdkqzea",
        name: "Room 2: Patio",
        type: "patio",
        area: "5.01 m²",
        volume: "13.61 m³",
        height: "2.72 m",
        valuation: "$14,046.71",
        panoramaCount: 4,
        condition: "Complete",
        roomLocationImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9V8ko.png",
        propertyImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%202-%20property%20image.jpg-67yN9sVAqOf1D8NSUlGF6b1rrw3pVh.jpeg",
        ],
        panoramaImages: [
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_zibi0h0ges2t5dxryrb7800wd_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_cct379k0f1t6gnmuutm23i4ac_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_mw5ymdiqgmkaiasgdiksy3i5a_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_pxk5thts3iiwc5azq4drsitfc_skybox.jpg",
        ],
        flooringType: "tile",
        wallMaterial: "concrete",
        ceilingType: "metal",
        floorDamage: "No",
        wallDamage: "No",
        ceilingDamage: "No",
        smokeAlarmCount: 0,
        ceilingLightCount: 2,
        ceilingFanCount: 0,
        windowCount: 2,
        airConditioningCount: 0,
        description:
          "Covered outdoor patio area with curved corrugated metal roof, tile flooring, modern outdoor furniture, and panoramic garden views.",
      },
      "3": {
        roomId: "3m54yff1z7crxaywd8if9rb0d",
        name: "Room 3: Bathroom",
        type: "bathroom",
        area: "4.25 m²",
        volume: "9.19 m³",
        height: "2.16 m",
        valuation: "$13,025.63",
        panoramaCount: 4,
        condition: "Complete",
        roomLocationImage:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-D6ymHOPAPDVRRv8srvo10ZGcexl5Ll.png",
        propertyImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%203-%20property%20image.jpg-fYzbBkGbez0UyyC09ne1gwZKPxcoJg.jpeg",
        ],
        panoramaImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%203-%20Pano%201.jpg-3YKPoqnRE6gz5JPtXmMXV3SUpC0l2K.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%203-%20Pano%202.jpg-wBKE8q3lUJxs8ueTthmSy0Pc6seE8n.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%203-%20pano%203.jpg-T1F6bCIPBCWpstb1b2Fbz0bdHP4zOr.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Room%203-%20Pano%204.jpg-vdflvnGza1d3RKBDkHjuP4cN2gvlh9.jpeg",
        ],
        flooringType: "tile",
        wallMaterial: "plaster",
        ceilingType: "flat",
        floorDamage: "Yes",
        wallDamage: "No",
        ceilingDamage: "No",
        smokeAlarmCount: 0,
        ceilingLightCount: 1,
        ceilingFanCount: 0,
        windowCount: 1,
        airConditioningCount: 0,
        description:
          "Compact bathroom with tile flooring and plaster walls. Features corner glass-enclosed shower and compact vanity.",
      },
      "4": {
        roomId: "613htqkzf66zz7hf7n8kzszed",
        name: "Room 4: Master Bedroom",
        type: "bedroom",
        area: "19.12 m²",
        volume: "38.78 m³",
        height: "2.41 m",
        valuation: "$56,428.32",
        panoramaCount: 7,
        condition: "Complete",
        roomLocationImage:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=300&width=400&query=3D+dollhouse+view+room+4+master+bedroom+location",
        propertyImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=300&width=400&query=master+bedroom+carpet+flooring+blue+headboard",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=300&width=400&query=master+bedroom+sliding+glass+door+balcony+access",
        ],
        panoramaImages: [
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_3ax98exw84easbammy1kdy59a_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_q30i0t1qaqnm9w9ahabpw94qd_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_bcmacw08fqdi7acr9x6shfi4b_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_n62yt7zbfe8gbthibrauparaa_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_yq3ye9yehkru7142z65q2acwa_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_37fty8w3n4tw0nkac909ri7pc_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_1hsznrxt775cdf5e5fr400crc_skybox.jpg",
        ],
        flooringType: "carpet",
        wallMaterial: "drywall",
        ceilingType: "flat",
        floorDamage: "No",
        wallDamage: "No",
        ceilingDamage: "No",
        smokeAlarmCount: 1,
        ceilingLightCount: 2,
        ceilingFanCount: 0,
        windowCount: 1,
        airConditioningCount: 1,
        description:
          "Master bedroom with deep blue upholstered headboard, sliding glass door to balcony, and built-in wardrobes.",
      },
      "5": {
        roomId: "b4qtykzcazp4iumkamm7y7h2b",
        name: "Room 5: Living Room",
        type: "living room",
        area: "39.83 m²",
        volume: "N/A",
        height: "N/A",
        valuation: "$124,609.35",
        panoramaCount: 15,
        condition: "Complete",
        roomLocationImage:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aAllMH3yzbgAMxVaRs2oe5VDo1Roam.png",
        propertyImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-Bellavista-Tce-08012025_215315.jpg-euDXbwyOuBjjTy5twRoFkpQJZFzNDb.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-Bellavista-Tce-08012025_215410.jpg-RnlV8k1EiNwBlcNDrFIp8PuNQQgRPg.jpeg",
        ],
        panoramaImages: [
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
        flooringType: "hardwood",
        wallMaterial: "gypsum",
        ceilingType: "gypsum",
        floorDamage: "No",
        wallDamage: "No",
        ceilingDamage: "No",
        smokeAlarmCount: 1,
        ceilingLightCount: 1,
        ceilingFanCount: 1,
        windowCount: 6,
        airConditioningCount: 1,
        description:
          "Open-plan living area combining lounge, dining, and kitchen spaces with polished timber floors and high ceilings.",
      },
      "6": {
        roomId: "cdz3fkt38kae7tapstpt0eaeb",
        name: "Room 6: Hallway",
        type: "hallway",
        area: "6.41 m²",
        volume: "15.45 m³",
        height: "2.41 m",
        valuation: "$18,591.02",
        panoramaCount: 5,
        condition: "Complete",
        roomLocationImage:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7Ox7Nu4RJOTOfUdLVbEyfeU70BkQHl.png",
        propertyImages: [],
        panoramaImages: [
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_cdz3fkt38kae7tapstpt0eaeb_mnz5qufzx838bh2ifngu1t43d_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_cdz3fkt38kae7tapstpt0eaeb_mndhi0uf7rsb24icpat8x03pd_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_cdz3fkt38kae7tapstpt0eaeb_u5nmsfeun7ye1cxfr7q9kcfzc_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_cdz3fkt38kae7tapstpt0eaeb_nzzaazqnf0qxcfz412mcbfuhb_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_cdz3fkt38kae7tapstpt0eaeb_0hfne4usqcy0ew5dxycbhh9fc_skybox.jpg",
        ],
        flooringType: "carpet",
        wallMaterial: "drywall",
        ceilingType: "flat",
        floorDamage: "No",
        wallDamage: "No",
        ceilingDamage: "No",
        smokeAlarmCount: 1,
        ceilingLightCount: 1,
        ceilingFanCount: 0,
        windowCount: 0,
        airConditioningCount: 0,
        description:
          "Hallway with staircase connecting upper and lower levels via timber railings and cable balustrades.",
      },
      "7": {
        roomId: "ediidma5zg15dufx3n0qyq21a",
        name: "Room 7: Kitchen/Dining",
        type: "Dining Room/Kitchen",
        area: "18.91 m²",
        volume: "N/A",
        height: "3.30 m",
        valuation: "$57,335.78",
        panoramaCount: 8,
        condition: "Complete",
        roomLocationImage:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-D6ymHOPAPDVRRv8srvo10ZGcexl5Ll.png",
        propertyImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-Bellavista-Tce-08012025_215738.jpg-NDOSKYpOP9WoJz4GstaBdtCGz5ZcAB.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/08012025_221050.jpg-Eakha1hrOXZwwUmi3eXE83q2Z5ANjG.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-Bellavista-Tce-08012025_215446.jpg-WHxk0rx2NEh415vnFNkbUDuHBdMIMP.jpeg",
        ],
        panoramaImages: [
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_ediidma5zg15dufx3n0qyq21a_giepn8c8hn3s2zfp2t4sheh1b_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_ediidma5zg15dufx3n0qyq21a_7a02a7k2dmbaq0szbqpci6a8c_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_ediidma5zg15dufx3n0qyq21a_5uwdq5n5n42c0sg009u035ged_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_ediidma5zg15dufx3n0qyq21a_iwr0u8kdin6z0bde33ngqucec_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_ediidma5zg15dufx3n0qyq21a_mz4h00qx18y13hsi0fti8a3gb_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_ediidma5zg15dufx3n0qyq21a_pgpbabyyi5nne2168asks2kud_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_ediidma5zg15dufx3n0qyq21a_r8i08rum266tkqq5kuqgcm9mb_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_ediidma5zg15dufx3n0qyq21a_m1m8dxa3uufnzrmxgen3i84ab_skybox.jpg",
        ],
        flooringType: "hardwood and tile",
        wallMaterial: "drywall",
        ceilingType: "flat",
        floorDamage: "No",
        wallDamage: "No",
        ceilingDamage: "No",
        smokeAlarmCount: 1,
        ceilingLightCount: 1,
        ceilingFanCount: 1,
        windowCount: 6,
        airConditioningCount: 1,
        description:
          "Open-plan kitchen and dining area with U-shaped kitchen layout, induction cooktop, and laminate benchtops.",
      },
      "8": {
        roomId: "h26t7ky77ew74yb0pg8qqf5rd",
        name: "Room 8: Bathroom + Euro Laundry",
        type: "Bathroom + Euro Laundry",
        area: "6.89 m²",
        volume: "16.26 m³",
        height: "2.36 m",
        valuation: "$21,108.60",
        panoramaCount: 4,
        condition: "Complete",
        roomLocationImage:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ovqqovg6G4qwOTH66jAhMmEMZp4iH2.png",
        propertyImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8MnQOobGwBAsAYlubSY1PeGbzVAqiD.png",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4694-OB0ze190MICuCDChoaoMNhGGAFGtIz.jpeg",
        ],
        panoramaImages: [
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_h26t7ky77ew74yb0pg8qqf5rd_myhwqxziu77419ti4sgkrba4b_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_h26t7ky77ew74yb0pg8qqf5rd_uzh5ar9q3b9muaafm5nuqnk4c_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_h26t7ky77ew74yb0pg8qqf5rd_b8r10ewiy8yrasbrq6kr82afb_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_h26t7ky77ew74yb0pg8qqf5rd_d83wu89trcyu4f4z3f4crcfxc_skybox.jpg",
        ],
        flooringType: "tile",
        wallMaterial: "drywall",
        ceilingType: "drywall",
        floorDamage: "Yes (Wear and Tear)",
        wallDamage: "No",
        ceilingDamage: "No",
        smokeAlarmCount: 0,
        ceilingLightCount: 1,
        ceilingFanCount: 0,
        windowCount: 2,
        airConditioningCount: 0,
        description:
          "Spacious bathroom with double vanity and compact Euro laundry with stainless steel sink and wall taps.",
      },
      "9": {
        roomId: "m8npxsuk79xy21dd09x9wtped",
        name: "Room 9: Hallway",
        type: "hallway",
        area: "2.39 m²",
        volume: "5.77 m³",
        height: "2.41 m",
        valuation: "$6,938.72",
        panoramaCount: 2,
        condition: "Complete",
        roomLocationImage:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7QJ3KYpzVFb1ZmWTWAEMRZy5ODalIa.png",
        propertyImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_m8npxsuk79xy21dd09x9wtped_77bug6dex2fzdp3my4up5x3dd_skybox.jpg-g3Wto7raScQe6uumg1NvFoApCptGHq.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_m8npxsuk79xy21dd09x9wtped_a7h77eu1i3kdnwz5ypd0dhbbc_skybox.jpg-5gtUvIwpQdIOc6Gz5Vechm2uk6EkdI.jpeg",
        ],
        panoramaImages: [
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_m8npxsuk79xy21dd09x9wtped_a7h77eu1i3kdnwz5ypd0dhbbc_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_m8npxsuk79xy21dd09x9wtped_77bug6dex2fzdp3my4up5x3dd_skybox.jpg",
        ],
        flooringType: "carpet",
        wallMaterial: "painted drywall",
        ceilingType: "flat",
        floorDamage: "No",
        wallDamage: "No",
        ceilingDamage: "No",
        smokeAlarmCount: 0,
        ceilingLightCount: 1,
        ceilingFanCount: 0,
        windowCount: 0,
        airConditioningCount: 0,
        description: "Short connecting hallway between bathroom and bedroom with curved white walls and modern flow.",
      },
      "10": {
        roomId: "n81qfe51azs8iexnbqwspye6c",
        name: "Room 10: Bathroom",
        type: "bathroom",
        area: "2.18 m²",
        volume: "N/A",
        height: "2.41 m",
        valuation: "$6,679.75",
        panoramaCount: 3,
        condition: "Complete",
        roomLocationImage:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OvrUOeTBdatNOU1fXFzGljEpu4al2A.png",
        propertyImages: [],
        panoramaImages: [
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_n81qfe51azs8iexnbqwspye6c_ucirpuknnqi17cg1dc294dhyc_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_n81qfe51azs8iexnbqwspye6c_9entd33y20xbr4u7f2yauqzfd_skybox.jpg",
          "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_n81qfe51azs8iexnbqwspye6c_nh1tid1ai2rew77sd5rhsxhpc_skybox.jpg",
        ],
        flooringType: "tile",
        wallMaterial: "plaster",
        ceilingType: "flat",
        floorDamage: "Yes",
        wallDamage: "No",
        ceilingDamage: "No",
        smokeAlarmCount: 0,
        ceilingLightCount: 1,
        ceilingFanCount: 0,
        windowCount: 3,
        airConditioningCount: 0,
        description: "Compact bathroom with tile flooring and plaster walls.",
      },
    }

    const roomData = allRoomsData[roomId]

    if (!roomData) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      roomData,
    })
  } catch (error) {
    console.error("Error fetching room data:", error)
    return NextResponse.json({ error: "Failed to fetch room data" }, { status: 500 })
  }
}
