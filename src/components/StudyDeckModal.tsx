import React, { useState } from 'react';
import { ALL_QUESTIONS } from '../data/questions';
import { SpanishLevel } from '../types/game';
import { BookOpen, X, Sparkles, Filter, CheckCircle2, Heart } from 'lucide-react';

interface StudyDeckModalProps {
  onClose: () => void;
}

export const StudyDeckModal: React.FC<StudyDeckModalProps> = ({ onClose }) => {
  const [selectedLevel, setSelectedLevel] = useState<SpanishLevel | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const filteredQuestions = ALL_QUESTIONS.filter(q => {
    if (selectedLevel !== 'ALL' && q.level !== selectedLevel) return false;
    if (searchQuery.trim() !== '') {
      const match =
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.englishHint && q.englishHint.toLowerCase().includes(searchQuery.toLowerCase()));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-[#FFE4E1]/90 backdrop-blur-lg select-none animate-fadeIn">
      <div className="max-w-4xl w-full h-[90vh] bg-[#FFF5F7] border-4 border-[#FF80AB] rounded-3xl p-4 md:p-6 flex flex-col gap-4 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white hover:bg-[#FFB6C1] text-[#D81B60] rounded-full border border-[#FF80AB] cursor-pointer shadow-sm transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex flex-col gap-1 pr-10">
          <div className="flex items-center gap-2">
            <BookOpen size={24} className="text-[#FF4081]" />
            <h2 className="text-xl md:text-3xl font-black font-['Bungee'] text-[#D81B60]">
              DICTIONARY & STUDY DECK 🌸
            </h2>
          </div>
          <p className="text-xs text-[#4A154B]/70 font-semibold">
            Browse all 120 Spanish questions, grammatical explanations, and authentic expressions of Barcelona.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-[#FFD1DC] text-xs shadow-sm">
          <div className="flex items-center gap-1.5 text-[#FF4081] font-bold mr-2">
            <Filter size={14} /> Levels:
          </div>

          {/* Levels */}
          <div className="flex items-center gap-1">
            {(['ALL', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1 rounded-full font-bold border transition-all cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-gradient-to-r from-[#FF80AB] to-[#FF4081] text-white border-white shadow-sm'
                    : 'bg-[#FFF0F5] text-[#4A154B] border-[#FFD1DC] hover:border-[#FF80AB]'
                }`}
              >
                {lvl === 'ALL' ? 'All 🌟' : lvl}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search word or phrase..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="ml-auto bg-[#FFF5F7] border border-[#FF80AB]/40 rounded-full px-4 py-1.5 text-xs text-[#4A154B] placeholder-[#4A154B]/40 focus:outline-none focus:border-[#FF4081]"
          />
        </div>

        {/* Questions Cards List */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3 pr-1">
          {filteredQuestions.map(q => {
            const isRevealed = activeCardId === q.id;

            return (
              <div
                key={q.id}
                className="bg-white border-2 border-[#FFD1DC] hover:border-[#FF80AB] p-4 rounded-2xl flex flex-col justify-between gap-2.5 transition-all shadow-sm"
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-[#FFD1DC] text-[#D81B60] font-black text-[11px] rounded-full">
                      Level {q.level}
                    </span>
                    <span className="text-[11px] text-[#AB47BC] uppercase font-bold tracking-wider">
                      {q.category}
                    </span>
                  </div>
                  <Sparkles size={16} className="text-[#FFB300]" />
                </div>

                {/* Question Text in Spanish */}
                <h4 className="text-sm font-bold text-[#4A154B] leading-snug">
                  {q.question}
                </h4>

                {/* English Translation */}
                {q.englishHint && (
                  <p className="text-xs text-[#7B1FA2] italic bg-[#F3E5F5] p-2 rounded-xl border border-[#E1BEE7]">
                    🇬🇧 Translation: {q.englishHint}
                  </p>
                )}

                {/* Answer reveal button */}
                {isRevealed ? (
                  <div className="p-3 bg-[#E8F8F5] border border-[#A2D9CE] rounded-xl text-xs space-y-1.5">
                    <div className="text-[#16A085] font-black flex items-center gap-1.5">
                      <CheckCircle2 size={15} /> Correct: {q.options[q.correctIndex]}
                    </div>
                    <div className="text-[#2C3E50] text-[11px] pt-1.5 border-t border-[#A2D9CE]/60">
                      💡 {q.explanation}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveCardId(q.id)}
                    className="w-full py-2 bg-[#FFF0F5] hover:bg-[#FFE4E1] text-xs font-bold text-[#D81B60] rounded-xl border border-[#FFB6C1] cursor-pointer text-center transition-colors"
                  >
                    Reveal Solution & Rule ✨
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs text-[#4A154B]/70 pt-2 border-t border-[#FFD1DC]">
          <span className="font-bold">Showing {filteredQuestions.length} of {ALL_QUESTIONS.length} questions</span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-[#FF80AB] to-[#FF4081] text-white font-black text-xs rounded-full border-2 border-white hover:scale-105 active:scale-95 cursor-pointer shadow-md"
          >
            CLOSE 💖
          </button>
        </div>
      </div>
    </div>
  );
};
