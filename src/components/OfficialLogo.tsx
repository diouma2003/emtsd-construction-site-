import React, { useState, useEffect } from 'react';

interface OfficialLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'header';
  showBadge?: boolean;
  onLightBg?: boolean;
}

export const OfficialLogo: React.FC<OfficialLogoProps> = ({ 
  className = '', 
  size = 'md',
  showBadge = false,
  onLightBg = true,
}) => {
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('emtsd_custom_logo');
      if (stored) {
        setCustomLogoUrl(stored);
      }
    } catch {
      // ignore
    }

    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem('emtsd_custom_logo');
        setCustomLogoUrl(stored || null);
      } catch {
        // ignore
      }
    };

    window.addEventListener('emtsd_logo_updated', handleStorageChange);
    return () => window.removeEventListener('emtsd_logo_updated', handleStorageChange);
  }, []);

  const sizeClasses = {
    sm: {
      img: 'h-9 sm:h-10',
      badge: 'text-[9px] px-1.5 py-0.5',
    },
    md: {
      img: 'h-11 sm:h-12 md:h-14 lg:h-16',
      badge: 'text-[10px] px-2 py-0.5',
    },
    header: {
      img: 'h-[52px] sm:h-[64px] md:h-[74px] lg:h-[84px]',
      badge: 'text-[10px] px-2 py-0.5',
    },
    lg: {
      img: 'h-16 sm:h-20 md:h-24',
      badge: 'text-xs px-2.5 py-1',
    },
  }[size];

  const logoSrc = customLogoUrl || '/assets/images/logo_emtsd_official.png';

  const filterStyle = onLightBg
    ? 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.06))'
    : 'drop-shadow(0 0 1px #ffffff) drop-shadow(0 0 2px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 6px rgba(255, 255, 255, 0.45)) drop-shadow(0 2px 5px rgba(0, 0, 0, 0.9))';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Official Extracted Logo on transparent background, preserved proportions & colors */}
      <img 
        src={logoSrc} 
        alt="EMTSD Construction Logo Officiel" 
        width={488}
        height={222}
        className={`${sizeClasses.img} w-auto max-w-full object-contain block select-none opacity-100 transition-transform duration-200 group-hover:scale-[1.02]`}
        style={{
          // Preserves original colors, forms and elements with 100% opacity, crystal-clear contrast and sharpness
          opacity: 1,
          imageRendering: '-webkit-optimize-contrast',
          transform: 'translateZ(0)',
          filter: filterStyle,
        }}
        referrerPolicy="no-referrer"
        loading="eager"
        decoding="async"
      />

      {showBadge && (
        <span className={`font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 rounded-md ${sizeClasses.badge}`}>
          Sénégal
        </span>
      )}
    </div>
  );
};
