import { db } from "@/lib/db/db";
import { inventories, products, warehouses } from "@/lib/db/schema";
import { InventorySchema } from "@/lib/validators/InventorySchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
  const data = await request.json();

  const validation = InventorySchema.safeParse(data);

  if (!validation.success) {
    return Response.json(
      { error: validation.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    await db.insert(inventories).values(validation.data);
    return Response.json(
      { message: "inventories created successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log("failed to store the inventories", error);
    return Response.json(
      { message: "failed to store the inventories" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const allInventories = await db
      .select({
        id: inventories.id,
        sku: inventories.sku,
        warehouse: warehouses.name,
        product: products.name,
      })
      .from(inventories)
      .leftJoin(warehouses, eq(inventories.warehouseId, warehouses.id))
      .leftJoin(products, eq(inventories.productId, products.id))
      .orderBy(desc(inventories.id));

    return Response.json(
      { message: "get all inventories successfully", allInventories },
      { status: 200 },
    );
  } catch (error) {
    console.log("failed to get all inventories", error);
    return Response.json(
      { message: "failed to get all inventories" },
      { status: 500 },
    );
  }
}
