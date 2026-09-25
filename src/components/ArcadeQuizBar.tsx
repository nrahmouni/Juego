import React, { useState } from 'react';
import { Question } from '../types/game';
import { HelpCircle, Star, Sparkles, Heart } from 'lucide-react';

interface ArcadeQuizBarProps {
  question: Question | null;
  currentMissionIndex: number;
  totalMissions: number;
  combo: number;
  barrioName: string;
  onAnswer: (index: number) => void;
  lastFeedback: {
    correct: boolean;
    text: string;
    explanation?: string;
  } | null;
}

export const ArcadeQuizBar: React.FC<ArcadeQuizBarProps> = ({
  question,
  currentMissionIndex,
  totalMissions = 10,
  combo,
  barrioName,
  onAnswer,
  lastFeedback
}) => {
  const [showHint, setShowHint] = useState(true);

  if (!question) return null;

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <>
      {/* TOP MISSION BANNER (10 MISSIONS PER LEVEL) */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[95%] max-w-xl z-30 pointer-events-auto select-none">
        <div className="bg-[#FFF5F7]/95 backdrop-blur-md border-3 border-[#FF80AB] rounded-3xl p-3 md:p-3.5 shadow-[0_8px_25px_rgba(255,128,171,0.4)] flex flex-col gap-1.5 transition-all">
          {/* Header row: Level & 10 Progress Stars */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-0.5 bg-[#FFD1DC] text-[#D81B60] text-[10px] md:text-xs font-black rounded-full border border-[#FF80AB]">
                {barrioName}
              </span>
              <span className="text-[11px] md:text-xs font-black text-[#880E4F]">
                🌸 MISSION {currentMissionIndex + 1}/{totalMissions}
              </span>
            </div>

            {/* 10 Progress Dots / Stars */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalMissions }).map((_, i) => {
                const isCompleted = i < currentMissionIndex;
                const isCurrent = i === currentMissionIndex;
                return (
                  <span
                    key={i}
                    className={`transition-all duration-300 text-xs ${
                      isCompleted
                        ? 'text-[#FF4081] scale-105'
                        : isCurrent
                        ? 'text-[#FFB300] scale-125 animate-bounce font-black'
                        : 'text-pink-200 opacity-60'
                    }`}
                  >
                    {isCompleted ? '⭐' : isCurrent ? '🌟' : '⚪'}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Question / Target text (in Spanish) */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-1">
              <span className="text-[9px] font-black bg-[#FFD1DC] text-[#D81B60] px-1 py-0.2 rounded">ES</span>
              <h3 className="text-xs md:text-sm font-black text-[#4A154B] leading-tight">
                {question.question}
              </h3>
            </div>

            {question.englishHint && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-2 py-0.5 bg-[#FFF0F5] hover:bg-[#FFE4E1] text-[#D81B60] rounded-full border border-[#FFB6C1] text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-xs shrink-0"
              >
                <HelpCircle size={12} /> {showHint ? 'Hide EN' : 'Translation 🇬🇧'}
              </button>
            )}
          </div>

          {/* English translation hint */}
          {showHint && question.englishHint && (
            <div className="bg-[#F3E5F5] border border-[#E1BEE7] p-1.5 rounded-xl text-[11px] text-[#7B1FA2] italic animate-fadeIn flex items-center gap-1">
              <span>🇬🇧</span>
              <span>{question.englishHint}</span>
            </div>
          )}

          {/* Real-time feedback bar */}
          {lastFeedback && (
            <div
              className={`p-1.5 rounded-xl text-[11px] font-bold flex items-center justify-between animate-fadeIn ${
                lastFeedback.correct
                  ? 'bg-[#E8F8F5] text-[#16A085] border border-[#A2D9CE]'
                  : 'bg-[#FDEDEC] text-[#C0392B] border border-[#F5B7B1]'
              }`}
            >
              <span>{lastFeedback.text}</span>
              {lastFeedback.explanation && (
                <span className="text-[10px] font-normal opacity-90 truncate ml-2">
                  💡 {lastFeedback.explanation}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM QUICK-TOUCH ACTION PILLS (MOBILE & DESKTOP) */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-[96%] max-w-2xl z-30 pointer-events-auto select-none">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-[#FFF5F7]/95 backdrop-blur-md border-3 border-[#FF80AB] p-2 md:p-2.5 rounded-3xl shadow-[0_8px_25px_rgba(255,128,171,0.4)]">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onAnswer(idx)}
              className="group relative flex items-center gap-2 p-2 md:p-2.5 bg-white hover:bg-gradient-to-r hover:from-[#FFF0F5] hover:to-[#FFE4E1] active:scale-95 border-2 border-[#FFD1DC] hover:border-[#FF80AB] rounded-2xl cursor-pointer shadow-sm transition-all duration-150 text-left"
            >
              {/* Badge letter */}
              <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#FF80AB] to-[#FF4081] text-white font-black text-[11px] flex items-center justify-center shadow-xs shrink-0 group-hover:rotate-12 transition-transform">
                {optionLetters[idx]}
              </span>

              {/* Option text */}
              <span className="text-xs font-bold text-[#4A154B] truncate leading-tight flex-1">
                {option}
              </span>
            </button>
          ))}
        </div>
        <div className="text-center text-[10px] text-[#880E4F]/70 font-semibold mt-1">
          💡 Shoot word bubbles on the battlefield or tap the buttons to answer!
        </div>
      </div>
    </>
  );
};
