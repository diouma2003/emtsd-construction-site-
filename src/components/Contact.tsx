import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  MessageSquare, 
  Clock, 
  Send, 
  ExternalLink,
  Navigation,
  CheckCircle2,
  Share2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: '',
  });
  const [fieldErrors, setFieldErrors] = useState<{
    nom?: string;
    email?: string;
    message?: string;
  }>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    const errs: { nom?: string; email?: string; message?: string } = {};

    if (!formData.nom.trim()) {
      errs.nom = 'Veuillez saisir votre nom.';
    } else if (formData.nom.trim().length < 2) {
      errs.nom = 'Le nom doit comporter au moins 2 caractères.';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Veuillez saisir votre adresse e-mail.';
    } else if (!emailPattern.test(formData.email.trim())) {
      errs.email = 'Veuillez renseigner une adresse e-mail valide (ex: contact@exemple.com).';
    }

    if (!formData.message.trim()) {
      errs.message = 'Veuillez rédiger votre message.';
    } else if (formData.message.trim().length < 5) {
      errs.message = 'Le message doit comporter au moins 5 caractères.';
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitStatus('submitting');
    setErrorMessage(null);

    try {
      const response = await fetch('https://formsubmit.co/ajax/mouha6428@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          nom: formData.nom.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          _subject: `Nouveau message de contact (${formData.nom.trim()}) - EMTSD Construction`,
          _template: 'table',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ nom: '', email: '', message: '' });
        setFieldErrors({});
      } else {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Une erreur est survenue lors de l'envoi de votre message.");
      }
    } catch (err: any) {
      console.error('Erreur FormSubmit:', err);
      setSubmitStatus('error');
      setErrorMessage(
        err?.message ||
          "Une erreur est survenue lors de l'envoi de votre message. Veuillez vérifier votre connexion et réessayer ou nous contacter par téléphone au 78 403 03 53."
      );
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 py-20 sm:py-28 bg-slate-50 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 tracking-wider uppercase mb-3">
            <span>Coordonnées & Siège Opérationnel</span>
            <span aria-hidden="true">·</span>
            <span>Diamniadio, Sénégal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading [text-wrap:balance]">
            Rencontrons-nous pour concrétiser vos infrastructures
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Nos bureaux et équipes de terrain vous accueillent à Diamniadio. Vous pouvez nous joindre directement par téléphone, WhatsApp ou e-mail.
          </p>
        </div>

        {/* 3-Column / Bento Layout: Contact Information, Diamniadio Access Map & Quick Message */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Column 1: Official Coordinates (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Phone & WhatsApp Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                <Phone className="w-5 h-5 text-orange-600" />
                <span>Ligne Directe & WhatsApp</span>
              </h3>
              
              <div className="space-y-3">
                <a
                  href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-orange-500/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg group-hover:scale-105 transition-transform">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block">Téléphone officiel</span>
                      <span className="text-base font-bold text-slate-900 font-mono group-hover:text-orange-600">
                        {COMPANY_INFO.contact.phoneDisplay}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-orange-600 font-semibold">Appeler</span>
                </a>

                <a
                  href={`https://wa.me/${COMPANY_INFO.contact.whatsapp.replace('+', '')}?text=${encodeURIComponent("Bonjour EMTSD Construction, je vous contacte depuis votre site web www.emts.com.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-200/60 text-emerald-700 rounded-lg group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-emerald-800 block">Canal WhatsApp direct</span>
                      <span className="text-sm font-bold text-emerald-950 font-mono">
                        +221 {COMPANY_INFO.contact.phoneDisplay}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-700 font-semibold">Discuter</span>
                </a>
              </div>
            </div>

            {/* Address & Digital Channels */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm text-sm">
              <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <span>Localisation & Réseaux Sociaux</span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block text-[11px]">Siège Opérationnel :</span>
                    <span className="font-semibold text-slate-900">Diamniadio, Sénégal</span>
                    <p className="text-slate-600 text-xs mt-0.5">{COMPANY_INFO.location.zone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <Globe className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block text-[11px]">Site Web Officiel :</span>
                    <a 
                      href={COMPANY_INFO.contact.websiteUrl} 
                      className="font-semibold text-orange-600 hover:underline"
                    >
                      {COMPANY_INFO.contact.website}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block text-[11px]">Horaires d'ouverture :</span>
                    <span className="text-slate-800">Lun - Ven : {COMPANY_INFO.hours.weekdays}</span>
                    <span className="text-slate-500 block text-xs">Sam : {COMPANY_INFO.hours.saturday}</span>
                  </div>
                </div>
              </div>

              {/* Social Channels Specified in Prompt */}
              <div className="pt-3 border-t border-slate-200">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2.5">
                  Réseaux Sociaux Officiels
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={COMPANY_INFO.social.facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 hover:text-slate-900 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5 text-blue-600" />
                    <span className="truncate">Facebook : <strong>{COMPANY_INFO.social.facebook.name}</strong></span>
                  </a>

                  <a
                    href={COMPANY_INFO.social.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 hover:text-slate-900 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5 text-pink-600" />
                    <span className="truncate">Instagram : <strong>{COMPANY_INFO.social.instagram.handle}</strong></span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Column 2: Diamniadio Interactive Card & Route Guide (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Diamniadio Location Spotlight Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 relative overflow-hidden shadow-sm">
              {/* Architectural grid background */}
              <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-lg">
                      <Navigation className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-heading">
                        Pôle Urbain de Diamniadio
                      </h4>
                      <span className="text-xs text-slate-500 font-mono">
                        GPS : {COMPANY_INFO.location.coordinates}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                    Région de Dakar
                  </span>
                </div>

                <div className="mt-5 space-y-4 text-xs sm:text-sm text-slate-600">
                  <p className="leading-relaxed">
                    Diamniadio est le nouvel épicentre du développement urbain et économique au Sénégal. Idéalement située entre Dakar, Thiès et l’Aéroport International Blaise Diagne (AIBD), cette zone bénéficie d’infrastructures de transport de premier plan :
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-semibold text-slate-900 block text-xs mb-1">
                        🚗 Par la route :
                      </span>
                      <p className="text-xs text-slate-600">
                        Autoroute à péage de l'Avenir (Sortie n°11 Diamniadio) & Route Nationale 1.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-semibold text-slate-900 block text-xs mb-1">
                        🚆 Par le rail :
                      </span>
                      <p className="text-xs text-slate-600">
                        Train Express Régional (TER) - Terminus provisoire Gare de Diamniadio.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Diamniadio Map Viewport / Visual Simulation */}
                <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center relative overflow-hidden">
                  <div className="aspect-[21/9] w-full rounded-lg bg-slate-100 flex flex-col items-center justify-center p-4 border border-slate-200 relative">
                    <div className="w-10 h-10 rounded-full bg-orange-100 border border-orange-400 flex items-center justify-center mb-2 shadow-sm">
                      <MapPin className="w-5 h-5 text-orange-600 animate-bounce" />
                    </div>
                    <span className="font-bold text-slate-900 text-sm">EMTSD Construction</span>
                    <span className="text-xs text-slate-500">Pôle Urbain de Diamniadio, Dakar, Sénégal</span>
                    <div className="mt-3 flex items-center gap-2">
                      <a
                        href="https://maps.google.com/?q=Diamniadio,Senegal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-md transition-colors shadow-sm"
                      >
                        <span>Ouvrir sur Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FormSubmit Functional Contact Form */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                    Envoyez-nous un message
                  </h4>
                  <p className="text-xs text-slate-500">
                    Formulaire direct vers notre boîte de réception officielle
                  </p>
                </div>
              </div>

              {submitStatus === 'success' ? (
                <div className="mt-4 p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fade-in">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h5 className="text-base font-bold text-emerald-950 font-heading">
                    Message envoyé avec succès !
                  </h5>
                  <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                    Merci pour votre prise de contact. Votre message a bien été transmis à l’équipe EMTSD Construction. Nous vous répondrons dans les plus brefs délais à l’adresse e-mail que vous avez indiquée.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSubmitStatus('idle')}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-emerald-800 bg-white hover:bg-emerald-100/60 border border-emerald-300 transition-colors cursor-pointer"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  action="https://formsubmit.co/mouha6428@gmail.com"
                  method="POST"
                  onSubmit={handleFormSubmit}
                  noValidate
                  className="mt-4 space-y-4"
                >
                  {/* FormSubmit Config & Spam Protection */}
                  <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                  <input type="hidden" name="_subject" value="Nouveau message de contact - EMTSD Construction" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />

                  {/* Error Notification */}
                  {submitStatus === 'error' && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-fade-in">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="font-semibold text-rose-900">Échec de l'envoi</p>
                        <p className="text-rose-700">{errorMessage}</p>
                      </div>
                    </div>
                  )}

                  {/* Field: Nom */}
                  <div>
                    <label htmlFor="contact-nom" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Nom <span className="text-orange-600">*</span>
                    </label>
                    <input
                      id="contact-nom"
                      type="text"
                      name="nom"
                      required
                      value={formData.nom}
                      onChange={(e) => {
                        setFormData({ ...formData, nom: e.target.value });
                        if (fieldErrors.nom) {
                          setFieldErrors({ ...fieldErrors, nom: undefined });
                        }
                      }}
                      placeholder="Votre nom complet"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:bg-white transition-colors ${
                        fieldErrors.nom
                          ? 'border-rose-400 focus:ring-rose-500'
                          : 'border-slate-300 focus:ring-orange-500'
                      }`}
                    />
                    {fieldErrors.nom && (
                      <p className="mt-1 text-[11px] text-rose-600">{fieldErrors.nom}</p>
                    )}
                  </div>

                  {/* Field: Adresse e-mail */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Adresse e-mail <span className="text-orange-600">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (fieldErrors.email) {
                          setFieldErrors({ ...fieldErrors, email: undefined });
                        }
                      }}
                      placeholder="votre.email@exemple.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:bg-white transition-colors ${
                        fieldErrors.email
                          ? 'border-rose-400 focus:ring-rose-500'
                          : 'border-slate-300 focus:ring-orange-500'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="mt-1 text-[11px] text-rose-600">{fieldErrors.email}</p>
                    )}
                  </div>

                  {/* Field: Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Message <span className="text-orange-600">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (fieldErrors.message) {
                          setFieldErrors({ ...fieldErrors, message: undefined });
                        }
                      }}
                      placeholder="Décrivez votre projet, vos questions ou votre besoin de renseignements..."
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:bg-white transition-colors resize-y ${
                        fieldErrors.message
                          ? 'border-rose-400 focus:ring-rose-500'
                          : 'border-slate-300 focus:ring-orange-500'
                      }`}
                    />
                    {fieldErrors.message && (
                      <p className="mt-1 text-[11px] text-rose-600">{fieldErrors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className="w-full py-3 px-5 text-xs sm:text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-orange-600/30"
                  >
                    {submitStatus === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Envoyer</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-500 text-center">
                    Vos données sont confidentielles et transmises directement à notre service commercial.
                  </p>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
