import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(),
  status: text("status").notNull(),
  createAt: timestamp("created_at").defaultNow().notNull(),
});
