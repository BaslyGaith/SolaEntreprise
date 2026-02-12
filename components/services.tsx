'use client';

import { Card } from '@/components/ui/card';
import { Hammer, Zap, Paintbrush as PaintBrush, Wind, Sparkles, Flame } from 'lucide-react';

const services = [
  {
    icon: Hammer,
    title: 'Pose et rénovation de toiture',
    description:
      'Installation complète de votre couverture en neuf comme en rénovation. Tuiles, ardoises ou zinc, nous garantissons une toiture solide, étanche et durable.',
  },
  {
    icon: Sparkles,
    title: 'Nettoyage et démoussage',
    description:
      'Élimination des mousses, lichens et salissures grâce à un traitement professionnel anti-mousse et hydrofuge pour préserver l’étanchéité.',
  },
  {
    icon: PaintBrush,
    title: 'Terrasses et façades',
    description:
      'Nettoyage de terrasses, murs et façades pour redonner éclat et sécurité à vos extérieurs grâce à des techniques adaptées à chaque surface.',
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full bg-slate-50 py-24 md:py-32 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-20 text-center">
          <h2 className="mb-6 text-4xl font-black tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            Nos <span className="text-gradient">Services</span>
          </h2>
          <div className="mx-auto h-1.5 w-24 rounded-full bg-primary mb-8" />
          <p className="mx-auto max-w-3xl text-lg font-medium text-slate-600 leading-relaxed italic">
            "Chaque toit est unique, c’est pourquoi nous adaptons nos techniques et nos matériaux à l’architecture de votre maison et à vos exigences."
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Card
                key={idx}
                className="group relative flex flex-col items-center p-10 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_-15px_rgba(26,54,93,0.15)] border-none bg-white rounded-[2.5rem] overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 transition-opacity group-hover:opacity-10 scale-[2]">
                  <Icon className="h-24 w-24 text-primary" />
                </div>

                <div className="mb-10 rounded-[2rem] bg-primary/5 p-8 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:scale-110 shadow-inner">
                  <Icon className="h-12 w-12 transition-transform duration-500 group-hover:rotate-[15deg]" />
                </div>

                <h3 className="mb-6 text-2xl font-black text-slate-900 leading-tight">
                  {service.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {service.description}
                </p>

                <div className="mt-10 h-1.5 w-0 bg-primary transition-all duration-500 group-hover:w-full rounded-full" />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
