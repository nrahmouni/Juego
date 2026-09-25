import { Perk, GameStats } from '../types/game';

export const ALL_PERKS: Perk[] = [
  {
    id: 'cafe_doble',
    name: 'Café Solo Doble',
    icon: '☕',
    description: '+25% Velocidad de movimiento del jugador.',
    rarity: 'common',
    apply: (stats: GameStats) => {
      stats.speedMultiplier += 0.25;
    }
  },
  {
    id: 'tapas_curativas',
    name: 'Ración de Jamón Ibérico',
    icon: '🍖',
    description: 'Restaura 2 corazones completos inmediatamente y aumenta vida máxima.',
    rarity: 'rare',
    apply: (stats: GameStats) => {
      stats.maxHearts += 1;
      stats.hearts = Math.min(stats.maxHearts, stats.hearts + 2);
    }
  },
  {
    id: 'tiempo_bala',
    name: 'Reloj de Dalí (Tiempo Bala)',
    icon: '⏳',
    description: 'Los aciertos en racha aumentan tu cadencia de disparo.',
    rarity: 'rare',
    apply: (stats: GameStats) => {
      stats.fireRateMultiplier += 0.3;
    }
  },
  {
    id: 'doble_disparo',
    name: 'Doble Tap Catalán',
    icon: '💥',
    description: 'Aumenta el daño de tus estrellas mágicas contra los zombis.',
    rarity: 'legendary',
    apply: (stats: GameStats) => {
      stats.damageMultiplier += 0.4;
      stats.doubleShot = true;
    }
  },
  {
    id: 'escudo_modernista',
    name: 'Escudo de Trencadís',
    icon: '🛡️',
    description: 'Ganas +1 corazón extra para resistir los disparos de los zombis.',
    rarity: 'common',
    apply: (stats: GameStats) => {
      stats.maxHearts += 1;
      stats.hearts += 1;
    }
  },
  {
    id: 'balas_perforantes',
    name: 'Balas de Acero de Poblenou',
    icon: '⚡',
    description: 'Tus proyectiles viajan más rápido y con mayor potencia.',
    rarity: 'rare',
    apply: (stats: GameStats) => {
      stats.damageMultiplier += 0.3;
      stats.bulletPierce = 1;
    }
  },
  {
    id: 'furia_flamenca',
    name: 'Furia de las Ramblas',
    icon: '🔥',
    description: '+50% Multiplicador de puntos y daño masivo a los jefes zombi.',
    rarity: 'legendary',
    apply: (stats: GameStats) => {
      stats.damageMultiplier += 0.5;
    }
  }
];

export function getRandomPerks(count: number = 3): Perk[] {
  const shuffled = [...ALL_PERKS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
