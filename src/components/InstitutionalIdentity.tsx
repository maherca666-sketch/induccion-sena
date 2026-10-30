import React, { useState } from 'react';
import { INSTITUTIONAL_INFO } from '../data/inductionData';
import { Play, Pause, RotateCcw, Volume2, CheckCircle2, BookOpen, Compass, Award, ExternalLink } from 'lucide-react';

interface InstitutionalIdentityProps {
  onMarkCompleted: () => void;
  isCompleted: boolean;
  onGoToNext: () => void;
}

export const InstitutionalIdentity: React.FC<InstitutionalIdentityProps> = ({
  onMarkCompleted,
  isCompleted,
  onGoToNext,
}) => {
  const [activeSymbol, setActiveSymbol] = useState<'escudo' | 'bandera' | 'logosimbolo' | 'himno'>('escudo');
  const [isPlayingAnthem, setIsPlayingAnthem] = useState(false);
  const [anthemProgress, setAnthemProgress] = useState(0);

  // Simulated anthem audio playback
  React.useEffect(() => {
    let interval: any;
    if (isPlayingAnthem) {
      interval = setInterval(() => {
        setAnthemProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAnthem(false);
            return 0;
          }
          return prev + 1.25;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlayingAnthem]);

  const toggleAnthem = () => {
    setIsPlayingAnthem(!isPlayingAnthem);
  };

  const resetAnthem = () => {
    setIsPlayingAnthem(false);
    setAnthemProgress(0);
  };

  return (
    <div className="space-y-12 pb-16 w-full max-w-full min-w-0">
      {/* Hero Section with SENA Campus */}
      <section className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-200">
        <div className="relative h-72 sm:h-96 w-full">
          <img
            src="/src/assets/images/sena_campus_modern_1793115412928.jpg"
            alt="Campus de Formación SENA Colombia"
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 text-white max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
              <span>Módulo 01</span>
              <span aria-hidden="true">·</span>
              <span>Inducción Institucional</span>
              <span aria-hidden="true">·</span>
              <span>Formación Profesional Integral</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3 text-balance">
              Identidad, Valores e Historia del SENA
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Bienvenido a la entidad más querida por todos los colombianos. Conoce nuestras raíces, símbolos de orgullo nacional y la misión formadora que transformará tu futuro laboral y humano.
            </p>
          </div>
        </div>
      </section>

      {/* Misión, Visión y Origen Histórico */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span>Fundación 1957</span>
              <span aria-hidden="true">·</span>
              <span>69 Años de Historia</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Origen y Fundador</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Nacido el <strong className="text-slate-800 dark:text-slate-200">21 de junio de 1957</strong> bajo la iniciativa del economista cartagenero <strong className="text-slate-800 dark:text-slate-200">Rodolfo Martínez Tono</strong>, con el respaldo de trabajadores, empresarios y la iglesia, para tecnificar a la fuerza obrera de Colombia.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            Decreto-Ley 118 de 1957
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span>Propósito Superior</span>
              <span aria-hidden="true">·</span>
              <span>Estado Colombiano</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Nuestra Misión</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {INSTITUTIONAL_INFO.mision}
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-[#39A900] font-medium">
            Gratuidad y Pertinencia Social
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span>Horizonte 2030</span>
              <span aria-hidden="true">·</span>
              <span>Liderazgo Productivo</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Nuestra Visión</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {INSTITUTIONAL_INFO.vision}
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            Innovación y Competitividad País
          </div>
        </div>
      </section>

      {/* Símbolos Institucionales SENA */}
      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 transition-colors min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 gap-4 min-w-0">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Símbolos Patrios del SENA</span>
              <span aria-hidden="true">·</span>
              <span>Heráldica &amp; Significado</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Explorador de Símbolos Institucionales</h2>
          </div>

          {/* Functional filter tabs for symbols */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg max-w-full overflow-x-auto scrollbar-none min-w-0">
            <button
              onClick={() => setActiveSymbol('escudo')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeSymbol === 'escudo'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              El Escudo
            </button>
            <button
              onClick={() => setActiveSymbol('bandera')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeSymbol === 'bandera'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              La Bandera
            </button>
            <button
              onClick={() => setActiveSymbol('logosimbolo')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeSymbol === 'logosimbolo'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Logo-Símbolo
            </button>
            <button
              onClick={() => setActiveSymbol('himno')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeSymbol === 'himno'
                  ? 'bg-white dark:bg-slate-700 text-[#39A900] shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              El Himno
            </button>
          </div>
        </div>

        {/* Dynamic Symbol Viewer */}
        <div className="pt-6">
          {activeSymbol === 'escudo' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-56 h-64 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm p-4 flex flex-col items-center justify-center">
                  <img
                    src="/src/assets/images/sena_escudo_oficial.jpg"
                    alt="Escudo Oficial del SENA"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-xs text-slate-500 mt-3 text-center">
                  Escudo Nacional del SENA con sus 3 sectores económicos numerados
                </span>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-white border border-slate-200 p-0.5 shrink-0">
                    <img
                      src="/src/assets/images/sena_escudo_oficial.jpg"
                      alt="Escudo SENA"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {INSTITUTIONAL_INFO.simbolos[0].nombre}
                    </h3>
                    <span className="text-xs text-emerald-700 font-semibold">Heráldica y Sectores Productivos</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {INSTITUTIONAL_INFO.simbolos[0].descripcion}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-xs font-bold text-slate-900 mb-1">1. El Piñón / Rueda Dentada</div>
                    <div className="text-xs text-slate-600 leading-normal">Sector secundario o industrial y la fuerza motriz de la tecnología.</div>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-xs font-bold text-slate-900 mb-1">2. El Caduceo con Alas</div>
                    <div className="text-xs text-slate-600 leading-normal">Sector terciario de comercio y servicios, dinamizador del intercambio humano.</div>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-xs font-bold text-slate-900 mb-1">3. La Rama de Café</div>
                    <div className="text-xs text-slate-600 leading-normal">Sector primario o agropecuario y extractivo, base alimentaria de Colombia.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSymbol === 'bandera' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-64 h-40 bg-white border-2 border-slate-300 rounded shadow-md flex items-center justify-center relative overflow-hidden p-4">
                  <div className="text-center flex flex-col items-center">
                    <img
                      src="/src/assets/images/sena_logo_mark.png"
                      alt="Logo Oficial SENA en Bandera"
                      className="w-20 h-20 object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[11px] font-bold text-slate-800 mt-1 block">Bandera Oficial del SENA</span>
                  </div>
                </div>
                <span className="text-xs text-slate-500 mt-4 text-center">
                  Fondo blanco inmaculado de paz con el logo-símbolo verde institucional
                </span>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-lg font-bold text-slate-900">
                  {INSTITUTIONAL_INFO.simbolos[1].nombre}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {INSTITUTIONAL_INFO.simbolos[1].descripcion}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {INSTITUTIONAL_INFO.simbolos[1].detalles?.map((det, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="text-xs font-bold text-slate-900 mb-1">{det.elemento}</div>
                      <div className="text-xs text-slate-600 leading-normal">{det.significado}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSymbol === 'logosimbolo' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-full max-w-sm bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm p-4">
                  <img
                    src="/src/assets/images/sena_logo_oficial.jpg"
                    alt="Logotipo Oficial del SENA - Infografía"
                    className="w-full h-auto object-contain rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-xs text-slate-500 mt-3 text-center">
                  Imagen e infografía oficial del Logotipo y caminos del aprendiz SENA
                </span>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-2">
                  <img
                    src="/src/assets/images/sena_logo_mark.png"
                    alt="Logo SENA"
                    className="w-10 h-10 object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {INSTITUTIONAL_INFO.simbolos[2].nombre}
                    </h3>
                    <span className="text-xs text-emerald-700 font-semibold">Identidad Gráfica Institucional</span>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 leading-relaxed italic">
                  &ldquo;El logotipo del SENA representa los caminos que el aprendiz puede tomar (las decisiones) para seguir adelante enfocada a la formación del hombre para una buena calidad de vida, así mismo también representa la responsabilidad que debe tener el aprendiz con su propio proceso de aprendizaje.&rdquo;
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {INSTITUTIONAL_INFO.simbolos[2].descripcion}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {INSTITUTIONAL_INFO.simbolos[2].detalles?.map((det, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="text-xs font-bold text-slate-900 mb-1">{det.elemento}</div>
                      <div className="text-xs text-slate-600 leading-normal">{det.significado}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSymbol === 'himno' && (
            <div className="space-y-6">
              {/* Audio controller widget */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleAnthem}
                    className="w-10 h-10 rounded-full bg-[#39A900] hover:bg-[#329600] text-white flex items-center justify-center transition-transform active:scale-95 shadow-sm shrink-0"
                    aria-label={isPlayingAnthem ? 'Pausar himno' : 'Reproducir himno'}
                  >
                    {isPlayingAnthem ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Himno Oficial del SENA
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Luis Alfredo Sánchez (Letra) · Daniel Marlez (Música)
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-72">
                  <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#39A900] h-full transition-all duration-300"
                      style={{ width: `${anthemProgress}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono tabular-nums text-slate-500 shrink-0">
                    {Math.floor((anthemProgress * 1.8) / 60)}:
                    {Math.floor((anthemProgress * 1.8) % 60).toString().padStart(2, '0')}
                  </span>
                  <button
                    onClick={resetAnthem}
                    className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
                    title="Reiniciar"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Hymn lyrics layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-5 bg-emerald-50/60 rounded-xl border border-emerald-200">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-2">
                    Coro Institucional
                  </span>
                  <p className="text-sm font-semibold text-slate-800 leading-relaxed whitespace-pre-line italic">
                    {INSTITUTIONAL_INFO.simbolos[3].coro}
                  </p>
                </div>

                <div className="space-y-4">
                  {INSTITUTIONAL_INFO.simbolos[3].estrofas?.map((est, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-xs font-semibold text-slate-500 block mb-1">
                        Estrofa {est.numero}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                        {est.texto}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Decálogo Ético y Valores SENA */}
      <section className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Código de Integridad</span>
            <span aria-hidden="true">·</span>
            <span>Comunidad de Aprendices</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Valores Institucionales Fundamentales</h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Cada aprendiz SENA interioriza estos valores durante su proceso formativo para consolidarse como un ciudadano ético y un profesional de excelencia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INSTITUTIONAL_INFO.valores.map((val, idx) => (
            <div
              key={idx}
              className="p-5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400 tabular-nums">0{idx + 1}.</span>
                <span className="w-2 h-2 rounded-full bg-[#39A900]/40" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">{val.titulo}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{val.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Plataformas y Ecosistema de Aprendizaje SENA */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8">
        <div className="max-w-2xl mb-6">
          <div className="text-xs text-emerald-400 font-semibold mb-1">Ecosistema Digital SENA</div>
          <h2 className="text-xl font-bold text-white mb-2">Plataformas Clave para tu Formación</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Durante tus etapas lectiva y productiva utilizarás las herramientas tecnológicas del SENA para gestionar evidencias, calificaciones y oportunidades laborales.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700">
            <div className="text-xs font-bold text-white mb-1">Zajuna (LMS SENA)</div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Ambiente virtual oficial para acceder a guías, foros temáticos, entrega de evidencias y calificaciones de instructores.
            </p>
            <span className="text-[11px] text-emerald-400 font-medium">Plataforma de Estudio</span>
          </div>

          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700">
            <div className="text-xs font-bold text-white mb-1">SENA SOFIA Plus</div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Sistema de gestión académica donde consultas tu ficha de caracterización, certificados formales y estado de matrícula.
            </p>
            <span className="text-[11px] text-emerald-400 font-medium">Gestión Académica</span>
          </div>

          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700">
            <div className="text-xs font-bold text-white mb-1">APE - Agencia de Empleo</div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Portal público de intermediación laboral para postular tu hoja de vida a vacantes y contratos de aprendizaje empresarial.
            </p>
            <span className="text-[11px] text-emerald-400 font-medium">Conexión Laboral</span>
          </div>
        </div>
      </section>

      {/* Progress & Next step action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 gap-4 min-w-0 transition-colors">
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            ¿Has completado la lectura de Identidad y Símbolos?
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Marca el módulo como estudiado para registrar tu progreso en el sistema de inducción.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
          <button
            onClick={onMarkCompleted}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              isCompleted
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Módulo Completado (100%)' : 'Marcar como Completado'}</span>
          </button>

          <button
            onClick={onGoToNext}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#308d00] rounded-lg transition-colors flex items-center justify-center whitespace-nowrap shadow-sm"
          >
            Continuar a Derechos &amp; Deberes →
          </button>
        </div>
      </div>
    </div>
  );
};
