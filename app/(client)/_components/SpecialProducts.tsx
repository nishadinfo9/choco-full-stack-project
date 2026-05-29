import { Product } from "@/types/type";
import Container from "./Container";
import ProductCard from "./ProductCard";

const products: Product[] = [
  {
    id: 1,
    name: "Dark Truffle Delight", 
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
    price: 12,
  },
  {
    id: 2,
    name: "Velvet Cocoa Bite",
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919",
    price: 10,
  },
  {
    id: 3,
    name: "Hazelnut Dream",
    image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04",
    price: 14,
  },
];

export default function SpecialProducts() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="flex items-center justify-center gap-5 text-3xl font-semibold text-[#2B1D16]">
            Chocolates
          </h2>

          <p className="text-[#2B1D16]/60 mt-2">
            Crafted for special moments and premium taste
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
