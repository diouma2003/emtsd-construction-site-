import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/companyData';
import { ProjectFilter, ProjectItem } from '../types';
import { Eye, MapPin, X, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProjectsProps {
  onOpenQuote: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenQuote }) => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const [inspectingProject, setInspectingProject] = useState<ProjectItem | null>(null);

  const filters: { id: ProjectFilter; label: string }[] = [
    { id: 'all', label: 'Tous les projets' },
    { id: 'batiment', label: 'Bâtiment & Résidentiel' },
    { id: 'tp_genie_civil', label: 'Génie Civil & VRD' },
    { id: 'etudes', label: 'Études & Ingénierie' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeFilter);

  return (
    <section id="realisations" className="scroll-mt-20 py-20 sm:py-28 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 tracking-wider uppercase mb-3">
              <span>Chantiers & Savoir-Faire</span>
              <span aria-hidden="true">·</span>
              <span>Galerie de Réalisations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading [text-wrap:balance]">
              Nos chantiers et réalisations techniques
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Découvrez nos travaux en cours d’exécution, nos finitions et nos compétences concrètes en bâtiment, génie civil et aménagement.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 border border-slate-200 rounded-xl shrink-0">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-orange-600 text-white font-semibold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden hover:border-slate-300 transition-all duration-300 shadow-xs hover:shadow-md"
            >
              {/* Image Container with Fallback */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={project.imagePath}
                  alt={project.altText}
                  className={`w-full h-full object-cover ${project.imagePosition || 'object-center'} group-hover:scale-103 transition-transform duration-500`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />

                {/* Status Badge */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-md backdrop-blur-md shadow-xs ${
                      project.statusBadge === 'Finitions extérieures'
                        ? 'bg-emerald-50/95 text-emerald-800 border border-emerald-200'
                        : project.statusBadge === 'Chantier en cours d’exécution'
                        ? 'bg-amber-50/95 text-amber-900 border border-amber-200'
                        : 'bg-white/95 text-slate-800 border border-slate-200'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        project.statusBadge === 'Chantier en cours d’exécution'
                          ? 'bg-amber-500 animate-pulse'
                          : project.statusBadge === 'Finitions extérieures' || project.statusBadge === 'Ouvrage achevé'
                          ? 'bg-emerald-500'
                          : 'bg-orange-500'
                      }`}
                    />
                    <span>{project.statusBadge}</span>
                  </span>

                  <button
                    onClick={() => setInspectingProject(project)}
                    className="p-2 bg-slate-900/70 hover:bg-orange-600 text-white rounded-lg backdrop-blur-md transition-colors cursor-pointer"
                    title="Agrandir et voir les détails"
                    aria-label={`Agrandir la photo de ${project.title}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Location and Category on Image bottom */}
                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs text-white pointer-events-none">
                  <div className="flex items-center gap-1.5 bg-slate-950/70 px-2.5 py-1 rounded-md backdrop-blur-sm">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" />
                    <span>{project.location}</span>
                  </div>
                  <span className="font-mono text-[11px] bg-slate-950/70 px-2 py-1 rounded-md backdrop-blur-sm text-slate-200">
                    {project.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-orange-600 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Specs snapshot */}
                <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  {project.specs.slice(0, 2).map((s, idx) => (
                    <div key={idx} className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 uppercase block truncate">{s.label}</span>
                      <span className="font-semibold text-slate-800 truncate block text-[11px] sm:text-xs">{s.value}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-5 flex items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => setInspectingProject(project)}
                    className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors cursor-pointer"
                  >
                    Agrandir la photo
                  </button>

                  <button
                    onClick={onOpenQuote}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>Demander un devis</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Invitation Callout (Demandé expressément par l'utilisateur) */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="max-w-2xl">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Vous souhaitez découvrir davantage de nos réalisations ?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Contactez-nous pour obtenir plus d’informations et découvrir d’autres projets réalisés par EMTSD Construction.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 active:scale-98 rounded-xl transition-all duration-200 shadow-md shadow-orange-600/20 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Nous contacter</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Project Inspection Modal / Lightbox */}
      {inspectingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden p-5 sm:p-6 text-slate-800 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="pr-4">
                <span className="text-xs text-orange-600 font-semibold uppercase tracking-wider block">
                  {inspectingProject.categoryLabel}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                  {inspectingProject.title}
                </h3>
              </div>
              <button
                onClick={() => setInspectingProject(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              {/* Full Image Container - preserves full uncropped height and quality */}
              <div className="relative max-h-[62vh] w-full rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center p-1 sm:p-2">
                <img
                  src={inspectingProject.imagePath}
                  alt={inspectingProject.altText}
                  className="max-h-[60vh] w-auto max-w-full object-contain mx-auto rounded-lg"
                />
              </div>

              {/* Status Badge in Modal */}
              {inspectingProject.statusBadge && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-800">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      inspectingProject.statusBadge === 'Chantier en cours d’exécution'
                        ? 'bg-amber-500 animate-pulse'
                        : inspectingProject.statusBadge === 'Finitions extérieures'
                        ? 'bg-emerald-500'
                        : 'bg-orange-500'
                    }`}
                  />
                  <span>Statut : {inspectingProject.statusBadge}</span>
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {inspectingProject.description}
              </p>

              <div>
                <h4 className="text-xs uppercase font-semibold text-slate-500 tracking-wider mb-2">
                  Détails & Cadre Technique
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {inspectingProject.specs.map((s, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block text-[11px]">{s.label}</span>
                      <span className="font-semibold text-slate-800">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setInspectingProject(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Fermer
              </button>

              <button
                onClick={() => {
                  setInspectingProject(null);
                  onOpenQuote();
                }}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-sm shadow-orange-600/30 cursor-pointer"
              >
                <span>Demander un devis pour ce type de projet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
