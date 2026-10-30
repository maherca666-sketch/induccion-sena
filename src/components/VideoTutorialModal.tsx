import React, { useEffect } from 'react';
import { X, Play, ExternalLink, Video, Sparkles, MonitorPlay } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface VideoTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoTutorialModal: React.FC<VideoTutorialModalProps> = ({ isOpen, onClose }) => {
  const originalUrl =
    'https://docs.google.com/videos/d/1SHoxDGOkt1QK8DQwefZGVb-ZNHkH38dmF07C7sTspSo/play?usp=sharing';
  // Google Drive preview embed URL with full HTML5 playback controls (play/pause, timeline, volume, fullscreen)
  const embedUrl =
    'https://drive.google.com/file/d/1SHoxDGOkt1QK8DQwefZGVb-ZNHkH38dmF07C7sTspSo/preview';

  // Keyboard shortcut Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden max-h-[95vh] animate-scaleIn">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#39A900]/10 dark:bg-[#39A900]/20 flex items-center justify-center text-[#39A900] dark:text-[#4ade80]">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-[#39A900]/10 text-[#2b7f00] dark:text-[#4ade80] uppercase tracking-wide">
                  <Sparkles className="w-3 h-3" />
                  Tutorial Oficial
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
                  Inducción SENA
                </span>
              </div>
              <h2
                id="video-modal-title"
                className="text-base sm:text-lg font-bold text-slate-900 dark:text-white"
              >
                Video Tutorial: Inducción Institucional
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-[#39A900] dark:hover:text-[#4ade80] bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
              title="Abrir en pestaña nueva"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Abrir en Google Drive</span>
            </a>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              aria-label="Cerrar video tutorial"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Container (16:9 Aspect Ratio) */}
        <div className="relative w-full bg-black aspect-video flex items-center justify-center overflow-hidden">
          <iframe
            src={embedUrl}
            title="Video Tutorial de Inducción SENA"
            className="w-full h-full border-0"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer"
            allowFullScreen
          />
        </div>

        {/* Modal Footer with Controls Info & Actions */}
        <div className="px-5 sm:px-6 py-3.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <MonitorPlay className="w-4 h-4 text-[#39A900] flex-shrink-0" />
            <span>
              El reproductor incluye controles completos: reproducir/pausar, barra de tiempo, volumen, velocidad y pantalla completa.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
