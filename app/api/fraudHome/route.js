import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma"; // Use the singleton pattern

export async function GET() {
  try {
    // Fetch data with hospital names for fraud claims
    const fraudData = await prisma.$queryRaw`
      SELECT 
        h."HospitalID" as "hospitalId",
        h."HospitalName" as "hospitalName",
        c."ProcedureCode" as "procedureCode",
        SUM(c."ClaimAmount") as "totalAmount",
        COUNT(*) as "fraudCount"
      FROM 
        "BPJSClaim" c
      JOIN 
        "Hospital" h ON c."HospitalID" = h."HospitalID"
      WHERE 
        c."ClaimStatus" = 'Flagged' OR c."ClaimStatus" = 'Flagged - Potential Fraud'
      GROUP BY 
        h."HospitalID", h."HospitalName", c."ProcedureCode"
      ORDER BY 
        "totalAmount" DESC
    `;

    // Format the data for display
    const formattedData = fraudData.map(item => ({
      hospitalId: `#${item.hospitalId}`,
      hospitalName: item.hospitalName,
      procedureCode: item.procedureCode,
      totalAmount: `$${new Intl.NumberFormat('en-US').format(item.totalAmount)}`
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching fraud data:", error);
    return NextResponse.json({ error: "Failed to fetch fraud data" }, { status: 500 });
  }
}