import DoctorCard from "@/components/Doctor-card"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const doctors = [
  { id: "1", name: "Doctor A", status: "Flagged" },
  { id: "2", name: "Doctor B", status: "Flagged" },
  { id: "3", name: "Doctor C", status: "Flagged" },
  { id: "4", name: "Doctor D", status: "Clear" },
  { id: "5", name: "Doctor E", status: "Flagged" },
]

export default function DashboardMainContent() {
  return (
    <div className="flex h-screen bg-[#E0F2F1] px-4">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-16">
        <Header title="Healthify Governance" />
        <main className="flex-1 p-8 flex flex-col">
          <div className="relative w-full max-w-2xl mx-auto">
            <Input
              type="search"
              placeholder="Search"
              className="w-full h-14 pl-12 pr-4 rounded-full bg-gray-200 text-teal-700 placeholder-teal-600 text-lg border-none focus-visible:ring-2 focus-visible:ring-teal-500"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-teal-600" />
          </div>
          <div className="mt-8 space-y-4">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} name={doctor.name} status={doctor.status} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}