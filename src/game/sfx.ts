/* Chiptune SFX engine using WebAudio. All synthesized — no audio files needed. */

type SfxName =
  | "menuOpen"
  | "menuMove"
  | "menuSelect"
  | "menuBack"
  | "sectionOpen"
  | "sectionClose"
  | "badgeUnlock"
  | "hover";

class SfxEngine {
  private ctx: AudioContext | null = null;
  enabled = false;

  private ensureCtx(): AudioContext | null {
    if (!this.enabled) return null;
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      this.ctx = new Ctor();
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    return this.ctx;
  }

  private blip(
    freq: number,
    dur: number,
    type: OscillatorType = "square",
    vol = 0.06,
    delay = 0
  ) {
    const ctx = this.ensureCtx();
    if (!ctx) return;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(vol, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  play(name: SfxName) {
    if (!this.enabled) return;
    switch (name) {
      case "menuOpen":
        this.blip(523, 0.08);
        this.blip(659, 0.08, "square", 0.06, 0.07);
        this.blip(784, 0.12, "square", 0.06, 0.14);
        break;
      case "menuMove":
        this.blip(880, 0.04, "square", 0.035);
        break;
      case "menuSelect":
        this.blip(659, 0.06);
        this.blip(988, 0.1, "square", 0.06, 0.05);
        break;
      case "menuBack":
        this.blip(440, 0.06);
        this.blip(330, 0.1, "square", 0.05, 0.05);
        break;
      case "sectionOpen":
        this.blip(392, 0.07);
        this.blip(523, 0.07, "square", 0.05, 0.06);
        this.blip(659, 0.07, "square", 0.05, 0.12);
        this.blip(784, 0.14, "square", 0.05, 0.18);
        break;
      case "sectionClose":
        this.blip(784, 0.06);
        this.blip(523, 0.06, "square", 0.05, 0.05);
        this.blip(392, 0.1, "square", 0.05, 0.1);
        break;
      case "badgeUnlock":
        this.blip(523, 0.09);
        this.blip(659, 0.09, "square", 0.06, 0.08);
        this.blip(784, 0.09, "square", 0.06, 0.16);
        this.blip(1047, 0.2, "square", 0.07, 0.24);
        break;
      case "hover":
        this.blip(1200, 0.025, "square", 0.02);
        break;
    }
  }
}

export const sfx = new SfxEngine();
