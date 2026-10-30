import React, { useState, useEffect } from 'react';
import { InstructorProfile, FichaInfo, UserRole } from '../types/induction';
import {
  ShieldCheck,
  Check,
  X,
  User,
  Briefcase,
  Award,
  Building,
  Mail,
  ChevronRight,
  UserPlus,
  Lock,
  AlertTriangle,
  GraduationCap
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface InstructorSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  instructors: InstructorProfile[];
  activeInstructorId: string;
  onSelectInstructor: (id: string) => void;
  onEnterPortalAsInstructor: (targetTab?: 'identidad' | 'gestion') => void;
  fichas: FichaInfo[];
  onSwitchToAprendiz?: () => void;
  userRole?: UserRole;
}

export const InstructorSelectorModal: React.FC<InstructorSelectorModalProps> = ({
  isOpen,
  onClose,
  instructors,
  activeInstructorId,
  onSelectInstructor,
  onEnterPortalAsInstructor,
  fichas,
  onSwitchToAprendiz,
  userRole = 'aprendiz',
}) => {
  const [selectedId, setSelectedId] = useState(activeInstructorId);
  const [accessCode, setAccessCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(userRole === 'instructor');

  useEffect(() => {
    if (isOpen) {
      setSelectedId(activeInstructorId);
      setIsAuthorized(userRole === 'instructor');
      setErrorMessage('');
    }
  }, [isOpen, activeInstructorId, userRole]);

  if (!isOpen) return null;

  const currentInstructor = instructors.find((i) => i.id === selectedId) || instructors[0];
  const assignedFicha = fichas.find((f) => f.numero === currentInstructor?.fichaAsignada);

  const handleValidateKeyOnly = (e: React.FormEvent) => {
    e.preventDefault();
    const validCodes = ['maherca666', 'sena2024', 'sena', '1957', 'admin', 'instructor'];
    const cleanCode = accessCode.trim().toLowerCase();

    if (!cleanCode) {
      setErrorMessage('Por favor ingrese la clave institucional docente (Maherca666).');
      return;
    }

    if (!validCodes.includes(cleanCode)) {
      setErrorMessage('Clave no válida. La clave requerida es Maherca666. Recuerde que los aprendices solo pueden acceder por el Rol de Aprendiz.');
      return;
    }

    setErrorMessage('');
    setIsAuthorized(true);
  };

  const handleConfirmAndEnter = (tab: 'identidad' | 'gestion') => {
    onSelectInstructor(selectedId);
    onEnterPortalAsInstructor(tab);
    onClose();
  };

  const handleReturnAsApprentice = () => {
    if (onSwitchToAprendiz) {
      onSwitchToAprendiz();
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="instructor-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/90 dark:bg-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 id="instructor-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
                Validación de Acceso · Rol de Instructor
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Los aprendices solo pueden ingresar por el rol de aprendiz. Acceso reservado a docentes SENA.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!isAuthorized ? (
            /* Locked View for Apprentices / Unauthenticated Users - ZERO INSTRUCTOR INFO */
            <div className="space-y-6 py-2">
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">Acceso Reservado al Personal Docente del SENA</p>
                  <p className="text-amber-800 dark:text-amber-300 leading-relaxed text-[11px]">
                    Los aprendices <strong>solo pueden acceder por el Rol de Aprendiz</strong>. 
                    La información de contacto, asignación de fichas y consola de gestión de los instructores está protegida y es de uso exclusivo para docentes y directivos.
                  </p>
                </div>
              </div>

              <form onSubmit={handleValidateKeyOnly} className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-blue-600" />
                    Ingrese la Clave Institucional Docente:
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Clave: <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-blue-700 dark:text-blue-300 font-bold">Maherca666</code>
                  </span>
                </div>

                <div className="space-y-2">
                  <input
                    type="password"
                    value={accessCode}
                    onChange={(e) => {
                      setAccessCode(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="Ingrese la clave: Maherca666"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />

                  {errorMessage && (
                    <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                      {errorMessage}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Validar y Desbloquear Consola Docente</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReturnAsApprentice}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700 rounded-lg transition-colors"
                  >
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                    <span>Soy Aprendiz (Ir a mi Inducción)</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Authorized View: Only visible once institutional teacher key is validated */
            <>
              {/* Active Instructor Card Preview */}
              <div className="bg-gradient-to-r from-blue-900/90 to-[#00324D] text-white p-5 rounded-xl space-y-3 shadow-sm border border-blue-800 animate-fadeIn">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-blue-200 bg-blue-800/80 px-2.5 py-0.5 rounded">
                    Perfil Docente Activo
                  </span>
                  <span className="text-xs text-blue-200 font-mono">
                    Ficha {currentInstructor.fichaAsignada}
                  </span>
                </div>

                <div className="flex items-center gap-4 pt-1">
                  <div className="w-14 h-14 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-xl font-bold text-white shrink-0">
                    {currentInstructor.nombre
                      .split(' ')
                      .map((n) => n[0])
                      .filter((_, i) => i < 2)
                      .join('')}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-lg font-bold truncate text-white">{currentInstructor.nombre}</h4>
                    <p className="text-xs text-blue-200 truncate">{currentInstructor.cargo}</p>
                    <p className="text-xs text-slate-300 truncate">{currentInstructor.centro}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs text-blue-100">
                  <div>
                    <span className="text-blue-300 block text-[10px]">Programa Asignado</span>
                    <span className="font-medium truncate block">{assignedFicha?.programa || currentInstructor.especialidad}</span>
                  </div>
                  <div>
                    <span className="text-blue-300 block text-[10px]">Correo Institucional</span>
                    <span className="font-mono text-[11px] truncate block">{currentInstructor.correo}</span>
                  </div>
                </div>
              </div>

              {/* List of Available Instructors */}
              <div className="space-y-3 animate-fadeIn">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                  Seleccionar Docente / Ficha Asignada:
                </label>
                <div className="space-y-2">
                  {instructors.map((inst) => {
                    const isSelected = inst.id === selectedId;
                    return (
                      <div
                        key={inst.id}
                        onClick={() => {
                          setSelectedId(inst.id);
                          setErrorMessage('');
                        }}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/30 ring-1 ring-blue-600 shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold ${
                              isSelected
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <User className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 text-xs">
                            <p className="font-bold text-slate-900 dark:text-white truncate text-sm">
                              {inst.nombre}
                            </p>
                            <p className="text-slate-500 dark:text-slate-400 truncate">
                              Ficha {inst.fichaAsignada} · {inst.especialidad}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0">
                          {isSelected ? (
                            <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions (Only shown if authorized) */}
        {isAuthorized && (
          <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
            <button
              onClick={handleReturnAsApprentice}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700 rounded-lg transition-colors"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Soy Aprendiz (Ir a mi Inducción)</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleConfirmAndEnter('gestion')}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-center"
              >
                Consola de Fichas
              </button>
              <button
                onClick={() => handleConfirmAndEnter('identidad')}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all text-center"
              >
                <span>Acceder como Docente</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
