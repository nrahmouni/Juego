import React, { useState } from 'react';
import { MistakeRecord } from '../types/game';
import { BookOpen, CheckCircle, X, ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';

interface ReviewModalProps {
  mistakes: MistakeRecord[];
  onClose: () => void;
  onClearMistakes: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  mistakes,
  onClose,
  onClearMistakes
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (mistakes.length === 0) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#FFE4E1]/85 backdrop-blur-md select-none">
        <div className="max-w-md w-full bg-[#FFF5F7] border-4 border-[#81C784] rounded-3xl p-6 text-center flex flex-col items-center gap-3 shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-[#E8F8F5] text-[#2ECC71] flex items-center justify-center text-3xl shadow-sm">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-xl font-black font-['Bungee'] text-[#2E7D32]">NO MISTAKES YET! ✨</h2>
          <p className="text-xs text-[#4A154B]/80 font-bold">
            You have no incorrect questions in this session. All your answers were sweet and perfect!
          </p>
          <button
            onClick={onClose}
            className="mt-3 px-6 py-2.5 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white font-black rounded-full border-2 border-white hover:scale-105 active:scale-95 cursor-pointer text-xs shadow-md"
          >
            RETURN TO GAME 🌸
          </button>
        </div>
      </div>
    );
  }

  const current = mistakes[currentIndex];
  const q = current.question;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#FFE4E1]/85 backdrop-blur-md select-none animate-fadeIn">
      <div className="max-w-xl w-full bg-[#FFF5F7] border-4 border-[#FF80AB] rounded-3xl p-5 md:p-6 shadow-2xl flex flex-col gap-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-white hover:bg-[#FFB6C1] text-[#D81B60] rounded-full border border-[#FF80AB] cursor-pointer shadow-sm transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2">
          <BookOpen className="text-[#FF4081]" size={24} />
          <div>
            <h2 className="text-lg md:text-xl font-black font-['Bungee'] text-[#D81B60]">
              MISTAKES REVIEW ({currentIndex + 1}/{mistakes.length}) 📖
            </h2>
            <p className="text-xs text-[#4A154B]/70 font-semibold">Review your mistakes to master Spanish faster.</p>
          </div>
        </div>

        {/* Flashcard Box */}
        <div className="bg-white border-2 border-[#FFD1DC] rounded-2xl p-4 md:p-5 flex flex-col gap-3 shadow-inner">
          {/* Level & Category */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-[#FFD1DC] text-[#D81B60] font-black text-xs rounded-full">
              Level {q.level} • {q.category.toUpperCase()}
            </span>
            <span className="text-xs text-[#FF4081] font-bold flex items-center gap-1">
              <Sparkles size={13} /> Study Card
            </span>
          </div>

          {/* Question Text in Spanish */}
          <h3 className="text-base md:text-lg font-bold text-[#4A154B]">
            {q.question}
          </h3>

          {/* English Translation */}
          {q.englishHint && (
            <p className="text-xs text-[#7B1FA2] italic bg-[#F3E5F5] p-2.5 rounded-xl border border-[#E1BEE7]">
              🇬🇧 Translation: {q.englishHint}
            </p>
          )}

          {/* Correct vs Selected */}
          <div className="flex flex-col gap-2 mt-1">
            <div className="p-2.5 bg-[#E8F8F5] border border-[#A2D9CE] rounded-xl text-xs text-[#16A085] font-bold">
              <strong>✅ Correct Answer:</strong> {q.options[q.correctIndex]}
            </div>
            {current.selectedOption && (
              <div className="p-2.5 bg-[#FDEDEC] border border-[#F5B7B1] rounded-xl text-xs text-[#C0392B] font-bold">
                <strong>❌ Your Choice:</strong> {current.selectedOption}
              </div>
            )}
          </div>

          {/* Explanation */}
          <div className="p-3 bg-[#FFF9C4]/70 rounded-xl text-xs text-[#5D4037] border border-[#FFF176] mt-1 font-medium">
            <strong className="text-[#F57F17]">💡 Grammar Rule / Explanation:</strong> {q.explanation}
          </div>
        </div>

        {/* Navigation & Actions */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(c => Math.max(0, c - 1))}
              className="p-2 bg-white disabled:opacity-30 text-[#D81B60] rounded-xl border border-[#FF80AB] hover:bg-[#FFD1DC] cursor-pointer shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              disabled={currentIndex === mistakes.length - 1}
              onClick={() => setCurrentIndex(c => Math.min(mistakes.length - 1, c + 1))}
              className="p-2 bg-white disabled:opacity-30 text-[#D81B60] rounded-xl border border-[#FF80AB] hover:bg-[#FFD1DC] cursor-pointer shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClearMistakes}
              className="px-3.5 py-2 bg-[#FFCDD2] hover:bg-[#EF9A9A] text-[#C62828] text-xs font-bold rounded-full border border-[#E57373] cursor-pointer"
            >
              Clear Mistakes
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-gradient-to-r from-[#FF80AB] to-[#FF4081] text-white font-black text-xs rounded-full border-2 border-white shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              CLOSE 💖
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
