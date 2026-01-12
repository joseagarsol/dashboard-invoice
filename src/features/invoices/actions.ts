"use server";

import { db } from "@/db";
import { invoices } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createInvoice(formData: FormData) {
  const amountStr = formData.get("amount") as string;
  const status = formData.get("status") as string;

  const amount = Math.round(parseFloat(amountStr) * 100);

  await db.insert(invoices).values({
    amount,
    status,
  });

  revalidatePath("/");
}

