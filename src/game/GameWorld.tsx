import React, { useMemo } from "react";

interface GameWorldProps {
  timeOfDay: "day" | "evening" | "night";
  dimmed: boolean;
}

/* ── GBA-inspired palette ── */
const pal = {
  day: {
    skyTop: "#7EC0EE",
    skyMid: "#A8D8F0",
    skyLow: "#D6F0FA",
    haze: "#EAF7FD",
    mtnFar: "#A5C4D4",
    mtnNear: "#7FA8C2",
    fieldFar: "#9CCB86",
    fieldMid: "#7DBE6B",
    fieldNear: "#5FAF52",
    grassLight: "#8FD47E",
    grassDark: "#4E9E44",
    treeDark: "#2F7A3D",
    tree: "#3E9B4F",
    treeLight: "#5CBA6A",
    trunk: "#7A5236",
    path: "#D9B98A",
    pathDark: "#C4A274",
    cloud: "#FFFFFF",
  },
  evening: {
    skyTop: "#3D2E6B",
    skyMid: "#B3574E",
    skyLow: "#F0A05A",
    haze: "#F7C983",
    mtnFar: "#8A6A8E",
    mtnNear: "#6B4E7A",
    fieldFar: "#8FA86B",
    fieldMid: "#6E955C",
    fieldNear: "#55804A",
    grassLight: "#93B571",
    grassDark: "#4E7A44",
    treeDark: "#3A6540",
    tree: "#4A7A4E",
    treeLight: "#63966072",
    trunk: "#6B4632",
    path: "#C7A17A",
    pathDark: "#A98763",
    cloud: "#F5C9A8",
  },
  night: {
    skyTop: "#0A0E2A",
    skyMid: "#131A3E",
    skyLow: "#1D2A50",
    haze: "#26365E",
    mtnFar: "#2A3860",
    mtnNear: "#22304E",
    fieldFar: "#2E5540",
    fieldMid: "#274836",
    fieldNear: "#1F3A2C",
    grassLight: "#3B6B4A",
    grassDark: "#2A5238",
    treeDark: "#1E3D2C",
    tree: "#265036",
    treeLight: "#2F6342",
    trunk: "#3A2E28",
    path: "#6E6154",
    pathDark: "#5A4E44",
    cloud: "#39456B",
  },
};

/* ── Pixel cloud ── */
const Cloud: React.FC<{
  x: number; y: number; scale: number; dur: number; delay: number; color: string;
}> = ({ x, y, scale, dur, delay, color }) => (
  <div
    className="absolute will-change-transform"
    style={{
      left: `${x}%`, top: `${y}%`, transform: `scale(${scale})`,
      animation: `cloudDrift ${dur}s linear ${delay}s infinite`,
      imageRendering: "pixelated",
    }}
  >
    <svg width="72" height="28" viewBox="0 0 18 7" shapeRendering="crispEdges">
      {[[
        "................",
        "......ww........",
        "....wwww.ww.....",
        "..wwwwwwwwww....",
        ".wwwwwwwwwwwww..",
        "wwwwwwwwwwwwwww.",
        "................",
      ]].map((rows, i) => (
        <g key={i}>
          {rows.flatMap((row, ry) =>
            row.split("").map((ch, rx) =>
              ch === "w" ? (
                <rect key={`${rx}-${ry}`} x={rx} y={ry} width={1} height={1} fill={color} />
              ) : null
            )
          )}
        </g>
      ))}
    </svg>
  </div>
);

/* ── Mountain ridge (SVG polyline band) ── */
const Ridge: React.FC<{ color: string; height: number; bottom: number; peaks: number[] }> = ({
  color, height, bottom, peaks,
}) => {
  const W = 200;
  const pts = [`0,${height}`];
  peaks.forEach((p, i) => {
    const x = (i * W) / (peaks.length - 1);
    pts.push(`${x},${height - p}`);
  });
  pts.push(`${W},${height}`);
  return (
    <div className="absolute left-0 right-0" style={{ bottom: `${bottom}%`, height }}>
      <svg
        viewBox={`0 0 ${W} ${height}`}
        preserveAspectRatio="none"
        className="w-full h-full"
        shapeRendering="crispEdges"
      >
        <polygon points={pts.join(" ")} fill={color} />
      </svg>
    </div>
  );
};

