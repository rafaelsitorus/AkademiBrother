"use client";

import DoctorCard from "@/components/Doctor-card";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

// Define hospital type
type Hospital = {
  HospitalID: number;
  HospitalName: string;
  FacilityNeedsScore: number | null;
  LocationID: number;
  Location?: {
    District?: {
      DistrictName: string;
    };
  };
};

export default function FacilityDashboard() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Add pagination states
  const [page, setPage] = useState(1);
  const [hospitalsPerPage] = useState(10);

  // Fetch hospitals from the database
  useEffect(() => {
    async function fetchHospitals() {
      try {
        setLoading(true);
        const response = await fetch("/api/facility");

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setHospitals(data);
      } catch (err) {
        console.error("Failed to fetch hospitals:", err);
        setError("Could not load hospital data");
      } finally {
        setLoading(false);
      }
    }

    fetchHospitals();
  }, []);

  // Filter hospitals based on search query
  const filteredHospitals = hospitals.filter((hospital) => 
    !searchQuery.trim() || 
    hospital.HospitalName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current page of hospitals
  const indexOfLastHospital = page * hospitalsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;
  const currentHospitals = filteredHospitals.slice(indexOfFirstHospital, indexOfLastHospital);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredHospitals.length / hospitalsPerPage);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  return (
    <div className="flex h-screen bg-[#E0F2F1] font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Hospital Facilities" />
        <div className="p-4">
          {/* Search bar */}
          <div className="relative w-full max-w-md mx-auto mb-4">
            <Input
              type="search"
              placeholder="Search hospitals"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full h-10 pl-10 pr-4 rounded-full text-gray-700 border-gray-300"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Scrollable container with fixed height */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-700 mx-auto"></div>
              <p className="mt-2">Loading hospitals...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              {error}
            </div>
          ) : filteredHospitals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No hospitals found matching &#34;{searchQuery}&#34;
            </div>
          ) : (
            <div className="grid gap-3 pb-6">
              {currentHospitals.map((hospital: Hospital) => (
                <DoctorCard
                  key={hospital.HospitalID}
                  name={hospital.HospitalName}
                  score={hospital.FacilityNeedsScore}
                  location={hospital.Location?.District?.DistrictName}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination at the bottom */}
        {!loading && !error && filteredHospitals.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-white">
            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => setPage((p: number) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-3 py-1 rounded bg-teal-600 text-white disabled:bg-gray-300"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p: number) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-3 py-1 rounded bg-teal-600 text-white disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}