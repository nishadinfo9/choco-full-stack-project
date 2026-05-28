import { db } from "@/lib/db/db";
import { inventories } from "@/lib/db/schema";
import { InventorySchema } from "@/lib/validators/InventorySchema";

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

export async function GET(request: Request) {}