/* ── Depth-scaled oak tree (matches reference art style) ── */
const Tree: React.FC<{
  x: number; bottom: number; scale: number; delay: number; p: typeof pal.day; big?: boolean;
}> = ({ x, bottom, scale, delay, p, big }) => {
  const s = big ? 64 : 48;
  const base = s * scale;
  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        bottom: `${bottom}%`,
        width: base,
        height: base * 1.35,
        transformOrigin: "50% 100%",
        animation: `treeSway ${7 + delay * 2}s ease-in-out ${delay}s infinite`,
        zIndex: Math.round(bottom),
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 16 22" shapeRendering="crispEdges">
        {/* trunk */}
        <rect x="7" y="15" width="2" height="6" fill={p.trunk} />
        <rect x="7" y="20" width="3" height="1" fill={p.trunk} />
        {/* foliage canopy — chunky oak blobs */}
        <rect x="3" y="4" width="10" height="8" fill={p.treeDark} />
        <rect x="1" y="6" width="14" height="6" fill={p.treeDark} />
        <rect x="4" y="3" width="8" height="7" fill={p.tree} />
        <rect x="2" y="5" width="12" height="5" fill={p.tree} />
        <rect x="5" y="2" width="6" height="5" fill={p.treeLight} />
        <rect x="4" y="4" width="5" height="2" fill={p.treeLight} />
        {/* cluster highlights */}
        <rect x="10" y="5" width="2" height="2" fill={p.treeLight} />
        <rect x="3" y="8" width="2" height="1" fill={p.tree} />
      </svg>
      {/* grass shadow at base */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
        style={{ bottom: -2, width: base * 0.7, height: base * 0.12, background: "rgba(0,0,0,0.18)" }}
      />
    </div>
  );
};

/* ── Tall wild-grass tuft (reference-style grass) ── */
const WildGrass: React.FC<{ x: number; bottom: number; scale: number; delay: number; p: typeof pal.day }> = ({
  x, bottom, scale, delay, p,
}) => {
  const h = 26 * scale;
  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`, bottom: `${bottom}%`, height: h,
        transformOrigin: "50% 100%",
        animation: `grassSway ${3.4 + delay}s ease-in-out ${delay}s infinite`,
        zIndex: Math.round(bottom),
      }}
    >
      <svg width={h * 0.9} height={h} viewBox="0 0 9 13" shapeRendering="crispEdges">
        <rect x="0" y="3" width="2" height="10" fill={p.grassDark} />
        <rect x="3" y="0" width="2" height="13" fill={p.grassLight} />
        <rect x="6" y="4" width="2" height="9" fill={p.grassDark} />
        <rect x="0" y="12" width="9" height="1" fill={p.grassDark} />
      </svg>
    </div>
  );
};

/* ── Tiny flower ── */
const Flower: React.FC<{ x: number; bottom: number; color: string; delay: number }> = ({
  x, bottom, color, delay,
}) => (
  <div
    className="absolute"
    style={{
      left: `${x}%`, bottom: `${bottom}%`,
      animation: `flowerBob ${2.6 + delay}s ease-in-out ${delay}s infinite`,
      zIndex: Math.round(bottom),
    }}
  >
    <div className="relative">
      <div style={{ width: 2, height: 5, background: "#3E7A3E", margin: "0 auto" }} />
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: -4, width: 5, height: 5, background: color, outline: "1px solid rgba(0,0,0,0.25)" }}
      />
    </div>
  </div>
);

/* ── Bird ── */
const Bird: React.FC<{ y: number; delay: number; dur: number; reverse?: boolean }> = ({
  y, delay, dur, reverse,
}) => (
  <div
    className="absolute pointer-events-none"
    style={{
      top: `${y}%`,
      animation: `${reverse ? "birdFlyReverse" : "birdFly"} ${dur}s linear ${delay}s infinite`,
      zIndex: 40,
    }}
  >
    <svg width="18" height="8" viewBox="0 0 9 4" shapeRendering="crispEdges">
      <rect x="0" y="1" width="3" height="1" fill="#333" />
      <rect x="5" y="1" width="3" height="1" fill="#333" />
      <rect x="3" y="0" width="2" height="1" fill="#333" />
    </svg>
  </div>
);

/* ── Fireflies (night only) ── */
const Firefly: React.FC<{ x: number; y: number; delay: number }> = ({ x, y, delay }) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`, top: `${y}%`, width: 4, height: 4,
      background: "#FFE082",
      boxShadow: "0 0 6px 2px rgba(255,224,130,0.6)",
      animation: `particleFloat ${6 + delay}s ease-in-out ${delay}s infinite`,
      zIndex: 45,
    }}
  />
);

