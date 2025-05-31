"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface MonthlyTrendData {
  month: string
  value: number
}

const sampleMonthlyData: MonthlyTrendData[] = [
  { month: "Jan", value: 65 },
  { month: "Feb", value: 45 },
  { month: "Mar", value: 70 },
  { month: "Apr", value: 50 },
  { month: "May", value: 80 },
  { month: "Jun", value: 60 },
  { month: "Jul", value: 75 },
  { month: "Jan", value: 65 },
  { month: "Feb", value: 150 },
  { month: "Mar", value: 70 },
  { month: "Apr", value: 50 },
  { month: "Mar", value: 70 },
  { month: "Apr", value: 50 },
]

export default function MedicalTrendChart() {
  const [activeFilter, setActiveFilter] = useState("Monthly")
  const filters = ["Daily", "Weekly", "Monthly"]
  const [chartData, setChartData] = useState(sampleMonthlyData)

  // Find the maximum value for scaling
  const maxDataValue = Math.max(...chartData.map(data => data.value)) || 100

  const chartHeight = 150
  const barWidth = 40
  const barSpacing = 50

  return (
    <Card className="h-[315px] shadow-lg rounded-xl bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold text-gray-800">Top Medical Trend</CardTitle>
        <div className="flex items-center space-x-1">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-md px-3 py-1 text-sm ${
                activeFilter === filter 
                  ? "bg-gray-200 text-gray-800 font-medium" 
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[215px] flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4">
          <div className="w-full h-[200px] relative">
            <svg viewBox={`0 0 ${chartData.length * (barWidth + barSpacing) + 40} ${chartHeight + 30}`} 
                 className="w-full h-full">
              {/* Y-axis grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((val) => (
                <line
                  key={val}
                  x1="30"
                  y1={chartHeight - val * chartHeight + 4}
                  x2={chartData.length * (barWidth + barSpacing) + 30}
                  y2={chartHeight - val * chartHeight}
                  stroke="#e0e0e0"
                  strokeDasharray="2,2"
                />
              ))}
              
              {/* Y-axis labels */}
              {[0, 0.25, 0.5, 0.75, 1].map((val) => (
                <text
                  key={`label-${val}`}
                  x="25"
                  y={chartHeight - val * chartHeight + 10}
                  fontSize="10"
                  fill="gray"
                  textAnchor="end"
                >
                  {Math.round(val * maxDataValue)}
                </text>
              ))}

              {/* Bars */}
              {chartData.map((data, index) => {
                const barHeight = (data.value / maxDataValue) * chartHeight
                const x = 30 + index * (barWidth + barSpacing)

                return (
                  <g key={data.month}>
                    <rect
                      x={x}
                      y={chartHeight - barHeight + 5}
                      width={barWidth}
                      height={barHeight}
                      fill="#14b8a6"
                      rx="4"
                      ry="4"
                      className="transition-all duration-300 hover:fill-teal-500"
                    />
                    <text
                      x={x + barWidth / 2}
                      y={chartHeight + 20}
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
        </div>
      </CardContent>
    </Card>
  )
}