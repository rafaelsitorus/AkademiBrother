import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { HospitalName, DistrictID, ProvinceID, FacilityNeedsScore } = body;

    console.log("Received data:", body);

    // Basic validation
    if (!HospitalName) {
      return NextResponse.json(
        { error: "Hospital name and location are required" },
        { status: 400 }
      );
    }

    console.log("Finding location for District:", DistrictID);
    console.log("ProvinceID:", ProvinceID);

    // Find the matching Location record that corresponds to the district
    let location;

    if (ProvinceID) {
      // If we have both province and district IDs
      location = await prisma.location.findFirst({
        where: {
          DistrictID: Number(DistrictID),
          ProvinceID: Number(ProvinceID),
        },
      });
    } else {
      // If we only have district ID
      location = await prisma.location.findFirst({
        where: {
          DistrictID: Number(DistrictID),
        },
      });
    }
    if (!location) {
      return NextResponse.json(
        { error: "Could not find locationID" },
        { status: 400 }
      );
    }

    console.log("Using location:", location);

    type MaxIdResult = { max: number | null };
    const maxIdResult = await prisma.$queryRaw<
      MaxIdResult[]
    >`SELECT MAX("HospitalID") as max FROM "Hospital"`;
    const maxId = maxIdResult[0]?.max || 0;

    // Add 1 to get the next ID
    const nextId = maxId + 1;
    console.log("Next HospitalID will be:", nextId);

    // Reset the sequence
    await prisma.$executeRaw`SELECT setval('"Hospital_HospitalID_seq"', ${nextId}, false)`;

    // Create new hospital with the proper location ID
    const newHospital = await prisma.hospital.create({
      data: {
        HospitalName,
        LocationID: location.LocationID,
        FacilityNeedsScore:
          FacilityNeedsScore !== null ? Math.round(FacilityNeedsScore) : null,
      },
    });

    console.log("Created hospital with ID:", newHospital.HospitalID);
    return NextResponse.json(newHospital, { status: 201 });
  } catch (error) {
    console.error("Error creating hospital:", error);
    let errorMessage = "Failed to create hospital.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { error: "Failed to create hospital", details: errorMessage },
      { status: 500 }
    );
  }
}
