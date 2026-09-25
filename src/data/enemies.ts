import { EnemyType } from '../types/game';

export interface ExtendedEnemyType extends EnemyType {
  renderType: 'dragon' | 'car' | 'moto' | 'gargoyle' | 'demon' | 'beast' | 'seagull' | 'crab' | 'drone' | 'scooter' | 'mini';
  width: number;
  height: number;
  splitsOnDeath?: boolean;
  isMini?: boolean;
}

export interface InsultQuestion {
  spanish: string;
  englishCorrect: string;
  options: [string, string, string, string];
}

export const SPANISH_INSULT_QUESTIONS: InsultQuestion[] = [
  { spanish: "¡Cabrón!", englishCorrect: "Bastard / Asshole", options: ["Bastard / Asshole", "Good gentleman", "Sunny day", "Kind friend"] },
  { spanish: "¡Gilipollas!", englishCorrect: "Dumbass / Idiot", options: ["Dumbass / Idiot", "Wise professor", "Brave hero", "Sweet pastry"] },
  { spanish: "¡Maldito seas!", englishCorrect: "Damn you / Curse you!", options: ["Damn you / Curse you!", "Blessings to you!", "Welcome home!", "Happy birthday!"] },
  { spanish: "¡Capullo!", englishCorrect: "Jackass / Jerk", options: ["Jackass / Jerk", "Cute flower", "Golden ring", "Nice cat"] },
  { spanish: "¡Hijo de perra!", englishCorrect: "Son of a bitch!", options: ["Son of a bitch!", "Dear nephew!", "Famous doctor!", "Good boy!"] },
  { spanish: "¡A tomar por culo!", englishCorrect: "Go to hell / Screw off!", options: ["Go to hell / Screw off!", "Welcome inside!", "Have a nice meal!", "Good job!"] },
  { spanish: "¡Me cago en todo!", englishCorrect: "Damn it all!", options: ["Damn it all!", "I love everyone!", "Good morning!", "Happy news!"] },
  { spanish: "¡Mierda!", englishCorrect: "Shit / Crap!", options: ["Shit / Crap!", "Awesome!", "Delicious juice!", "Gold coin!"] },
  { spanish: "¡Pelagatos!", englishCorrect: "Nobody / Scumbag", options: ["Nobody / Scumbag", "Millionaire", "Cat trainer", "Famous mayor"] },
  { spanish: "¡Sabandija!", englishCorrect: "Vermin / Creep", options: ["Vermin / Creep", "Pretty bird", "Kind teacher", "Cute panda"] },
  { spanish: "¡Pringado!", englishCorrect: "Loser / Sucker", options: ["Loser / Sucker", "Big winner", "Fast runner", "Smart scholar"] },
  { spanish: "¡Tonto del bote!", englishCorrect: "Utter fool / Complete idiot", options: ["Utter fool / Complete idiot", "Captain of ship", "Brave knight", "Rich merchant"] },
  { spanish: "¡Analfabeto!", englishCorrect: "Ignoramus / Illiterate", options: ["Ignoramus / Illiterate", "Great poet", "Language expert", "Famous writer"] },
  { spanish: "¡Mamarracho!", englishCorrect: "Ridiculous mess / Clown", options: ["Ridiculous mess / Clown", "Elegant prince", "Handsome model", "Fine artist"] },
  { spanish: "¡Fantoche!", englishCorrect: "Puppet / Show-off", options: ["Puppet / Show-off", "Honest worker", "Loyal friend", "Quiet scholar"] },
  { spanish: "¡Gorrón!", englishCorrect: "Freeloader / Sponge", options: ["Freeloader / Sponge", "Generous giver", "Hardworking chef", "Big donor"] },
  { spanish: "¡Sinvergüenza!", englishCorrect: "Scoundrel / Shameless creature", options: ["Scoundrel / Shameless creature", "Shy child", "Modest lady", "Humble monk"] },
  { spanish: "¡Bocazas!", englishCorrect: "Big mouth / Loudmouth", options: ["Big mouth / Loudmouth", "Silent ninja", "Gentle speaker", "Good listener"] },
  { spanish: "¡Fantasma!", englishCorrect: "Braggart / Fake show-off", options: ["Braggart / Fake show-off", "Real hero", "True warrior", "Silent monk"] },
  { spanish: "¡Cara dura!", englishCorrect: "Cheeky bastard / Brazen face", options: ["Cheeky bastard / Brazen face", "Soft pillow", "Friendly neighbor", "Polite guest"] },
  { spanish: "¡Creído!", englishCorrect: "Arrogant snob / Stuck-up", options: ["Arrogant snob / Stuck-up", "Humble servant", "Kind stranger", "Sweet grandmother"] },
  { spanish: "¡Zoquete!", englishCorrect: "Blockhead / Numbskull", options: ["Blockhead / Numbskull", "Genius scientist", "Sharp detective", "Wise judge"] },
  { spanish: "¡Caraculo!", englishCorrect: "Buttface / Ugly mug", options: ["Buttface / Ugly mug", "Pretty angel", "Cute kitten", "Lovely flower"] },
  { spanish: "¡Zángano!", englishCorrect: "Lazy parasite / Slacker", options: ["Lazy parasite / Slacker", "Busy bee", "Hard worker", "Early riser"] },
  { spanish: "¡Cagalindes!", englishCorrect: "Coward / Scaredy-cat", options: ["Coward / Scaredy-cat", "Fearless lion", "Brave knight", "Mighty champion"] },
  { spanish: "¡Mala pécora!", englishCorrect: "Nasty beast / Vicious soul", options: ["Nasty beast / Vicious soul", "Sweet lamb", "Kind angel", "Good soul"] },
  { spanish: "¡Mendrugo!", englishCorrect: "Blockhead / Thickhead", options: ["Blockhead / Thickhead", "Fresh bread", "Sharp intellect", "Fast thinker"] },
  { spanish: "¡Peinabombillas!", englishCorrect: "Useless fool / Nitwit", options: ["Useless fool / Nitwit", "Electrician", "Hair stylist", "Smart engineer"] },
  { spanish: "¡Lameculos!", englishCorrect: "Bootlicker / Ass-kisser", options: ["Bootlicker / Ass-kisser", "Independent thinker", "Brave leader", "Proud warrior"] },
  { spanish: "¡Piedra dura!", englishCorrect: "Stubborn mule / Brickhead", options: ["Stubborn mule / Brickhead", "Flexible dancer", "Soft cotton", "Gentle breeze"] },
  { spanish: "¡Chulapo venido a menos!", englishCorrect: "Arrogant poser / Has-been", options: ["Arrogant poser / Has-been", "Dapper gentleman", "Famous star", "Rich baron"] },
  { spanish: "¡Cagao!", englishCorrect: "Scaredy-cat / Coward", options: ["Scaredy-cat / Coward", "Mighty hero", "Brave captain", "Strong warrior"] },
  { spanish: "¡Pusilánime!", englishCorrect: "Weakling / Spineless coward", options: ["Weakling / Spineless coward", "Strong Hercules", "Fearless leader", "Mighty giant"] },
  { spanish: "¡Bocazas insoportable!", englishCorrect: "Insufferable loudmouth", options: ["Insufferable loudmouth", "Quiet angel", "Polite speaker", "Gentle friend"] },
  { spanish: "¡Gordinflas!", englishCorrect: "Tubby / Heavyweight fool", options: ["Tubby / Heavyweight fool", "Slender runner", "Agile gymnast", "Fast sprinter"] },
  { spanish: "¡Cenutrio!", englishCorrect: "Numbskull / Dunderhead", options: ["Numbskull / Dunderhead", "Brilliant scholar", "Wise philosopher", "Sharp mind"] },
  { spanish: "¡Engreído!", englishCorrect: "Self-important / Conceited fool", options: ["Self-important / Conceited fool", "Humble helper", "Modest servant", "Kind friend"] },
  { spanish: "¡Bocazas tramposo!", englishCorrect: "Cheating loudmouth", options: ["Cheating loudmouth", "Fair referee", "Honest player", "True sportsman"] },
  { spanish: "¡Malandrín!", englishCorrect: "Rogue / Scoundrel", options: ["Rogue / Scoundrel", "Honorable judge", "Noble knight", "Kind priest"] },
  { spanish: "¡Bellaco!", englishCorrect: "Wicked rogue / Villain", options: ["Wicked rogue / Villain", "Good Samaritan", "Holy saint", "Pure soul"] },
  { spanish: "¡Rufián!", englishCorrect: "Ruffian / Lowlife villain", options: ["Ruffian / Lowlife villain", "Gentle prince", "Peacekeeper", "Kind monk"] },
  { spanish: "¡Zafio!", englishCorrect: "Uncouth brute / Boor", options: ["Uncouth brute / Boor", "Charming host", "Polite gentleman", "Refined artist"] },
  { spanish: "¡Tarado!", englishCorrect: "Nutjob / Lunatic", options: ["Nutjob / Lunatic", "Sane professor", "Logical thinker", "Calm philosopher"] },
  { spanish: "¡Majadero!", englishCorrect: "Foolish pest / Simpleton", options: ["Foolish pest / Simpleton", "Wise old teacher", "Smart advisor", "Clever king"] },
  { spanish: "¡Mequetrefe!", englishCorrect: "Good-for-nothing / Pipsqueak", options: ["Good-for-nothing / Pipsqueak", "Mighty general", "Famous hero", "Great ruler"] },
  { spanish: "¡Tonto a las tres!", englishCorrect: "Complete dummy / Utter fool", options: ["Complete dummy / Utter fool", "Clockmaker", "Punctual worker", "Wise thinker"] },
  { spanish: "¡Sinoficio!", englishCorrect: "Idle good-for-nothing", options: ["Idle good-for-nothing", "Master craftsman", "Hardworking mayor", "Busy doctor"] },
  { spanish: "¡Chusma!", englishCorrect: "Rabble / Scum", options: ["Rabble / Scum", "High nobility", "Royal court", "Honored guests"] },
  { spanish: "¡Basura!", englishCorrect: "Trash / Human garbage", options: ["Trash / Human garbage", "Pure gold", "Precious jewel", "Fine treasure"] },
  { spanish: "¡Maldito engendro!", englishCorrect: "Cursed spawn / Monstrosity", options: ["Cursed spawn / Monstrosity", "Blessed child", "Sweet baby angel", "Beautiful creation"] }
];

