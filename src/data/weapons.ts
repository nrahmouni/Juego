import { Weapon } from '../types/game';

export const WEAPONS: Weapon[] = [
  {
    id: 'varita_estrellas',
    name: 'Varita Mágica de Estrellas',
    emoji: '⭐',
    description: 'Dispara estrellitas doradas y chispas mágicas pastel con auto-apuntado.',
    fireRate: 5.5, // 5.5 disparos por segundo (~180ms)
    damage: 1,
    bulletColor: '#FFD54F',
    bulletSpeed: 900,
    spread: 0,
    bulletsPerShot: 1
  },
  {
    id: 'pistola_corazones',
    name: 'Lanzador de Corazones',
    emoji: '💖',
    description: 'Dispara una ráfaga dulce de corazones rosas con amor.',
    fireRate: 4.5,
    damage: 1.2,
    bulletColor: '#FF69B4',
    bulletSpeed: 820,
    spread: 0.2,
    bulletsPerShot: 2,
    specialEffect: 'burn'
  },
  {
    id: 'pompero_burbujas',
    name: 'Pompero de Burbujitas',
    emoji: '🫧',
    description: 'Lanza pompas de jabón arcoíris que ralentizan a los enemigos.',
    fireRate: 4.0,
    damage: 1.8,
    bulletColor: '#81D4FA',
    bulletSpeed: 780,
    spread: 0.1,
    bulletsPerShot: 2,
    specialEffect: 'freeze'
  },
  {
    id: 'lanzador_fresas',
    name: 'Metralleta de Fresitas y Churros',
    emoji: '🍓',
    description: 'Disparos ultrarrápidos de fresas dulces que perforan filas.',
    fireRate: 7.0,
    damage: 1,
    bulletColor: '#FF5252',
    bulletSpeed: 1000,
    spread: 0.05,
    bulletsPerShot: 1,
    specialEffect: 'pierce'
  }
];
