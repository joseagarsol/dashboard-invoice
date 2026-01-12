import { createInvoice } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateInoviceForm() {
  return (
    <form
      action={createInvoice}
      className="p-4 bg-slate-50 border rounded-lg mb-6"
    >
      <div className="flex gap-4 items-end">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="amount">Cantidad (€)</Label>
          <Input
            type="number"
            name="amount"
            id="amount"
            placeholder="0.00"
            step="0.01"
            required
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="status">Estado</Label>
          <select
            name="status"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="pending">Pendiente</option>
            <option value="paid">Pagada</option>
          </select>
        </div>
      </div>
      <Button type="submit">Crear Factura</Button>
    </form>
  );
}
