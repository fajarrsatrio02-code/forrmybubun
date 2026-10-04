// Synthesized soothing acoustic and chime audio using Web Audio API

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmPlaying: boolean = false;
  private bgmIntervalId: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft romantic chime or harmonic tone
  public playTone(freq: number, type: OscillatorType = 'sine', duration: number = 0.5, gainLevel: number = 0.15) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio playback safely handled
    }
  }

  // Bloom chime: shimmering sequence of golden notes
  public playBloomSound() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.6, 0.12);
      }, idx * 90);
    });
  }

  // Envelope opening soft paper sound / gentle chime
  public playEnvelopeOpen() {
    if (this.isMuted) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.8, 0.1);
      }, idx * 110);
    });
  }

  // Playful cute duck quack sound
  public playDuckQuack() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // First quick quack
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(420, now);
      osc1.frequency.exponentialRampToValueAtTime(260, now + 0.12);
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.12);

      // Second higher cheerful quack
      const now2 = now + 0.14;
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(510, now2);
      osc2.frequency.exponentialRampToValueAtTime(320, now2 + 0.14);
      gain2.gain.setValueAtTime(0.09, now2);
      gain2.gain.exponentialRampToValueAtTime(0.001, now2 + 0.14);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now2);
      osc2.stop(now2 + 0.14);
    } catch {
      // Audio playback safely handled
    }
  }

  // Blow candle sound & gentle wish sound
  public playBlowCandle() {
    if (this.isMuted) return;
    this.playTone(320, 'triangle', 0.4, 0.08);
    setTimeout(() => {
      this.playBloomSound();
    }, 250);
  }

  // Playful dodging sound for "Nggak" button
  public playDodgeSound() {
    if (this.isMuted) return;
    const notes = [600, 480];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'square', 0.12, 0.04);
      }, idx * 70);
    });
  }

  // Joyful romantic fanfare when she says "Iya, Mau!"
  public playCelebrationSound() {
    if (this.isMuted) return;
    const melody = [523.25, 659.25, 783.99, 880.00, 1046.50, 1318.51];
    melody.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.9, 0.2);
      }, idx * 130);
    });
  }

  // Soft romantic ambient melody loop
  public toggleBGM(): boolean {
    this.initContext();
    if (this.bgmPlaying) {
      this.stopBGM();
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }

  public isBgmActive(): boolean {
    return this.bgmPlaying;
  }

  private startBGM() {
    this.bgmPlaying = true;
    // Romantic arpeggio sequence in A major / F# minor
    const chords = [
      [440, 554.37, 659.25, 880], // A
      [369.99, 440, 554.37, 739.99], // F#m
      [392, 493.88, 587.33, 783.99], // G
      [329.63, 415.3, 493.88, 659.25], // E
    ];
    let step = 0;

    const playNextBar = () => {
      if (!this.bgmPlaying) return;
      const currentChord = chords[step % chords.length];
      currentChord.forEach((freq, noteIdx) => {
        setTimeout(() => {
          if (this.bgmPlaying) {
            this.playTone(freq, 'sine', 1.4, 0.04);
          }
        }, noteIdx * 400);
      });
      step++;
    };

    playNextBar();
    this.bgmIntervalId = window.setInterval(playNextBar, 2000);
  }

  public stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmIntervalId !== null) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }
  }
}

export const soundManager = new SoundManager();
