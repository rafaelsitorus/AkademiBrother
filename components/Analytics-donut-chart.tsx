import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AnalyticsDonutChart() {
  const legendItems = [
    { label: "Acc", color: "bg-blue-500" },
    { label: "Pending", color: "bg-yellow-400" },
    { label: "Fraud", color: "bg-red-500" },
  ]

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold text-gray-800">Analytics</CardTitle>
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
          <MoreHorizontal className="h-5 w-5" />
          <span className="sr-only">More options</span>
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-40 h-40 my-4">
          {/* Donut chart SVG placeholder */}
          <svg viewBox="0 0 36 36" className="w-full h-full">
            <path
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#FF6384" // Fraud - Red
              strokeWidth="3.8"
            />
            <path
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831"
              fill="none"
              stroke="#FFCE56" // Pending - Yellow
              strokeWidth="3.8"
              strokeDasharray="30, 100" // 30% for Pending
            />
            <path
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831"
              fill="none"
              stroke="#36A2EB" // Acc - Blue
              strokeWidth="3.8"
              strokeDasharray="80, 100" // 80% for Acc
            />
            <text x="18" y="16.85" className="fill-gray-800 text-[0.2em] font-semibold" textAnchor="middle">
                80%
            </text>
            <text x="18" y="20.85" className="fill-gray-500 text-[0.2em]" textAnchor="middle">
                Completion
            </text>
          </svg>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          {legendItems.map((item) => (
            <div key={item.label} className="flex items-center space-x-1.5">
              <span className={`h-3 w-3 rounded-full ${item.color}`}></span>
              <span className="text-xs text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
