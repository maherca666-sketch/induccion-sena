import React, { useState } from 'react';
import {
  DERECHOS_APRENDIZ,
  DEBERES_APRENDIZ,
  FALTAS_Y_SANCIONES,
  ETAPAS_FORMACION,
  REGLAMENTO_VIGENTE_INFO,
  CAPITULO_INGRESO_PERMANENCIA_CERTIFICACION,
  CAPITULO_REGIMEN_FALTAS_SANCIONES,
} from '../data/inductionData';
import {
  Search,
  CheckCircle2,
  ChevronRight,
  Shield,
  AlertTriangle,
  Scale,
  Sparkles,
  Layers,
  Info,
  Clock,
  BookOpen,
  Laptop,
  GraduationCap,
  UserCheck,
  FileCheck,
  Calendar,
  AlertCircle,
  FileSpreadsheet,
  Gavel,
  ShieldAlert,
} from 'lucide-react';

interface RightsAndDutiesProps {
  onMarkCompleted: () => void;
  isCompleted: boolean;
  onGoToEvaluation: () => void;
}

export const RightsAndDuties: React.FC<RightsAndDutiesProps> = ({
  onMarkCompleted,
  isCompleted,
  onGoToEvaluation,
}) => {
  const [activeTab, setActiveTab] = useState<
    'derechos' | 'deberes' | 'ingresoPermanencia' | 'faltas' | 'debidoProceso' | 'etapas' | 'novedades'
  >('derechos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItemDetail, setSelectedItemDetail] = useState<any | null>(null);
  const [subFilterCap4, setSubFilterCap4] = useState<'todos' | 'ingreso' | 'permanencia' | 'certificacion'>('todos');
  const [subFilterCap5, setSubFilterCap5] = useState<
    'todos' | 'principios' | 'naturaleza' | 'calificacion' | 'criterios' | 'formativas' | 'sancionatorias'
  >('todos');

  // Filter logic for Derechos
  const filteredDerechos = DERECHOS_APRENDIZ.filter((item) =>
    item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.resumen.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.detalle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.articulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter logic for Deberes
  const filteredDeberes = DEBERES_APRENDIZ.filter((item) =>
    item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.resumen.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.detalle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.articulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter logic for Capítulo IV: Ingreso, Permanencia y Certificación
  const allCap4Articulos = CAPITULO_INGRESO_PERMANENCIA_CERTIFICACION.secciones.flatMap((secc) =>
    secc.articulos.map((art) => ({
      ...art,
      seccionId: secc.id,
      seccionTitulo: secc.titulo,
      norma: CAPITULO_INGRESO_PERMANENCIA_CERTIFICACION.acuerdo,
      capitulo: CAPITULO_INGRESO_PERMANENCIA_CERTIFICACION.capitulo,
    }))
  );

  const filteredCap4 = allCap4Articulos.filter((item) => {
    const matchesSubFilter = subFilterCap4 === 'todos' || item.seccionId === subFilterCap4;
    const matchesSearch =
      searchTerm === '' ||
      item.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.resumen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.detalle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.seccionTitulo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubFilter && matchesSearch;
  });

  // Filter logic for Capítulo V: Régimen de Faltas, Medidas Formativas y Sancionatorias
  const allCap5Articulos = CAPITULO_REGIMEN_FALTAS_SANCIONES.secciones.flatMap((secc) =>
    secc.articulos.map((art) => ({
      ...art,
      seccionId: secc.id,
      seccionTitulo: secc.titulo,
      norma: CAPITULO_REGIMEN_FALTAS_SANCIONES.acuerdo,
      capitulo: `${CAPITULO_REGIMEN_FALTAS_SANCIONES.capitulo} · ${secc.titulo}`,
    }))
  );

  const filteredCap5 = allCap5Articulos.filter((item) => {
    const matchesSubFilter = subFilterCap5 === 'todos' || item.seccionId === subFilterCap5;
    const matchesSearch =
      searchTerm === '' ||
      item.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.resumen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.detalle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.seccionTitulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.puntosClave && item.puntosClave.some((p: string) => p.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesSubFilter && matchesSearch;
  });

  return (
    <div className="space-y-10 pb-16 w-full max-w-full min-w-0">
      {/* Banner with Workshop Apprentices Image */}
      <section className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="relative h-64 sm:h-80 w-full">
          <img
            src="/src/assets/images/sena_apprentices_workshop_1793115414073.jpg"
            alt="Aprendices SENA en Taller de Formación"
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 text-white max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold mb-2">
              <span className="text-emerald-400">Módulos 02 &amp; 03</span>
              <span className="text-slate-500" aria-hidden="true">·</span>
              <span className="text-slate-300">Reglamento del Aprendiz</span>
              <span className="text-slate-500" aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {REGLAMENTO_VIGENTE_INFO.normaPrincipal} (Vigente)
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2 text-balance">
              Derechos, Deberes, Ingreso, Permanencia y Certificación
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Explora la versión más actualizada del Reglamento del Aprendiz SENA ({REGLAMENTO_VIGENTE_INFO.normaPrincipal} y {REGLAMENTO_VIGENTE_INFO.modificacionProcedimental.split('(')[0].trim()}), incluyendo el Capítulo IV con todas las disposiciones sobre selección, matrícula, novedades formativas y requisitos de grado.
            </p>
          </div>
        </div>
      </section>

      {/* Normative Update Notice Banner */}
      <section className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50/50 dark:from-slate-900 dark:via-slate-900/90 dark:to-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Reglamento Actualizado: {REGLAMENTO_VIGENTE_INFO.normaPrincipal} (CDN SENA)
                </h2>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-semibold rounded">
                  Derogó Acuerdo 007 de 2012
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Contempla derechos digitales, aulas virtuales <strong>(Zajuna)</strong>, uso ético de TIC e Inteligencia Artificial, y el <strong>Capítulo IV de Ingreso, Permanencia y Certificación (Arts. 10 al 21)</strong>, junto con el debido proceso garantizado (Art. 48).
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('ingresoPermanencia')}
            className="self-start md:self-center px-3.5 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 rounded-lg border border-emerald-300 dark:border-emerald-800 transition-colors shrink-0 flex items-center gap-1.5"
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Ver Ingreso &amp; Certificación
          </button>
        </div>
      </section>

      {/* Control Deck: Search and Filter Tabs */}
      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 space-y-4 transition-colors min-w-0 max-w-full overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 min-w-0 w-full">
          {/* Functional tab switcher */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg overflow-x-auto scrollbar-none min-w-0 max-w-full flex-1">
            <button
              onClick={() => setActiveTab('derechos')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'derechos'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Derechos del Aprendiz
            </button>
            <button
              onClick={() => setActiveTab('deberes')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'deberes'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Deberes y Normas
            </button>
            <button
              onClick={() => setActiveTab('ingresoPermanencia')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'ingresoPermanencia'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm font-bold ring-1 ring-emerald-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Ingreso, Permanencia &amp; Certificación (Cap. IV)</span>
            </button>
            <button
              onClick={() => setActiveTab('faltas')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'faltas'
                  ? 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-400 shadow-sm font-bold ring-1 ring-amber-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Gavel className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Régimen de Faltas, Formativas &amp; Sanciones (Cap. V)</span>
            </button>
            <button
              onClick={() => setActiveTab('debidoProceso')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'debidoProceso'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Debido Proceso (Art. 48)
            </button>
            <button
              onClick={() => setActiveTab('etapas')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'etapas'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Etapas de Formación
            </button>
            <button
              onClick={() => setActiveTab('novedades')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'novedades'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Novedades 2024-2026
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por artículo, término..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-[#39A900] text-slate-800 dark:text-slate-100 placeholder-slate-400 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: Derechos */}
        {activeTab === 'derechos' && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                Capítulo II · Derechos del Aprendiz SENA ({REGLAMENTO_VIGENTE_INFO.normaPrincipal})
              </span>
              <span>{filteredDerechos.length} artículos encontrados</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDerechos.map((d, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedItemDetail({ ...d, capitulo: 'Capítulo II · Derechos' })}
                  className="p-5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-[#39A900]/60 dark:hover:border-[#39A900]/60 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                          {d.articulo}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono">
                          {d.norma}
                        </span>
                      </div>
                      <Shield className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-[#39A900] transition-colors" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#39A900] transition-colors mb-1.5">
                      {d.titulo}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {d.resumen}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200">
                    <span>Ver marco normativo detallado</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Deberes */}
        {activeTab === 'deberes' && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                Capítulo III · Deberes y Obligaciones del Aprendiz ({REGLAMENTO_VIGENTE_INFO.normaPrincipal})
              </span>
              <span>{filteredDeberes.length} deberes normados</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDeberes.map((d, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedItemDetail({ ...d, capitulo: 'Capítulo III · Deberes' })}
                  className="p-5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-slate-400 dark:hover:border-slate-500 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-slate-700 dark:text-slate-300 font-semibold">
                          {d.articulo}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono">
                          {d.norma}
                        </span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {d.tipo}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#39A900] dark:group-hover:text-[#39A900] transition-colors mb-1.5">
                      {d.titulo}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {d.resumen}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200">
                    <span>Ver especificaciones y plazos</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: NUEVO CAPÍTULO IV - Ingreso, Permanencia y Certificación */}
        {activeTab === 'ingresoPermanencia' && (
          <div className="space-y-6 pt-2">
            {/* Header Description of Chapter IV */}
            <div className="p-5 bg-gradient-to-r from-emerald-900/90 via-slate-900 to-slate-900 text-white rounded-xl border border-emerald-800/40 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-bold">
                  {CAPITULO_INGRESO_PERMANENCIA_CERTIFICACION.capitulo}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-200 font-semibold">{CAPITULO_INGRESO_PERMANENCIA_CERTIFICACION.acuerdo}</span>
                <span className="text-slate-400">·</span>
                <span className="text-emerald-400 font-mono">Artículos 10° al 21°</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                {CAPITULO_INGRESO_PERMANENCIA_CERTIFICACION.nombre}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                {CAPITULO_INGRESO_PERMANENCIA_CERTIFICACION.introduccion}
              </p>

              {/* Sub-filters inside Chapter IV */}
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => setSubFilterCap4('todos')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    subFilterCap4 === 'todos'
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-white/10 text-slate-200 hover:bg-white/20'
                  }`}
                >
                  Todos los Artículos (12)
                </button>
                <button
                  onClick={() => setSubFilterCap4('ingreso')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    subFilterCap4 === 'ingreso'
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-white/10 text-slate-200 hover:bg-white/20'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  1. Ingreso (Arts. 10° - 15°)
                </button>
                <button
                  onClick={() => setSubFilterCap4('permanencia')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    subFilterCap4 === 'permanencia'
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-white/10 text-slate-200 hover:bg-white/20'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  2. Permanencia y Novedades (Arts. 16° - 18°)
                </button>
                <button
                  onClick={() => setSubFilterCap4('certificacion')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    subFilterCap4 === 'certificacion'
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-white/10 text-slate-200 hover:bg-white/20'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  3. Certificación y Títulos (Arts. 19° - 21°)
                </button>
              </div>
            </div>

            {/* Quick Summary Highlights for the 3 Pillar Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <UserCheck className="w-4 h-4" />
                  <span>Ingreso y Matrícula Formal</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  Registro en plataforma, pruebas de selección por mérito y firma solemne del acta de matrícula. Gratuito y sin intermediarios.
                </p>
              </div>

              <div className="p-4 bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-800 dark:text-blue-300">
                  <Clock className="w-4 h-4" />
                  <span>Permanencia &amp; Novedades</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  Regula traslados de centro/jornada, aplazamiento justificado (hasta 6 meses), reingresos y retiro voluntario oportuno sin sanción.
                </p>
              </div>

              <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                  <GraduationCap className="w-4 h-4" />
                  <span>Certificación y Grado</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  Requiere aprobación del 100% de la Etapa Lectiva y Productiva más paz y salvo integral. Diplomas con QR y firma digital.
                </p>
              </div>
            </div>

            {/* Articles Grid for Chapter IV */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Artículos del Capítulo IV ({filteredCap4.length} mostrados)
                </span>
                <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                  Acuerdo 009 de 2024
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCap4.map((art, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      setSelectedItemDetail({
                        articulo: art.numero,
                        titulo: art.titulo,
                        resumen: art.resumen,
                        detalle: art.detalle,
                        norma: 'Acuerdo 009 de 2024 (Capítulo IV)',
                        capitulo: `Capítulo IV · ${art.seccionTitulo}`,
                        puntosClave: art.puntosClave,
                        novedadesDetalladas: art.novedadesDetalladas,
                      })
                    }
                    className="p-5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                            {art.numero}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold">
                            {art.seccionTitulo.split('.')[1] || art.seccionTitulo}
                          </span>
                        </div>
                        <FileCheck className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors mb-1.5">
                        {art.titulo}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                        {art.resumen}
                      </p>

                      {art.puntosClave && art.puntosClave.length > 0 && (
                        <div className="space-y-1 mb-2">
                          {art.puntosClave.slice(0, 3).map((punto, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">✓</span>
                              <span className="line-clamp-1">{punto}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Special card view for Art. 18 (Novedades formativas) */}
                      {art.numero === 'Art. 18°' && (
                        <div className="mt-3 p-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 space-y-1">
                          <span className="font-semibold block text-emerald-700 dark:text-emerald-400">
                            Novedades tipificadas:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            <span className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">Traslados</span>
                            <span className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">Aplazamiento (máx. 6 meses)</span>
                            <span className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">Reingreso</span>
                            <span className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">Retiro Voluntario</span>
                            <span className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">Deserción</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                      <span>Ver artículo completo y requisitos</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Callout: Deep Dive into Art. 18 Novedades & Art. 19 Certificación */}
            <div className="p-6 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Guía Rápida de Novedades Formativas y Certificación (Capítulo IV)
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-300">
                <div className="space-y-2 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                  <strong className="text-slate-900 dark:text-white block">
                    ¿Cómo solicitar Traslado o Aplazamiento?
                  </strong>
                  <p className="leading-relaxed">
                    Toda novedad debe radicarse por el portal de gestión del SENA. El <strong>aplazamiento</strong> se concede por causas de fuerza mayor o calamidad hasta por un máximo de <strong>6 meses</strong>. El <strong>traslado</strong> exige tener aprobado como mínimo un trimestre formativo y disponibilidad de cupo en la ficha de destino.
                  </p>
                </div>

                <div className="space-y-2 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                  <strong className="text-slate-900 dark:text-white block">
                    ¿Qué se requiere para la Certificación? (Art. 19)
                  </strong>
                  <p className="leading-relaxed">
                    Haber aprobado el <strong>100% de los resultados de aprendizaje</strong> de la Etapa Lectiva y de la Etapa Productiva, entrega formal de bitácoras de seguimiento, paz y salvo integral (académico, biblioteca, inventario y administrativo) y documento de identidad verificado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Régimen de Faltas, Medidas Formativas, Disciplinarias y Sancionatorias (Capítulo V - Acuerdo 009 de 2024) */}
        {activeTab === 'faltas' && (
          <div className="space-y-6 pt-2">
            {/* Header del Capítulo V */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 font-bold font-mono">
                    {CAPITULO_REGIMEN_FALTAS_SANCIONES.capitulo}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {CAPITULO_REGIMEN_FALTAS_SANCIONES.nombre}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
                  {CAPITULO_REGIMEN_FALTAS_SANCIONES.introduccion}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('debidoProceso')}
                className="px-3 py-1.5 text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-slate-700 rounded-lg border border-emerald-300 dark:border-emerald-800 font-semibold flex items-center gap-1.5 self-start sm:self-center shrink-0 transition-colors"
              >
                <Scale className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Ver Garantías y Debido Proceso (Art. 48) →</span>
              </button>
            </div>

            {/* Cuadro Comparativo Esencial: Medidas Formativas vs Sanciones Disciplinarias */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50/70 to-emerald-100/30 dark:from-emerald-950/30 dark:to-slate-900 border border-emerald-200 dark:border-emerald-900/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Medidas Formativas (Arts. 45 y 46)
                    </h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-semibold">
                    Pedagógicas · Sin Sanción Punitiva
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Orientadas a apoyar, nivelar y guiar al aprendiz para alcanzar sus competencias y superar dificultades conductuales menores. <strong>NO son sanciones disciplinarias, NO generan antecedentes</strong> en la hoja de vida ni afectan el estado de su matrícula.
                </p>
                <div className="space-y-1 pt-1 text-[11px] text-slate-700 dark:text-slate-300">
                  <div className="flex items-start gap-1.5">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">✓</span>
                    <span><strong>Llamado de atención formativo:</strong> Diálogo pedagógico y compromiso directo con el instructor.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">✓</span>
                    <span><strong>Plan de mejoramiento:</strong> Compromiso concertado con metas, evidencias y plazo límite (máx. 30 días).</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">✓</span>
                    <span><strong>Competencia:</strong> Instructores y Coordinación Académica del Centro.</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50/70 to-red-50/40 dark:from-slate-900 dark:to-red-950/20 border border-amber-200 dark:border-red-900/40 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-600/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                      <Gavel className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Medidas Sancionatorias (Art. 47)
                    </h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/70 text-red-800 dark:text-red-300 font-semibold">
                    Actos Administrativos · Afectan Matrícula
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Consecuencias jurídicas formales impuestas <strong>exclusivamente por el Subdirector de Centro</strong> mediante Resolución motivada ante faltas leves reiteradas, graves o gravísimas, previo agotamiento del debido proceso.
                </p>
                <div className="space-y-1 pt-1 text-[11px] text-slate-700 dark:text-slate-300">
                  <div className="flex items-start gap-1.5">
                    <span className="text-amber-600 dark:text-amber-400 font-bold shrink-0">1.</span>
                    <span><strong>Llamado de atención escrito:</strong> Con copia a la hoja de vida institucional.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-amber-600 dark:text-amber-400 font-bold shrink-0">2.</span>
                    <span><strong>Condicionamiento de matrícula:</strong> Pérdida de estímulos y seguimiento estricto.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-red-600 dark:text-red-400 font-bold shrink-0">3.</span>
                    <span><strong>Cancelación de matrícula:</strong> Extingue el cupo e impone <strong>inhabilidad de 6 meses a 3 años</strong> a nivel nacional.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-filtros del Capítulo V */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <span className="text-slate-400 font-medium mr-1 shrink-0">Filtrar Capítulo V:</span>
              <button
                onClick={() => setSubFilterCap5('todos')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  subFilterCap5 === 'todos'
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Todas las Disposiciones ({filteredCap5.length})
              </button>
              <button
                onClick={() => setSubFilterCap5('principios')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  subFilterCap5 === 'principios'
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Principios &amp; Definición (Arts. 39-40)
              </button>
              <button
                onClick={() => setSubFilterCap5('naturaleza')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  subFilterCap5 === 'naturaleza'
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Naturaleza (Académicas vs Disciplinarias)
              </button>
              <button
                onClick={() => setSubFilterCap5('calificacion')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  subFilterCap5 === 'calificacion'
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Calificación &amp; Gravísimas (Arts. 42 y 44)
              </button>
              <button
                onClick={() => setSubFilterCap5('criterios')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  subFilterCap5 === 'criterios'
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Criterios, Atenuantes &amp; Agravantes (Art. 43)
              </button>
              <button
                onClick={() => setSubFilterCap5('formativas')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  subFilterCap5 === 'formativas'
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Medidas Formativas (Arts. 45-46)
              </button>
              <button
                onClick={() => setSubFilterCap5('sancionatorias')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  subFilterCap5 === 'sancionatorias'
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Sanciones Disciplinarias (Art. 47)
              </button>
            </div>

            {/* Grid de Artículos del Capítulo V */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Artículos del Capítulo V ({filteredCap5.length} disposiciones disponibles)
                </span>
                <span className="font-mono text-amber-700 dark:text-amber-400 font-semibold">
                  {CAPITULO_REGIMEN_FALTAS_SANCIONES.acuerdo}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCap5.map((art, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      setSelectedItemDetail({
                        articulo: art.numero,
                        titulo: art.titulo,
                        resumen: art.resumen,
                        detalle: art.detalle,
                        norma: 'Acuerdo 009 de 2024 (Capítulo V)',
                        capitulo: art.capitulo,
                        puntosClave: art.puntosClave,
                      })
                    }
                    className="p-5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-amber-500/60 dark:hover:border-amber-500/60 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400 font-bold">
                            {art.numero}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold">
                            {art.seccionTitulo.split('.')[1] || art.seccionTitulo}
                          </span>
                        </div>
                        <ShieldAlert className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors mb-1.5">
                        {art.titulo}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                        {art.resumen}
                      </p>

                      {art.puntosClave && art.puntosClave.length > 0 && (
                        <div className="space-y-1 mb-2">
                          {art.puntosClave.slice(0, 3).map((punto, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                              <span className="text-amber-600 dark:text-amber-400 font-bold shrink-0">✓</span>
                              <span className="line-clamp-1">{punto}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Special highlight for Art. 44 (Faltas Gravísimas) */}
                      {art.numero === 'Art. 44°' && (
                        <div className="mt-3 p-2.5 bg-red-50/80 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-900/60 text-[11px] text-red-900 dark:text-red-300 space-y-1">
                          <span className="font-semibold block text-red-700 dark:text-red-400">
                            Catálogo de Conductas Gravísimas Tipificadas:
                          </span>
                          <div className="flex flex-wrap gap-1 text-[10px]">
                            <span className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-red-200 dark:border-red-800">Plagio o Fraude</span>
                            <span className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-red-200 dark:border-red-800">Drogas / Alcohol</span>
                            <span className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-red-200 dark:border-red-800">Porte de Armas</span>
                            <span className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-red-200 dark:border-red-800">Agresión o Ciberacoso</span>
                            <span className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-red-200 dark:border-red-800">Falsedad Documental</span>
                            <span className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-red-200 dark:border-red-800">Hurto o Daño Doloso</span>
                            <span className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-red-200 dark:border-red-800">Suplantación de Identidad</span>
                          </div>
                        </div>
                      )}

                      {/* Special highlight for Art. 47 Cancelación */}
                      {art.numero.includes('Cancelación') && (
                        <div className="mt-3 p-2.5 bg-red-50 dark:bg-red-950/40 rounded-lg border border-red-200 dark:border-red-900 text-[11px] text-red-900 dark:text-red-200">
                          <strong>Inhabilidad Legal:</strong> De seis (6) meses a tres (3) años para registrarse o matricularse en cualquier programa presencial o virtual del SENA a nivel nacional.
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-amber-700 dark:group-hover:text-amber-300">
                      <span>Ver análisis normativo completo</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clasificación de Faltas Resumida: Leves, Graves y Gravísimas */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Escala de Gravedad y Ejemplos Prácticos (Art. 42)
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Criterios objetivos para graduar la respuesta institucional en el proceso formativo.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {FALTAS_Y_SANCIONES.clasificacion.map((f, i) => (
                  <div key={i} className="p-5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold mb-2">
                        <span className={i === 0 ? 'text-amber-700 dark:text-amber-400' : i === 1 ? 'text-orange-700 dark:text-orange-400' : 'text-red-700 dark:text-red-400'}>
                          Faltas {f.tipo}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{f.norma}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {f.definicion}
                      </p>
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 block">Ejemplos tipificados:</span>
                        {f.ejemplos.map((ex, j) => (
                          <div key={j} className="text-[11px] text-slate-600 dark:text-slate-400 pl-2 border-l border-slate-300 dark:border-slate-600 leading-snug">
                            {ex}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Debido Proceso (Art. 48) */}
        {activeTab === 'debidoProceso' && (
          <div className="space-y-6 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Garantías Procesales del Aprendiz SENA
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold font-mono">
                    Art. 48 mod. Acuerdo 002 de 2026
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Ninguna sanción puede ser impuesta sin respetar las etapas del debido proceso, la presunción de inocencia, el traslado oportuno de pruebas y el derecho irrenunciable a la contradicción.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Secuencia Procedimental Oficial ante el Comité de Evaluación y Seguimiento
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {FALTAS_Y_SANCIONES.debidoProcesoPasos?.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between relative group hover:border-[#39A900] transition-colors"
                  >
                    <div>
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-center mb-3">
                        0{idx + 1}
                      </div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                        {p.paso}
                      </h5>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                        {p.descripcion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/40">
                <strong className="text-emerald-900 dark:text-emerald-300 block mb-1">
                  Traslado de Pruebas Anticipado
                </strong>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  El aprendiz debe recibir todas las pruebas que sustentan la queja con al menos <strong>5 días hábiles</strong> de anterioridad para preparar sus descargos.
                </p>
              </div>
              <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-900/40">
                <strong className="text-blue-900 dark:text-blue-300 block mb-1">
                  Acompañamiento y Defensa
                </strong>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  El aprendiz puede asistir a la sesión del Comité acompañado por su Vocero de Ficha o una persona de su confianza para garantizar transparencia.
                </p>
              </div>
              <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/40">
                <strong className="text-amber-900 dark:text-amber-300 block mb-1">
                  Recurso de Reposición
                </strong>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  Contra la resolución expedida por el Subdirector procede el recurso dentro de los <strong>5 días hábiles</strong> siguientes a su notificación formal.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Etapas de Formación */}
        {activeTab === 'etapas' && (
          <div className="space-y-6 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-[#39A900]">Fase 01</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{ETAPAS_FORMACION[0].duracion}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{ETAPAS_FORMACION[0].etapa}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {ETAPAS_FORMACION[0].enfoque}
                </p>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                  Desarrollada en ambientes físicos de taller, aulas especializadas y plataforma oficial (Zajuna), fortaleciendo competencias técnicas, blandas y ciudadanas.
                </div>
              </div>

              <div className="p-5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">Fase 02</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{ETAPAS_FORMACION[1].duracion}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{ETAPAS_FORMACION[1].etapa}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {ETAPAS_FORMACION[1].enfoque}
                </p>
                <div className="p-3 bg-blue-50/60 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-300">
                  Requisito legal ineludible para obtener el título o certificado formal expedido por el SENA.
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                Modalidades Válidas para Desarrollar la Etapa Productiva
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ETAPAS_FORMACION[1].alternativas?.map((alt, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                      {alt.nombre}
                    </span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {alt.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: Novedades 2024-2026 */}
        {activeTab === 'novedades' && (
          <div className="space-y-6 pt-2">
            <div className="p-5 bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-xl space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-semibold">Comparativa Normativa</span>
              <h3 className="text-lg font-bold">
                ¿Qué cambió respecto al antiguo Acuerdo 007 de 2012?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                El nuevo Reglamento del Aprendiz ({REGLAMENTO_VIGENTE_INFO.normaPrincipal} y {REGLAMENTO_VIGENTE_INFO.modificacionProcedimental}) moderniza integralmente la relación formativa adaptándola al siglo XXI, a la educación híbrida, a la protección de datos personales y al fortalecimiento de los derechos humanos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REGLAMENTO_VIGENTE_INFO.novedadesClave.map((nov, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {nov.titulo}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
                    {nov.descripcion}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>
                  <strong>Ámbito de Aplicación:</strong> {REGLAMENTO_VIGENTE_INFO.alcance}
                </span>
              </div>
              <span className="text-slate-400 font-mono text-[11px] shrink-0">
                {REGLAMENTO_VIGENTE_INFO.organoEmisor}
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Item Detail Modal */}
      {selectedItemDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                  {selectedItemDetail.articulo}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono">
                  {selectedItemDetail.norma || REGLAMENTO_VIGENTE_INFO.normaPrincipal}
                </span>
              </div>
              <button
                onClick={() => setSelectedItemDetail(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 text-xs"
              >
                ✕ Cerrar
              </button>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                {selectedItemDetail.capitulo}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {selectedItemDetail.titulo}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {selectedItemDetail.detalle || selectedItemDetail.resumen}
              </p>
            </div>

            {/* Puntos clave if available */}
            {selectedItemDetail.puntosClave && selectedItemDetail.puntosClave.length > 0 && (
              <div className="p-3.5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/40 text-xs space-y-2">
                <div className="font-semibold text-emerald-900 dark:text-emerald-300">
                  Puntos Clave y Obligatoriedad:
                </div>
                <div className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                  {selectedItemDetail.puntosClave.map((punto: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      <span>{punto}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Novedades detalladas if Art. 18 */}
            {selectedItemDetail.novedadesDetalladas && (
              <div className="space-y-2 text-xs">
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  Condiciones y plazos reglamentarios:
                </div>
                <div className="space-y-2">
                  {selectedItemDetail.novedadesDetalladas.map((nov: any, nIdx: number) => (
                    <div key={nIdx} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <strong className="text-emerald-700 dark:text-emerald-400 block mb-0.5">
                        {nov.nombre}
                      </strong>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                        {nov.condiciones}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                Marco de Aplicación en Centro y Ambientes Virtuales:
              </div>
              <div className="text-[11px]">
                Esta disposición del {REGLAMENTO_VIGENTE_INFO.normaPrincipal} es vinculante para todos los aprendices del SENA en modalidad presencial, virtual o combinada a nivel nacional.
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedItemDetail(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors border border-transparent dark:border-slate-700"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 gap-4 transition-colors">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            ¿Apropiaste los Derechos, Deberes, Ingreso, Permanencia y el Régimen de Faltas y Sanciones?
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Una vez comprendida la normativa integral (Capítulos IV y V del {REGLAMENTO_VIGENTE_INFO.normaPrincipal} y {REGLAMENTO_VIGENTE_INFO.modificacionProcedimental.split('(')[0].trim()}), avanza a la evaluación interactiva para validar tus conocimientos.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onMarkCompleted}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              isCompleted
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Módulos Completados (100%)' : 'Marcar como Completado'}</span>
          </button>

          <button
            onClick={onGoToEvaluation}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#308d00] rounded-lg transition-colors whitespace-nowrap shadow-sm"
          >
            Iniciar Evaluación Interactiva →
          </button>
        </div>
      </div>
    </div>
  );
};
