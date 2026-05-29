import Container from "./Container";

const navLinks = ["Home", "Products", "About", "Story", "Contact"];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/80 backdrop-blur border-b border-[#E7D7C9]">
      <Container className="flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-lg font-semibold tracking-wide text-[#2B1D16]">
          Cocoa<span className="text-[#6B3E2E]">Craft</span>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex gap-8 text-sm text-[#2B1D16]/80">
          {navLinks.map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-[#6B3E2E] transition"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <button className="text-sm px-4 py-2 border border-[#6B3E2E] text-[#6B3E2E] hover:bg-[#6B3E2E] hover:text-white transition rounded-full">
          Shop Now
        </button>
      </Container>
    </header>
  );
}