import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Image as ImageIcon } from 'lucide-react';
import { OfficialLogo } from './OfficialLogo';
import { COMPANY_INFO } from '../data/companyData';

interface HeaderProps {
  onOpenQuote: () => void;
  onOpenLogoManager: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote, onOpenLogoManager }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'À propos', href: '#a-propos' },
    { label: 'Services', href: '#services' },
    { label: 'Réalisations', href: '#realisations' },
    { label: 'Engagements', href: '#engagements' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 py-2 sm:py-2.5 shadow-sm shadow-slate-900/5'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-2.5 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (Nav links) - Zone 3 (1 Primary Action) */}
        <div className="flex items-center justify-between gap-8">
          
          {/* Zone 1: Brand logo prominently aligned to the left at 100% opacity on clean light background */}
          <div className="flex items-center shrink-0">
            <a 
              href="#accueil" 
              className="group inline-flex items-center whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg transition-transform duration-200 hover:scale-[1.01]"
              aria-label="EMTSD Construction Accueil"
            >
              <OfficialLogo size="header" onLightBg className="relative z-10" />
            </a>
          </div>

          {/* Zone 2: 5 clean nav links, single-line text in dark charcoal/slate */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-orange-600 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange-600 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary CTA Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenQuote}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 active:scale-98 rounded-lg transition-all duration-200 shadow-sm shadow-orange-600/30 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              Demander un devis
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute inset-x-0 top-full bg-white/98 border-b border-slate-200 shadow-xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-200 p-5">
          <div className="flex flex-col gap-3">
            <nav className="flex flex-col divide-y divide-slate-100">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 text-base font-medium text-slate-800 hover:text-orange-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-3 text-center text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-xl transition-colors shadow-md shadow-orange-600/30"
              >
                Demander un devis
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{COMPANY_INFO.contact.phoneDisplay}</span>
                </a>
                <a
                  href={`https://wa.me/${COMPANY_INFO.contact.whatsapp.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogoManager();
                }}
                className="flex items-center justify-center gap-1.5 py-2 text-xs text-slate-400 hover:text-slate-200"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Emplacement Logo Officiel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
