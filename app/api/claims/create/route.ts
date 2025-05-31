import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"; 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      ClaimAmount,
      ProcedureCode,
      PatientID,
      ProfID,
      HospitalID,
      ClaimStatus,
    } = body;

    // Basic validation (unchanged)
    if (
      ClaimAmount === undefined ||
      ClaimAmount === null ||
      ProcedureCode === undefined ||
      ProcedureCode === null ||
      ClaimStatus === undefined
    ) {
      return NextResponse.json(
        { error: "Missing required claim fields" },
        { status: 400 }
      );
    }

    console.log("Data for claim creation:", {
      ClaimAmount,
      ProcedureCode,
      PatientID,
      ProfID,
      HospitalID,
      ClaimStatus,
    });

    // Use raw query instead of ORM create to bypass potential Prisma issues
    const result = await prisma.$queryRaw`
      INSERT INTO "BPJSClaim" ("ClaimAmount", "ProcedureCode", "PatientID", "ProfID", "HospitalID", "ClaimStatus")
      VALUES (${ClaimAmount}, ${ProcedureCode}, ${PatientID}, ${ProfID}, ${HospitalID}, ${ClaimStatus})
      RETURNING *;
    `;

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating claim:", error);
    let errorMessage = "Failed to create claim.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { error: "Failed to create claim", details: errorMessage },
      { status: 500 }
    );
  }
}