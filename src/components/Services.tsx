import React, { useState } from 'react';
import { 
  Compass, 
  Building2, 
  Wrench, 
  HardHat, 
  Cpu, 
  LayoutGrid, 
  ArrowRight, 
  Check, 
  FileText,
  ChevronRight
} from 'lucide-react';
import { SERVICES_DATA } from '../data/companyData';
import { ServiceItem } from '../types';

interface ServicesProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForQuote }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Icon mapper
  const renderIcon = (name: string) => {
    const props = { className: 'w-6 h-6 text-orange-400' };
    switch (name) {
      case 'Compass': return <Compass {...props} />;
      case 'Building2': return <Building2 {...props} />;
      case 'Wrench': return <Wrench {...props} />;
      case 'HardHat': return <HardHat {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'LayoutGrid': return <LayoutGrid {...props} />;
      default: return <Building2 {...props} />;
    }
  };

  return (
    <section id="services" className="scroll-mt-20 py-20 sm:py-28 bg-slate-50 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 tracking-wider uppercase mb-3">
              <span>Domaines d’Activité</span>
              <span aria-hidden="true">·</span>
              <span>Expertises BTP & Ingénierie</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading [text-wrap:balance]">
              Nos solutions complètes pour tous vos chantiers
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              De l’étude géotechnique à l’aménagement final, EMTSD Construction mobilise ses compétences et ses engins pour garantir la solidité, la conformité et l’élégance de vos projets au Sénégal.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium shrink-0">
            <span>6 Domaines de compétences BTP</span>
          </div>
        </div>

        {/* 6 Services Grid with Images and Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col justify-between rounded-2xl bg-white border border-slate-200 hover:border-orange-300 transition-all duration-300 hover:shadow-lg shadow-sm overflow-hidden"
            >
              <div>
                {/* Service Card Image Header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  {service.imagePath && (
                    <img
                      src={service.imagePath}
                      alt={`Illustration du service ${service.title}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  {/* Subtle contrast gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/30 to-transparent" />
                  
                  {/* Floating Icon Box & Number */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="p-2.5 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200/90 shadow-md">
                      {renderIcon(service.iconName)}
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-700 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-200 tabular-nums shadow-sm">
                      Pôle {service.number}
                    </span>
                  </div>

                  {/* Title overlay at the base of the image */}
                  <div className="absolute bottom-2.5 left-4 right-4">
                    <h3 className="text-lg font-bold text-white font-heading group-hover:text-orange-300 transition-colors drop-shadow">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[50px]">
                    {service.shortDesc}
                  </p>

                  {/* Highlights */}
                  <ul className="mt-4 space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
                    {service.highlights.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-semibold text-slate-600 hover:text-orange-600 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Détails & livrables</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onSelectServiceForQuote(service.title)}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 active:scale-95 rounded-lg transition-all duration-200 inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-sm shadow-orange-600/30"
                  title={`Demander un devis pour ${service.title}`}
                >
                  <span>Demander un devis</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>



      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-800">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl border border-orange-100">
                  {renderIcon(selectedService.iconName)}
                </div>
                <div>
                  <span className="text-xs font-mono text-orange-600 font-semibold">Service {selectedService.number}</span>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">{selectedService.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            <div className="py-5 space-y-5 text-sm max-h-[70vh] overflow-y-auto pr-1">
              {selectedService.imagePath && (
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-slate-200">
                  <img
                    src={selectedService.imagePath}
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-3 text-xs font-semibold text-white bg-black/60 px-2.5 py-1 rounded backdrop-blur-sm">
                    Pôle {selectedService.number} · EMTSD Construction
                  </span>
                </div>
              )}

              <div>
                <h4 className="text-xs uppercase font-semibold text-slate-500 tracking-wider mb-2">
                  Descriptif Opérationnel
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  {selectedService.fullDesc}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase font-semibold text-slate-500 tracking-wider mb-2">
                  Méthodologie & Contrôles
                </h4>
                <ul className="space-y-2">
                  {selectedService.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs uppercase font-semibold text-slate-500 tracking-wider mb-2">
                  Livrables & Garanties
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.deliverables.map((d, i) => (
                    <span 
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-md"
                    >
                      <FileText className="w-3 h-3 text-orange-600" />
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Fermer
              </button>

              <button
                onClick={() => {
                  const serviceName = selectedService.title;
                  setSelectedService(null);
                  onSelectServiceForQuote(serviceName);
                }}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shadow-orange-600/30"
              >
                <span>Demander un devis pour ce service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
