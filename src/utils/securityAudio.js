// Web Audio API Synthesized Sound Effects (100% royalty-free, zero external assets)
class SecurityAudioSystem {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.userInteracted = false;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    } catch {
      // AudioContext unavailable
    }
  }

  ensureContext() {
    this.userInteracted = true;
    this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  toggleMute() {
    this.ensureContext();
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  setMute(mute) {
    this.isMuted = mute;
  }

  // 1. Terminal BIOS typing beep
  playTerminalBeep(frequency = 920, duration = 0.035) {
    if (this.isMuted || !this.userInteracted) return;
    this.ensureContext();
    if (!this.ctx || this.ctx.state !== "running") return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.7, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignore
    }
  }

  // 2. CRT Power-On flash
  playCrtTurnOn() {
    if (this.isMuted || !this.userInteracted) return;
    this.ensureContext();
    if (!this.ctx || this.ctx.state !== "running") return;

    try {
      const now = this.ctx.currentTime;

      const oscWhine = this.ctx.createOscillator();
      const gainWhine = this.ctx.createGain();
      oscWhine.type = "sawtooth";
      oscWhine.frequency.setValueAtTime(800, now);
      oscWhine.frequency.exponentialRampToValueAtTime(12000, now + 0.35);

      gainWhine.gain.setValueAtTime(0.015, now);
      gainWhine.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      oscWhine.connect(gainWhine);
      gainWhine.connect(this.ctx.destination);

      oscWhine.onended = () => {
        try {
          oscWhine.disconnect();
          gainWhine.disconnect();
        } catch {}
      };

      oscWhine.start(now);
      oscWhine.stop(now + 0.4);
    } catch {
      // Ignore
    }
  }

  // 3. Glitch / static radio burst
  playStaticBurst(duration = 0.12) {
    if (this.isMuted || !this.userInteracted) return;
    this.ensureContext();
    if (!this.ctx || this.ctx.state !== "running") return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = Math.min(this.ctx.sampleRate * duration, 8192);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.5;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(1.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.onended = () => {
        try {
          noise.disconnect();
          filter.disconnect();
          gain.disconnect();
        } catch {}
      };

      noise.start(now);
      noise.stop(now + duration);
    } catch {
      // Ignore
    }
  }

  // 4. Security warning alert / camera switch sound
  playSecurityBeep(freq = 660) {
    if (this.isMuted || !this.userInteracted) return;
    this.ensureContext();
    if (!this.ctx || this.ctx.state !== "running") return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.setValueAtTime(freq * 1.25, now + 0.04);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Ignore
    }
  }

  // 5. Button click sound (heavy tactile switch)
  playTactileClick() {
    this.ensureContext();
    if (this.isMuted) return;
    if (!this.ctx || this.ctx.state !== "running") return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.04);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Ignore
    }
  }
}

export const securityAudio = new SecurityAudioSystem();
