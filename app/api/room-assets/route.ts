import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Save room assets data to Vercel Blob
    const blob = await put(`room-${data.roomId}-assets.json`, JSON.stringify(data), {
      access: "public",
    })

    return NextResponse.json({
      success: true,
      url: blob.url,
      message: "Room assets saved successfully",
    })
  } catch (error) {
    console.error("Error saving room assets:", error)
    return NextResponse.json({ success: false, error: "Failed to save room assets" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const roomId = searchParams.get("roomId")

  if (!roomId) {
    return NextResponse.json({ success: false, error: "Room ID is required" }, { status: 400 })
  }

  try {
    // In a real implementation, you would fetch from Vercel Blob
    // For now, return the current room data
    return NextResponse.json({
      success: true,
      data: {
        roomId,
        panoramas: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_19ab05tns5h6y4qm42esqqpea_9atk8hw6bpr2kixswfbit6kya_skybox%20%281%29.jpg-VQ1rRU14Q114Ge0td1DRgV5HrkSZ8n.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_19ab05tns5h6y4qm42esqqpea_71mwb6u62ih98rhx2bwyc8b8b_skybox%20%281%29.jpg-hpnL3NcCfYc8k7hkQLGiG1dC6fqmPd.jpeg",
        ],
        contents: [
          {
            name: "Atom Recessed LED Downlight",
            quantity: 2,
            rrp: "$25",
            total: "$50",
          },
        ],
      },
    })
  } catch (error) {
    console.error("Error fetching room assets:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch room assets" }, { status: 500 })
  }
}
