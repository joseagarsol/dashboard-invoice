import Link from "next/link";
import { LayoutDashboard, FileText, Users, Settings } from "lucide-react";

const links = [
  { name: "Resumen", href: "/dashboard", icon: LayoutDashboard },
  { name: "Facturas", href: "dashboard/invoices", icon: FileText },
  { name: "Clientes", href: "dashboard/customers", icon: Users },
  { name: "Configuración", href: "dashboard/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-slate-900 text-white">
      <div className="flex h-16 items-center justify-center border-b border-slate-800">
        <h2 className="text-2xl font-bold">SaaS B2B</h2>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              <Icon className="h-5 w-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <p className="text-xs text-slate-500">Logueado como Admin</p>
      </div>
    </div>
  );
}
