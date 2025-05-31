import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface DoctorCardProps {
  name: string
  status: string
}

export default function DoctorCard({ name = "Doctor Name", status = "Flagged" }: DoctorCardProps) {
  return (
    <Card className="w-full shadow-md rounded-xl">
      <CardContent className="p-6 flex items-center justify-between">
        <h3 className="text-xl font-medium text-slate-700">{name}</h3>
        <div className="flex items-center space-x-3">
          {status === "Flagged" && (
            <Badge variant="destructive" className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
              {status}
            </Badge>
          )}
          {status !== "Flagged" && (
            <Badge
              className={cn(
                "px-3 py-1 rounded-full text-sm",
                status === "Clear" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700",
              )}
            >
              {status}
            </Badge>
          )}
          <ChevronDown className="w-5 h-5 text-slate-500 cursor-pointer" />
        </div>
      </CardContent>
    </Card>
  )
}