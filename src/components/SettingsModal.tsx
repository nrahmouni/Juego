import React, { useState } from 'react';
import { GameSettings } from '../types/game';
import { Settings, Volume2, VolumeX, Music, X, Save, Check, RotateCcw, Key, Lock, Home } from 'lucide-react';

interface SettingsModalProps {
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  onSaveGame?: () => void;
  onRestartRun?: () => void;
  onUnlockAllLevels?: () => void;
  onResetProgress?: () => void;
  onGoToMenu?: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onSaveGame,
  onRestartRun,
  onUnlockAllLevels,
  onResetProgress,
  onGoToMenu,
  onClose
}) => {
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [showUnlockInput, setShowUnlockInput] = useState(false);
  const [unlockPassword, setUnlockPassword] = useState('');
  const [unlockError, setUnlockError] = useState<string | null>(null);
  const [unlockSuccess, setUnlockSuccess] = useState(false);

  const handleManualSave = () => {
    if (onSaveGame) {
      onSaveGame();
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const handleUnlockSubmit = () => {
    if (unlockPassword.toLowerCase().trim() === 'naim') {
      if (onUnlockAllLevels) {
        onUnlockAllLevels();
      }
      setUnlockSuccess(true);
      setUnlockError(null);
      setTimeout(() => setUnlockSuccess(false), 3000);
    } else {
      setUnlockError('Incorrect password! Hint: naim');
      setUnlockSuccess(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#FFE4E1]/85 backdrop-blur-md select-none animate-fadeIn overflow-y-auto">
      <div className="max-w-md w-full bg-[#FFF5F7] border-4 border-[#FFB6C1] rounded-3xl p-6 shadow-2xl flex flex-col gap-4 relative my-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-white hover:bg-[#FFB6C1] text-[#D81B60] rounded-full border border-[#FF80AB] cursor-pointer shadow-sm transition-colors"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2">
          <Settings size={22} className="text-[#FF4081]" />
          <h2 className="text-xl font-black font-['Bungee'] text-[#D81B60]">
            SETTINGS & SAVE 🌸
          </h2>
        </div>

        {/* Settings options */}
        <div className="flex flex-col gap-2.5">
          {/* Master Volume */}
          <div className="bg-white p-3.5 rounded-2xl border border-[#FFD1DC] flex flex-col gap-1.5 shadow-sm">
            <div className="flex items-center justify-between text-xs font-bold text-[#4A154B]">
              <span className="flex items-center gap-1.5">
                <Volume2 size={15} className="text-[#FF4081]" /> Master Volume
              </span>
              <span>{Math.round(settings.volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.volume}
              onChange={e => onUpdateSettings({ volume: parseFloat(e.target.value) })}
              className="w-full accent-[#FF4081] cursor-pointer"
            />
          </div>

          {/* Sound FX Toggle */}
          <div className="bg-white p-3.5 rounded-2xl border border-[#FFD1DC] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-[#4A154B]">
              {settings.soundEnabled ? (
                <Volume2 size={16} className="text-[#48C9B0]" />
              ) : (
                <VolumeX size={16} className="text-[#FF4081]" />
              )}
              <span>Chibi Sound Effects</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer border border-pink-200 ${
                settings.soundEnabled ? 'bg-[#FF69B4]' : 'bg-gray-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${
                  settings.soundEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Music Toggle */}
          <div className="bg-white p-3.5 rounded-2xl border border-[#FFD1DC] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-[#4A154B]">
              <Music size={16} className="text-[#BA68C8]" />
              <span>Kawaii Chiptune Music</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ musicEnabled: !settings.musicEnabled })}
              className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer border border-pink-200 ${
                settings.musicEnabled ? 'bg-[#BA68C8]' : 'bg-gray-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${
                  settings.musicEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* RESTART RUN & MAIN MENU BUTTONS */}
          <div className="flex gap-2">
            {onRestartRun && (
              <button
                onClick={() => {
                  onRestartRun();
                  onClose();
                }}
                className="flex-1 py-2.5 bg-white hover:bg-[#FFF0F5] border-2 border-[#FF80AB] text-[#D81B60] rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-98 transition-all"
              >
                <RotateCcw size={15} />
                <span>Reiniciar Run 🔄</span>
              </button>
            )}

            {onGoToMenu && (
              <button
                onClick={() => {
                  onGoToMenu();
                  onClose();
                }}
                className="flex-1 py-2.5 bg-white hover:bg-[#FFF0F5] border-2 border-[#FF80AB] text-[#D81B60] rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-98 transition-all"
              >
                <Home size={15} />
                <span>Menú Principal 🏠</span>
              </button>
            )}
          </div>

          {/* SAVE GAME SECTION */}
          {onSaveGame && (
            <div className="bg-[#FFF0F5] p-3.5 rounded-2xl border border-[#FF80AB] flex flex-col gap-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#D81B60] flex items-center gap-1.5">
                  <Save size={15} /> Save Game State
                </span>
                <span className="text-[10px] text-green-700 bg-green-100 px-2 py-0.5 rounded font-bold">
                  Auto-Save Active 💾
                </span>
              </div>
              <p className="text-[11px] text-gray-600">
                Your progress, unlocked districts, hearts, and high scores are saved locally in your browser.
              </p>
              <button
                onClick={handleManualSave}
                className="w-full py-2 bg-white hover:bg-[#FFE4E1] border-2 border-[#FF80AB] text-[#D81B60] rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-98 transition-all"
              >
                {savedSuccess ? (
                  <>
                    <Check size={14} className="text-green-600" />
                    <span className="text-green-600">GAME SAVED SUCCESSFULLY!</span>
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    <span>SAVE GAME NOW</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* UNLOCK ALL LEVELS WITH PASSWORD "naim" */}
          {onUnlockAllLevels && (
            <div className="bg-[#E8F8F5] p-3.5 rounded-2xl border border-[#2ECC71] flex flex-col gap-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#27AE60] flex items-center gap-1.5">
                  <Key size={15} /> Unlock All Levels (Tester Mode)
                </span>
              </div>
              {!showUnlockInput ? (
                <button
                  onClick={() => setShowUnlockInput(true)}
                  className="w-full py-2 bg-[#2ECC71] hover:bg-[#27AE60] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-98 transition-all"
                >
                  <Key size={14} />
                  <span>UNLOCK ALL LEVELS (PASSWORD)</span>
                </button>
              ) : (
                <div className="flex flex-col gap-1.5">
                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Password..."
                      value={unlockPassword}
                      onChange={e => setUnlockPassword(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') handleUnlockSubmit(); }}
                      className="flex-1 px-3 py-1.5 bg-white border border-[#2ECC71] rounded-xl text-xs font-bold text-gray-800 outline-none focus:ring-2 focus:ring-[#2ECC71]"
                    />
                    <button
                      onClick={handleUnlockSubmit}
                      className="px-4 py-1.5 bg-[#2ECC71] text-white font-black text-xs rounded-xl hover:bg-[#27AE60] cursor-pointer"
                    >
                      UNLOCK
                    </button>
                  </div>
                  {unlockError && <span className="text-[10px] font-bold text-red-600">{unlockError}</span>}
                  {unlockSuccess && <span className="text-[10px] font-bold text-green-700">🎉 ALL 6 BARRIOS UNLOCKED WITH PASSWORD 'naim'!</span>}
                </div>
              )}
            </div>
          )}

          {/* Reset Progress */}
          {onResetProgress && (
            <div className="pt-1">
              {!confirmReset ? (
                <button
                  onClick={() => setConfirmReset(true)}
                  className="w-full text-center text-[10px] font-bold text-gray-400 hover:text-red-500 cursor-pointer underline py-1"
                >
                  Reset Saved Game Data
                </button>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-xl p-2.5 flex flex-col gap-1.5 text-center">
                  <span className="text-[11px] font-bold text-red-700">Are you sure? This erases all saved progress!</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        onResetProgress();
                        setConfirmReset(false);
                      }}
                      className="flex-1 py-1 bg-red-600 text-white rounded-lg text-xs font-bold"
                    >
                      Yes, Reset
                    </button>
                    <button
                      onClick={() => setConfirmReset(false)}
                      className="flex-1 py-1 bg-gray-200 text-gray-700 rounded-lg text-xs font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-gradient-to-r from-[#FF80AB] to-[#FF4081] text-white font-black text-xs rounded-full border-2 border-white cursor-pointer shadow-md transition-transform hover:scale-[1.02]"
        >
          SAVE & CLOSE 💖
        </button>
      </div>
    </div>
  );
};
