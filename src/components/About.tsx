import React from 'react';
import { MapPin, Target, Users, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface AboutProps {
  onOpenQuote: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenQuote }) => {
  return (
    <section id="a-propos" className="scroll-mt-20 py-20 sm:py-28 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 tracking-wider uppercase mb-3">
            <span>Présentation d’Entreprise</span>
            <span aria-hidden="true">·</span>
            <span>Ancrage Territorial</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading [text-wrap:balance]">
            Une ingénierie de précision au cœur du Pôle Urbain de Diamniadio
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            EMTSD Construction s’affirme comme un partenaire d’exécution fiable pour les maîtres d’ouvrage privés, institutionnels et industriels qui souhaitent ériger des structures solides, durables et conformes aux normes d’ingénierie contemporaines.
          </p>
        </div>

        {/* 2-Column Split: Story & Implantation vs On-Site Team Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Authentic presentation & Strategic Location */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-5 text-slate-600 text-sm sm:text-base leading-relaxed">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-orange-600 font-semibold text-sm mb-2">
                  <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>Implantation Stratégique à Diamniadio</span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Située au carrefour névralgique de <strong>Diamniadio</strong>, vitrine du Sénégal émergent et pôle urbain moderne connecté par l’Autoroute de l’Avenir et le Train Express Régional (TER), EMTSD Construction bénéficie d’une réactivité logistique optimale pour desservir la région de Dakar, Thiès, la Petite Côte et les grands chantiers nationaux.
                </p>
              </div>

              <p>
                Notre démarche repose sur la rigueur d’ingénierie et l’intégrité opérationnelle : nous ne faisons aucun compromis sur les dosages, la qualité des ferraillages ou la sécurité des hommes sur le terrain. Chaque étape fait l’objet de vérifications techniques strictes.
              </p>

              {/* Core Strengths */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm mb-1">
                    <Target className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Vision Durable</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Construire des bâtiments pérennes qui résistent aux contraintes climatiques et géotechniques locales du sol sénégalais.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm mb-1">
                    <Users className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>Équipe Qualifiée</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Ingénieurs en génie civil, métreurs et conducteurs de travaux expérimentés mobilisés en permanence sur site.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Callout & Legal Registry Reference */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Dénomination :</span> {COMPANY_INFO.legal.denomination} · {COMPANY_INFO.location.city}, Sénégal
              </div>

              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors cursor-pointer"
              >
                <span>Consulter notre bureau d'études</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Evidence Card with Engineers Photo */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md group h-full flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden shrink-0 bg-slate-100">
                <img
                  src="/src/assets/images/engineers_architects_site_1792675965399.jpg"
                  alt="Ingénieurs et architectes sénégalais sur un chantier de bâtiment"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                
                {/* Photo Badge (Unboxed clean metadata) */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="font-medium bg-black/60 px-2.5 py-1 rounded backdrop-blur-sm border border-white/10">
                    Supervision & ingénierie de chantier
                  </span>
                  <span className="text-[11px] text-slate-200 bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
                    Diamniadio & Environs
                  </span>
                </div>
              </div>

              {/* Caption & Values */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-heading">
                    La rigueur du terrain au service de votre projet
                  </h4>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    Avant chaque phase de coulage de béton, nos ingénieurs procèdent à la vérification des armatures, des calages d’enrobage et de la verticalité des coffrages.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Bureau d'études</span>
                    <span className="font-semibold text-slate-800">Plans & Notes de calcul</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Sécurité</span>
                    <span className="font-semibold text-emerald-600">Prévention active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
