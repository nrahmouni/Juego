import React, { useState } from 'react';
import { BarrioConfig, Character, Weapon, ZombieBoss } from '../types/game';
import { Volume2, VolumeX, BookOpen, Settings, Shield, Save, Check, RotateCcw, Home } from 'lucide-react';

interface HUDProps {
  hearts: number; // 0 to 6 (step 0.5)
  maxHearts: number; // 6
  shield: number;
  doubleShotTimeLeft: number;
  rapidFireTimeLeft: number;
  score: number;
  combo: number;
  currentBarrio: BarrioConfig;
  currentQuestionIndex: number; // 0 to 19
  totalQuestions: number; // 20
  activeCharacter: Character;
  activeWeapon: Weapon;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSettings: () => void;
  onOpenReview: () => void;
  onSaveGame?: () => void;
  onRestartRun?: () => void;
  onGoToMenu?: () => void;
  mistakesCount: number;
  isFightingZombie: boolean;
  zombieBoss?: ZombieBoss | null;
}

export const HUD: React.FC<HUDProps> = ({
  hearts,
  maxHearts = 6,
  shield,
  doubleShotTimeLeft,
  rapidFireTimeLeft,
  score,
  combo,
  currentBarrio,
  currentQuestionIndex,
  totalQuestions = 20,
  activeCharacter,
  soundEnabled,
  onToggleSound,
  onOpenSettings,
  onOpenReview,
  onSaveGame,
  onRestartRun,
  onGoToMenu,
  mistakesCount,
  isFightingZombie,
  zombieBoss
}) => {
  const [justSaved, setJustSaved] = useState(false);
  const [confirmRestart, setConfirmRestart] = useState(false);

  const handleSave = () => {
    if (onSaveGame) {
      onSaveGame();
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    }
  };

  const handleRestart = () => {
    if (!confirmRestart) {
      setConfirmRestart(true);
      setTimeout(() => setConfirmRestart(false), 3000);
    } else {
      if (onRestartRun) {
        onRestartRun();
      }
      setConfirmRestart(false);
    }
  };

  // Render 6 hearts with half-heart support
  const renderHearts = () => {
    const heartElements = [];
    for (let i = 1; i <= maxHearts; i++) {
      if (hearts >= i) {
        heartElements.push(
          <span key={i} className="text-xs sm:text-sm md:text-base leading-none" title="Full Life">
            💖
          </span>
        );
      } else if (hearts >= i - 0.5) {
        heartElements.push(
          <span key={i} className="text-xs sm:text-sm md:text-base leading-none animate-pulse" title="Half Life">
            💔
          </span>
        );
      } else {
        heartElements.push(
          <span key={i} className="text-xs sm:text-sm md:text-base leading-none opacity-30 grayscale" title="No Life">
            🖤
          </span>
        );
      }
    }
    return heartElements;
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-1.5 sm:p-2.5 md:p-3 select-none">
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-1.5 w-full">
        {/* Left: Avatar + 6 Hearts + Level Progress */}
        <div className="flex flex-col gap-1 pointer-events-auto">
          <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md border-2 border-[#FF80AB] px-2 py-1 rounded-2xl shadow-md">
            <span className="text-lg sm:text-2xl" title={activeCharacter.name}>
              {activeCharacter.avatarEmoji || '🌸'}
            </span>
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5">
                {renderHearts()}
                <span className="text-[9px] font-black text-[#D81B60] ml-1 bg-[#FFF0F5] px-1 py-0.2 rounded border border-pink-200">
                  {hearts.toFixed(1)}/6
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-black text-[#880E4F] truncate max-w-[140px] sm:max-w-none">
                {currentBarrio.name} • Q.{Math.min(20, currentQuestionIndex + 1)}/20
              </span>
            </div>
          </div>

          {/* Active Power-up Badges */}
          <div className="flex items-center gap-1 flex-wrap">
            {shield > 0 && (
              <span className="bg-[#E0F7FA] border border-[#00BCD4] text-[#00838F] px-1.5 py-0.5 rounded-full text-[9px] font-black flex items-center gap-0.5 shadow-xs">
                <Shield size={10} /> Shield ({shield})
              </span>
            )}
            {doubleShotTimeLeft > 0 && (
              <span className="bg-[#FFF9C4] border border-[#FFD54F] text-[#F57F17] px-1.5 py-0.5 rounded-full text-[9px] font-black flex items-center gap-0.5 shadow-xs animate-pulse">
                🌟 Double Shot ({Math.ceil(doubleShotTimeLeft)}s)
              </span>
            )}
            {rapidFireTimeLeft > 0 && (
              <span className="bg-[#F3E5F5] border border-[#BA68C8] text-[#7B1FA2] px-1.5 py-0.5 rounded-full text-[9px] font-black flex items-center gap-0.5 shadow-xs animate-pulse">
                ⚡ Rapid Fire ({Math.ceil(rapidFireTimeLeft)}s)
              </span>
            )}
          </div>
        </div>

        {/* Center: Boss Health Bar & Duel Alert */}
        {isFightingZombie && zombieBoss && (
          <div className="flex flex-col items-center bg-[#FFF0F5]/95 backdrop-blur-md border-3 border-[#FF1744] px-3 py-1.5 rounded-2xl shadow-xl animate-fadeIn pointer-events-auto max-w-xs sm:max-w-sm w-full mx-2">
            <div className="flex items-center justify-between w-full text-[10px] sm:text-xs font-black text-[#D81B60]">
              <span className="flex items-center gap-1 truncate">
                {zombieBoss.emoji} {zombieBoss.name}
              </span>
              <span className="text-[#C2185B] font-mono whitespace-nowrap ml-2">
                HP: {Math.max(0, Math.ceil(zombieBoss.hp))} / {zombieBoss.maxHp}
              </span>
            </div>
            {/* Health Bar Slider */}
            <div className="w-full h-2.5 bg-gray-200 rounded-full border border-[#FF80AB] overflow-hidden mt-1 relative">
              <div
                className="h-full bg-gradient-to-r from-[#FF1744] via-[#FF4081] to-[#D81B60] transition-all duration-100 rounded-full shadow-inner"
                style={{ width: `${Math.max(0, Math.min(100, (zombieBoss.hp / zombieBoss.maxHp) * 100))}%` }}
              />
            </div>
          </div>
        )}

        {/* Right: Score & Quick Action Buttons */}
        <div className="flex items-center gap-1 pointer-events-auto">
          {/* Score Display */}
          <div className="flex flex-col items-end bg-white/95 backdrop-blur-md border-2 border-[#FF80AB] px-2 py-1 rounded-2xl shadow-md">
            <span className="text-[11px] sm:text-xs md:text-sm font-black text-[#D81B60] whitespace-nowrap">
              {score.toLocaleString()} PTS
            </span>
            {combo > 1 && (
              <span className="text-[8px] sm:text-[9px] font-black text-[#F57F17]">
                ⭐ {combo} COMBO
              </span>
            )}
          </div>

          {/* Restart Run Button */}
          {onRestartRun && (
            <button
              onClick={handleRestart}
              className={`p-1.5 rounded-xl border cursor-pointer shadow-xs active:scale-90 transition-all flex items-center gap-1 text-[10px] font-black ${
                confirmRestart
                  ? 'bg-red-500 border-white text-white animate-pulse'
                  : 'bg-white border-[#FF80AB] text-[#D81B60] hover:bg-[#FFF0F5]'
              }`}
              title={confirmRestart ? 'Click again to confirm restart!' : 'Restart Run'}
            >
              <RotateCcw size={14} />
              <span className="hidden sm:inline">{confirmRestart ? 'Confirm?' : 'Restart'}</span>
            </button>
          )}

          {/* Quick Save Game Button */}
          <button
            onClick={handleSave}
            className={`p-1.5 rounded-xl border cursor-pointer shadow-xs active:scale-90 transition-all flex items-center gap-1 text-[10px] font-black ${
              justSaved
                ? 'bg-[#E8F8F5] border-[#2ECC71] text-[#27AE60]'
                : 'bg-white border-[#FF80AB] text-[#D81B60] hover:bg-[#FFF0F5]'
            }`}
            title="Save Game Progress"
          >
            {justSaved ? <Check size={14} className="text-[#2ECC71]" /> : <Save size={14} />}
            <span className="hidden sm:inline">{justSaved ? 'Saved!' : 'Save'}</span>
          </button>

          {/* Mistakes Review Button */}
          {mistakesCount > 0 && (
            <button
              onClick={onOpenReview}
              className="p-1.5 bg-[#FFF0F5] text-[#D81B60] rounded-xl border border-[#FF80AB] cursor-pointer shadow-xs active:scale-90"
              title="Review Mistakes"
            >
              <BookOpen size={14} />
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-1.5 bg-white text-[#D81B60] rounded-xl border border-[#FF80AB] cursor-pointer shadow-xs active:scale-90"
            title="Sound"
          >
            {soundEnabled ? <Volume2 size={14} className="text-[#2ECC71]" /> : <VolumeX size={14} className="text-[#FF80AB]" />}
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="p-1.5 bg-white text-[#D81B60] rounded-xl border border-[#FF80AB] cursor-pointer shadow-xs active:scale-90"
            title="Settings"
          >
            <Settings size={14} />
          </button>

          {/* Go to Main Menu */}
          {onGoToMenu && (
            <button
              onClick={onGoToMenu}
              className="p-1.5 bg-white text-[#D81B60] rounded-xl border border-[#FF80AB] cursor-pointer shadow-xs active:scale-90 flex items-center gap-1 text-[10px] font-black hover:bg-[#FFF0F5]"
              title="Menú Principal"
            >
              <Home size={14} />
              <span className="hidden md:inline">Menú</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
