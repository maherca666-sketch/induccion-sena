import React, { useState, useEffect } from 'react';
import { Apprentice, FichaInfo, InductionTab, InstructorProfile, QuizResult, UserRole } from './types/induction';
import { INITIAL_APPRENTICES, MOCK_FICHAS, MOCK_INSTRUCTORS } from './data/inductionData';
import { Navbar } from './components/Navbar';
import { InstitutionalIdentity } from './components/InstitutionalIdentity';
import { RightsAndDuties } from './components/RightsAndDuties';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { CertificateView } from './components/CertificateView';
import { InstructorDashboard } from './components/InstructorDashboard';
import { LandingPage } from './components/LandingPage';
import { ApprenticeSelectorModal } from './components/ApprenticeSelectorModal';
import { InstructorSelectorModal } from './components/InstructorSelectorModal';
import { UserManualModal } from './components/UserManualModal';
import { BookOpen, Shield, Award, CheckCircle, GraduationCap, ChevronRight, Home, ShieldCheck, Briefcase, Lock, AlertTriangle } from 'lucide-react';

const STORAGE_KEY_APPRENTICES = 'sena_induction_apprentices_v1';
const STORAGE_KEY_ACTIVE_ID = 'sena_induction_active_app_id_v1';
const STORAGE_KEY_THEME = 'sena_induction_theme_v1';

