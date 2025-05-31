'use client';
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import InfoCardPlaceholder from "@/components/Info-card-placeholder"
import MedicalTrendChart from "@/components/Medical-trend-chart"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import React from 'react'
import { useSession } from "next-auth/react"

// Example usage in your page file
const dummyDoctors: { id: string; name: string; specialty: string; status: 'good' | 'bad' }[] = [
  { id: "doc1", name: "Dr. Amelia Hasan", specialty: "Cardiology", status: 'good' },
  { id: "doc2", name: "Dr. Budi Santoso", specialty: "Pediatrics", status: 'bad' },
  { id: "doc3", name: "Dr. Citra Dewi", specialty: "Neurology", status: 'good' },
]

const dummyFacilities: Array<{ id: string; name: string; type: string; status: 'good' | 'bad' }> = [
  { id: "fac1", name: "RS Harapan Kita", type: "General Hospital", status: 'good' },
  { id: "fac2", name: "Klinik Sehat Selalu", type: "Clinic", status: 'bad' },
  { id: "fac3", name: "Lab Medika Utama", type: "Laboratory", status: 'good' },
]

export default function GovernancePage() {

  const userSession = useSession();
  console.log("User Session:", userSession.data?.user || "No user session found");

  return (
    <div className="flex h-screen bg-[#E0F2F1] font-sans px-4">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Healthify Governance" />
        <ScrollArea className="flex-1">
          <main className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCardPlaceholder
                title="Burn Out Rate"
                items={dummyDoctors.map((doc) => ({ 
                  primary: doc.name, 
                  secondary: doc.specialty,
                  status: doc.status
                }))}
              />
              <InfoCardPlaceholder
                title="Facility Needs Rate"
                items={dummyFacilities.map((fac) => ({ 
                  primary: fac.name, 
                  secondary: fac.type,
                  status: fac.status
                }))}
              />
            </div>
            <div className="h-[350px] w-full">
              <MedicalTrendChart />
            </div>
          </main>
          <ScrollBar orientation="vertical" className="bg-teal-500 opacity-70 w-2.5 rounded-full" />
        </ScrollArea>
      </div>
    </div>
  )
}