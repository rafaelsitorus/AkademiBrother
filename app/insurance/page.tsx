'use client';

import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import ClaimCard from "@/components/ClaimCard"
import FraudClaimsChart from "@/components/Fraud-claims-chart"
import AnalyticsDonutChart from "@/components/Analytics-donut-chart"
import FraudsTable from "@/components/Frauds-table"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useSession } from "next-auth/react"

type Claim = {
  id: string;
  user: string;
  value: string;
  description: string;
  status: "Accepted" | "Flagged" | "On Going" | "On Hold";
};

const sampleClaims: Claim[] = [
  { id: "HC101", user: "User A", value: "$250", description: "Claim details A", status: "Accepted" },
  { id: "HC102", user: "User B", value: "$450", description: "Claim details B", status: "Accepted" },
  { id: "HC103", user: "User C", value: "$1200", description: "Claim details C", status: "Flagged" },
  { id: "HC104", user: "User D", value: "$800", description: "Claim details D", status: "Flagged" },
]


export default function AnalyticsDashboardPage() {

const userSession = useSession();
console.log("User Session:", userSession.data?.user || "No user session found");
  return (
    <div className="flex h-screen bg-[#E6F7F6] px-4 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title=""/>
        <ScrollArea className="flex-1">
          <main className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main content area spanning 2 columns */}
              <div className="lg:col-span-2 space-y-6">
                <FraudClaimsChart />
                <FraudsTable />
              </div>

              {/* Right sidebar area for Analytics and Claim Cards */}
              <div className="lg:col-span-1 space-y-6">
                <AnalyticsDonutChart />
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">Recent Claims</h3>
                  {sampleClaims.slice(0, 2).map(
                    (
                      claim, // Displaying only 2 cards as per image
                    ) => (
                      <ClaimCard key={claim.id} claim={claim} />
                    ),
                  )}
                </div>
              </div>
            </div>
          </main>
          <ScrollBar orientation="vertical" className="bg-teal-500 opacity-70 w-2.5 rounded-full" />
        </ScrollArea>
      </div>
    </div>
  )
}