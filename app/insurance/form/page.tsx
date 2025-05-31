"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useState } from "react";

export default function Page() {
  const [result, setResult] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null); // For save status
  const [formData, setFormData] = useState({
    patientAge: "",
    claimAmount: "",
    procedureCode: "",
    previousClaims: "",
    daysSinceLastClaim: "",
    patientId: "",
    profId: "",
    hospitalId: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(null); // Reset previous results
    setSubmissionStatus("Submitting...");

    try {
      // Step 1: Get fraud prediction
      const fraudResponse = await fetch("/api/fraud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send only data relevant for fraud prediction if your /api/fraud expects that
        body: JSON.stringify({
          patientAge: formData.patientAge,
          claimAmount: formData.claimAmount,
          procedureCode: formData.procedureCode,
          previousClaims: formData.previousClaims,
          daysSinceLastClaim: formData.daysSinceLastClaim,
        }),
      });

      if (!fraudResponse.ok) {
        const errorText = await fraudResponse.text();
        throw new Error(
          `Fraud prediction failed: ${fraudResponse.status} ${errorText}`
        );
      }

      const fraudResult = await fraudResponse.json();
      console.log("Prediction result:", fraudResult);
      const isFraudulent = fraudResult.fraudulent;
      setResult(isFraudulent ? "Fraudulent" : "Not Fraudulent");

      // Step 2: Save the claim to the database
      const claimDataToSave = {
        ClaimAmount: parseFloat(formData.claimAmount) || null,
        ProcedureCode: formData.procedureCode || null,
        PatientID: formData.patientId ? parseInt(formData.patientId) : null,
        ProfID: formData.profId ? parseInt(formData.profId) : null,
        HospitalID: formData.hospitalId ? parseInt(formData.hospitalId) : null,
        ClaimStatus: isFraudulent ? "Flagged" : "Accepted",
      };

      const saveClaimResponse = await fetch("/api/claims/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(claimDataToSave),
      });

      if (!saveClaimResponse.ok) {
        const errorText = await saveClaimResponse.text();
        throw new Error(
          `Failed to save claim: ${saveClaimResponse.status} ${errorText}`
        );
      }

      const savedClaimResult = await saveClaimResponse.json();
      console.log("Claim saved successfully:", savedClaimResult);
      setSubmissionStatus("Claim submitted and saved successfully!");
      // Optionally reset form:
      // setFormData({ patientAge: "", claimAmount: "", ...etc. });
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
      // Keep fraud result if it was set before saving failed
      if (
        !result &&
        error instanceof Error &&
        error.message.startsWith("Fraud prediction failed")
      ) {
        setResult("Error in fraud prediction.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex h-screen bg-[#E6F7F6] font-sans px-20 ml-[-4rem]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 flex flex-col p-6 md:p-8 space-y-6 md:space-y-8 max-w-[900px] mx-auto w-full">
          <form
            className="space-y-4 bg-white p-6 rounded-lg shadow-md"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="claimAmount"
                className="block text-sm font-medium text-gray-700"
              >
                Claim Amount
              </label>
              <input
                type="number"
                id="claimAmount"
                name="claimAmount"
                value={formData.claimAmount}
                onChange={handleChange}
                className="mt-1 px-2 block w-full h-8 border-2 border-black-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="procedureCode"
                className="block text-sm font-medium text-gray-700"
              >
                Procedure Code
              </label>
              <input
                type="text"
                id="procedureCode"
                name="procedureCode"
                value={formData.procedureCode}
                onChange={handleChange}
                className="mt-1 px-2 block w-full h-8 border-2 border-black-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="previousClaims"
                className="block text-sm font-medium text-gray-700"
              >
                Number of Previous Claims
              </label>
              <input
                type="number"
                id="previousClaims"
                name="previousClaims"
                value={formData.previousClaims}
                onChange={handleChange}
                className="mt-1 px-2 block w-full h-8 border-2 border-black-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="daysSinceLastClaim"
                className="block text-sm font-medium text-gray-700"
              >
                Days Since Last Claim
              </label>
              <input
                type="number"
                id="daysSinceLastClaim"
                name="daysSinceLastClaim"
                value={formData.daysSinceLastClaim}
                onChange={handleChange}
                className="mt-1 px-2 block w-full h-8 border-2 border-black-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Add more Fields  (maybe)*/}
            <div>
              <label
                htmlFor="patientId"
                className="block text-sm font-medium text-gray-700"
              >
                Patient ID
              </label>
              <input
                type="number"
                id="patientId"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                className="mt-1 px-2 block w-full h-8 border-2 border-black-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="patientAge"
                className="block text-sm font-medium text-gray-700"
              >
                Patient Age
              </label>
              <input
                type="number"
                id="patientAge"
                name="patientAge"
                value={formData.patientAge}
                onChange={handleChange}
                className="mt-1 px-2 block w-full h-8 border-2 border-black-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="profId"
                className="block text-sm font-medium text-gray-700"
              >
                Doctor ID
              </label>
              <input
                type="number"
                id="profId"
                name="profId"
                value={formData.profId}
                onChange={handleChange}
                className="mt-1 px-2 block w-full h-8 border-2 border-black-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="hospitalId"
                className="block text-sm font-medium text-gray-700"
              >
                Hospital ID
              </label>
              <input
                type="number"
                id="hospitalId"
                name="hospitalId"
                value={formData.hospitalId}
                onChange={handleChange}
                className="mt-1 px-2 block w-full h-8 border-2 border-black-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-800 text-white py-2 px-4 rounded-md hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit Claim
            </button>
          </form>
          {result && (
            <p className="mt-4 text-lg font-semibold">{`Fraud Prediction: ${result}`}</p>
          )}
          {submissionStatus && (
            <p className="mt-2 text-md">{submissionStatus}</p>
          )}
        </main>
      </div>
    </div>
  );
}
