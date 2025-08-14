import { fetchPropertyData } from "@/lib/data-parser"

export async function GET() {
  try {
    const propertyData = await fetchPropertyData()

    if (!propertyData) {
      return Response.json({ error: "Property data not found" }, { status: 404 })
    }

    const responseData = {
      ...propertyData,
      carSpaces: 1,
      internalWallColour: "#d2d0ca",
      primaryInternalColor: "#d2d0ca",
    }

    return Response.json(responseData)
  } catch (error) {
    console.error("Error fetching property data:", error)
    return Response.json({ error: "Failed to fetch property data" }, { status: 500 })
  }
}
