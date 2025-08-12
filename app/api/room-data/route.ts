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

    // Room 1 data
    const room1Data = {
      roomId: "19ab05tns5h6y4qm42esqqpea",
      panoramaIds: ["9atk8hw6bpr2kixswfbit6kya", "71mwb6u62ih98rhx2bwyc8b8b"],
      panoramaLinks: [
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_19ab05tns5h6y4qm42esqqpea_9atk8hw6bpr2kixswfbit6kya_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_19ab05tns5h6y4qm42esqqpea_71mwb6u62ih98rhx2bwyc8b8b_skybox.jpg",
      ],
      roomType: "hallway",
      totalArea: 2.472899914,
      volume: 5.984417439,
      depth: 2.225636959,
      height: 2.419999838,
      width: 0.8840761185,
      smokeAlarmCount: 1,
      flooringType: "carpet",
      floorDamage: "No",
      roomValuation: "$7171.29355830938",
      ceilingType: "flat",
      ceilingLightCount: 2,
      ceilingFanCount: 0,
      ceilingDamage: "No",
      windowCount: 0,
      windowCover: "Other",
      wallMaterial: "drywall",
      wallDamage: "No",
      airConditioningCount: 0,
    }

    const room2Data = {
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
      roomType: "patio",
      totalArea: 5.005099773,
      volume: 13.61387157,
      depth: 2.174583435,
      height: 2.720000029,
      width: 1.580744743,
      doorCount: 1,
      smokeAlarmCount: 0,
      flooringType: "tile",
      floorDamage: "No",
      roomValuation: "$14046.71241",
      ceilingType: "metal",
      ceilingLightCount: 2,
      ceilingLightType: "Recessed",
      ceilingFanCount: 0,
      ceilingDamage: "No",
      windowCount: 2,
      windowCover: "None",
      wallMaterial: "concrete",
      wallDamage: "No",
      airConditioningCount: 0,
    }

    const room3Data = {
      roomId: "3m54yff1z7crxaywd8if9rb0d",
      panoramaIds: [
        "mu9uxdez3ha971p08w8nqkn3a",
        "m4rcxhtirqgqh9enyg9zy5pyd",
        "xx97uf4cdb80cba9uy8u539rd",
        "983x6xg3ixwh2n54sdw8k76ad",
      ],
      panoramaLinks: [
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_3m54yff1z7crxaywd8if9rb0d_mu9uxdez3ha971p08w8nqkn3a_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_3m54yff1z7crxaywd8if9rb0d_m4rcxhtirqgqh9enyg9zy5pyd_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_3m54yff1z7crxaywd8if9rb0d_xx97uf4cdb80cba9uy8u539rd_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_3m54yff1z7crxaywd8if9rb0d_983x6xg3ixwh2n54sdw8k76ad_skybox.jpg",
      ],
      roomType: "bathroom",
      totalArea: 4.252399921,
      volume: 9.185183525,
      depth: 2.041959047,
      height: 2.159999847,
      width: 1.872373343,
      smokeAlarmCount: 0,
      doorCount: 1,
      flooringType: "tile",
      roomValuation: "$13025.6268",
      floorDamage: "yes",
      ceilingType: "flat",
      ceilingLightCount: 1,
      ceilingLightType: "Recessed",
      ceilingFanCount: 0,
      ceilingDamage: "No",
      windowCount: 1,
      windowCover: "Other",
      wallMaterial: "plaster",
      wallDamage: "no",
      airConditioningCount: 0,
      roomDescription:
        "This bathroom features a corner glass-enclosed shower, a white toilet, and a compact vanity with a curved countertop, integrated basin, and under-bench storage. Twin frosted windows provide natural light while maintaining privacy, complemented by a wall-mounted mirrored cabinet. The space is tiled throughout, with mild wear and tear visible on the floor tiles, consistent with regular use.",
    }

    const room4Data = {
      roomId: "613htqkzf66zz7hf7n8kzszed",
      panoramaIds: [
        "3ax98exw84easbammy1kdy59a",
        "q30i0t1qaqnm9w9ahabpw94qd",
        "bcmacw08fqdi7acr9x6shfi4b",
        "n62yt7zbfe8gbthibrauparaa",
        "yq3ye9yehkru7142z65q2acwa",
        "37fty8w3n4tw0nkac909ri7pc",
        "1hsznrxt775cdf5e5fr400crc",
      ],
      panoramaLinks: [
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_3ax98exw84easbammy1kdy59a_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_q30i0t1qaqnm9w9ahabpw94qd_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_bcmacw08fqdi7acr9x6shfi4b_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_n62yt7zbfe8gbthibrauparaa_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_yq3ye9yehkru7142z65q2acwa_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_37fty8w3n4tw0nkac909ri7pc_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_1hsznrxt775cdf5e5fr400crc_skybox.jpg",
      ],
      roomType: "bedroom",
      totalArea: 19.12010002,
      volume: 38.78316498,
      depth: 2.889754772,
      height: 2.409999847,
      width: 5.845042706,
      smokeAlarmCount: 1,
      doorCount: 5,
      flooringType: "carpet",
      roomValuation: "$56428.31752",
      floorDamage: "No",
      ceilingType: "flat",
      ceilingLightCount: 2,
      ceilingLightType: "Recessed",
      ceilingFanCount: 0,
      ceilingDamage: "No",
      windowCount: 1,
      windowCover: "Other",
      wallMaterial: "drywall",
      wallDamage: "No",
      airConditioningCount: 1,
      roomDescription:
        "This master bedroom is bright and inviting, featuring a large bed with a deep blue upholstered headboard, flanked by matching white bedside tables and lamps. Neutral carpet flooring adds warmth underfoot, complemented by crisp white walls and contemporary décor. A sliding glass door opens to a private balcony overlooking lush greenery, while a large window on the adjacent wall brings in additional natural light. The space includes built-in wardrobes with sliding doors, airconditioning, and a decorative timber-framed artwork above a wooden console table, enhancing the room's modern yet comfortable feel.",
    }

    let roomData = null
    if (roomId === "1") {
      roomData = room1Data
    } else if (roomId === "2") {
      roomData = room2Data
    } else if (roomId === "3") {
      roomData = room3Data
    } else if (roomId === "4") {
      roomData = room4Data
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
