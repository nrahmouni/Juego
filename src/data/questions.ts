import { Question } from '../types/game';

export function shuffleQuestionOptions(q: Question): Question {
  const correctText = q.options[q.correctIndex] || q.options[0];
  const optionsCopy = [...q.options];

  // Fisher-Yates Shuffle
  for (let i = optionsCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = optionsCopy[i];
    optionsCopy[i] = optionsCopy[j];
    optionsCopy[j] = temp;
  }

  const newCorrectIndex = optionsCopy.indexOf(correctText);

  return {
    ...q,
    options: optionsCopy,
    correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0
  };
}

export const ALL_QUESTIONS: Question[] = [
  // =========================================================================
  // ====================== NIVEL A1 • PRINCIPIANTE (GRÀCIA) =================
  // =========================================================================
  {
    id: 'a1_01',
    level: 'A1',
    category: 'vocab',
    question: '¿Qué significa la palabra "la casa"?',
    englishHint: 'What does "la casa" mean in English?',
    explanation: '"La casa" significa "house" o "home". Es un sustantivo femenino.',
    options: ['House', 'Car', 'Street', 'School'],
    correctIndex: 0,
    audioPhrase: 'La casa'
  },
  {
    id: 'a1_02',
    level: 'A1',
    category: 'vocab',
    question: '¿Cómo se dice "Good morning" en español?',
    englishHint: 'Common morning greeting.',
    explanation: '"Buenos días" se usa por la mañana hasta el mediodía.',
    options: ['Buenos días', 'Buenas noches', 'Hola amigo', 'Hasta luego'],
    correctIndex: 0,
    audioPhrase: 'Buenos días'
  },
  {
    id: 'a1_03',
    level: 'A1',
    category: 'vocab',
    question: '¿Qué bebida es "el agua"?',
    englishHint: 'Essential clear liquid for life.',
    explanation: '"El agua" es "water". Lleva el artículo "el" para evitar cacofonía.',
    options: ['Water', 'Wine', 'Beer', 'Juice'],
    correctIndex: 0,
    audioPhrase: 'El agua'
  },
  {
    id: 'a1_04',
    level: 'A1',
    category: 'grammar',
    question: 'Completa: "Yo _____ español todos los días."',
    englishHint: 'Conjugate "hablar" (to speak) for "yo" (I).',
    explanation: 'El presente del verbo hablar para "yo" es "hablo".',
    options: ['hablo', 'hablas', 'habla', 'hablamos'],
    correctIndex: 0,
    audioPhrase: 'Yo hablo español todos los días'
  },
  {
    id: 'a1_05',
    level: 'A1',
    category: 'vocab',
    question: '¿Cuál es el color "amarillo"?',
    englishHint: 'The color of the sun.',
    explanation: '"Amarillo" es "yellow" en inglés.',
    options: ['Yellow', 'Blue', 'Green', 'Red'],
    correctIndex: 0,
    audioPhrase: 'Amarillo'
  },
  {
    id: 'a1_06',
    level: 'A1',
    category: 'vocab',
    question: '¿Qué animal es "el gato"?',
    englishHint: 'Small feline pet that meows.',
    explanation: '"El gato" es "the cat".',
    options: ['The cat', 'The dog', 'The bird', 'The mouse'],
    correctIndex: 0,
    audioPhrase: 'El gato'
  },
  {
    id: 'a1_07',
    level: 'A1',
    category: 'tapas',
    question: '¿Qué son las "patatas bravas"?',
    englishHint: 'Famous Barcelona spicy potato tapa.',
    explanation: 'Son dados de patatas fritas con salsa picante y alioli.',
    options: ['Fried potatoes with spicy sauce', 'Mashed potatoes', 'Boiled potato salad', 'Potato chips'],
    correctIndex: 0,
    audioPhrase: 'Patatas bravas'
  },
  {
    id: 'a1_08',
    level: 'A1',
    category: 'grammar',
    question: 'Completa: "Ella _____ de Barcelona."',
    englishHint: 'Verb "ser" for origin (She is from Barcelona).',
    explanation: 'Para la tercera persona singular (ella) se usa "es".',
    options: ['es', 'está', 'son', 'eres'],
    correctIndex: 0,
    audioPhrase: 'Ella es de Barcelona'
  },
  {
    id: 'a1_09',
    level: 'A1',
    category: 'vocab',
    question: '¿Qué número es "ocho"?',
    englishHint: 'Comes between 7 and 9.',
    explanation: '"Ocho" es el número 8 en español.',
    options: ['8', '6', '7', '9'],
    correctIndex: 0,
    audioPhrase: 'Ocho'
  },
  {
    id: 'a1_10',
    level: 'A1',
    category: 'vocab',
    question: '¿Cómo se dice "Thank you very much"?',
    englishHint: 'Polite expression of gratitude.',
    explanation: '"Muchas gracias" significa "thank you very much".',
    options: ['Muchas gracias', 'Por favor', 'De nada', 'Disculpe'],
    correctIndex: 0,
    audioPhrase: 'Muchas gracias'
  },
  {
    id: 'a1_11',
    level: 'A1',
    category: 'directions',
    question: '¿Qué significa "la calle"?',
    englishHint: 'Public thoroughfare in a town or city.',
    explanation: '"La calle" es "the street" en inglés.',
    options: ['The street', 'The square', 'The beach', 'The station'],
    correctIndex: 0,
    audioPhrase: 'La calle'
  },
  {
    id: 'a1_12',
    level: 'A1',
    category: 'grammar',
    question: 'Completa: "Nosotros _____ en un piso en Gràcia."',
    englishHint: 'Conjugate "vivir" (to live) for "nosotros" (we).',
    explanation: 'La forma de "nosotros" del verbo vivir es "vivimos".',
    options: ['vivimos', 'viven', 'vivo', 'vivís'],
    correctIndex: 0,
    audioPhrase: 'Nosotros vivimos en un piso en Gràcia'
  },
  {
    id: 'a1_13',
    level: 'A1',
    category: 'vocab',
    question: '¿Qué significa "el libro"?',
    englishHint: 'Written work with printed pages.',
    explanation: '"El libro" es "the book".',
    options: ['The book', 'The paper', 'The table', 'The pen'],
    correctIndex: 0,
    audioPhrase: 'El libro'
  },
  {
    id: 'a1_14',
    level: 'A1',
    category: 'culture',
    question: '¿Cómo saludas de forma informal a un amigo?',
    englishHint: 'Informal "Hi / Hello".',
    explanation: '"Hola" es el saludo más universal en español.',
    options: ['¡Hola!', '¡Adiós!', '¡Buenas noches!', '¡Perdón!'],
    correctIndex: 0,
    audioPhrase: 'Hola'
  },
  {
    id: 'a1_15',
    level: 'A1',
    category: 'vocab',
    question: '¿Cómo se dice "apple" en español?',
    englishHint: 'Common red or green fruit.',
    explanation: '"La manzana" significa "apple".',
    options: ['La manzana', 'El plátano', 'La naranja', 'El limón'],
    correctIndex: 0,
    audioPhrase: 'La manzana'
  },
  {
    id: 'a1_16',
    level: 'A1',
    category: 'grammar',
    question: '¿Cuál es el artículo correcto?: "_____ mesa grande"',
    englishHint: '"Mesa" is a feminine singular noun.',
    explanation: 'Los sustantivos femeninos singulares llevan "La".',
    options: ['La', 'El', 'Los', 'Las'],
    correctIndex: 0,
    audioPhrase: 'La mesa grande'
  },
  {
    id: 'a1_17',
    level: 'A1',
    category: 'vocab',
    question: '¿Qué significa "adiós"?',
    englishHint: 'Farewell greeting.',
    explanation: '"Adiós" significa "goodbye".',
    options: ['Goodbye', 'Please', 'Welcome', 'Excuse me'],
    correctIndex: 0,
    audioPhrase: 'Adiós'
  },
  {
    id: 'a1_18',
    level: 'A1',
    category: 'vocab',
    question: '¿Cuál es el número "veinte"?',
    englishHint: 'Double of ten (10 x 2).',
    explanation: '"Veinte" es el número 20.',
    options: ['20', '12', '2', '200'],
    correctIndex: 0,
    audioPhrase: 'Veinte'
  },
  {
    id: 'a1_19',
    level: 'A1',
    category: 'grammar',
    question: 'Completa: "¿Cómo te _____ tú?"',
    englishHint: 'Asking someone their name.',
    explanation: '"¿Cómo te llamas?" es la fórmula para preguntar el nombre.',
    options: ['llamas', 'llama', 'llamo', 'llaman'],
    correctIndex: 0,
    audioPhrase: '¿Cómo te llamas tú?'
  },
  {
    id: 'a1_20',
    level: 'A1',
    category: 'vocab',
    question: '¿Qué significa "el café"?',
    englishHint: 'Popular hot roasted bean drink.',
    explanation: '"El café" es "the coffee".',
    options: ['The coffee', 'The tea', 'The milk', 'The water'],
    correctIndex: 0,
    audioPhrase: 'El café'
  },

  // =========================================================================
  // ====================== NIVEL A2 • ELEMENTAL (BARCELONETA) ===============
  // =========================================================================
  {
    id: 'a2_01',
    level: 'A2',
    category: 'grammar',
    question: 'Ayer yo _____ una paella deliciosa en el puerto.',
    englishHint: 'Past simple (pretérito indefinido) of "comer" for "yo".',
    explanation: 'El pretérito indefinido de "comer" para "yo" es "comí".',
    options: ['comí', 'como', 'comía', 'comeré'],
    correctIndex: 0,
    audioPhrase: 'Ayer yo comí una paella deliciosa en el puerto'
  },
  {
    id: 'a2_02',
    level: 'A2',
    category: 'directions',
    question: '¿Qué significa "gira a la izquierda"?',
    englishHint: 'Direction indicating a turn to the left.',
    explanation: '"A la izquierda" significa "to the left".',
    options: ['Turn left', 'Turn right', 'Go straight', 'Stop here'],
    correctIndex: 0,
    audioPhrase: 'Gira a la izquierda'
  },
  {
    id: 'a2_03',
    level: 'A2',
    category: 'tapas',
    question: 'En un bar, ¿qué pides cuando dices: "Una caña, por favor"?',
    englishHint: 'A standard small draft beer in Spain.',
    explanation: 'Una "caña" es un vaso de cerveza de barril recién tirada.',
    options: ['A draft beer', 'A glass of red wine', 'A black coffee', 'A soda'],
    correctIndex: 0,
    audioPhrase: 'Una caña, por favor'
  },
  {
    id: 'a2_04',
    level: 'A2',
    category: 'grammar',
    question: '¿Ser o Estar? "La playa de la Barceloneta _____ muy cerca."',
    englishHint: 'For physical location, always use "estar".',
    explanation: 'Para indicar ubicación geográfica o espacial se usa "estar".',
    options: ['está', 'es', 'hay', 'tiene'],
    correctIndex: 0,
    audioPhrase: 'La playa de la Barceloneta está muy cerca'
  },
  {
    id: 'a2_05',
    level: 'A2',
    category: 'vocab',
    question: '¿Qué significa "el desayuno"?',
    englishHint: 'The first meal of the day.',
    explanation: '"Desayuno" es breakfast en inglés.',
    options: ['Breakfast', 'Lunch', 'Dinner', 'Afternoon snack'],
    correctIndex: 0,
    audioPhrase: 'El desayuno'
  },
  {
    id: 'a2_06',
    level: 'A2',
    category: 'grammar',
    question: 'El fin de semana pasado mis amigos _____ a la playa.',
    englishHint: 'Preterite of "ir" (to go) for "ellos" (they).',
    explanation: 'El pretérito indefinido del verbo ir para "ellos" es "fueron".',
    options: ['fueron', 'iban', 'van', 'irán'],
    correctIndex: 0,
    audioPhrase: 'El fin de semana pasado mis amigos fueron a la playa'
  },
  {
    id: 'a2_07',
    level: 'A2',
    category: 'tapas',
    question: '¿Qué ingrediente principal tiene el "pa amb tomàquet"?',
    englishHint: 'Traditional Catalan bread with tomato and olive oil.',
    explanation: 'Es pan tostado untado con tomate fresco maduro, aceite de oliva y sal.',
    options: ['Bread rubbed with fresh tomato & olive oil', 'Bread with melted cheese', 'Sweet pastry with cream', 'Sandwich with mayonnaise'],
    correctIndex: 0,
    audioPhrase: 'Pa amb tomàquet'
  },
  {
    id: 'a2_08',
    level: 'A2',
    category: 'grammar',
    question: 'Completa: "¿Cuánto _____ estos zapatos?"',
    englishHint: '"Zapatos" is plural.',
    explanation: 'Como "zapatos" es plural, el verbo costar va en plural: "cuestan".',
    options: ['cuestan', 'cuesta', 'costó', 'costaría'],
    correctIndex: 0,
    audioPhrase: '¿Cuánto cuestan estos zapatos?'
  },
  {
    id: 'a2_09',
    level: 'A2',
    category: 'vocab',
    question: '¿Cómo pides la cuenta al camarero?',
    englishHint: 'Asking for the bill at a restaurant.',
    explanation: '"La cuenta, por favor" es la frase habitual para pedir la cuenta.',
    options: ['La cuenta, por favor', 'La carta, por favor', 'El menú, gracias', 'La comida, rápido'],
    correctIndex: 0,
    audioPhrase: 'La cuenta, por favor'
  },
  {
    id: 'a2_10',
    level: 'A2',
    category: 'grammar',
    question: 'Cuando era niño, siempre _____ en bicicleta por el barrio.',
    englishHint: 'Imperfect tense for habitual past actions of "montar".',
    explanation: 'Para acciones habituales en el pasado se usa el pretérito imperfecto: "montaba".',
    options: ['montaba', 'monté', 'monto', 'montaré'],
    correctIndex: 0,
    audioPhrase: 'Cuando era niño, siempre montaba en bicicleta'
  },
  {
    id: 'a2_11',
    level: 'A2',
    category: 'directions',
    question: '¿Qué significa "todo recto"?',
    englishHint: 'Keep moving in a straight forward line.',
    explanation: '"Todo recto" significa "straight ahead".',
    options: ['Straight ahead', 'Turn around', 'Turn right', 'Stop here'],
    correctIndex: 0,
    audioPhrase: 'Todo recto'
  },
  {
    id: 'a2_12',
    level: 'A2',
    category: 'vocab',
    question: '¿Qué tiempo hace si dices "hace mucho calor"?',
    englishHint: 'Summer Mediterranean weather.',
    explanation: '"Hace calor" significa "it is hot".',
    options: ['It is very hot', 'It is raining', 'It is freezing cold', 'It is windy'],
    correctIndex: 0,
    audioPhrase: 'Hace mucho calor'
  },
  {
    id: 'a2_13',
    level: 'A2',
    category: 'grammar',
    question: 'Completa: "Mañana nosotros _____ al cine."',
    englishHint: 'Near future: "ir a + infinitivo" (vamos a ir).',
    explanation: '"Nosotros vamos a ir" expresa el futuro próximo.',
    options: ['vamos a ir', 'fuimos', 'íbamos', 'ir'],
    correctIndex: 0,
    audioPhrase: 'Mañana nosotros vamos a ir al cine'
  },
  {
    id: 'a2_14',
    level: 'A2',
    category: 'vocab',
    question: '¿Qué es "el billete de metro"?',
    englishHint: 'Ticket to ride the subway train.',
    explanation: '"El billete de metro" es the subway ticket.',
    options: ['The subway ticket', 'The flight boarding pass', 'The money bill', 'The receipt'],
    correctIndex: 0,
    audioPhrase: 'El billete de metro'
  },
  {
    id: 'a2_15',
    level: 'A2',
    category: 'tapas',
    question: '¿Qué son los "chipirones"?',
    englishHint: 'Small fried or grilled squid.',
    explanation: 'Los chipirones son calamares pequeños, muy típicos fritos en la Barceloneta.',
    options: ['Small baby squids', 'Spicy chicken wings', 'Fried mushrooms', 'Marinated pork ribs'],
    correctIndex: 0,
    audioPhrase: 'Los chipirones'
  },
  {
    id: 'a2_16',
    level: 'A2',
    category: 'grammar',
    question: 'Completa con el pronombre: "A mí _____ gusta la paella."',
    englishHint: 'Indirect object pronoun for "a mí" with "gustar".',
    explanation: 'La estructura con el verbo gustar para "a mí" es "me gusta".',
    options: ['me', 'te', 'le', 'nos'],
    correctIndex: 0,
    audioPhrase: 'A mí me gusta la paella'
  },
  {
    id: 'a2_17',
    level: 'A2',
    category: 'vocab',
    question: '¿Qué hora es si son las "tres y media"?',
    englishHint: 'Half past three.',
    explanation: '"Las tres y media" son las 3:30.',
    options: ['3:30', '3:15', '3:45', '4:30'],
    correctIndex: 0,
    audioPhrase: 'Las tres y media'
  },
  {
    id: 'a2_18',
    level: 'A2',
    category: 'grammar',
    question: 'Completa: "Este verano yo _____ a nadar todos los días."',
    englishHint: 'Preterite of "aprender" for "yo" (I learned).',
    explanation: 'El pretérito de aprender para "yo" es "aprendí".',
    options: ['aprendí', 'aprendo', 'aprendía', 'aprender'],
    correctIndex: 0,
    audioPhrase: 'Este verano yo aprendí a nadar'
  },
  {
    id: 'a2_19',
    level: 'A2',
    category: 'vocab',
    question: '¿Qué significa "la farmacia"?',
    englishHint: 'Place where medicines are dispensed.',
    explanation: '"La farmacia" es the pharmacy / drugstore.',
    options: ['Pharmacy / Drugstore', 'Hospital clinic', 'Bakery shop', 'Grocery store'],
    correctIndex: 0,
    audioPhrase: 'La farmacia'
  },
  {
    id: 'a2_20',
    level: 'A2',
    category: 'culture',
    question: '¿A qué hora se suele cenar habitualmente en España?',
    englishHint: 'Typical late Spanish dining schedule.',
    explanation: 'En España la cena suele ser entre las 21:00 y las 22:30.',
    options: ['Entre las 21:00 y las 22:30', 'A las 17:00', 'A las 18:30', 'A las 12:00 del mediodía'],
    correctIndex: 0,
    audioPhrase: 'Cenar entre las 21:00 y las 22:30'
  },

  // =========================================================================
  // ====================== NIVEL B1 • INTERMEDIO (EIXAMPLE) ==================
  // =========================================================================
  {
    id: 'b1_01',
    level: 'B1',
    category: 'subjunctive',
    question: 'Espero que tú _____ un buen viaje a Barcelona.',
    englishHint: 'Present subjunctive of "tener" for "tú" after "espero que".',
    explanation: 'El verbo "esperar que" expresa deseo y exige subjuntivo: "tengas".',
    options: ['tengas', 'tienes', 'tendrás', 'tenías'],
    correctIndex: 0,
    audioPhrase: 'Espero que tú tengas un buen viaje a Barcelona'
  },
  {
    id: 'b1_02',
    level: 'B1',
    category: 'grammar',
    question: 'Si tuviera dinero suficiente, me _____ un piso modernista.',
    englishHint: 'Second conditional with imperfect subjunctive requires conditional simple.',
    explanation: 'La estructura "Si tuviera... + condicional simple" requiere "compraría".',
    options: ['compraría', 'compro', 'compraré', 'compré'],
    correctIndex: 0,
    audioPhrase: 'Si tuviera dinero suficiente, me compraría un piso modernista'
  },
  {
    id: 'b1_03',
    level: 'B1',
    category: 'subjunctive',
    question: 'No creo que Antoni Gaudí _____ ese edificio tan simple.',
    englishHint: 'Negative opinion ("no creo que") requires subjunctive.',
    explanation: '"No creo que" expresa duda o negación, por lo que rige subjuntivo: "diseñara / diseñase".',
    options: ['diseñara', 'diseñó', 'diseñaba', 'diseña'],
    correctIndex: 0,
    audioPhrase: 'No creo que Antoni Gaudí diseñara ese edificio'
  },
  {
    id: 'b1_04',
    level: 'B1',
    category: 'grammar',
    question: 'Por vs Para: "Este regalo es _____ mi mejor amiga."',
    englishHint: '"Para" indicates recipient or final destination.',
    explanation: '"Para" se utiliza para indicar el destinatario o propósito de un objeto.',
    options: ['para', 'por', 'de', 'hacia'],
    correctIndex: 0,
    audioPhrase: 'Este regalo es para mi mejor amiga'
  },
  {
    id: 'b1_05',
    level: 'B1',
    category: 'slang',
    question: 'En Cataluña, ¿qué significa cuando algo "mola mucho"?',
    englishHint: 'Very popular colloquial expression for "it is really cool".',
    explanation: '"Molar" significa que algo gusta mucho o es genial / guay ("it is really cool").',
    options: ['It is really cool / awesome', 'It is very boring', 'It is very expensive', 'It is completely broken'],
    correctIndex: 0,
    audioPhrase: '¡Esto mola mucho!'
  },
  {
    id: 'b1_06',
    level: 'B1',
    category: 'subjunctive',
    question: 'Te llamaré tan pronto como _____ a la Sagrada Família.',
    englishHint: 'Conjunction of time referring to a future event requires subjunctive.',
    explanation: '"Tan pronto como" con referencia al futuro exige presente de subjuntivo: "llegue".',
    options: ['llegue', 'llego', 'llegaré', 'llegaba'],
    correctIndex: 0,
    audioPhrase: 'Te llamaré tan pronto como llegue a la Sagrada Família'
  },
  {
    id: 'b1_07',
    level: 'B1',
    category: 'grammar',
    question: 'Llevo tres años _____ español en la universidad.',
    englishHint: '"Llevar + tiempo + gerundio" expresses duration of an ongoing action.',
    explanation: 'La perífrasis "llevar + gerundio" expresa la duración de una acción: "estudiando".',
    options: ['estudiando', 'estudiar', 'estudiado', 'de estudiar'],
    correctIndex: 0,
    audioPhrase: 'Llevo tres años estudiando español'
  },
  {
    id: 'b1_08',
    level: 'B1',
    category: 'slang',
    question: '¿Qué significa la expresión: "¡Qué guay!"?',
    englishHint: 'Common slang for "How cool / awesome!".',
    explanation: '"¡Qué guay!" se usa para expresar que algo es fantástico o estupendo.',
    options: ['How cool / great!', 'What a shame!', 'How expensive!', 'How weird!'],
    correctIndex: 0,
    audioPhrase: '¡Qué guay!'
  },
  {
    id: 'b1_09',
    level: 'B1',
    category: 'subjunctive',
    question: 'Ojalá mañana no _____ durante la visita guiada.',
    englishHint: '"Ojalá" always triggers the subjunctive mood.',
    explanation: '"Ojalá" siempre va seguido de subjuntivo para expresar un deseo: "llueva".',
    options: ['llueva', 'llueve', 'lloverá', 'llovió'],
    correctIndex: 0,
    audioPhrase: 'Ojalá mañana no llueva'
  },
  {
    id: 'b1_10',
    level: 'B1',
    category: 'grammar',
    question: 'Por vs Para: "Caminamos _____ el Paseo de Gràcia mirando las fachadas."',
    englishHint: '"Por" indicates passage along or movement through a place.',
    explanation: '"Por" expresa movimiento a través de un espacio o ruta ("through / along").',
    options: ['por', 'para', 'en', 'hacia'],
    correctIndex: 0,
    audioPhrase: 'Caminamos por el Paseo de Gràcia'
  },
  {
    id: 'b1_11',
    level: 'B1',
    category: 'subjunctive',
    question: 'Quiero un piso que _____ mucha luz natural y balcón.',
    englishHint: 'Relative clause describing an unspecific or desired entity requires subjunctive.',
    explanation: 'Como se busca algo hipotético no identificado, se usa subjuntivo: "tenga".',
    options: ['tenga', 'tiene', 'tendrá', 'tenía'],
    correctIndex: 0,
    audioPhrase: 'Quiero un piso que tenga mucha luz natural'
  },
  {
    id: 'b1_12',
    level: 'B1',
    category: 'vocab',
    question: '¿Qué es un "chaflán" en la arquitectura del Eixample?',
    englishHint: 'The 45-degree beveled cut corner of street blocks.',
    explanation: 'Un chaflán es la esquina achaflanada a 45 grados creada por Ildefons Cerdà.',
    options: ['The beveled corner of an octagonal city block', 'An underground metro exit', 'A roof terrace with gargoyles', 'A glass stained mosaic window'],
    correctIndex: 0,
    audioPhrase: 'El chaflán del Eixample'
  },
  {
    id: 'b1_13',
    level: 'B1',
    category: 'grammar',
    question: 'Aunque _____ calor, me pondré una chaqueta por la noche.',
    englishHint: '"Aunque" with a known fact takes indicative ("hace").',
    explanation: 'Cuando "aunque" introduce un hecho real conocido, rige indicativo: "hace".',
    options: ['hace', 'haga', 'hizo', 'haría'],
    correctIndex: 0,
    audioPhrase: 'Aunque hace calor, me pondré una chaqueta'
  },
  {
    id: 'b1_14',
    level: 'B1',
    category: 'slang',
    question: 'Si un amigo te dice "¡Venga, vamos!", ¿qué te está animando a hacer?',
    englishHint: 'Encouraging exclamation like "Come on, let’s go!".',
    explanation: '"¡Venga!" es una interjección muy común para dar ánimos o urgir a actuar.',
    options: ['Come on, let’s go!', 'Wait here quietly', 'Go back home', 'Pay the restaurant bill'],
    correctIndex: 0,
    audioPhrase: '¡Venga, vamos!'
  },
  {
    id: 'b1_15',
    level: 'B1',
    category: 'grammar',
    question: 'Completa: "Él no vino a la fiesta porque _____ enfermo."',
    englishHint: 'Reason in the past using imperfect of "estar".',
    explanation: 'Para describir un estado continuo o causa en el pasado se usa "estaba".',
    options: ['estaba', 'estuvo', 'está', 'estaría'],
    correctIndex: 0,
    audioPhrase: 'Él no vino porque estaba enfermo'
  },
  {
    id: 'b1_16',
    level: 'B1',
    category: 'subjunctive',
    question: 'Dudo que ellos _____ la verdad sobre lo que ocurrió.',
    englishHint: '"Dudar que" always requires the subjunctive mood.',
    explanation: 'El verbo "dudar que" expresa incertidumbre y rige subjuntivo: "sepan".',
    options: ['sepan', 'saben', 'sabrán', 'supieron'],
    correctIndex: 0,
    audioPhrase: 'Dudo que ellos sepan la verdad'
  },
  {
    id: 'b1_17',
    level: 'B1',
    category: 'culture',
    question: '¿Qué es el "Modernismo Catalán"?',
    englishHint: 'Art and architecture movement spearheaded by Gaudí and Domènech i Montaner.',
    explanation: 'Movimiento artístico de finales del s. XIX caracterizado por formas orgánicas y mosaicos.',
    options: ['Artistic & architectural movement famous for organic curves & mosaics', 'A classical Renaissance painting style', 'A modern tech startup hub', 'A traditional folk dance in squares'],
    correctIndex: 0,
    audioPhrase: 'El Modernismo Catalán'
  },
  {
    id: 'b1_18',
    level: 'B1',
    category: 'grammar',
    question: 'Completa: "Se _____ español en más de veinte países."',
    englishHint: 'Passive "se" (Impersonal construction).',
    explanation: 'La pasiva refleja con sujeto singular (el español) usa "habla": "Se habla español".',
    options: ['habla', 'hablan', 'habló', 'hablaría'],
    correctIndex: 0,
    audioPhrase: 'Se habla español en más de veinte países'
  },
  {
    id: 'b1_19',
    level: 'B1',
    category: 'subjunctive',
    question: 'Es necesario que los estudiantes _____ atención en clase.',
    englishHint: 'Impersonal expression "es necesario que" + subjunctive.',
    explanation: '"Es necesario que" expresa necesidad y exige subjuntivo: "presten".',
    options: ['presten', 'prestan', 'prestarán', 'prestaron'],
    correctIndex: 0,
    audioPhrase: 'Es necesario que los estudiantes presten atención'
  },
  {
    id: 'b1_20',
    level: 'B1',
    category: 'slang',
    question: '¿Qué significa la palabra coloquial "chulo / chula"?',
    englishHint: 'Slang meaning pretty, neat, or stylish.',
    explanation: 'En España "chulo/a" se usa para cosas bonitas, llamativas o con estilo.',
    options: ['Pretty, cool, or stylish', 'Very old-fashioned', 'Extremely cheap', 'Completely broken'],
    correctIndex: 0,
    audioPhrase: '¡Qué camiseta más chula!'
  },

  // =========================================================================
  // ====================== NIVEL B2 • INTERMEDIO ALTO (POBLENOU) ============
  // =========================================================================
  {
    id: 'b2_01',
    level: 'B2',
    category: 'idioms',
    question: '¿Qué significa la expresión idiomática: "Estar hasta las narices"?',
    englishHint: 'Idiomatic phrase meaning to be completely fed up.',
    explanation: '"Estar hasta las narices" significa estar harto o cansado de una situación.',
    options: ['To be totally fed up / sick of something', 'To have a cold with a runny nose', 'To be extremely proud', 'To smell something delicious'],
    correctIndex: 0,
    audioPhrase: 'Estoy hasta las narices de tanto ruido'
  },
  {
    id: 'b2_02',
    level: 'B2',
    category: 'subjunctive',
    question: 'Me sorprendió mucho que ellos no _____ a la inauguración del hub tecnológico.',
    englishHint: 'Emotion in the past ("me sorprendió que") requires imperfect subjunctive.',
    explanation: 'Un verbo de emoción en pasado ("me sorprendió que") rige imperfecto de subjuntivo: "vinieran / viniesen".',
    options: ['vinieran', 'vendrían', 'vienen', 'habían venido'],
    correctIndex: 0,
    audioPhrase: 'Me sorprendió mucho que ellos no vinieran'
  },
  {
    id: 'b2_03',
    level: 'B2',
    category: 'grammar',
    question: 'A no ser que _____ pronto, perderemos el último metro hacia Poblenou.',
    englishHint: '"A no ser que" (unless) always triggers the subjunctive.',
    explanation: '"A no ser que" es un conector condicional que siempre rige subjuntivo: "vengas".',
    options: ['vengas', 'vienes', 'vendrás', 'venías'],
    correctIndex: 0,
    audioPhrase: 'A no ser que vengas pronto, perderemos el metro'
  },
  {
    id: 'b2_04',
    level: 'B2',
    category: 'idioms',
    question: '¿Qué significa la frase: "Costar un ojo de la cara"?',
    englishHint: 'Equivalent to "to cost an arm and a leg".',
    explanation: 'Significa que algo es excesivamente caro o desorbitado de precio.',
    options: ['To be extremely expensive', 'To require intense eye surgery', 'To be very painful', 'To be completely free of charge'],
    correctIndex: 0,
    audioPhrase: 'Ese piso en Barcelona cuesta un ojo de la cara'
  },
  {
    id: 'b2_05',
    level: 'B2',
    category: 'subjunctive',
    question: 'No creo que nadie _____ resolver este algoritmo sin ayuda.',
    englishHint: '"No creo que nadie..." requires present subjunctive.',
    explanation: 'La negación con "nadie" exige subjuntivo: "pueda".',
    options: ['pueda', 'puede', 'podrá', 'podía'],
    correctIndex: 0,
    audioPhrase: 'No creo que nadie pueda resolver esto solo'
  },
  {
    id: 'b2_06',
    level: 'B2',
    category: 'grammar',
    question: 'Conector discursivo: "Estudió mucho; _____, no logró aprobar el examen."',
    englishHint: 'Formal adversative transition meaning "however / nevertheless".',
    explanation: '"Sin embargo" y "no obstante" son conectores que expresan contraste o concesión.',
    options: ['no obstante', 'por consiguiente', 'además', 'en consecuencia'],
    correctIndex: 0,
    audioPhrase: 'Estudió mucho; no obstante, no logró aprobar'
  },
  {
    id: 'b2_07',
    level: 'B2',
    category: 'idioms',
    question: '¿Qué significa "Estar en las nubes"?',
    englishHint: 'Daydreaming or being distracted.',
    explanation: '"Estar en las nubes" significa estar distraído, pensando en otra cosa.',
    options: ['To be daydreaming / distracted', 'To fly on an airplane', 'To be extremely tall', 'To forecast rain'],
    correctIndex: 0,
    audioPhrase: 'Siempre estás en las nubes durante la clase'
  },
  {
    id: 'b2_08',
    level: 'B2',
    category: 'grammar',
    question: 'Completa: "De haberlo sabido antes, te _____ acompañado."',
    englishHint: 'Third conditional structure: "De haber + participio, condicional compuesto".',
    explanation: 'La condición irreal en pasado exige condicional compuesto: "habría".',
    options: ['habría', 'había', 'hubiera', 'haya'],
    correctIndex: 0,
    audioPhrase: 'De haberlo sabido antes, te habría acompañado'
  },
  {
    id: 'b2_09',
    level: 'B2',
    category: 'slang',
    question: 'En Barcelona, ¿qué significa cuando dices que alguien "tiene mucha cara"?',
    englishHint: 'Colloquial idiom meaning someone is shameless or cheeky.',
    explanation: '"Tener mucha cara / ser un caradura" significa no tener vergüenza (ser descarado).',
    options: ['To be cheeky / shameless', 'To have a large round face', 'To be very beautiful', 'To wear heavy makeup'],
    correctIndex: 0,
    audioPhrase: 'Ese chico tiene mucha cara'
  },
  {
    id: 'b2_10',
    level: 'B2',
    category: 'subjunctive',
    question: 'Por mucho que _____ entrenando, no superarás su récord sin descansar.',
    englishHint: '"Por mucho que" + subjunctive for concession.',
    explanation: '"Por mucho que" con valor hipotético o enfático rige subjuntivo: "sigas".',
    options: ['sigas', 'sigues', 'seguirás', 'seguías'],
    correctIndex: 0,
    audioPhrase: 'Por mucho que sigas entrenando, necesitas descansar'
  },
  {
    id: 'b2_11',
    level: 'B2',
    category: 'vocab',
    question: '¿Qué significa el concepto de distrito "22@" en Poblenou?',
    englishHint: 'Barcelona innovation, technology, and urban regeneration district.',
    explanation: '22@ es el distrito de innovación tecnológica y startups fundado en las fábricas de Poblenou.',
    options: ['Technology and innovation startup district', 'An email protocol address', 'A 24-hour convenience store chain', 'A metro line terminal'],
    correctIndex: 0,
    audioPhrase: 'El distrito 22@ de Barcelona'
  },
  {
    id: 'b2_12',
    level: 'B2',
    category: 'idioms',
    question: '¿Qué significa la expresión: "Tomar el pelo a alguien"?',
    englishHint: 'To tease or pull someone’s leg playfully.',
    explanation: '"Tomar el pelo" significa bromear o engañar a alguien amistosamente.',
    options: ['To pull someone’s leg / tease them', 'To cut someone’s hair', 'To pull their hair violently', 'To give a compliment'],
    correctIndex: 0,
    audioPhrase: '¿Me estás tomando el pelo?'
  },
  {
    id: 'b2_13',
    level: 'B2',
    category: 'grammar',
    question: 'Completa con la preposición correcta: "Me alegro _____ que hayas venido."',
    englishHint: 'Reflexive verb "alegrarse" takes the preposition "de".',
    explanation: '"Alegrarse de que..." exige la preposición "de".',
    options: ['de', 'en', 'por', 'con'],
    correctIndex: 0,
    audioPhrase: 'Me alegro de que hayas venido'
  },
  {
    id: 'b2_14',
    level: 'B2',
    category: 'subjunctive',
    question: 'Como no _____ atención a las instrucciones, cometerás un error grave.',
    englishHint: '"Como" with conditional warning value triggers the subjunctive.',
    explanation: '"Como" en oraciones condicionales de advertencia exige subjuntivo: "prestes".',
    options: ['prestes', 'prestas', 'prestarás', 'prestaste'],
    correctIndex: 0,
    audioPhrase: 'Como no prestes atención, cometerás un error'
  },
  {
    id: 'b2_15',
    level: 'B2',
    category: 'idioms',
    question: '¿Qué significa la expresión: "Dar en el clavo"?',
    englishHint: 'To hit the nail on the head / be completely right.',
    explanation: '"Dar en el clavo" significa acertar de lleno en una respuesta o solución.',
    options: ['To hit the nail on the head / be spot on', 'To hit your finger with a hammer', 'To fail completely', 'To lose your keys'],
    correctIndex: 0,
    audioPhrase: 'Has dado en el clavo con tu explicación'
  },
  {
    id: 'b2_16',
    level: 'B2',
    category: 'grammar',
    question: 'Completa: "El informe fue redactado _____ el equipo de ingenieros."',
    englishHint: 'Passive agent marker (by the team).',
    explanation: 'En las oraciones pasivas, el complemento agente va introducido por "por".',
    options: ['por', 'para', 'de', 'con'],
    correctIndex: 0,
    audioPhrase: 'El informe fue redactado por el equipo'
  },
  {
    id: 'b2_17',
    level: 'B2',
    category: 'subjunctive',
    question: 'Cualquiera que _____ la Torre Glòries de noche queda maravillado.',
    englishHint: 'Indefinite relative clause with "cualquiera que" triggers subjunctive.',
    explanation: '"Cualquiera que" rige presente de subjuntivo: "vea".',
    options: ['vea', 've', 'verá', 'veía'],
    correctIndex: 0,
    audioPhrase: 'Cualquiera que vea la torre iluminada queda maravillado'
  },
  {
    id: 'b2_18',
    level: 'B2',
    category: 'idioms',
    question: '¿Qué significa "Echar una mano"?',
    englishHint: 'To lend a helping hand.',
    explanation: '"Echar una mano" significa ayudar o colaborar con alguien.',
    options: ['To lend a hand / help out', 'To throw an object', 'To shake hands formally', 'To wave goodbye'],
    correctIndex: 0,
    audioPhrase: '¿Me puedes echar una mano con esta caja?'
  },
  {
    id: 'b2_19',
    level: 'B2',
    category: 'grammar',
    question: 'Identifica el conector de causa formal: "Se suspendió el vuelo _____ la tormenta."',
    englishHint: 'Formal causal phrase meaning "due to / on account of".',
    explanation: '"Debido a" introduce la causa o motivo de un acontecimiento.',
    options: ['debido a', 'a fin de', 'para que', 'con tal de'],
    correctIndex: 0,
    audioPhrase: 'Se suspendió el vuelo debido a la tormenta'
  },
  {
    id: 'b2_20',
    level: 'B2',
    category: 'slang',
    question: 'Si un barcelonés te dice "¡Qué crack eres!", ¿qué te está diciendo?',
    englishHint: 'Compliment calling you a champ, genius, or star.',
    explanation: '"Ser un crack" es un gran elogio coloquial que significa ser muy talentoso o brillante.',
    options: ['You are a champ / superstar / genius!', 'You are making too much noise', 'You broke something fragile', 'You look tired today'],
    correctIndex: 0,
    audioPhrase: '¡Eres un crack!'
  },

  // =========================================================================
  // ====================== NIVEL C1 • AVANZADO (EL RAVAL) ====================
  // =========================================================================
  {
    id: 'c1_01',
    level: 'C1',
    category: 'idioms',
    question: '¿Qué significa la locución adverbial: "A regañadientes"?',
    englishHint: 'Doing something reluctantly or unwillingly.',
    explanation: '"A regañadientes" significa hacer algo a disgusto o con desgana / protesta.',
    options: ['Reluctantly / unwillingly', 'With huge enthusiasm', 'Without making any sound', 'In complete darkness'],
    correctIndex: 0,
    audioPhrase: 'Aceptó la propuesta a regañadientes'
  },
  {
    id: 'c1_02',
    level: 'C1',
    category: 'grammar',
    question: 'Completa con el verbo adecuado: "El sospechoso _____ que no estuvo en el Raval."',
    englishHint: 'Formal verb meaning to maintain / allege / sustain a statement.',
    explanation: '"Adujo / sostuvo" expresa argumentación jurídica o formal con rigor.',
    options: ['adujo', 'habló', 'hizo', 'tuvo'],
    correctIndex: 0,
    audioPhrase: 'El sospechoso adujo que no estuvo en el lugar'
  },
  {
    id: 'c1_03',
    level: 'C1',
    category: 'culture',
    question: '¿Qué es el "Correfoc" en las fiestas populares catalanas?',
    englishHint: 'Traditional festive fire run with devils, dragons, and firecrackers.',
    explanation: 'Desfile pirotécnico donde grupos vestidos de diablos y dragones bailan bajo chispas de fuego.',
    options: ['Pyrotechnic street run where devils dance under raining sparks', 'A marathon race across Barcelona hills', 'A competitive paella cooking contest', 'A silent candlelit procession'],
    correctIndex: 0,
    audioPhrase: 'El Correfoc de las fiestas de Barcelona'
  },
  {
    id: 'c1_04',
    level: 'C1',
    category: 'idioms',
    question: '¿Qué significa el modismo: "Dormirse en los laureles"?',
    englishHint: 'To rest on one’s laurels / stop striving after success.',
    explanation: 'Significa descuidarse o dejar de esforzarse tras haber logrado un éxito previo.',
    options: ['To rest on one’s laurels / become complacent', 'To sleep under a bay leaf tree', 'To suffer from severe insomnia', 'To win first prize easily'],
    correctIndex: 0,
    audioPhrase: 'No te duermas en los laureles'
  },
  {
    id: 'c1_05',
    level: 'C1',
    category: 'subjunctive',
    question: 'Por más que _____ excusas, su actitud fue inadmisible.',
    englishHint: '"Por más que" referring to past completed event with subjunctive.',
    explanation: '"Por más que pusiera / pusiese" denota concesión hipotética en pasado.',
    options: ['pusiera', 'puso', 'pondrá', 'pone'],
    correctIndex: 0,
    audioPhrase: 'Por más que pusiera excusas, no convenció a nadie'
  },
  {
    id: 'c1_06',
    level: 'C1',
    category: 'vocab',
    question: '¿Qué significa la palabra culta "efímero / efímera"?',
    englishHint: 'Something that lasts for a very short time; fleeting.',
    explanation: '"Efímero" es algo pasajero, de muy corta duración (fugaz).',
    options: ['Fleeting / short-lived', 'Eternal and everlasting', 'Heavy and dense', 'Brightly colored'],
    correctIndex: 0,
    audioPhrase: 'La belleza efímera del atardecer'
  },
  {
    id: 'c1_07',
    level: 'C1',
    category: 'idioms',
    question: '¿Qué significa la expresión: "Meter la pata hasta el fondo"?',
    englishHint: 'To put one’s foot in one’s mouth / make a huge blunder.',
    explanation: '"Meter la pata" significa cometer una indiscreción o una gran equivocación.',
    options: ['To make a huge blunder / mistake', 'To step into deep mud', 'To injure one’s ankle', 'To run as fast as possible'],
    correctIndex: 0,
    audioPhrase: 'Metí la pata al decir ese secreto'
  },
  {
    id: 'c1_08',
    level: 'C1',
    category: 'grammar',
    question: 'Completa: "Había tantas personas que apenas _____ moverse por la calle."',
    englishHint: 'Impersonal past imperfect of "poder".',
    explanation: 'La construcción impersonal "apenas se podía mover" o "se cabía" indica restricción.',
    options: ['se podía', 'se pudiera', 'se pueda', 'se podrá'],
    correctIndex: 0,
    audioPhrase: 'Apenas se podía caminar por la multitud'
  },
  {
    id: 'c1_09',
    level: 'C1',
    category: 'slang',
    question: 'En Cataluña, ¿qué significa la expresión: "Hacer campana"?',
    englishHint: 'Skipping school or playing hooky.',
    explanation: '"Hacer campana" (o "hacer novillos") significa faltar a clase sin justificación.',
    options: ['To play hooky / skip class', 'To ring the church bells', 'To go camping in nature', 'To study all night long'],
    correctIndex: 0,
    audioPhrase: 'Los alumnos hicieron campana para ir a la playa'
  },
  {
    id: 'c1_10',
    level: 'C1',
    category: 'idioms',
    question: '¿Qué significa "Estar con la mosca detrás de la oreja"?',
    englishHint: 'To be suspicious or on high alert about something fishy.',
    explanation: 'Significa desconfiar o sospechar que algo no anda bien.',
    options: ['To be suspicious / wary of something', 'To have an insect buzzing near you', 'To suffer from an ear infection', 'To be happily listening to music'],
    correctIndex: 0,
    audioPhrase: 'Estoy con la mosca detrás de la oreja con esa oferta'
  },
  {
    id: 'c1_11',
    level: 'C1',
    category: 'grammar',
    question: 'Identifica la perífrasis verbal que expresa inminencia interrumpida en el pasado:',
    englishHint: '"Estar a punto de + infinitivo" indicates an imminent action.',
    explanation: '"Estaba a punto de salir cuando sonó el teléfono" expresa inminencia en el pasado.',
    options: ['Estaba a punto de salir', 'Iba saliendo despacio', 'Acabo de salir ahora', 'Tengo que salir pronto'],
    correctIndex: 0,
    audioPhrase: 'Estaba a punto de salir'
  },
  {
    id: 'c1_12',
    level: 'C1',
    category: 'vocab',
    question: '¿Cuál es el sinónimo culto de "generoso y desinteresado"?',
    englishHint: 'Noble, selfless, and generous in spirit.',
    explanation: '"Altruista" o "magnánimo" define a quien obra desinteresadamente en bien ajeno.',
    options: ['Altruista', 'Avaro', 'Mezquino', 'Egocéntrico'],
    correctIndex: 0,
    audioPhrase: 'Un gesto noble y altruista'
  },
  {
    id: 'c1_13',
    level: 'C1',
    category: 'subjunctive',
    question: 'Con tal de que me _____ los apuntes, te invito al almuerzo.',
    englishHint: '"Con tal de que" (provided that) always triggers the subjunctive.',
    explanation: '"Con tal de que" es una locución condicional que rige subjuntivo: "pases".',
    options: ['pases', 'pasas', 'pasarás', 'pasabas'],
    correctIndex: 0,
    audioPhrase: 'Con tal de que me pases los apuntes, te invito'
  },
  {
    id: 'c1_14',
    level: 'C1',
    category: 'idioms',
    question: '¿Qué significa el dicho: "Buscarle tres pies al gato"?',
    englishHint: 'To complicate things unnecessarily / split hairs.',
    explanation: 'Significa complicar algo sin necesidad buscando problemas donde no los hay.',
    options: ['To overcomplicate things unnecessarily', 'To search for a lost pet', 'To count the paws of an animal', 'To play an acoustic melody'],
    correctIndex: 0,
    audioPhrase: 'No le busques tres pies al gato'
  },
  {
    id: 'c1_15',
    level: 'C1',
    category: 'grammar',
    question: 'Completa: "El conferenciante habló con tanta elocuencia _____ cautivó a todo el auditorio."',
    englishHint: 'Consecutive structure "tan/tanto... que".',
    explanation: 'La correlación consecutiva se forma con "tan/tanto... que".',
    options: ['que', 'como', 'de modo', 'por cuanto'],
    correctIndex: 0,
    audioPhrase: 'Habló con tanta elocuencia que cautivó a todos'
  },
  {
    id: 'c1_16',
    level: 'C1',
    category: 'slang',
    question: '¿Qué significa la expresión barcelonesa "¡Déu n’hi do!"?',
    englishHint: 'Catalan exclamation meaning "Wow, impressive!" or "Not bad at all!".',
    explanation: 'Es una expresión de asombro o reconocimiento ("¡Vaya!", "¡Tiene mérito!").',
    options: ['Wow, that is impressive / quite something!', 'I don’t care at all', 'Please turn off the lights', 'What terrible weather'],
    correctIndex: 0,
    audioPhrase: '¡Déu n’hi do!'
  },
  {
    id: 'c1_17',
    level: 'C1',
    category: 'vocab',
    question: '¿Qué significa la palabra "inquietante"?',
    englishHint: 'Disturbing, eerie, or causing anxiety.',
    explanation: '"Inquietante" describe algo que genera desasosiego, misterio o alarma.',
    options: ['Disquieting / eerie / unsettling', 'Extremely funny and lighthearted', 'Completely silent', 'Comfortably warm'],
    correctIndex: 0,
    audioPhrase: 'Una atmósfera inquietante y misteriosa'
  },
  {
    id: 'c1_18',
    level: 'C1',
    category: 'idioms',
    question: '¿Qué significa "Hacer de tripas corazón"?',
    englishHint: 'To pluck up courage / grin and bear it.',
    explanation: 'Significa sobreponerse al miedo, dolor o asco para afrontar algo difícil.',
    options: ['To pluck up courage and face a tough situation', 'To undergo heart surgery', 'To eat an exotic meal', 'To give a passionate speech'],
    correctIndex: 0,
    audioPhrase: 'Hizo de tripas corazón y subió al escenario'
  },
  {
    id: 'c1_19',
    level: 'C1',
    category: 'grammar',
    question: 'Identifica la opción gramaticalmente correcta para expresar hipótesis en pasado:',
    englishHint: 'Conditional perfect or future perfect expressing conjecture about past.',
    explanation: '"Habrán llegado ya" o "habrían llegado" expresan conjetura o hipótesis sobre el pasado.',
    options: ['Habrán llegado ya a casa a estas horas', 'Llegaban seguramente ayer', 'Lleguen pronto a su destino', 'Llegarían hoy mismo sin duda'],
    correctIndex: 0,
    audioPhrase: 'Habrán llegado ya a estas horas'
  },
  {
    id: 'c1_20',
    level: 'C1',
    category: 'culture',
    question: '¿Qué célebre pintor surrealista catalán fundó su museo en Montjuïc?',
    englishHint: 'Master of biomorphic surrealism: Joan Miró.',
    explanation: 'La Fundación Joan Miró está ubicada en la colina de Montjuïc.',
    options: ['Joan Miró', 'Pablo Picasso', 'Salvador Dalí', 'Antoni Tàpies'],
    correctIndex: 0,
    audioPhrase: 'La Fundación Joan Miró en Montjuïc'
  },

  // =========================================================================
  // ====================== NIVEL C2 • MAESTRÍA TOTAL (MONTJUÏC) ==============
  // =========================================================================
  {
    id: 'c2_01',
    level: 'C2',
    category: 'idioms',
    question: '¿Qué significa el refrán clásico: "A río revuelto, ganancia de pescadores"?',
    englishHint: 'In times of chaos or confusion, opportunists take advantage.',
    explanation: 'Advierte de cómo en situaciones de desorden y crisis los oportunistas sacan provecho propio.',
    options: ['Opportunists profit from times of turmoil and chaos', 'Clean water is best for catching large trout', 'Fishermen should only work during calm tides', 'Patience always brings great rewards'],
    correctIndex: 0,
    audioPhrase: 'A río revuelto, ganancia de pescadores'
  },
  {
    id: 'c2_02',
    level: 'C2',
    category: 'vocab',
    question: '¿Qué figura retórica consiste en exagerar desmedidamente la realidad?',
    englishHint: 'Literary figure of intentional extreme exaggeration (e.g. "llorar ríos").',
    explanation: 'La hipérbole es la exageración deliberada con fines expresivos.',
    options: ['Hipérbole', 'Oxímoron', 'Metonimia', 'Sinécdoque'],
    correctIndex: 0,
    audioPhrase: 'La hipérbole literaria'
  },
  {
    id: 'c2_03',
    level: 'C2',
    category: 'grammar',
    question: 'Completa con la forma correcta del futuro de subjuntivo arcaico/jurídico: "Adonde _____ fueres, haz lo que vieres."',
    englishHint: 'Archaic future subjunctive of "ir".',
    explanation: 'El refrán clásico conserva el futuro de subjuntivo: "fueres" (del verbo ir).',
    options: ['fueres', 'vayas', 'fueras', 'iras'],
    correctIndex: 0,
    audioPhrase: 'Adonde fueres, haz lo que vieres'
  },
  {
    id: 'c2_04',
    level: 'C2',
    category: 'idioms',
    question: '¿Qué significa la locución culta: "A pie juntillas"?',
    englishHint: 'Believing something implicitly, without the slightest doubt.',
    explanation: '"Creer a pie juntillas" significa creer algo firmemente y sin cuestionarlo.',
    options: ['To believe unquestioningly / wholeheartedly', 'To walk on tiptoes in absolute silence', 'To jump with both feet together', 'To disagree vehemently'],
    correctIndex: 0,
    audioPhrase: 'Se creyó la historia a pie juntillas'
  },
  {
    id: 'c2_05',
    level: 'C2',
    category: 'vocab',
    question: '¿Qué significa el término filosófico/literario "oxímoron"?',
    englishHint: 'Figure of speech uniting two contradictory concepts (e.g., "un silencio elocuente").',
    explanation: 'Un oxímoron combina dos conceptos opuestos generando un nuevo sentido poético.',
    options: ['Combination of two contradictory concepts creating poetic tension', 'A poem consisting of fourteen hendecasyllabic verses', 'A severe grammatical error of agreement', 'A musical prelude in classical opera'],
    correctIndex: 0,
    audioPhrase: 'Un silencio atronador es un oxímoron'
  },
  {
    id: 'c2_06',
    level: 'C2',
    category: 'idioms',
    question: '¿Qué significa la expresión: "Poner una pica en Flandes"?',
    englishHint: 'Historic idiom meaning achieving something nearly impossible and arduous.',
    explanation: 'Alude a las históricas guerras de Flandes y significa lograr una hazaña de extrema dificultad.',
    options: ['To accomplish an immensely arduous or almost impossible feat', 'To plant a spear in battlefield ground', 'To travel across northern Europe by train', 'To surrender in a diplomatic debate'],
    correctIndex: 0,
    audioPhrase: 'Conseguir esa beca fue como poner una pica en Flandes'
  },
  {
    id: 'c2_07',
    level: 'C2',
    category: 'grammar',
    question: '¿Cuál de las siguientes oraciones contiene un "se dativo ético / aspectual"?',
    englishHint: 'Affective, emphatic pronoun: "Se bebió toda la botella".',
    explanation: 'En "Se bebió toda la botella", el "se" enfatiza la totalidad y el interés del sujeto.',
    options: ['Se bebió toda la botella de cava de un trago', 'Se venden pisos en el centro', 'Se dicen muchas mentiras en campaña', 'Se saludaron cordialmente al encontrarse'],
    correctIndex: 0,
    audioPhrase: 'Se bebió toda la botella de un trago'
  },
  {
    id: 'c2_08',
    level: 'C2',
    category: 'vocab',
    question: '¿Qué significa el adjetivo culto "acérrimo / acérrima"?',
    englishHint: 'Fierce, unyielding, and passionately steadfast.',
    explanation: '"Acérrimo" (superlativo de acre) significa tenaz, intransigente o defensor apasionado.',
    options: ['Fiercely steadfast / unyielding / ardent', 'Extremely sweet and syrupy', 'Weak and easily bent', 'Completely colorless'],
    correctIndex: 0,
    audioPhrase: 'Un acérrimo defensor del patrimonio cultural'
  },
  {
    id: 'c2_09',
    level: 'C2',
    category: 'idioms',
    question: '¿Qué significa el dicho: "De higos a brevas"?',
    englishHint: 'Equivalent to "once in a blue moon" (very rarely).',
    explanation: 'Significa de tarde en tarde, muy rara vez, casi nunca.',
    options: ['Once in a blue moon / very rarely', 'Every single day without fail', 'During the autumn harvest season', 'When baking sweet pastries'],
    correctIndex: 0,
    audioPhrase: 'Nos vemos de higos a brevas'
  },
  {
    id: 'c2_10',
    level: 'C2',
    category: 'culture',
    question: '¿En qué barrio barcelonés se encuentra el monumento "El Gato" del escultor Fernando Botero?',
    englishHint: 'Iconic chubby bronze cat on Rambla del Raval.',
    explanation: 'El célebre gato gigante de bronce de Fernando Botero está en la Rambla del Raval.',
    options: ['Rambla del Raval', 'Plaça de Catalunya', 'Passeig de Gràcia', 'Parc de la Ciutadella'],
    correctIndex: 0,
    audioPhrase: 'El Gato de Botero en el Raval'
  },
  {
    id: 'c2_11',
    level: 'C2',
    category: 'grammar',
    question: '¿Qué tipo de subordinada introduce "conque" (en una sola palabra)?',
    englishHint: 'Illative / consecutive connector meaning "so / therefore".',
    explanation: '"Conque" es una conjunción consecutiva/ilativa equivalente a "así que" o "por tanto".',
    options: ['Subordinada ilativa o consecutiva', 'Subordinada condicional hipotética', 'Subordinada causal explicativa', 'Subordinada final de propósito'],
    correctIndex: 0,
    audioPhrase: 'Ya es tarde, conque vámonos'
  },
  {
    id: 'c2_12',
    level: 'C2',
    category: 'idioms',
    question: '¿Qué significa la locución: "Andarse por las ramas"?',
    englishHint: 'To beat around the bush instead of getting straight to the point.',
    explanation: 'Significa divagar o evitar ir directamente al asunto principal.',
    options: ['To beat around the bush / avoid the main point', 'To climb tall trees in a park', 'To cut pruned branches in winter', 'To hide behind leafy foliage'],
    correctIndex: 0,
    audioPhrase: 'Deja de andarte por las ramas y dime la verdad'
  },
  {
    id: 'c2_13',
    level: 'C2',
    category: 'vocab',
    question: '¿Cuál es el significado de la palabra "prístino / prístina"?',
    englishHint: 'Pure, untouched, primitive, in its original state.',
    explanation: '"Prístino" alude a lo primitivo, original, puro o inalterado desde su origen.',
    options: ['Pristine / pure / in its original untouched state', 'Murky and polluted with dirt', 'Modern and recently fabricated', 'Fragile and brittle'],
    correctIndex: 0,
    audioPhrase: 'La belleza prístina de las montañas'
  },
  {
    id: 'c2_14',
    level: 'C2',
    category: 'idioms',
    question: '¿Qué significa la frase: "Rasgarse las vestiduras"?',
    englishHint: 'To express theatrical, hypocritical, or exaggerated outrage.',
    explanation: 'Significa escandalizarse de forma teatral o exagerada ante un suceso.',
    options: ['To express theatrical or exaggerated moral outrage', 'To tear one’s clothes by accident', 'To buy luxurious expensive suits', 'To tailor vintage clothing'],
    correctIndex: 0,
    audioPhrase: 'Muchos se rasgaron las vestiduras ante la noticia'
  },
  {
    id: 'c2_15',
    level: 'C2',
    category: 'grammar',
    question: 'Elige la opción que respeta la norma culta sobre el dequeísmo:',
    englishHint: 'Correct usage: "Me acuerdo de que..." vs "Pienso que...".',
    explanation: '"Pienso que es la mejor opción" (sin "de") es la norma académica correcta.',
    options: ['Pienso que es la mejor opción disponible', 'Pienso de que es la mejor opción', 'Me temo de que vendrá tarde', 'Opino de que tienes razón'],
    correctIndex: 0,
    audioPhrase: 'Pienso que es la mejor opción disponible'
  },
  {
    id: 'c2_16',
    level: 'C2',
    category: 'idioms',
    question: '¿Qué significa el refrán: "Mucho ruido y pocas nueces"?',
    englishHint: 'All talk and no action / much ado about nothing.',
    explanation: 'Critica las cosas que aparentan gran importancia pero resultan ser insignificantes.',
    options: ['Much ado about nothing / great boast, small roast', 'Cracking nuts makes too much noise in kitchen', 'Harvesting walnuts requires heavy tools', 'Squirrels make loud noises in trees'],
    correctIndex: 0,
    audioPhrase: 'Tanto escándalo para nada: mucho ruido y pocas nueces'
  },
  {
    id: 'c2_17',
    level: 'C2',
    category: 'culture',
    question: '¿Qué legendario autor de la literatura española ambientó en Barcelona el combate final de su caballero andante Don Quijote?',
    englishHint: 'Author of Don Quijote de la Mancha: Miguel de Cervantes.',
    explanation: 'Miguel de Cervantes situó en la playa de Barcelona el combate contra el Caballero de la Blanca Luna.',
    options: ['Miguel de Cervantes', 'Federico García Lorca', 'Lope de Vega', 'Francisco de Quevedo'],
    correctIndex: 0,
    audioPhrase: 'Miguel de Cervantes y la playa de Barcelona'
  },
  {
    id: 'c2_18',
    level: 'C2',
    category: 'vocab',
    question: '¿Qué significa el término culinario "trencadís"?',
    englishHint: 'Gaudí mosaic technique using broken ceramic shards.',
    explanation: 'Técnica modernista que compone mosaicos mediante fragmentos quebrados de cerámica.',
    options: ['Mosaic technique created from broken colorful ceramic shards', 'A traditional almond pastry with honey', 'A Catalan red wine fermentation cask', 'A stone arch supporting Gothic bridges'],
    correctIndex: 0,
    audioPhrase: 'El mosaico de trencadís de Gaudí'
  },
  {
    id: 'c2_19',
    level: 'C2',
    category: 'idioms',
    question: '¿Qué significa la expresión: "Salirse por la tangente"?',
    englishHint: 'To evade an issue by changing the topic abruptly.',
    explanation: 'Significa esquivar una pregunta o situación comprometedora cambiando de tema.',
    options: ['To deflect or evade an uncomfortable question abruptly', 'To drive off the highway curve', 'To calculate the angle of a triangle', 'To agree enthusiastically with someone'],
    correctIndex: 0,
    audioPhrase: 'Cuando le preguntaron por el presupuesto, se salió por la tangente'
  },
  {
    id: 'c2_20',
    level: 'C2',
    category: 'culture',
    question: '¿Qué simboliza la legendaria leyenda de Sant Jordi, patrón de Cataluña, que se celebra el 23 de abril regalando libros y rosas?',
    englishHint: 'Catalan Day of books and roses celebrating St. George slaying the dragon.',
    explanation: 'La victoria de Sant Jordi sobre el dragón; de la sangre brotó un rosal, originando el Día del Libro y la Rosa.',
    options: ['St. George slaying the dragon, originating the Catalan Day of Books & Roses', 'The founding of Barcelona’s Olympic stadium', 'The construction of the Sagrada Família spire', 'The annual Mediterranean grape harvest festival'],
    correctIndex: 0,
    audioPhrase: 'La fiesta de Sant Jordi y el Día del Libro y la Rosa'
  }
];
