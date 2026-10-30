import React, { useState } from 'react';
import { BookOpen, X, Download, CheckCircle, Shield, Award, HelpCircle, FileText, ChevronRight, Search, Printer } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface UserManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserManualModal: React.FC<UserManualModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [searchFilter, setSearchFilter] = useState('');

  if (!isOpen) return null;

  const sections = [
    { id: 'intro', title: '1. Bienvenida y Propósito', icon: BookOpen },
    { id: 'roles', title: '2. Roles: Aprendiz vs Instructor', icon: Shield },
    { id: 'perfil', title: '3. Selección y Registro de Perfil', icon: FileText },
    { id: 'identidad', title: '4. Módulo Identidad y Símbolos', icon: Award },
    { id: 'derechos', title: '5. Módulo Derechos (Acuerdo 009)', icon: Shield },
    { id: 'deberes', title: '6. Módulo Deberes y Prohibiciones', icon: CheckCircle },
    { id: 'evaluacion', title: '7. Evaluación Interactiva (A/D)', icon: Award },
    { id: 'certificado', title: '8. Certificado Digital Oficial', icon: Award },
    { id: 'sincronizacion', title: '9. Sincronización en Google Drive', icon: FileText },
    { id: 'faq', title: '10. Preguntas Frecuentes (FAQ)', icon: HelpCircle },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
              <SenaLogo variant="official" size="sm" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-[#39A900] text-white rounded">
                  GUÍA OFICIAL
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Acuerdo 009 de 2024 · SENA
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Manual del Aprendiz: Portal de Inducción
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Imprimir o guardar en PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title="Cerrar manual"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Sidebar navigation + Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
          {/* Sidebar */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 p-3 sm:p-4 bg-slate-50/70 dark:bg-slate-950/30 overflow-y-auto shrink-0 space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
              Contenido del Manual
            </div>
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                    isActive
                      ? 'bg-[#39A900] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{sec.title}</span>
                </button>
              );
            })}
          </div>

          {/* Reading View */}
          <div className="flex-1 p-5 sm:p-8 overflow-y-auto space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            {activeSection === 'intro' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                  <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
                    Capítulo 1
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    Bienvenida y Propósito de la Inducción SENA
                  </h3>
                </div>
                <p>
                  ¡Apreciado(a) Aprendiz! Te damos la más cordial bienvenida al <strong>Servicio Nacional de Aprendizaje - SENA</strong>. La etapa de inducción es un requisito fundamental dentro de tu proceso de Formación Profesional Integral (FPI).
                </p>
                <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 p-4 rounded-xl">
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm mb-1">
                    Objetivos de la Inducción:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-emerald-800 dark:text-emerald-200">
                    <li>Conocer la misión, visión, historia y símbolos de la institución.</li>
                    <li>Apropiar los derechos y garantías consagrados en el <strong>Acuerdo 009 de 2024</strong>.</li>
                    <li>Asumir con responsabilidad tus deberes éticos, formativos y de convivencia.</li>
                    <li>Aprobar la evaluación interactiva con mínimo 70% (Calificación 'A').</li>
                    <li>Obtener tu Certificado Digital con código único para tu portafolio de evidencias.</li>
                  </ul>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-3 rounded-lg flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-[#39A900]">🎬 Video Tutorial:</span>
                  <span>En la página principal dispones del botón <strong>"Video Tutorial"</strong> para reproducir el video explicativo oficial con controles interactivos integrados.</span>
                </div>
              </div>
            )}

            {activeSection === 'roles' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                  <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
                    Capítulo 2
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    Segregación de Roles y Seguridad
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 space-y-2">
                    <div className="flex items-center gap-2 text-[#39A900] font-bold">
                      <CheckCircle className="w-4 h-4" />
                      <span>Rol Aprendiz (Formación)</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Acceso libre y directo. En este rol, la privacidad es absoluta: <strong>no se expone información privada ni datos de contacto del instructor</strong>. El aprendiz se enfoca exclusivamente en sus módulos y evaluación.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800/60 bg-blue-50/50 dark:bg-blue-950/30 space-y-2">
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold">
                      <Shield className="w-4 h-4" />
                      <span>Rol Instructor (Supervisión)</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Protegido por la clave institucional <code>Maherca666</code>. El instructor líder activo <strong>Marco Antonio Hernández</strong> puede monitorear las fichas, notas formativas, emitir observaciones y sincronizar con Google Drive.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'perfil' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                  <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
                    Capítulo 3
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    Selección y Registro de Perfil del Aprendiz
                  </h3>
                </div>
                <p>
                  Para personalizar tu experiencia y emitir el certificado con tus datos oficiales:
                </p>
                <ol className="list-decimal pl-5 space-y-2 text-xs">
                  <li>Haz clic en el selector de usuario en la barra superior o en la página de inicio.</li>
                  <li>Selecciona tu nombre de la lista de aprendices asignados a la ficha (ejemplo: Ficha <code>2874102</code> - ADSO) o pulsa <strong>"Registrar Nuevo Aprendiz"</strong>.</li>
                  <li>Ingresa tus nombres completos, tipo de documento (C.C., T.I., C.E.) y número.</li>
                  <li>Una vez seleccionado, todo tu progreso quedará guardado automáticamente en tu navegador y en la base de datos sincronizada.</li>
                </ol>
              </div>
            )}

            {activeSection === 'identidad' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                  <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
                    Capítulo 4
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    Módulo de Identidad Institucional y Símbolos
                  </h3>
                </div>
                <p>
                  El SENA nació en 1957 por iniciativa del doctor <strong>Rodolfo Martínez Tono</strong>. En este módulo interactivo aprenderás sobre:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li><strong>Escudo:</strong> Representa los tres sectores de la economía colombiana (industria, comercio/servicios, y sector agropecuario).</li>
                  <li><strong>Bandera:</strong> Fondo blanco de paz con el escudo verde central.</li>
                  <li><strong>Logotipo (Cadete):</strong> Figura humana estilizada que camina con decisión hacia el futuro tecnológico.</li>
                  <li><strong>Himno del SENA:</strong> Obra lírica de orgullo nacional.</li>
                </ul>
                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg text-xs text-amber-900 dark:text-amber-200">
                  Recuerda hacer clic en <strong>"Marcar Módulo como Completado"</strong> al final de la lectura para sumar tu 100% de avance.
                </div>
              </div>
            )}

            {activeSection === 'derechos' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                  <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
                    Capítulo 5
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    Módulo Derechos del Aprendiz (Acuerdo 009 de 2024)
                  </h3>
                </div>
                <p>
                  El nuevo reglamento aprobado mediante el <strong>Acuerdo 009 de 2024</strong> garantiza:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li><strong>Calidad Formativa:</strong> Recibir inducción, diseño curricular actualizado y uso de ambientes dotados.</li>
                  <li><strong>Debido Proceso:</strong> Derecho fundamental a ser escuchado, presentar descargos y ejercer legítima defensa ante comités de evaluación.</li>
                  <li><strong>Libertad de Expresión y Participación:</strong> Elegir y ser elegido representante o vocero de ficha.</li>
                  <li><strong>Bienestar y Apoyos:</strong> Acceder a las convocatorias de apoyos de sostenimiento, alimentación y salud inicial.</li>
                </ul>
              </div>
            )}

            {activeSection === 'deberes' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                  <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
                    Capítulo 6
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    Módulo Deberes, Prohibiciones y Faltas
                  </h3>
                </div>
                <p>
                  Tus compromisos como aprendiz SENA incluyen:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li>Portar el carné institucional y los elementos de protección personal (EPP).</li>
                  <li>Asistir con puntualidad y honestidad académica (cero plagio de evidencias).</li>
                  <li>Cuidar la infraestructura y bienes institucionales de los centros de formación.</li>
                  <li>Prohibición terminante de armas, consumo o porte de sustancias psicoactivas o alcohol en instalaciones SENA.</li>
                </ul>
              </div>
            )}

            {activeSection === 'evaluacion' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                  <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
                    Capítulo 7
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    Evaluación Interactiva de Apropiación
                  </h3>
                </div>
                <p>
                  Es la prueba que certifica que has interiorizado los conceptos clave:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                    <strong className="text-emerald-900 dark:text-emerald-300">Calificación 'A' (Aprobado):</strong>
                    <p className="mt-1">Puntaje igual o superior al 70% (mínimo 14 respuestas correctas sobre 20). Habilita tu certificado digital.</p>
                  </div>
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <strong className="text-amber-900 dark:text-amber-300">Calificación 'D' (Por Mejorar):</strong>
                    <p className="mt-1">Puntaje inferior al 70%. Puedes revisar los módulos y reintentar la prueba inmediatamente.</p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'certificado' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                  <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
                    Capítulo 8
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    Certificado Digital de Inducción
                  </h3>
                </div>
                <p>
                  Una vez apruebes con letra <strong>'A'</strong>, podrás ingresar a la pestaña <strong>"Certificado"</strong>:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li>Contiene tu nombre, documento, ficha, programa y fecha.</li>
                  <li>Posee un <strong>Código Único Institucional</strong> (ej. <code>SENA-IND-2874102-3921</code>).</li>
                  <li>Firma digital del Instructor Líder: <strong>Marco Antonio Hernández</strong>.</li>
                  <li>Puedes imprimirlo o guardarlo como PDF para adjuntarlo a tu portafolio de evidencias formativas.</li>
                </ul>
              </div>
            )}

            {activeSection === 'sincronizacion' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                  <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
                    Capítulo 9
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    Sincronización en Google Drive y Hojas de Cálculo
                  </h3>
                </div>
                <p>
                  Tus respuestas y calificaciones no se quedan solo en tu pantalla:
                </p>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg text-xs space-y-2">
                  <p>
                    <strong>Sincronización en Vivo:</strong> A medida que completas módulos o envías la evaluación, el sistema emite los datos hacia la Hoja de Cálculo del SENA en Google Drive con marca temporal exacta.
                  </p>
                  <p>
                    <strong>Respaldo en caso de fallas de red:</strong> Tus datos se almacenan en la memoria local segura del navegador y se vuelven a enviar cuando se reanuda la conexión.
                  </p>
                </div>
              </div>
            )}

            {activeSection === 'faq' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                  <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
                    Capítulo 10
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    Preguntas Frecuentes (FAQ)
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <strong className="text-slate-900 dark:text-white">¿Cuántas veces puedo presentar la evaluación?</strong>
                    <p className="mt-1 text-slate-600 dark:text-slate-300">
                      Tantas veces como sea necesario hasta alcanzar la calificación 'A'. Cada intento te brinda retroalimentación con el artículo del reglamento.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <strong className="text-slate-900 dark:text-white">¿Por qué no veo los datos del instructor en mi perfil?</strong>
                    <p className="mt-1 text-slate-600 dark:text-slate-300">
                      Por políticas de protección de datos institucionales, la información del cuerpo de instructores solo es visible desde la consola docente protegida con clave.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <strong className="text-slate-900 dark:text-white">¿Cómo cambio al modo oscuro o claro?</strong>
                    <p className="mt-1 text-slate-600 dark:text-slate-300">
                      Presiona el botón de Sol o Luna en la parte superior derecha de la barra de navegación.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Archivo oficial disponible en la raíz del proyecto: <code>/manual.md</code> y <code>/manual</code>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#308d00] rounded-lg transition-colors"
          >
            Entendido, volver a la inducción
          </button>
        </div>
      </div>
    </div>
  );
};
