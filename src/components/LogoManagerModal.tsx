import React, { useState } from 'react';
import { X, Upload, RotateCcw, Check, Sparkles, Image as ImageIcon } from 'lucide-react';
import { OfficialLogo } from './OfficialLogo';

interface LogoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoManagerModal: React.FC<LogoManagerModalProps> = ({ isOpen, onClose }) => {
  const [currentLogo, setCurrentLogo] = useState<string | null>(() => {
    try {
      return localStorage.getItem('emtsd_custom_logo');
    } catch {
      return null;
    }
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image valide (PNG, SVG, JPG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      try {
        localStorage.setItem('emtsd_custom_logo', dataUrl);
        setCurrentLogo(dataUrl);
        window.dispatchEvent(new Event('emtsd_logo_updated'));
        setSuccessMessage('Logo officiel mis à jour avec succès.');
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (err) {
        console.error('Storage error', err);
        alert('Image trop volumineuse pour le stockage local. Privilégiez un logo optimisé en SVG ou PNG.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    try {
      localStorage.removeItem('emtsd_custom_logo');
      setCurrentLogo(null);
      window.dispatchEvent(new Event('emtsd_logo_updated'));
      setSuccessMessage('Logo réinitialisé sur l’emblème officiel vectoriel.');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Emplacement Logo Officiel
              </h3>
              <p className="text-xs text-slate-500">
                EMTSD Construction · Diamniadio, Sénégal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-5 space-y-5">
          <p className="text-sm text-slate-600 leading-relaxed">
            Le site affiche le logo officiel d’origine extrait fidèlement de l’affiche EMTSD Construction (le symbole totem vert, orange et jaune, le lettrage « EMTSD », la grue intégrée et la mention « CONSTRUCTION » sur fond transparent).
          </p>

          {/* Current preview */}
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center gap-3">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
              Aperçu en direct (fond clair)
            </span>
            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
              <OfficialLogo size="lg" showBadge onLightBg={true} />
            </div>
          </div>

          {/* Success banner */}
          {successMessage && (
            <div className="flex items-center gap-2 p-3 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <label className="flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-xl cursor-pointer transition-all shadow-md">
              <Upload className="w-4 h-4" />
              <span>Importer votre logo</span>
              <input
                type="file"
                accept="image/png, image/jpeg, image/svg+xml, image/webp"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>

            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Réinitialiser logo</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-500 flex items-start gap-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
            <span>
              Format conseillé : fichier PNG sur fond transparent ou SVG vectoriel (hauteur min. 80px).
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
