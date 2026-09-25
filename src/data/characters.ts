import { Character } from '../types/game';

export const CHARACTERS: Character[] = [
  {
    id: 'laia',
    name: 'Laia de Gràcia',
    title: 'The Starlight Heroine',
    quote: 'With magic and smiles, we illuminate Barcelona!',
    desc: 'Sweet, agile heroine with her starlight wand and silky pink ribbon.',
    avatarEmoji: '👧🏻🎀',
    skinColor: '#FBD6B8',
    hairColor: '#3A1E14',
    hairStyle: 'ponytail',
    outfitColor: '#FF69B4',
    baseHp: 5,
    baseSpeed: 235,
    specialAbility: 'Star Blossom Prism (Orbital star shields & triple sparkle)',
    skill: {
      id: 'star_blossom',
      name: 'Star Blossom Prism',
      icon: '✨',
      cooldownSec: 16,
      description: 'Summons 6 radiant star petals that orbit you, absorb 1 bullet, and blast nearby creeps (+18 dmg).',
      effectType: 'star_blossom'
    },
    passiveBonus: {
      speedMult: 1.05,
      hpBonus: 0,
      scoreMult: 1.1
    }
  },
  {
    id: 'jordi',
    name: 'Jordi Skater',
    title: 'The MACBA Bunny Rider',
    quote: 'Smooth kickflips and vibrant rhythm!',
    desc: 'Quick on his turquoise skateboard with bunny-eared beanie cap.',
    avatarEmoji: '🐰🛹',
    skinColor: '#F7D0B2',
    hairColor: '#FFA726',
    hairStyle: 'spiky',
    outfitColor: '#4FC3F7',
    baseHp: 4,
    baseSpeed: 255,
    specialAbility: 'Ollie Shockwave (Instant dash leap & enemy slow-motion)',
    skill: {
      id: 'ollie_shockwave',
      name: 'MACBA Kickflip Wave',
      icon: '🛹',
      cooldownSec: 14,
      description: 'Performs an agile skate leap with invulnerability, releasing a cyan shockwave that slows enemies by 40% for 3.5s.',
      effectType: 'ollie_shockwave'
    },
    passiveBonus: {
      speedMult: 1.15,
      hpBonus: -1,
      scoreMult: 1.25
    }
  },
  {
    id: 'carmen',
    name: 'Carmen la Risueña',
    title: 'The Mosaic Fairy',
    quote: 'Warm hugs and rhythmic harmony for all!',
    desc: 'Resilient and graceful with floral rose petal shields and vibrant spirit.',
    avatarEmoji: '🌸✨',
    skinColor: '#E2B895',
    hairColor: '#212121',
    hairStyle: 'curly',
    outfitColor: '#81C784',
    baseHp: 6,
    baseSpeed: 220,
    specialAbility: 'Flamenco Petal Barrier (Shield burst & item magnet)',
    skill: {
      id: 'flamenco_barrier',
      name: 'Petal Shield & Attraction',
      icon: '🌹',
      cooldownSec: 18,
      description: 'Deploys a protective rose barrier blocking 1 hit and magnetically draws all orbs and drops on screen towards you.',
      effectType: 'flamenco_barrier'
    },
    passiveBonus: {
      speedMult: 0.95,
      hpBonus: 1,
      shieldBonus: 2
    }
  },
  {
    id: 'pol',
    name: 'Pol the Sweet Chef',
    title: 'The Churros Artisan',
    quote: 'Fresh sweet churros baked with passion!',
    desc: 'Pastry master who tosses candy stars and aroma bursts that distract foes.',
    avatarEmoji: '🍓👨🏼‍🍳',
    skinColor: '#FCE0CD',
    hairColor: '#795548',
    hairStyle: 'chef',
    outfitColor: '#BA68C8',
    baseHp: 5,
    baseSpeed: 230,
    specialAbility: 'Sugar Rush Confection (Sweet distraction mist & speed surge)',
    skill: {
      id: 'sugar_rush',
      name: 'Sweet Churro Surge',
      icon: '🥖',
      cooldownSec: 15,
      description: 'Tosses tempting sweet churros that distract and slow enemies by 50% for 4s while boosting your move speed by +20%.',
      effectType: 'sugar_rush'
    },
    passiveBonus: {
      speedMult: 1.0,
      scoreMult: 1.35,
      comboForgiveness: 1
    }
  }
];