export default function App() {
  const [apprentices, setApprentices] = useState<Apprentice[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_APPRENTICES);
      return saved ? JSON.parse(saved) : INITIAL_APPRENTICES;
    } catch {
      return INITIAL_APPRENTICES;
    }
  });

  const [activeApprenticeId, setActiveApprenticeId] = useState<string>(() => {
    try {
      const savedId = localStorage.getItem(STORAGE_KEY_ACTIVE_ID);
      return savedId || INITIAL_APPRENTICES[0].id;
    } catch {
      return INITIAL_APPRENTICES[0].id;
    }
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved) return saved === 'dark';
      return false;
    } catch {
      return false;
    }
  });
  const [isBlurring, setIsBlurring] = useState<boolean>(false);

  const [currentTab, setCurrentTab] = useState<InductionTab>('inicio');
  const [userRole, setUserRole] = useState<UserRole>('aprendiz');
  const [isApprenticeModalOpen, setIsApprenticeModalOpen] = useState(false);
  const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  const [instructors] = useState<InstructorProfile[]>(MOCK_INSTRUCTORS);
  const [activeInstructorId, setActiveInstructorId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('sena_induction_active_inst_id_v2');
      if (saved && MOCK_INSTRUCTORS.some((i) => i.id === saved)) {
        return saved;
      }
      return MOCK_INSTRUCTORS[0].id;
    } catch {
      return MOCK_INSTRUCTORS[0].id;
    }
  });

  // Sync theme to html document and storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_THEME, isDarkMode ? 'dark' : 'light');
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.error('Failed to sync theme', e);
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsBlurring(true);
    setIsDarkMode((prev) => !prev);
    setTimeout(() => {
      setIsBlurring(false);
    }, 400);
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_APPRENTICES, JSON.stringify(apprentices));
    } catch (e) {
      console.error('Failed to save apprentices to localStorage', e);
    }
  }, [apprentices]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE_ID, activeApprenticeId);
    } catch (e) {
      console.error('Failed to save active apprentice to localStorage', e);
    }
  }, [activeApprenticeId]);

  useEffect(() => {
    try {
      localStorage.setItem('sena_induction_active_inst_id_v2', activeInstructorId);
    } catch (e) {
      console.error('Failed to save active instructor to localStorage', e);
    }
  }, [activeInstructorId]);

  // Current active apprentice and instructor
  const activeApprentice =
    apprentices.find((a) => a.id === activeApprenticeId) || apprentices[0] || INITIAL_APPRENTICES[0];

  const activeInstructor =
    instructors.find((i) => i.id === activeInstructorId) || instructors[0] || MOCK_INSTRUCTORS[0];

  const handleToggleRole = () => {
    if (userRole === 'aprendiz') {
      setUserRole('instructor');
    } else {
      setUserRole('aprendiz');
    }
  };

  const handleSelectRole = (role: UserRole) => {
    setUserRole(role);
  };

  const handleEnterPortalAsInstructor = (targetTab: 'identidad' | 'gestion' = 'identidad') => {
    setUserRole('instructor');
    setCurrentTab(targetTab);
  };

  const handleMarkModuleCompleted = (moduleKey: 'identidad' | 'derechos' | 'deberes') => {
    setApprentices((prev) =>
      prev.map((app) => {
        if (app.id !== activeApprentice.id) return app;
        const updatedProgress = {
          ...app.progresoModulos,
          [moduleKey]: 100,
        };
        const allCompleted =
          updatedProgress.identidad === 100 &&
          updatedProgress.derechos === 100 &&
          updatedProgress.deberes === 100 &&
          app.calificacionLetra === 'A';

        return {
          ...app,
          progresoModulos: updatedProgress,
          estadoInduccion: allCompleted
            ? 'Completado'
            : app.estadoInduccion === 'Pendiente'
            ? 'En Progreso'
            : app.estadoInduccion,
        };
      })
    );
  };

  const handleQuizComplete = (result: QuizResult) => {
    setApprentices((prev) =>
      prev.map((app) => {
        if (app.id !== activeApprentice.id) return app;
        const letter = result.passed ? 'A' : 'D';
        const certificateCode = result.passed
          ? app.certificadoCodigo || `SENA-IND-${app.ficha}-${Date.now().toString().slice(-4)}`
          : undefined;

        const allCompleted =
          result.passed &&
          app.progresoModulos.identidad === 100 &&
          app.progresoModulos.derechos === 100;

        return {
          ...app,
          puntajeEvaluacion: result.percentage,
          calificacionLetra: letter,
          fechaEvaluacion: result.completedAt,
          certificadoCodigo: certificateCode,
          estadoInduccion: allCompleted ? 'Completado' : 'En Progreso',
          progresoModulos: {
            ...app.progresoModulos,
            bienestar: 100,
          },
          observacionesInstructor: result.passed
            ? 'Aprobó satisfactoriamente la evaluación formativa de inducción.'
            : 'Presentó evaluación con resultado D (Por Mejorar). Requiere plan de refuerzo en Reglamento.',
        };
      })
    );
  };

  const handleAddApprentice = (newApp: Apprentice) => {
    setApprentices((prev) => [newApp, ...prev]);
    setActiveApprenticeId(newApp.id);
  };

  const handleUpdateApprenticeNote = (appId: string, note: string) => {
    setApprentices((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, observacionesInstructor: note } : a))
    );
  };

  const handleQuickCreateApprentice = (nombre: string, documento: string) => {
    const created: Apprentice = {
      id: `app-usr-${Date.now().toString().slice(-4)}`,
      nombre,
      tipoDoc: 'C.C.',
      documento,
      correo: `${nombre.toLowerCase().replace(/\s+/g, '.')}@soy.sena.edu.co`,
      telefono: '310 555 1234',
      ficha: '2874102',
      programa: 'Análisis y Desarrollo de Software (ADSO)',
      regional: 'Regional Distrito Capital',
      centro: 'Centro de Tecnologías para la Construcción y la Madera',
      jornada: 'Diurna',
      estadoInduccion: 'En Progreso',
      progresoModulos: {
        identidad: 0,
        derechos: 0,
        deberes: 0,
        bienestar: 0,
      },
      puntajeEvaluacion: null,
      calificacionLetra: null,
      observacionesInstructor: 'Perfil personalizado creado para vivenciar el proceso de inducción.',
    };
    setApprentices((prev) => [created, ...prev]);
    setActiveApprenticeId(created.id);
    setUserRole('aprendiz');
    setCurrentTab('identidad');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative w-full max-w-full overflow-x-hidden">
      {/* Cinematic Blur Transition Overlay */}
      <div
        className={`fixed inset-0 z-50 pointer-events-none transition-all duration-350 ease-in-out ${
          isBlurring
            ? 'backdrop-blur-md bg-white/20 dark:bg-black/30 opacity-100'
            : 'backdrop-blur-none bg-transparent opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Top Bar Contract Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (tab === 'gestion') {
            setUserRole('instructor');
          }
        }}
        userRole={userRole}
        onToggleRole={handleToggleRole}
        onSelectRole={handleSelectRole}
        activeApprenticeName={activeApprentice.nombre}
        onOpenApprenticeModal={() => setIsApprenticeModalOpen(true)}
        activeInstructorName={activeInstructor.nombre}
        onOpenInstructorModal={() => setIsInstructorModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenManual={() => setIsManualModalOpen(true)}
      />

      {/* Breadcrumb / Mode indicator banner (quiet, non-pill) */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2 min-w-0">
          {currentTab === 'inicio' ? (
            <div className="flex flex-wrap items-center justify-between w-full gap-2 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-[#39A900]" />
                  Portal Principal
                </span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">/</span>
                <span className="text-slate-600 dark:text-slate-300">
                  {userRole === 'instructor' ? 'Consola Docente y Acompañamiento' : 'Ruta Formativa del Aprendiz'}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {userRole === 'instructor' ? (
                  <>
                    <span>Instructor en sesión: <strong className="text-blue-700 dark:text-blue-400">{activeInstructor.nombre}</strong></span>
                    <button
                      onClick={() => setIsInstructorModalOpen(true)}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                    >
                      Cambiar Instructor
                    </button>
                  </>
                ) : (
                  <>
                    <span>Aprendiz en sesión: <strong className="text-slate-800 dark:text-slate-100">{activeApprentice.nombre}</strong></span>
                    <button
                      onClick={() => setIsApprenticeModalOpen(true)}
                      className="text-[#39A900] hover:underline font-semibold"
                    >
                      Cambiar Aprendiz
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : userRole === 'instructor' ? (
            <div className="flex flex-wrap items-center justify-between w-full gap-2 min-w-0">
              <div className="flex flex-wrap items-center gap-2 min-w-0">
                <span className="inline-flex items-center gap-1.5 font-bold text-blue-700 dark:text-blue-400 shrink-0">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Rol: Instructor Líder
                </span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">/</span>
                <span className="truncate max-w-[280px] sm:max-w-none text-slate-800 dark:text-slate-200">
                  {activeInstructor.especialidad}
                </span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                <span className="font-mono shrink-0 text-slate-700 dark:text-slate-300">
                  Ficha {activeInstructor.fichaAsignada}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span>Instructor: <strong className="text-slate-800 dark:text-slate-100">{activeInstructor.nombre}</strong></span>
                <button
                  onClick={() => setIsInstructorModalOpen(true)}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Cambiar Docente
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between w-full gap-2 min-w-0">
              <div className="flex flex-wrap items-center gap-2 min-w-0">
                <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-100 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[#39A900]" />
                  Rol: Aprendiz
                </span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">/</span>
                <span className="truncate max-w-[280px] sm:max-w-none">{activeApprentice.programa}</span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                <span className="font-mono shrink-0">Ficha {activeApprentice.ficha}</span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span>Aprendiz: <strong className="text-slate-800 dark:text-slate-100">{activeApprentice.nombre}</strong></span>
                <button
                  onClick={() => setIsApprenticeModalOpen(true)}
                  className="text-[#39A900] hover:underline font-semibold"
                >
                  Cambiar Perfil
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300 min-w-0"
        style={{
          filter: isBlurring ? 'blur(4px)' : 'none',
        }}
      >
        {/* Dedicated Instructor Ribbon when navigating portal modules */}
        {userRole === 'instructor' && currentTab !== 'inicio' && currentTab !== 'gestion' && (
          <div className="mb-6 p-4 rounded-xl bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-blue-950 dark:text-blue-100 truncate text-sm">
                  Portal Institucional SENA · Acceso como Instructor ({activeInstructor.nombre})
                </p>
                <p className="text-blue-800/80 dark:text-blue-300/80 text-[11px] truncate">
                  Ficha Asignada: {activeInstructor.fichaAsignada} ({activeInstructor.especialidad}) · Orientación Pedagógica Activa
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <button
                onClick={() => setCurrentTab('gestion')}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-xs"
              >
                Ver Consola de Fichas
              </button>
              <button
                onClick={() => setIsInstructorModalOpen(true)}
                className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
              >
                Cambiar Docente
              </button>
            </div>
          </div>
        )}

        {currentTab === 'inicio' && (
          <LandingPage
            userRole={userRole}
            onSelectRole={handleSelectRole}
            onNavigateTab={(tab) => {
              setCurrentTab(tab);
              if (tab === 'gestion') {
                setUserRole('instructor');
              }
            }}
            activeApprentice={activeApprentice}
            allApprentices={apprentices}
            activeInstructor={activeInstructor}
            allInstructors={instructors}
            totalFichasCount={MOCK_FICHAS.length}
            onOpenApprenticeModal={() => setIsApprenticeModalOpen(true)}
            onSelectApprentice={(id) => setActiveApprenticeId(id)}
            onOpenInstructorModal={() => setIsInstructorModalOpen(true)}
            onSelectInstructor={(id) => setActiveInstructorId(id)}
            onOpenManual={() => setIsManualModalOpen(true)}
          />
        )}
        {currentTab === 'identidad' && (
          <InstitutionalIdentity
            onMarkCompleted={() => handleMarkModuleCompleted('identidad')}
            isCompleted={activeApprentice.progresoModulos.identidad === 100}
            onGoToNext={() => setCurrentTab('derechos')}
          />
        )}

        {currentTab === 'derechos' && (
          <RightsAndDuties
            onMarkCompleted={() => {
              handleMarkModuleCompleted('derechos');
              handleMarkModuleCompleted('deberes');
            }}
            isCompleted={
              activeApprentice.progresoModulos.derechos === 100 &&
              activeApprentice.progresoModulos.deberes === 100
            }
            onGoToEvaluation={() => setCurrentTab('evaluacion')}
          />
        )}

        {currentTab === 'evaluacion' && (
          <InteractiveQuiz
            apprenticeName={activeApprentice.nombre}
            onQuizComplete={handleQuizComplete}
            previousResult={
              activeApprentice.puntajeEvaluacion !== null
                ? {
                    score: Math.round((activeApprentice.puntajeEvaluacion / 100) * 8),
                    totalQuestions: 8,
                    percentage: activeApprentice.puntajeEvaluacion,
                    passed: activeApprentice.calificacionLetra === 'A',
                    categoryBreakdown: [
                      { category: 'identidad', label: 'Identidad Institucional', correct: 2, total: 2 },
                      { category: 'deberes', label: 'Deberes y SST', correct: 2, total: 3 },
                      { category: 'derechos', label: 'Derechos del Aprendiz', correct: 2, total: 2 },
                      { category: 'bienestar', label: 'Etapas de Formación', correct: 1, total: 1 },
                    ],
                    completedAt: activeApprentice.fechaEvaluacion || '2026-10-26',
                    answers: {},
                  }
                : null
            }
            onGoToCertificate={() => setCurrentTab('certificado')}
          />
        )}

        {currentTab === 'certificado' && (
          <CertificateView
            apprentice={activeApprentice}
            onGoToEvaluation={() => setCurrentTab('evaluacion')}
          />
        )}

        {currentTab === 'gestion' && (
          userRole === 'instructor' ? (
            <InstructorDashboard
              apprentices={apprentices}
              fichas={MOCK_FICHAS}
              onSelectApprentice={(id) => {
                setActiveApprenticeId(id);
                setUserRole('aprendiz');
                setCurrentTab('identidad');
              }}
              onAddApprentice={handleAddApprentice}
              onUpdateApprenticeNote={handleUpdateApprenticeNote}
              onViewCertificate={(app) => {
                setActiveApprenticeId(app.id);
                setCurrentTab('certificado');
              }}
            />
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 shadow-sm animate-fadeIn">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center shadow-xs">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  Acceso Restringido a Aprendices
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Área Exclusiva de Instructores y Coordinación
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
                  Los aprendices del SENA únicamente pueden acceder a través del <strong>Rol de Aprendiz</strong> para
                  cursar sus módulos formativos (Identidad, Derechos, Deberes), realizar su evaluación diagnóstica
                  y obtener su constancia digital. La consola de fichas, notas y reportes CSV requiere credencial docente validada.
                </p>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl text-xs text-emerald-900 dark:text-emerald-200 text-left flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Tu ruta formativa activa:</p>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5">
                    Aprendiz: {activeApprentice.nombre} · Ficha {activeApprentice.ficha} ({activeApprentice.programa})
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setCurrentTab('identidad')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#39A900] hover:bg-[#2f8c00] text-white font-bold rounded-xl transition-all shadow-md"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Continuar mi Inducción (Rol Aprendiz)</span>
                </button>
                <button
                  onClick={() => setIsInstructorModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-all border border-slate-300 dark:border-slate-700"
                >
                  <Lock className="w-4 h-4 text-slate-500" />
                  <span>Validar Clave Docente</span>
                </button>
              </div>
            </div>
          )
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="no-print bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded bg-white border border-slate-200 p-0.5 flex items-center justify-center shrink-0 shadow-xs">
                <img
                  src="/src/assets/images/sena_logo_mark.png"
                  alt="Logo SENA"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-7 h-7 rounded bg-white border border-slate-200 p-0.5 flex items-center justify-center shrink-0 shadow-xs">
                <img
                  src="/src/assets/images/sena_escudo_oficial.jpg"
                  alt="Escudo SENA"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <span className="font-medium text-slate-700 dark:text-slate-200">Servicio Nacional de Aprendizaje SENA · Dirección General</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Reglamento del Aprendiz (Acuerdo 009 de 2024)</span>
            <span aria-hidden="true">·</span>
            <span>Plataforma Zajuna &amp; SOFIA Plus</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsManualModalOpen(true)}
              className="text-[#39A900] hover:underline font-semibold"
            >
              Manual del Aprendiz
            </button>
          </div>
        </div>
      </footer>

      {/* Apprentice Selector / Custom Profile Modal */}
      <ApprenticeSelectorModal
        isOpen={isApprenticeModalOpen}
        onClose={() => setIsApprenticeModalOpen(false)}
        apprentices={apprentices}
        activeApprenticeId={activeApprentice.id}
        onSelectApprentice={(id) => setActiveApprenticeId(id)}
        onQuickCreateApprentice={handleQuickCreateApprentice}
      />

      {/* Instructor Selector Modal */}
      <InstructorSelectorModal
        isOpen={isInstructorModalOpen}
        onClose={() => setIsInstructorModalOpen(false)}
        instructors={instructors}
        activeInstructorId={activeInstructor.id}
        onSelectInstructor={(id) => setActiveInstructorId(id)}
        onEnterPortalAsInstructor={handleEnterPortalAsInstructor}
        fichas={MOCK_FICHAS}
        userRole={userRole}
        onSwitchToAprendiz={() => {
          setUserRole('aprendiz');
          if (currentTab === 'gestion') {
            setCurrentTab('identidad');
          }
        }}
      />

      {/* Official Apprentice User Manual Modal */}
      <UserManualModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
      />
    </div>
  );
}
