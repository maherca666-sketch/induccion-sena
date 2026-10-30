import React, { useState } from 'react';
import { Apprentice } from '../types/induction';
import { Printer, Download, Share2, Check, ShieldCheck, Lock, QrCode, Award } from 'lucide-react';

interface CertificateViewProps {
  apprentice: Apprentice;
  onGoToEvaluation: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  apprentice,
  onGoToEvaluation,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const isEligible = apprentice.calificacionLetra === 'A' || (apprentice.puntajeEvaluacion !== null && apprentice.puntajeEvaluacion >= 70);
  const certificateCode = apprentice.certificadoCodigo || `SENA-IND-${apprentice.ficha}-${apprentice.documento.slice(-4)}`;
  const issueDate = apprentice.fechaEvaluacion || new Date().toISOString().split('T')[0];

  const handlePrint = () => {
    window.print();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(
      `https://sena.edu.co/verificacion?codigo=${certificateCode}&doc=${apprentice.documento}`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (!isEligible) {
    return (
      <div className="max-w-2xl mx-auto my-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center space-y-5 transition-colors">
        <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Certificado Aún No Desbloqueado
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
            Para obtener tu Constancia Oficial de Aprobación de Inducción SENA, debes completar los módulos y aprobar la evaluación interactiva con una calificación mínima del <strong className="text-slate-800 dark:text-slate-200">70% (A)</strong>.
          </p>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 max-w-md mx-auto text-xs text-slate-600 dark:text-slate-300 text-left space-y-1.5">
          <div className="font-semibold text-slate-900 dark:text-white">Estado actual del aprendiz:</div>
          <div>· Aprendiz: {apprentice.nombre}</div>
          <div>· Ficha: {apprentice.ficha}</div>
          <div>· Evaluación: {apprentice.puntajeEvaluacion !== null ? `${apprentice.puntajeEvaluacion}% (Por Mejorar)` : 'Pendiente de presentación'}</div>
        </div>

        <div className="pt-2">
          <button
            onClick={onGoToEvaluation}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#308d00] rounded-lg transition-colors whitespace-nowrap shadow-sm"
          >
            Ir a Presentar la Evaluación Interactiva →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Control bar (hidden during print) */}
      <div className="no-print bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Documento Oficial Acreditado</span>
            <span aria-hidden="true">·</span>
            <span>Código de Validación: {certificateCode}</span>
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">
            Constancia de Inducción y Apropiación Institucional
          </h1>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleCopyCode}
            className="px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Enlace Copiado' : 'Copiar Validación'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#308d00] rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / Guardar PDF</span>
          </button>
        </div>
      </div>

      {/* Official SENA Certificate Sheet */}
      <div
        id="sena-certificate"
        className="bg-white rounded-2xl border-2 border-emerald-700/40 p-8 sm:p-14 relative overflow-hidden shadow-md"
      >
        {/* Subtle decorative inner frame */}
        <div className="border border-slate-200 p-6 sm:p-10 rounded-xl relative bg-linear-to-b from-white via-slate-50/20 to-white">
          
          {/* Background Watermark with official Escudo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
            <img
              src="/src/assets/images/sena_escudo_oficial.jpg"
              alt=""
              className="w-80 h-96 object-contain"
            />
          </div>

          {/* Header Institutional Identity */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-8 border-b border-slate-200 gap-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-xs">
                <img
                  src="/src/assets/images/sena_logo_mark.png"
                  alt="Logo Oficial SENA"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  SERVICIO NACIONAL DE APRENDIZAJE
                </h2>
                <div className="text-xs text-slate-500 font-medium">
                  Ministerio del Trabajo · República de Colombia
                </div>
              </div>
            </div>

            <div className="text-center sm:text-right">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 bg-white p-1 shadow-xs inline-block">
                <img
                  src="/src/assets/images/sena_escudo_oficial.jpg"
                  alt="Escudo Oficial SENA"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-[10px] text-slate-500 mt-1 font-mono uppercase font-semibold">
                Escudo Nacional SENA
              </div>
            </div>
          </div>

          {/* Certificate Main Body */}
          <div className="py-10 text-center space-y-6">
            <div className="inline-block px-3 py-1 bg-emerald-50 border border-emerald-200 rounded text-xs font-bold text-emerald-800 tracking-wider uppercase">
              Constancia de Formación e Inducción
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              El Centro de Formación certifica que el(la) aprendiz:
            </p>

            <div className="space-y-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {apprentice.nombre}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium font-mono">
                {apprentice.tipoDoc} {apprentice.documento}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed">
              Completó satisfactoriamente la totalidad de las horas pedagógicas y temáticas del{' '}
              <strong className="text-slate-900">Proceso de Inducción Institucional</strong>, demostrando apropiación cabal de los Símbolos e Historia SENA, Derechos, Deberes y Prohibiciones estipuladas en el{' '}
              <strong className="text-slate-900">Reglamento del Aprendiz (Acuerdo 009 de 2024 y mod. Acuerdo 002 de 2026)</strong>, así como los lineamientos de las Etapas Lectiva y Productiva.
            </p>

            {/* Academic program card */}
            <div className="max-w-xl mx-auto bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 block text-[11px]">Programa de Formación:</span>
                <span className="font-semibold text-slate-900">{apprentice.programa}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Ficha de Caracterización:</span>
                <span className="font-mono font-semibold text-slate-900">{apprentice.ficha}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Centro de Formación:</span>
                <span className="text-slate-800">{apprentice.centro}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Calificación Obtenida:</span>
                <span className="font-bold text-emerald-700">
                  A (Aprobado) · {apprentice.puntajeEvaluacion || 100}%
                </span>
              </div>
            </div>
          </div>

          {/* Signatures & Security Verification Section */}
          <div className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
            {/* Signature 1 */}
            <div className="text-center space-y-1">
              <div className="h-10 flex items-center justify-center font-serif italic text-slate-700 border-b border-slate-300 mx-6 text-sm">
                Harold D. Orozco G.
              </div>
              <div className="text-xs font-bold text-slate-900">Subdirección de Centro</div>
              <div className="text-[10px] text-slate-500">Servicio Nacional de Aprendizaje</div>
            </div>

            {/* Simulated verification QR */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 p-1 bg-white border border-slate-300 rounded shadow-xs flex items-center justify-center">
                <svg className="w-full h-full text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h3v2h-3v-2zm-5 0h2v3h-2v-3zm0 5h5v2h-5v-2zm3-3h3v3h-3v-3z" />
                </svg>
              </div>
              <span className="text-[9px] font-mono text-slate-500 mt-1 uppercase">
                Verificación Digital
              </span>
            </div>

            {/* Signature 2 */}
            <div className="text-center space-y-1">
              <div className="h-10 flex items-center justify-center font-serif italic text-slate-700 border-b border-slate-300 mx-6 text-sm">
                María E. Restrepo V.
              </div>
              <div className="text-xs font-bold text-slate-900">Coordinación Académica</div>
              <div className="text-[10px] text-slate-500">Registro y Control de Aprendices</div>
            </div>
          </div>

          {/* Certificate footer metadata */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-mono gap-2">
            <div>CÓDIGO: {certificateCode}</div>
            <div>EXPEDICIÓN: {issueDate} · COLOMBIA</div>
          </div>
        </div>
      </div>
    </div>
  );
};
