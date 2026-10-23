import React, { useState } from 'react';
import { MessageSquare, X, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.contact.whatsapp.replace('+', '')}?text=${encodeURIComponent(
    "Bonjour EMTSD Construction, je souhaite échanger au sujet d'un projet de travaux/bâtiment à Diamniadio ou dans la région."
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto">
      {/* Floating Prompt Box (expanded state) */}
      {showTooltip && (
        <div className="mb-3 w-72 bg-white border border-slate-200 rounded-2xl p-4 shadow-2xl text-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-900 font-heading">EMTSD Construction</span>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            Besoin d’un devis rapide ou d’une visite de chantier à Diamniadio ? Échangez directement avec nous sur WhatsApp au <strong>{COMPANY_INFO.contact.phoneDisplay}</strong>.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full py-2 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-98 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md"
          >
            <span>Ouvrir la discussion</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="relative group">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          className="flex items-center gap-2.5 p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-emerald-400/40"
          aria-label="Contacter EMTSD Construction sur WhatsApp"
        >
          <MessageSquare className="w-6 h-6 fill-white text-white" />
          <span className="hidden sm:inline-block text-xs font-bold pr-1">
            WhatsApp
          </span>
        </a>
      </div>
    </div>
  );
};
