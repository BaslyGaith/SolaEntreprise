'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ArrowRight, ImageIcon, CheckCircle2 } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Rénovation complète',
    description: 'Réfection totale d’une toiture en tuiles avec isolation.',
    category: 'Toiture',
    image: '/projects-1.jfif',
    before: '/projects-1-before.jfif',
    details: 'Ce projet a consisté en une dépose complète de l\'ancienne toiture endommagée, suivie d\'une isolation thermique haute performance et de la pose de nouvelles tuiles en terre cuite.',
  },
  {
    id: 2,
    title: 'Nettoyage Façade',
    description: 'Traitement hydrofuge et nettoyage haute pression.',
    category: 'Façade',
    image: '/projects-2.jfif',
    before: '/projects-2-before.jfif',
    details: 'Nettoyage en profondeur des mousses et pollutions atmosphériques, suivi de l\'application d\'un traitement hydrofuge incolore pour protéger durablement le support.',
  },
  {
    id: 3,
    title: 'Démoussage toiture',
    description: 'Élimination des mousses et lichens incrustés.',
    category: 'Entretien',
    image: '/projects-3.jfif',
    before: '/projects-3-before.jfif',
    details: 'Traitement curatif et préventif contre les lichens et mousses. Une remise à neuf esthétique qui prolonge la durée de vie de vos tuiles.',
  },
  {
    id: 4,
    title: 'Nettoyage Muret',
    description: 'Restauration complète d’un muret de clôture.',
    category: 'Entretien',
    image: '/projects-4.jfif',
    before: '/projects-4-before.jfif',
    details: 'Nettoyage haute pression et traitement anti-mousse pour redonner l’aspect d’origine à ce muret de clôture. Une solution efficace pour valoriser l’esthétique extérieure de votre propriété.',
  },
  {
    id: 5,
    title: 'Nettoyage Terrasse Piscine',
    description: 'Remise à neuf du dallage et des abords de piscine.',
    category: 'Extérieur',
    image: '/projects-5.jfif',
    before: '/projects-5-before.jfif',
    details: 'Décapage complet du dallage terni par le temps et les intempéries. Le résultat est une terrasse éclatante, prête pour la saison estivale, avec une sécurité renforcée grâce à l\'élimination des micro-organismes glissants.',
  },
  {
    id: 6,
    title: 'Réparation de Souche',
    description: 'Réfection des joints et étanchéité de cheminée.',
    category: 'Maçonnerie',
    image: '/projects-6.jfif',
    before: '/projects-6-before.jfif',
    details: 'Intervention sur une souche de cheminée dégradée. Refonte des joints effrités et application d\'un enduit de protection pour garantir une parfaite étanchéité et prévenir les infiltrations d\'eau.',
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  return (
    <section id="projects" className="w-full bg-white py-24 md:py-32 overflow-hidden relative">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 md:px-6 relative">
        <div className="mb-20 flex flex-col items-center text-center">
          <h2 className="mb-6 text-4xl font-black tracking-tight text-slate-900 md:text-5xl lg:text-6xl uppercase">
            Nos <span className="text-gradient">Réalisations</span>
          </h2>
          <div className="h-1.5 w-24 rounded-full bg-primary mb-8" />
          <p className="max-w-2xl text-lg font-medium text-slate-600 italic">
            "La satisfaction de nos clients est notre plus belle récompense. Explorez notre savoir-faire à travers nos derniers chantiers."
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-[2.5rem] bg-white transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_-15px_rgba(26,54,93,0.2)] overflow-hidden border border-slate-100"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />

                {/* Badge */}
                <div className="absolute top-6 left-6 glass px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
                  {project.category}
                </div>

                <div className="absolute bottom-6 left-6 right-6 translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <Button
                    onClick={() => setSelectedProject(project)}
                    className="w-full rounded-2xl bg-white text-primary font-bold hover:bg-slate-50 shadow-xl"
                  >
                    Voir le Projet
                  </Button>
                </div>
              </div>

              <div className="p-8 text-center">
                <h3 className="mb-3 text-2xl font-black text-slate-900 leading-tight uppercase tracking-tight">
                  {project.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-bold">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <div className="flex items-center justify-between mb-8 px-4">
            <h3 className="text-xl font-black uppercase tracking-[0.2em] text-slate-500">
              Découvrez toutes nos transformations
            </h3>
            <div className="h-px flex-1 bg-slate-100 ml-6" />
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-sm sm:max-w-xl md:max-w-4xl mx-auto"
          >
            <CarouselContent>
              {projects.map((project) => (
                <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <div
                      className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl bg-slate-100 border border-slate-200"
                      onClick={() => setSelectedProject(project)}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                        <span className="text-white font-bold text-sm uppercase tracking-widest border border-white/30 px-4 py-2 rounded-full glass">
                          Voir
                        </span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight truncate">{project.title}</h4>
                      <p className="text-xs font-medium text-slate-400 truncate">{project.category}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* Comparison Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl rounded-[2.5rem] border-none bg-white p-0 overflow-hidden">
          <DialogTitle className="sr-only">
            {selectedProject?.title} - {selectedProject?.category}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {selectedProject?.description}
          </DialogDescription>
          {selectedProject && (
            <div className="flex flex-col">
              <div className="grid md:grid-cols-2">
                {/* Before */}
                <div className="relative aspect-[4/3] md:aspect-square group cursor-crosshair">
                  <img src={selectedProject.before} alt="Avant" className="h-full w-full object-cover" />
                  <div className="hidden md:block absolute top-6 left-6 glass px-6 py-2 rounded-full">
                    <span className="text-xs font-black uppercase tracking-widest text-white">Avant</span>
                  </div>
                </div>
                {/* After */}
                <div className="relative aspect-[4/3] md:aspect-square group cursor-crosshair border-l border-white/20">
                  <img src={selectedProject.image} alt="Après" className="h-full w-full object-cover" />
                  <div className="hidden md:block absolute top-6 right-6 bg-primary px-6 py-2 rounded-full shadow-lg">
                    <span className="text-xs font-black uppercase tracking-widest text-white">Après</span>
                  </div>
                </div>
              </div>

              <div className="p-10 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">
                      {selectedProject.title}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-12 rounded-full bg-primary" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                        {selectedProject.category}
                      </span>
                    </div>
                  </div>
                  <Button
                    className="rounded-full bg-slate-900 text-white font-bold px-8"
                    asChild
                  >
                    <a href="#contact" onClick={() => setSelectedProject(null)}>
                      Projet Similaire <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                  <p className="text-lg font-bold text-slate-600 leading-relaxed italic">
                    {selectedProject.details}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

