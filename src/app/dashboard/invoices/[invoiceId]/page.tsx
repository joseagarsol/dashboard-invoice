import { db } from "@/db";
import { invoices } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";

type PageProps = {
  params: Promise<{ invoiceId: string }>;
};

export default async function InvoicePage({ params }: PageProps) {
  const { invoiceId } = await params;

  if (isNaN(Number(invoiceId))) {
    throw new Error("ID de factura inválido");
  }

  const [invoice] = await db
    .select()
    .from(invoices)
    .where(eq(invoices.id, Number(invoiceId)))
    .limit(1);

  if (!invoice) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          Factura <span className="text-slate-400">#{invoice.id}</span>
        </h1>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            invoice.status === "paid"
          } ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
        >
          {invoice.status === "paid" ? "Pagada" : "Pendiente"}
        </span>
      </div>

      <div className="bg-slate-50 p-6 rounded-lg border space-y-4">
        <div>
          <h3 className="text-sm font-medium text-slate-500">Total a pagar</h3>
          <p className="text-4xl font-bold text-slate-900">
            {(invoice.amount / 100).toFixed(2)}€
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-slate-500">
            Fecha de creación
          </h3>
          <p className="text-lg">
            {new Date(invoice.createAt).toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </main>
  );
}
