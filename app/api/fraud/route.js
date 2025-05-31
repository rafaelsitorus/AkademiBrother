import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const req = await request.json();
    
    // Forward the request to Flask API
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    // Get the response from Flask API
    const result = await response.json();
    
    // Return the result
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Error processing the request" }, { status: 500 });
  }
}