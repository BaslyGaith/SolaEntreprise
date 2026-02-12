'use client';

import Header from '@/components/header';
import Hero from '@/components/hero';
import Services from '@/components/services';
import Expertise from '@/components/expertise';
import Stats from '@/components/stats';
import Projects from '@/components/projects';
import Contact from '@/components/contact';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <Hero />
      <Services />
      <Expertise />
      <Stats />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
