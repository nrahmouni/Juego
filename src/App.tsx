import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { BARRIOS } from './data/barrios';
import { CHARACTERS } from './data/characters';
import { WEAPONS } from './data/weapons';
import { getEnemiesForBarrio, SPANISH_MONSTER_CURSES, SPANISH_INSULT_QUESTIONS, InsultQuestion, getShuffledInsultQuestion } from './data/enemies';
import { ALL_QUESTIONS, shuffleQuestionOptions } from './data/questions';
import { audio } from './sound/audioManager';
import {
  Character,
  Weapon,
  Question,
  Perk,
  GameStats,
  GameSettings,
  MistakeRecord,
  BarrioProgress
} from './types/game';

import { GameCanvas, GameEngineState } from './components/GameCanvas';
import { HUD } from './components/HUD';
import { QuestionModal } from './components/QuestionModal';
import { LearningRecapModal } from './components/LearningRecapModal';
import { MobileControls } from './components/MobileControls';
import { BarrioBriefing } from './components/BarrioBriefing';
import { PerkModal } from './components/PerkModal';
import { CharacterSelectModal } from './components/CharacterSelectModal';
import { ReviewModal } from './components/ReviewModal';
import { StudyDeckModal } from './components/StudyDeckModal';
import { SettingsModal } from './components/SettingsModal';
import { WorldMapModal } from './components/WorldMapModal';
import { MonsterInsultOverlay } from './components/MonsterInsultOverlay';

import { Play, BookOpen, RotateCcw, Sparkles, Map, Trophy, Star, Save, Check } from 'lucide-react';

type GameState =
  | 'MENU'
  | 'WORLD_MAP'
  | 'CHAR_SELECT'
  | 'BRIEFING'
  | 'PLAYING'
  | 'QUESTION_PAUSE'
  | 'INSULT_QUESTION_PAUSE'
  | 'LEARNING_RECAP'
  | 'PERK_SELECT'
  | 'REVIEW'
  | 'STUDY_DECK'
  | 'SETTINGS'
  | 'GAME_OVER'
  | 'VICTORY';

const STORAGE_KEY_PROGRESS = 'barcelona_rogue_barrio_progress_v2';
const STORAGE_KEY_SAVE_GAME = 'barcelona_rogue_active_save_v2';

