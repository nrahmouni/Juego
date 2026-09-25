import { BarrioConfig } from '../types/game';

export const BARRIOS: BarrioConfig[] = [
  // ================= 1. GRÀCIA • LEVEL A1 (Beginner) =================
  {
    id: 'gracia',
    name: 'GRÀCIA',
    subtitle: 'Plaça de la Virreina & Clock Tower',
    levelCefr: 'A1',
    levelTitle: 'LEVEL A1 • BEGINNER',
    levelDesc: 'Essential vocabulary, greetings, numbers, colors, and basic food ordering.',
    themeEmoji: '☕',
    skyGradient: ['#FFA07A', '#E85D2C', '#4A1525'],
    floorColor: '#FFE0B2',
    landmark: 'Clock Tower of Gràcia',
    landmarkSilhouette: 'gracia_clock',
    description: 'Bohemian squares, lively café terraces, and pedestrian alleys. Start your journey mastering basic Spanish!',
    funFact: 'During the Festa Major de Gràcia in August, locals handcraft spectacular themed decorations transforming entire streets.',
    hintAllowed: true,
    enemyIds: ['moto_cyber_vespa', 'coche_deportivo_bcn', 'pigeon_gracia'],
    boss1: {
      name: 'Sun Plaza Mischief Zombie',
      title: 'Terrace Monster (Question 10)',
      emoji: '🧟☀️',
      hp: 40,
      quote: 'No one learns Spanish numbers in my square!',
      bulletEmoji: '☕',
      bulletColor: '#FF7043'
    },
    boss2: {
      name: 'Grand Party Boss of Gràcia',
      title: 'Supreme Master of Gràcia (Question 20)',
      emoji: '🎭🧟',
      hp: 65,
      quote: 'The street festival of Gràcia will never end!',
      bulletEmoji: '🎈',
      bulletColor: '#E91E63'
    }
  },

  // ================= 2. BARCELONETA • LEVEL A2 (Elementary) =================
  {
    id: 'barceloneta',
    name: 'BARCELONETA',
    subtitle: 'Seaside Boardwalk & W Hotel',
    levelCefr: 'A2',
    levelTitle: 'LEVEL A2 • ELEMENTARY',
    levelDesc: 'Past simple tense, street directions, shopping, tapas ordering, and daily routines.',
    themeEmoji: '🏖️',
    skyGradient: ['#7ED6DF', '#1E3799', '#0C2461'],
    floorColor: '#B2EBF2',
    landmark: 'Sail of Hotel W and Chiringuitos',
    landmarkSilhouette: 'barceloneta_w',
    description: 'Mediterranean sea breeze, aromas of seafood paella, and mischievous seagulls scavenging tapas.',
    funFact: 'Barceloneta was originally an 18th-century fishermen neighborhood built on land reclaimed from the sea.',
    hintAllowed: true,
    enemyIds: ['gaviota_ladrona', 'cangrejo_playero', 'surfista_esqueleto'],
    boss1: {
      name: 'Port Vell Zombie Sailor',
      title: 'Spectral Captain (Question 10)',
      emoji: '⚓🧟',
      hp: 55,
      quote: 'Learn to order at the beach bar or walk the plank!',
      bulletEmoji: '🌊',
      bulletColor: '#00BCD4'
    },
    boss2: {
      name: 'Barceloneta Zombie Kraken',
      title: 'Abyssal Mediterranean Leviathan (Question 20)',
      emoji: '🐙🧟',
      hp: 90,
      quote: 'The Barcelona sea shall be your grave!',
      bulletEmoji: '🫧',
      bulletColor: '#0288D1'
    }
  },

  // ================= 3. EIXAMPLE • LEVEL B1 (Intermediate) =================
  {
    id: 'eixample',
    name: 'EIXAMPLE',
    subtitle: 'Modernist Grid & Sagrada Família',
    levelCefr: 'B1',
    levelTitle: 'LEVEL B1 • INTERMEDIATE',
    levelDesc: 'Basic subjunctive, expressing opinions, future plans, and past tense contrasts.',
    themeEmoji: '🏛️',
    skyGradient: ['#F3A683', '#CF6A87', '#303952'],
    floorColor: '#E1BEE7',
    landmark: 'Towers of Sagrada Família',
    landmarkSilhouette: 'sagrada_familia',
    description: 'Iconic octagonal chamfered blocks, whimsical modernist facades, and stone gargoyles coming alive.',
    funFact: 'Ildefons Cerdà designed the Eixample in 1859 with 45-degree chamfered corners to accommodate future steam trams turning corners.',
    hintAllowed: true,
    enemyIds: ['gargola_gotica', 'coche_deportivo_bcn', 'automata_gaudi'],
    boss1: {
      name: 'Modernist Zombie Gargoyle',
      title: 'Stone Sentinel (Question 10)',
      emoji: '🏛️🧟',
      hp: 75,
      quote: 'I doubt you know how to conjugate the subjunctive properly!',
      bulletEmoji: '🧱',
      bulletColor: '#AB47BC'
    },
    boss2: {
      name: 'Mechanical Colossus of Gaudí',
      title: 'Master of Geometric Architecture (Question 20)',
      emoji: '⚙️🧟',
      hp: 120,
      quote: 'My organic curves will crush your grammatical doubts!',
      bulletEmoji: '✨',
      bulletColor: '#9C27B0'
    }
  },

  // ================= 4. POBLENOU & 22@ • LEVEL B2 (Upper Intermediate) =================
  {
    id: 'poblenou',
    name: 'POBLENOU & 22@',
    subtitle: 'Tech Hub & Torre Glòries',
    levelCefr: 'B2',
    levelTitle: 'LEVEL B2 • UPPER INTERMEDIATE',
    levelDesc: 'Advanced subjunctive clauses, passive voice, discourse connectors, and conditional hypotheses.',
    themeEmoji: '📡',
    skyGradient: ['#38ef7d', '#11998e', '#051923'],
    floorColor: '#C8E6C9',
    landmark: 'Torre Glòries & Design Museum Hub',
    landmarkSilhouette: 'poblenou_factory',
    description: 'Former factories converted into tech hubs, design academies, and rogue AI drones roaming the 22@ district.',
    funFact: 'Known in the 19th century as the "Catalan Manchester" for its dense textile industry, now transformed into Barcelona\'s innovation district.',
    hintAllowed: true,
    enemyIds: ['cyber_drone', 'patinete_laser', 'automata_gaudi'],
    boss1: {
      name: 'Cyber-Zombie of Torre Glòries',
      title: 'Digital Signal Corruptor (Question 10)',
      emoji: '📡🧟',
      hp: 100,
      quote: '404: Subjunctive sentence not found in your memory cache!',
      bulletEmoji: '⚡',
      bulletColor: '#00E676'
    },
    boss2: {
      name: 'Corrupted AI Mega-Brain 22@',
      title: 'Neural Overlord of Silicon Barcelona (Question 20)',
      emoji: '🤖🧟',
      hp: 155,
      quote: 'Calculating probability of your victory... 0.00%!',
      bulletEmoji: '💻',
      bulletColor: '#00C853'
    }
  },

  // ================= 5. EL RAVAL • LEVEL C1 (Advanced) =================
  {
    id: 'raval',
    name: 'EL RAVAL',
    subtitle: 'MACBA & Carrer de la Cera',
    levelCefr: 'C1',
    levelTitle: 'LEVEL C1 • ADVANCED',
    levelDesc: 'Authentic local slang, idiomatic expressions, cultural nuances, and complex concession clauses.',
    themeEmoji: '🔥',
    skyGradient: ['#ff416c', '#8a2387', '#1e0538'],
    floorColor: '#FFCDD2',
    landmark: 'MACBA Skaters & Rambla del Raval Cat',
    landmarkSilhouette: 'raval_macba',
    description: 'Bohemian artistic pulse, multicultural rhythms, skaters at MACBA, and fire-breathing Correfoc devils.',
    funFact: 'Fernando Botero\'s famous oversized bronze Cat on Rambla del Raval has changed locations several times before finding its permanent home.',
    hintAllowed: true,
    enemyIds: ['diablo_correfoc', 'murcielago_macba', 'moto_cyber_vespa'],
    boss1: {
      name: 'Grand Devil of the Correfoc',
      title: 'Pyrotechnic Lord of Fire (Question 10)',
      emoji: '🔥🧟',
      hp: 130,
      quote: 'Face the sparks of true Spanish idioms!',
      bulletEmoji: '🧨',
      bulletColor: '#FF3D00'
    },
    boss2: {
      name: 'Spectral Shadow of El Raval',
      title: 'Phantom of Nocturnal Barcelona (Question 20)',
      emoji: '👤🧟',
      hp: 195,
      quote: 'Only those with native-level mastery can overcome this shadow!',
      bulletEmoji: '🔮',
      bulletColor: '#D50000'
    }
  },

  // ================= 6. MONTJUÏC • LEVEL C2 (Mastery) =================
  {
    id: 'montjuic',
    name: 'MONTJUÏC',
    subtitle: 'Montjuïc Castle & Magic Fountain',
    levelCefr: 'C2',
    levelTitle: 'LEVEL C2 • MASTERY',
    levelDesc: 'Classical proverbs, rhetorical precision, archaic expressions, and high literary fluency.',
    themeEmoji: '👑',
    skyGradient: ['#f7971e', '#ffd200', '#2c3e50'],
    floorColor: '#FFF9C4',
    landmark: 'Montjuïc Fortress & Olympic Stadium',
    landmarkSilhouette: 'montjuic_castle',
    description: 'The mountain of history, panoramic views over the Mediterranean, and the ultimate test of Spanish mastery.',
    funFact: 'Montjuïc hosted both the 1929 International Exposition and the iconic 1992 Olympic Games.',
    hintAllowed: false,
    enemyIds: ['dragon_gaudi', 'golem_montjuic', 'diablo_correfoc'],
    boss1: {
      name: 'Trencadís Titan Dragon',
      title: 'Guardian of the Royal Hill (Question 10)',
      emoji: '🐉🧟',
      hp: 170,
      quote: 'You must possess poetic elegance to cross my drawbridge!',
      bulletEmoji: '💎',
      bulletColor: '#FFD700'
    },
    boss2: {
      name: 'Zombie Emperor of Catalonia',
      title: 'Supreme Lord of All Barcelona (Question 20)',
      emoji: '👑🧟',
      hp: 250,
      quote: 'Bow before the eternal master of Hispanic grammar!',
      bulletEmoji: '🌟',
      bulletColor: '#FFA000'
    }
  }
];
