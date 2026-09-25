export type SpanishLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type QuestionCategory = 'vocab' | 'grammar' | 'slang' | 'tapas' | 'directions' | 'culture' | 'idioms' | 'subjunctive';

export interface Question {
  id: string;
  question: string;
  englishHint?: string;
  explanation: string;
  options: [string, string, string, string];
  correctIndex: number;
  level: SpanishLevel;
  category: QuestionCategory;
  audioPhrase?: string;
}

export interface EnemyType {
  id: string;
  name: string;
  description: string;
  color: string;
  speed: number;
  hp: number;
  emoji: string;
  size: number;
  boss?: boolean;
  scoreValue: number;
  attackDamage: number;
  renderType?: 'dragon' | 'car' | 'moto' | 'gargoyle' | 'demon' | 'beast' | 'seagull' | 'crab' | 'drone' | 'scooter' | 'mini';
  behavior?: string;
}

export interface ZombieBoss {
  id: string;
  name: string;
  title: string;
  emoji: string;
  x: number;
  y: number;
  r: number;
  hp: number;
  maxHp: number;
  color: string;
  speed: number;
  shootCooldown: number;
  shootTimer: number;
  phase: number;
  wobble: number;
  hitFlash: number;
  dead: boolean;
  bulletEmoji?: string;
  lastSpeechText?: string;
  speechTimer?: number;
}

export interface EnemyBullet {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  damage: number;
  color: string;
  life: number;
  maxLife: number;
  emoji?: string;
}

export interface BossConfig {
  name: string;
  title: string;
  emoji: string;
  hp: number;
  quote: string;
  bulletEmoji: string;
  bulletColor: string;
}

export interface BarrioConfig {
  id: string;
  name: string;
  subtitle: string;
  levelCefr: SpanishLevel;
  levelTitle: string;
  levelDesc: string;
  skyGradient: [string, string, string];
  floorColor: string;
  landmark: string;
  landmarkSilhouette: 'gracia_clock' | 'barceloneta_w' | 'sagrada_familia' | 'poblenou_factory' | 'raval_macba' | 'park_guell' | 'montjuic_castle';
  description: string;
  funFact: string;
  hintAllowed: boolean;
  themeEmoji: string;
  enemyIds: string[];
  boss1: BossConfig; // Aparece en la pregunta 10
  boss2: BossConfig; // Aparece en la pregunta 20
}

export interface Character {
  id: string;
  name: string;
  title: string;
  quote: string;
  desc: string;
  avatarEmoji: string;
  skinColor: string;
  hairColor: string;
  hairStyle: 'ponytail' | 'curly' | 'spiky' | 'chef';
  outfitColor: string;
  baseHp: number;
  baseSpeed: number;
  specialAbility: string;
  passiveBonus?: {
    speedMult?: number;
    hpBonus?: number;
    scoreMult?: number;
    shieldBonus?: number;
    comboForgiveness?: number;
  };
}

export interface Weapon {
  id: string;
  name: string;
  emoji: string;
  description: string;
  fireRate: number;
  damage: number;
  bulletColor: string;
  bulletSpeed: number;
  spread?: number;
  bulletsPerShot?: number;
  specialEffect?: string;
}

export interface Perk {
  id: string;
  name: string;
  icon: string;
  description: string;
  rarity: 'common' | 'rare' | 'legendary';
  apply: (state: GameStats) => void;
}

export interface GameStats {
  score: number;
  combo: number;
  maxCombo: number;
  hearts: number;
  maxHearts: number;
  shield?: number;
  doubleShot?: boolean;
  doubleShotTimeLeft?: number;
  rapidFireTimeLeft?: number;
  bulletPierce?: number;
  speedMultiplier: number;
  damageMultiplier: number;
  fireRateMultiplier: number;
  questionsAnswered: number;
  questionsCorrect: number;
  zombiesDefeated: number;
  streakCount: number;
  coinsCollected: number;
  currentQuestionIndex: number; // 0 to 19 (20 per level)
  totalQuestionsPerLevel: number; // 20
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
  shape?: 'circle' | 'star' | 'heart' | 'spark' | 'ring';
}

export interface FloaterText {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
  maxLife?: number;
  vy: number;
  isCrit?: boolean;
}

export interface Bullet {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  damage: number;
  life: number;
  maxLife: number;
}

export interface LootDrop {
  id: string;
  type: 'coin' | 'heart' | 'tapa' | 'bolita_escudo' | 'bolita_doble_tiro' | 'bolita_fuego_rapido' | 'bolita_corazon';
  x: number;
  y: number;
  life: number;
  color: string;
  icon: string;
  name: string;
  value: number;
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  hintsEnabled: boolean;
  autoFire: boolean;
  volume: number;
}

export interface MistakeRecord {
  question: Question;
  selectedOption: string;
  timestamp: number;
}

export interface BarrioProgress {
  unlocked: boolean;
  saved: boolean;
  highScore: number;
  stars: number; // 1, 2 or 3
  bestAccuracy: number; // percentage
  monstersDefeated: number;
}
