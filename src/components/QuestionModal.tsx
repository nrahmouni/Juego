import React, { useState, useEffect, useMemo } from 'react';
import { Question } from '../types/game';
import { shuffleQuestionOptions } from '../data/questions';
import { HelpCircle, CheckCircle2, XCircle, Sparkles, Heart, ArrowRight, Volume2 } from 'lucide-react';
import { audio } from '../sound/audioManager';

interface QuestionModalProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  hearts: number; // 0 to 6 (step 0.5)
  maxHearts: number; // 6
  onAnswer: (isCorrect: boolean, selectedIdx: number) => void;
  onContinue: () => void;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({
  question,
  questionNumber,
  totalQuestions = 20,
  hearts,
  maxHearts = 6,
  onAnswer,
  onContinue
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Guarantee question options are shuffled randomly on display
  const activeQ = useMemo(() => shuffleQuestionOptions(question), [question.id, question.question]);

  // Reset answer selection state when activeQ changes
  useEffect(() => {
    setSelectedIdx(null);
    setHasAnswered(false);
  }, [activeQ.id, activeQ.question]);

  // Helper to extract the Spanish target phrase
  const getSpanishTarget = (optIndex?: number): string => {
    // 1. If audioPhrase exists on question, it is the canonical Spanish target
    if (activeQ.audioPhrase) {
      return activeQ.audioPhrase;
    }

    // 2. If option is selected and is in Spanish (e.g. grammar question with Spanish verbs)
    if (optIndex !== undefined && activeQ.options[optIndex]) {
      const opt = activeQ.options[optIndex];
      const isEnglish = /^[A-Za-z\s,-]+$/.test(opt) && /^(House|Car|Street|School|Yellow|Blue|Green|Red|Water|Wine|Beer|Juice|The cat|The dog|The bird|The mouse|Fried|Mashed|Boiled|Potato|Small|Large|Big|Good|Bad|Hello|Goodbye|Yes|No|Thank|Please)/i.test(opt);
      if (!isEnglish) {
        return opt;
      }
    }

    // 3. Extract quoted Spanish phrase from question text (e.g. ¿Qué significa "la casa"?)
    const match = activeQ.question.match(/"([^"]+)"/);
    if (match && match[1]) {
      return match[1];
    }

    // 4. Default to question text
    return activeQ.question;
  };

  // Auto-speak or user-triggered Spanish pronunciation
  const handlePronounce = (explicitText?: string) => {
    setIsPlayingAudio(true);
    const spanishText = explicitText || getSpanishTarget();
    audio.speakSpanish(spanishText);
    setTimeout(() => setIsPlayingAudio(false), 2000);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hasAnswered) {
        if (e.key === '1' || e.key === 'a' || e.key === 'A') handleSelect(0);
        if (e.key === '2' || e.key === 'b' || e.key === 'B') handleSelect(1);
        if (e.key === '3' || e.key === 'c' || e.key === 'C') handleSelect(2);
        if (e.key === '4' || e.key === 'd' || e.key === 'D') handleSelect(3);
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          onContinue();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasAnswered, selectedIdx]);

  const handleSelect = (idx: number) => {
    if (hasAnswered) return;
    setSelectedIdx(idx);
    setHasAnswered(true);
    const isCorrect = idx === activeQ.correctIndex;
    onAnswer(isCorrect, idx);

    // Speak Spanish target phrase (NEVER English option!)
    const spanishToSpeak = getSpanishTarget(idx);
    audio.speakSpanish(spanishToSpeak);
  };

  const isCorrect = selectedIdx !== null && selectedIdx === activeQ.correctIndex;
  const optionLetters = ['A', 'B', 'C', 'D'];

  // Helper to render 6 hearts with half-heart representation
  const renderHearts = () => {
    const heartElements = [];
    for (let i = 1; i <= maxHearts; i++) {
      if (hearts >= i) {
        heartElements.push(<span key={i} className="text-sm drop-shadow-[0_0_3px_#FF4081]">💖</span>);
      } else if (hearts >= i - 0.5) {
        heartElements.push(<span key={i} className="text-sm animate-pulse">💔</span>);
      } else {
        heartElements.push(<span key={i} className="text-sm opacity-25 grayscale scale-90">🖤</span>);
      }
    }
    return heartElements;
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-pink-950/70 backdrop-blur-md select-none animate-fadeIn">
      <div className="w-full max-w-xl bg-[#FFF5F7] border-4 border-[#FF80AB] rounded-3xl p-5 md:p-6 shadow-[0_10px_35px_rgba(255,128,171,0.5)] flex flex-col gap-3.5 relative">
        {/* Top Header: Progress and 6 Hearts in English */}
        <div className="flex items-center justify-between gap-2 border-b border-[#FFD1DC] pb-2.5">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-gradient-to-r from-[#FF80AB] to-[#FF4081] text-white text-xs font-black rounded-full shadow-xs">
              QUESTION {questionNumber} / {totalQuestions} 🌸
            </span>
            <span className="text-[11px] text-[#880E4F] font-bold uppercase tracking-wider bg-[#FFD1DC] px-2 py-0.5 rounded-md">
              {question.category}
            </span>
          </div>

          {/* 6 Hearts Display */}
          <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-pink-200 shadow-xs">
            {renderHearts()}
            <span className="text-[10px] font-black text-[#D81B60] ml-1">
              {hearts.toFixed(1)}/6
            </span>
          </div>
        </div>

        {/* Question Prompt in Spanish + English Translation + Voice Speaker */}
        <div className="flex flex-col gap-2">
          {/* Spanish Question with Voice Audio Button */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2 flex-1">
              <span className="text-sm bg-[#FFD1DC] text-[#D81B60] font-black px-1.5 py-0.5 rounded text-[10px] mt-0.5 shrink-0">
                ES
              </span>
              <h2 className="text-base md:text-xl font-black text-[#4A154B] leading-snug">
                {activeQ.question}
              </h2>
            </div>

            {/* Audio Voice Speaker */}
            <button
              onClick={() => handlePronounce(getSpanishTarget())}
              className={`p-2 rounded-2xl border-2 cursor-pointer shadow-xs transition-transform active:scale-90 shrink-0 ${
                isPlayingAudio
                  ? 'bg-[#FF4081] text-white border-white animate-pulse scale-110'
                  : 'bg-white text-[#D81B60] border-[#FF80AB] hover:bg-[#FFF0F5]'
              }`}
              title="Listen to Native Spanish Pronunciation"
            >
              <Volume2 size={18} />
            </button>
          </div>

          {/* English Translation of Question */}
          {activeQ.englishHint && (
            <div className="bg-[#F3E5F5] border border-[#E1BEE7] p-2.5 rounded-2xl text-xs text-[#7B1FA2] font-semibold flex items-center gap-2 animate-fadeIn">
              <span className="shrink-0 text-sm">🇬🇧</span>
              <div className="flex-1">
                <span className="text-[10px] font-black uppercase text-[#8E24AA] block tracking-wider">
                  English Translation:
                </span>
                <span className="italic">{activeQ.englishHint}</span>
              </div>
            </div>
          )}
        </div>

        {/* Options Grid (4 options in target format) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
          {activeQ.options.map((opt, idx) => {
            const letter = optionLetters[idx];
            const isThisOptionCorrect = idx === activeQ.correctIndex;
            const isChosen = selectedIdx === idx;

            let cardStyle =
              'bg-white border-[#FFD1DC] text-[#4A154B] hover:border-[#FF80AB] hover:bg-[#FFF0F5] hover:scale-[1.01]';

            if (hasAnswered) {
              if (isThisOptionCorrect) {
                cardStyle =
                  'bg-[#2ECC71] border-white text-white shadow-[0_0_15px_rgba(46,204,113,0.5)] scale-[1.02]';
              } else if (isChosen && !isThisOptionCorrect) {
                cardStyle =
                  'bg-[#E74C3C] border-white text-white shadow-[0_0_15px_rgba(231,76,60,0.5)] animate-shake';
              } else {
                cardStyle = 'bg-white/60 opacity-40 border-transparent text-[#4A154B]/40';
              }
            }

            return (
              <button
                key={idx}
                disabled={hasAnswered}
                onClick={() => handleSelect(idx)}
                className={`flex items-center justify-start p-3 rounded-2xl border-2 font-bold text-left transition-all duration-150 cursor-pointer shadow-sm ${cardStyle}`}
              >
                {/* Letter sticker badge */}
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs mr-2.5 shrink-0 shadow-inner ${
                    hasAnswered && isThisOptionCorrect
                      ? 'bg-white text-[#2ECC71]'
                      : hasAnswered && isChosen
                      ? 'bg-white text-[#E74C3C]'
                      : 'bg-[#FFF0F5] text-[#D81B60] border border-[#FF80AB]'
                  }`}
                >
                  {letter}
                </span>

                {/* Option text */}
                <span className="text-xs md:text-sm font-semibold flex-1 leading-tight">
                  {opt}
                </span>

                {/* Status Icon */}
                {hasAnswered && isThisOptionCorrect && (
                  <CheckCircle2 size={18} className="text-white fill-[#27AE60] shrink-0 ml-1" />
                )}
                {hasAnswered && isChosen && !isThisOptionCorrect && (
                  <XCircle size={18} className="text-white fill-[#C0392B] shrink-0 ml-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & Explanation Card in English */}
        {hasAnswered && (
          <div
            className={`p-3 rounded-2xl border-2 flex flex-col gap-1 text-xs animate-fadeIn ${
              isCorrect
                ? 'bg-[#E8F8F5] border-[#A2D9CE] text-[#16A085]'
                : 'bg-[#FDEDEC] border-[#F5B7B1] text-[#C0392B]'
            }`}
          >
            <div className="flex items-center justify-between font-black text-sm">
              <span>{isCorrect ? '✨ EXCELLENT! CORRECT ANSWER!' : '💔 INCORRECT ANSWER! (-0.5 LIFE)'}</span>
              <span className="text-xs">{isCorrect ? '+500 PTS 🌟' : ''}</span>
            </div>
            <p className="text-[11px] text-[#4A154B]/90 font-medium">
              <strong>💡 Explanation: </strong> {activeQ.explanation}
            </p>
          </div>
        )}

        {/* Continue Button in English */}
        {hasAnswered ? (
          <button
            onClick={onContinue}
            className="w-full py-3 bg-gradient-to-r from-[#FF80AB] to-[#FF4081] text-white font-black text-xs md:text-sm rounded-full border-2 border-white shadow-lg hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center justify-center gap-2 transition-transform"
          >
            <span>CONTINUE BATTLE</span>
            <ArrowRight size={16} />
          </button>
        ) : (
          <div className="text-center text-[10px] text-[#880E4F]/60 font-semibold">
            Tap an answer or press <kbd className="px-1 bg-white rounded border border-pink-300">1-4</kbd> / <kbd className="px-1 bg-white rounded border border-pink-300">A-D</kbd> • Click 🔊 to listen
          </div>
        )}
      </div>
    </div>
  );
};
