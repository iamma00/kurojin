import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-[62px] left-1/2 -translate-x-1/2 z-50 w-[1140px] max-w-[90vw] h-[66px] rounded-[45px] bg-black/0 backdrop-blur-md shadow-[12px_16px_24px_-2px_rgba(0,0,0,0.3)] border border-white/10 flex items-center justify-between px-10">
      {/* Logo */}
      <span className="font-garamond font-bold italic text-[20px] text-white uppercase tracking-[-0.4px]">
        Kurojin.
      </span>

      {/* Nav Links */}
      <div className="flex items-center gap-12">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="font-garamond text-[16px] text-white tracking-[-0.32px] hover:opacity-80 transition-opacity"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* CTA Button */}
      <button className="bg-white text-bg rounded-[55px] h-[32px] px-5 font-montserrat font-extrabold italic text-[14px] uppercase tracking-wide overflow-hidden relative group cursor-pointer">
        <span className="block transition-transform duration-300 group-hover:-translate-y-full">
          LET&apos;s TALK
        </span>
        <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
          LET&apos;S GO
        </span>
      </button>
    </nav>
  );
}
