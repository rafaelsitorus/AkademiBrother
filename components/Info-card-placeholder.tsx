import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface InfoItem {
  primary: string
  secondary: string
  status?: 'good' | 'bad'
}

interface InfoCardPlaceholderProps {
  title: string
  items: InfoItem[]
}

export default function InfoCardPlaceholder({ title, items }: InfoCardPlaceholderProps) {
  return (
    <Card className="shadow-lg rounded-xl bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">{title}</CardTitle>
      </CardHeader>
      <ScrollArea className="h-[250px]">
        <CardContent className="space-y-3 pr-4">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-teal-100 rounded-lg h-auto min-h-[3rem]">
              <div className="flex-grow">
                <p className="text-sm font-medium text-teal-800">{item.primary}</p>
                <p className="text-xs text-teal-600">{item.secondary}</p>
              </div>
              <div 
                className={`w-20 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${
                  item.status === 'bad' ? 'bg-red-400' : 'bg-blue-400'
                }`}
              >
                <span className={`text-xs font-medium text-white`}>
                  {item.status === 'bad' ? 'Bad' : 'Good'}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
        <ScrollBar orientation="vertical" className="bg-teal-500 opacity-70 w-2.5 rounded-full" />
      </ScrollArea>
    </Card>
  )
}