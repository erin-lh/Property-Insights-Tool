import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { reportType } = await request.json()

    let content = ""
    let filename = ""

    if (reportType === "energy") {
      filename = "Energy_Efficiency_Assessment_Report.txt"
      content = `Energy Efficiency Assessment Report
Address: 3 Bellavista Terrace
Scanner: Noah Thompson
Date: 2nd August 2025

Section	Number	Energy	Feature	Observation
1	EER	(Score	0-6	stars)	Pending
1	Home	Energy	Rating	(Score	0-100)	for	all	scores	from	101	and	over	the	default	is	100+	Pending
1	NABERS®	for	Apartment	Buildings	(Score	0-6	stars)	Not	Relevant
2	Climate	Pattern-	Climate	Zone	Climate	Zone	2
3	Orientation	Living	rooms	Direction	of	Front	Door	27°	NE
	Direction	of	Windows	in	Living	Room	27°	NE
4	Optimal	Layout	Top	Floor-	Open	Plan,	one	door	to	bathroom,	one	door	to	balcony
	Bottom	Floor-	all	rooms	have	doors,	open	hallway	up	the	stairs.
6	Efficient	Windows	No-	Single	Glazing
7	External	Shading	Yes,	Window	shades	on	Northern	side,	Shaded	deck	on	Western	Side
8	Efficient	Window	Coverings	No-	only	blinds	downstairs-	refer	to	images
9	Natural	Ventilation	Moderate
	Limited	to	no	cross	ventilation	pathways	upstairs
	Some	cross	ventilation	in	master	bedroom
11	Efficient	Heating	and	Cooling	Split	System	(Indoor-	Fujitsu)
12	Efficient	Lighting	Yes,	LEDs	present
13	Efficient	Hot	Water	Hot	water	tank	and	power	box	present,	no	solar	present
14	Efficient	Cooking	Yes-	Induction
15	Energy	Generation	No,	not	present
16	Energy	Storage	No,	not	present
17	Electric	Vehicle	Charging	No,	not	present
18	Efficient	Pool	Pump	No,	not	present
20	All	Electric	Home	Yes,	No	Gas	Present`
    } else if (reportType === "contents") {
      filename = "Home_Contents_Report.txt"
      content = `Little Hinges Australia
Home Contents Report
Home Contents Report
Property Address: 3 Bellavista Terrace, Paddington, QLD
Date of Report: 2nd August 2025
Report Reference Number: #4

1. Summary
Purpose of Report: Item descriptions and contents valuation based on RRP.
Date of Inspection: 2nd August 2025
Scope of Report: Includes all household furniture and contents at the property.

3. Contents Inventory
Room / Location	Item Description	Purchase Price (AUD)
Hallway	Globe West Sketch Mono Console	$1,380
Hallway	Designer Boys "Ethereal" Framed Canvas	$1,199
Hallway	Atom Recessed LED Downlight (each)	$25
Patio	Barbeques Galore "Captiva" 7-Piece Dining Set	$1,499
Patio	BeefEater 1600 Series 5 Burner BBQ	$1,280
Patio	Beacon Lighting "Lucci Air" Ceiling Fan	$299
Patio	Havit "Leva" Up/Down Exterior Wall Light	$119
Bathroom	Victoria + Albert "Amiata" Freestanding Bath	$5,995
Bathroom	Meir Round Floor Mounted Bath Mixer	$1,279
Bathroom	ADP "Clifton" Wall Hung Vanity	$2,150
Bathroom	ADP "Arch" Mirror	$499
Bathroom	Milli "Pure" Heated Towel Rail	$986
Bathroom	Stegbar "Grange" Frameless Shower Screen	$1,200
Bathroom	Phoenix "Vivid" Twin Shower	$652
Bathroom	Caroma "Luna" Cleanflush Back-to-Wall Toilet	$799
Bedroom	Snooze "My Style" Upholstered Bed Frame	$1,890
Bedroom	Globe West "Elle" Bedside Table (each)	$1,090
Bedroom	Beacon Lighting "Husk" Table Lamp	$199
Bedroom	DIY Blinds White Plantation Shutters	$750
Bedroom	Hunter "Pacific" 4-Blade Ceiling Fan with Light	$349
Bedroom	Stegbar "Glengary" Sliding Wardrobe Doors	$1,500
Patio	Globe West "Maui" Outdoor Sofa	$3,495
Patio	Globe West "Maui" Outdoor Coffee Table	$1,295
Living	King "Jasper" L-Shaped Sofa	$5,990
Living	Nick Scali "Cooper" TV Unit	$1,590
Living	Armadillo "Granada" Rug	$2,950
Hallway	Armadillo "Sierra" Hall Runner	$1,250
Living Room	Coco Republic "Sorrento" 3-Seater Sofa	$6,995
Living Room	Coco Republic "Montauk" Occasional Chair	$3,495
Living Room	Samsung 65" The Frame QLED Smart TV	$2,895
Living Room	Globe West "Vittoria" Coffee Table	$1,895
Bathroom	Caroma "Newbury" Shower Bath	$950
Bathroom	Arova "Luxe" Mirrored Cabinet	$550
Hallway	West Elm "Metal Frame" Arched Wall Mirror	$599
Bathroom	Reece "Posh" Domaine Double Vanity	$1,800
Bathroom	Hydrotherm "TR2" Heated Towel Ladder	$1,245
Bedroom	Freedom "Floating" Bed Base	$1,299
Bedroom	Freedom "Frank" Chest of Drawers	$1,499
Bedroom	Freedom "Frank" Bedside Table (each)	$599
Patio	Tait "Jak" Outdoor Bar Table & Stools	$3,500
Patio	Tait "Trace" Armchair	$1,950
Bedroom	King "Encore" Bed	$3,990
Bedroom	King "Oliver" Tub Chair	$1,890
Bedroom	King "Encore" Bedside Table (each)	$890

4. High-Value or Special Items
Globe West Sketch Mono Console - Hallway - $1,380
Designer Boys "Ethereal" Framed Canvas - Hallway - $1,199
Barbeques Galore "Captiva" 7-Piece Dining Set - Patio - $1,499
BeefEater 1600 Series 5 Burner BBQ - Patio - $1,280
Victoria + Albert "Amiata" Freestanding Bath - Bathroom - $5,995
Meir Round Floor Mounted Bath Mixer - Bathroom - $1,279
ADP "Clifton" Wall Hung Vanity - Bathroom - $2,150
Stegbar "Grange" Frameless Shower Screen - Bathroom - $1,200
Snooze "My Style" Upholstered Bed Frame - Bedroom - $1,890
Globe West "Elle" Bedside Table (each) - Bedroom - $1,090
Stegbar "Glengary" Sliding Wardrobe Doors - Bedroom - $1,500
Globe West "Maui" Outdoor Sofa - Patio - $3,495
Globe West "Maui" Outdoor Coffee Table - Patio - $1,295
King "Jasper" L-Shaped Sofa - Living - $5,990
Nick Scali "Cooper" TV Unit - Living - $1,590
Armadillo "Granada" Rug - Living - $2,950
Armadillo "Sierra" Hall Runner - Hallway - $1,250
Coco Republic "Sorrento" 3-Seater Sofa - Living Room - $6,995
Coco Republic "Montauk" Occasional Chair - Living Room - $3,495
Samsung 65" The Frame QLED Smart TV - Living Room - $2,895
Globe West "Vittoria" Coffee Table - Living Room - $1,895
Reece "Posh" Domaine Double Vanity - Bathroom - $1,800
Hydrotherm "TR2" Heated Towel Ladder - Bathroom - $1,245
Freedom "Floating" Bed Base - Bedroom - $1,299
Freedom "Frank" Chest of Drawers - Bedroom - $1,499
Tait "Jak" Outdoor Bar Table & Stools - Patio - $3,500
Tait "Trace" Armchair - Patio - $1,950
King "Encore" Bed - Bedroom - $3,990
King "Oliver" Tub Chair - Bedroom - $1,890

6. Total Estimated Value
Bathroom: $18,105
Bedroom: $15,945
Hallway: $4,453
Living: $10,530
Living Room: $15,280
Patio: $13,437
Total: $77,750.00 AUD`
    }

    // Store in Vercel Blob
    const blob = await put(filename, content, {
      access: "public",
      contentType: "text/plain",
    })

    return NextResponse.json({ url: blob.url, filename })
  } catch (error) {
    console.error("Error storing report:", error)
    return NextResponse.json({ error: "Failed to store report" }, { status: 500 })
  }
}
