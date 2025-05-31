"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface MonthlyClaimData {
  month: string
  accepted: number
  pending: number
  fraud: number
}

const sampleMonthlyData: MonthlyClaimData[] = [
  { month: "Jan", accepted: 70, pending: 20, fraud: 10 },
  { month: "Feb", accepted: 60, pending: 25, fraud: 15 },
  { month: "Mar", accepted: 80, pending: 10, fraud: 5 },
  { month: "Apr", accepted: 50, pending: 30, fraud: 20 },
  { month: "May", accepted: 75, pending: 15, fraud: 10 },
  { month: "Jun", accepted: 65, pending: 20, fraud: 15 },
  { month: "Jul", accepted: 90, pending: 5, fraud: 5 },
]

const statusColors = {
  accepted: "#36A2EB", // Blue
  pending: "#FFCE56", // Yellow
  fraud: "#FF6384", // Red
}

const legendItems = [
  { label: "Accepted", color: statusColors.accepted },
  { label: "Pending", color: statusColors.pending },
  { label: "Fraud", color: statusColors.fraud },
]

export default function FraudClaimsChart() {
  const [activeFilter, setActiveFilter] = useState("Monthly")
  const filters = ["Daily", "Weekly", "Monthly"]
  const [chartData, setChartData] = useState(sampleMonthlyData)

  // Find the maximum value across all categories for scaling
  const maxDataValue =
    chartData.reduce((max, monthData) => {
      return Math.max(max, monthData.accepted, monthData.pending, monthData.fraud)
    }, 0) || 100 // Ensure a minimum height if all values are 0

  const chartHeight = 150 // SVG internal height for bars
  const barGroupWidth = 100 // Total width for a group of 3 bars + spacing
  const individualBarWidth = 20 // Width of a single bar
  const barSpacing = 10 // Spacing between bars in a group

  return (
    <Card className="w-[845px] h-[350px] shadow-lg rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold text-gray-800">Fraud Claims Overview</CardTitle>
        <div className="flex items-center space-x-1">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-md px-3 py-1 text-sm ${
                activeFilter === filter ? "bg-gray-200 text-gray-800 font-medium" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[255px] flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4 pt-1">
          <div className="w-full h-[200px] relative">
            <svg viewBox={`0 0 ${chartData.length * barGroupWidth + 40} ${chartHeight + 30}`} className="w-full h-full">
              {/* Y-axis lines (example) */}
              {[0, 0.25, 0.5, 0.75, 1].map((val) => (
                <line
                  key={val}
                  x1="30"
                  y1={chartHeight - val * chartHeight}
                  x2={chartData.length * barGroupWidth + 30}
                  y2={chartHeight - val * chartHeight}
                  stroke="#e0e0e0"
                  strokeDasharray="2,2"
                />
              ))}
              {/* Y-axis labels (example) */}
              {[0, 0.25, 0.5, 0.75, 1].map((val) => (
                <text
                  key={`label-${val}`}
                  x="25"
                  y={chartHeight - val * chartHeight + 4}
                  fontSize="10"
                  fill="gray"
                  textAnchor="end"
                >
                  {Math.round(val * maxDataValue)}
                </text>
              ))}

              {chartData.map((data, groupIndex) => {
                const groupX = 30 + groupIndex * barGroupWidth

                // Accepted bar
                const accHeight = (data.accepted / maxDataValue) * chartHeight
                // Pending bar
                const pendHeight = (data.pending / maxDataValue) * chartHeight
                // Fraud bar
                const fraudHeight = (data.fraud / maxDataValue) * chartHeight

                return (
                  <g key={data.month}>
                    {/* Accepted Bar */}
                    <rect
                      x={groupX}
                      y={chartHeight - accHeight}
                      width={individualBarWidth}
                      height={accHeight}
                      fill={statusColors.accepted}
                      rx="2"
                      ry="2"
                    />
                    {/* Pending Bar */}
                    <rect
                      x={groupX + individualBarWidth + barSpacing}
                      y={chartHeight - pendHeight}
                      width={individualBarWidth}
                      height={pendHeight}
                      fill={statusColors.pending}
                      rx="2"
                      ry="2"
                    />
                    {/* Fraud Bar */}
                    <rect
                      x={groupX + 2 * (individualBarWidth + barSpacing)}
                      y={chartHeight - fraudHeight}
                      width={individualBarWidth}
                      height={fraudHeight}
                      fill={statusColors.fraud}
                      rx="2"
                      ry="2"
                    />
                    {/* X-axis label for the group */}
                    <text
                      x={groupX + barGroupWidth / 2 - individualBarWidth / 2}
                      y={chartHeight + 15}
                      fontSize="10"
                      fill="gray"
                      textAnchor="middle"
                    >
                      {data.month}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
          <div style={{ marginTop: "-1px" }} className="flex justify-center space-x-6">
            {legendItems.map((item) => (
              <div key={item.label} className="flex items-center space-x-1.5">
                <span style={{ backgroundColor: item.color }} className="h-3 w-3 rounded-full"></span>
                <span className="text-xs text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}