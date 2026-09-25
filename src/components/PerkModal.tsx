import React from 'react';
import { Perk } from '../types/game';
import { Sparkles, Heart } from 'lucide-react';

interface PerkModalProps {
  perks: Perk[];
  onSelectPerk: (perk: Perk) => void;
}

export const PerkModal: React.FC<PerkModalProps> = ({ perks, onSelectPerk }) => {
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center p-4 bg-[#FFE4E1]/85 backdrop-blur-md select-none animate-fadeIn">
      <div className="max-w-2xl w-full text-center flex flex-col items-center gap-3">
        <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#FF69B4] text-white text-xs font-black rounded-full border-2 border-white uppercase tracking-wider shadow-sm">
          <Sparkles size={14} /> LEVEL-UP SWEET BUFF! 🍓
        </div>

        <h2 className="text-2xl md:text-4xl font-black font-['Bungee'] text-[#D81B60] tracking-wide drop-shadow-[2px_2px_0_#FFF]">
          CHOOSE YOUR MAGICAL PERK
        </h2>
        <p className="text-xs md:text-sm text-[#880E4F] font-semibold max-w-md">
          You conquered the district! Pick an adorable power-up to strengthen your journey:
        </p>

        {/* 3 Perk Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full mt-2">
          {perks.map(perk => {
            const rarityBorders: Record<string, string> = {
              common: 'border-[#B388FF] hover:border-[#7C4DFF]',
              rare: 'border-[#FFB6C1] hover:border-[#FF4081] shadow-[0_0_15px_rgba(255,182,193,0.5)]',
              legendary: 'border-[#FF80AB] hover:border-[#FF4081] shadow-[0_0_20px_rgba(255,64,129,0.5)] animate-pulse'
            };

            const rarityBadges: Record<string, { label: string; bg: string }> = {
              common: { label: 'Pastel', bg: 'bg-[#B388FF]' },
              rare: { label: 'Magical', bg: 'bg-[#FF80AB]' },
              legendary: { label: 'SUPER SWEET!', bg: 'bg-[#FF4081]' }
            };

            const border = rarityBorders[perk.rarity] || 'border-pink-300';
            const badge = rarityBadges[perk.rarity] || { label: 'Perk', bg: 'bg-pink-400' };

            return (
              <button
                key={perk.id}
                onClick={() => onSelectPerk(perk)}
                className={`group flex flex-col items-center justify-between p-5 rounded-3xl bg-[#FFF5F7] border-4 ${border} hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-center relative overflow-hidden shadow-lg`}
              >
                <span className={`px-2.5 py-0.5 ${badge.bg} text-white text-[10px] font-black rounded-full uppercase tracking-wider mb-2 border border-white shadow-sm`}>
                  {badge.label}
                </span>

                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#FFD1DC] flex items-center justify-center text-3xl my-2 group-hover:scale-110 transition-transform shadow-inner">
                  {perk.icon}
                </div>

                <h3 className="text-sm font-black text-[#4A154B] tracking-wide mt-1">
                  {perk.name}
                </h3>

                <p className="text-xs text-[#880E4F] font-medium mt-2 leading-relaxed">
                  {perk.description}
                </p>

                <div className="mt-4 px-3 py-1.5 bg-[#FF69B4] group-hover:bg-[#FF4081] text-white text-xs font-black rounded-full border-2 border-white w-full transition-colors shadow-sm">
                  EQUIP PERK 💖
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
