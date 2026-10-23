import React from 'react';
import { X, Shield, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-800 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Mentions Légales & Informations Réglementaires
              </h3>
              <p className="text-xs text-slate-500">
                EMTSD Construction · République du Sénégal
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

        {/* Content with clear blanks to complete */}
        <div className="py-5 space-y-6 text-xs sm:text-sm text-slate-600">
          
          <div className="p-3.5 rounded-xl bg-orange-50 border border-orange-200 text-xs text-orange-800 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-orange-600" />
            <span>
              Les mentions ci-dessous contiennent les emplacements réservés aux numéros d'enregistrement officiels sénégalais (NINEA, RCCM) à compléter par la direction juridique d'EMTSD Construction.
            </span>
          </div>

          {/* Section 1: Identification */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-600">
              1. Éditeur du Site & Identification de l’Entreprise
            </h4>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-slate-700">
              <p><strong className="text-slate-900">Dénomination sociale :</strong> {COMPANY_INFO.legal.denomination}</p>
              <p><strong className="text-slate-900">Forme juridique :</strong> {COMPANY_INFO.legal.legalForm}</p>
              <p><strong className="text-slate-900">Siège social :</strong> {COMPANY_INFO.location.zone}, Diamniadio, Sénégal</p>
              <p className="bg-white p-2 rounded border border-slate-200">
                <strong className="text-emerald-700">NINEA :</strong> {COMPANY_INFO.legal.ninea}
              </p>
              <p className="bg-white p-2 rounded border border-slate-200">
                <strong className="text-emerald-700">RCCM :</strong> {COMPANY_INFO.legal.rccm}
              </p>
              <p><strong className="text-slate-900">Téléphone :</strong> {COMPANY_INFO.contact.phoneDisplay} ({COMPANY_INFO.contact.phoneRaw})</p>
              <p><strong className="text-slate-900">E-mail officiel :</strong> {COMPANY_INFO.contact.email}</p>
              <p><strong className="text-slate-900">Site internet :</strong> {COMPANY_INFO.contact.website}</p>
              <p><strong className="text-slate-900">Directeur de la publication :</strong> {COMPANY_INFO.legal.director}</p>
            </div>
          </div>

          {/* Section 2: Hosting */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-600">
              2. Hébergement & Sécurité
            </h4>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-slate-700">
              <p><strong className="text-slate-900">Hébergeur :</strong> {COMPANY_INFO.legal.hosting}</p>
              <p className="text-slate-500 leading-relaxed">
                Le site est sécurisé par protocole HTTPS avec certificat SSL/TLS valide.
              </p>
            </div>
          </div>

          {/* Section 3: Propriété intellectuelle */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-600">
              3. Propriété Intellectuelle & Crédits
            </h4>
            <p className="leading-relaxed text-slate-600">
              L'ensemble des éléments constituant ce site web (textes, logos, architecture graphique, modélisations techniques) est protégé par les lois sur la propriété intellectuelle en vigueur au Sénégal (OAPI) et les traités internationaux. Toute reproduction totale ou partielle de la marque EMTSD sans autorisation préalable est interdite.
            </p>
          </div>

          {/* Section 4: Données personnelles */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-600">
              4. Protection des Données Personnelles
            </h4>
            <p className="leading-relaxed text-slate-600">
              Les données recueillies via les formulaires de devis et de contact (nom, téléphone, e-mail) sont exclusivement destinées au traitement technique et commercial de vos demandes par EMTSD Construction. Elles ne sont ni cédées ni revendues à des tiers, conformément aux recommandations de la Commission de Protection des Données Personnelles (CDP) du Sénégal.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
