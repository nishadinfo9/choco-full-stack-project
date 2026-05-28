import { db } from "@/lib/db/db";
import { deliveryPersons } from "@/lib/db/schema";
import { deliveryPersonSchema } from "@/lib/validators/DeliveryPersonSchema";

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
