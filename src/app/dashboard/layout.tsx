import { Sidebar } from "@/components/layout/Sidebar";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <aside className="hidden md:block">
        <Sidebar />
      </aside>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <header className="flex h-16 items-center justify-end border-b px-6 bg-white shadow-sm">
          {/*TODO: AQUÍ SE PODRÍA INCLUIR UN USERMENÚ O UN AVATAR*/}
          <div className="h-8 w-8 rounded-full bg-slate-200"></div>
        </header>
        <main className="flex-1 p-6 md:p-12">{children}</main>
      </div>
    </div>
  );
}
