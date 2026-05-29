import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-[#2B1D16] text-white py-12">
      <Container className="flex flex-col md:flex-row justify-between gap-8">
        
        <div>
          <h3 className="text-lg font-semibold">CocoaCraft</h3>
          <p className="text-white/60 mt-2 text-sm">
            Premium handcrafted chocolate experience.
          </p>
        </div>

        <div className="flex gap-8 text-sm text-white/70">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </Container>

      <div className="text-center text-white/40 text-xs mt-10">
        © {new Date().getFullYear()} CocoaCraft. All rights reserved.
      </div>
    </footer>
  );
}