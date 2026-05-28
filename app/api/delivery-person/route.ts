import { db } from "@/lib/db/db";
import { deliveryPersons, warehouses } from "@/lib/db/schema";
import { deliveryPersonSchema } from "@/lib/validators/DeliveryPersonSchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
  const data = await request.json();

  const validation = deliveryPersonSchema.safeParse(data);

  if (!validation.success) {
    return Response.json(
      { errors: validation.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    await db.insert(deliveryPersons).values(validation.data);

    return Response.json(
      { message: "deliveryPerson created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.log("failed to store deliveryPerson into database", error);
    return Response.json(
      { message: "failed to store deliveryPerson into database" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const allDeliveryPersons = await db
      .select({
        id: deliveryPersons.id,
        name: deliveryPersons.name,
        phone: deliveryPersons.phone,
        warehouse: warehouses.name,
      })
      .from(deliveryPersons)
      .leftJoin(warehouses, eq(deliveryPersons.id, warehouses.id))
      .orderBy(desc(deliveryPersons.id));

    return Response.json(
      { message: "get all deliveryPerson successfully", allDeliveryPersons },
      { status: 200 },
    );
  } catch (error) {
    console.log("failed to get deliveryPerson into database", error);
    return Response.json(
      { message: "failed to get deliveryPerson into database" },
      { status: 500 },
    );
  }
}
