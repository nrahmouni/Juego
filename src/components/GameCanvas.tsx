import React, { useRef, useEffect } from 'react';
import {
  BarrioConfig,
  Character,
  Weapon,
  ZombieBoss,
  Bullet,
  EnemyBullet,
  Particle,
  FloaterText,
  LootDrop
} from '../types/game';
import { ExtendedEnemyType } from '../data/enemies';

export interface RegularEnemy {
  id: string;
  type: ExtendedEnemyType;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hp: number;
  maxHp: number;
  speed: number;
  dead: boolean;
  hitFlash: number;
  wobble: number;
  angle: number;
}

export interface AmbientParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  wobble: number;
}

export interface GameEngineState {
  player: {
    x: number;
    y: number;
    r: number;
    facing: number;
    bobT: number;
    isDashing: boolean;
    dashGhostTrail: Array<{ x: number; y: number; facing: number; life: number }>;
  };
  character: Character;
  weapon: Weapon;
  currentBarrio: BarrioConfig;
  enemies: RegularEnemy[];
  zombie: ZombieBoss | null;
  playerBullets: Bullet[];
  enemyBullets: EnemyBullet[];
  particles: Particle[];
  floaters: FloaterText[];
  lootDrops: LootDrop[];
  ambientParticles: AmbientParticle[];
  shield?: number;
  shieldHits?: number;
  doubleShotTimer?: number;
  rapidFireTimer?: number;
  invuln: number;
  shake: number;
  gameTime: number;
}

interface GameCanvasProps {
  engineStateRef: React.MutableRefObject<GameEngineState>;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ engineStateRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId: number;

