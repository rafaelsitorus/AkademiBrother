"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import ClaimCard from "../../../components/ClaimCard";
import { Input } from "@/components/ui/input";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Search } from "lucide-react";

type Claim = {
  id: string; 
  user: string;
  value: string;
  description: string;
  status: string;
};

export default function HealthifyClaimsPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchClaims() {
      try {
        const response = await fetch("/api/claims");

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setClaims(data);
      } catch (err) {
        console.error("Failed to fetch claims:", err);
        setError("Failed to load claims. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    console.log("Fetched claims:", claims);
    fetchClaims();
  }, []);

  const filteredClaims = claims.filter(
    (claim) =>
      claim.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#E6F7F6] font-sans px-20 ml-[-4rem]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Healthify Claims"/>
        <div className="relative w-full max-w-2xl mx-auto">
          <Input
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 pl-12 pr-4 rounded-full bg-gray-200 text-teal-700 placeholder-teal-600 text-lg border-none focus-visible:ring-2 focus-visible:ring-teal-500"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-teal-600" />
        </div>
        <main className="flex-1 flex flex-col py-6  space-y-6 md:space-y-8  mx-5 w-full">
          {loading && (
            <div className="text-center text-teal-700">Loading claims...</div>
          )}
          {error && <div className="text-center text-red-500">{error}</div>}

          {!loading && !error && (
            <div className="h-[600px] overflow-y-auto pr-2">
              {filteredClaims.length === 0 ? (
                <div className="text-center text-teal-700">No claims found</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredClaims.map((claim) => (
                    <ClaimCard key={claim.id} claim={claim} />
                    //ignore this warning
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
