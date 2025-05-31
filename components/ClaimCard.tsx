import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface Claim {
  id: string
  user: string
  value: string
  description: string
  status: "Accepted" | "Flagged" | "On Going" | "On Hold"
}

interface ClaimCardProps {
  claim: Claim
}

export default function ClaimCard({ claim }: ClaimCardProps) {
  const getStatusColor = (status: Claim["status"]) => {
    switch (status) {
      case "Accepted":
        return "bg-green-500 hover:bg-green-600"
      case "Flagged":
        return "bg-red-500 hover:bg-red-600"
      case "On Going":
        return "bg-orange-500 hover:bg-orange-600"
      case "On Hold":
        return "bg-yellow-400 hover:bg-yellow-500 text-yellow-900" // Lighter status as in image
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  return (
    <Card className="
        bg-white shadow-lg rounded-xl overflow-hidden transition-all hover:shadow-xl
        w-[270px] /* CONTOH: Mengatur lebar card menjadi 300 piksel */
        h-[130px]
    ">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-gray-800">{claim.id}</CardTitle>
          <Badge className={cn("text-xs font-medium text-white px-3 py-1 rounded-full", getStatusColor(claim.status))}>
            {claim.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-gray-600">
        <p>
          <span className="font-small text-gray-700">User:</span> {claim.user}
        </p>
        <p>
          <span className="font-small text-gray-700">Value:</span> {claim.value}
        </p>
        <p>
          <span className="font-small text-gray-700">Description:</span>
        </p>
        <CardDescription className="text-xs text-gray-500 leading-relaxed h-12 overflow-hidden text-ellipsis">
          {claim.description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}