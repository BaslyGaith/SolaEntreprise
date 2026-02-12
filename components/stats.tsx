'use client';

const stats = [
  {
    number: '500+',
    label: 'Chantiers Réalisés',
  },
  {
    number: '12+',
    label: 'Années d’Expérience',
  },
  {
    number: '100%',
    label: 'Satisfaction Client',
  },
  {
    number: '24/7',
    label: 'Service d’Urgence',
  },
];

export default function Stats() {
  return (
    <section className="w-full bg-primary py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      <div className="mx-auto max-w-6xl px-4 md:px-6 relative">
        <div className="grid gap-12 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center group cursor-default">
              <div className="mb-4 text-5xl font-black text-white md:text-6xl lg:text-7xl transition-transform duration-500 group-hover:scale-110">
                {stat.number}
              </div>
              <div className="h-1.5 w-16 bg-white/30 mb-6 rounded-full transition-all duration-500 group-hover:w-24 group-hover:bg-white" />
              <p className="text-sm font-black uppercase tracking-[0.3em] text-primary-foreground/80 md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
