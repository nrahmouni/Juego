/**
 * Kawaii Chiptune & Cute Synth Audio Manager
 * Generates adorable 8-bit / 16-bit cute sound effects, soft sweet chimes,
 * and upbeat melody lines (speech voice removed).
 */

class AudioManager {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isMuted: boolean = false;
  private isMusicMuted: boolean = false;
  private masterVolume: number = 0.7;
  private musicInterval: number | null = null;
  private currentBarrioIdx: number = 0;

  public initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.sfxGain = this.ctx.createGain();
        this.musicGain = this.ctx.createGain();

        this.sfxGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
        this.musicGain.gain.setValueAtTime(this.masterVolume * 0.28, this.ctx.currentTime);

        this.sfxGain.connect(this.ctx.destination);
        this.musicGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMasterVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.ctx && this.sfxGain && this.musicGain) {
      this.sfxGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
      this.musicGain.gain.setValueAtTime(this.masterVolume * 0.28, this.ctx.currentTime);
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public setMusicMuted(muted: boolean) {
    this.isMusicMuted = muted;
    if (muted) {
      this.stopMusic();
    } else {
      this.playBarrioMusic(this.currentBarrioIdx);
    }
  }

  // Cute Tone Synthesizer
  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    vol: number = 0.2,
    endFreq: number = 0
  ) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      if (endFreq > 0) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), now + duration);
      }

      gain.gain.setValueAtTime(vol * this.masterVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Audio fallback
    }
  }

  // Cute shoot sound (star sparkle pop)
  public playShoot(weaponType?: string) {
    this.playTone(880, 0.06, 'triangle', 0.15, 1400);
    setTimeout(() => this.playTone(1320, 0.05, 'sine', 0.12), 20);
  }

  // Kawaii Dash whoosh
  public playDash() {
    this.playTone(520, 0.14, 'triangle', 0.22, 1046);
  }

  // Power-up pickup chime
  public playPowerup() {
    const notes = [587, 880, 1174, 1760];
    notes.forEach((f, idx) => {
      setTimeout(() => this.playTone(f, 0.08, 'sine', 0.22), idx * 35);
    });
  }

  // UI button click
  public playClick() {
    this.playTone(600, 0.04, 'sine', 0.12, 900);
  }

  // Cute correct answer sparkle jingle
  public playCorrect() {
    const notes = [659, 784, 987, 1318];
    notes.forEach((f, idx) => {
      setTimeout(() => this.playTone(f, 0.09, 'sine', 0.25), idx * 45);
    });
  }

  // Soft oops boop for wrong answer
  public playWrong() {
    this.playTone(330, 0.12, 'triangle', 0.25, 220);
    setTimeout(() => this.playTone(220, 0.18, 'triangle', 0.2, 160), 60);
  }

  // Star overdrive magical explosion
  public playOverdriveTrigger() {
    const notes = [523, 659, 784, 1046, 1318, 1568, 2093];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 0.12, 'sine', 0.25), idx * 40);
    });
  }

  // Bubble pop
  public playExplosion() {
    this.playTone(300, 0.2, 'triangle', 0.35, 60);
    this.playTone(180, 0.25, 'sine', 0.3, 40);
  }

  // Sweet coin chime
  public playCoin() {
    this.playTone(1046, 0.06, 'sine', 0.22);
    setTimeout(() => this.playTone(1568, 0.1, 'sine', 0.25), 35);
  }

  // Yummy tapa bite sound
  public playTapaEat() {
    this.playTone(700, 0.07, 'triangle', 0.2);
    setTimeout(() => this.playTone(1050, 0.1, 'sine', 0.25), 45);
  }

  // Combo star level up
  public playCombo(comboLevel: number) {
    const scale = [523, 659, 784, 1046, 1318, 1568];
    const baseFreq = scale[Math.min(comboLevel, scale.length - 1)];
    this.playTone(baseFreq, 0.08, 'sine', 0.2);
    setTimeout(() => this.playTone(baseFreq * 1.5, 0.12, 'sine', 0.22), 40);
  }

  // Soft hit
  public playHit() {
    this.playTone(240, 0.1, 'triangle', 0.25, 120);
  }

  // Victory fanfare
  public playLevelVictory() {
    const notes = [523, 659, 784, 1046, 1318, 1568];
    notes.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 0.16, 'sine', 0.25), i * 70);
    });
  }

  // Question pop bubble
  public playQuestionOpen() {
    this.playTone(784, 0.05, 'sine', 0.14);
    setTimeout(() => this.playTone(1046, 0.06, 'sine', 0.16), 35);
  }

  // Upbeat Kawaii Chiptune Melody
  public playBarrioMusic(barrioIdx: number) {
    this.currentBarrioIdx = barrioIdx;
    if (this.isMusicMuted) return;
    this.stopMusic();
    this.initContext();

    const cuteMelodies = [
      // Gracia (Sweet sunny stroll)
      [523, 659, 784, 659, 880, 784, 659, 587],
      // Barceloneta (Ocean bubble breeze)
      [587, 784, 880, 784, 1046, 880, 784, 659],
      // Eixample (Lively bounce)
      [659, 784, 987, 880, 784, 659, 784, 880],
      // Poblenou (Cute synth pop)
      [440, 523, 659, 587, 659, 784, 659, 523],
      // Raval (Playful night rhythm)
      [523, 587, 659, 784, 659, 587, 523, 440],
      // Park Guell (Gaudí magical fairy waltz)
      [659, 880, 1046, 880, 1175, 1046, 880, 659],
      // Montjuic (Cute boss hero showdown)
      [523, 659, 784, 880, 1046, 880, 784, 659]
    ];

    const melody = cuteMelodies[barrioIdx % cuteMelodies.length];
    let step = 0;
    const tempo = 200;

    this.musicInterval = window.setInterval(() => {
      if (this.isMusicMuted || !this.ctx || !this.musicGain) return;
      const freq = melody[step % melody.length];
      const bassFreq = freq / 2;

      // Soft cute sine note
      this.playMusicNote(freq, 0.11, 'sine', 0.08);

      if (step % 2 === 0) {
        this.playMusicNote(bassFreq, 0.14, 'triangle', 0.09);
      }

      step++;
    }, tempo);
  }

  private playMusicNote(freq: number, duration: number, type: OscillatorType, vol: number) {
    if (!this.ctx || !this.musicGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(vol * this.masterVolume * 0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.musicGain);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Ignored
    }
  }

  public stopMusic() {
    if (this.musicInterval !== null) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  // Authentic Native Spanish Speech Pronunciation (Web Speech API)
  public speakSpanish(text: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel(); // Stop any pending utterance
      const cleanText = text.replace(/_+/g, 'espacio').replace(/¿|\?|¡|!/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'es-ES';
      utterance.rate = 0.92; // Clear, pedagogical pace
      utterance.pitch = 1.05;

      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(v => v.lang.startsWith('es-ES') || v.lang.startsWith('es'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech fallback
    }
  }

  // Monster Angry Spanish Profanity Speech
  public speakSpanishProfanity(text: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 1.0; // Energetic monster pace
      utterance.pitch = 0.75; // Low gruff monster voice

      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(v => v.lang.startsWith('es-ES') || v.lang.startsWith('es'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Fallback
    }
  }
}

export const audio = new AudioManager();
