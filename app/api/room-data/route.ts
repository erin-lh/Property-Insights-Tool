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

    let roomData = null
    if (roomId === "1") {
      roomData = room1Data
    } else if (roomId === "2") {
      roomData = room2Data
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
