"use client";

import { useActionState } from "react";
import { createInvoice, type ActionState } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ActionState = {
  status: "idle",
  message: "",
};

export default function CreateInvoiceForm() {
  const [state, formAction, isPending] = useActionState(
    createInvoice,
    initialState
  );

  return (
    <form
      action={formAction}
      className="pt-4 pl-4 pr-4 pb-9 bg-slate-50 border rounded-lg mb-6"
    >
      {state.status === "success" && (
        <p className="mb-4 text-sm text-green-600 font-medium">
          {state.message}
        </p>
      )}

      {state.status === "error" && !state.errors && (
        <p className="mb-4 text-sm text-red-600 font-medium">{state.message}</p>
      )}

      <div className="flex gap-4 items-end">
        <div className="grid w-full max-w-sm items-center gap-1.5 relative">
          <Label htmlFor="amount">Cantidad (€)</Label>
          <Input
            type="number"
            name="amount"
            id="amount"
            placeholder="0.00"
            step="0.01"
          />
          {state.errors?.amount && (
            <p className="text-xs text-red-500 absolute top-full mt-1">
              {state.errors.amount}
            </p>
          )}
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 relative">
          <Label htmlFor="status">Estado</Label>
          <select
            name="status"
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base md:text-sm"
          >
            <option value="pending">Pendiente</option>
            <option value="paid">Pagada</option>
          </select>
          {state.errors?.status && (
            <p className="text-xs text-red-500 absolute top-full mt-1">
              {state.errors.status}
            </p>
          )}
        </div>
        <Button type="submit" disabled={isPending} className="mt-auto w-32">
          {isPending ? "Guardando..." : "Enviar"}
        </Button>
      </div>
    </form>
  );
}
