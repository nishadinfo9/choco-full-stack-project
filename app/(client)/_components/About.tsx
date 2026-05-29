import Container from "./Container";

export default function About() {
  return (
    <section className="py-24 bg-white">
      <Container className="grid md:grid-cols-2 gap-12 items-center">
        
        <div className="rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1548907040-4baa42d10919"
            className="w-full h-full object-cover"
            alt="cocoa beans"
          />
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-[#2B1D16]">
            From bean to bar
          </h2>

          <p className="mt-6 text-[#2B1D16]/70 leading-relaxed">
            We carefully select cocoa beans from small farms, roast them in small
            batches, and craft each bar with precision.
            Every bite tells a story of origin, patience, and craft.
          </p>

          <p className="mt-4 text-[#2B1D16]/70">
            No shortcuts. No artificial flavors. Just pure chocolate experience.
          </p>
        </div>
      </Container>
    </section>
  );
}