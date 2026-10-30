import React, { useState } from 'react';
import { Apprentice, FichaInfo, InductionTab, InstructorProfile, UserRole } from '../types/induction';
import { SenaLogo } from './SenaLogo';
import { VideoTutorialModal } from './VideoTutorialModal';
import {
  GraduationCap,
  ShieldCheck,
  Award,
  BookOpen,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  FileText,
  BarChart3,
  Scale,
  Calendar,
  Layers,
  Check,
  UserPlus,
  Briefcase,
  Compass,
  Lock,
  AlertTriangle,
  Play,
  Video
} from 'lucide-react';

interface LandingPageProps {
  userRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onNavigateTab: (tab: InductionTab) => void;
  activeApprentice: Apprentice;
  allApprentices: Apprentice[];
  activeInstructor: InstructorProfile;
  allInstructors: InstructorProfile[];
  totalFichasCount: number;
  onOpenApprenticeModal: () => void;
  onSelectApprentice: (id: string) => void;
  onOpenInstructorModal: () => void;
  onSelectInstructor: (id: string) => void;
  onOpenManual?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  userRole,
  onSelectRole,
  onNavigateTab,
  activeApprentice,
  allApprentices,
  activeInstructor,
  allInstructors,
  totalFichasCount,
  onOpenApprenticeModal,
  onSelectApprentice,
  onOpenInstructorModal,
  onSelectInstructor,
  onOpenManual,
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const completedCount = allApprentices.filter(
    (a) => a.calificacionLetra === 'A' || a.estadoInduccion === 'Completado'
  ).length;
  const inProgressCount = allApprentices.filter(
    (a) => a.estadoInduccion === 'En Progreso' && a.calificacionLetra !== 'A'
  ).length;

  const averageProgress = Math.round(
    (allApprentices.reduce((acc, a) => {
      const avg =
        (a.progresoModulos.identidad +
          a.progresoModulos.derechos +
          a.progresoModulos.deberes +
          a.progresoModulos.bienestar) /
        4;
      return acc + avg;
    }, 0) /
      (allApprentices.length || 1))
  );

