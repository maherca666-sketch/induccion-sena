import React, { useState } from 'react';
import { X, CheckCircle2, RefreshCw, Download, FileSpreadsheet, ExternalLink, Copy, Check, Cloud, ShieldAlert, AlertCircle, HardDrive } from 'lucide-react';
import { Apprentice } from '../types/induction';

interface GoogleDriveSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  apprentices: Apprentice[];
  selectedFicha: string;
}

export const GoogleDriveSyncModal: React.FC<GoogleDriveSyncModalProps> = ({
  isOpen,
  onClose,
  apprentices,
  selectedFicha,
}) => {
  const [copiedScript, setCopiedScript] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toLocaleTimeString('es-CO'));
  const [activeTab, setActiveTab] = useState<'status' | 'schema' | 'webhook'>('status');

  if (!isOpen) return null;

  const handleSimulateSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime(new Date().toLocaleTimeString('es-CO'));
    }, 1200);
  };

  const handleExportDriveReadyCSV = () => {
    const headers = [
      'Timestamp',
      'ID_Aprendiz',
      'Tipo_Documento',
      'Numero_Documento',
      'Nombre_Completo',
      'Correo_Institucional',
      'Ficha_Caracterizacion',
      'Programa_Formacion',
      'Regional_Centro',
      'Jornada',
      'Progreso_Identidad',
      'Progreso_Derechos',
      'Progreso_Deberes',
      'Progreso_Bienestar',
      'Puntaje_Evaluacion',
      'Calificacion_Letra',
      'Codigo_Certificado',
      'Observaciones_Instructor',
    ];

    const rows = apprentices.map((a) => [
      `"${new Date().toLocaleString('es-CO')}"`,
      a.id,
      a.tipoDoc,
      a.documento,
      `"${a.nombre}"`,
      a.correo,
      a.ficha,
      `"${a.programa}"`,
      `"${a.regional} - ${a.centro}"`,
      a.jornada,
      `"${a.progresoModulos.identidad}%"`,
      `"${a.progresoModulos.derechos}%"`,
      `"${a.progresoModulos.deberes}%"`,
      `"${a.progresoModulos.bienestar}%"`,
      a.puntajeEvaluacion !== null ? `"${a.puntajeEvaluacion}%"` : '"Pendiente"',
      a.calificacionLetra || 'Pendiente',
      a.certificadoCodigo || 'N/A',
      `"${a.observacionesInstructor || ''}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `SENA_Induccion_Google_Drive_Ficha_${selectedFicha}_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const appsScriptCode = `function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "ID_Aprendiz", "Tipo_Doc", "Documento", "Nombre_Completo", 
        "Correo_SENA", "Ficha", "Programa", "Regional_Centro", "Jornada",
        "Progreso_Identidad", "Progreso_Derechos", "Progreso_Deberes", "Progreso_Bienestar",
        "Puntaje_Evaluacion", "Calificacion_Letra", "Codigo_Certificado", "Observaciones"
      ]);
    }
    var rowValues = [
      new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" }),
      data.id || "", data.tipoDoc || "C.C.", String(data.documento), data.nombre || "",
      data.correo || "", data.ficha || "", data.programa || "", data.regional || "",
      data.jornada || "Diurna",
      (data.progresoModulos?.identidad || 0) + "%",
      (data.progresoModulos?.derechos || 0) + "%",
      (data.progresoModulos?.deberes || 0) + "%",
      (data.progresoModulos?.bienestar || 0) + "%",
      data.puntajeEvaluacion !== null ? data.puntajeEvaluacion + "%" : "Pendiente",
      data.calificacionLetra || "Pendiente",
      data.certificadoCodigo || "N/A",
      data.observacionesInstructor || ""
    ];
    sheet.appendRow(rowValues);
    return ContentService.createTextOutput(JSON.stringify({status: "success"})).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(appsScriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-[#39A900] dark:text-[#4ade80] rounded-xl border border-emerald-500/20">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-[#39A900] text-white rounded">
                  GOOGLE DRIVE &amp; SHEETS
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Sincronización en Tiempo Real
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Consola de Sincronización de Aprendices en la Nube
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-50/50 dark:bg-slate-950/20 text-xs font-semibold gap-6 shrink-0">
          <button
            onClick={() => setActiveTab('status')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'status'
                ? 'border-[#39A900] text-[#39A900] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Estado del Flujo en Vivo ({apprentices.length} Registros)
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'schema'
                ? 'border-[#39A900] text-[#39A900] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Estructura de la Hoja (18 Columnas)
          </button>
          <button
            onClick={() => setActiveTab('webhook')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'webhook'
                ? 'border-[#39A900] text-[#39A900] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Script Webhook (Apps Script / OAuth)
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-700 dark:text-slate-300">
          {activeTab === 'status' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Status Banner */}
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#39A900]"></span>
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                      Sincronizador Google Drive Activo
                    </h4>
                    <p className="text-xs text-emerald-800 dark:text-emerald-300">
                      Captura automática de respuestas cada vez que un aprendiz completa un módulo o presenta su evaluación.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSimulateSync}
                    disabled={isSyncing}
                    className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-emerald-300 dark:border-emerald-700 text-xs font-semibold text-emerald-800 dark:text-emerald-200 rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Sincronizando...' : 'Verificar Sincronización'}</span>
                  </button>
                </div>
              </div>

              {/* Quick KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50">
                  <div className="text-xs text-slate-500">Última Sincronización</div>
                  <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                    {lastSyncTime}
                  </div>
                  <div className="text-[11px] text-[#39A900] mt-0.5">Sincronización instantánea</div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50">
                  <div className="text-xs text-slate-500">Filas Listas para Drive</div>
                  <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                    {apprentices.length} Aprendices
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Filtro actual: {selectedFicha === 'all' ? 'Todas las fichas' : `Ficha ${selectedFicha}`}</div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50">
                  <div className="text-xs text-slate-500">Hoja en Google Drive</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-1 truncate">
                    SENA_Induccion_Consolidado.xlsx
                  </div>
                  <div className="text-[11px] text-blue-600 dark:text-blue-400 mt-0.5">Unidad del Instructor</div>
                </div>
              </div>

              {/* Event Stream Log */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/30">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Monitor de Eventos de Respuesta (Tiempo Real)</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                    EN LÍNEA
                  </span>
                </div>
                <div className="p-3 space-y-2 max-h-48 overflow-y-auto text-xs font-mono">
                  {apprentices.slice(0, 5).map((app, idx) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{app.nombre}</span>
                        <span className="text-slate-500 text-[11px]">({app.documento})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 text-[11px]">
                          Ev: {app.calificacionLetra ? `${app.puntajeEvaluacion}% (${app.calificacionLetra})` : 'Pendiente'}
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400 text-[10px] bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                          Sincronizado
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleExportDriveReadyCSV}
                  className="px-4 py-2.5 bg-[#39A900] hover:bg-[#308d00] text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Hoja para Google Sheets (.CSV Oficial)</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-xs text-slate-600 dark:text-slate-300">
                La Hoja de Cálculo en Google Drive mantiene una estructura normalizada de 18 columnas para garantizar la compatibilidad con el sistema SofiaPlus / Territorium / ZAJUNA del SENA:
              </div>

              <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="p-2.5">Columna</th>
                      <th className="p-2.5">Nombre de Campo</th>
                      <th className="p-2.5">Tipo</th>
                      <th className="p-2.5">Descripción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    <tr><td className="p-2.5 font-bold">A</td><td>Timestamp</td><td>Fecha/Hora</td><td>Marca temporal exacta del evento</td></tr>
                    <tr><td className="p-2.5 font-bold">B</td><td>ID_Aprendiz</td><td>String</td><td>Identificador único del registro</td></tr>
                    <tr><td className="p-2.5 font-bold">C</td><td>Tipo_Documento</td><td>Enum</td><td>C.C., T.I., C.E., PPT</td></tr>
                    <tr><td className="p-2.5 font-bold">D</td><td>Numero_Documento</td><td>Dígitos</td><td>Número de documento del aprendiz</td></tr>
                    <tr><td className="p-2.5 font-bold">E</td><td>Nombre_Completo</td><td>Texto</td><td>Nombres y apellidos completos</td></tr>
                    <tr><td className="p-2.5 font-bold">F</td><td>Correo_Institucional</td><td>Email</td><td>Correo @soy.sena.edu.co</td></tr>
                    <tr><td className="p-2.5 font-bold">G</td><td>Ficha_Caracterizacion</td><td>7 dígitos</td><td>Código de ficha (ej. 2874102)</td></tr>
                    <tr><td className="p-2.5 font-bold">H</td><td>Programa_Formacion</td><td>Texto</td><td>Nombre del programa (ej. ADSO)</td></tr>
                    <tr><td className="p-2.5 font-bold">I</td><td>Regional_Centro</td><td>Texto</td><td>Regional y Centro de Formación</td></tr>
                    <tr><td className="p-2.5 font-bold">J</td><td>Jornada</td><td>Enum</td><td>Diurna / Nocturna / Mixta / Virtual</td></tr>
                    <tr><td className="p-2.5 font-bold">K</td><td>Progreso_Identidad</td><td>0-100%</td><td>Apropiación de símbolos e historia</td></tr>
                    <tr><td className="p-2.5 font-bold">L</td><td>Progreso_Derechos</td><td>0-100%</td><td>Apropiación de derechos (Acuerdo 009)</td></tr>
                    <tr><td className="p-2.5 font-bold">M</td><td>Progreso_Deberes</td><td>0-100%</td><td>Apropiación de deberes y faltas</td></tr>
                    <tr><td className="p-2.5 font-bold">N</td><td>Progreso_Bienestar</td><td>0-100%</td><td>Apropiación de rutas de bienestar</td></tr>
                    <tr><td className="p-2.5 font-bold">O</td><td>Puntaje_Evaluacion</td><td>0-100%</td><td>Resultado cuantitativo del quiz</td></tr>
                    <tr><td className="p-2.5 font-bold">P</td><td>Calificacion_Letra</td><td>'A' / 'D'</td><td>Aprobado (≥70%) o Por Mejorar</td></tr>
                    <tr><td className="p-2.5 font-bold">Q</td><td>Codigo_Certificado</td><td>String</td><td>Código alfanumérico único oficial</td></tr>
                    <tr><td className="p-2.5 font-bold">R</td><td>Observaciones_Docente</td><td>Texto</td><td>Notas de seguimiento del instructor</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'webhook' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    Receptor Automático en Google Apps Script
                  </h4>
                  <p className="text-xs text-slate-500">
                    Copia y pega este script en tu Hoja de Cálculo en Google Drive para recibir respuestas atómicas en tiempo real.
                  </p>
                </div>
                <button
                  onClick={handleCopyScript}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors border border-slate-300 dark:border-slate-700"
                >
                  {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedScript ? '¡Copiado!' : 'Copiar Script'}</span>
                </button>
              </div>

              <pre className="p-3 bg-slate-950 text-slate-200 rounded-xl text-xs font-mono overflow-x-auto max-h-64 border border-slate-800">
                {appsScriptCode}
              </pre>

              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 rounded-xl text-xs text-blue-900 dark:text-blue-300 space-y-1">
                <strong>Pasos de Instalación en Google Drive:</strong>
                <ol className="list-decimal pl-5 space-y-1 mt-1">
                  <li>En Google Drive, abre la hoja <code>SENA_Induccion_Aprendices</code>.</li>
                  <li>Ve a <strong>Extensiones &gt; Apps Script</strong> y reemplaza el código con el script anterior.</li>
                  <li>Haz clic en <strong>Implementar &gt; Nueva implementación &gt; Tipo: Aplicación web</strong>.</li>
                  <li>En "Quién tiene acceso", selecciona <strong>"Cualquiera"</strong> y pulsa Guardar.</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Plan completo documentado en <code>/PLAN_GOOGLE_DRIVE_SHEETS.md</code>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            Cerrar Ventana
          </button>
        </div>
      </div>
    </div>
  );
};
