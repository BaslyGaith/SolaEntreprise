'use client';

import { Phone, Mail, MapPin } from 'lucide-react';

import { siteConfig } from '@/lib/site-config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-950 py-20 text-slate-400 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 md:px-6 relative">
        <div className="grid gap-16 md:grid-cols-4">
          {/* Logo & Info */}
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center gap-4">
              <img src="/logo.jfif" alt="Logo" className="h-14 w-auto bg-white rounded-2xl p-2 shadow-2xl transition-transform hover:rotate-3" />
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-white uppercase leading-none">SOLA</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Entreprise</span>
              </div>
            </div>
            <p className="max-w-sm text-lg font-bold leading-relaxed text-slate-500 italic">
              "Votre toiture est notre priorité. Une expertise artisanale au service de votre sérénité à {siteConfig.city}."
            </p>
            <div className="flex gap-4">
              {/* Social placeholders if needed */}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-8">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">Navigation</h3>
            <ul className="space-y-4 text-sm font-bold">
              <li><a href="#services" className="transition-all hover:text-primary hover:translate-x-2 inline-block">NOS SERVICES</a></li>
              <li><a href="#expertise" className="transition-all hover:text-primary hover:translate-x-2 inline-block">POURQUOI NOUS ?</a></li>
              <li><a href="#projects" className="transition-all hover:text-primary hover:translate-x-2 inline-block">NOS RÉALISATIONS</a></li>
              <li><a href="#contact" className="transition-all hover:text-primary hover:translate-x-2 inline-block">CONTACT</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">Contact</h3>
            <ul className="space-y-6 text-sm font-bold">
              <li className="flex items-center gap-4 group">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-600 uppercase">Téléphone</span>
                  <a href="tel:+33616501085" className="text-slate-300 transition-colors hover:text-white">06 16 50 10 85</a>
                </div>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-600 uppercase">Email</span>
                  <a href="mailto:seif.e.akkari@gmail.com" className="text-slate-300 transition-colors hover:text-white">seif.e.akkari@gmail.com</a>
                </div>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-primary transition-all group-hover:bg-primary group-hover:text-white">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-600 uppercase">Siège</span>
                  <span className="text-slate-300">{siteConfig.address}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between border-t border-white/5 pt-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 md:flex-row">
          <p>© {currentYear} {siteConfig.name}. Tous droits réservés. Designé par <a href="https://github.com/BaslyGaith" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Basly Gaith</a></p>
          <div className="mt-6 flex gap-8 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
