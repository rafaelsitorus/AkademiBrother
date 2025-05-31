import { NextResponse } from "next/server";
import {
  PrismaClient,
  BPJSClaim as PrismaBPJSClaim,
  Patient as PrismaPatient,
  HealthcareProfessional as PrismaHealthcareProfessional,
  Hospital as PrismaHospital,
} from "../../generated/prisma";

const prisma = new PrismaClient();

type ClaimWithRelations = PrismaBPJSClaim & {
  Patient: PrismaPatient | null;
  Professional: PrismaHealthcareProfessional | null;
  Hospital: PrismaHospital | null;
};

export async function GET() {
  try {
    const claims = await prisma.bPJSClaim.findMany({
      include: {
        Patient: true,
        Professional: true,
        Hospital: true,
      },
    });

    const transformedClaims = claims.map((claim: ClaimWithRelations) => ({
      id: `HC${claim.ClaimID.toString().padStart(3, "0")}`,
      user: claim.Patient?.Name || "Unknown",
      value: `$${claim.ClaimAmount?.toFixed(2) || "0.00"}`,
      description: claim.ProcedureCode || "No description",
      status: claim.ClaimStatus || "Accepted", 
    }));

    return NextResponse.json(transformedClaims);
  } catch (error) {
    console.error("Error fetching claims:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch claims",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
