import React, { useState } from 'react';
import { BARRIOS } from '../data/barrios';
import { BarrioProgress } from '../types/game';
import { Trophy, Star, ShieldCheck, Lock, Play, ArrowLeft, Sparkles, Key, Check, X } from 'lucide-react';

interface WorldMapModalProps {
  barrioProgress: Record<string, BarrioProgress>;
  currentSelectedBarrio: number;
  onSelectBarrio: (index: number) => void;
  onUnlockAllLevels?: () => void;
  onClose: () => void;
}

export const WorldMapModal: React.FC<WorldMapModalProps> = ({
  barrioProgress,
  onSelectBarrio,
  onUnlockAllLevels,
  onClose
}) => {
  const totalSaved = BARRIOS.filter(b => barrioProgress[b.id]?.saved).length;
  const totalStars = Object.values(barrioProgress).reduce((acc, curr) => acc + (curr.stars || 0), 0);

  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleUnlockSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (password.toLowerCase().trim() === 'naim') {
      if (onUnlockAllLevels) {
        onUnlockAllLevels();
      }
      setSuccessMsg('🎉 ¡Todos los niveles han sido desbloqueados con éxito!');
      setErrorMsg(null);
      setTimeout(() => {
        setSuccessMsg(null);
        setShowUnlockModal(false);
        setPassword('');
      }, 1500);
    } else {
      setErrorMsg('❌ Contraseña incorrecta. (La contraseña es: naim)');
      setSuccessMsg(null);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-gradient-to-b from-[#FFF0F5] via-[#FFE4E1] to-[#F8BBD0] overflow-y-auto select-none p-3 sm:p-6 animate-fadeIn">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-2 max-w-4xl mx-auto w-full pb-3 border-b border-[#FF80AB]/40 flex-wrap">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-[#FF80AB] text-[#D81B60] font-bold text-xs rounded-xl shadow-xs hover:bg-[#FFF0F5] active:scale-95 cursor-pointer"
        >
          <ArrowLeft size={16} /> Menú Principal
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Saved Barrios Counter */}
          <div className="flex items-center gap-1 bg-white border-2 border-[#FF80AB] px-2.5 py-1 rounded-xl shadow-xs text-xs font-black text-[#D81B60]">
            <Trophy size={14} className="text-[#FFB300]" />
            <span>{totalSaved}/6 Distritos Liberados</span>
          </div>

          {/* Stars Total */}
          <div className="flex items-center gap-1 bg-[#FFF9C4] border-2 border-[#FBC02D] px-2.5 py-1 rounded-xl shadow-xs text-xs font-black text-[#F57F17]">
            <Star size={14} fill="#FBC02D" />
            <span>{totalStars} ⭐</span>
          </div>

          {/* Unlock All Levels Button */}
          {onUnlockAllLevels && (
            <button
              onClick={() => {
                setShowUnlockModal(true);
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2ECC71] hover:bg-[#27AE60] text-white font-black text-xs rounded-xl shadow-md active:scale-95 cursor-pointer border-2 border-white transition-all"
              title="Unlock all levels with password naim"
            >
              <Key size={14} />
              <span>Desbloquear Niveles (naim)</span>
            </button>
          )}
        </div>
      </div>

      {/* Hero Banner */}
      <div className="max-w-4xl mx-auto w-full text-center mt-3 mb-4">
        <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest bg-gradient-to-r from-[#FF80AB] to-[#FF4081] text-white px-3.5 py-1 rounded-full shadow-xs">
          🗺️ MAPA DE DISTRITOS DE BARCELONA • CEFR A1 A C2
        </span>
        <h1 className="text-2xl sm:text-4xl font-black font-['Bungee'] text-[#D81B60] mt-1.5">
          DISTRITOS DE BARCELONA
        </h1>
        <p className="text-xs sm:text-sm text-[#880E4F] font-bold max-w-lg mx-auto">
          Libera cada distrito respondiendo a las 20 preguntas y derrotando a los 2 Monstruos Jefes.
        </p>
      </div>

      {/* Grid of Barrios */}
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-3.5 pb-8">
        {BARRIOS.map((barrio, idx) => {
          const prog = barrioProgress[barrio.id] || {
            unlocked: idx === 0,
            saved: false,
            highScore: 0,
            stars: 0,
            bestAccuracy: 0,
            monstersDefeated: 0
          };

          const isUnlocked = prog.unlocked || idx === 0;
          const isSaved = prog.saved;

          return (
            <div
              key={barrio.id}
              className={`relative rounded-3xl border-4 p-4 flex flex-col justify-between transition-all backdrop-blur-xs shadow-md ${
                isSaved
                  ? 'bg-white border-[#2ECC71] shadow-[0_4px_15px_rgba(46,204,113,0.3)]'
                  : isUnlocked
                  ? 'bg-white border-[#FF80AB] shadow-[0_4px_15px_rgba(255,128,171,0.3)] hover:scale-[1.01]'
                  : 'bg-white/60 border-gray-300 opacity-60 grayscale-[40%]'
              }`}
            >
              {/* Header Badges */}
              <div className="flex items-start justify-between gap-2 border-b border-gray-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm border-2 border-white"
                    style={{ background: `linear-gradient(135deg, ${barrio.skyGradient[0]}, ${barrio.skyGradient[1]})` }}
                  >
                    {barrio.themeEmoji}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#FFD1DC] text-[#D81B60]">
                      {barrio.levelTitle}
                    </span>
                    <h3 className="text-base sm:text-lg font-black font-['Bungee'] text-[#4A154B] leading-tight mt-0.5">
                      {idx + 1}. {barrio.name}
                    </h3>
                  </div>
                </div>

                {/* Status Flag */}
                {isSaved ? (
                  <span className="flex items-center gap-1 bg-[#E8F8F5] border border-[#2ECC71] text-[#27AE60] text-[10px] font-black px-2 py-1 rounded-full shadow-xs">
                    <ShieldCheck size={13} /> LIBERADO!
                  </span>
                ) : isUnlocked ? (
                  <span className="flex items-center gap-1 bg-[#FFF0F5] border border-[#FF80AB] text-[#D81B60] text-[10px] font-black px-2 py-1 rounded-full shadow-xs animate-pulse">
                    <Sparkles size={13} /> DESBLOQUEADO
                  </span>
                ) : (
                  <span className="flex items-center gap-1 bg-gray-100 border border-gray-300 text-gray-500 text-[10px] font-black px-2 py-1 rounded-full shadow-xs">
                    <Lock size={13} /> BLOQUEADO
                  </span>
                )}
              </div>

              {/* District Content & Monsters */}
              <div className="flex flex-col gap-2 my-2.5">
                <p className="text-xs text-gray-700 font-medium leading-relaxed">
                  {barrio.description}
                </p>

                {/* CEFR Learning Topics Focus */}
                <div className="bg-[#FFF5F7] border border-[#FFD1DC] rounded-xl p-2 text-[11px] text-[#880E4F] font-bold">
                  📚 <span className="underline">Temas de Aprendizaje</span>: {barrio.levelDesc}
                </div>

                {/* Monsters Preview */}
                <div className="bg-gray-50 rounded-xl p-2 border border-gray-200 flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 flex items-center gap-1">
                    🧟 Jefes del Distrito:
                  </span>
                  <div className="flex items-center justify-between text-xs font-bold text-gray-800">
                    <span className="flex items-center gap-1">
                      {barrio.boss1.emoji} {barrio.boss1.name} (P.10)
                    </span>
                    <span className="text-[10px] text-[#D81B60]">HP: {barrio.boss1.hp}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-gray-800">
                    <span className="flex items-center gap-1">
                      {barrio.boss2.emoji} {barrio.boss2.name} (P.20)
                    </span>
                    <span className="text-[10px] text-[#D81B60]">HP: {barrio.boss2.hp}</span>
                  </div>
                </div>

                {/* Highscore & Stars (if played) */}
                {isSaved && (
                  <div className="flex items-center justify-between bg-[#E8F8F5] px-3 py-1.5 rounded-xl text-xs font-black text-[#27AE60]">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 3 }).map((_, sIdx) => (
                        <Star
                          key={sIdx}
                          size={14}
                          fill={sIdx < (prog.stars || 1) ? '#FBC02D' : '#E0E0E0'}
                          stroke={sIdx < (prog.stars || 1) ? '#F57F17' : '#BDBDBD'}
                        />
                      ))}
                    </div>
                    <span>Récord: {prog.highScore?.toLocaleString() || 0} PTS</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              {isUnlocked ? (
                <button
                  onClick={() => onSelectBarrio(idx)}
                  className={`w-full py-2.5 rounded-2xl font-black font-['Bungee'] text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer ${
                    isSaved
                      ? 'bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white hover:brightness-105'
                      : 'bg-gradient-to-r from-[#FF4081] to-[#D81B60] text-white hover:from-[#E91E63] hover:to-[#C2185B]'
                  }`}
                >
                  <Play size={16} fill="white" />
                  <span>{isSaved ? 'JUGAR DE NUEVO' : '¡JUGAR ESTE DISTRITO!'}</span>
                </button>
              ) : (
                <div className="w-full py-2.5 bg-gray-200 text-gray-500 rounded-2xl font-black font-['Bungee'] text-xs flex items-center justify-center gap-2 cursor-not-allowed">
                  <Lock size={14} />
                  <span>LIBERA EL DISTRITO ANTERIOR PRIMERO</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Password Unlock Modal Popup */}
      {showUnlockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-[#FFF5F7] border-4 border-[#2ECC71] rounded-3xl p-6 max-w-sm w-full flex flex-col gap-3 shadow-2xl relative">
            <button
              onClick={() => setShowUnlockModal(false)}
              className="absolute top-3 right-3 p-1.5 bg-white hover:bg-gray-100 text-gray-700 rounded-full border border-gray-300 cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2">
              <Key size={22} className="text-[#2ECC71]" />
              <h3 className="text-lg font-black font-['Bungee'] text-[#27AE60]">
                DESBLOQUEAR NIVELES
              </h3>
            </div>

            <p className="text-xs text-gray-700 font-bold">
              Introduce la contraseña de testeo para desbloquear instantáneamente los 6 distritos de Barcelona:
            </p>

            <form onSubmit={handleUnlockSubmit} className="flex flex-col gap-2">
              <input
                type="password"
                placeholder="Introduce la contraseña..."
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoFocus
                className="w-full px-3.5 py-2.5 bg-white border-2 border-[#2ECC71] rounded-xl text-sm font-bold text-gray-800 outline-none focus:ring-2 focus:ring-[#2ECC71]"
              />

              {errorMsg && (
                <div className="text-xs font-black text-red-600 bg-red-50 p-2 rounded-xl border border-red-200">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="text-xs font-black text-green-700 bg-green-50 p-2 rounded-xl border border-green-200 flex items-center gap-1.5">
                  <Check size={16} className="text-green-600" /> {successMsg}
                </div>
              )}

              <div className="flex gap-2 mt-1">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#2ECC71] hover:bg-[#27AE60] text-white font-black text-xs rounded-xl shadow-md cursor-pointer active:scale-95 transition-all"
                >
                  DESBLOQUEAR AHORA
                </button>
                <button
                  type="button"
                  onClick={() => setShowUnlockModal(false)}
                  className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
