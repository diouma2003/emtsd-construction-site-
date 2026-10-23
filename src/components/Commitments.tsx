import React from 'react';
import { ShieldCheck, AlertTriangle, Handshake, Check, CheckCircle2 } from 'lucide-react';
import { COMMITMENTS_DATA } from '../data/companyData';

export const Commitments: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case 'AlertTriangle': return <AlertTriangle className="w-6 h-6 text-orange-400" />;
      case 'Handshake': return <Handshake className="w-6 h-6 text-emerald-400" />;
      default: return <ShieldCheck className="w-6 h-6 text-orange-400" />;
    }
  };

  return (
    <section id="engagements" className="scroll-mt-20 py-20 sm:py-28 bg-slate-50 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 tracking-wider uppercase mb-3">
            <span>Rigueur Professionnelle</span>
            <span aria-hidden="true">·</span>
            <span>Pratiques de Chantier</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading [text-wrap:balance]">
            Nos engagements fondamentaux : Qualité, Sécurité et Collaboration
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Dans le BTP, la solidité d’un partenariat repose sur le respect des engagements et la rigueur sur le terrain. Voici les trois principes directeurs appliqués par EMTSD Construction à Diamniadio et sur l’ensemble de ses chantiers.
          </p>
        </div>

        {/* 3 Pillars Grid: Qualité, Sécurité, Collaboration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COMMITMENTS_DATA.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-7 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div>
                {/* Header: Icon & Number */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    {getIcon(item.iconName)}
                  </div>
                  <span className="font-mono text-xl font-bold text-slate-400 tabular-nums">
                    {item.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  {item.title}
                </h3>
                <span className="text-xs text-orange-600 font-medium block mt-1">
                  {item.subtitle}
                </span>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Concrete Points */}
                <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-4 text-xs text-slate-600">
                  {item.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom tag */}
              <div className="mt-6 pt-3 text-[11px] text-slate-400 font-mono border-t border-slate-100">
                Pratique opérationnelle · Diamniadio
              </div>
            </div>
          ))}
        </div>

        {/* Highlighted Banner on Technical Care */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase font-semibold text-emerald-600 tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Méthodologie & Suivi d’Exécution</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
              Contrôles dimensionnels réguliers & conformité des armatures
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Chaque coulage de béton est précédé d’une inspection rigoureuse des coffrages, cales d'enrobage et ligatures d'acier conformément aux plans d'exécution.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-700 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 shrink-0">
            <span className="text-orange-600 font-semibold">Gros Œuvre</span>
            <span className="text-slate-300">/</span>
            <span className="text-emerald-600 font-semibold">Second Œuvre</span>
            <span className="text-slate-300">/</span>
            <span>VRD</span>
          </div>
        </div>

      </div>
    </section>
  );
};
