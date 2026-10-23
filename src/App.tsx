import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Commitments } from './components/Commitments';
import { QuoteForm } from './components/QuoteForm';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { LogoManagerModal } from './components/LogoManagerModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [isLogoManagerOpen, setIsLogoManagerOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  const scrollToQuote = () => {
    const el = document.getElementById('devis');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById('realisations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    scrollToQuote();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-orange-600 selection:text-white">
      {/* Header with Top Bar Contract */}
      <Header
        onOpenQuote={scrollToQuote}
        onOpenLogoManager={() => setIsLogoManagerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenQuote={scrollToQuote} onOpenProjects={scrollToProjects} />

        {/* 2. À Propos Section */}
        <About onOpenQuote={scrollToQuote} />

        {/* 3. Services Section (6 Domaines) */}
        <Services onSelectServiceForQuote={handleSelectServiceForQuote} />

        {/* 4. Galerie de Réalisations */}
        <Projects onOpenQuote={scrollToQuote} />

        {/* 5. Engagements Qualité & Sécurité */}
        <Commitments />

        {/* 6. Formulaire de Devis & Calculateur */}
        <QuoteForm
          preselectedService={preselectedService}
          onClearPreselected={() => setPreselectedService(undefined)}
        />

        {/* 7. Contact, Accès Diamniadio & Réseaux */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer
        onOpenLegal={() => setIsLegalOpen(true)}
        onOpenLogoManager={() => setIsLogoManagerOpen(true)}
        onOpenQuote={scrollToQuote}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />

      {/* Legal Notices Modal */}
      <LegalModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
      />

      {/* Official Logo Slot Customizer Modal */}
      <LogoManagerModal
        isOpen={isLogoManagerOpen}
        onClose={() => setIsLogoManagerOpen(false)}
      />
    </div>
  );
}
