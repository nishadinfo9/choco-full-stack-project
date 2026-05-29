import { Product } from "@/types/type";
import Image from "next/image";
import Link from "next/link";


export default function ProductCard({ product }: {product: Product}) {
  return (
    <div className="group bg-white border border-[#E7D7C9] rounded-md overflow-hidden hover:shadow-lg transition duration-300">

      {/* Image */}
      <div className="aspect-square overflow-hidden bg-[#FAF7F2]">
        <Link href={`/products/${product.id}`}>
        <Image
          src={`/assets/${product.image}` || '/product1.jpg'}
          alt={product.name}
          height={500}
          width={500}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        </Link>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-[#2B1D16] font-medium text-base">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-[#6B3E2E] font-semibold">
            ${product.price}
          </p>

          <button className="text-xs px-3 py-1.5 rounded-full border border-[#6B3E2E] text-[#6B3E2E] hover:bg-[#6B3E2E] hover:text-white transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}