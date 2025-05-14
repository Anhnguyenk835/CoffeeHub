import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Home, Heart, Info, User } from "lucide-react"

export default function Sidebar() {
  const location = useLocation();
  
  return (
    <aside className="w-[220px] border-r border-[#d9d9d9] p-6 flex flex-col h-screen sticky top-0">
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-[#6c584c]">CoffeeChat</h1>
      </div>

      <nav className="space-y-4">
        <NavItem href="/home" icon={<Home size={20} />} label="Home" active={location.pathname === "/home"} />
        <NavItem href="/favorites" icon={<Heart size={20} />} label="Favorites" active={location.pathname.startsWith("/favorites")} />
        <NavItem href="/about" icon={<Info size={20} />} label="About" active={location.pathname === "/about"} />
        <NavItem href="/login" icon={<User size={20} />} label="Log in" active={location.pathname === "/login"} />
      </nav>
    </aside>
  )
}

function NavItem({
  href,
  icon,
  label,
  active = false,
}: {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  return (
    <Link
      to={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        active ? "text-[#adc178] font-medium" : "text-[#6c584c]/70 hover:text-[#6c584c] hover:bg-[#adc178]/10"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

