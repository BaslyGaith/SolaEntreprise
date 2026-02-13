'use client';

import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/site-config';

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
            <img src="/logoG-removebg-preview.png" alt="Entreprise SOLA Logo" className="h-28 w-auto object-contain transition-transform duration-300 hover:scale-105" />
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
            <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{siteConfig.phone}</span>
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
              href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
              className="mt-2 flex items-center gap-2 text-sm font-semibold"
            >
              <Phone className="h-4 w-4" />
              <span>{siteConfig.phone}</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

