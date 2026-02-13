import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

import FloatingCTA from "@/components/floating-cta"

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Entreprise SOLA | Expert Toiture & Façade à Rambouillet',
  description: 'Spécialiste en pose et rénovation de toiture, nettoyage et démoussage à Rambouillet. Expertise artisanale, garantie décennale, devis gratuits.',
  icons: {
    icon: '/logoG-removebg-preview.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="fr" className="scroll-smooth">
      <body className="font-sans antialiased">
        {children}
        <FloatingCTA />
      </body>
    </html>
  )
}
