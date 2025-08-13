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

    const room5Data = {
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
      roomType: "living room",
      totalArea: 39.82770157,
      width: 4.859875202,
      doorCount: 3,
      smokeAlarmCount: 1,
      flooringType: "hardwood",
      floorDamage: "No",
      roomValuation: "$124609.3453",
      ceilingType: "gypsum",
      ceilingLightCount: 1,
      ceilingFanCount: 1,
      ceilingDamage: "No",
      windowCount: 6,
      windowCover: "Other",
      wallMaterial: "gypsum",
      wallDamage: "No",
      airConditioningCount: 1,
      roomDescription:
        "This open-plan living area combines lounge, dining, and kitchen spaces in a bright, airy setting. Polished timber floors and high ceilings with feature windows create a warm, inviting atmosphere, while a skylight adds extra natural light. The lounge area is styled with a modern grey sofa, round white coffee table, and neutral rug, positioned near the dining space with a timber table and black chairs. The kitchen features warm wood cabinetry, a contrasting island with dark benchtop, and stainless steel appliances. Decorative accents, including framed artwork, a woven-front console, and a navy armchair, enhance the contemporary coastal feel. The area connects seamlessly to the staircase and entry hall via open balustrading.",
    }

    const room6Data = {
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
      roomType: "hallway",
      totalArea: 6.41079998,
      volume: 15.45002651,
      depth: 0.877237916,
      height: 2.409999847,
      width: 6.522235394,
      smokeAlarmCount: 1,
      flooringType: "carpet",
      floorDamage: "No",
      roomValuation: "$18591.01872",
      ceilingType: "flat",
      ceilingLightCount: 1,
      ceilingLightType: "Recessed",
      ceilingFanCount: 0,
      ceilingDamage: "No",
      windowCount: 0,
      windowCover: "Other",
      wallMaterial: "drywall",
      wallDamage: "No",
      airConditioningCount: 0,
      roomDescription:
        "This hallway features soft carpet underfoot and clean white walls, with a staircase connecting the upper and lower levels via timber railings and cable balustrades. Multiple doorways lead to bedrooms and other living spaces, while downlights keep the area bright. The layout provides clear sightlines from one end of the hall to the other, giving a sense of openness despite its functional, transitional purpose.",
    }

    const room7Data = {
      roomId: "ediidma5zg15dufx3n0qyq21a",
      panoramaIds: [
        "giepn8c8hn3s2zfp2t4sheh1b",
        "7a02a7k2dmbaq0szbqpci6a8c",
        "5uwdq5n5n42c0sg009u035ged",
        "iwr0u8kdin6z0bde33ngqucec",
        "mz4h00qx18y13hsi0fti8a3gb",
        "pgpbabyyi5nne2168asks2kud",
        "r8i08rum266tkqq5kuqgcm9mb",
        "m1m8dxa3uufnzrmxgen3i84ab",
      ],
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
      roomType: "Dining Room/Kitchen",
      totalArea: 18.90690041,
      height: 3.3,
      width: 4.86062479,
      smokeAlarmCount: 1,
      flooringType: "hardwood and tile",
      floorDamage: "No",
      roomValuation: "$57335.78023",
      ceilingType: "flat",
      ceilingLightCount: 1,
      ceilingLightType: "Recessed",
      ceilingFanCount: 1,
      ceilingDamage: "No",
      windowCount: 6,
      windowCover: "Other",
      wallMaterial: "drywall",
      wallDamage: "No",
      airConditioningCount: 1,
      cooktopType: "Induction",
      benchMaterial: "Laminate",
      kitchenLayout: "U-shaped",
      roomDescription:
        "This open-plan living and dining area is light-filled and spacious, featuring polished timber floors and high ceilings with a skylight for added natural illumination. The dining zone is anchored by a large timber table paired with sleek black chairs, while the adjacent lounge offers a comfortable setting with a sofa and contemporary décor. Full-height sliding glass doors open to a covered balcony, seamlessly blending indoor and outdoor living. The kitchen, finished in warm wood cabinetry with dark benchtops, includes stainless steel appliances, a central island, and ample counter space, creating a practical yet welcoming hub for cooking and entertaining.",
    }

    const room8Data = {
      roomId: "h26t7ky77ew74yb0pg8qqf5rd",
      panoramaIds: [
        "myhwqxziu77419ti4sgkrba4b",
        "uzh5ar9q3b9muaafm5nuqnk4c",
        "b8r10ewiy8yrasbrq6kr82afb",
        "d83wu89trcyu4f4z3f4crcfxc",
      ],
      panoramaLinks: [
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_h26t7ky77ew74yb0pg8qqf5rd_myhwqxziu77419ti4sgkrba4b_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_h26t7ky77ew74yb0pg8qqf5rd_uzh5ar9q3b9muaafm5nuqnk4c_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_h26t7ky77ew74yb0pg8qqf5rd_b8r10ewiy8yrasbrq6kr82afb_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_h26t7ky77ew74yb0pg8qqf5rd_d83wu89trcyu4f4z3f4crcfxc_skybox.jpg",
      ],
      roomType: "Bathroom + Euro Laundry",
      totalArea: 6.891200066,
      volume: 16.26323128,
      depth: 3.88062501,
      height: 2.359999895,
      width: 1.513145804,
      smokeAlarmCount: 0,
      flooringType: "tile",
      floorDamage: "Yes (minor wear)",
      roomValuation: "$21108.59795",
      ceilingType: "drywall",
      ceilingLightCount: 1,
      ceilingLightType: "Recessed",
      ceilingFanCount: 0,
      ceilingDamage: "No",
      windowCount: 2,
      windowCover: "Other",
      wallMaterial: "drywall",
      wallDamage: "No",
      airConditioningCount: 0,
      roomDescription:
        "This spacious bathroom features a large mirrored wall above a double vanity with vessel sinks, dark benchtops, and a mix of timber and lime-green cabinetry for a pop of colour. A glass-enclosed shower sits beside the toilet, with frosted windows allowing natural light while maintaining privacy. The floor is fully tiled in a neutral tone, showing mild signs of wear consistent with use. Built-in storage cupboards and a towel rail add practicality, making the space both functional and bright. This property includes a compact Euro laundry discreetly tucked behind concertina doors. It features a stainless steel sink with tiled splashback, and wall taps for both washing machine and dryer connections. The setup is efficient and space-saving, offering practical functionality without taking away from the main living areas.",
    }

    const room9Data = {
      roomId: "m8npxsuk79xy21dd09x9wtped",
      panoramaIds: ["a7h77eu1i3kdnwz5ypd0dhbbc", "77bug6dex2fzdp3my4up5x3dd"],
      panoramaLinks: [
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_m8npxsuk79xy21dd09x9wtped_a7h77eu1i3kdnwz5ypd0dhbbc_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_m8npxsuk79xy21dd09x9wtped_77bug6dex2fzdp3my4up5x3dd_skybox.jpg",
      ],
      roomType: "hallway",
      totalArea: 2.392699957,
      volume: 5.766406536,
      depth: 0.7898712754,
      height: 2.409999847,
      width: 2.429124594,
      smokeAlarmCount: 0,
      flooringType: "carpet",
      floorDamage: "No",
      roomValuation: "$6938.717452",
      ceilingType: "flat",
      ceilingLightCount: 1,
      ceilingLightType: "Recessed",
      ceilingFanCount: 0,
      ceilingDamage: "No",
      windowCount: 0,
      windowCover: "Other",
      wallMaterial: "painted drywall",
      wallDamage: "No",
      airConditioningCount: 0,
      roomDescription:
        "This short hallway connects directly to the bathroom (with integrated Euro-laundry) and a bedroom. It is carpeted in a soft, neutral-toned pile that contrasts with the tiled bathroom flooring. The walls are painted in a crisp white, creating a bright and open feel. A single downlight overhead provides illumination, while the curved wall lines give the space a smooth, modern flow. The hallway is wide enough for easy movement between rooms and frames a clear sightline straight through to the double vanity area in the bathroom.",
    }

    const room10Data = {
      roomId: "n81qfe51azs8iexnbqwspye6c",
      panoramaIds: ["ucirpuknnqi17cg1dc294dhyc", "9entd33y20xbr4u7f2yauqzfd", "nh1tid1ai2rew77sd5rhsxhpc"],
      panoramaLinks: [
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_n81qfe51azs8iexnbqwspye6c_ucirpuknnqi17cg1dc294dhyc_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_n81qfe51azs8iexnbqwspye6c_9entd33y20xbr4u7f2yauqzfd_skybox.jpg",
        "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/pd0i1c4yq9w0y2zsb07ed23sb_pd0i1c4yq9w0y2zsb07ed23sb_n81qfe51azs8iexnbqwspye6c_nh1tid1ai2rew77sd5rhsxhpc_skybox.jpg",
      ],
      roomType: "bathroom",
      totalArea: 2.180700064,
      height: 2.409999847,
      width: 1.484874964,
      smokeAlarmCount: 0,
      flooringType: "tile",
      floorDamage: "Yes",
      roomValuation: "$6679.753954",
      ceilingType: "flat",
      ceilingLightCount: 1,
      ceilingLightType: "Recessed",
      ceilingFanCount: 0,
      ceilingDamage: "No",
      windowCount: 3,
      windowCover: "Other",
      wallMaterial: "plaster",
      wallDamage: "No",
      airConditioningCount: 0,
      roomDescription: null,
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
    } else if (roomId === "5") {
      roomData = room5Data
    } else if (roomId === "6") {
      roomData = room6Data
    } else if (roomId === "7") {
      roomData = room7Data
    } else if (roomId === "8") {
      roomData = room8Data
    } else if (roomId === "9") {
      roomData = room9Data
    } else if (roomId === "10") {
      roomData = room10Data
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
