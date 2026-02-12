'use client';

import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Services', href: '#services' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Projets', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src="/logo.jfif" alt="Entreprise SOLA Logo" className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-105" />
            <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white shadow-sm" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-primary leading-none uppercase tracking-tighter">SOLA</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Entreprise</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-10 md:flex">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative text-sm font-bold text-slate-600 transition-colors hover:text-primary uppercase tracking-wider"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="outline" className="rounded-full border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all" asChild>
            <a href="tel:+33616501085" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>06 16 50 10 85</span>
            </a>
          </Button>
          <Button className="rounded-full bg-primary font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 px-6" asChild>
            <a href="#contact">Devis Gratuit</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-primary-foreground/20 bg-primary px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm transition-opacity hover:opacity-80"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="tel:+33952332511"
              className="mt-2 flex items-center gap-2 text-sm font-semibold"
            >
              <Phone className="h-4 w-4" />
              <span>09 52 33 25 11</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
