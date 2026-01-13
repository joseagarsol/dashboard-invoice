import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 gap-6">
      <h1 className="text-5xl font-extrabold tracking-tight">
        Invoice<span className="text-blue-600">App</span>
      </h1>
      <p className="text-xl text-gray-500">
        Gestiona tus facturas como un profesional.
      </p>
      <Link href="/dashboard">
        <Button size="lg">Entrar al Dashboard</Button>
      </Link>
    </main>
  );
}
