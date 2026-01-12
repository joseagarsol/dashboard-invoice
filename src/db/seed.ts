import { db } from "./index";
import { invoices } from "./schema";

async function main() {
  console.log("🌱 Sembrando base de datos...");

  await db.insert(invoices).values([
    { amount: 1000, status: "pending" },
    { amount: 2550, status: "paid" },
    { amount: 500, status: "pending" },
    { amount: 9900, status: "paid" },
  ]);

  console.log("✅ ¡Datos insertados!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Error al sembrar:", err);
  process.exit(1);
});