interface SavedGameData {
  barrioIndex: number;
  characterId: string;
  stats: GameStats;
  barrioProgress: Record<string, BarrioProgress>;
  questionIndex: number;
  timestamp: number;
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(CHARACTERS[0]);
  const [currentBarrioIndex, setCurrentBarrioIndex] = useState<number>(0);
  const [selectedWeapon] = useState<Weapon>(WEAPONS[0]);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Persistent Barrio Progress (A1 to C2)
  const [barrioProgress, setBarrioProgress] = useState<Record<string, BarrioProgress>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    const initial: Record<string, BarrioProgress> = {};
    BARRIOS.forEach((b, idx) => {
      initial[b.id] = {
        unlocked: idx === 0,
        saved: false,
        highScore: 0,
        stars: 0,
        bestAccuracy: 0,
        monstersDefeated: 0
      };
    });
    return initial;
  });

  // Saved Active Game Slot (Resume Game)
  const [savedGame, setSavedGame] = useState<SavedGameData | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SAVE_GAME);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return null;
  });

  // Save Progress to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(barrioProgress));
    } catch {
      // ignore
    }
  }, [barrioProgress]);

  // 20 Questions strictly for current Barrio CEFR Level (A1 -> C2)
  const [levelQuestions, setLevelQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [mistakes, setMistakes] = useState<MistakeRecord[]>([]);

  // 6 Total Hearts (Damage = 0.5 per hit/mistake)
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    combo: 0,
    maxCombo: 0,
    hearts: 6,
    maxHearts: 6,
    speedMultiplier: 1,
    damageMultiplier: 1,
    fireRateMultiplier: 1.0,
    questionsAnswered: 0,
    questionsCorrect: 0,
    zombiesDefeated: 0,
    streakCount: 0,
    coinsCollected: 0,
    currentQuestionIndex: 0,
    totalQuestionsPerLevel: 20,
    shield: 0,
    doubleShot: false,
    doubleShotTimeLeft: 0,
    rapidFireTimeLeft: 0
  });

  const [settings, setSettings] = useState<GameSettings>({
    soundEnabled: true,
    musicEnabled: true,
    hintsEnabled: true,
    autoFire: false,
    volume: 0.7
  });

  const [availablePerks, setAvailablePerks] = useState<Perk[]>([]);

  // Mutable Game Engine State
  const engineStateRef = useRef<GameEngineState>({
    player: {
      x: typeof window !== 'undefined' ? window.innerWidth / 2 : 400,
      y: typeof window !== 'undefined' ? window.innerHeight / 2 : 300,
      r: 20,
      facing: 1,
      bobT: 0,
      isDashing: false,
      dashGhostTrail: []
    },
    character: CHARACTERS[0],
    weapon: WEAPONS[0],
    currentBarrio: BARRIOS[0],
    enemies: [],
    zombie: null,
    playerBullets: [],
    enemyBullets: [],
    particles: [],
    floaters: [],
    lootDrops: [],
    ambientParticles: [],
    invuln: 0,
    shake: 0,
    gameTime: 0,
    shieldHits: 0,
    doubleShotTimer: 0,
    rapidFireTimer: 0
  });

  // Controls Input State
  const inputRef = useRef<{
    keys: Record<string, boolean>;
    joystick: { x: number; y: number };
  }>({
    keys: {},
    joystick: { x: 0, y: 0 }
  });

  const [activeInsultQuestion, setActiveInsultQuestion] = useState<InsultQuestion | null>(null);

  const isShootingManualRef = useRef<boolean>(false);
  const lastShootTimeRef = useRef<number>(0);
  const lastDashTimeRef = useRef<number>(0);
  const lastEnemySpawnTimeRef = useRef<number>(0);
  const lastPowerOrbSpawnTimeRef = useRef<number>(0);
  const playTimeSinceLastQuestionRef = useRef<number>(0);
  const isZombieActiveRef = useRef<boolean>(false);
  const nextInsultTimerRef = useRef<number>(2.5);

  const currentBarrio = BARRIOS[currentBarrioIndex] || BARRIOS[0];

  // Save Game Method
  const handleSaveGame = useCallback(() => {
    try {
      const saveData: SavedGameData = {
        barrioIndex: currentBarrioIndex,
        characterId: selectedCharacter.id,
        stats: { ...stats },
        barrioProgress: { ...barrioProgress },
        questionIndex: currentQuestionIndex,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEY_SAVE_GAME, JSON.stringify(saveData));
      setSavedGame(saveData);

      setSaveToast('Game Saved Successfully! 💾');
      setTimeout(() => setSaveToast(null), 2500);
    } catch {
      // ignore
    }
  }, [currentBarrioIndex, selectedCharacter.id, stats, barrioProgress, currentQuestionIndex]);

  // Load Saved Game
  const handleResumeSavedGame = () => {
    if (!savedGame) return;
    setCurrentBarrioIndex(savedGame.barrioIndex);
    const char = CHARACTERS.find(c => c.id === savedGame.characterId) || CHARACTERS[0];
    setSelectedCharacter(char);
    setStats(savedGame.stats);
    setBarrioProgress(savedGame.barrioProgress);
    setCurrentQuestionIndex(savedGame.questionIndex || 0);

    startBarrio(savedGame.barrioIndex, savedGame.stats.hearts);
  };

  // Restart Current Run
  const handleRestartRun = useCallback(() => {
    setStats(prev => ({
      ...prev,
      hearts: 6,
      maxHearts: 6,
      score: 0,
      combo: 0,
      questionsCorrect: 0,
      questionsAnswered: 0,
      zombiesDefeated: 0,
      shield: 0,
      doubleShot: false
    }));
    startBarrio(currentBarrioIndex);
  }, [currentBarrioIndex]);

  // Unlock All Levels with password "naim"
  const handleUnlockAllLevels = useCallback(() => {
    setBarrioProgress(() => {
      const allUnlocked: Record<string, BarrioProgress> = {};
      BARRIOS.forEach(b => {
        allUnlocked[b.id] = {
          unlocked: true,
          saved: true,
          highScore: 5000,
          stars: 3,
          bestAccuracy: 100,
          monstersDefeated: 10
        };
      });
      return allUnlocked;
    });

    setSaveToast('🎉 ALL 6 BARRIOS UNLOCKED WITH PASSWORD "naim"!');
    setTimeout(() => setSaveToast(null), 3000);
  }, []);

  // Reset Progress
  const handleResetProgress = () => {
    localStorage.removeItem(STORAGE_KEY_PROGRESS);
    localStorage.removeItem(STORAGE_KEY_SAVE_GAME);
    setSavedGame(null);
    const initial: Record<string, BarrioProgress> = {};
    BARRIOS.forEach((b, idx) => {
      initial[b.id] = {
        unlocked: idx === 0,
        saved: false,
        highScore: 0,
        stars: 0,
        bestAccuracy: 0,
        monstersDefeated: 0
      };
    });
    setBarrioProgress(initial);
    setCurrentBarrioIndex(0);
    setStats({
      score: 0,
      combo: 0,
      maxCombo: 0,
      hearts: 6,
      maxHearts: 6,
      speedMultiplier: 1,
      damageMultiplier: 1,
      fireRateMultiplier: 1.0,
      questionsAnswered: 0,
      questionsCorrect: 0,
      zombiesDefeated: 0,
      streakCount: 0,
      coinsCollected: 0,
      currentQuestionIndex: 0,
      totalQuestionsPerLevel: 20,
      shield: 0,
      doubleShot: false,
      doubleShotTimeLeft: 0,
      rapidFireTimeLeft: 0
    });
  };

  // Sync settings with audio manager
  useEffect(() => {
    audio.setMasterVolume(settings.volume);
    audio.setMuted(!settings.soundEnabled);
    audio.setMusicMuted(!settings.musicEnabled);
  }, [settings]);

  // Sync engine refs
  useEffect(() => {
    engineStateRef.current.character = selectedCharacter;
    engineStateRef.current.weapon = selectedWeapon;
    engineStateRef.current.currentBarrio = currentBarrio;
  }, [selectedCharacter, selectedWeapon, currentBarrio]);

  // Setup 20 Questions strictly for current Barrio Level (A1, A2, B1, B2, C1, C2)
  const setupBarrioQuestions = useCallback((barrioIdx: number) => {
    const targetBarrio = BARRIOS[barrioIdx] || BARRIOS[0];
    const targetLevel = targetBarrio.levelCefr;

    // Filter questions strictly matching this barrio's CEFR level
    const levelPool = ALL_QUESTIONS.filter(q => q.level === targetLevel);
    const poolToUse = levelPool.length >= 20 ? levelPool : ALL_QUESTIONS;

    // Shuffle options and questions within level
    const shuffled = [...poolToUse].sort(() => Math.random() - 0.5);
    const twenty = shuffled.slice(0, 20).map(shuffleQuestionOptions);

    setLevelQuestions(twenty);
    setCurrentQuestionIndex(0);
    playTimeSinceLastQuestionRef.current = 0;
    isZombieActiveRef.current = false;
  }, []);

  // Start Playing Barrio
  const startBarrio = (barrioIdx: number, existingHearts?: number) => {
    setCurrentBarrioIndex(barrioIdx);
    setupBarrioQuestions(barrioIdx);

    if (existingHearts !== undefined) {
      setStats(prev => ({ ...prev, hearts: existingHearts }));
    }

    const W = typeof window !== 'undefined' ? window.innerWidth : 800;
    const H = typeof window !== 'undefined' ? window.innerHeight : 600;

    engineStateRef.current = {
      player: {
        x: W / 2,
        y: H / 2,
        r: 20,
        facing: 1,
        bobT: 0,
        isDashing: false,
        dashGhostTrail: []
      },
      character: selectedCharacter,
      weapon: selectedWeapon,
      currentBarrio: BARRIOS[barrioIdx],
      enemies: [],
      zombie: null,
      playerBullets: [],
      enemyBullets: [],
      particles: [],
      floaters: [],
      lootDrops: [],
      ambientParticles: [],
      invuln: 40,
      shake: 0,
      gameTime: 0,
      shieldHits: 0,
      doubleShotTimer: 0,
      rapidFireTimer: 0
    };

    lastEnemySpawnTimeRef.current = Date.now();
    lastPowerOrbSpawnTimeRef.current = Date.now();
    playTimeSinceLastQuestionRef.current = 0;
    isZombieActiveRef.current = false;

    audio.playBarrioMusic(barrioIdx);
    setGameState('PLAYING');
  };

  // Perform Evade Dash (Dodge Roll)
  const performDash = useCallback(() => {
    const now = Date.now();
    if (now - lastDashTimeRef.current < 750) return; // Dash cooldown
    lastDashTimeRef.current = now;

    const state = engineStateRef.current;
    if (!state || !state.player) return;

    audio.playDash();
    state.invuln = 18; // Invulnerability frames
    state.player.isDashing = true;
    setTimeout(() => {
      if (engineStateRef.current.player) {
        engineStateRef.current.player.isDashing = false;
      }
    }, 180);

    const dashSpeed = 120;
    state.player.x += state.player.facing * dashSpeed;

    for (let p = 0; p < 4; p++) {
      state.particles.push({
        x: state.player.x,
        y: state.player.y,
        vx: -state.player.facing * (Math.random() * 3 + 1),
        vy: (Math.random() - 0.5) * 3,
        color: '#E040FB',
        size: 3.5,
        life: 16,
        maxLife: 16,
        shape: 'star'
      });
    }
  }, []);

  // Perform Super Combo Burst (Clear bullets and blast monster)
  const performSuperBurst = useCallback(() => {
    const state = engineStateRef.current;
    if (!state) return;

    audio.playOverdriveTrigger();
    audio.playExplosion();
    state.shake = 10;

    // Clear all enemy projectiles
    state.enemyBullets = [];

    // Damage all enemies and boss
    state.enemies.forEach(e => {
      e.hp -= 25;
      e.hitFlash = 8;
    });

    if (state.zombie && !state.zombie.dead) {
      state.zombie.hp -= 20;
      state.zombie.hitFlash = 8;
    }

    // Confetti burst
    confetti({ particleCount: 60, spread: 50 });

    state.floaters.push({
      id: `burst_${Date.now()}`,
      x: state.player.x,
      y: state.player.y - 45,
      text: '💥 BARCELONA SUPER BURST!',
      color: '#FFD700',
      life: 40,
      maxLife: 40,
      vy: -1.5,
      isCrit: true
    });

    // Reset combo after usage
    setStats(prev => ({ ...prev, combo: 0 }));
  }, []);

  // Keyboard Event Handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      inputRef.current.keys[e.key.toLowerCase()] = true;

      // Space to shoot manually
      if (e.key === ' ' || e.code === 'Space') {
        isShootingManualRef.current = true;
        if (!e.repeat) {
          performShoot();
        }
      }

      // Shift to Dash
      if (e.key === 'Shift' || e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        performDash();
      }

      // 'B' or 'E' for Super Burst
      if ((e.key === 'b' || e.key === 'e') && stats.combo >= 5) {
        performSuperBurst();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      inputRef.current.keys[e.key.toLowerCase()] = false;

      if (e.key === ' ' || e.code === 'Space') {
        isShootingManualRef.current = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, performDash, performSuperBurst, stats.combo]);

  // Guaranteed Responsive Shoot Function (Deliberate Cadence with Pause)
  const performShoot = useCallback(() => {
    const now = Date.now();
    const isRapid = (engineStateRef.current.rapidFireTimer || 0) > 0;

    // Firing cadence (~520ms pause between shots, ~320ms during rapid fire)
    const baseCooldownMs = 520;
    const effectiveCooldown = isRapid ? 320 : baseCooldownMs;

    if (now - lastShootTimeRef.current < effectiveCooldown) {
      return;
    }
    lastShootTimeRef.current = now;

    const state = engineStateRef.current;
    if (!state || !state.player) return;

    // Find nearest target (Zombie Boss or regular enemy)
    let targetX = state.player.x + state.player.facing * 300;
    let targetY = state.player.y;

    if (isZombieActiveRef.current && state.zombie && !state.zombie.dead) {
      targetX = state.zombie.x;
      targetY = state.zombie.y;
    } else if (state.enemies.length > 0) {
      let closestDist = Infinity;
      state.enemies.forEach(e => {
        if (!e.dead) {
          const d = Math.hypot(e.x - state.player.x, e.y - state.player.y);
          if (d < closestDist) {
            closestDist = d;
            targetX = e.x;
            targetY = e.y;
          }
        }
      });
    }

    const shootAngle = Math.atan2(targetY - state.player.y, targetX - state.player.x);
    audio.playShoot(selectedWeapon.id);

    if (Math.abs(targetX - state.player.x) > 5) {
      state.player.facing = targetX > state.player.x ? 1 : -1;
    }

    // WEAPON LEVEL UPGRADE BASED ON CORRECT ANSWERS (EVERY 5 QUESTIONS)
    const correctCount = stats.questionsCorrect;
    const weaponLvl = Math.min(5, Math.floor(correctCount / 5) + 1);

    const isDouble = (state.doubleShotTimer || 0) > 0 || stats.doubleShot || weaponLvl >= 3;
    const isTriple = weaponLvl >= 4;
    const numBullets = isTriple ? 3 : (isDouble ? 2 : 1);
    // HIGH DAMAGE PLAYSTYLE: Bullets destroy regular enemies in 1-2 hits!
    const baseDamage = weaponLvl === 1 ? 45 : (weaponLvl === 2 ? 70 : (weaponLvl === 3 ? 100 : (weaponLvl === 4 ? 135 : 180)));

    // Calibrated bullet speed (390 pixels per second - readable starlight)
    const bulletSpeedPx = 390;

    for (let i = 0; i < numBullets; i++) {
      let spreadAngle = shootAngle;
      if (numBullets === 2) {
        spreadAngle += (i === 0 ? -0.12 : 0.12);
      } else if (numBullets === 3) {
        spreadAngle += (i === 0 ? -0.22 : (i === 1 ? 0 : 0.22));
      }

      state.playerBullets.push({
        id: `bullet_${now}_${i}_${Math.random()}`,
        x: state.player.x + state.player.facing * 16,
        y: state.player.y,
        vx: Math.cos(spreadAngle) * bulletSpeedPx,
        vy: Math.sin(spreadAngle) * bulletSpeedPx,
        color: weaponLvl >= 5 ? '#FF4081' : (weaponLvl >= 3 ? '#00E5FF' : selectedWeapon.bulletColor),
        size: weaponLvl >= 4 ? 8.5 : 6.5,
        damage: baseDamage * stats.damageMultiplier,
        life: 80,
        maxLife: 80
      });
    }

    for (let p = 0; p < 2; p++) {
      state.particles.push({
        x: state.player.x + state.player.facing * 18,
        y: state.player.y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: weaponLvl >= 3 ? '#00E5FF' : '#FFD700',
        size: 3,
        life: 12,
        maxLife: 12,
        shape: 'star'
      });
    }
  }, [selectedWeapon, stats.damageMultiplier, stats.doubleShot, stats.questionsCorrect]);

  // Spawn Monster Boss every 5 questions (Q5, Q10, Q15, Q20)
  const spawnZombieBoss = (batchIndex: number) => {
    const W = typeof window !== 'undefined' ? window.innerWidth : 800;
    const H = typeof window !== 'undefined' ? window.innerHeight : 600;
    const targetBarrio = BARRIOS[currentBarrioIndex] || BARRIOS[0];
    const bossConfig = (batchIndex % 2 === 1) ? targetBarrio.boss1 : targetBarrio.boss2;

    const initialCurse = SPANISH_MONSTER_CURSES[Math.floor(Math.random() * SPANISH_MONSTER_CURSES.length)];

    // High Boss HP for epic longer battle (gives time for 3-4 insult challenges per fight)
    const bossHp = 2200 + batchIndex * 300;

    engineStateRef.current.zombie = {
      id: `zombie_${currentBarrioIndex}_${batchIndex}_${Date.now()}`,
      name: bossConfig.name,
      title: bossConfig.title,
      emoji: bossConfig.emoji,
      bulletEmoji: bossConfig.bulletEmoji || '💥',
      x: W * 0.8,
      y: H / 2,
      r: 40, // Epic boss size
      hp: bossHp,
      maxHp: bossHp,
      color: '#E53935',
      speed: 40 + batchIndex * 4,
      shootCooldown: Math.max(0.7, 1.4 - batchIndex * 0.1),
      shootTimer: 0.5,
      phase: batchIndex,
      wobble: 0,
      hitFlash: 0,
      dead: false,
      lastSpeechText: initialCurse,
      speechTimer: 3.5
    };

    nextInsultTimerRef.current = 2.2;
    setActiveInsultQuestion(null);

    engineStateRef.current.enemyBullets = [];
    engineStateRef.current.enemies = [];
    engineStateRef.current.invuln = 45;
    isZombieActiveRef.current = true;

    // Speak Spanish insult out loud!
    audio.speakSpanishProfanity(initialCurse);

    // Floater alert
    engineStateRef.current.floaters.push({
      id: `boss_alert_${Date.now()}`,
      x: W / 2,
      y: H / 2 - 60,
      text: `👹 ¡GRAN MONSTRUO PALABROTA! "${initialCurse}"`,
      color: '#FF1744',
      life: 65,
      maxLife: 65,
      vy: -1.2,
      isCrit: true
    });
  };

  // Handle Answer for Monster Insult Challenge
  const handleInsultAnswer = useCallback((isCorrect: boolean) => {
    setActiveInsultQuestion(null);
    nextInsultTimerRef.current = 3.5; // 3.5 seconds until next insult challenge

    const state = engineStateRef.current;
    if (!state || !state.zombie || state.zombie.dead) return;

    if (isCorrect) {
      audio.playCorrect();
      audio.playPowerup();
      state.zombie.hp -= 250; // Big bonus damage reward!
      state.zombie.hitFlash = 14;

      state.floaters.push({
        id: `insult_win_${Date.now()}`,
        x: state.zombie.x,
        y: state.zombie.y - 45,
        text: '✨ ¡TRADUCCIÓN CORRECTA! -250 HP AL MONSTRUO! 💥',
        color: '#2ECC71',
        life: 55,
        maxLife: 55,
        vy: -1.5,
        isCrit: true
      });

      if (state.zombie.hp <= 0) {
        state.zombie.dead = true;
        audio.playExplosion();
        audio.playOverdriveTrigger();
        confetti({ particleCount: 90, spread: 75 });
        setTimeout(() => {
          setGameState('LEARNING_RECAP');
        }, 600);
      } else {
        setGameState('PLAYING');
      }
    } else {
      // WRONG ANSWER: MONSTER FIRES SUPER HEAVY SHOT / BARRAGE!
      audio.playWrong();
      audio.playExplosion();
      state.shake = 12;

      const angleToPlayer = Math.atan2(state.player.y - state.zombie.y, state.player.x - state.zombie.x);
      
      // Fire 4 super heavy red energy fireballs
      [-0.32, -0.11, 0.11, 0.32].forEach((spread, idx) => {
        state.enemyBullets.push({
          id: `eb_super_${Date.now()}_${idx}`,
          x: state.zombie!.x,
          y: state.zombie!.y,
          vx: Math.cos(angleToPlayer + spread) * 260,
          vy: Math.sin(angleToPlayer + spread) * 260,
          size: 13,
          damage: 1.0, // 1 Full Heart Damage!
          color: '#FF1744',
          life: 160,
          maxLife: 160,
          emoji: idx % 2 === 0 ? '💣' : '🔥'
        });
      });

      state.floaters.push({
        id: `insult_fail_${Date.now()}`,
        x: state.player.x,
        y: state.player.y - 40,
        text: '💥 ¡INCORRECTO! ¡EL MONSTRUO TE DISPARA UN SUPER ATAQUE!',
        color: '#FF1744',
        life: 55,
        maxLife: 55,
        vy: -1.4,
        isCrit: true
      });

      setGameState('PLAYING');
    }
  }, []);

  // Handle Question Answer
  const handleQuestionAnswer = (isCorrect: boolean, selectedIdx: number) => {
    const currentQ = levelQuestions[currentQuestionIndex];
    if (!currentQ) return;

    if (isCorrect) {
      audio.playCorrect();

      setStats(prev => {
        const nextCorrect = prev.questionsCorrect + 1;
        const nextCombo = prev.combo + 1;
        let nextHearts = prev.hearts;

        // "EVERY 5 CORRECT QUESTIONS: WEAPON MAGIC UPGRADE!"
        if (nextCorrect % 5 === 0) {
          const newWeaponLvl = Math.floor(nextCorrect / 5) + 1;
          audio.playPowerup();
          engineStateRef.current.floaters.push({
            id: `wpn_lvl_${Date.now()}`,
            x: engineStateRef.current.player.x,
            y: engineStateRef.current.player.y - 50,
            text: `✨ WEAPON LEVEL UP! (LEVEL ${newWeaponLvl}) 🌟`,
            color: '#FFD700',
            life: 50,
            maxLife: 50,
            vy: -1.5,
            isCrit: true
          });
        }

        // "ONLY IF YOU ANSWER 10 QUESTIONS CORRECTLY YOU RECOVER HALF A LIFE (+0.5)"
        if (nextCorrect % 10 === 0 && nextHearts < prev.maxHearts) {
          nextHearts = Math.min(prev.maxHearts, nextHearts + 0.5);
          audio.playTapaEat();
          engineStateRef.current.floaters.push({
            id: `heal_${Date.now()}`,
            x: engineStateRef.current.player.x,
            y: engineStateRef.current.player.y - 30,
            text: '💖 +0.5 HEART FOR 10 CORRECT ANSWERS!',
            color: '#2ECC71',
            life: 45,
            maxLife: 45,
            vy: -1.5,
            isCrit: true
          });
        }

        return {
          ...prev,
          score: prev.score + 500 * Math.max(1, Math.floor(nextCombo / 5)),
          combo: nextCombo,
          maxCombo: Math.max(prev.maxCombo, nextCombo),
          questionsAnswered: prev.questionsAnswered + 1,
          questionsCorrect: nextCorrect,
          streakCount: prev.streakCount + 1,
          hearts: nextHearts
        };
      });
    } else {
      audio.playWrong();
      engineStateRef.current.shake = 10;

      setMistakes(prev => [
        ...prev,
        {
          question: currentQ,
          selectedOption: currentQ.options[selectedIdx],
          timestamp: Date.now()
        }
      ]);

      setStats(prev => {
        const nextHearts = Math.max(0, prev.hearts - 0.5);
        if (nextHearts <= 0) {
          setGameState('GAME_OVER');
        }
        return {
          ...prev,
          hearts: nextHearts,
          combo: 0,
          questionsAnswered: prev.questionsAnswered + 1
        };
      });
    }
  };

  // Continue after Question Modal
  const handleContinueAfterQuestion = () => {
    const nextQIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextQIndex);
    playTimeSinceLastQuestionRef.current = 0;

    // Every 5 questions (Q5, Q10, Q15, Q20), spawn the monster boss!
    if (nextQIndex > 0 && nextQIndex % 5 === 0) {
      const batchIndex = Math.floor(nextQIndex / 5);
      spawnZombieBoss(batchIndex);
      setGameState('PLAYING');
    } else {
      setGameState('PLAYING');
    }
  };

  // Continue after Learning Recap Modal
  const handleContinueAfterRecap = () => {
    if (currentQuestionIndex >= 20) {
      // VICTORY of District!
      const targetBarrio = BARRIOS[currentBarrioIndex];
      const starsEarned = stats.hearts >= 5 ? 3 : stats.hearts >= 3 ? 2 : 1;

      setBarrioProgress(prev => {
        const currentSaved = prev[targetBarrio.id] || {
          unlocked: true,
          saved: false,
          highScore: 0,
          stars: 0,
          bestAccuracy: 0,
          monstersDefeated: 0
        };

        const nextBarrio = BARRIOS[currentBarrioIndex + 1];
        const updated = {
          ...prev,
          [targetBarrio.id]: {
            unlocked: true,
            saved: true,
            highScore: Math.max(currentSaved.highScore || 0, stats.score),
            stars: Math.max(currentSaved.stars || 0, starsEarned),
            bestAccuracy: Math.round((stats.questionsCorrect / 20) * 100),
            monstersDefeated: (currentSaved.monstersDefeated || 0) + 2
          }
        };

        if (nextBarrio) {
          updated[nextBarrio.id] = {
            ...(updated[nextBarrio.id] || {}),
            unlocked: true,
            saved: updated[nextBarrio.id]?.saved || false,
            highScore: updated[nextBarrio.id]?.highScore || 0,
            stars: updated[nextBarrio.id]?.stars || 0,
            bestAccuracy: updated[nextBarrio.id]?.bestAccuracy || 0,
            monstersDefeated: updated[nextBarrio.id]?.monstersDefeated || 0
          };
        }

        return updated;
      });

      audio.playPowerup();
      confetti({ particleCount: 150, spread: 90 });

      // Auto-save upon liberating district
      handleSaveGame();

      if (currentBarrioIndex >= BARRIOS.length - 1) {
        setGameState('VICTORY');
      } else {
        setGameState('WORLD_MAP');
      }
    } else {
      isZombieActiveRef.current = false;
      engineStateRef.current.zombie = null;
      playTimeSinceLastQuestionRef.current = 0;
      setGameState('PLAYING');
    }
  };

  // MAIN GAME ENGINE LOOP (60 FPS)
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      // PAUSE ENTIRE GAME ACTION WHILE MONSTER INSULT QUESTION IS OPEN
      if (activeInsultQuestion !== null) {
        animId = requestAnimationFrame(loop);
        return;
      }

      const state = engineStateRef.current;
      const W = typeof window !== 'undefined' ? window.innerWidth : 800;
      const H = typeof window !== 'undefined' ? window.innerHeight : 600;
      const now = Date.now();

      state.gameTime += dt;
      if (state.invuln > 0) state.invuln--;
      if (state.shake > 0) state.shake--;

      // Power-up timers
      if ((state.doubleShotTimer || 0) > 0) state.doubleShotTimer = (state.doubleShotTimer || 0) - dt;
      if ((state.rapidFireTimer || 0) > 0) state.rapidFireTimer = (state.rapidFireTimer || 0) - dt;

      setStats(prev => ({
        ...prev,
        shield: state.shieldHits || 0,
        doubleShotTimeLeft: Math.max(0, state.doubleShotTimer || 0),
        rapidFireTimeLeft: Math.max(0, state.rapidFireTimer || 0)
      }));

      // 1. CALIBRATED FLUID PLAYER MOVEMENT
      let moveX = 0;
      let moveY = 0;

      if (inputRef.current.keys['w'] || inputRef.current.keys['arrowup']) moveY -= 1;
      if (inputRef.current.keys['s'] || inputRef.current.keys['arrowdown']) moveY += 1;
      if (inputRef.current.keys['a'] || inputRef.current.keys['arrowleft']) moveX -= 1;
      if (inputRef.current.keys['d'] || inputRef.current.keys['arrowright']) moveX += 1;

      if (inputRef.current.joystick.x !== 0 || inputRef.current.joystick.y !== 0) {
        moveX = inputRef.current.joystick.x;
        moveY = inputRef.current.joystick.y;
      }

      const moveLen = Math.hypot(moveX, moveY);
      if (moveLen > 0.05) {
        const baseSpeedPx = 200;
        const speed = baseSpeedPx * ((selectedCharacter.baseSpeed || 300) / 300) * stats.speedMultiplier;
        const normX = moveX / (moveLen > 1 ? moveLen : 1);
        const normY = moveY / (moveLen > 1 ? moveLen : 1);

        state.player.x += normX * speed * dt;
        state.player.y += normY * speed * dt;

        state.player.bobT += dt * 8;
        if (normX !== 0) {
          state.player.facing = normX > 0 ? 1 : -1;
        }
      }

      // Constrain player
      state.player.x = Math.max(25, Math.min(W - 25, state.player.x));
      state.player.y = Math.max(90, Math.min(H - 75, state.player.y));

      // 2. CONTINUOUS MANUAL SHOOT ONLY WHILE HOLDING SHOOT BUTTON / SPACEBAR
      if (isShootingManualRef.current) {
        performShoot();
      }

      // 3. UPDATE PLAYER BULLETS
      state.playerBullets.forEach(b => {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.life--;
      });
      state.playerBullets = state.playerBullets.filter(b => b.life > 0);

      // 4. BALANCED ENEMY MOVEMENT & SPAWN FREQUENCY
      const progressRatio = Math.min(1, currentQuestionIndex / 20);
      const enemySpeedMultiplier = 0.82 + progressRatio * 0.25;
      const spawnInterval = Math.max(900, 1800 - progressRatio * 800);

      // Spawn Power-up Orbs periodically
      if (!isZombieActiveRef.current && now - lastPowerOrbSpawnTimeRef.current > 9000) {
        lastPowerOrbSpawnTimeRef.current = now;
        const orbTypes = ['bolita_escudo', 'bolita_doble_tiro', 'bolita_fuego_rapido'] as const;
        const chosenOrb = orbTypes[Math.floor(Math.random() * orbTypes.length)];
        const orbIcons: Record<string, string> = {
          bolita_escudo: '🛡️',
          bolita_doble_tiro: '🌟',
          bolita_fuego_rapido: '⚡'
        };

        state.lootDrops.push({
          id: `orb_${now}`,
          type: chosenOrb,
          x: Math.random() * (W - 120) + 60,
          y: Math.random() * (H - 240) + 120,
          life: 450,
          color: chosenOrb === 'bolita_escudo' ? '#00E5FF' : (chosenOrb === 'bolita_doble_tiro' ? '#FFD700' : '#FF4081'),
          icon: orbIcons[chosenOrb],
          name: chosenOrb,
          value: 150
        });
      }

      // 5. SPAWN BARRIO-SPECIFIC ENEMIES
      if (!isZombieActiveRef.current) {
        playTimeSinceLastQuestionRef.current += dt;

        // Trigger question modal after ~9.5s
        if (playTimeSinceLastQuestionRef.current >= 9.5 && currentQuestionIndex < levelQuestions.length) {
          audio.playCoin();
          setGameState('QUESTION_PAUSE');
          return;
        }

        // Spawn Enemies: STRICT MAXIMUM OF 4 ON FIELD AT ANY TIME!
        const MAX_ENEMIES = 4;
        if (now - lastEnemySpawnTimeRef.current > spawnInterval && state.enemies.length < MAX_ENEMIES) {
          lastEnemySpawnTimeRef.current = now;

          const availableEnemies = getEnemiesForBarrio(currentBarrioIndex);
          const spawnCount = Math.min(2, MAX_ENEMIES - state.enemies.length);

          for (let spawnPair = 0; spawnPair < spawnCount; spawnPair++) {
            const edge = Math.floor(Math.random() * 4);
            let ex = 0;
            let ey = 0;
            if (edge === 0) { ex = Math.random() * W; ey = 100; }
            else if (edge === 1) { ex = W; ey = Math.random() * (H - 200) + 100; }
            else if (edge === 2) { ex = Math.random() * W; ey = H - 90; }
            else { ex = 0; ey = Math.random() * (H - 200) + 100; }

            const randomType = availableEnemies[Math.floor(Math.random() * availableEnemies.length)];

            state.enemies.push({
              id: `enemy_${now}_${spawnPair}_${Math.random()}`,
              type: randomType,
              x: ex,
              y: ey,
              vx: 0,
              vy: 0,
              r: randomType.size * 0.7,
              hp: randomType.hp,
              maxHp: randomType.hp,
              speed: randomType.speed * enemySpeedMultiplier,
              dead: false,
              hitFlash: 0,
              wobble: Math.random() * Math.PI,
              angle: 0
            });
          }
        }

        // Update Enemies
        state.enemies.forEach(e => {
          if (e.dead) return;
          if (e.hitFlash > 0) e.hitFlash--;

          const angle = Math.atan2(state.player.y - e.y, state.player.x - e.x);
          e.vx = Math.cos(angle) * e.speed;
          e.vy = Math.sin(angle) * e.speed;
          e.x += e.vx * dt;
          e.y += e.vy * dt;

          // Bullets hitting Enemy
          state.playerBullets.forEach(b => {
            const d = Math.hypot(b.x - e.x, b.y - e.y);
            if (d < e.r + b.size) {
              e.hp -= b.damage;
              e.hitFlash = 6;
              b.life = 0;

              for (let p = 0; p < 3; p++) {
                state.particles.push({
                  x: e.x,
                  y: e.y,
                  vx: (Math.random() - 0.5) * 3,
                  vy: (Math.random() - 0.5) * 3,
                  color: '#FFD700',
                  size: 3,
                  life: 14,
                  maxLife: 14,
                  shape: 'star'
                });
              }

              // ENEMY DEFEATED!
              if (e.hp <= 0) {
                e.dead = true;
                audio.playExplosion();

                // SPLITTING ENEMY MECHANIC: If enemy has splitsOnDeath, spawn 2 MINI-ENEMIES of 1 HP each!
                if (e.type.splitsOnDeath && !e.type.isMini && state.enemies.length <= 4) {
                  audio.playPowerup();
                  state.floaters.push({
                    id: `split_${now}`,
                    x: e.x,
                    y: e.y - 20,
                    text: '⚡ ENEMY SPLIT INTO 2 MINIS (1 SHOT)!',
                    color: '#00E5FF',
                    life: 35,
                    maxLife: 35,
                    vy: -1.2,
                    isCrit: true
                  });

                  [-16, 16].forEach((offsetX, idx) => {
                    const miniType = {
                      ...e.type,
                      id: `${e.type.id}_mini_${idx}`,
                      name: `Mini ${e.type.name}`,
                      hp: 1,
                      splitsOnDeath: false,
                      isMini: true
                    };

                    state.enemies.push({
                      id: `mini_${now}_${idx}_${Math.random()}`,
                      type: miniType,
                      x: e.x + offsetX,
                      y: e.y,
                      vx: 0,
                      vy: 0,
                      r: e.r * 0.65,
                      hp: 1, // STRICTLY 1 HP - DIES IN 1 SHOT!
                      maxHp: 1,
                      speed: e.speed * 1.3,
                      dead: false,
                      hitFlash: 0,
                      wobble: Math.random() * Math.PI,
                      angle: 0
                    });
                  });
                }

                // RARE LOOT DROP (ONLY 12% CHANCE)
                const dropRoll = Math.random();
                if (dropRoll < 0.12) {
                  let dropType: any = 'coin';
                  let icon = '⭐';
                  let color = '#FFD700';

                  if (dropRoll < 0.07) {
                    dropType = 'coin';
                    icon = '⭐';
                    color = '#FFD700';
                  } else if (dropRoll < 0.10) {
                    dropType = 'tapa';
                    icon = '🧆';
                    color = '#FF8A80';
                  } else {
                    dropType = 'bolita_escudo';
                    icon = '🛡️';
                    color = '#00E5FF';
                  }

                  state.lootDrops.push({
                    id: `loot_${now}_${Math.random()}`,
                    type: dropType,
                    x: e.x,
                    y: e.y,
                    life: 360,
                    color,
                    icon,
                    name: dropType,
                    value: 100
                  });
                }

                setStats(prev => ({
                  ...prev,
                  score: prev.score + e.type.scoreValue
                }));
              }
            }
          });

          // Enemy hitting Player
          if (state.invuln <= 0) {
            const pDist = Math.hypot(state.player.x - e.x, state.player.y - e.y);
            if (pDist < state.player.r + e.r) {
              state.invuln = 40;
              state.shake = 6;

              if ((state.shieldHits || 0) > 0) {
                state.shieldHits = (state.shieldHits || 0) - 1;
                audio.playDash();
                state.floaters.push({
                  id: `shield_block_${now}`,
                  x: state.player.x,
                  y: state.player.y - 35,
                  text: '🛡️ SHIELD BLOCKED HIT!',
                  color: '#00E5FF',
                  life: 35,
                  maxLife: 35,
                  vy: -1.2,
                  isCrit: true
                });
              } else {
                audio.playHit();
                setStats(prev => {
                  const nextHearts = Math.max(0, prev.hearts - 0.5);
                  if (nextHearts <= 0) {
                    setGameState('GAME_OVER');
                  }
                  return { ...prev, hearts: nextHearts, combo: 0 };
                });
              }
            }
          }
        });
        state.enemies = state.enemies.filter(e => !e.dead);
      }

      // 6. ZOMBIE MONSTER DUEL (HIGH HP BOSS BATTLE + INSULT QUIZ EVERY 3 SECONDS)
      if (isZombieActiveRef.current && state.zombie && !state.zombie.dead) {
        const zombie = state.zombie;
        if (zombie.hitFlash > 0) zombie.hitFlash--;

        // TRIGGER INSULT CHALLENGE EVERY 3 SECONDS
        if (!activeInsultQuestion) {
          nextInsultTimerRef.current -= dt;
          if (nextInsultTimerRef.current <= 0) {
            nextInsultTimerRef.current = 999; // Pause until answered
            const rawQ = SPANISH_INSULT_QUESTIONS[Math.floor(Math.random() * SPANISH_INSULT_QUESTIONS.length)];
            const shuffledQ = getShuffledInsultQuestion(rawQ);
            setActiveInsultQuestion(shuffledQ);
            setGameState('INSULT_QUESTION_PAUSE');
            zombie.lastSpeechText = shuffledQ.spanish;
            zombie.speechTimer = 4.0;
            audio.speakSpanishProfanity(shuffledQ.spanish);
          }
        }

        // Smooth Approach to Player
        const zDist = Math.hypot(state.player.x - zombie.x, state.player.y - zombie.y);
        if (zDist > 120) {
          const zAngle = Math.atan2(state.player.y - zombie.y, state.player.x - zombie.x);
          zombie.x += Math.cos(zAngle) * zombie.speed * dt;
          zombie.y += Math.sin(zAngle) * zombie.speed * dt;
        } else {
          zombie.y += Math.sin(state.gameTime * 2.2) * zombie.speed * 0.8 * dt;
        }

        zombie.x = Math.max(50, Math.min(W - 50, zombie.x));
        zombie.y = Math.max(110, Math.min(H - 100, zombie.y));

        // Zombie Active Shooting Projectiles
        zombie.shootTimer -= dt;
        if (zombie.shootTimer <= 0) {
          zombie.shootTimer = zombie.shootCooldown;
          audio.playShoot('cerveza_canon');

          const angleToPlayer = Math.atan2(state.player.y - zombie.y, state.player.x - zombie.x);
          const bossEmojis = ['💩', '💣', '🔥', '💀', '🪨', '⚡', '👿'];
          const bulletEmojiToUse = zombie.bulletEmoji || bossEmojis[Math.floor(Math.random() * bossEmojis.length)];

          state.enemyBullets.push({
            id: `eb_${now}_1`,
            x: zombie.x,
            y: zombie.y,
            vx: Math.cos(angleToPlayer) * 220,
            vy: Math.sin(angleToPlayer) * 220,
            size: 10,
            damage: 0.5,
            color: '#D50000',
            life: 150,
            maxLife: 150,
            emoji: bulletEmojiToUse
          });

          if (zombie.phase >= 2) {
            [-0.28, 0.28].forEach((spread, idx) => {
              state.enemyBullets.push({
                id: `eb_${now}_spread_${idx}`,
                x: zombie.x,
                y: zombie.y,
                vx: Math.cos(angleToPlayer + spread) * 200,
                vy: Math.sin(angleToPlayer + spread) * 200,
                size: 9,
                damage: 0.5,
                color: '#AB47BC',
                life: 150,
                maxLife: 150,
                emoji: '💥'
              });
            });
          }
        }

        // Bullets hitting Zombie
        state.playerBullets.forEach(b => {
          const d = Math.hypot(b.x - zombie.x, b.y - zombie.y);
          if (d < zombie.r + b.size) {
            zombie.hp -= b.damage;
            zombie.hitFlash = 5;
            b.life = 0;

            for (let p = 0; p < 4; p++) {
              state.particles.push({
                x: zombie.x,
                y: zombie.y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                color: '#FFD700',
                size: 3.5,
                life: 16,
                maxLife: 16,
                shape: 'star'
              });
            }

            // Zombie Defeated!
            if (zombie.hp <= 0) {
              zombie.dead = true;
              audio.playExplosion();
              audio.playOverdriveTrigger();

              confetti({
                particleCount: 90,
                spread: 75,
                origin: { x: zombie.x / W, y: zombie.y / H }
              });

              setStats(prev => ({
                ...prev,
                score: prev.score + 1000,
                zombiesDefeated: prev.zombiesDefeated + 1
              }));

              setTimeout(() => {
                setGameState('LEARNING_RECAP');
              }, 600);
            }
          }
        });
      }

      // 7. Update Enemy Bullets
      state.enemyBullets.forEach(eb => {
        eb.x += eb.vx * dt;
        eb.y += eb.vy * dt;
        eb.life--;

        if (state.invuln <= 0) {
          const pDist = Math.hypot(state.player.x - eb.x, state.player.y - eb.y);
          if (pDist < state.player.r + eb.size) {
            eb.life = 0;
            state.invuln = 40;
            state.shake = 8;

            if ((state.shieldHits || 0) > 0) {
              state.shieldHits = (state.shieldHits || 0) - 1;
              audio.playDash();
              state.floaters.push({
                id: `shield_block_${now}`,
                x: state.player.x,
                y: state.player.y - 35,
                text: '🛡️ SHIELD ABSORBED BULLET!',
                color: '#00E5FF',
                life: 35,
                maxLife: 35,
                vy: -1.2,
                isCrit: true
              });
            } else {
              audio.playHit();
              setStats(prev => {
                const nextHearts = Math.max(0, prev.hearts - 0.5);
                if (nextHearts <= 0) {
                  setGameState('GAME_OVER');
                }
                return { ...prev, hearts: nextHearts, combo: 0 };
              });
            }
          }
        }
      });
      state.enemyBullets = state.enemyBullets.filter(eb => eb.life > 0);

      // 8. Update Loot Drops & Power-ups
      state.lootDrops.forEach(drop => {
        const d = Math.hypot(state.player.x - drop.x, state.player.y - drop.y);
        if (d < state.player.r + 22) {
          drop.life = 0;

          if (drop.type === 'coin') {
            audio.playCoin();
            setStats(prev => ({ ...prev, score: prev.score + 50, coinsCollected: prev.coinsCollected + 1 }));
          } else if (drop.type === 'bolita_escudo') {
            audio.playPowerup();
            state.shieldHits = 2;
            state.floaters.push({
              id: `f_shield_${now}`,
              x: state.player.x,
              y: state.player.y - 35,
              text: '🛡️ SHIELD ACTIVE (+2 HITS)!',
              color: '#00E5FF',
              life: 40,
              maxLife: 40,
              vy: -1.4,
              isCrit: true
            });
          } else if (drop.type === 'bolita_doble_tiro') {
            audio.playPowerup();
            state.doubleShotTimer = 15;
            state.floaters.push({
              id: `f_double_${now}`,
              x: state.player.x,
              y: state.player.y - 35,
              text: '🌟 HOMING DOUBLE SHOT (15s)!',
              color: '#FFD700',
              life: 40,
              maxLife: 40,
              vy: -1.4,
              isCrit: true
            });
          } else if (drop.type === 'bolita_fuego_rapido') {
            audio.playPowerup();
            state.rapidFireTimer = 12;
            state.floaters.push({
              id: `f_rapid_${now}`,
              x: state.player.x,
              y: state.player.y - 35,
              text: '⚡ RAPID FIRE (12s)!',
              color: '#FF4081',
              life: 40,
              maxLife: 40,
              vy: -1.4,
              isCrit: true
            });
          } else if (drop.type === 'tapa') {
            audio.playTapaEat();
            setStats(prev => ({
              ...prev,
              score: prev.score + 200
            }));
            state.floaters.push({
              id: `f_tapa_${now}`,
              x: state.player.x,
              y: state.player.y - 35,
              text: '🧆 DELICIOUS TAPA! +200 PTS',
              color: '#FF8A80',
              life: 38,
              maxLife: 38,
              vy: -1.4,
              isCrit: false
            });
          }
        }
        drop.life--;
      });
      state.lootDrops = state.lootDrops.filter(d => d.life > 0);

      // 9. ANIMATE AND CLEAN UP FLOATERS
      state.floaters.forEach(f => {
        f.y += (f.vy || -1) * 35 * dt;
        f.life--;
      });
      state.floaters = state.floaters.filter(f => f.life > 0);

      // 10. ANIMATE AND CLEAN UP PARTICLES
      state.particles.forEach(p => {
        p.x += p.vx * 30 * dt;
        p.y += p.vy * 30 * dt;
        p.life--;
      });
      state.particles = state.particles.filter(p => p.life > 0);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, selectedCharacter, selectedWeapon, currentBarrioIndex, stats.speedMultiplier, currentQuestionIndex, levelQuestions.length, performShoot]);

  return (
    <div className="relative w-full h-[100dvh] bg-[#FFE4E1] overflow-hidden select-none font-['Outfit',sans-serif]">
      {/* Save Notification Toast */}
      {saveToast && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#2ECC71] text-white font-black text-xs px-4 py-2 rounded-full border-2 border-white shadow-lg animate-bounce flex items-center gap-1.5 pointer-events-none">
          <Check size={16} />
          <span>{saveToast}</span>
        </div>
      )}

      {/* 1. MAIN GAME CANVAS */}
      <GameCanvas engineStateRef={engineStateRef} />

      {/* 2. HUD & STATUS BAR (PLAYING OR INSULT_QUESTION_PAUSE) */}
      {(gameState === 'PLAYING' || gameState === 'INSULT_QUESTION_PAUSE') && (
        <>
          <HUD
            hearts={stats.hearts}
            maxHearts={stats.maxHearts}
            shield={stats.shield || 0}
            doubleShotTimeLeft={stats.doubleShotTimeLeft || 0}
            rapidFireTimeLeft={stats.rapidFireTimeLeft || 0}
            score={stats.score}
            combo={stats.combo}
            currentBarrio={currentBarrio}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={20}
            activeCharacter={selectedCharacter}
            activeWeapon={selectedWeapon}
            soundEnabled={settings.soundEnabled}
            onToggleSound={() => setSettings(s => ({ ...s, soundEnabled: !s.soundEnabled }))}
            onOpenSettings={() => setGameState('SETTINGS')}
            onOpenReview={() => setGameState('REVIEW')}
            onSaveGame={handleSaveGame}
            onRestartRun={handleRestartRun}
            onGoToMenu={() => setGameState('MENU')}
            mistakesCount={mistakes.length}
            isFightingZombie={isZombieActiveRef.current}
            zombieBoss={engineStateRef.current.zombie}
          />

          {/* MONSTER INSULT TRANSLATION CHALLENGE MODAL (PAUSES GAMEPLAY) */}
          {activeInsultQuestion && engineStateRef.current.zombie && !engineStateRef.current.zombie.dead && (
            <MonsterInsultOverlay
              question={activeInsultQuestion}
              monsterName={engineStateRef.current.zombie.name}
              monsterEmoji={engineStateRef.current.zombie.emoji || '👹'}
              onAnswer={handleInsultAnswer}
            />
          )}

          {/* STRICTLY MANUAL MOBILE CONTROLS */}
          <MobileControls
            onMove={vec => {
              inputRef.current.joystick = vec;
            }}
            onShootStart={() => {
              isShootingManualRef.current = true;
              performShoot();
            }}
            onShootEnd={() => {
              isShootingManualRef.current = false;
            }}
            onDash={performDash}
            onSuperBurst={performSuperBurst}
            canSuperBurst={stats.combo >= 5}
          />
        </>
      )}

      {/* 3. QUESTION MODAL */}
      {gameState === 'QUESTION_PAUSE' && levelQuestions[currentQuestionIndex] && (
        <QuestionModal
          question={levelQuestions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={20}
          hearts={stats.hearts}
          maxHearts={6}
          onAnswer={handleQuestionAnswer}
          onContinue={handleContinueAfterQuestion}
        />
      )}

      {/* 4. LEARNING RECAP MODAL */}
      {gameState === 'LEARNING_RECAP' && (
        <LearningRecapModal
          questions={
            currentQuestionIndex <= 10
              ? levelQuestions.slice(0, 10)
              : levelQuestions.slice(10, 20)
          }
          batchIndex={currentQuestionIndex <= 10 ? 1 : 2}
          totalBatches={2}
          onContinue={handleContinueAfterRecap}
        />
      )}

      {/* 4. MAIN MENU OVERLAY */}
      {gameState === 'MENU' && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-[#FFF0F5]/90 via-[#FFE4E1]/90 to-[#F8BBD0]/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
          {/* Header & Logo */}
          <div className="text-center mt-2 sm:mt-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FF4081] text-white text-[11px] font-black rounded-full border-2 border-white uppercase tracking-wider shadow-sm mb-1.5">
              <Sparkles size={12} /> ACTION ARCADE • SPANISH ADVENTURE 🌸
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-['Bungee'] text-[#D81B60] drop-shadow-[0_4px_12px_rgba(255,64,129,0.3)] tracking-wider">
              BARCELONA SURVIVORS
            </h1>
            <p className="text-xs sm:text-sm text-[#880E4F] font-bold mt-1 max-w-md mx-auto">
              Save the 6 districts of Barcelona from A1 to C2 while learning authentic Spanish!
            </p>
          </div>

          {/* Quick Progress Banner */}
          <div className="flex items-center gap-3 bg-white/90 border-2 border-[#FF80AB] px-3.5 py-1.5 rounded-2xl shadow-xs text-xs font-black text-[#D81B60]">
            <span className="flex items-center gap-1">
              <Trophy size={14} className="text-[#FFB300]" />
              {BARRIOS.filter(b => barrioProgress[b.id]?.saved).length}/6 Districts Saved
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#F57F17]">
              <Star size={14} fill="#FBC02D" />
              {Object.values(barrioProgress).reduce((acc, c) => acc + (c.stars || 0), 0)} Stars Total
            </span>
          </div>

          {/* Character Showcase Card */}
          <div className="bg-white/95 border-4 border-[#FF80AB] rounded-3xl p-3.5 sm:p-5 shadow-xl max-w-sm w-full text-center flex flex-col items-center gap-2 backdrop-blur-xs my-1.5">
            <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-gradient-to-tr from-[#FF80AB] to-[#FF4081] text-4xl sm:text-5xl flex items-center justify-center border-4 border-white shadow-md">
              {selectedCharacter.avatarEmoji || '🌸'}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black font-['Bungee'] text-[#D81B60]">
                {selectedCharacter.name}
              </h3>
              <p className="text-xs text-[#6A1B9A] font-bold">
                {selectedCharacter.title}
              </p>
              <p className="text-xs text-[#2ECC71] font-black mt-1 bg-[#E8F8F5] px-2 py-0.5 rounded-full border border-green-200">
                ✨ Skill: {selectedCharacter.specialAbility}
              </p>
            </div>

            <button
              onClick={() => setGameState('CHAR_SELECT')}
              className="text-xs font-black text-[#D81B60] underline cursor-pointer hover:opacity-80 mt-1"
            >
              Change Hero
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 w-full max-w-xs mb-3 sm:mb-5">
            {/* Resume Saved Game (if exists) */}
            {savedGame && (
              <button
                onClick={() => {
                  audio.playClick();
                  handleResumeSavedGame();
                }}
                className="w-full py-3 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white font-black font-['Bungee'] text-xs sm:text-sm rounded-2xl shadow-[0_4px_15px_rgba(46,204,113,0.4)] active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer border-2 border-white"
              >
                <Save size={16} />
                <span>RESUME SAVED GAME ({BARRIOS[savedGame.barrioIndex]?.name || 'GAME'})</span>
              </button>
            )}

            {/* World Map Button */}
            <button
              onClick={() => {
                audio.playClick();
                setGameState('WORLD_MAP');
              }}
              className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-[#FF4081] to-[#D81B60] hover:from-[#E91E63] hover:to-[#C2185B] text-white font-black font-['Bungee'] text-sm sm:text-base rounded-2xl shadow-[0_6px_20px_rgba(216,27,96,0.4)] active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer"
            >
              <Map size={20} />
              <span>SAVED DISTRICTS MAP</span>
            </button>

            {/* Quick Play First Available / Current Barrio */}
            <button
              onClick={() => {
                audio.playClick();
                setGameState('BRIEFING');
              }}
              className="w-full py-2.5 bg-[#FFF0F5] hover:bg-[#FFE4E1] text-[#D81B60] font-black font-['Bungee'] text-xs sm:text-sm rounded-2xl border-2 border-[#FF80AB] shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play size={16} fill="#D81B60" />
              <span>NEW RUN IN {currentBarrio.name}</span>
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => setGameState('STUDY_DECK')}
                className="flex-1 py-2 bg-white border-2 border-[#FF80AB] text-[#D81B60] font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1 hover:bg-[#FFF0F5] active:scale-95 cursor-pointer"
              >
                <BookOpen size={13} /> Study Deck
              </button>

              <button
                onClick={() => setGameState('SETTINGS')}
                className="flex-1 py-2 bg-white border-2 border-[#FF80AB] text-[#D81B60] font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1 hover:bg-[#FFF0F5] active:scale-95 cursor-pointer"
              >
                ⚙️ Settings & Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. WORLD MAP OF BARRIOS */}
      {gameState === 'WORLD_MAP' && (
        <WorldMapModal
          barrioProgress={barrioProgress}
          currentSelectedBarrio={currentBarrioIndex}
          onSelectBarrio={idx => {
            setCurrentBarrioIndex(idx);
            audio.playClick();
            setGameState('BRIEFING');
          }}
          onClose={() => setGameState('MENU')}
        />
      )}

      {/* 6. CHARACTER SELECT MODAL */}
      {gameState === 'CHAR_SELECT' && (
        <CharacterSelectModal
          selectedCharacter={selectedCharacter}
          onSelect={char => {
            setSelectedCharacter(char);
            audio.playPowerup();
            setGameState('MENU');
          }}
          onClose={() => setGameState('MENU')}
        />
      )}

      {/* 7. BARRIO BRIEFING */}
      {gameState === 'BRIEFING' && (
        <BarrioBriefing
          barrio={currentBarrio}
          barrioIndex={currentBarrioIndex}
          totalBarrios={BARRIOS.length}
          onStart={() => startBarrio(currentBarrioIndex)}
          onBack={() => setGameState('WORLD_MAP')}
        />
      )}

      {/* 8. PERK SELECT */}
      {gameState === 'PERK_SELECT' && (
        <PerkModal
          perks={availablePerks}
          onSelectPerk={perk => {
            perk.apply(stats);
            audio.playPowerup();
            setCurrentBarrioIndex(prev => prev + 1);
            setGameState('BRIEFING');
          }}
        />
      )}

      {/* 9. STUDY DECK */}
      {gameState === 'STUDY_DECK' && (
        <StudyDeckModal
          onClose={() => setGameState('MENU')}
        />
      )}

      {/* 10. REVIEW MODAL */}
      {gameState === 'REVIEW' && (
        <ReviewModal
          mistakes={mistakes}
          onClose={() => setGameState('PLAYING')}
          onClearMistakes={() => setMistakes([])}
        />
      )}

      {/* 11. SETTINGS MODAL */}
      {gameState === 'SETTINGS' && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={newS => setSettings(prev => ({ ...prev, ...newS }))}
          onSaveGame={handleSaveGame}
          onRestartRun={handleRestartRun}
          onUnlockAllLevels={handleUnlockAllLevels}
          onResetProgress={handleResetProgress}
          onGoToMenu={() => setGameState('MENU')}
          onClose={() => setGameState('MENU')}
        />
      )}

      {/* 12. GAME OVER */}
      {gameState === 'GAME_OVER' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#FFF5F7] border-4 border-[#D81B60] rounded-3xl p-5 sm:p-6 max-w-sm w-full text-center flex flex-col items-center gap-3.5 shadow-2xl">
            <span className="text-5xl sm:text-6xl animate-bounce">💔</span>
            <h2 className="text-xl sm:text-2xl font-black font-['Bungee'] text-[#D81B60]">
              GAME OVER!
            </h2>
            <p className="text-xs text-gray-700 font-bold">
              You ran out of hearts in {currentBarrio.name}. Practice makes perfect, don't give up!
            </p>

            <div className="w-full bg-white border-2 border-[#FFD1DC] rounded-2xl p-2.5 flex justify-around text-xs font-black">
              <div>
                <span className="block text-gray-500 text-[9px]">SCORE</span>
                <span className="text-[#D81B60] text-sm">{stats.score}</span>
              </div>
              <div>
                <span className="block text-gray-500 text-[9px]">CORRECT</span>
                <span className="text-[#2ECC71] text-sm">{stats.questionsCorrect}/20</span>
              </div>
              <div>
                <span className="block text-gray-500 text-[9px]">LEVEL</span>
                <span className="text-[#AB47BC] text-sm">{currentBarrio.levelCefr}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full mt-1">
              <button
                onClick={() => {
                  setStats(prev => ({
                    ...prev,
                    hearts: 6,
                    maxHearts: 6,
                    score: 0,
                    combo: 0,
                    questionsCorrect: 0,
                    questionsAnswered: 0,
                    zombiesDefeated: 0,
                    shield: 0,
                    doubleShot: false
                  }));
                  startBarrio(currentBarrioIndex);
                }}
                className="w-full py-3 bg-gradient-to-r from-[#FF4081] to-[#D81B60] text-white font-black font-['Bungee'] text-xs sm:text-sm rounded-2xl shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw size={15} /> REPETIR {currentBarrio.name}
              </button>

              <div className="flex gap-2 w-full">
                <button
                  onClick={() => setGameState('WORLD_MAP')}
                  className="flex-1 py-2 bg-white border-2 border-[#FF80AB] text-[#D81B60] font-bold text-xs rounded-xl hover:bg-[#FFF0F5] active:scale-95 cursor-pointer"
                >
                  Mapa de Distritos
                </button>
                <button
                  onClick={() => setGameState('MENU')}
                  className="flex-1 py-2 bg-white border-2 border-[#FF80AB] text-[#D81B60] font-bold text-xs rounded-xl hover:bg-[#FFF0F5] active:scale-95 cursor-pointer"
                >
                  Menú Principal 🏠
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 13. VICTORY */}
      {gameState === 'VICTORY' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-pink-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#FFF5F7] border-4 border-[#FFD700] rounded-3xl p-5 sm:p-6 max-w-md w-full text-center flex flex-col items-center gap-3.5 shadow-2xl">
            <span className="text-5xl sm:text-6xl animate-bounce">👑🏆</span>
            <h2 className="text-xl sm:text-2xl font-black font-['Bungee'] text-[#D81B60]">
              SPANISH MASTERY ACHIEVED!
            </h2>
            <p className="text-xs text-gray-700 font-bold">
              You saved all 6 districts of Barcelona from A1 to C2 and defeated every zombie boss!
            </p>

            <div className="w-full bg-white border-2 border-[#FFD1DC] rounded-2xl p-3 flex justify-around text-xs font-black">
              <div>
                <span className="block text-gray-500 text-[9px]">TOTAL SCORE</span>
                <span className="text-[#D81B60] text-sm sm:text-base">{stats.score}</span>
              </div>
              <div>
                <span className="block text-gray-500 text-[9px]">DISTRICTS</span>
                <span className="text-[#2ECC71] text-sm sm:text-base">6 / 6 SAVED</span>
              </div>
              <div>
                <span className="block text-gray-500 text-[9px]">MASTERY</span>
                <span className="text-[#AB47BC] text-sm sm:text-base">LEVEL C2 🎓</span>
              </div>
            </div>

            <button
              onClick={() => {
                setStats({
                  score: 0,
                  combo: 0,
                  maxCombo: 0,
                  hearts: 6,
                  maxHearts: 6,
                  speedMultiplier: 1,
                  damageMultiplier: 1,
                  fireRateMultiplier: 1,
                  questionsAnswered: 0,
                  questionsCorrect: 0,
                  zombiesDefeated: 0,
                  streakCount: 0,
                  coinsCollected: 0,
                  currentQuestionIndex: 0,
                  totalQuestionsPerLevel: 20,
                  shield: 0,
                  doubleShot: false
                });
                setGameState('WORLD_MAP');
              }}
              className="w-full py-3.5 bg-gradient-to-r from-[#FFD700] to-[#FFA000] text-[#5D4037] font-black font-['Bungee'] text-sm sm:text-base rounded-2xl shadow-lg active:scale-95 transition-transform cursor-pointer"
            >
              EXPLORE DISTRICT MAP 🗺️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
