import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/inductionData';
import { QuizResult } from '../types/induction';
import { CheckCircle, XCircle, RotateCcw, Award, ChevronRight, HelpCircle, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface InteractiveQuizProps {
  apprenticeName: string;
  onQuizComplete: (result: QuizResult) => void;
  previousResult: QuizResult | null;
  onGoToCertificate: () => void;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({
  apprenticeName,
  onQuizComplete,
  previousResult,
  onGoToCertificate,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [latestResult, setLatestResult] = useState<QuizResult | null>(previousResult);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (optionId: string) => {
    if (hasSubmittedAnswer) return;
    setSelectedOptionId(optionId);
  };

  const handleConfirmAnswer = () => {
    if (!selectedOptionId) return;
    setHasSubmittedAnswer(true);

    const updatedAnswers = {
      ...userAnswers,
      [currentQuestion.id]: selectedOptionId,
    };
    setUserAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionId(null);
      setHasSubmittedAnswer(false);
    } else {
      // Calculate final results
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    let correctCount = 0;
    const categoryStats: Record<string, { label: string; correct: number; total: number }> = {};

    QUIZ_QUESTIONS.forEach((q) => {
      const selected = userAnswers[q.id] || selectedOptionId;
      const isCorrect = q.options.find((o) => o.id === selected)?.isCorrect || false;
      if (isCorrect) correctCount++;

      if (!categoryStats[q.category]) {
        categoryStats[q.category] = { label: q.categoryLabel, correct: 0, total: 0 };
      }
      categoryStats[q.category].total += 1;
      if (isCorrect) categoryStats[q.category].correct += 1;
    });

    const totalQuestions = QUIZ_QUESTIONS.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= 70;

    const result: QuizResult = {
      score: correctCount,
      totalQuestions,
      percentage,
      passed,
      categoryBreakdown: Object.keys(categoryStats).map((k) => ({
        category: k,
        label: categoryStats[k].label,
        correct: categoryStats[k].correct,
        total: categoryStats[k].total,
      })),
      completedAt: new Date().toISOString().split('T')[0],
      answers: userAnswers,
    };

    setLatestResult(result);
    setQuizFinished(true);
    onQuizComplete(result);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setHasSubmittedAnswer(false);
    setUserAnswers({});
    setQuizFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header Info */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 flex items-center justify-center shrink-0 shadow-xs">
            <img
              src="/src/assets/images/sena_logo_mark.png"
              alt="Logo Oficial SENA"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Evaluación Formativa</span>
              <span aria-hidden="true">·</span>
              <span>Apropiación de Inducción</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">Mínimo aprobatorio: 70%</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Prueba Interactiva de Apropiación SENA
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              Aprendiz evaluado: <span className="font-semibold text-slate-900 dark:text-white">{apprenticeName}</span>
            </p>
          </div>
        </div>

        {latestResult && !quizFinished && (
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-right shrink-0">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Último resultado</span>
            <span className={`text-sm font-bold ${latestResult.passed ? 'text-[#39A900]' : 'text-amber-600 dark:text-amber-400'}`}>
              {latestResult.percentage}% ({latestResult.passed ? 'Aprobado' : 'Por Mejorar'})
            </span>
          </div>
        )}
      </div>

      {/* Main Assessment Container */}
      {!quizFinished ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs transition-colors">
          {/* Progress Bar & Question Counter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                Pregunta {currentQuestionIndex + 1} de {QUIZ_QUESTIONS.length}
              </span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                {currentQuestion.categoryLabel}
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#39A900] h-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question Title & Scenario Box */}
          <div className="space-y-3 pt-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {currentQuestion.title}
            </h2>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                Situación Caso Real:
              </span>
              {currentQuestion.situation}

              {currentQuestion.id === 1 && (
                <div className="mt-3 flex items-center gap-4 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <div className="w-20 h-24 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1 shrink-0 flex items-center justify-center">
                    <img
                      src="/src/assets/images/sena_escudo_oficial.jpg"
                      alt="Escudo Oficial SENA con elementos 1, 2 y 3"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white block mb-0.5">Gráfico de Referencia Oficial:</strong>
                    Observa la imagen del Escudo SENA con los tres sectores económicos señalados con los números 1, 2 y 3.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Options List */}
          <div className="space-y-3 pt-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">
              Selecciona la opción correcta conforme al marco normativo:
            </span>

            {currentQuestion.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              let optionStyles = 'border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/80 text-slate-800 dark:text-slate-200';

              if (hasSubmittedAnswer) {
                if (option.isCorrect) {
                  optionStyles = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-300 font-medium';
                } else if (isSelected && !option.isCorrect) {
                  optionStyles = 'border-red-400 bg-red-50 dark:bg-red-950/40 text-red-950 dark:text-red-300 font-medium';
                } else {
                  optionStyles = 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                optionStyles = 'border-[#39A900] bg-emerald-50/30 dark:bg-emerald-950/30 text-slate-950 dark:text-white font-medium ring-1 ring-[#39A900]';
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  disabled={hasSubmittedAnswer}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${optionStyles}`}
                >
                  <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 uppercase">
                    {option.id}
                  </span>
                  <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                    {option.text}
                  </div>
                  {hasSubmittedAnswer && option.isCorrect && (
                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {hasSubmittedAnswer && isSelected && !option.isCorrect && (
                    <XCircle className="w-5 h-5 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Pedagogical Feedback Box (shown after confirming) */}
          {hasSubmittedAnswer && (
            <div className="p-4 bg-slate-50 dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                {currentQuestion.options.find((o) => o.id === selectedOptionId)?.isCorrect ? (
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ¡Respuesta Correcta!
                  </span>
                ) : (
                  <span className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4 text-red-500 dark:text-red-400" />
                    Respuesta Incorrecta
                  </span>
                )}
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {currentQuestion.articleReference}
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Controller Actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {hasSubmittedAnswer ? 'Revisa la justificación pedagógica antes de continuar.' : 'Selecciona una respuesta para validar.'}
            </span>

            {!hasSubmittedAnswer ? (
              <button
                onClick={handleConfirmAnswer}
                disabled={!selectedOptionId}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors whitespace-nowrap shadow-sm border border-transparent dark:border-slate-700"
              >
                Comprobar Respuesta
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#308d00] rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-sm"
              >
                <span>
                  {currentQuestionIndex < QUIZ_QUESTIONS.length - 1
                    ? 'Siguiente Pregunta'
                    : 'Finalizar y Ver Resultados'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 space-y-8 transition-colors">
          <div className="text-center max-w-xl mx-auto space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 flex items-center justify-center shadow-xs">
                <img
                  src="/src/assets/images/sena_logo_mark.png"
                  alt="Logo SENA"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-sm">
                {latestResult?.passed ? (
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Award className="w-8 h-8" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <RotateCcw className="w-8 h-8" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <span>Dictamen de Apropiación</span>
              <span>·</span>
              <span className={latestResult?.passed ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}>
                Calificación {latestResult?.passed ? 'A (Aprobado)' : 'D (Por Mejorar)'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {latestResult?.passed
                ? '¡Felicitaciones! Has aprobado la Inducción SENA'
                : 'Apropiación Parcial: Te invitamos a reforzar conceptos'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {latestResult?.passed
                ? `Has demostrado un dominio sólido de la identidad, derechos, deberes y normas del SENA con un puntaje del ${latestResult.percentage}%. Tu constancia oficial ya se encuentra habilitada.`
                : `Obtuviste un ${latestResult?.percentage}% (${latestResult?.score} de ${latestResult?.totalQuestions} aciertos). El reglamento exige al menos 70% para aprobar. Puedes repasar y realizar un nuevo intento sin penalización.`}
            </p>
          </div>

          {/* Breakdown by Competencies */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Desglose de Apropiación por Área Temática
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {latestResult?.categoryBreakdown.map((cat, idx) => {
                const percent = Math.round((cat.correct / cat.total) * 100);
                return (
                  <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <span>{cat.label}</span>
                      <span className="font-mono tabular-nums">{cat.correct}/{cat.total} ({percent}%)</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${percent >= 70 ? 'bg-[#39A900]' : 'bg-amber-500'}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={restartQuiz}
              className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Presentar Nuevo Intento</span>
            </button>

            {latestResult?.passed ? (
              <button
                onClick={onGoToCertificate}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#308d00] rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Ver y Descargar Certificado Oficial</span>
              </button>
            ) : (
              <span className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                Alcanza al menos el 70% para desbloquear la constancia oficial.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
