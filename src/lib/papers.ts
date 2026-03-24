export interface PaperConfig {
  id: number;
  left: number;    // vw — horizontal position
  dx: number;      // px — horizontal drift amplitude (signed)
  dz: number;      // px — Z depth oscillation amplitude
  rx: number;      // deg — rotateX base angle (signed)
  ry: number;      // deg — rotateY base angle (signed)
  rz: number;      // deg — rotateZ base angle (signed)
  dur: number;     // s — animation duration (positive)
  del: number;     // s — animation delay magnitude (CSS negates it for pre-seeding)
  blur: number;    // px — blur filter
  opacity: number;
  bright: number;  // brightness filter multiplier
  z: number;       // z-index
  width: number;   // px
  height: number;  // px — width * 1.414 (A4 ratio)
  layer: 0 | 1 | 2;
  bgColor: string;
}

const TONES = ["#f8f8f3", "#f1f3f5", "#ece8df", "#f5f2ea", "#f4f2ed"] as const;

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function signed(min: number, max: number): number {
  return rand(min, max) * (Math.random() < 0.5 ? 1 : -1);
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── Depth layer config tables ──────────────────────────────────────────────
const LAYER_CONFIG = [
  // Layer 0 — far/small
  { count: 9, wMin: 44, wMax: 72,   durMin: 11.0, durMax: 16.5, blurMin: 1.8, blurMax: 3.6, opMin: 0.04, opMax: 0.10, brtMin: 0.50, brtMax: 0.65, zMin: 1, zMax: 3  },
  // Layer 1 — mid
  { count: 8, wMin: 68, wMax: 98,   durMin: 8.0,  durMax: 12.0, blurMin: 0.4, blurMax: 1.6, opMin: 0.07, opMax: 0.15, brtMin: 0.68, brtMax: 0.82, zMin: 4, zMax: 6  },
  // Layer 2 — near/large
  { count: 5, wMin: 100, wMax: 142, durMin: 6.2,  durMax: 9.5,  blurMin: 0.0, blurMax: 0.5, opMin: 0.12, opMax: 0.22, brtMin: 0.88, brtMax: 1.00, zMin: 7, zMax: 10 },
] as const;

export function generatePapers(): PaperConfig[] {
  const papers: PaperConfig[] = [];
  let id = 0;

  for (const [layerIdx, cfg] of LAYER_CONFIG.entries()) {
    const layer = layerIdx as 0 | 1 | 2;
    const n = cfg.count;

    // ── Zone spread: divide usable viewport into n zones ──────────────────
    const MARGIN = 2;   // % — left/right margin so papers aren't clipped
    const usable = 96 - MARGIN * 2;
    const zoneWidth = usable / n;

    const positions = Array.from({ length: n }, (_, i) => {
      const zoneStart = MARGIN + i * zoneWidth;
      return zoneStart + rand(zoneWidth * 0.15, zoneWidth * 0.8);
    });
    // Shuffle so depth-order ≠ left-to-right order
    positions.sort(() => Math.random() - 0.5);

    for (let i = 0; i < n; i++) {
      const w = rand(cfg.wMin, cfg.wMax);
      const dur = rand(cfg.durMin, cfg.durMax);

      papers.push({
        id: id++,
        left: positions[i],
        dx: signed(3, 9),
        dz: rand(12, 40),
        rx: signed(6, 22),
        ry: signed(4, 18),
        rz: signed(2, 9),
        dur,
        del: rand(0, dur),   // CSS uses calc(var(--del) * -1s) to pre-seed
        blur: rand(cfg.blurMin, cfg.blurMax),
        opacity: rand(cfg.opMin, cfg.opMax),
        bright: rand(cfg.brtMin, cfg.brtMax),
        z: Math.round(rand(cfg.zMin, cfg.zMax)),
        width: w,
        height: w * 1.414,
        layer,
        bgColor: pick(TONES),
      });
    }
  }

  return papers;
}
