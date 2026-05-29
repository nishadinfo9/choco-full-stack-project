import Container from "./Container";

export default function NewsLetter() {
  return (
    <section className="py-20 bg-[#FAF7F2] border-t border-[#E7D7C9]">
      <Container className="text-center max-w-2xl">
        <h2 className="text-2xl font-semibold text-[#2B1D16]">
          Join the Chocolate Circle
        </h2>

        <p className="mt-3 text-[#2B1D16]/70">
          Get updates on new flavors, seasonal drops, and exclusive offers.
        </p>

        <div className="mt-6 flex gap-2">
          <input
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-full border border-[#E7D7C9] focus:outline-none"
          />

          <button className="px-6 py-3 bg-[#6B3E2E] text-white rounded-full">
            Subscribe
          </button>
        </div>
      </Container>
    </section>
  );
}