import React, { useState, useEffect } from 'react';
import { InsultQuestion } from '../data/enemies';
import { audio } from '../sound/audioManager';
import { Volume2, Zap, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

interface MonsterInsultOverlayProps {
  question: InsultQuestion;
  monsterName: string;
  monsterEmoji: string;
  onAnswer: (isCorrect: boolean) => void;
}

export const MonsterInsultOverlay: React.FC<MonsterInsultOverlayProps> = ({
  question,
  monsterName,
  monsterEmoji,
  onAnswer
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [result, setResult] = useState<'CORRECT' | 'WRONG' | null>(null);

  // Continuously speak Spanish insult out loud while question is active!
  useEffect(() => {
    if (result !== null) return;

    // Speak immediately on open
    audio.speakSpanishProfanity(question.spanish);

    // Repeat speaking every 3.2 seconds until answered
    const audioInterval = setInterval(() => {
      audio.speakSpanishProfanity(question.spanish);
    }, 3200);

    return () => clearInterval(audioInterval);
  }, [question.spanish, result]);

  const handleSelect = (option: string) => {
    if (result !== null) return;
    setSelectedOption(option);

    const isCorrect = option === question.englishCorrect;
    setResult(isCorrect ? 'CORRECT' : 'WRONG');

    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1000);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#12001A] border-4 border-[#FF1744] rounded-3xl p-4 sm:p-5 max-w-md w-full shadow-[0_0_50px_rgba(255,23,68,0.7)] flex flex-col gap-3 relative overflow-hidden">
        
        {/* Repeating Audio Indicator */}
        <div className="w-full bg-[#2A002A] border border-pink-500/40 rounded-full py-1 px-3 flex items-center justify-between text-[11px] font-bold text-pink-300">
          <span className="flex items-center gap-1.5 animate-pulse">
            <Volume2 size={14} className="text-[#FF4081]" /> ¡El monstruo te sigue insultando sin parar!
          </span>
          <span className="text-[10px] bg-[#FF1744] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
            Sin Tiempo
          </span>
        </div>

        {/* Monster Header Banner */}
        <div className="flex items-center justify-between gap-2 border-b border-red-900/50 pb-2">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl sm:text-4xl animate-bounce">{monsterEmoji || '👹'}</span>
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs font-black tracking-wider text-[#FF4081] uppercase flex items-center gap-1">
                <AlertTriangle size={13} /> ¡RETO DE TRADUCCIÓN DEL MONSTRUO!
              </span>
              <span className="text-sm sm:text-base font-black text-white font-['Bungee'] truncate">
                {monsterName}
              </span>
            </div>
          </div>

          <button
            onClick={() => audio.speakSpanishProfanity(question.spanish)}
            className="p-2 bg-[#FF1744] hover:bg-[#D50000] text-white rounded-xl shadow-md cursor-pointer active:scale-90 flex items-center gap-1.5 text-xs font-bold"
            title="Escuchar palabrota"
          >
            <Volume2 size={16} />
            <span className="hidden sm:inline">Escuchar</span>
          </button>
        </div>

        {/* Insult Challenge Box */}
        <div className="bg-[#240033] border-2 border-[#FFD700] rounded-2xl p-3 text-center flex flex-col items-center justify-center gap-1 shadow-inner">
          <span className="text-xs text-gray-300 font-semibold uppercase tracking-wider">
            Palabrota del Monstruo:
          </span>
          <span className="text-lg sm:text-2xl font-black text-[#FFD700] tracking-wide italic">
            "{question.spanish}"
          </span>
          <span className="text-xs sm:text-sm font-bold text-pink-200 mt-1">
            ¿Cómo se traduce esta palabrota al inglés?
          </span>
        </div>

        {/* 4 Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
          {question.options.map((option, idx) => {
            const isChosen = selectedOption === option;
            const isCorrectOption = option === question.englishCorrect;

            let btnStyle = 'bg-white/10 hover:bg-white/20 text-white border-white/30';
            if (result !== null) {
              if (isCorrectOption) {
                btnStyle = 'bg-[#2ECC71] text-white border-green-300 animate-pulse';
              } else if (isChosen) {
                btnStyle = 'bg-[#FF1744] text-white border-red-300';
              } else {
                btnStyle = 'bg-white/5 text-gray-500 border-transparent opacity-40';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(option)}
                disabled={result !== null}
                className={`py-3 px-3 rounded-2xl border-2 text-xs sm:text-sm font-black transition-all active:scale-95 flex items-center justify-between cursor-pointer ${btnStyle}`}
              >
                <span className="truncate">{option}</span>
                {result !== null && isCorrectOption && <CheckCircle2 size={16} className="text-white shrink-0 ml-1.5" />}
                {result !== null && isChosen && !isCorrectOption && <XCircle size={16} className="text-white shrink-0 ml-1.5" />}
              </button>
            );
          })}
        </div>

        {/* Feedback Message */}
        {result === 'CORRECT' && (
          <div className="bg-green-500/20 border border-green-400 text-green-300 text-center py-2 rounded-xl text-xs font-black animate-bounce flex items-center justify-center gap-1.5">
            <Zap size={16} /> ¡CORRECTO! ¡EL MONSTRUO RECIBE -220 HP DE DAÑO!
          </div>
        )}
        {result === 'WRONG' && (
          <div className="bg-red-500/20 border border-red-400 text-red-300 text-center py-2 rounded-xl text-xs font-black animate-shake flex items-center justify-center gap-1.5">
            <XCircle size={16} /> ¡INCORRECTO! ¡EL MONSTRUO TE DISPARA UN SUPER ATAQUE!
          </div>
        )}
      </div>
    </div>
  );
};
