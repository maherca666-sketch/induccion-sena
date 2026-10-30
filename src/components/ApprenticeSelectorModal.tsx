import React, { useState } from 'react';
import { Apprentice } from '../types/induction';
import { User, Check, Plus, UserPlus } from 'lucide-react';

interface ApprenticeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  apprentices: Apprentice[];
  activeApprenticeId: string;
  onSelectApprentice: (apprenticeId: string) => void;
  onQuickCreateApprentice: (nombre: string, documento: string) => void;
}

export const ApprenticeSelectorModal: React.FC<ApprenticeSelectorModalProps> = ({
  isOpen,
  onClose,
  apprentices,
  activeApprenticeId,
  onSelectApprentice,
  onQuickCreateApprentice,
}) => {
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customDoc, setCustomDoc] = useState('');

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    onQuickCreateApprentice(customName.trim(), customDoc.trim() || '1099887766');
    setShowCustomForm(false);
    setCustomName('');
    setCustomDoc('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-xl border border-slate-200 dark:border-slate-800 transition-colors">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-0.5 flex items-center justify-center shadow-xs">
                <img
                  src="/src/assets/images/sena_logo_mark.png"
                  alt="Logo SENA"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-0.5 flex items-center justify-center shadow-xs">
                <img
                  src="/src/assets/images/sena_escudo_oficial.jpg"
                  alt="Escudo SENA"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Perfil del Aprendiz en Formación
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Selecciona o crea un perfil para interactuar con la inducción y la evaluación.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 text-xs"
          >
            ✕ Cerrar
          </button>
        </div>

        {!showCustomForm ? (
          <div className="space-y-3">
            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {apprentices.map((app) => {
                const isSelected = app.id === activeApprenticeId;
                return (
                  <button
                    key={app.id}
                    onClick={() => {
                      onSelectApprentice(app.id);
                      onClose();
                    }}
                    className={`w-full p-3 text-left rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#39A900] bg-emerald-50/40 dark:bg-emerald-950/40 text-slate-950 dark:text-white font-medium ring-1 ring-[#39A900]'
                        : 'border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/80 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{app.nombre}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Ficha {app.ficha} · {app.estadoInduccion} · {app.calificacionLetra ? `Nota ${app.calificacionLetra} (${app.puntajeEvaluacion}%)` : 'Sin evaluación'}
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#39A900] text-white flex items-center justify-center text-xs">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setShowCustomForm(true)}
                className="w-full py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ingresar mi propio nombre para realizar la inducción</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCustomSubmit} className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Tu Nombre y Apellidos *
              </label>
              <input
                type="text"
                required
                placeholder="ej. Juan David Montoya Ortiz"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#39A900]"
                autoFocus
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Número de Documento (opcional)
              </label>
              <input
                type="text"
                placeholder="ej. 1020304050"
                value={customDoc}
                onChange={(e) => setCustomDoc(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#39A900]"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCustomForm(false)}
                className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              >
                Volver
              </button>
              <button
                type="submit"
                className="px-4 py-2 font-semibold text-white bg-[#39A900] hover:bg-[#308d00] rounded-lg shadow-sm"
              >
                Comenzar con mi Perfil
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
