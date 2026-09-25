import React, { useRef, useState, useEffect } from 'react';

interface VirtualJoystickProps {
  onMove: (vec: { x: number; y: number }) => void;
  disabled?: boolean;
}

export const VirtualJoystick: React.FC<VirtualJoystickProps> = ({ onMove, disabled }) => {
  const zoneRef = useRef<HTMLDivElement>(null);
  const [touchData, setTouchData] = useState<{
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    active: boolean;
  }>({ startX: 0, startY: 0, currentX: 0, currentY: 0, active: false });

  const touchIdRef = useRef<number | null>(null);

  useEffect(() => {
    const zone = zoneRef.current;
    if (!zone) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (disabled || touchIdRef.current !== null) return;
      const touch = e.changedTouches[0];
      touchIdRef.current = touch.identifier;
      const rect = zone.getBoundingClientRect();
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
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchIdRef.current === null) return;
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        if (touch.identifier === touchIdRef.current) {
          const rect = zone.getBoundingClientRect();
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
          break;
        }
      }
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchIdRef.current === null) return;
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === touchIdRef.current) {
          touchIdRef.current = null;
          setTouchData({ startX: 0, startY: 0, currentX: 0, currentY: 0, active: false });
          onMove({ x: 0, y: 0 });
          break;
        }
      }
    };

    zone.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      zone.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [disabled, onMove, touchData.startX, touchData.startY]);

  return (
    <div
      ref={zoneRef}
      className="absolute bottom-0 left-0 w-1/2 h-1/2 pointer-events-auto z-20 touch-none select-none md:hidden"
    >
      {touchData.active && (
        <div
          className="absolute w-28 h-28 rounded-full bg-pink-300/30 border-2 border-pink-400 pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-lg backdrop-blur-xs"
          style={{ left: touchData.startX, top: touchData.startY }}
        >
          {/* Knob */}
          <div
            className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF80AB] to-[#FF4081] border-2 border-white -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_rgba(255,64,129,0.6)] flex items-center justify-center text-white text-xs"
            style={{ left: touchData.currentX, top: touchData.currentY }}
          >
            🌸
          </div>
        </div>
      )}
    </div>
  );
};
