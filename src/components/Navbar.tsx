import React from 'react';
import { InductionTab, UserRole } from '../types/induction';
import { ShieldCheck, UserCheck, GraduationCap, Sun, Moon, Lock, BookOpen } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface NavbarProps {
  currentTab: InductionTab;
  onSelectTab: (tab: InductionTab) => void;
  userRole: UserRole;
  onToggleRole: () => void;
  onSelectRole?: (role: UserRole) => void;
  activeApprenticeName: string;
  onOpenApprenticeModal: () => void;
  activeInstructorName?: string;
  onOpenInstructorModal?: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenManual?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  userRole,
  onToggleRole,
  onSelectRole,
  activeApprenticeName,
  onOpenApprenticeModal,
  activeInstructorName,
  onOpenInstructorModal,
  isDarkMode,
  onToggleDarkMode,
  onOpenManual,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6 lg:gap-8 h-16 min-w-0">
          {/* Zone 1: Single text wordmark with official logo and escudo */}
          <button
            onClick={() => onSelectTab('inicio')}
            className="flex items-center gap-2 text-left group shrink-0 focus-visible:outline-none"
            title="Ir al Portal Principal / Landing Page"
          >
            <div className="flex items-center gap-1.5">
              <SenaLogo variant="official" size="md" />
              <div className="w-8 h-8 rounded-md overflow-hidden bg-white border border-slate-200/80 p-0.5 shrink-0 hidden sm:block shadow-xs">
                <img
                  src="/src/assets/images/sena_escudo_oficial.jpg"
                  alt="Escudo SENA"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-slate-900 dark:text-white tracking-tight whitespace-nowrap transition-colors">
                SENA <span className="text-[#39A900]">Inducción</span>
              </span>
            </div>
          </button>

          {/* Zone 2: Concise single-line nav links for wide desktops */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium min-w-0">
            <button
              onClick={() => onSelectTab('inicio')}
              className={`whitespace-nowrap transition-colors pb-1 ${
                currentTab === 'inicio'
                  ? 'text-[#39A900] font-semibold border-b-2 border-[#39A900]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Inicio (Roles)
            </button>

            <button
              onClick={() => onSelectTab('identidad')}
              className={`whitespace-nowrap transition-colors pb-1 ${
                currentTab === 'identidad'
                  ? 'text-[#39A900] font-semibold border-b-2 border-[#39A900]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Identidad SENA
            </button>

            <button
              onClick={() => onSelectTab('derechos')}
              className={`whitespace-nowrap transition-colors pb-1 ${
                currentTab === 'derechos'
                  ? 'text-[#39A900] font-semibold border-b-2 border-[#39A900]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Derechos &amp; Deberes
            </button>

            <button
              onClick={() => onSelectTab('evaluacion')}
              className={`whitespace-nowrap transition-colors pb-1 ${
                currentTab === 'evaluacion'
                  ? 'text-[#39A900] font-semibold border-b-2 border-[#39A900]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Evaluación Interactiva
            </button>

            <button
              onClick={() => onSelectTab('certificado')}
              className={`whitespace-nowrap transition-colors pb-1 ${
                currentTab === 'certificado'
                  ? 'text-[#39A900] font-semibold border-b-2 border-[#39A900]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Certificado
            </button>

            {onOpenManual && (
              <button
                onClick={onOpenManual}
                className="whitespace-nowrap transition-colors pb-1 inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-[#39A900] dark:hover:text-[#4ade80]"
                title="Abrir Manual del Aprendiz (Guía Completa de la Inducción)"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Manual</span>
              </button>
            )}

            {userRole === 'instructor' && (
              <button
                onClick={() => onSelectTab('gestion')}
                className={`whitespace-nowrap transition-colors pb-1 inline-flex items-center gap-1.5 ${
                  currentTab === 'gestion'
                    ? 'text-[#39A900] font-semibold border-b-2 border-[#39A900]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Gestión de Fichas
              </button>
            )}
          </nav>

          {/* Zone 3: 1 primary action + dark mode toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Active User Indicator and Role Display */}
            {userRole === 'instructor' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenInstructorModal}
                  title="Cambiar perfil de instructor líder o centro de formación"
                  className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-xs text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 rounded-md transition-colors whitespace-nowrap"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span className="max-w-[150px] truncate">{activeInstructorName || 'Instructor Líder'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => (onSelectRole ? onSelectRole('aprendiz') : onToggleRole())}
                  title="Volver a la vista de Aprendiz"
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                >
                  Modo Aprendiz
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenApprenticeModal}
                  title="Cambiar aprendiz activo o crear perfil"
                  className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors whitespace-nowrap"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span className="max-w-[130px] truncate">{activeApprenticeName}</span>
                </button>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#2b7f00] dark:text-[#4ade80] border border-emerald-200 dark:border-emerald-800/60 text-xs font-semibold shadow-xs">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Rol: Aprendiz</span>
                </div>
              </div>
            )}

            {/* Dark Mode Toggle Button with Blur transition */}
            <button
              onClick={onToggleDarkMode}
              title={isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
              aria-label="Cambiar modo claro y oscuro"
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-400 transition-colors shrink-0 flex items-center justify-center shadow-xs"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>
          </div>
        </div>

        {/* Responsive secondary navigation for screens < xl */}
        <div className="flex xl:hidden overflow-x-auto py-2.5 gap-2 sm:gap-4 border-t border-slate-100 dark:border-slate-800 text-xs font-medium scrollbar-none min-w-0 max-w-full">
          <button
            onClick={() => onSelectTab('inicio')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md transition-colors shrink-0 ${
              currentTab === 'inicio'
                ? 'bg-[#39A900]/10 text-[#39A900] font-semibold dark:bg-[#39A900]/20'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => onSelectTab('identidad')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md transition-colors shrink-0 ${
              currentTab === 'identidad'
                ? 'bg-[#39A900]/10 text-[#39A900] font-semibold dark:bg-[#39A900]/20'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Identidad
          </button>
          <button
            onClick={() => onSelectTab('derechos')}
            className={`whitespace-nowrap px-2 py-1 rounded transition-colors ${
              currentTab === 'derechos'
                ? 'bg-[#39A900]/10 text-[#39A900] font-semibold dark:bg-[#39A900]/20'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Derechos &amp; Deberes
          </button>
          <button
            onClick={() => onSelectTab('evaluacion')}
            className={`whitespace-nowrap px-2 py-1 rounded transition-colors ${
              currentTab === 'evaluacion'
                ? 'bg-[#39A900]/10 text-[#39A900] font-semibold dark:bg-[#39A900]/20'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Evaluación
          </button>
          <button
            onClick={() => onSelectTab('certificado')}
            className={`whitespace-nowrap px-2 py-1 rounded transition-colors ${
              currentTab === 'certificado'
                ? 'bg-[#39A900]/10 text-[#39A900] font-semibold dark:bg-[#39A900]/20'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Certificado
          </button>
          {onOpenManual && (
            <button
              onClick={onOpenManual}
              className="whitespace-nowrap px-2 py-1 rounded transition-colors text-slate-600 dark:text-slate-300 hover:text-[#39A900] dark:hover:text-[#4ade80] inline-flex items-center gap-1"
            >
              <BookOpen className="w-3 h-3" />
              <span>Manual</span>
            </button>
          )}
          {userRole === 'instructor' && (
            <button
              onClick={() => onSelectTab('gestion')}
              className={`whitespace-nowrap px-2 py-1 rounded transition-colors inline-flex items-center gap-1 ${
                currentTab === 'gestion'
                  ? 'bg-[#39A900]/10 text-[#39A900] font-semibold dark:bg-[#39A900]/20'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Gestión
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
