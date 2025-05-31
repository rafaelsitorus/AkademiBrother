import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

type FraudData = {
  hospitalId: string
  hospitalName: string
  procedureCode: string
  totalAmount: string
}

export default function FraudsTable() {
  const [fraudData, setFraudData] = useState<FraudData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFraudData() {
      try {
        setLoading(true)
        const response = await fetch("/api/fraudHome")
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        setFraudData(data)
      } catch (err) {
        console.error("Failed to fetch fraud data:", err)
        setError("Could not load fraud data")
      } finally {
        setLoading(false)
      }
    }
    
    fetchFraudData()
  }, [])

  return (
    <Card className="w-[845px] h-[300px] shadow-lg rounded-xl flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-xl font-semibold text-gray-800">Frauds</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
            <ChevronRight className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
            <MoreHorizontal className="h-5 w-5" />
            <span className="sr-only">More options</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">Loading fraud data...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow className="border-b-gray-200">
                <TableHead className="text-gray-600 font-medium">Hospital ID</TableHead>
                <TableHead className="text-gray-600 font-medium">Hospital Name</TableHead>
                <TableHead className="text-gray-600 font-medium">Procedure Code</TableHead>
                <TableHead className="text-right text-gray-600 font-medium">Total Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fraudData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                    No fraud data available
                  </TableCell>
                </TableRow>
              ) : (
                fraudData.map((fraud, index) => (
                  <TableRow key={`${fraud.hospitalId}-${fraud.procedureCode}-${index}`} className="border-b-gray-100 hover:bg-gray-50">
                    <TableCell className="text-gray-700 py-3">{fraud.hospitalId}</TableCell>
                    <TableCell className="text-gray-700 py-3">{fraud.hospitalName}</TableCell>
                    <TableCell className="text-gray-700 py-3">{fraud.procedureCode}</TableCell>
                    <TableCell className="text-right text-gray-700 py-3">{fraud.totalAmount}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}