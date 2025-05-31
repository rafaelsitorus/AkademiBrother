import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    // Fetch all districts with their province information
    const districts = await prisma.district.findMany({
      orderBy: {
        DistrictName: 'asc'
      }
    });
    
    console.log("API - Returning districts:", districts); // Add this line
    return NextResponse.json(districts);
  } catch (error) {
    console.error("Error fetching districts:", error);
    return NextResponse.json({ error: "Failed to fetch districts" }, { status: 500 });
  }
}