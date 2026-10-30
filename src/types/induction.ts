export type InductionTab = 'inicio' | 'identidad' | 'derechos' | 'deberes' | 'evaluacion' | 'certificado' | 'gestion';

export type UserRole = 'aprendiz' | 'instructor';

export interface Apprentice {
  id: string;
  nombre: string;
  tipoDoc: string;
  documento: string;
  correo: string;
  telefono: string;
  ficha: string;
  programa: string;
  regional: string;
  centro: string;
  jornada: 'Diurna' | 'Nocturna' | 'Mixta' | 'Virtual';
  estadoInduccion: 'Pendiente' | 'En Progreso' | 'Completado';
  progresoModulos: {
    identidad: number; // 0 - 100
    derechos: number;  // 0 - 100
    deberes: number;   // 0 - 100
    bienestar: number; // 0 - 100
  };
  puntajeEvaluacion: number | null; // e.g. 85 / 100
  calificacionLetra: 'A' | 'D' | null; // 'A' = Aprobado (>=70), 'D' = No Aprobado / Por Mejorar
  fechaEvaluacion?: string;
  certificadoCodigo?: string;
  observacionesInstructor?: string;
}

export interface FichaInfo {
  numero: string;
  programa: string;
  nivel: 'Técnico' | 'Tecnólogo' | 'Especialización Tecnológica';
  instructorLider: string;
  fechaInicio: string;
  totalAprendices: number;
}

export interface InstructorProfile {
  id: string;
  nombre: string;
  cargo: string;
  centro: string;
  regional: string;
  fichaAsignada: string;
  correo: string;
  especialidad: string;
}

export interface QuizQuestion {
  id: number;
  category: 'identidad' | 'derechos' | 'deberes' | 'bienestar';
  categoryLabel: string;
  title: string;
  situation: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  articleReference: string; // e.g. "Acuerdo 007 de 2012, Art. 7 num. 3"
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  categoryBreakdown: {
    category: string;
    label: string;
    correct: number;
    total: number;
  }[];
  completedAt: string;
  answers: Record<number, string>;
}
