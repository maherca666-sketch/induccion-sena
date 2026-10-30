import React from 'react';

export const SENA_ESCUDO_IMG = '/src/assets/images/sena_escudo_oficial.jpg';
export const SENA_OFFICIAL_LOGO_IMG = '/src/assets/images/sena_logo_oficial.jpg';
export const SENA_LOGO_MARK_IMG = '/src/assets/images/sena_logo_mark.png';
export const EMBLEM_BADGE_PATH = '/src/assets/images/sena_emblem_badge_1793115412618.jpg';
export const CAMPUS_MODERN_PATH = '/src/assets/images/sena_campus_modern_1793115412928.jpg';
export const WORKSHOP_APPRENTICES_PATH = '/src/assets/images/sena_apprentices_workshop_1793115414073.jpg';

interface SenaLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'official' | 'mark' | 'badge' | 'full' | 'escudo';
  withText?: boolean;
}

export const SenaLogo: React.FC<SenaLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'official',
  withText = false,
}) => {
  const sizeMap = {
    xs: 'w-5 h-5',
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    '2xl': 'w-32 h-32',
  };

  // Full image card variant (the exact sheet requested by user)
  if (variant === 'full') {
    return (
      <div className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs ${className}`}>
        <img
          src={SENA_OFFICIAL_LOGO_IMG}
          alt="Logotipo Oficial del SENA"
          className="w-full h-auto object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Official cropped logo mark
  if (variant === 'mark' || variant === 'official') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <div
          className={`${sizeMap[size]} rounded-lg overflow-hidden bg-white p-0.5 flex items-center justify-center shrink-0 border border-slate-200/80 shadow-xs`}
        >
          <img
            src={SENA_LOGO_MARK_IMG}
            alt="Logo SENA"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback to official full image
              (e.target as HTMLImageElement).src = SENA_OFFICIAL_LOGO_IMG;
            }}
          />
        </div>
        {withText && (
          <div className="flex flex-col">
            <span className="font-extrabold text-slate-900 tracking-tight leading-none text-sm">
              SENA
            </span>
            <span className="text-[10px] text-[#39A900] font-semibold leading-tight">
              Inducción
            </span>
          </div>
        )}
      </div>
    );
  }

  // Escudo variant (the official SENA shield provided by user)
  if (variant === 'escudo') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <div
          className={`${sizeMap[size]} rounded-lg overflow-hidden bg-white p-0.5 flex items-center justify-center shrink-0 border border-slate-200/80 shadow-xs`}
        >
          <img
            src={SENA_ESCUDO_IMG}
            alt="Escudo Oficial del SENA"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        {withText && (
          <div className="flex flex-col">
            <span className="font-extrabold text-slate-900 tracking-tight leading-none text-sm">
              SENA
            </span>
            <span className="text-[10px] text-[#39A900] font-semibold leading-tight">
              Escudo
            </span>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className={`${sizeMap[size]} rounded-full overflow-hidden border border-slate-200/80 shadow-xs shrink-0 bg-white`}
      >
        <img
          src={EMBLEM_BADGE_PATH}
          alt="Emblema Institucional SENA"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      {withText && (
        <div className="flex flex-col">
          <span className="font-extrabold text-slate-900 tracking-tight leading-none text-sm">
            SENA
          </span>
          <span className="text-[10px] text-slate-500 font-medium">
            Colombia
          </span>
        </div>
      )}
    </div>
  );
};
