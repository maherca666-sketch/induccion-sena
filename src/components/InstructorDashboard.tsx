import React, { useState } from 'react';
import { Apprentice, FichaInfo } from '../types/induction';
import { Search, Plus, Download, UserCheck, AlertCircle, CheckCircle, Clock, Filter, Eye, Edit3, Award, FileSpreadsheet, Cloud, HardDrive } from 'lucide-react';
import { GoogleDriveSyncModal } from './GoogleDriveSyncModal';

interface InstructorDashboardProps {
  apprentices: Apprentice[];
  fichas: FichaInfo[];
  onSelectApprentice: (apprenticeId: string) => void;
  onAddApprentice: (newApprentice: Apprentice) => void;
  onUpdateApprenticeNote: (apprenticeId: string, notes: string) => void;
  onViewCertificate: (apprentice: Apprentice) => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  apprentices,
  fichas,
  onSelectApprentice,
  onAddApprentice,
  onUpdateApprenticeNote,
  onViewCertificate,
}) => {
  const [selectedFicha, setSelectedFicha] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApprenticeForDetail, setSelectedApprenticeForDetail] = useState<Apprentice | null>(null);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [tempNote, setTempNote] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDriveSyncModalOpen, setIsDriveSyncModalOpen] = useState(false);

  // Form state for adding apprentice
  const [newNombre, setNewNombre] = useState('');
  const [newTipoDoc, setNewTipoDoc] = useState('C.C.');
  const [newDocumento, setNewDocumento] = useState('');
  const [newCorreo, setNewCorreo] = useState('');
  const [newTelefono, setNewTelefono] = useState('');
  const [newFicha, setNewFicha] = useState(fichas[0]?.numero || '2874102');
  const [newJornada, setNewJornada] = useState<'Diurna' | 'Nocturna' | 'Mixta' | 'Virtual'>('Diurna');

  // Filtered apprentices
  const filteredApprentices = apprentices.filter((app) => {
    const matchesFicha = selectedFicha === 'all' || app.ficha === selectedFicha;
    const matchesStatus = statusFilter === 'all' || app.estadoInduccion === statusFilter;
    const matchesSearch =
      app.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.documento.includes(searchQuery) ||
      app.correo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.ficha.includes(searchQuery);

    return matchesFicha && matchesStatus && matchesSearch;
  });

  // Analytics Metrics
  const totalCount = apprentices.length;
  const completedCount = apprentices.filter((a) => a.estadoInduccion === 'Completado').length;
  const passedEvaluationCount = apprentices.filter((a) => a.calificacionLetra === 'A').length;
  const needingAttentionCount = apprentices.filter(
    (a) => a.calificacionLetra === 'D' || a.estadoInduccion === 'Pendiente'
  ).length;

  const currentFichaInfo = fichas.find((f) => f.numero === selectedFicha);

  // Export to CSV functionality
  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Nombre Completo',
      'Tipo Doc',
      'Documento',
      'Correo',
      'Ficha',
      'Programa',
      'Jornada',
      'Estado Induccion',
      'Puntaje Evaluacion',
      'Calificacion',
      'Fecha Evaluacion',
      'Observaciones Instructor',
    ];

    const rows = filteredApprentices.map((a) => [
      a.id,
      `"${a.nombre}"`,
      a.tipoDoc,
      a.documento,
      a.correo,
      a.ficha,
      `"${a.programa}"`,
      a.jornada,
      a.estadoInduccion,
      a.puntajeEvaluacion !== null ? a.puntajeEvaluacion : 'N/A',
      a.calificacionLetra || 'Pendiente',
      a.fechaEvaluacion || 'N/A',
      `"${a.observacionesInstructor || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `reporte_induccion_sena_${selectedFicha}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateApprentice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNombre || !newDocumento || !newCorreo) return;

    const matchedFichaObj = fichas.find((f) => f.numero === newFicha);

    const created: Apprentice = {
      id: `app-${Date.now().toString().slice(-4)}`,
      nombre: newNombre,
      tipoDoc: newTipoDoc,
      documento: newDocumento,
      correo: newCorreo,
      telefono: newTelefono || '300 000 0000',
      ficha: newFicha,
      programa: matchedFichaObj ? matchedFichaObj.programa : 'Tecnología en Desarrollo SENA',
      regional: 'Regional Distrito Capital',
      centro: 'Centro de Tecnologías para la Construcción y la Madera',
      jornada: newJornada,
      estadoInduccion: 'Pendiente',
      progresoModulos: {
        identidad: 0,
        derechos: 0,
        deberes: 0,
        bienestar: 0,
      },
      puntajeEvaluacion: null,
      calificacionLetra: null,
      observacionesInstructor: 'Registrado en el sistema de inducción. Pendiente inicio de módulos.',
    };

    onAddApprentice(created);
    setIsAddModalOpen(false);
    // Reset form
    setNewNombre('');
    setNewDocumento('');
    setNewCorreo('');
    setNewTelefono('');
  };

  const openApprenticeDetails = (app: Apprentice) => {
    setSelectedApprenticeForDetail(app);
    setTempNote(app.observacionesInstructor || '');
    setIsEditingNote(false);
  };

  const handleSaveNote = () => {
    if (selectedApprenticeForDetail) {
      onUpdateApprenticeNote(selectedApprenticeForDetail.id, tempNote);
      setSelectedApprenticeForDetail({
        ...selectedApprenticeForDetail,
        observacionesInstructor: tempNote,
      });
      setIsEditingNote(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Dashboard Top Header */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 flex items-center justify-center shadow-xs">
              <img
                src="/src/assets/images/sena_logo_mark.png"
                alt="Logo SENA"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 flex items-center justify-center shadow-xs">
              <img
                src="/src/assets/images/sena_escudo_oficial.jpg"
                alt="Escudo SENA"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Panel de Coordinación Académica</span>
              <span aria-hidden="true">·</span>
              <span>Seguimiento de Inducción</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Gestión de Apropiación e Inducción de Aprendices
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              Supervisa el avance en módulos de identidad, derechos y deberes, y las valoraciones de apropiación formativa de las fichas SENA.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            onClick={() => setIsDriveSyncModalOpen(true)}
            className="px-3.5 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs"
            title="Ver y configurar sincronización en tiempo real con Google Drive y Google Sheets"
          >
            <Cloud className="w-3.5 h-3.5 text-[#39A900]" />
            <span>Sincronizar Google Drive</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar CSV</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#308d00] rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Aprendiz</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Aprendices Registrados</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            {totalCount}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            En {fichas.length} fichas activas
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Inducción Culminada</div>
          <div className="text-2xl font-bold text-[#39A900] font-mono tabular-nums">
            {completedCount}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {Math.round((completedCount / (totalCount || 1)) * 100)}% del total matriculado
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Apropiación Aprobada (A)</div>
          <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 font-mono tabular-nums">
            {passedEvaluationCount}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Certificado habilitado (≥70%)
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">En Seguimiento o Refuerzo</div>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 font-mono tabular-nums">
            {needingAttentionCount}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Requieren plan de mejoramiento
          </div>
        </div>
      </div>

      {/* Control Filters and Search */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Ficha selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 mr-1">Ficha:</span>
            <button
              onClick={() => setSelectedFicha('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedFicha === 'all'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Todas las Fichas ({apprentices.length})
            </button>
            {fichas.map((f) => (
              <button
                key={f.numero}
                onClick={() => setSelectedFicha(f.numero)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedFicha === f.numero
                    ? 'bg-[#39A900] text-white font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Ficha {f.numero}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre, documento o correo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-[#39A900] text-slate-800 dark:text-slate-100 placeholder-slate-400 transition-colors"
            />
          </div>
        </div>

        {/* Status segmented buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Estado de Inducción:</span>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-2.5 py-1 rounded transition-colors ${statusFilter === 'all' ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            Todos
          </button>
          <button
            onClick={() => setStatusFilter('Completado')}
            className={`px-2.5 py-1 rounded transition-colors ${statusFilter === 'Completado' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            Completado
          </button>
          <button
            onClick={() => setStatusFilter('En Progreso')}
            className={`px-2.5 py-1 rounded transition-colors ${statusFilter === 'En Progreso' ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-semibold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            En Progreso
          </button>
          <button
            onClick={() => setStatusFilter('Pendiente')}
            className={`px-2.5 py-1 rounded transition-colors ${statusFilter === 'Pendiente' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            Pendiente
          </button>
        </div>
      </div>

      {/* Selected Ficha Summary Info (if single ficha is selected) */}
      {currentFichaInfo && (
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-white text-sm block">
              Ficha {currentFichaInfo.numero} · {currentFichaInfo.programa}
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              Instructor Líder: {currentFichaInfo.instructorLider} · Nivel: {currentFichaInfo.nivel}
            </span>
          </div>
          <div className="text-slate-600 dark:text-slate-300 shrink-0">
            Fecha de Inicio: <strong className="font-mono text-slate-800 dark:text-slate-100">{currentFichaInfo.fechaInicio}</strong>
          </div>
        </div>
      )}

      {/* Apprentices Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 font-semibold">
              <tr>
                <th className="py-3 px-4">Aprendiz</th>
                <th className="py-3 px-4">Documento</th>
                <th className="py-3 px-4">Ficha &amp; Jornada</th>
                <th className="py-3 px-4">Progreso Inducción</th>
                <th className="py-3 px-4 text-center">Evaluación</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredApprentices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 dark:text-slate-400">
                    No se encontraron aprendices con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                filteredApprentices.map((app) => {
                  const avgProgress = Math.round(
                    (app.progresoModulos.identidad +
                      app.progresoModulos.derechos +
                      app.progresoModulos.deberes +
                      app.progresoModulos.bienestar) /
                      4
                  );

                  return (
                    <tr key={app.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">{app.nombre}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">{app.correo}</div>
                      </td>

                      <td className="py-3.5 px-4 font-mono tabular-nums text-slate-700 dark:text-slate-300">
                        {app.tipoDoc} {app.documento}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-mono font-semibold text-slate-900 dark:text-white block">
                          {app.ficha}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">{app.jornada}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                            {app.estadoInduccion}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {avgProgress}%
                          </span>
                        </div>
                        <div className="w-28 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              avgProgress === 100
                                ? 'bg-[#39A900]'
                                : avgProgress > 50
                                ? 'bg-blue-500'
                                : 'bg-amber-400'
                            }`}
                            style={{ width: `${avgProgress}%` }}
                          />
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        {app.calificacionLetra === 'A' ? (
                          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                            A ({app.puntajeEvaluacion}%)
                          </span>
                        ) : app.calificacionLetra === 'D' ? (
                          <span className="font-semibold text-amber-700 dark:text-amber-400">
                            D ({app.puntajeEvaluacion}%)
                          </span>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-500">Sin calificar</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                        <button
                          onClick={() => openApprenticeDetails(app)}
                          className="px-2.5 py-1 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded font-medium transition-colors"
                          title="Ver detalle"
                        >
                          Detalle
                        </button>

                        {app.calificacionLetra === 'A' && (
                          <button
                            onClick={() => onViewCertificate(app)}
                            className="px-2.5 py-1 text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 rounded font-medium transition-colors"
                            title="Ver constancia"
                          >
                            Certificado
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apprentice Details Modal Drawer */}
      {selectedApprenticeForDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">
                  Ficha {selectedApprenticeForDetail.ficha} · {selectedApprenticeForDetail.jornada}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedApprenticeForDetail.nombre}
                </h3>
              </div>
              <button
                onClick={() => setSelectedApprenticeForDetail(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 text-xs"
              >
                ✕ Cerrar
              </button>
            </div>

            {/* Profile Info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Identificación:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedApprenticeForDetail.tipoDoc} {selectedApprenticeForDetail.documento}
                </span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Correo SENA:</span>
                <span className="text-slate-800 dark:text-slate-200 truncate block">
                  {selectedApprenticeForDetail.correo}
                </span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Teléfono:</span>
                <span className="text-slate-800 dark:text-slate-200">{selectedApprenticeForDetail.telefono}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Estado Inducción:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {selectedApprenticeForDetail.estadoInduccion}
                </span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Evaluación:</span>
                <span className={`font-bold ${selectedApprenticeForDetail.calificacionLetra === 'A' ? 'text-[#39A900]' : 'text-amber-700 dark:text-amber-400'}`}>
                  {selectedApprenticeForDetail.calificacionLetra ? `Calificación ${selectedApprenticeForDetail.calificacionLetra} (${selectedApprenticeForDetail.puntajeEvaluacion}%)` : 'No presentada'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Fecha Evaluación:</span>
                <span className="text-slate-800 dark:text-slate-200">
                  {selectedApprenticeForDetail.fechaEvaluacion || 'Pendiente'}
                </span>
              </div>
            </div>

            {/* Detailed module progression */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Avance por Módulos Temáticos
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex justify-between font-medium text-slate-800 dark:text-slate-200">
                    <span>01. Identidad e Historia SENA</span>
                    <span>{selectedApprenticeForDetail.progresoModulos.identidad}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#39A900] h-full"
                      style={{ width: `${selectedApprenticeForDetail.progresoModulos.identidad}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex justify-between font-medium text-slate-800 dark:text-slate-200">
                    <span>02. Derechos del Aprendiz</span>
                    <span>{selectedApprenticeForDetail.progresoModulos.derechos}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#39A900] h-full"
                      style={{ width: `${selectedApprenticeForDetail.progresoModulos.derechos}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex justify-between font-medium text-slate-800 dark:text-slate-200">
                    <span>03. Deberes y Reglamento</span>
                    <span>{selectedApprenticeForDetail.progresoModulos.deberes}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#39A900] h-full"
                      style={{ width: `${selectedApprenticeForDetail.progresoModulos.deberes}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex justify-between font-medium text-slate-800 dark:text-slate-200">
                    <span>04. Bienestar &amp; Etapas</span>
                    <span>{selectedApprenticeForDetail.progresoModulos.bienestar}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#39A900] h-full"
                      style={{ width: `${selectedApprenticeForDetail.progresoModulos.bienestar}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Instructor pedagogical note */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Observaciones de Seguimiento / Plan de Mejoramiento
                </h4>
                {!isEditingNote && (
                  <button
                    onClick={() => setIsEditingNote(true)}
                    className="text-xs text-[#39A900] hover:underline font-semibold flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Editar
                  </button>
                )}
              </div>

              {isEditingNote ? (
                <div className="space-y-2">
                  <textarea
                    rows={3}
                    value={tempNote}
                    onChange={(e) => setTempNote(e.target.value)}
                    placeholder="Registra retroalimentación formativa o compromisos acordados..."
                    className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-[#39A900] text-slate-800 dark:text-slate-100"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsEditingNote(false)}
                      className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveNote}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-lg border border-transparent dark:border-slate-700"
                    >
                      Guardar Observación
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  {selectedApprenticeForDetail.observacionesInstructor ||
                    'Sin observaciones registradas por el instructor líder.'}
                </div>
              )}
            </div>

            {/* Drawer action buttons */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  onSelectApprentice(selectedApprenticeForDetail.id);
                  setSelectedApprenticeForDetail(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                Navegar como este Aprendiz
              </button>

              {selectedApprenticeForDetail.calificacionLetra === 'A' && (
                <button
                  onClick={() => {
                    onViewCertificate(selectedApprenticeForDetail);
                    setSelectedApprenticeForDetail(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#308d00] rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Ver Constancia Oficial</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add New Apprentice Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateApprentice}
            className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Registrar Nuevo Aprendiz a Inducción
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 text-xs"
              >
                ✕ Cerrar
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Julian Andres Cárdenas Silva"
                  value={newNombre}
                  onChange={(e) => setNewNombre(e.target.value)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#39A900]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Tipo Doc</label>
                  <select
                    value={newTipoDoc}
                    onChange={(e) => setNewTipoDoc(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#39A900]"
                  >
                    <option value="C.C.">C.C.</option>
                    <option value="T.I.">T.I.</option>
                    <option value="P.P.T.">P.P.T.</option>
                    <option value="C.E.">C.E.</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Número de Documento *</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. 1024567890"
                    value={newDocumento}
                    onChange={(e) => setNewDocumento(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#39A900]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Correo Electrónico *</label>
                <input
                  type="email"
                  required
                  placeholder="ej. jacardenas@soy.sena.edu.co"
                  value={newCorreo}
                  onChange={(e) => setNewCorreo(e.target.value)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#39A900]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Ficha Asignada</label>
                  <select
                    value={newFicha}
                    onChange={(e) => setNewFicha(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#39A900]"
                  >
                    {fichas.map((f) => (
                      <option key={f.numero} value={f.numero}>
                        {f.numero} - {f.programa.slice(0, 20)}...
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Jornada</label>
                  <select
                    value={newJornada}
                    onChange={(e) => setNewJornada(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#39A900]"
                  >
                    <option value="Diurna">Diurna</option>
                    <option value="Nocturna">Nocturna</option>
                    <option value="Mixta">Mixta</option>
                    <option value="Virtual">Virtual</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-3.5 py-2 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#308d00] rounded-lg shadow-sm"
              >
                Inscribir a Inducción
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Google Drive / Google Sheets Realtime Synchronization Modal */}
      <GoogleDriveSyncModal
        isOpen={isDriveSyncModalOpen}
        onClose={() => setIsDriveSyncModalOpen(false)}
        apprentices={filteredApprentices}
        selectedFicha={selectedFicha}
      />
    </div>
  );
};
