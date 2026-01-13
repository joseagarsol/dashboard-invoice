"use server";

import { db } from "@/db";
import { invoices } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { createInvoiceSchema } from "./schemas";

export type ActionState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: {
    amount?: string[];
    status?: string[];
  };
};

export async function createInvoice(
  prevState: ActionState,
  formData: FormData
) {
  const rawData = {
    amount: formData.get("amount"),
    status: formData.get("status"),
  };

  const validateFields = createInvoiceSchema.safeParse(rawData);

  if (!validateFields.success) {
    return {
      status: "error",
      message: "Por favor, revisa los campos del formulario.",
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  try {
    await db.insert(invoices).values({
      amount: Math.round(validateFields.data.amount * 100),
      status: validateFields.data.status,
    });

    revalidatePath("/");

    return {
      status: "success",
      message: "Factura creada correctamente.",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Error en la base de datos. Inténtalo de nuevo.",
    };
  }
}
