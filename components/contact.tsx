'use client';

import React from "react"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, AlertCircle, Upload, Trash2, ImageIcon } from 'lucide-react';


interface ContactProps {
  isModal?: boolean;
}

export default function Contact({ isModal = false }: ContactProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    projectDescription: '',
    privacy: false,
  });
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const totalImages = images.length + selectedFiles.length;

      if (totalImages > 10) {
        alert("Vous pouvez ajouter un maximum de 10 images.");
        return;
      }

      setImages((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('fullName', formData.fullName);
      data.append('phone', formData.phone);
      data.append('email', formData.email);
      data.append('projectDescription', formData.projectDescription);

      // Append images with array notation for PHP
      images.forEach((file) => {
        data.append('images[]', file);
      });

      const response = await fetch('/send-email.php', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        alert('Votre demande de devis a bien été envoyée ! Nous vous recontacterons sous 24h.');

        // Reset form
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          projectDescription: '',
          privacy: false,
        });
        setImages([]);
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Une erreur s'est produite lors de l'envoi. Veuillez nous contacter directement par téléphone.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const Container = isModal ? 'div' : 'section';

  return (
    <Container
      id="contact"
      className={`w-full relative overflow-hidden ${isModal ? 'p-4 md:p-8 bg-white' : 'bg-slate-50 py-24 md:py-32'}`}
    >
      {!isModal && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      )}

      <div className={`mx-auto ${isModal ? 'w-full' : 'max-w-6xl px-4 md:px-6'} relative`}>
        <div className="mb-10 md:mb-20 text-center">
          <h2 className={`mb-4 md:mb-6 font-black tracking-tight text-slate-900 uppercase ${isModal ? 'text-2xl md:text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'}`}>
            Demander un <span className="text-gradient">Devis Gratuit</span>
          </h2>
          <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
        </div>

        <div className={`grid gap-8 md:gap-16 ${isModal ? 'lg:grid-cols-2' : 'md:grid-cols-2'}`}>
          {/* Form Section */}
          <Card className={`rounded-[2.5rem] border-none bg-white ${isModal ? 'p-6 shadow-none border border-slate-100' : 'p-10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)]'}`}>
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="space-y-3">
                <label htmlFor="fullName" className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                  Nom Complet *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-6 py-4 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 font-bold text-slate-900 placeholder:text-slate-300"
                  placeholder="Jean Dupont"
                />
              </div>

              <div className="grid gap-6 md:gap-8 md:grid-cols-2">
                <div className="space-y-3">
                  <label htmlFor="phone" className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-6 py-4 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 font-bold text-slate-900 placeholder:text-slate-300"
                    placeholder="06 12 34 56 78"
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="email" className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-6 py-4 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 font-bold text-slate-900 placeholder:text-slate-300"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="projectDescription"
                  className="text-xs font-black uppercase tracking-[0.2em] text-slate-400"
                >
                  Description du Projet *
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-6 py-4 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 font-bold text-slate-900 placeholder:text-slate-300"
                  placeholder="Expliquez-nous vos besoins (rénovation, nettoyage, type de toiture...)"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                  Photos du Projet (Max 10)
                </label>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {images.map((file, idx) => (
                    <div key={idx} className="relative group aspect-square rounded-xl bg-slate-50 border-2 border-slate-100 overflow-hidden">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${idx}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {images.length < 10 && (
                    <label className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 cursor-pointer transition-all hover:bg-white hover:border-primary active:scale-95 group">
                      <div className="flex flex-col items-center gap-1 text-slate-400 group-hover:text-primary">
                        <Upload className="h-4 w-4 md:h-6 md:w-6" />
                        <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-center">Ajouter</span>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  checked={formData.privacy}
                  onChange={handleChange}
                  required
                  className="mt-1.5 h-6 w-6 rounded-lg border-2 border-slate-200 transition-all checked:bg-primary"
                />
                <label htmlFor="privacy" className="text-xs font-bold text-slate-400 leading-relaxed uppercase tracking-wider">
                  J'accepte que mes données soient utilisées pour être recontacté.
                </label>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-primary py-8 text-lg font-black uppercase tracking-widest shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] hover:bg-primary/90 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le Devis'}
              </Button>
            </form>
          </Card>

          {/* Contact Info Section */}
          <div className={`space-y-10 flex flex-col justify-center ${isModal ? 'hidden lg:flex' : 'lg:pl-12'}`}>
            <div className="space-y-10">
              <div>
                <h3 className="mb-4 text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                  Infos de <span className="text-primary">Contact</span>
                </h3>
                <div className="h-1.5 w-16 rounded-full bg-primary mb-8" />
                <p className="text-lg font-medium text-slate-500 italic">
                  "Notre équipe est à votre disposition pour répondre à toutes vos questions."
                </p>
              </div>

              <div className="grid gap-8">
                <a href="tel:+33616501085" className="group flex items-center gap-6 p-6 rounded-3xl bg-white transition-all hover:bg-primary hover:scale-105 shadow-xl shadow-slate-200/50">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary transition-all group-hover:bg-white shadow-inner">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white/60">Téléphone</span>
                    <span className="text-xl font-black text-slate-900 group-hover:text-white">06 16 50 10 85</span>
                  </div>
                </a>

                <a href="mailto:bmohamedgaith@gmail.com" className="group flex items-center gap-6 p-6 rounded-3xl bg-white transition-all hover:bg-primary hover:scale-105 shadow-xl shadow-slate-200/50">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary transition-all group-hover:bg-white shadow-inner">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white/60">Email</span>
                    <span className="text-xl font-black text-slate-900 group-hover:text-white leading-none">bmohamedgaith@gmail.com</span>
                  </div>
                </a>

                <div className="flex items-center gap-6 p-6 rounded-3xl bg-white shadow-xl shadow-slate-200/50">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Horaires</span>
                    <span className="text-xl font-black text-slate-900 leading-none">Lun - Sam: 8h00 - 18h00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Service */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 text-white shadow-2xl shadow-primary/40">
              <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-primary/20 blur-[60px]" />
              <div className="relative flex gap-6">
                <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="mb-3 text-2xl font-black uppercase tracking-tighter leading-none">Dépannage d'Urgence</h4>
                  <p className="mb-8 font-bold text-slate-400 leading-relaxed">
                    Une fuite ou un sinistre ? Intervention rapide 24h/24 et 7j/7 pour sécuriser votre toiture.
                  </p>
                  <Button className="rounded-full bg-white text-primary font-black uppercase tracking-widest px-8 py-6 hover:bg-slate-50 transition-all hover:scale-105" asChild>
                    <a href="tel:+33616501085">Péril immédiat</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