    // Ambient floating petals / bubbles
    if (!engineStateRef.current.ambientParticles || engineStateRef.current.ambientParticles.length === 0) {
      engineStateRef.current.ambientParticles = Array.from({ length: 26 }).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: 0.2 + Math.random() * 0.4,
        vy: 0.3 + Math.random() * 0.5,
        size: 3 + Math.random() * 3.5,
        color: Math.random() < 0.6 ? '#FFB6C1' : '#FFF9C4',
        alpha: 0.3 + Math.random() * 0.35,
        wobble: Math.random() * Math.PI * 2
      }));
    }

    const render = () => {
      const W = (canvas.width = window.innerWidth);
      const H = (canvas.height = window.innerHeight);

      const state = engineStateRef.current;
      if (!state) {
        animId = requestAnimationFrame(render);
        return;
      }

      const {
        player,
        character,
        weapon,
        currentBarrio,
        enemies,
        zombie,
        playerBullets,
        enemyBullets,
        particles,
        floaters,
        lootDrops,
        ambientParticles,
        shield,
        shieldHits,
        invuln,
        shake,
        gameTime
      } = state;

      ctx.save();
      ctx.globalAlpha = 1.0; // Enforce 100% full opacity baseline

      // Screen Shake
      if (shake > 0) {
        const sx = (Math.random() - 0.5) * shake * 4;
        const sy = (Math.random() - 0.5) * shake * 4;
        ctx.translate(sx, sy);
      }

      // ================= 1. DISTRICT-SPECIFIC ATMOSPHERIC SKY =================
      const bId = currentBarrio?.id || 'gracia';
      const skyGrad = ctx.createLinearGradient(0, 0, 0, H);

      if (bId === 'gracia') {
        skyGrad.addColorStop(0, '#FFA07A');
        skyGrad.addColorStop(0.4, '#FFE4E1');
        skyGrad.addColorStop(1, '#FFF5F7');
      } else if (bId === 'barceloneta') {
        skyGrad.addColorStop(0, '#81D4FA');
        skyGrad.addColorStop(0.45, '#E0F7FA');
        skyGrad.addColorStop(1, '#FFF8E1');
      } else if (bId === 'eixample') {
        skyGrad.addColorStop(0, '#E1BEE7');
        skyGrad.addColorStop(0.4, '#F3E5F5');
        skyGrad.addColorStop(1, '#FFF0F5');
      } else if (bId === 'poblenou') {
        skyGrad.addColorStop(0, '#80CBC4');
        skyGrad.addColorStop(0.4, '#E0F2F1');
        skyGrad.addColorStop(1, '#F1F8E9');
      } else if (bId === 'raval') {
        skyGrad.addColorStop(0, '#FF8A80');
        skyGrad.addColorStop(0.4, '#FFCDD2');
        skyGrad.addColorStop(1, '#FFF0F5');
      } else {
        // montjuic
        skyGrad.addColorStop(0, '#FFE082');
        skyGrad.addColorStop(0.4, '#FFF9C4');
        skyGrad.addColorStop(1, '#FFFDE7');
      }

      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, H);

      // Sun Halo / Mediterranean Light
      const sunX = W * 0.82;
      const sunY = 90;
      const sunGrad = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 140);
      sunGrad.addColorStop(0, 'rgba(255, 249, 196, 0.8)');
      sunGrad.addColorStop(0.5, 'rgba(255, 209, 220, 0.3)');
      sunGrad.addColorStop(1, 'rgba(255, 209, 220, 0)');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 140, 0, Math.PI * 2);
      ctx.fill();

      // ================= 2. BARCELONA LANDMARK SILHOUETTE =================
      ctx.save();
      ctx.fillStyle = 'rgba(136, 14, 79, 0.12)';

      if (bId === 'gracia') {
        const lx = W * 0.75;
        ctx.fillRect(lx - 20, H * 0.18, 40, H * 0.45);
        ctx.beginPath();
        ctx.moveTo(lx - 30, H * 0.18);
        ctx.lineTo(lx, H * 0.08);
        ctx.lineTo(lx + 30, H * 0.18);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.beginPath();
        ctx.arc(lx, H * 0.25, 14, 0, Math.PI * 2);
        ctx.fill();
      } else if (bId === 'barceloneta') {
        const lx = W * 0.82;
        ctx.beginPath();
        ctx.moveTo(lx - 40, H * 0.42);
        ctx.quadraticCurveTo(lx, H * 0.1, lx + 35, H * 0.42);
        ctx.closePath();
        ctx.fill();
      } else if (bId === 'eixample') {
        const lx = W * 0.78;
        [-30, -10, 10, 30].forEach(off => {
          ctx.fillRect(lx + off - 6, H * 0.12, 12, H * 0.4);
          ctx.beginPath();
          ctx.moveTo(lx + off - 9, H * 0.12);
          ctx.lineTo(lx + off, H * 0.05);
          ctx.lineTo(lx + off + 9, H * 0.12);
          ctx.closePath();
          ctx.fill();
        });
      } else if (bId === 'poblenou') {
        const lx = W * 0.8;
        ctx.beginPath();
        ctx.ellipse(lx, H * 0.35, 28, 90, 0, Math.PI, Math.PI * 2);
        ctx.fill();
      } else if (bId === 'raval') {
        const lx = W * 0.75;
        ctx.fillRect(lx - 70, H * 0.2, 140, H * 0.3);
      } else {
        const lx = W * 0.76;
        ctx.fillRect(lx - 80, H * 0.22, 160, H * 0.28);
        ctx.fillRect(lx - 30, H * 0.14, 60, H * 0.15);
      }
      ctx.restore();

      // ================= 3. DISTRICT-SPECIFIC FLOOR MAP TILES =================
      const floorY = H * 0.22;
      const floorH = H - floorY;

      ctx.save();
      if (bId === 'gracia') {
        ctx.fillStyle = '#FFE0B2';
        ctx.fillRect(0, floorY, W, floorH);
        ctx.strokeStyle = 'rgba(230, 81, 0, 0.12)';
        ctx.lineWidth = 1.5;
        const tileSize = 50;
        for (let x = 0; x < W; x += tileSize) {
          ctx.beginPath(); ctx.moveTo(x, floorY); ctx.lineTo(x, H); ctx.stroke();
        }
        for (let y = floorY; y < H; y += tileSize) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
        }
      } else if (bId === 'barceloneta') {
        ctx.fillStyle = '#FFF8E1';
        ctx.fillRect(0, floorY, W, floorH);
        ctx.fillStyle = '#80D8FF';
        ctx.beginPath();
        ctx.moveTo(0, floorY);
        for (let x = 0; x <= W; x += 30) {
          ctx.lineTo(x, floorY + Math.sin(x * 0.05 + gameTime * 2) * 6);
        }
        ctx.lineTo(W, floorY + 25);
        ctx.lineTo(0, floorY + 25);
        ctx.closePath();
        ctx.fill();
      } else if (bId === 'eixample') {
        ctx.fillStyle = '#F3E5F5';
        ctx.fillRect(0, floorY, W, floorH);
        ctx.strokeStyle = 'rgba(156, 39, 176, 0.15)';
        ctx.lineWidth = 1.5;
        const grid = 60;
        for (let x = 0; x < W + grid; x += grid) {
          for (let y = floorY; y < H + grid; y += grid) {
            ctx.strokeRect(x, y, grid - 8, grid - 8);
          }
        }
      } else if (bId === 'poblenou') {
        ctx.fillStyle = '#E0F2F1';
        ctx.fillRect(0, floorY, W, floorH);
        ctx.strokeStyle = 'rgba(0, 150, 136, 0.15)';
        ctx.lineWidth = 1.5;
        const grid = 50;
        for (let x = 0; x < W; x += grid) {
          ctx.beginPath(); ctx.moveTo(x, floorY); ctx.lineTo(x, H); ctx.stroke();
        }
        for (let y = floorY; y < H; y += grid) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
        }
      } else if (bId === 'raval') {
        ctx.fillStyle = '#FFEBEE';
        ctx.fillRect(0, floorY, W, floorH);
        ctx.strokeStyle = 'rgba(216, 27, 96, 0.12)';
        ctx.lineWidth = 1.5;
        const step = 40;
        for (let y = floorY; y < H; y += 25) {
          const rowShift = (Math.floor(y / 25) % 2) * (step / 2);
          for (let x = -step; x < W + step; x += step) {
            ctx.strokeRect(x + rowShift, y, step - 2, 22);
          }
        }
      } else {
        ctx.fillStyle = '#FFF9C4';
        ctx.fillRect(0, floorY, W, floorH);
        ctx.strokeStyle = 'rgba(245, 127, 23, 0.15)';
        ctx.lineWidth = 2;
        for (let y = floorY; y < H; y += 35) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
        }
      }
      ctx.restore();

      // Ambient floating petals/sparks
      ambientParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.wobble += 0.03;
        if (p.x > W) p.x = 0;
        if (p.y > H) p.y = floorY;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x + Math.sin(p.wobble) * 8, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ================= 4. LOOT DROPS =================
      lootDrops.forEach(drop => {
        ctx.save();
        ctx.globalAlpha = 1.0;
        ctx.translate(drop.x, drop.y);

        const bob = Math.sin(gameTime * 4 + drop.x) * 4;
        ctx.shadowColor = drop.color || '#FFD700';
        ctx.shadowBlur = 10;

        ctx.font = '22px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(drop.icon || '⭐', 0, bob);

        ctx.restore();
      });

      // ================= 5. ENEMIES (100% SOLID, HIGH-CONTRAST OPAQUE BODIES) =================
      enemies.forEach(e => {
        if (e.dead) return;
        ctx.save();
        ctx.globalAlpha = 1.0; // Strictly 100% OPAQUE - NO TRANSPARENCY
        ctx.translate(e.x, e.y);

        e.wobble += 0.05;
        const eScale = 1 + Math.sin(e.wobble) * 0.04;
        ctx.scale(eScale, eScale);

        // Dark Ground Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        ctx.ellipse(0, e.r + 3, e.r * 1.0, e.r * 0.38, 0, 0, Math.PI * 2);
        ctx.fill();

        // Hit flash or Solid Vivid Body
        if (e.hitFlash > 0) {
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(0, 0, e.r + 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#FF4081';
          ctx.lineWidth = 3;
          ctx.stroke();
        } else {
          // SOLID VIBRANT BODY BASE WITH CRISP DARK STROKE
          const bodyGrad = ctx.createRadialGradient(0, -e.r * 0.3, 3, 0, 0, e.r);
          const baseColor = e.type.color || '#D81B60';
          bodyGrad.addColorStop(0, '#FFFFFF');
          bodyGrad.addColorStop(0.35, baseColor);
          bodyGrad.addColorStop(1, '#4A154B');

          ctx.fillStyle = bodyGrad;
          ctx.beginPath();
          ctx.arc(0, 0, e.r, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#212121';
          ctx.lineWidth = 3;
          ctx.stroke();

          // High-contrast Enemy Emoji Centered inside Solid Body
          ctx.font = `${Math.round(e.r * 1.4)}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.shadowColor = '#000000';
          ctx.shadowBlur = 6;
          ctx.fillText(e.type.emoji || '👾', 0, 1);
          ctx.shadowBlur = 0;
        }

        // Enemy HP Bar
        if (e.hp < e.maxHp) {
          const barW = e.r * 2.2;
          const hpPct = Math.max(0, e.hp / e.maxHp);
          ctx.fillStyle = '#000000';
          ctx.fillRect(-barW / 2 - 1, -e.r - 14, barW + 2, 6);
          ctx.fillStyle = '#FF1744';
          ctx.fillRect(-barW / 2, -e.r - 13, barW * hpPct, 4);
        }

        ctx.restore();
      });

      // ================= 6. ZOMBIE MONSTER BOSS (SOLID & POWERFUL) =================
      if (zombie && !zombie.dead) {
        ctx.save();
        ctx.globalAlpha = 1.0; // 100% OPAQUE
        ctx.translate(zombie.x, zombie.y);

        zombie.wobble += 0.06;
        const zScale = 1 + Math.sin(zombie.wobble) * 0.05;
        ctx.scale(zScale, zScale);

        // Ground Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.beginPath();
        ctx.ellipse(0, zombie.r + 5, zombie.r * 1.1, zombie.r * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Toxic Miasma Glow
        const tGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, zombie.r + 22);
        tGrad.addColorStop(0, 'rgba(76, 175, 80, 0.6)');
        tGrad.addColorStop(0.7, 'rgba(156, 39, 176, 0.3)');
        tGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = tGrad;
        ctx.beginPath();
        ctx.arc(0, 0, zombie.r + 22, 0, Math.PI * 2);
        ctx.fill();

        if (zombie.hitFlash > 0) {
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(0, 0, zombie.r * 1.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const zGrad = ctx.createRadialGradient(0, -10, 5, 0, 0, zombie.r);
          zGrad.addColorStop(0, '#C8E6C9');
          zGrad.addColorStop(0.5, '#4CAF50');
          zGrad.addColorStop(1, '#1B5E20');
          ctx.fillStyle = zGrad;
          ctx.beginPath();
          ctx.arc(0, 0, zombie.r, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 4;
          ctx.stroke();

          ctx.font = '28px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('👑', 0, -zombie.r - 6);
          ctx.fillText(zombie.emoji || '🧟', 0, 2);
        }

        // Boss Health Bar below boss
        const hpPct = Math.max(0, zombie.hp / zombie.maxHp);
        const barW = zombie.r * 2.4;
        ctx.fillStyle = '#000000';
        ctx.fillRect(-barW / 2 - 1, zombie.r + 8, barW + 2, 7);
        ctx.fillStyle = '#D50000';
        ctx.fillRect(-barW / 2, zombie.r + 9, barW * hpPct, 5);

        // SPEECH BUBBLE WITH SPANISH PROFANITY
        if (zombie.lastSpeechText && (zombie.speechTimer || 0) > 0) {
          ctx.save();
          ctx.font = 'bold 13px Arial, sans-serif';
          const speechStr = zombie.lastSpeechText;
          const metrics = ctx.measureText(speechStr);
          const bubbleW = metrics.width + 22;
          const bubbleH = 30;
          const bubbleX = 0;
          const bubbleY = -zombie.r - 42;

          ctx.fillStyle = '#FFF176'; // Bright yellow comic bubble
          ctx.strokeStyle = '#D50000'; // Deep red border
          ctx.lineWidth = 2.5;

          const cornerR = 7;
          ctx.beginPath();
          ctx.moveTo(bubbleX - bubbleW / 2 + cornerR, bubbleY - bubbleH / 2);
          ctx.lineTo(bubbleX + bubbleW / 2 - cornerR, bubbleY - bubbleH / 2);
          ctx.quadraticCurveTo(bubbleX + bubbleW / 2, bubbleY - bubbleH / 2, bubbleX + bubbleW / 2, bubbleY - bubbleH / 2 + cornerR);
          ctx.lineTo(bubbleX + bubbleW / 2, bubbleY + bubbleH / 2 - cornerR);
          ctx.quadraticCurveTo(bubbleX + bubbleW / 2, bubbleY + bubbleH / 2, bubbleX + bubbleW / 2 - cornerR, bubbleY + bubbleH / 2);

          // Pointer tail pointing to monster
          ctx.lineTo(bubbleX + 6, bubbleY + bubbleH / 2);
          ctx.lineTo(bubbleX, bubbleY + bubbleH / 2 + 8);
          ctx.lineTo(bubbleX - 6, bubbleY + bubbleH / 2);

          ctx.lineTo(bubbleX - bubbleW / 2 + cornerR, bubbleY + bubbleH / 2);
          ctx.quadraticCurveTo(bubbleX - bubbleW / 2, bubbleY + bubbleH / 2, bubbleX - bubbleW / 2, bubbleY + bubbleH / 2 - cornerR);
          ctx.lineTo(bubbleX - bubbleW / 2, bubbleY - bubbleH / 2 + cornerR);
          ctx.quadraticCurveTo(bubbleX - bubbleW / 2, bubbleY - bubbleH / 2, bubbleX - bubbleW / 2 + cornerR, bubbleY - bubbleH / 2);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Cuss text
          ctx.fillStyle = '#B71C1C';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(speechStr, bubbleX, bubbleY);
          ctx.restore();
        }

        ctx.restore();
      }

      // ================= 7. ENEMY BULLETS (SOLID DARK ORBS) =================
      enemyBullets.forEach(eb => {
        ctx.save();
        ctx.globalAlpha = 1.0;
        ctx.translate(eb.x, eb.y);

        ctx.shadowColor = eb.color || '#AB47BC';
        ctx.shadowBlur = 10;

        ctx.font = `${eb.size * 2.2}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(eb.emoji || '🟣', 0, 0);

        ctx.restore();
      });

      // ================= 8. PLAYER BULLETS (STARLIGHT PROJECTILES) =================
      playerBullets.forEach(b => {
        ctx.save();
        ctx.globalAlpha = 1.0;
        ctx.translate(b.x, b.y);

        const bGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, b.size * 2);
        bGrad.addColorStop(0, '#FFFFFF');
        bGrad.addColorStop(0.6, '#FFD700');
        bGrad.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = bGrad;
        ctx.beginPath();
        ctx.arc(0, 0, b.size * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 10;
        ctx.font = `bold ${Math.round(b.size * 2.2)}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('⭐', 0, 0);

        ctx.restore();
      });

      // ================= 9. EXPRESSIVE CHIBI HERO PLAYER MODEL (100% OPAQUE) =================
      ctx.save();
      ctx.globalAlpha = 1.0; // Strictly 100% OPAQUE
      ctx.translate(player.x, player.y);

      // Dash Ghost Trail
      if (player.dashGhostTrail) {
        player.dashGhostTrail.forEach(ghost => {
          ctx.save();
          ctx.translate(ghost.x - player.x, ghost.y - player.y);
          ctx.globalAlpha = ghost.life * 0.4;
          ctx.fillStyle = '#FF80AB';
          ctx.beginPath();
          ctx.arc(0, 0, player.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }

      // Soft Character Shadow
      ctx.fillStyle = 'rgba(74, 21, 75, 0.35)';
      ctx.beginPath();
      ctx.ellipse(0, player.r + 4, player.r * 1.1, player.r * 0.45, 0, 0, Math.PI * 2);
      ctx.fill();

      // Shield Ring
      const hasShield = (shieldHits || 0) > 0 || (shield || 0) > 0;
      if (hasShield) {
        ctx.save();
        ctx.shadowColor = '#00E5FF';
        ctx.shadowBlur = 14;
        ctx.strokeStyle = '#00E5FF';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, player.r + 10 + Math.sin(gameTime * 8) * 2, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(0, 229, 255, 0.15)';
        ctx.beginPath();
        ctx.arc(0, 0, player.r + 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Invulnerability Aura
      if (invuln > 0) {
        ctx.shadowColor = '#FF4081';
        ctx.shadowBlur = 18;
        ctx.strokeStyle = 'rgba(255, 64, 129, 0.8)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, player.r + 8 + Math.sin(gameTime * 10) * 2.5, 0, Math.PI * 2);
        ctx.stroke();
      }

      const bob = Math.sin(player.bobT) * 2.2;
      const facingDir = player.facing > 0 ? 1 : -1;

      // Body / Cute Outfit
      const outfitGrad = ctx.createLinearGradient(0, 0, 0, 16);
      outfitGrad.addColorStop(0, character.outfitColor || '#FF69B4');
      outfitGrad.addColorStop(1, '#D81B60');
      ctx.fillStyle = outfitGrad;
      ctx.beginPath();
      ctx.ellipse(0, 6 + bob, player.r * 0.8, player.r * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = character.skinColor || '#FFDFBA';
      ctx.beginPath();
      ctx.arc(0, -6 + bob, player.r * 0.72, 0, Math.PI * 2);
      ctx.fill();

      // Hair
      ctx.fillStyle = character.hairColor || '#5C3A21';
      ctx.beginPath();
      ctx.arc(0, -10 + bob, player.r * 0.75, Math.PI * 0.78, Math.PI * 2.22);
      ctx.fill();

      // Hair Bangs
      ctx.beginPath();
      ctx.ellipse(-6, -12 + bob, 6, 4, 0, 0, Math.PI * 2);
      ctx.ellipse(0, -13 + bob, 7, 4, 0, 0, Math.PI * 2);
      ctx.ellipse(6, -12 + bob, 6, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Character-specific Accessory
      ctx.font = '15px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (character.id === 'laia') {
        ctx.fillText('🎀', 2 * facingDir, -18 + bob);
      } else if (character.id === 'jordi') {
        ctx.fillText('🧢', 0, -18 + bob);
      } else if (character.id === 'carmen') {
        ctx.fillText('🌸', 0, -18 + bob);
      } else if (character.id === 'pol') {
        ctx.fillText('👨🏼‍🍳', 0, -20 + bob);
      }

      // EXPRESSIVE ANIME EYES WITH SPARKLE HIGHLIGHTS
      const eyeOffsetX = facingDir * 2.5;
      const eyeL = -5 + eyeOffsetX;
      const eyeR = 5 + eyeOffsetX;
      const eyeY = -6 + bob;

      // Dark Eye Ovals
      ctx.fillStyle = '#4A154B';
      ctx.beginPath();
      ctx.ellipse(eyeL, eyeY, 3, 4, 0, 0, Math.PI * 2);
      ctx.ellipse(eyeR, eyeY, 3, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Bright Sparkle Reflection
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(eyeL + 1, eyeY - 1.2, 1.3, 0, Math.PI * 2);
      ctx.arc(eyeR + 1, eyeY - 1.2, 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Lower Eye Light Accent
      ctx.fillStyle = '#FF80AB';
      ctx.beginPath();
      ctx.arc(eyeL - 0.5, eyeY + 1.5, 0.9, 0, Math.PI * 2);
      ctx.arc(eyeR - 0.5, eyeY + 1.5, 0.9, 0, Math.PI * 2);
      ctx.fill();

      // Eyelashes
      ctx.strokeStyle = '#3A1E14';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(eyeL, eyeY - 3, 3, Math.PI * 1.1, Math.PI * 1.9);
      ctx.arc(eyeR, eyeY - 3, 3, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();

      // Blush Cheeks
      ctx.fillStyle = 'rgba(255, 64, 129, 0.45)';
      ctx.beginPath();
      ctx.arc(-7 + eyeOffsetX, -2.5 + bob, 2.8, 0, Math.PI * 2);
      ctx.arc(7 + eyeOffsetX, -2.5 + bob, 2.8, 0, Math.PI * 2);
      ctx.fill();

      // Smiling Mouth
      ctx.strokeStyle = '#D81B60';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(0 + eyeOffsetX, -1 + bob, 2.2, 0.1 * Math.PI, 0.9 * Math.PI);
      ctx.stroke();

      // Wand / Weapon Emoji
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(weapon.emoji || '⭐', 16 * facingDir, 3 + bob);

      ctx.restore();

      // ================= 10. PARTICLES & FLOATERS =================
      particles.forEach(p => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
        ctx.fillStyle = p.color;

        if (p.shape === 'star') {
          ctx.font = `${p.size * 2.2}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('✨', p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      floaters.forEach(f => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, f.life / 30);
        ctx.fillStyle = f.color || '#FF4081';
        ctx.font = `bold ${f.isCrit ? '17px' : '14px'} Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(255, 255, 255, 0.95)';
        ctx.shadowBlur = 8;
        ctx.fillText(f.text, f.x, f.y);
        ctx.restore();
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [engineStateRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block bg-[#FFE4E1] touch-none select-none"
    />
  );
};
