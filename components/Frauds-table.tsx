import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal, CalendarDays } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const fraudData = [
  { hospitalId: "#876364", hospitalName: "Siloam", procedureCode: "1", totalAmount: "$1,46,990" },
  { hospitalId: "#876368", hospitalName: "Medistra", procedureCode: "2", totalAmount: "$46,990" },
  { hospitalId: "#876412", hospitalName: "Mayapada", procedureCode: "3", totalAmount: "$3,46,676" },
  { hospitalId: "#876621", hospitalName: "RS Pondok Indah", procedureCode: "4", totalAmount: "$2,46,981" },
  { hospitalId: "#876789", hospitalName: "RS Cipto Mangunkusumo", procedureCode: "5", totalAmount: "$1,88,500" },
  { hospitalId: "#876364", hospitalName: "Siloam", procedureCode: "1", totalAmount: "$1,46,990" },
  { hospitalId: "#876368", hospitalName: "Medistra", procedureCode: "2", totalAmount: "$46,990" },
  { hospitalId: "#876412", hospitalName: "Mayapada", procedureCode: "3", totalAmount: "$3,46,676" },
  { hospitalId: "#876621", hospitalName: "RS Pondok Indah", procedureCode: "4", totalAmount: "$2,46,981" },
  { hospitalId: "#876789", hospitalName: "RS Cipto Mangunkusumo", procedureCode: "5", totalAmount: "$1,88,500" },
]

export default function FraudsTable() {
  return (
    <Card className="w-[845px] h-[300px] shadow-lg rounded-xl flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-xl font-semibold text-gray-800">Frauds</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-sm text-gray-700">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                Jun 2022
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>May 2022</DropdownMenuItem>
              <DropdownMenuItem>Jun 2022</DropdownMenuItem>
              <DropdownMenuItem>Jul 2022</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
            <ChevronRight className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
            <MoreHorizontal className="h-5 w-5" />
            <span className="sr-only">More options</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto"> {/* Added flex-grow and overflow-y-auto */}
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10"> {/* Added sticky and bg-white */}
            <TableRow className="border-b-gray-200">
              <TableHead className="text-gray-600 font-medium">Hospital Id</TableHead>
              <TableHead className="text-gray-600 font-medium">Hospital Name</TableHead>
              <TableHead className="text-gray-600 font-medium">Procedure Code</TableHead>
              <TableHead className="text-right text-gray-600 font-medium">Total Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fraudData.map((fraud) => (
              <TableRow key={fraud.hospitalId} className="border-b-gray-100 hover:bg-gray-50">
                <TableCell className="text-gray-700 py-3">{fraud.hospitalId}</TableCell>
                <TableCell className="text-gray-700 py-3">{fraud.hospitalName}</TableCell>
                <TableCell className="text-gray-700 py-3">{fraud.procedureCode}</TableCell>
                <TableCell className="text-right text-gray-700 py-3">{fraud.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}