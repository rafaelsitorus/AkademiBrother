import { UserCircle2 } from "lucide-react"
interface HeaderProps {
  title: string;
}

export default function Header({title}: HeaderProps) {
  return (
    <header className="h-20 flex items-center justify-between px-6 md:px-8 bg-transparent">
      <h1 className="text-3xl font-bold text-gray-800">Healthify Claims</h1>
      <button aria-label="User Profile">
        <UserCircle2 className="h-10 w-10 text-gray-700" />
      </button>
    </header>
  )
}