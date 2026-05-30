import { db } from "@/lib/db/db";
import {
  deliveryPersons,
  inventories,
  orders,
  products,
  warehouses,
} from "@/lib/db/schema";
import { OrderSchema } from "@/lib/validators/OrderSchema";
import { and, eq, inArray, isNull } from "drizzle-orm";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  const session = await getServerSession();
  console.log(session);

  const data = await request.json;

  const validation = OrderSchema.safeParse(data);

  if (!validation.success) {
    return Response.json(
      { error: validation.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const warehouseResult = await db
    .select({ id: warehouses.id })
    .from(warehouses)
    .where(eq(warehouses.pincode, validation.data.pincode));

  if (!warehouseResult.length) {
    return Response.json({ message: "no warehouse found" }, { status: 400 });
  }

  const productResult = await db
    .select()
    .from(products)
    .where(eq(products.id, validation.data.productId))
    .limit(1);

  if (!productResult.length) {
    return Response.json({ message: "no product found" }, { status: 400 });
  }

  let transactionError: string = "";
  let finalOrder: any = null;

  try {
    //create order
    finalOrder = await db.transaction(async (tx) => {
      const orderResult = await tx
        .insert(orders)
        .values({
          ...validation.data,
          userId: session?.user.id,
          price: productResult[0].price * validation.data.qty,
          status: "received",
          type: "quick",
          productId: productResult[0].id,
        })
        .returning({ id: orders.id, price: orders.price });

      //check stock
      const availableStock = await tx
        .select()
        .from(inventories)
        .where(
          and(
            eq(inventories.warehouseId, warehouseResult[0].id),
            eq(inventories.productId, validation.data.productId),
            isNull(inventories.orderId),
          ),
        )
        .limit(validation.data.qty)
        .for("update", { skipLocked: true });

      if (availableStock.length < validation.data.qty) {
        transactionError = `Stock is low. only${availableStock.length} products available`;
        tx.rollback();
        return;
      }

      //check delivery person availability
      const availablePerson = await tx
        .select()
        .from(deliveryPersons)
        .where(
          and(
            isNull(deliveryPersons.orderId),
            eq(deliveryPersons.warehouseId, warehouseResult[0].id),
          ),
        )
        .for("update")
        .limit(1);

      if (!availablePerson.length) {
        transactionError = "delivery person is not available at the moment";
        tx.rollback();
        return;
      }

      //stock is available and stock is available
      //update inventories table and add order_id

      await tx
        .update(inventories)
        .set({ orderId: orderResult[0].id })
        .where(
          inArray(
            inventories.id,
            availableStock.map((stock) => stock.id),
          ),
        );

      //update delivery person order_id
      await tx
        .update(deliveryPersons)
        .set({ orderId: orderResult[0].id })
        .where(eq(deliveryPersons.id, availablePerson[0].id));

      await tx
        .update(orders)
        .set({ status: "reserved" })
        .where(eq(orders.id, orderResult[0].id));

      return orderResult[0];
    });
  } catch (error) {
    return Response.json(
      {
        message: transactionError
          ? transactionError
          : "Error while db transaction",
      },
      { status: 500 },
    );
  }

  //payment
}
