import React from 'react';
import { BarrioConfig } from '../types/game';
import { MapPin, Info, Sparkles, Heart, Trophy, ArrowLeft } from 'lucide-react';

interface BarrioBriefingProps {
  barrio: BarrioConfig;
  barrioIndex: number;
  totalBarrios: number;
  onStart: () => void;
  onBack?: () => void;
}

export const BarrioBriefing: React.FC<BarrioBriefingProps> = ({
  barrio,
  barrioIndex,
  totalBarrios,
  onStart,
  onBack
}) => {
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center p-3 sm:p-6 bg-[#FFE4E1]/85 backdrop-blur-md select-none text-center animate-fadeIn overflow-y-auto">
      {/* Container */}
      <div className="max-w-md w-full bg-[#FFF5F7] border-4 border-[#FF80AB] rounded-3xl p-4 sm:p-6 shadow-[0_0_35px_rgba(255,182,193,0.8)] flex flex-col items-center gap-2.5 relative">
        {/* Top Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-white border border-[#FF80AB] text-[#D81B60] font-bold text-xs rounded-xl shadow-xs hover:bg-[#FFF0F5] active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={14} /> Volver
          </button>
        )}
        {/* District sequence badge */}
        <div className="px-3.5 py-0.5 bg-[#FF4081] text-white text-[11px] font-black rounded-full border-2 border-white tracking-wider uppercase shadow-xs flex items-center gap-1">
          <Sparkles size={12} /> District {barrioIndex + 1} of {totalBarrios} 🌸
        </div>

        {/* District Name */}
        <h1 className="text-2xl sm:text-4xl font-black font-['Bungee'] text-[#D81B60] tracking-wider drop-shadow-xs">
          {barrio.name}
        </h1>

        {/* Landmark & Subtitle */}
        <div className="flex items-center gap-1 text-xs text-[#880E4F] font-bold">
          <MapPin size={14} className="text-[#FF4081]" />
          <span>{barrio.subtitle}</span>
        </div>

        {/* CEFR Level Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#E0B0FF] to-[#D1C4E9] rounded-full border-2 border-white text-xs font-black text-[#4A154B] shadow-xs">
          <Trophy size={13} className="text-[#FF4081]" />
          <span>{barrio.levelTitle}</span>
        </div>

        {/* Learning Focus */}
        <div className="text-[11px] text-[#880E4F] font-bold bg-[#FFE4E1] px-3 py-1 rounded-xl border border-[#FF80AB]/40">
          📚 Learning Focus: {barrio.levelDesc}
        </div>

        {/* Description */}
        <p className="text-xs text-[#4A154B] leading-relaxed max-w-sm bg-white/90 p-2.5 rounded-2xl border border-[#FFD1DC] shadow-xs">
          {barrio.description}
        </p>

        {/* Boss Monsters Info Box */}
        <div className="w-full bg-white/90 border border-[#FF80AB] rounded-2xl p-2.5 flex flex-col gap-1 text-left text-xs shadow-xs">
          <span className="text-[10px] font-black uppercase text-[#D81B60] tracking-wider">
            🧟 Bosses to Defeat:
          </span>
          <div className="flex items-center justify-between text-xs font-bold text-gray-800">
            <span>{barrio.boss1.emoji} {barrio.boss1.name} (Q.10)</span>
            <span className="text-[10px] bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded font-black">HP: {barrio.boss1.hp}</span>
          </div>
          <div className="flex items-center justify-between text-xs font-bold text-gray-800">
            <span>{barrio.boss2.emoji} {barrio.boss2.name} (Q.20)</span>
            <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-black">HP: {barrio.boss2.hp}</span>
          </div>
        </div>

        {/* Fun fact */}
        <div className="flex items-start gap-1.5 text-[11px] text-[#D81B60] bg-[#FFF0F5] border border-[#FF80AB] p-2.5 rounded-2xl text-left max-w-sm shadow-xs">
          <Info size={14} className="flex-shrink-0 mt-0.5 text-[#FF4081]" />
          <span>
            <strong>Did you know?</strong> {barrio.funFact}
          </span>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="w-full mt-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#FF80AB] via-[#FF4081] to-[#D81B60] active:scale-95 text-white font-black font-['Bungee'] text-sm rounded-2xl border-2 border-white shadow-[0_4px_15px_rgba(255,64,129,0.4)] cursor-pointer transition-transform"
        >
          <Sparkles size={16} />
          <span>START DISTRICT! ✨</span>
        </button>
      </div>
    </div>
  );
};
