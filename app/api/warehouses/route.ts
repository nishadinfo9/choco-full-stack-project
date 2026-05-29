import { db } from "@/lib/db/db";
import { warehouses } from "@/lib/db/schema";
import { WarehouseSchema } from "@/lib/validators/warehouseSchema";

export async function POST(request: Request) {
  //TODO: check authentication
  const data = await request.json();

  const validation = WarehouseSchema.safeParse(data);

  if (!validation.success) {
    return Response.json(
      { errors: validation.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    await db.insert(warehouses).values(validation.data);
  } catch (error) {
    console.log("failed to store the warehouse", error);
    return Response.json(
      { message: "failed to store the warehouse" },
      { status: 500 },
    );
  }

  return Response.json(
    { message: "warehouse created successfully" },
    { status: 200 },
  );
}

export async function GET() {
  try {
    const allWarehouses = await db.select().from(warehouses);

    return Response.json(allWarehouses, { status: 200 });
  } catch (error) {
    console.log("failed to fetch allWearhouses", error);
    return Response.json(
      { message: "failed to fetch allWearhouses" },
      { status: 500 },
    );
  }
}