export const SPANISH_MONSTER_CURSES = SPANISH_INSULT_QUESTIONS.map(q => q.spanish);

export function getShuffledInsultQuestion(q: InsultQuestion): InsultQuestion {
  const optionsCopy = [...q.options];

  // Fisher-Yates Shuffle
  for (let i = optionsCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = optionsCopy[i];
    optionsCopy[i] = optionsCopy[j];
    optionsCopy[j] = temp;
  }

  return {
    ...q,
    options: optionsCopy as [string, string, string, string]
  };
}

export const ENEMY_ROSTER: ExtendedEnemyType[] = [
  // ================= 1. GRÀCIA (A1) =================
  {
    id: 'pigeon_gracia',
    name: 'Paloma de la Virreina',
    description: 'Paloma de plaza veloz que esquiva proyectiles.',
    color: '#9E9E9E',
    speed: 110, // Fast scout
    hp: 40, // 1 Shot
    emoji: '🕊️',
    size: 34,
    width: 50,
    height: 34,
    scoreValue: 180,
    attackDamage: 0.5,
    renderType: 'seagull'
  },
  {
    id: 'gato_tejados',
    name: 'Gato Callejero de Gràcia',
    description: 'Ágil felino nocturno saltarín.',
    color: '#FF9800',
    speed: 80, // Medium fast
    hp: 90, // 2 Shots
    emoji: '🐈',
    size: 38,
    width: 54,
    height: 36,
    scoreValue: 200,
    attackDamage: 0.5,
    renderType: 'beast'
  },
  {
    id: 'moto_cyber_vespa',
    name: 'Moto Vespa de Gràcia',
    description: 'Una moto estilizada cruzando las plazas.',
    color: '#E91E63',
    speed: 62, // Medium
    hp: 135, // 3 Shots
    emoji: '🛵',
    size: 44,
    width: 64,
    height: 38,
    scoreValue: 220,
    attackDamage: 0.5,
    renderType: 'moto'
  },
  {
    id: 'coche_deportivo_bcn',
    name: 'Bólido Taxi BCN',
    description: 'Un gran taxi amarillo y negro con faros brillantes.',
    color: '#FFD600',
    speed: 40, // Slow heavy car
    hp: 220, // 5 Shots
    emoji: '🚕',
    size: 52,
    width: 76,
    height: 44,
    scoreValue: 250,
    attackDamage: 0.5,
    renderType: 'car'
  },

  // ================= 2. BARCELONETA (A2) =================
  {
    id: 'gaviota_ladrona',
    name: 'Gaviota Ladrona de Tapas',
    description: 'Vuela en picado para arrebatar bravas y chipirones.',
    color: '#00BCD4',
    speed: 115, // Very fast
    hp: 18,
    emoji: '🦅',
    size: 38,
    width: 58,
    height: 38,
    scoreValue: 240,
    attackDamage: 0.5,
    renderType: 'seagull'
  },
  {
    id: 'surfista_esqueleto',
    name: 'Surfista Zombi del Mediterráneo',
    description: 'Navega en tabla de surf veloz sobre la arena.',
    color: '#0288D1',
    speed: 75,
    hp: 26,
    emoji: '🏄',
    size: 46,
    width: 68,
    height: 46,
    scoreValue: 270,
    attackDamage: 0.5,
    renderType: 'moto'
  },
  {
    id: 'cangrejo_playero',
    name: 'Cangrejo Titan del Chiringuito',
    description: 'Cangrejo con pinzas blindadas. ¡Al morir se divide!',
    color: '#FF5722',
    speed: 38, // Heavy tank
    hp: 36,
    emoji: '🦀',
    size: 56,
    width: 80,
    height: 56,
    scoreValue: 300,
    attackDamage: 0.5,
    renderType: 'crab',
    splitsOnDeath: true
  },
  {
    id: 'tiburon_barceloneta',
    name: 'Gran Tiburón Costero',
    description: 'Depredador gigante con dentadura afilada.',
    color: '#0277BD',
    speed: 48,
    hp: 44,
    emoji: '🦈',
    size: 64,
    width: 90,
    height: 58,
    scoreValue: 340,
    attackDamage: 0.5,
    renderType: 'beast'
  },

  // ================= 3. EIXAMPLE (B1) =================
  {
    id: 'murcielago_eixample',
    name: 'Murciélago del Chaflán',
    description: 'Vuela en zigzag entre los chaflanes modernistas.',
    color: '#9C27B0',
    speed: 120, // Ultra fast bat
    hp: 30,
    emoji: '🦇',
    size: 38,
    width: 54,
    height: 38,
    scoreValue: 320,
    attackDamage: 0.5,
    renderType: 'gargoyle'
  },
  {
    id: 'gargola_gotica',
    name: 'Gárgola Modernista',
    description: 'Estatua de piedra alada. ¡Se divide al morir!',
    color: '#7E57C2',
    speed: 58,
    hp: 42,
    emoji: '🗿',
    size: 48,
    width: 70,
    height: 52,
    scoreValue: 350,
    attackDamage: 0.5,
    renderType: 'gargoyle',
    splitsOnDeath: true
  },
  {
    id: 'automata_gaudi',
    name: 'Autómata Blindado de Cerdà',
    description: 'Robot mecánico a vapor monumental que patrulla el distrito.',
    color: '#AB47BC',
    speed: 36, // Slow armored tank
    hp: 58,
    emoji: '⚙️',
    size: 58,
    width: 82,
    height: 60,
    scoreValue: 380,
    attackDamage: 0.5,
    renderType: 'beast'
  },
  {
    id: 'dragon_pedrera',
    name: 'Dragón de La Pedrera',
    description: 'Dragón cerámico con escamas trencadís gigantes.',
    color: '#00897B',
    speed: 42,
    hp: 68,
    emoji: '🐲',
    size: 68,
    width: 96,
    height: 68,
    scoreValue: 420,
    attackDamage: 0.5,
    renderType: 'dragon'
  },

  // ================= 4. POBLENOU & 22@ (B2) =================
  {
    id: 'cyber_drone',
    name: 'Cyber-Drone 22@',
    description: 'Dron de vigilancia superveloz.',
    color: '#00E5FF',
    speed: 130, // Extremely fast drone
    hp: 44,
    emoji: '🛸',
    size: 40,
    width: 58,
    height: 38,
    scoreValue: 380,
    attackDamage: 0.5,
    renderType: 'drone'
  },
  {
    id: 'patinete_laser',
    name: 'Patinete Eléctrico Turbo',
    description: 'Patinete autónomo a toda velocidad sin frenos.',
    color: '#76FF03',
    speed: 125, // Super fast scooter
    hp: 52,
    emoji: '🛴',
    size: 44,
    width: 64,
    height: 38,
    scoreValue: 400,
    attackDamage: 0.5,
    renderType: 'scooter'
  },
  {
    id: 'robot_chatarrero',
    name: 'Robot Industrial Textil',
    description: 'Telar cibernético blindado. ¡Se divide en mini drones!',
    color: '#3F51B5',
    speed: 35, // Slow industrial robot
    hp: 72,
    emoji: '🤖',
    size: 60,
    width: 84,
    height: 64,
    scoreValue: 450,
    attackDamage: 0.5,
    renderType: 'beast',
    splitsOnDeath: true
  },
  {
    id: 'mech_cibernetico',
    name: 'Titán Mech del 22@',
    description: 'Bípedo cibernético gigante con escudo láser.',
    color: '#304FFE',
    speed: 38,
    hp: 88,
    emoji: '🦿',
    size: 70,
    width: 98,
    height: 72,
    scoreValue: 500,
    attackDamage: 0.5,
    renderType: 'beast'
  },

  // ================= 5. EL RAVAL (C1) =================
  {
    id: 'bruja_boqueria',
    name: 'Bruja de la Boqueria',
    description: 'Lanza pociones y esquiva tus disparos.',
    color: '#9C27B0',
    speed: 85,
    hp: 76,
    emoji: '🧙‍♀️',
    size: 48,
    width: 68,
    height: 52,
    scoreValue: 460,
    attackDamage: 0.5,
    renderType: 'demon'
  },
  {
    id: 'demonio_correfoc',
    name: 'Diablo del Correfoc',
    description: 'Demonio con tridente de chispas y capa carmesí.',
    color: '#D50000',
    speed: 90,
    hp: 84,
    emoji: '👹',
    size: 52,
    width: 72,
    height: 58,
    scoreValue: 490,
    attackDamage: 0.5,
    renderType: 'demon'
  },
  {
    id: 'sombra_raval',
    name: 'Espectro Nocturno del Raval',
    description: 'Sombra veloz. ¡Se divide en miniespectros!',
    color: '#8E24AA',
    speed: 115, // Fast phantom
    hp: 96,
    emoji: '👤',
    size: 44,
    width: 62,
    height: 50,
    scoreValue: 520,
    attackDamage: 0.5,
    renderType: 'gargoyle',
    splitsOnDeath: true
  },
  {
    id: 'minotauro_ramblas',
    name: 'Minotauro de Las Ramblas',
    description: 'Bestia monumental con cuernos de acero.',
    color: '#3E2723',
    speed: 36, // Slow menacing minotaur
    hp: 112,
    emoji: '🐂',
    size: 68,
    width: 94,
    height: 70,
    scoreValue: 580,
    attackDamage: 0.5,
    renderType: 'beast'
  },

  // ================= 6. MONTJUÏC (C2) =================
  {
    id: 'fenix_fuente',
    name: 'Fénix Mágico de Montjuïc',
    description: 'Ave mística con llamas de mil colores.',
    color: '#FF3D00',
    speed: 105,
    hp: 108,
    emoji: '🦅',
    size: 54,
    width: 78,
    height: 58,
    scoreValue: 560,
    attackDamage: 0.5,
    renderType: 'seagull'
  },
  {
    id: 'dragon_gaudi',
    name: 'Dragón Colosal del Trencadís',
    description: 'Dragón cerámico gigante. ¡Se divide en 2 mini dragones al caer!',
    color: '#FFD700',
    speed: 42,
    hp: 125,
    emoji: '🐉',
    size: 68,
    width: 98,
    height: 72,
    scoreValue: 620,
    attackDamage: 0.5,
    renderType: 'dragon',
    splitsOnDeath: true
  },
  {
    id: 'guardian_castillo',
    name: 'Guardián del Castillo',
    description: 'Caballero espectral monumental con escudo legendario.',
    color: '#1A237E',
    speed: 35,
    hp: 140,
    emoji: '🛡️',
    size: 72,
    width: 100,
    height: 76,
    scoreValue: 680,
    attackDamage: 0.5,
    renderType: 'beast'
  },
  {
    id: 'golem_montjuic',
    name: 'Gólem de la Fortaleza',
    description: 'Titán de piedra monumental del Castillo de Montjuïc.',
    color: '#004D40',
    speed: 28, // Heavy slow golem
    hp: 165,
    emoji: '🗿',
    size: 76,
    width: 108,
    height: 80,
    scoreValue: 750,
    attackDamage: 0.5,
    renderType: 'beast'
  }
];

export const getEnemiesForBarrio = (barrioIndex: number): ExtendedEnemyType[] => {
  if (barrioIndex === 0) {
    return ENEMY_ROSTER.slice(0, 4);
  } else if (barrioIndex === 1) {
    return ENEMY_ROSTER.slice(4, 8);
  } else if (barrioIndex === 2) {
    return ENEMY_ROSTER.slice(8, 12);
  } else if (barrioIndex === 3) {
    return ENEMY_ROSTER.slice(12, 16);
  } else if (barrioIndex === 4) {
    return ENEMY_ROSTER.slice(16, 20);
  } else {
    return ENEMY_ROSTER.slice(20, 24);
  }
};
