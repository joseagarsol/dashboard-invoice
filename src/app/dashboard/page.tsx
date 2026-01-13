import { db } from "@/db";
import { invoices } from "@/db/schema";
import CreateInoviceForm from "@/features/invoices/components/CreateInvoiceForm";
import Link from "next/link";

export default async function Home() {
  const allInvoices = await db.select().from(invoices);

  return (
    <main className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">Mis Facturas</h1>
      <CreateInoviceForm />

      <div className="border rounded-lg shadow-sm">
        {allInvoices.map((invoice) => (
          <Link
            key={invoice.id}
            href={`/dashboard/invoices/${invoice.id}`}
            className="flex justify-between p-4 border-b last:border-0 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div
              key={invoice.id}
              className="flex justify-between p-4 border-b last:border-0 hover:bg-slate-50"
            >
              <div>
                <p className="font-medium">Factura #{invoice.id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(invoice.createAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">
                  {(invoice.amount / 100).toFixed(2)}€
                </p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    invoice.status === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {invoice.status}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
