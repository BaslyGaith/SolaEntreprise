'use client';

import { Button } from '@/components/ui/button';
import { Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-24 md:py-40 hero-texture">
      {/* Background Decor */}
      <div className="absolute right-0 top-0 -z-10 h-full w-2/3 bg-gradient-to-l from-slate-100 to-transparent" />
      <div className="absolute -left-20 -top-20 -z-10 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Content */}
          <div className="flex flex-col space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Artisan Couvreur de Confiance
              </div>
              <h1 className="text-balance text-5xl font-black leading-[1.1] text-slate-900 md:text-6xl lg:text-7xl">
                Expert en Toiture à <br />
                <span className="text-gradient uppercase">{siteConfig.city}</span>
              </h1>
              <p className="max-w-md text-pretty text-lg leading-relaxed text-slate-600 font-medium">
                Installation complète, rénovation et entretien. Nous garantissons une toiture solide, étanche et esthétique pour votre sérénité à {siteConfig.city}.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-7 text-lg font-bold shadow-2xl shadow-primary/30 transition-all hover:scale-105"
                asChild
              >
                <a href="#contact" className="flex items-center gap-2">
                  Devis Gratuit <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-10 py-7 text-lg font-bold border-slate-200 hover:bg-slate-50 transition-all"
                asChild
              >
                <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="flex items-center gap-2">
                  <Phone className="h-5 w-5" /> {siteConfig.phone}
                </a>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-8 pt-4">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-primary">10 ANS</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Garantie Décennale</span>
              </div>
              <div className="h-12 w-px bg-slate-200" />
              <div className="flex flex-col">
                <span className="text-3xl font-black text-primary">QUALITÉ</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Matériaux Certifiés</span>
              </div>
            </div>
          </div>

          {/* Image Area */}
          <div className="relative aspect-[4/5] md:aspect-square">
            <div className="absolute inset-0 rounded-[2.5rem] bg-slate-200 overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)]">
              <div className="relative h-full w-full">
                <img
                  src="/hero.jfif"
                  alt={`Installation de toiture à ${siteConfig.city}`}
                  className="h-full w-full object-cover transition-transform duration-1000 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
              </div>
              <div className="absolute inset-0 flex items-end p-10">
                <div className="glass p-6 rounded-2xl">
                  <p className="text-primary font-bold italic text-sm leading-relaxed">
                    "Intervention rapide et travail soigné sur toute la région de {siteConfig.city}."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
