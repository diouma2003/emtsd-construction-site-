import React from 'react';
import { OfficialLogo } from './OfficialLogo';
import { COMPANY_INFO, SERVICES_DATA } from '../data/companyData';
import { Phone, Mail, Globe, MapPin, ArrowUp, Share2, Shield } from 'lucide-react';

interface FooterProps {
  onOpenLegal: () => void;
  onOpenLogoManager?: () => void;
  onOpenQuote?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenLegal, 
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 border-t border-slate-200 pt-16 pb-12 text-slate-600 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200">
          
          {/* Brand & Slogan (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#accueil" className="inline-block">
              <OfficialLogo size="md" onLightBg={true} />
            </a>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm mt-3">
              Entreprise générale de BTP, Génie Civil et Travaux Publics basée à Diamniadio, Sénégal. Nous concevons et réalisons des ouvrages durables dans le respect des normes les plus strictes.
            </p>

          </div>

          {/* Quick Nav (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-bold text-slate-900 tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#accueil" className="text-slate-600 hover:text-orange-600 transition-colors">Accueil</a></li>
              <li><a href="#a-propos" className="text-slate-600 hover:text-orange-600 transition-colors">À propos d'EMTSD</a></li>
              <li><a href="#services" className="text-slate-600 hover:text-orange-600 transition-colors">Nos Services BTP</a></li>
              <li><a href="#realisations" className="text-slate-600 hover:text-orange-600 transition-colors">Galerie de Réalisations</a></li>
              <li><a href="#engagements" className="text-slate-600 hover:text-orange-600 transition-colors">Nos Engagements</a></li>
              <li><a href="#contact" className="text-slate-600 hover:text-orange-600 transition-colors">Contact & Accès</a></li>
            </ul>
          </div>

          {/* Services Quicklist (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold text-slate-900 tracking-wider">
              Expertises
            </h4>
            <ul className="space-y-1.5 text-xs">
              {SERVICES_DATA.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5">
                    <span className="text-orange-600 font-mono text-[10px]">{s.number}.</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold text-slate-900 tracking-wider">
              Coordonnées
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                <span className="text-slate-700">Diamniadio (Pôle Urbain), Région de Dakar, Sénégal</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <a href={`tel:${COMPANY_INFO.contact.phoneRaw}`} className="text-slate-900 hover:text-orange-600 font-mono font-medium">
                  {COMPANY_INFO.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <a href={COMPANY_INFO.contact.websiteUrl} className="text-slate-900 hover:text-orange-600 hover:underline">
                  {COMPANY_INFO.contact.website}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="text-slate-600">{COMPANY_INFO.contact.email}</span>
              </div>

              {/* Social icons */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={COMPANY_INFO.social.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-600 rounded-lg transition-colors border border-slate-300 shadow-sm"
                  title="Facebook MTSD"
                >
                  <Share2 className="w-3.5 h-3.5 text-blue-600" />
                </a>
                <a
                  href={COMPANY_INFO.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-pink-600 rounded-lg transition-colors border border-slate-300 shadow-sm"
                  title="Instagram e.m.t.s.d Construction"
                >
                  <Share2 className="w-3.5 h-3.5 text-pink-600" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-slate-500">
            <span>© {new Date().getFullYear()} EMTSD Construction. Tous droits réservés.</span>
            <span aria-hidden="true">·</span>
            <span>Diamniadio, Sénégal</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenLegal}
              className="text-slate-600 hover:text-slate-900 underline cursor-pointer"
            >
              Mentions Légales & Registres
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
