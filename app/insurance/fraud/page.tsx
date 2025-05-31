import Sidebar from "../../../components/Sidebar"
import Header from "../../../components/Header"
import ClaimCard from "../../../components/ClaimCard"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"

type Claim = {
  id: string
  user: string
  value: string
  description: string
  status: "Accepted" | "Flagged" | "On Going" | "On Hold"
}

const claimsData: Claim[] = [
  { id: "HC001", user: "John Doe", value: "$150.00", description: "Routine check-up", status: "Accepted" },
  { id: "HC002", user: "Jane Smith", value: "$320.50", description: "Dental cleaning", status: "Accepted" },
  { id: "HC003", user: "Alice Brown", value: "$85.75", description: "Prescription refill", status: "Accepted" },
  { id: "HC004", user: "Bob Green", value: "$1200.00", description: "Emergency visit", status: "Flagged" },
  { id: "HC005", user: "Carol White", value: "$450.00", description: "Specialist consultation", status: "Flagged" },
  { id: "HC006", user: "David Black", value: "$95.20", description: "Lab tests", status: "Flagged" },
  { id: "HC007", user: "Eve Blue", value: "$600.00", description: "Physiotherapy session", status: "On Going" },
  { id: "HC008", user: "Frank Gold", value: "$210.00", description: "Vision test", status: "On Going" },
  { id: "HC009", user: "Grace Silver", value: "$75.00", description: "Vaccination", status: "On Going" },
  { id: "HC010", user: "Henry Purple", value: "$50.00", description: "Minor procedure", status: "On Hold" },
  { id: "HC011", user: "Ivy Red", value: "$180.00", description: "Follow-up appointment", status: "On Hold" },
  { id: "HC012", user: "Jack Orange", value: "$300.00", description: "Medical supplies", status: "On Hold" },
  { id: "HC010", user: "Henry Purple", value: "$50.00", description: "Minor procedure", status: "On Hold" },
  { id: "HC011", user: "Ivy Red", value: "$180.00", description: "Follow-up appointment", status: "On Hold" },
  { id: "HC012", user: "Jack Orange", value: "$300.00", description: "Medical supplies", status: "On Hold" },
]

export default function HealthifyClaimsPage() {
  return (
    <div className="flex h-screen bg-[#E6F7F6] font-sans px-20 ml-[-4rem]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="relative w-full max-w-2xl mx-auto">
                <Input
                type="search"
                placeholder="Search"
                className="w-full h-14 pl-12 pr-4 rounded-full bg-gray-200 text-teal-700 placeholder-teal-600 text-lg border-none focus-visible:ring-2 focus-visible:ring-teal-500"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-teal-600" />
            </div>
        <main className="flex-1 flex flex-col p-6 md:p-8 space-y-6 md:space-y-8 max-w-[900px] mx-auto w-full">
            {/* 🟩 Scrollable claim card container */}
            <div className="h-[455px] overflow-y-auto pr-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {claimsData.map((claim) => (
                    <ClaimCard key={claim.id} claim={claim} />
                ))}
                </div>
            </div>
            </main>
      </div>
    </div>
  )
}