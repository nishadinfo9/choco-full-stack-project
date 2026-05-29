import Container from "./Container";
export default function Hero() {
  return (
    <section className="bg-[#FAF7F2]">
      <Container className="grid md:grid-cols-2 gap-10 items-center py-20">
        
        {/* Text */}
        <div>
          <p className="text-sm tracking-widest text-[#6B3E2E] uppercase">
            Artisan Chocolate
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-[#2B1D16] mt-4">
            Crafted with care,  
            <br /> made for moments
          </h1>

          <p className="mt-6 text-[#2B1D16]/70 leading-relaxed">
            Experience handcrafted chocolate made from ethically sourced cocoa.
            A perfect balance of taste, texture, and emotion.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-[#6B3E2E] text-white rounded-full hover:opacity-90 transition">
              Explore Products
            </button>

            <button className="px-6 py-3 border border-[#6B3E2E] text-[#6B3E2E] rounded-full hover:bg-[#6B3E2E] hover:text-white transition">
              Our Story
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden bg-[#E7D7C9]">
            <img
              src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c"
              className="w-full h-full object-cover"
              alt="chocolate"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}