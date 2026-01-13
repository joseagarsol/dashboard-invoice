import { z } from "zod";

export const createInvoiceSchema = z.object({
  amount: z.coerce.number().min(1, "La cantidad debe ser mayor a 0"),
  status: z.enum(["peding", "paid"], {
    message: "Selecciona un estado válido",
  }),
});

export type CreateInvoiceSchema = z.infer<typeof createInvoiceSchema>;
