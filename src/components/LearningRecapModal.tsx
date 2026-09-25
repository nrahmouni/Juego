import React from 'react';
import { Question } from '../types/game';
import { Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

interface LearningRecapModalProps {
  questions: Question[];
  batchIndex: number; // 1 (questions 1-10) or 2 (questions 11-20)
  totalBatches: number; // 2
  onContinue: () => void;
}

export const LearningRecapModal: React.FC<LearningRecapModalProps> = ({
  questions,
  batchIndex,
  totalBatches = 2,
  onContinue
}) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-pink-950/75 backdrop-blur-md select-none animate-fadeIn">
      <div className="w-full max-w-2xl max-h-[92vh] bg-[#FFF5F7] border-4 border-[#FF80AB] rounded-3xl p-4 md:p-6 shadow-[0_10px_40px_rgba(255,128,171,0.6)] flex flex-col gap-3 relative">
        {/* Header Badge */}
        <div className="flex items-center justify-between border-b border-[#FFD1DC] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FF80AB] to-[#FF4081] text-white flex items-center justify-center text-2xl shadow-sm">
              🧟
            </div>
            <div>
              <h2 className="text-base md:text-xl font-black font-['Bungee'] text-[#D81B60]">
                BOSS DEFEATED! 🎉
              </h2>
              <p className="text-xs text-[#880E4F] font-bold">
                Learning Summary (Batch {batchIndex}/{totalBatches} • {questions.length} questions mastered)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-[#E8F8F5] border border-[#A2D9CE] text-[#16A085] px-3 py-1 rounded-full text-xs font-black shadow-xs">
            <Sparkles size={14} /> +1,000 PTS
          </div>
        </div>

        {/* List of 10 Questions and key learnings */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 pr-1 max-h-[58vh]">
          {questions.map((q, idx) => (
            <div
              key={q.id || idx}
              className="bg-white border-2 border-[#FFD1DC] rounded-2xl p-3 flex flex-col gap-1 shadow-xs"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-black bg-[#FFD1DC] text-[#D81B60] px-2 py-0.5 rounded-full">
                  #{ (batchIndex - 1) * 10 + idx + 1 } • {q.category?.toUpperCase() || 'VOCABULARY'}
                </span>
                <span className="text-xs font-black text-[#2ECC71] flex items-center gap-1">
                  <CheckCircle size={14} /> {q.options[q.correctIndex]}
                </span>
              </div>

              {/* Question Text */}
              <h4 className="text-xs md:text-sm font-bold text-[#4A154B] leading-tight">
                {q.question}
              </h4>

              {/* English Hint / Translation */}
              {q.englishHint && (
                <p className="text-[11px] text-[#7B1FA2] italic bg-[#F3E5F5] rounded-xl px-2.5 py-1">
                  🇬🇧 {q.englishHint}
                </p>
              )}

              {/* Explanation Note */}
              {q.explanation && (
                <div className="text-[11px] text-[#2E7D32] bg-[#E8F8F5] rounded-xl px-2.5 py-1 font-medium">
                  💡 {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={onContinue}
          className="w-full py-3.5 bg-gradient-to-r from-[#FF4081] to-[#D81B60] hover:from-[#E91E63] hover:to-[#C2185B] text-white font-black font-['Bungee'] text-sm md:text-base rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 mt-1 cursor-pointer"
        >
          <span>CONTINUE THE ADVENTURE</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
