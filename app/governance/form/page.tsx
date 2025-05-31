"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useState, useEffect } from "react";

type Province = {
  ProvinceID: number;
  ProvinceName: string;
};

type District = {
  DistrictID: number;
  DistrictName: string;
};

export default function Page() {
  // Form state
  const [formData, setFormData] = useState({
    hospitalName: "",
    provinceId: "",
    districtId: "",
    doctorCount: "",
    medicalHistoryCount: "",
    facilityCount: "",
  });

  const [facilityNeedsScore, setFacilityNeedsScore] = useState<number | null>(
    null
  );
  const [isPredicting, setIsPredicting] = useState(false);

  // Location data state
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  // Status states
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLocationData() {
      try {
        setLoading(true);

        // Fetch provinces
        const provinceResponse = await fetch("/api/locations/provinces");
        if (!provinceResponse.ok) {
          throw new Error(
            `Error ${provinceResponse.status}: ${provinceResponse.statusText}`
          );
        }
        const provinceData = await provinceResponse.json();
        setProvinces(provinceData);

        // Fetch all districts
        const districtResponse = await fetch("/api/locations/districts");
        if (!districtResponse.ok) {
          throw new Error(
            `Error ${districtResponse.status}: ${districtResponse.statusText}`
          );
        }
        const districtData = await districtResponse.json();
        setDistricts(districtData);

      } catch (err) {
        console.error("Failed to fetch location data:", err);
        setError("Failed to load location data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchLocationData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Predict facility needs score when counts are changed
  useEffect(() => {
    const predictFacilityNeedsScore = async () => {
      // Only predict if all three count fields have values
      if (
        formData.doctorCount &&
        formData.medicalHistoryCount &&
        formData.facilityCount
      ) {
        try {
          setIsPredicting(true);
          const response = await fetch("/api/facilityPredict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              doctorCount: parseInt(formData.doctorCount),
              medicalHistoryCount: parseInt(formData.medicalHistoryCount),
              facilityCount: parseInt(formData.facilityCount),
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to predict facility needs score");
          }

          const { score } = await response.json();
          setFacilityNeedsScore(score);
        } catch (err) {
          console.error("Prediction error:", err);
          setFacilityNeedsScore(null);
        } finally {
          setIsPredicting(false);
        }
      } else {
        setFacilityNeedsScore(null);
      }
    };

    // Debounce prediction to avoid too many requests
    const timer = setTimeout(() => {
      predictFacilityNeedsScore();
    }, 500);

    return () => clearTimeout(timer);
  }, [
    formData.doctorCount,
    formData.medicalHistoryCount,
    formData.facilityCount,
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionStatus("Submitting...");

    try {
    // Get both district and province IDs
    const districtId = formData.districtId ? parseInt(formData.districtId) : null;
    const provinceId = formData.provinceId ? parseInt(formData.provinceId) : null;

    // Data to save - include both district and province IDs
    const hospitalData = {
      HospitalName: formData.hospitalName,
      DistrictID: districtId,    // This is actually the district ID
      ProvinceID: provinceId,    // Add province ID as well
      FacilityNeedsScore: facilityNeedsScore ? Math.min(100, Math.max(0, Math.round(facilityNeedsScore))) : null
    };

    console.log("Sending hospital data:", hospitalData);
      const response = await fetch("/api/hospitals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hospitalData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to save hospital: ${response.status} ${errorText}`
        );
      }

      const result = await response.json();
      console.log("Hospital saved successfully:", result);
      setSubmissionStatus("Hospital registered successfully!");

      // Reset form
      setFormData({
        hospitalName: "",
        provinceId: "",
        districtId: "",
        doctorCount: "",
        medicalHistoryCount: "",
        facilityCount: "",
      });
      setFacilityNeedsScore(null);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    }
  };

  return (
    <div className="flex h-screen bg-[#E6F7F6] font-sans px-20 ml-[-4rem]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Test" />
        <main className="flex-1 flex flex-col p-6 md:p-8 space-y-6 md:space-y-8 max-w-[900px] mx-auto w-full">
          <h1 className="text-2xl font-bold text-gray-800">
            Register Hospital
          </h1>

          {loading ? (
            <div className="text-center p-6">Loading location data...</div>
          ) : error ? (
            <div className="text-center p-6 text-red-500">{error}</div>
          ) : (
            <form
              className="space-y-4 bg-white p-6 rounded-lg shadow-md"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="hospitalName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hospital Name
                </label>
                <input
                  type="text"
                  id="hospitalName"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  className="mt-1 px-4 block w-full h-12 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="provinceId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Province
                </label>
                <select
                  id="provinceId"
                  name="provinceId"
                  value={formData.provinceId}
                  onChange={handleChange}
                  className="mt-1 px-4 block w-full h-12 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                  required
                >
                  <option value="">Select Province</option>
                  {provinces.map((province) => (
                    <option
                      key={province.ProvinceID}
                      value={province.ProvinceID}
                    >
                      {province.ProvinceName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="districtId"
                  className="block text-sm font-medium text-gray-700"
                >
                  District
                </label>
                <select
                  id="districtId"
                  name="districtId"
                  value={formData.districtId}
                  onChange={handleChange}
                  className="mt-1 px-4 block w-full h-12 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                  required
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option
                      key={district.DistrictID}
                      value={district.DistrictID}
                    >
                      {district.DistrictName}
                    </option>
                  ))}
                </select>
                {/* Remove or replace the guidance text */}
                <p className="mt-1 text-sm text-gray-500">
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="doctorCount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Doctor Count
                  </label>
                  <input
                    type="number"
                    id="doctorCount"
                    name="doctorCount"
                    value={formData.doctorCount}
                    onChange={handleChange}
                    min="1"
                    className="mt-1 px-4 block w-full h-12 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="medicalHistoryCount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Medical History Count
                  </label>
                  <input
                    type="number"
                    id="medicalHistoryCount"
                    name="medicalHistoryCount"
                    value={formData.medicalHistoryCount}
                    onChange={handleChange}
                    min="0"
                    className="mt-1 px-4 block w-full h-12 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="facilityCount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Facility Count
                  </label>
                  <input
                    type="number"
                    id="facilityCount"
                    name="facilityCount"
                    value={formData.facilityCount}
                    onChange={handleChange}
                    min="1"
                    className="mt-1 px-4 block w-full h-12 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                    required
                  />
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Facility Needs Score
                </h3>
                {isPredicting ? (
                  <div className="flex items-center justify-center h-12">
                    <div className="animate-pulse text-gray-500">
                      Calculating score...
                    </div>
                  </div>
                ) : facilityNeedsScore !== null ? (
                  <div className="flex items-center">
                    <div className="text-2xl font-bold text-indigo-600">
                      {Math.round(facilityNeedsScore)}
                    </div>
                    <div className="ml-2 text-gray-600">/ 100</div>
                    <div className="ml-4 text-sm text-gray-500">
                      {facilityNeedsScore < 30
                        ? "Low needs"
                        : facilityNeedsScore < 70
                        ? "Moderate needs"
                        : "High needs"}
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 h-12 flex items-center">
                    Enter doctor, medical history and facility counts to
                    generate score
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-green-800 text-white py-3 px-4 text-lg rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                disabled={facilityNeedsScore === null}
              >
                Register Hospital
              </button>
            </form>
          )}

          {submissionStatus && (
            <div
              className={`p-4 rounded-md ${
                submissionStatus.includes("success")
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {submissionStatus}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
