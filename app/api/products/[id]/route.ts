import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, Number(id)))
      .limit(1);

    if (!product.length) {
      return Response.json({ message: "product not found" }, { status: 400 });
    }

    return Response.json(
      { message: "product found successfully", product: product[0] },
      { status: 200 },
    );
  } catch (error) {
    console.log("falied to fetch product", error);
    return Response.json(
      { message: "falied to fetch product" },
      { status: 500 },
    );
  }
}