/* ── Main component ── */
export const GameWorld: React.FC<GameWorldProps> = ({ timeOfDay, dimmed }) => {
  const p = pal[timeOfDay];
  const isNight = timeOfDay === "night";
  const isDay = timeOfDay === "day";

  /* fixed positions so no re-render flicker */
  const clouds = useMemo(
    () => [
      { x: -10, y: 4, scale: 1.0, dur: 70, delay: 0 },
      { x: -10, y: 9, scale: 0.7, dur: 95, delay: 20 },
      { x: -10, y: 2, scale: 1.3, dur: 120, delay: 45 },
      { x: -10, y: 12, scale: 0.6, dur: 80, delay: 65 },
    ],
    []
  );

  const trees = useMemo(
    () => [
      { x: 13, bottom: 38, scale: 1.6, delay: 0, big: true },
      { x: 24, bottom: 39, scale: 1.1, delay: 1, big: false },
      { x: 74, bottom: 38, scale: 1.0, delay: 2, big: false },
      { x: 79, bottom: 39, scale: 1.5, delay: 0.4, big: true },
      { x: 90, bottom: 37, scale: 1.2, delay: 1.4, big: false },
    ],
    []
  );

  const grass = useMemo(
    () => [
      { x: 2, bottom: 16, scale: 1.6, delay: 0 },
      { x: 7, bottom: 20, scale: 1.9, delay: 0.6 },
      { x: 13, bottom: 14, scale: 2.2, delay: 1.1 },
      { x: 18, bottom: 18, scale: 1.8, delay: 0.3 },
      { x: 27, bottom: 15, scale: 2.0, delay: 0.9 },
      { x: 33, bottom: 19, scale: 1.5, delay: 0.2 },
      { x: 40, bottom: 13, scale: 1.7, delay: 1.3 },
      { x: 58, bottom: 14, scale: 1.6, delay: 0.5 },
      { x: 64, bottom: 18, scale: 2.1, delay: 1.0 },
      { x: 70, bottom: 15, scale: 1.8, delay: 0.1 },
      { x: 77, bottom: 19, scale: 2.3, delay: 0.8 },
      { x: 84, bottom: 14, scale: 1.9, delay: 1.2 },
      { x: 90, bottom: 17, scale: 1.6, delay: 0.4 },
      { x: 95, bottom: 20, scale: 2.0, delay: 1.5 },
    ],
    []
  );

  const flowers = useMemo(
    () => [
      { x: 10, bottom: 22, color: "#FF8A80", delay: 0 },
      { x: 22, bottom: 21, color: "#FFD54F", delay: 0.7 },
      { x: 30, bottom: 23, color: "#CE93D8", delay: 1.2 },
      { x: 44, bottom: 20, color: "#FF8A80", delay: 0.4 },
      { x: 52, bottom: 22, color: "#81D4FA", delay: 0.9 },
      { x: 60, bottom: 21, color: "#FFD54F", delay: 1.4 },
      { x: 72, bottom: 23, color: "#FF8A80", delay: 0.6 },
      { x: 86, bottom: 21, color: "#CE93D8", delay: 1.1 },
      { x: 93, bottom: 22, color: "#FFD54F", delay: 0.3 },
    ],
    []
  );

  const stars = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        x: (i * 37 + 11) % 100,
        y: (i * 23 + 7) % 32,
        size: (i % 3) + 1,
        delay: (i % 7) * 0.4,
      })),
    []
  );

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${p.skyTop} 0%, ${p.skyMid} 35%, ${p.skyLow} 62%, ${p.haze} 100%)` }}
    >
      {/* stars */}
      {isNight &&
        stars.map((s, i) => (
          <div
            key={`st-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size,
              animation: `twinkle ${2.2 + s.delay}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}

      {/* moon / sun */}
      {isNight ? (
        <div className="absolute" style={{ top: "8%", right: "14%", animation: "moonGlow 5s ease-in-out infinite" }}>
          <svg width="56" height="56" viewBox="0 0 14 14" shapeRendering="crispEdges">
            <rect x="3" y="1" width="8" height="1" fill="#FFF9C4" />
            <rect x="2" y="2" width="10" height="10" fill="#FFF9C4" />
            <rect x="1" y="3" width="12" height="8" fill="#FFF9C4" />
            <rect x="3" y="12" width="8" height="1" fill="#FFF9C4" />
            <rect x="5" y="4" width="2" height="2" fill="#F0EFA5" />
            <rect x="8" y="8" width="3" height="2" fill="#F0EFA5" />
            <rect x="4" y="9" width="2" height="1" fill="#F0EFA5" />
          </svg>
        </div>
      ) : (
        <div className="absolute" style={{ top: "9%", right: "16%" }}>
          <div
            style={{
              width: 40, height: 40, borderRadius: "50%",
              background: timeOfDay === "day" ? "#FFF59D" : "#FFCC80",
              boxShadow: `0 0 40px 10px ${timeOfDay === "day" ? "rgba(255,245,157,0.5)" : "rgba(255,204,128,0.4)"}`,
            }}
          />
        </div>
      )}

      {/* clouds */}
      {!isNight && clouds.map((c, i) => <Cloud key={`cl-${i}`} {...c} color={p.cloud} />)}

      {/* mountain ridges */}
      <Ridge color={p.mtnFar} height={90} bottom={30} peaks={[28, 44, 34, 52, 38, 60, 42, 30, 48]} />
      <Ridge color={p.mtnNear} height={70} bottom={31} peaks={[20, 36, 26, 44, 30, 50, 34, 24, 40]} />

      {/* distant field band */}
      <div className="absolute left-0 right-0" style={{ bottom: "22%", height: "22%", background: p.fieldFar }} />
      <div className="absolute left-0 right-0" style={{ bottom: "16%", height: "8%", background: p.fieldMid }} />

      {/* ground */}
      <div
        className="absolute left-0 right-0 bottom-0"
        style={{ height: "20%", background: `linear-gradient(180deg, ${p.fieldNear} 0%, ${p.grassDark} 100%)` }}
      />

      {/* winding dirt path (vertical band with curves) */}
      <div className="absolute" style={{ left: "44%", bottom: 0, width: "18%", height: "34%", zIndex: 1 }}>
        <svg viewBox="0 0 20 40" preserveAspectRatio="none" className="w-full h-full" shapeRendering="crispEdges">
          <path
            d="M8 40 L7 34 L9 28 L6 22 L8 16 L12 10 L10 4 L11 0 L14 0 L13 4 L15 10 L11 16 L9 22 L12 28 L10 34 L11 40 Z"
            fill={p.path}
          />
          <path d="M9 36 L9 30" stroke={p.pathDark} strokeWidth="1" />
          <path d="M8 24 L10 18" stroke={p.pathDark} strokeWidth="1" />
        </svg>
      </div>

      {/* path side patches */}
      <div className="absolute" style={{ left: "20%", bottom: "4%", width: "10%", height: "5%", background: p.path, opacity: 0.7, borderRadius: "40%", zIndex: 1 }} />
      <div className="absolute" style={{ right: "18%", bottom: "6%", width: "12%", height: "6%", background: p.path, opacity: 0.6, borderRadius: "45%", zIndex: 1 }} />

      {/* trees */}
      {trees.map((t, i) => (
        <Tree key={`tr-${i}`} {...t} p={p} />
      ))}

      {/* wild grass */}
      {grass.map((g, i) => (
        <WildGrass key={`gr-${i}`} {...g} p={p} />
      ))}

      {/* flowers */}
      {flowers.map((f, i) => (
        <Flower key={`fl-${i}`} {...f} />
      ))}

      {/* birds (day) */}
      {isDay && (
        <>
          <Bird y={10} delay={2} dur={28} />
          <Bird y={16} delay={17} dur={34} reverse />
        </>
      )}

      {/* fireflies (night) */}
      {isNight && (
        <>
          <Firefly x={18} y={68} delay={0} />
          <Firefly x={45} y={74} delay={2.2} />
          <Firefly x={70} y={66} delay={4} />
          <Firefly x={85} y={72} delay={1.2} />
        </>
      )}

      {/* dim overlay when menus open */}
      <div
        className="absolute inset-0 pointer-events-none z-[60] transition-opacity duration-300"
        style={{ opacity: dimmed ? 1 : 0, background: "rgba(10,10,30,0.55)" }}
      />
    </div>
  );
};
