import React from 'react';
import { Character } from '../types/game';
import { CHARACTERS } from '../data/characters';
import { Heart, Zap, Sparkles, Check } from 'lucide-react';

interface CharacterSelectModalProps {
  selectedCharacter: Character;
  onSelect: (char: Character) => void;
  onClose: () => void;
}

export const CharacterSelectModal: React.FC<CharacterSelectModalProps> = ({
  selectedCharacter,
  onSelect,
  onClose
}) => {
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center p-4 bg-[#FFE4E1]/85 backdrop-blur-md select-none animate-fadeIn overflow-y-auto">
      <div className="max-w-3xl w-full bg-[#FFF5F7] border-4 border-[#FFB6C1] rounded-3xl p-5 md:p-7 shadow-2xl flex flex-col items-center gap-3">
        {/* Title */}
        <h2 className="text-2xl md:text-4xl font-black font-['Bungee'] text-[#D81B60] tracking-wide text-center drop-shadow-[2px_2px_0_#FFF]">
          CHOOSE YOUR CHIBI HERO 🌸
        </h2>
        <p className="text-xs md:text-sm text-[#880E4F] font-semibold text-center max-w-lg">
          Each hero possesses sweet magical powers and distinct abilities to adventure through Barcelona.
        </p>

        {/* Character cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-2">
          {CHARACTERS.map(c => {
            const isSelected = selectedCharacter.id === c.id;

            return (
              <div
                key={c.id}
                onClick={() => onSelect(c)}
                className={`flex flex-col p-4 rounded-3xl border-3 cursor-pointer transition-all duration-150 relative ${
                  isSelected
                    ? 'bg-[#FFE4E1] border-[#FF4081] shadow-[0_0_20px_rgba(255,64,129,0.3)] scale-[1.02]'
                    : 'bg-white border-[#FFD1DC] hover:border-[#FF80AB] hover:bg-[#FFF5F7]'
                }`}
              >
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white border-2 border-[#FFB6C1] flex items-center justify-center text-3xl shadow-sm">
                    {c.avatarEmoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-black text-[#4A154B]">{c.name}</h3>
                      {isSelected && (
                        <span className="p-1 bg-[#48C9B0] text-white rounded-full text-xs font-bold flex items-center justify-center shadow-sm">
                          <Check size={14} />
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#D81B60] font-bold">{c.title}</span>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-xs italic text-[#C2185B] mt-2 bg-white/80 px-2 py-1 rounded-xl border border-[#FFD1DC]">
                  "{c.quote}"
                </p>

                {/* Description */}
                <p className="text-xs text-[#4A154B]/80 mt-1.5 font-medium">
                  {c.desc}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between gap-2 mt-2.5 pt-2 border-t border-[#FFD1DC] text-[11px] font-bold text-[#4A154B]">
                  <div className="flex items-center gap-1">
                    <Heart size={12} className="text-[#FF4081] fill-[#FF4081]" />
                    <span>{c.baseHp} Hearts</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap size={12} className="text-[#FFA000] fill-[#FFA000]" />
                    <span>{c.baseSpeed} Speed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Sparkles size={12} className="text-[#AB47BC]" />
                    <span>Magical</span>
                  </div>
                </div>

                {/* Special Ability */}
                <div className="mt-2 text-[10px] text-[#2E7D32] bg-[#E8F8F5] px-2 py-1 rounded-xl border border-[#A8E6CF] font-bold">
                  ✨ {c.specialAbility}
                </div>
              </div>
            );
          })}
        </div>

        {/* Done Button */}
        <button
          onClick={onClose}
          className="mt-2 px-8 py-3 bg-gradient-to-r from-[#FF80AB] to-[#FF4081] hover:scale-105 active:scale-95 text-white font-black text-xs md:text-sm rounded-full border-2 border-white shadow-md cursor-pointer transition-transform"
        >
          CONFIRM HERO ✨
        </button>
      </div>
    </div>
  );
};
