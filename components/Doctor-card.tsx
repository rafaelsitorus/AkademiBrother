import { Card } from "@/components/ui/card";

interface DoctorCardProps {
  name: string;
  score: number | null;
  location?: string;
}

export default function DoctorCard({ name, score, location }: DoctorCardProps) {
  // Determine risk level color based on score
  const getScoreColor = (score: number | null) => {
    if (score === null) return "bg-gray-200 text-gray-500";
    if (score >= 70) return "bg-red-500 text-white";
    if (score >= 30) return "bg-orange-500 text-white";
    return "bg-green-500 text-white";
  };

  // In your Doctor-card.tsx file
return (
  <Card className="p-3 bg-white border border-gray-200 shadow-sm rounded-lg">
    <div className="flex justify-between items-center">
      <div className="truncate mr-3">
        <h3 className="font-medium text-gray-900 truncate">{name}</h3>
        {location && (
          <p className="text-xs text-gray-500 truncate">{location}</p>
        )}
      </div>
      
      <div className="flex-shrink-0">
        {score !== null ? (
          <div className={`${getScoreColor(score)} w-10 h-10 rounded-full flex items-center justify-center text-base font-bold`}>
            {score}
          </div>
        ) : (
          <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-xs text-gray-500 font-medium">
            N/A
          </div>
        )}
      </div>
    </div>
  </Card>
);
}