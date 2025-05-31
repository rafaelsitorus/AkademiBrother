import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    // Fetch all hospitals with their facility needs scores
    const hospitals = await prisma.hospital.findMany({
      select: {
        HospitalID: true,
        HospitalName: true,
        FacilityNeedsScore: true,
        LocationID: true,
        Location: {
          select: {
            District: {
              select: {
                DistrictName: true
              }
            },
            Province: {
              select: {
                ProvinceName: true
              }
            }
          }
        }
      },
      orderBy: {
        FacilityNeedsScore: 'desc'
      }
    });

    return NextResponse.json(hospitals);
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return NextResponse.json(
      { error: "Failed to fetch hospitals" },
      { status: 500 }
    );
  }
}