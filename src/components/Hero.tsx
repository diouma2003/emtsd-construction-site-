import React from 'react';
import { ArrowRight, Phone, MessageSquare, Shield, CheckCircle2, MapPin } from 'lucide-react';
import { COMPANY_INFO, COMPANY_PILLARS } from '../data/companyData';

interface HeroProps {
  onOpenQuote: () => void;
  onOpenProjects?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onOpenProjects }) => {
  return (
    <section id="accueil" className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-slate-950">
      {/* Background Image with Fallback and Architectural Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_construction_diamniadio_1792675964684.jpg"
          alt="Chantier de génie civil et de bâtiment moderne à Diamniadio, Sénégal"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Measured scrim ensuring WCAG AA legibility without muddying the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-slate-950/40" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full pt-8 pb-14">
        <div className="max-w-3xl">
          {/* Subtle Editorial Kicker */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-orange-400 mb-4 tracking-wide">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Diamniadio, Sénégal</span>
            </span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span className="text-slate-300">Entreprise Générale BTP</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span className="text-emerald-400 font-medium">Génie Civil & Aménagement</span>
          </div>

          {/* Slogan as Prominent Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-[1.12] [text-wrap:balance]">
            Bâtir aujourd'hui, les <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-300">infrastructures</span> de demain
          </h1>

          {/* Objective Statement */}
          <p className="mt-6 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
            Implantée au cœur stratégique de <strong>Diamniadio</strong>, l'entreprise <strong>EMTSD Construction</strong> vous accompagne dans vos projets de bâtiment, de travaux publics, de génie civil et d'aménagement au Sénégal avec rigueur technique et exigence de qualité.
          </p>

          {/* Functional CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 active:scale-98 rounded-xl transition-all duration-200 shadow-xl shadow-orange-950/50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 whitespace-nowrap shrink-0"
            >
              <span>Demander un devis</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#realisations"
              onClick={(e) => {
                if (onOpenProjects) {
                  e.preventDefault();
                  onOpenProjects();
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 rounded-xl transition-colors whitespace-nowrap shrink-0"
            >
              <span>Découvrir nos réalisations</span>
            </a>

            {/* Direct WhatsApp Callout */}
            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp.replace('+', '')}?text=${encodeURIComponent("Bonjour EMTSD Construction, je souhaite échanger au sujet d'un projet de construction.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-medium text-emerald-300 hover:text-white bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-800/60 rounded-xl transition-colors whitespace-nowrap shrink-0"
              title="Discuter directement sur WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp : {COMPANY_INFO.contact.phoneDisplay}</span>
            </a>
          </div>

          {/* Authentic Technical Commitments */}
          <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Devis descriptif et quantitatif</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-orange-400 shrink-0" />
              <span>Sécurité et respect des normes BTP</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Contact direct au {COMPANY_INFO.contact.phoneDisplay}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Authentic Pillars Strip (No fabricated numbers, 100% factual) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 sm:p-6 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-900/5">
          {COMPANY_PILLARS.map((pillar, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col ${idx !== 0 ? 'md:border-l md:border-slate-200 md:pl-6' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-slate-900 font-heading">
                  {pillar.title}
                </span>
                <span className="text-xs font-semibold text-orange-600">
                  {pillar.subtitle}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
