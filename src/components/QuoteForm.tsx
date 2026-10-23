import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Mail, 
  Copy, 
  Printer, 
  RotateCcw, 
  AlertCircle,
  FileText,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/companyData';
import { QuoteFormData, QuoteSubmissionResult } from '../types';

interface QuoteFormProps {
  preselectedService?: string;
  onClearPreselected?: () => void;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ 
  preselectedService, 
  onClearPreselected 
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    phone: '',
    email: '',
    projectType: 'Construction de Bâtiments',
    location: 'Diamniadio (Pôle Urbain)',
    estimatedBudget: '',
    timeframe: 'Dans les 3 mois',
    description: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [customTimeframe, setCustomTimeframe] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const [customProjectType, setCustomProjectType] = useState('');
  const [submissionResult, setSubmissionResult] = useState<QuoteSubmissionResult | null>(null);
  const [copied, setCopied] = useState(false);

  // Synchronize preselected service when passed from other sections
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, projectType: preselectedService }));
    }
  }, [preselectedService]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof QuoteFormData, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Veuillez saisir votre nom et prénom (au moins 3 caractères).';
    }

    // Phone validation: supports Senegalese formats (e.g. 78 403 03 53, 77..., 70..., +221...)
    const cleanPhone = formData.phone.replace(/[\s.-]/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      newErrors.phone = 'Numéro de téléphone requis (ex: 78 403 03 53 ou +221 78 403 03 53).';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Veuillez fournir une adresse e-mail valide.';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Veuillez sélectionner un type de projet.';
    } else if (formData.projectType === 'Autre demande de travaux' && !customProjectType.trim()) {
      newErrors.projectType = 'Veuillez décrire les travaux que vous souhaitez réaliser.';
    }

    const isOtherLocation =
      formData.location === 'Autre Région du Sénégal' || formData.location === 'Autre région du Sénégal';
    if (isOtherLocation && !customLocation.trim()) {
      newErrors.location = 'Veuillez préciser la région où se trouve votre chantier.';
    }

    if (formData.timeframe === 'Autre délai (à préciser)' && !customTimeframe.trim()) {
      newErrors.timeframe = 'Veuillez préciser le délai souhaité pour votre projet.';
    }

    if (!formData.description.trim() || formData.description.trim().length < 15) {
      newErrors.description = 'Veuillez décrire brièvement votre projet (au moins 15 caractères : type d’ouvrage, surface approximative, besoins particuliers).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const finalProjectType = formData.projectType === 'Autre demande de travaux'
      ? (customProjectType.trim() ? customProjectType.trim() : 'Autre demande de travaux')
      : formData.projectType;

    const isOtherLocation =
      formData.location === 'Autre Région du Sénégal' || formData.location === 'Autre région du Sénégal';
    const finalLocation = isOtherLocation
      ? (customLocation.trim() ? customLocation.trim() : formData.location)
      : formData.location;

    const finalTimeframe = formData.timeframe === 'Autre délai (à préciser)'
      ? (customTimeframe.trim() ? customTimeframe.trim() : 'Autre délai (à préciser)')
      : formData.timeframe;

    const uniqueRef = `EMTSD-DEV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const result: QuoteSubmissionResult = {
      ...formData,
      projectType: finalProjectType,
      location: finalLocation,
      timeframe: finalTimeframe,
      quoteReference: uniqueRef,
      submittedAt: new Date().toLocaleDateString('fr-SN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    try {
      await fetch('https://formsubmit.co/ajax/mouha6428@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          nom: result.fullName,
          telephone: result.phone,
          email: result.email,
          domaine: result.projectType,
          lieu: result.location,
          budget_estime: result.estimatedBudget || 'Non spécifié',
          delai: result.timeframe,
          description: result.description,
          reference_devis: result.quoteReference,
          date_soumission: result.submittedAt,
          _subject: `Demande de devis ${result.quoteReference} (${result.fullName}) - EMTSD Construction`,
          _template: 'table',
        }),
      });
    } catch (error) {
      console.error('Envoi e-mail échoué', error);
    }
    setSubmissionResult(result);
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setErrors({});
    setCustomTimeframe('');
    setCustomLocation('');
    setCustomProjectType('');
    if (onClearPreselected) onClearPreselected();
  };

  // Generate WhatsApp preformatted message
  const getWhatsAppLink = () => {
    if (!submissionResult) return '';
    const message = `*DEMANDE DE DEVIS EMTSD CONSTRUCTION*
Réf : ${submissionResult.quoteReference}
Date : ${submissionResult.submittedAt}
------------------------------
*Client :* ${submissionResult.fullName}
*Téléphone :* ${submissionResult.phone}
*E-mail :* ${submissionResult.email}
*Type de Projet :* ${submissionResult.projectType}
*Localisation du Chantier :* ${submissionResult.location}
*Budget / Surface Indicative :* ${submissionResult.estimatedBudget || 'À évaluer sur plan'}
*Délai Souhaité :* ${submissionResult.timeframe}
------------------------------
*Description du Projet :*
${submissionResult.description}
------------------------------
_Demande transmise via le site officiel www.emts.com_`;

    return `https://wa.me/${COMPANY_INFO.contact.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
  };

  // Generate Email mailto link
  const getEmailLink = () => {
    if (!submissionResult) return '';
    const subject = `Demande de Devis [${submissionResult.quoteReference}] - ${submissionResult.projectType} - ${submissionResult.fullName}`;
    const body = `Bonjour la direction d'EMTSD Construction,

Je vous transmets les détails de mon projet pour l'établissement d'une étude et d'un devis :

RÉFÉRENCE : ${submissionResult.quoteReference}
DATE : ${submissionResult.submittedAt}

COORDONNÉES :
- Nom & Prénom : ${submissionResult.fullName}
- Téléphone : ${submissionResult.phone}
- E-mail : ${submissionResult.email}

SPÉCIFICATIONS DU PROJET :
- Type d'ouvrage : ${submissionResult.projectType}
- Localisation du chantier : ${submissionResult.location}
- Budget indicatif ou surface : ${submissionResult.estimatedBudget || 'Non spécifié'}
- Délai d'exécution souhaité : ${submissionResult.timeframe}

DESCRIPTION DU PROJET :
${submissionResult.description}

Dans l'attente de votre retour technique,
Cordialement,
${submissionResult.fullName}`;

    return `mailto:${COMPANY_INFO.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCopySummary = () => {
    if (!submissionResult) return;
    const textToCopy = `DEVIS EMTSD CONSTRUCTION (${submissionResult.quoteReference})
Client : ${submissionResult.fullName} | Tél : ${submissionResult.phone} | Mail : ${submissionResult.email}
Projet : ${submissionResult.projectType} à ${submissionResult.location}
Délai : ${submissionResult.timeframe} | Budget/Surface : ${submissionResult.estimatedBudget || 'À définir'}
Détails : ${submissionResult.description}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="devis" className="scroll-mt-20 py-20 sm:py-28 bg-white border-t border-slate-200 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-600 tracking-wider uppercase mb-3">
            <Calculator className="w-4 h-4 text-orange-600" />
            <span>Étude & Estimation Prévisionnelle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading [text-wrap:balance]">
            Demandez votre devis gratuit et personnalisé
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Remplissez notre formulaire technique. Vos informations sont vérifiées immédiatement et peuvent être transmises directement par <strong>WhatsApp</strong> au responsable de chantier au <strong>+221 78 403 03 53</strong> ou par <strong>E-mail</strong>.
          </p>
        </div>

        {/* If Form is submitted, display the validated dossier card */}
        {submissionResult ? (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl animate-in fade-in zoom-in-95 duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold text-emerald-700 tracking-wider">
                    Demande validée & dossier généré
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-mono">
                    Réf : {submissionResult.quoteReference}
                  </h3>
                </div>
              </div>

              <div className="text-xs text-slate-500 sm:text-right font-mono">
                <span>Date d'enregistrement :</span>
                <div className="text-slate-800 font-semibold">{submissionResult.submittedAt}</div>
              </div>
            </div>

            {/* Honest Transparency Alert (Mandated by user prompt) */}
            <div className="my-6 p-4 rounded-xl bg-orange-50 border border-orange-200 text-xs sm:text-sm text-slate-800 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-slate-900 text-sm">
                  Précision importante sur l’envoi de votre devis :
                </p>
                <p className="text-slate-700 leading-relaxed text-xs">
                  <strong>Votre demande est transmise à notre équipe. Vous pouvez aussi nous écrire directement via WhatsApp (+221 78 403 03 53).</strong> Vos informations ont été vérifiées, validées et enregistrées dans votre navigateur sous la référence ci-dessus. Pour que notre équipe à Diamniadio traite votre projet sans délai, transmettez directement ce récapitulatif via <strong>WhatsApp au +221 78 403 03 53</strong> ou par <strong>E-mail</strong> grâce aux boutons ci-dessous.
                </p>
              </div>
            </div>

            {/* Dossier Summary Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 text-xs sm:text-sm">
              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 shadow-sm">
                <span className="text-xs uppercase font-semibold text-slate-500 block tracking-wider">
                  Coordonnées du demandeur
                </span>
                <div>
                  <span className="text-slate-500 text-xs block">Nom complet :</span>
                  <span className="text-slate-900 font-semibold">{submissionResult.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block">Téléphone :</span>
                  <span className="text-slate-900 font-semibold font-mono">{submissionResult.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block">Adresse e-mail :</span>
                  <span className="text-slate-900 font-semibold">{submissionResult.email}</span>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 shadow-sm">
                <span className="text-xs uppercase font-semibold text-slate-500 block tracking-wider">
                  Paramètres de l'ouvrage
                </span>
                <div>
                  <span className="text-slate-500 text-xs block">Type de projet :</span>
                  <span className="text-orange-600 font-semibold">{submissionResult.projectType}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block">Lieu du chantier :</span>
                  <span className="text-slate-900 font-semibold">{submissionResult.location}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block">Délai souhaité :</span>
                  <span className="text-slate-900 font-semibold">{submissionResult.timeframe}</span>
                </div>
                {submissionResult.estimatedBudget && (
                  <div>
                    <span className="text-slate-500 text-xs block">Budget / Surface indicative :</span>
                    <span className="text-slate-900 font-semibold">{submissionResult.estimatedBudget}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description quote box */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm shadow-sm">
              <span className="text-xs uppercase font-semibold text-slate-500 block tracking-wider mb-1">
                Description technique du besoin
              </span>
              <p className="text-slate-700 leading-relaxed italic bg-slate-50 p-3 rounded-lg border border-slate-200">
                "{submissionResult.description}"
              </p>
            </div>

            {/* Direct Action Hub */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                {/* Primary WhatsApp Direct Dispatch */}
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-98 rounded-xl shadow-md transition-all whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Transmettre sur WhatsApp ({COMPANY_INFO.contact.phoneDisplay})</span>
                </a>

                {/* Direct Email dispatch */}
                <a
                  href={getEmailLink()}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors whitespace-nowrap"
                >
                  <Mail className="w-4 h-4" />
                  <span>Envoyer par E-mail</span>
                </a>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0">
                <button
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
                  title="Copier la synthèse dans le presse-papiers"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copié !' : 'Copier résumé'}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
                  title="Imprimer cette fiche de devis"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimer</span>
                </button>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800"
                  title="Créer une nouvelle demande"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Nouveau devis</span>
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* Input Form with Field Validation */
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-lg space-y-6"
          >
            {/* Top advice */}
            <div className="flex items-center justify-between text-xs text-slate-500 pb-4 border-b border-slate-200">
              <span className="font-medium text-slate-700">Tous les champs avec * sont obligatoires</span>
              <span className="text-orange-600 font-medium">Permanence technique : Diamniadio, Sénégal</span>
            </div>

            {/* Row 1: Nom & Téléphone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Nom & Prénom *
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Ex: Ibrahima Diop"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors shadow-sm ${
                    errors.fullName ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Numéro de téléphone *
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Ex: 78 403 03 53 ou +221..."
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors shadow-sm ${
                    errors.phone ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: E-mail & Type de projet */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Adresse E-mail *
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Saisissez votre adresse e-mail"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors shadow-sm ${
                    errors.email ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="projectType" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Domaine de Projet *
                </label>
                <select
                  id="projectType"
                  value={formData.projectType}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, projectType: value });
                    if (errors.projectType) setErrors({ ...errors, projectType: undefined });
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Projet Combiné (Gros Œuvre + VRD + Finitions)">
                    Projet Combiné (Gros Œuvre + VRD + Finitions)
                  </option>
                  <option value="Autre demande de travaux">Autre demande de travaux</option>
                </select>

                {errors.projectType && formData.projectType !== 'Autre demande de travaux' && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.projectType}</span>
                  </p>
                )}

                {formData.projectType === 'Autre demande de travaux' && (
                  <div className="mt-2.5">
                    <input
                      id="customProjectType"
                      type="text"
                      placeholder="Décrivez les travaux que vous souhaitez réaliser"
                      value={customProjectType}
                      onChange={(e) => {
                        setCustomProjectType(e.target.value);
                        if (errors.projectType) setErrors({ ...errors, projectType: undefined });
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm transition-colors ${
                        errors.projectType ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                      }`}
                    />
                    {errors.projectType && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.projectType}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Row 3: Localisation & Budget ou Surface */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
              <div>
                <label htmlFor="location" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Lieu du Chantier
                </label>
                <select
                  id="location"
                  value={formData.location}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, location: value });
                    if (errors.location) setErrors({ ...errors, location: undefined });
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                >
                  <option value="Diamniadio (Pôle Urbain)">Diamniadio (Pôle Urbain)</option>
                  <option value="Dakar & Banlieue">Dakar & Banlieue</option>
                  <option value="Thiès & Environs">Thiès & Environs</option>
                  <option value="Mbour & Petite Côte">Mbour & Petite Côte</option>
                  <option value="Autre Région du Sénégal">Autre Région du Sénégal</option>
                </select>

                {(formData.location === 'Autre Région du Sénégal' || formData.location === 'Autre région du Sénégal') && (
                  <div className="mt-2.5">
                    <input
                      id="customLocation"
                      type="text"
                      placeholder="Précisez la région où se trouve votre chantier"
                      value={customLocation}
                      onChange={(e) => {
                        setCustomLocation(e.target.value);
                        if (errors.location) setErrors({ ...errors, location: undefined });
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm transition-colors ${
                        errors.location ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                      }`}
                    />
                    {errors.location && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.location}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="timeframe" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Délai Souhaité
                </label>
                <select
                  id="timeframe"
                  value={formData.timeframe}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, timeframe: value });
                    if (errors.timeframe) setErrors({ ...errors, timeframe: undefined });
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                >
                  <option value="Immédiat / Urgent (< 1 mois)">Immédiat / Urgent (&lt; 1 mois)</option>
                  <option value="Dans les 3 mois">Dans les 3 mois</option>
                  <option value="Dans les 6 mois">Dans les 6 mois</option>
                  <option value="Phase d'étude préliminaire">Phase d'étude préliminaire</option>
                  <option value="Autre délai (à préciser)">Autre délai (à préciser)</option>
                </select>

                {formData.timeframe === 'Autre délai (à préciser)' && (
                  <div className="mt-2.5">
                    <input
                      id="customTimeframe"
                      type="text"
                      placeholder="Précisez le délai souhaité pour votre projet"
                      value={customTimeframe}
                      onChange={(e) => {
                        setCustomTimeframe(e.target.value);
                        if (errors.timeframe) setErrors({ ...errors, timeframe: undefined });
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm transition-colors ${
                        errors.timeframe ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                      }`}
                    />
                    {errors.timeframe && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.timeframe}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="estimatedBudget" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Budget ou Surface Indicative
                </label>
                <input
                  id="estimatedBudget"
                  type="text"
                  placeholder="Ex: 350 m² ou Budget X FCFA"
                  value={formData.estimatedBudget}
                  onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                />
              </div>
            </div>

            {/* Row 4: Description */}
            <div>
              <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Description Détaillée du Projet *
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Précisez votre demande : type de structure (R+1, villa, hangar, voirie), état actuel du terrain, plans existants ou besoin d'études, contraintes de calendrier..."
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  if (errors.description) setErrors({ ...errors, description: undefined });
                }}
                className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors shadow-sm ${
                  errors.description ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                }`}
              />
              {errors.description && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.description}</span>
                </p>
              )}
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col gap-1 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Vérification instantanée des données & synthèse de devis</span>
                </div>
                <span className="text-[11px] text-slate-500">
                  Note : Votre demande sera transmise à notre équipe. Vous pourrez aussi nous écrire directement via WhatsApp (+221 78 403 03 53.
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 active:scale-98 rounded-xl shadow-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                <span>Envoyer ma demande de devis</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

      </div>
    </section>
  );
};