  return (
    <div className="space-y-12 sm:space-y-16 animate-fadeIn w-full max-w-full overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-10 lg:p-12">
        {/* Subtle decorative background pattern */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-[#39A900]/10 dark:bg-[#39A900]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Institutional national kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md text-xs font-semibold tracking-wide uppercase border border-slate-200 dark:border-slate-700">
            <span className="w-2 h-2 rounded-full bg-[#39A900]" />
            República de Colombia · Servicio Nacional de Aprendizaje SENA
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Portal Institucional de{' '}
            <span className="text-[#39A900] dark:text-[#4ade80]">Inducción SENA</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Bienvenido a la plataforma de inducción y formación integral. Selecciona tu rol para
            ingresar a la ruta formativa del aprendiz o a la consola de acompañamiento y gestión del
            instructor.
          </p>

          {/* Action CTAs: Video Tutorial & Manual de Usuario */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-[#39A900] via-[#2f9200] to-[#257500] hover:from-[#2e8800] hover:to-[#1e5e00] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#39A900]/30 hover:shadow-xl hover:shadow-[#39A900]/45 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
              aria-label="Abrir Video Tutorial"
            >
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-white text-white ml-0.5" />
              </span>
              <span>Video Tutorial</span>
            </button>

            {onOpenManual && (
              <button
                onClick={onOpenManual}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-200 text-sm cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#39A900]" />
                <span>Manual de Usuario</span>
              </button>
            )}
          </div>

          {/* Quick Institutional Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800/80 text-left">
            <div className="bg-white/80 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Normativa</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">Acuerdo 009 / 2024</span>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Fichas Activas</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{totalFichasCount} Grupos</span>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Aprendices</span>
              <span className="text-sm font-bold text-[#39A900] dark:text-[#4ade80]">{allApprentices.length} Matriculados</span>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Aprobación Mínima</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">70% Calificación A</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DUAL ROLE PORTALS (ROL APRENDIZ & ROL INSTRUCTOR) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Selecciona tu Perfil de Acceso
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Escoge tu rol para interactuar con las herramientas diseñadas para tu proceso académico.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* CARD 1: ROL DE APRENDIZ */}
          <div className="flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl border-2 border-[#39A900]/30 hover:border-[#39A900] dark:border-slate-800 dark:hover:border-[#39A900] p-6 sm:p-8 transition-all duration-300 shadow-md hover:shadow-xl group">
            <div className="space-y-6">
              {/* Badge & Icon header */}
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-[#2b7f00] dark:text-[#4ade80] border border-emerald-200 dark:border-emerald-800/60 rounded-md text-xs font-bold tracking-wide uppercase">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Ruta de Formación
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#39A900]/10 dark:bg-[#39A900]/20 text-[#39A900] dark:text-[#4ade80] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                  Rol de Aprendiz
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Espacio formativo para todo estudiante SENA matriculado en programas técnicos,
                  tecnológicos o complementarios. Apropiarás la cultura institucional y validarás
                  tu inducción.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                  Módulos y Actividades del Aprendiz:
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#39A900] dark:text-[#4ade80] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900 dark:text-white">Identidad Institucional:</strong> Conoce
                      el himno, escudo, bandera, lema y el legado histórico de Rodolfo Martínez Tono.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#39A900] dark:text-[#4ade80] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900 dark:text-white">Derechos y Deberes:</strong> Estudio del
                      Reglamento del Aprendiz y el nuevo Régimen de Faltas y Medidas del Acuerdo 009 de 2024.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#39A900] dark:text-[#4ade80] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900 dark:text-white">Evaluación Diagnóstica:</strong> Cuestionario
                      situacional interactivo de 8 preguntas reales con calificación inmediata (A/D).
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#39A900] dark:text-[#4ade80] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900 dark:text-white">Certificado Verificable:</strong> Generación
                      automática de tu constancia con firma oficial y código QR para tu hoja de vida.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Active Apprentice Context Bar */}
              <div className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/50 rounded-lg flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <span className="text-emerald-800 dark:text-emerald-300 block font-semibold truncate">
                    Aprendiz activo: {activeApprentice.nombre}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 truncate block">
                    Ficha {activeApprentice.ficha} · {activeApprentice.programa}
                  </span>
                </div>
                <button
                  onClick={onOpenApprenticeModal}
                  className="px-2.5 py-1 bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-700 rounded hover:bg-emerald-50 transition-colors shrink-0 whitespace-nowrap"
                >
                  Cambiar
                </button>
              </div>
            </div>

            {/* Actions for Apprentice */}
            <div className="pt-6 space-y-3">
              <button
                onClick={() => {
                  onSelectRole('aprendiz');
                  onNavigateTab('identidad');
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#39A900] hover:bg-[#2f8c00] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:ring-offset-2"
              >
                <span>Ingresar como Aprendiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => {
                    onSelectRole('aprendiz');
                    onNavigateTab('evaluacion');
                  }}
                  className="py-2 px-3 text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-medium rounded-lg text-center transition-colors truncate"
                >
                  Ir a Evaluación
                </button>
                <button
                  onClick={() => {
                    onSelectRole('aprendiz');
                    onNavigateTab('certificado');
                  }}
                  className="py-2 px-3 text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-medium rounded-lg text-center transition-colors truncate"
                >
                  Ver Certificado
                </button>
              </div>

              {onOpenManual && (
                <button
                  onClick={onOpenManual}
                  className="w-full py-2 px-3 text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800/50 font-semibold text-xs rounded-lg text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#39A900]" />
                  <span>Consultar Manual del Aprendiz (Guía de Módulos)</span>
                </button>
              )}
            </div>
          </div>

          {/* CARD 2: ROL DE INSTRUCTOR */}
          <div className="flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl border-2 border-blue-500/30 hover:border-blue-600 dark:border-slate-800 dark:hover:border-blue-500 p-6 sm:p-8 transition-all duration-300 shadow-md hover:shadow-xl group">
            <div className="space-y-6">
              {/* Badge & Icon header */}
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 rounded-md text-xs font-bold tracking-wide uppercase">
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  Acceso Restringido · Solo Docentes
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                  Rol de Instructor
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Entorno para instructores líderes de ficha y coordinadores académicos.
                  <strong className="text-amber-700 dark:text-amber-300 block mt-1">
                    Nota: Los aprendices solo pueden acceder por el Rol de Aprendiz; este acceso requiere clave institucional.
                  </strong>
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                  Herramientas y Capacidades del Instructor:
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900 dark:text-white">Tablero de Fichas:</strong> Monitoreo
                      individual y grupal de aprendices organizados por ficha y jornada.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900 dark:text-white">Registro de Aprendices:</strong> Habilitación
                      inmediata de nuevos aprendices y perfiles de prueba para la ficha.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900 dark:text-white">Observaciones Pedagógicas:</strong> Registro
                      de anotaciones de seguimiento, planes de mejoramiento y alertas tempranas.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900 dark:text-white">Exportación en CSV:</strong> Descarga
                      inmediata de listados para conciliación con SOFIA Plus y Zajuna.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Active Instructor Context Bar - Shown ONLY to instructors */}
              {userRole === 'instructor' ? (
                <>
                  <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-800/50 rounded-lg flex items-center justify-between gap-3 text-xs">
                    <div className="min-w-0">
                      <span className="text-blue-900 dark:text-blue-200 block font-semibold truncate">
                        Instructor activo: {activeInstructor.nombre}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 truncate block">
                        Ficha {activeInstructor.fichaAsignada} · {activeInstructor.cargo}
                      </span>
                    </div>
                    <button
                      onClick={onOpenInstructorModal}
                      className="px-2.5 py-1 bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 font-semibold border border-blue-300 dark:border-blue-700 rounded hover:bg-blue-50 dark:hover:bg-blue-900/40 transition-colors shrink-0 whitespace-nowrap"
                    >
                      Cambiar
                    </button>
                  </div>

                  {/* Instructor Metrics Strip */}
                  <div className="grid grid-cols-3 gap-2 p-3 bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-800/50 rounded-lg text-center text-xs">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block">Completados</span>
                      <span className="font-bold text-slate-900 dark:text-white text-sm">{completedCount}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block">En Proceso</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">{inProgressCount}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block">Avance Global</span>
                      <span className="font-bold text-slate-900 dark:text-white text-sm">{averageProgress}%</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-lg flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Lock className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Acceso reservado para el equipo docente del SENA</span>
                  </div>
                  <button
                    onClick={onOpenInstructorModal}
                    className="px-2.5 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold border border-slate-300 dark:border-slate-700 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shrink-0 whitespace-nowrap"
                  >
                    Validar Clave
                  </button>
                </div>
              )}
            </div>

            {/* Actions for Instructor */}
            <div className="pt-6 space-y-3">
              <button
                onClick={onOpenInstructorModal}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                title="Los aprendices deben ingresar por el rol de aprendiz. Requiere clave docente."
              >
                <Lock className="w-4 h-4" />
                <span>Validar y Acceder como Instructor</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={onOpenInstructorModal}
                  className="py-2.5 px-3 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 font-semibold rounded-lg text-center transition-colors truncate border border-blue-200 dark:border-blue-800 inline-flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>Consola de Fichas</span>
                </button>
                <button
                  onClick={() => {
                    onSelectRole('aprendiz');
                    onNavigateTab('derechos');
                  }}
                  className="py-2.5 px-3 text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-medium rounded-lg text-center transition-colors truncate"
                >
                  Reglamento (Acuerdo 009)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. QUICK INSTRUCTOR ACCESS PANEL - ONLY SHOWN WHEN USER ROLE IS INSTRUCTOR */}
      {userRole === 'instructor' && (
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                Instructores Líderes Registrados
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Selecciona tu perfil de instructor líder para acceder al portal con tu ficha asignada.
              </p>
            </div>

            <button
              onClick={onOpenInstructorModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/40 rounded-lg transition-colors shrink-0 border border-blue-200 dark:border-blue-800"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Cambiar Instructor
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {allInstructors.map((inst) => {
              const isSelected = inst.id === activeInstructor.id;
              return (
                <div
                  key={inst.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 shadow-xs ring-1 ring-blue-600'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {inst.nombre}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 shrink-0">
                        Ficha {inst.fichaAsignada}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {inst.especialidad}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                      {inst.regional}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        onSelectInstructor(inst.id);
                        onNavigateTab('identidad');
                      }}
                      className="w-full py-1.5 px-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>Ingresar al Portal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. QUICK APPRENTICE DIRECT SWITCHER */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-[#39A900]" />
              Aprendices Registrados en la Ficha
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Selecciona un perfil de aprendiz para simular su avance o crea uno nuevo en segundos.
            </p>
          </div>

          <button
            onClick={onOpenApprenticeModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors shrink-0"
          >
            <UserPlus className="w-4 h-4 text-[#39A900]" />
            Administrar o Crear Aprendiz
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {allApprentices.slice(0, 4).map((app) => {
            const isSelected = app.id === activeApprentice.id;
            const isApproved = app.calificacionLetra === 'A';
            return (
              <div
                key={app.id}
                onClick={() => onSelectApprentice(app.id)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#39A900] bg-emerald-50/50 dark:bg-emerald-950/20 shadow-xs ring-1 ring-[#39A900]'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {app.nombre}
                  </span>
                  {isApproved ? (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                      Aprobado
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">
                      En Proceso
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
                  <p className="truncate">Doc: {app.documento}</p>
                  <p className="truncate">Ficha: {app.ficha}</p>
                </div>
                {isSelected && (
                  <div className="mt-2 text-[11px] text-[#39A900] font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Perfil Seleccionado
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FOUR INSTITUTIONAL PILLARS */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Pilares de la Inducción Institucional
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Fundamentos esenciales que todo integrante de la comunidad SENA debe interiorizar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-[#39A900] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Identidad &amp; Mística</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Escudo, bandera, himno, logo y los principios de solidaridad, libertad y responsabilidad
              forjados desde 1957.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Marco Normativo 2024</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Derechos, deberes, prohibiciones y el Acuerdo 009 de 2024 con la tipificación de faltas
              y debido proceso.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Evaluación Situacional</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Análisis de situaciones formativas cotidianas con retroalimentación inmediata fundamentada
              en el reglamento.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Acreditación Oficial</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Certificación digital con registro y código QR institucional que valida tu culminación
              satisfactoria de la inducción.
            </p>
          </div>
        </div>
      </section>

      {/* 5. INSTITUTIONAL HISTORICAL QUOTE */}
      <section className="bg-gradient-to-r from-emerald-900 to-[#00324D] text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <p className="text-xs font-semibold tracking-wider uppercase text-emerald-300">
              Pensamiento Fundacional SENA
            </p>
            <blockquote className="text-base sm:text-lg italic font-serif leading-relaxed">
              &ldquo;El SENA no es un simple centro de capacitación; es la obra social y formativa
              más trascendental de Colombia, donde los jóvenes adquieren dignidad y trabajo con excelencia técnica.&rdquo;
            </blockquote>
            <p className="text-xs text-slate-300">
              — Dr. Rodolfo Martínez Tono (1927–2015), Fundador y Primer Director General del SENA
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="w-16 h-16 rounded-xl bg-white p-2 flex items-center justify-center shadow-md">
              <img
                src="/src/assets/images/sena_escudo_oficial.jpg"
                alt="Escudo Oficial SENA"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-16 h-16 rounded-xl bg-white p-2 flex items-center justify-center shadow-md">
              <img
                src="/src/assets/images/sena_logo_mark.png"
                alt="Logo SENA"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Tutorial Floating Modal */}
      <VideoTutorialModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </div>
  );
};
