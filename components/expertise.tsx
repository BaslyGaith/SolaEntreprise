'use client';

import { Card } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const expertise = [
  {
    title: 'Garantie Décennale',
    description: 'Une protection complète pour tous vos chantiers pendant 10 ans.',
  },
  {
    title: 'Intervention Rapide',
    description: 'Respect des délais et intervention efficace en cas d’urgence.',
  },
  {
    title: 'Expertise Reconnue',
    description: 'Une équipe de couvreurs qualifiés pour un travail de précision.',
  },
  {
    title: 'Matériaux de Qualité',
    description: 'Utilisation de matériaux adaptés au climat local (Tuile, Ardoise, Zinc).',
  },
  {
    title: 'Devis Gratuit',
    description: 'Estimation détaillée de vos travaux sans aucun engagement.',
  },
  {
    title: 'Accompagnement',
    description: 'Des conseils personnalisés pour protéger durablement votre maison.',
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="w-full bg-slate-900 py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/20 blur-[100px]" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-secondary/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-20 text-center">
          <h2 className="mb-6 text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl uppercase">
            Pourquoi Choisir <span className="text-gradient">SOLA ?</span>
          </h2>
          <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {expertise.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-[2rem] bg-white/5 p-8 border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-primary/20"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:rotate-[360deg]">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-black text-white uppercase tracking-tight">
                {item.title}
              </h3>
              <p className="text-slate-400 leading-relaxed font-bold">
                {item.description}
              </p>
              <div className="absolute bottom-0 right-0 p-4 opacity-5 transition-opacity group-hover:opacity-10">
                <span className="text-6xl font-black text-white">0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
