import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { ProductSchema } from "@/lib/validators/ProductSchema";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import fs from "fs";
import { desc } from "drizzle-orm";

export async function POST(request: Request) {
  //validate if user acceced for create product
  const formData = await request.formData();

  console.log("formData", formData);

  const validation = ProductSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    image: formData.get("image"),
  });

  console.log("validation", validation);

  if (!validation.success) {
    return Response.json(
      { errors: validation.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const product = validation.data;

  const fileName = `${Date.now()}.${product.image.name.split(".").slice(-1)}`; //4151546186.png

  try {
    const buffer = Buffer.from(await product.image.arrayBuffer());
    await writeFile(
      path.join(process.cwd(), "/public/assets", fileName),
      buffer,
    );
  } catch (error) {
    return Response.json(
      { message: "failed to save the file to fs" },
      { status: 500 },
    );
  }

  try {
    await db.insert(products).values({ ...product, image: fileName });
  } catch (error) {
    const filePath = path.join(process.cwd(), "public/assets", fileName);
    await fs.promises.unlink(filePath);

    return Response.json(
      { message: "failed to store product into database" },
      { status: 500 },
    );
  }

  return Response.json(
    { message: "product created successfully" },
    { status: 201 },
  );
}

export async function GET(request: Request) {

  const {searchParams} = new URL(request.url)
  const limitParams = searchParams.get('limit')
  const limit =   limitParams ? Number(limitParams) : 10


  try {
    const allProducts = await db
      .select()
      .from(products)
      .orderBy(desc(products.id))
      .limit(limit)
      

    return Response.json(allProducts, { status: 200 });
  } catch (error) {
    console.log("falied to fetch products", error);
    return Response.json(
      { message: "falied to fetch products" },
      { status: 500 },
    );
  }
}
