import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/boutique';

interface NavbarProps {
  onEnquire: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#shop' },
  { label: 'Collections', href: '#collections' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;

export function Navbar({ onEnquire }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* A. Top Announcement Bar */}
      <div className="w-full bg-[#641E32] text-[#F8F5F0] h-9 px-4 flex items-center justify-center border-b border-[#B89A65]/30">
        <p className="text-[11px] sm:text-xs tracking-[0.14em] uppercase font-normal text-center truncate">
          {BUSINESS_INFO.category} · {BUSINESS_INFO.shortAddress}
        </p>
      </div>

      {/* B. Sticky Header and Navigation */}
      <header className="sticky top-0 z-40 w-full bg-[#F8F5F0]/95 backdrop-blur-md border-b border-[#E8DCCB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#home"
            className="font-serif text-xl sm:text-2xl font-medium tracking-wide text-[#292522] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#641E32]"
          >
            {BUSINESS_INFO.name}
          </a>

          {/* Zone 2: Clean Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 lg:gap-9"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative text-xs tracking-[0.14em] uppercase font-medium text-[#292522]/85 hover:text-[#641E32] transition-colors duration-200 whitespace-nowrap shrink-0 py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#641E32] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#641E32]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onEnquire}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs tracking-[0.14em] uppercase font-medium bg-[#641E32] text-[#F8F5F0] hover:bg-[#4e1626] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#641E32]"
            >
              Enquire Now
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#292522] hover:text-[#641E32] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#641E32]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#F8F5F0] border-t border-[#E8DCCB] px-6 py-6">
            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 text-sm tracking-[0.12em] uppercase font-medium text-[#292522] hover:text-[#641E32] border-b border-[#E8DCCB]/60 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="pt-5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onEnquire();
                }}
                className="w-full py-3.5 text-xs tracking-[0.15em] uppercase font-medium bg-[#641E32] text-[#F8F5F0] hover:bg-[#4e1626] transition-colors cursor-pointer"
              >
                Enquire Now
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
