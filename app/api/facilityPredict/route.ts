import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { doctorCount, medicalHistoryCount, facilityCount } = body;

    // Validate inputs
    if (!doctorCount || !medicalHistoryCount || facilityCount === undefined) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Forward request to Flask API
    const flaskResponse = await fetch("http://localhost:5001/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctorCount,
        medicalHistoryCount,
        facilityCount
      }),
    });
    
    if (!flaskResponse.ok) {
      const errorData = await flaskResponse.json();
      console.error("Flask API error:", errorData);
      throw new Error(`Flask API error: ${errorData.error || flaskResponse.statusText}`);
    }
    
    // Return the prediction from Flask API
    const data = await flaskResponse.json();
      const rawScore = data.score;
    const cappedScore = Math.min(100, Math.max(0, rawScore));
    return NextResponse.json({ score: cappedScore });

  } catch (error) {
    console.error("Prediction error:", error);
    
    // Provide a graceful fallback if the Flask API is unavailable
    return NextResponse.json(
      { 
        error: "Failed to predict facility needs score. Is the Flask API running?",
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}