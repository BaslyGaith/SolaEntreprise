'use client';

import { FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import Contact from '@/components/contact';

export default function FloatingCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling 400px
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className={`fixed bottom-8 right-8 z-50 flex items-center gap-4 rounded-full bg-slate-900 p-2 pr-8 shadow-2xl transition-all duration-700 hover:scale-110 active:scale-95 group ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
                        }`}
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform duration-500 group-hover:rotate-[360deg]">
                        <FileText className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Action</span>
                        <span className="text-sm font-black uppercase tracking-widest text-white whitespace-nowrap">Devis Gratuit</span>
                    </div>

                    {/* Decorative pulse */}
                    <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/20 duration-[3000ms]" />
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white border-none rounded-[2.5rem]">
                <DialogTitle className="sr-only">Demander un Devis</DialogTitle>
                <DialogDescription className="sr-only">Remplissez le formulaire ci-dessous pour recevoir votre devis gratuit.</DialogDescription>
                <div className="max-h-[85vh] overflow-y-auto custom-scrollbar">
                    <Contact isModal={true} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
