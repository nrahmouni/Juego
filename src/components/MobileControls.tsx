import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

interface MobileControlsProps {
  onMove: (vec: { x: number; y: number }) => void;
  onShootStart: () => void;
  onShootEnd: () => void;
  onSingleShoot?: () => void;
  onDash?: () => void;
  onSuperBurst?: () => void;
  canSuperBurst?: boolean;
  disabled?: boolean;
}

export const MobileControls: React.FC<MobileControlsProps> = ({
  onMove,
  onShootStart,
  onShootEnd,
  onSingleShoot,
  onSuperBurst,
  canSuperBurst,
  disabled
}) => {
  const stickAreaRef = useRef<HTMLDivElement>(null);
  const shootBtnRef = useRef<HTMLButtonElement>(null);
  const [touchData, setTouchData] = useState<{
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    active: boolean;
  }>({ startX: 0, startY: 0, currentX: 0, currentY: 0, active: false });

  const [isShootingPressed, setIsShootingPressed] = useState<boolean>(false);
  const moveTouchIdRef = useRef<number | null>(null);

  // Joystick Touch Handling
  useEffect(() => {
    const area = stickAreaRef.current;
    if (!area) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (disabled) return;
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        if (moveTouchIdRef.current === null) {
          moveTouchIdRef.current = touch.identifier;
          const rect = area.getBoundingClientRect();
          const x = touch.clientX - rect.left;
          const y = touch.clientY - rect.top;

          setTouchData({
            startX: x,
            startY: y,
            currentX: x,
            currentY: y,
            active: true
          });
          e.preventDefault();
          break;
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (moveTouchIdRef.current === null) return;
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        if (touch.identifier === moveTouchIdRef.current) {
          const rect = area.getBoundingClientRect();
          const x = touch.clientX - rect.left;
          const y = touch.clientY - rect.top;

          let dx = x - touchData.startX;
          let dy = y - touchData.startY;
          const maxRadius = 45;
          const dist = Math.hypot(dx, dy);

          if (dist > maxRadius) {
            dx = (dx / dist) * maxRadius;
            dy = (dy / dist) * maxRadius;
          }

          setTouchData(prev => ({
            ...prev,
            currentX: prev.startX + dx,
            currentY: prev.startY + dy
          }));

          onMove({
            x: dx / maxRadius,
            y: dy / maxRadius
          });
          e.preventDefault();
          break;
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (moveTouchIdRef.current === null) return;
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === moveTouchIdRef.current) {
          moveTouchIdRef.current = null;
          setTouchData({ startX: 0, startY: 0, currentX: 0, currentY: 0, active: false });
          onMove({ x: 0, y: 0 });
          break;
        }
      }
    };

    area.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      area.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [disabled, onMove, touchData.startX, touchData.startY]);

  // Shoot Button Touch & Pointer Event Listeners (Strictly Manual)
  const handleShootDown = useCallback(
    (e: React.TouchEvent | React.MouseEvent | React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsShootingPressed(true);
      onShootStart();

      try {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate(15);
        }
      } catch {
        // ignore
      }
    },
    [onShootStart]
  );

  const handleShootUp = useCallback(
    (e: React.TouchEvent | React.MouseEvent | React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsShootingPressed(false);
      onShootEnd();
    },
    [onShootEnd]
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-30 select-none touch-none">
      {/* 1. LEFT JOYSTICK ZONE */}
      <div
        ref={stickAreaRef}
        className="absolute bottom-0 left-0 w-1/2 h-64 pointer-events-auto touch-none select-none"
      >
        {touchData.active ? (
          <div
            className="absolute w-24 h-24 rounded-full bg-pink-500/25 border-2 border-[#FF4081] pointer-events-none -translate-x-1/2 -translate-y-1/2 backdrop-blur-xs shadow-lg"
            style={{ left: touchData.startX, top: touchData.startY }}
          >
            <div
              className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF80AB] to-[#FF4081] border-2 border-white -translate-x-1/2 -translate-y-1/2 shadow-md flex items-center justify-center text-white text-lg font-bold"
              style={{ left: touchData.currentX, top: touchData.currentY }}
            >
              🌸
            </div>
          </div>
        ) : (
          <div className="absolute bottom-6 left-6 w-20 h-20 rounded-full border-2 border-dashed border-[#FF80AB]/60 bg-white/40 backdrop-blur-xs flex flex-col items-center justify-center pointer-events-none shadow-sm">
            <span className="text-xl">🕹️</span>
            <span className="text-[9px] text-[#D81B60] font-black uppercase tracking-wider">MOVE</span>
          </div>
        )}
      </div>

      {/* 2. RIGHT CONTROLS: TACTILE MANUAL SHOOT BUTTONS */}
      <div className="absolute bottom-5 right-5 pointer-events-auto flex items-end gap-3 select-none">
        {/* Super Combo Burst (Unlocked with combo) */}
        {canSuperBurst && onSuperBurst && (
          <button
            onTouchStart={e => {
              e.preventDefault();
              onSuperBurst();
            }}
            onMouseDown={e => {
              e.preventDefault();
              onSuperBurst();
            }}
            className="w-14 h-14 rounded-full border-3 border-yellow-300 bg-gradient-to-tr from-[#FF1744] via-[#FF4081] to-[#FFD700] text-white shadow-[0_0_15px_#FFD700] animate-bounce flex flex-col items-center justify-center cursor-pointer active:scale-90 select-none"
            aria-label="Super Combo Burst"
            title="Clear Surrounding Bullets"
          >
            <Sparkles size={18} className="text-white fill-white" />
            <span className="text-[8px] font-black font-['Bungee'] uppercase">BURST</span>
          </button>
        )}

        {/* PRIMARY MANUAL SHOOT BUTTON (EXCLUSIVELY MANUAL - NO AUTOFIRE) */}
        <button
          ref={shootBtnRef}
          onTouchStart={handleShootDown}
          onTouchEnd={handleShootUp}
          onTouchCancel={handleShootUp}
          onMouseDown={handleShootDown}
          onMouseUp={handleShootUp}
          onMouseLeave={handleShootUp}
          className={`w-22 h-22 rounded-full border-4 border-white shadow-[0_6px_25px_rgba(255,179,0,0.6)] flex flex-col items-center justify-center cursor-pointer transition-transform duration-75 select-none touch-none ${
            isShootingPressed
              ? 'scale-90 bg-gradient-to-tr from-[#FF8F00] to-[#FF6F00] text-white shadow-[0_2px_10px_rgba(255,111,0,0.8)]'
              : 'bg-gradient-to-tr from-[#FFE082] via-[#FFCA28] to-[#FFA000] text-[#5D4037] hover:scale-105 active:scale-90'
          }`}
          aria-label="Shoot Magic Stars Manually"
        >
          <span className="text-3xl leading-none filter drop-shadow">⭐</span>
          <span className="text-[11px] font-black font-['Bungee'] uppercase tracking-wider mt-0.5 text-black">
            SHOOT
          </span>
        </button>
      </div>
    </div>
  );
};
