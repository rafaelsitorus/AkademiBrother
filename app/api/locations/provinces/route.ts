import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    // Fetch all provinces
    const provinces = await prisma.province.findMany({
      orderBy: {
        ProvinceName: 'asc'
      }
    });
    
    return NextResponse.json(provinces);
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return NextResponse.json({ error: "Failed to fetch provinces" }, { status: 500 });
  }
}