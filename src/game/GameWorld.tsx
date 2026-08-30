import React, { useMemo } from "react";

interface GameWorldProps {
  timeOfDay: "day" | "evening" | "night";
  dimmed: boolean;
}

/* ── Sky gradient based on time of day ── */
const skyGradients: Record<string, string> = {
  day: "linear-gradient(180deg, #87CEEB 0%, #B0E0FF 40%, #E8F4FD 70%, #C8E6C9 100%)",
  evening: "linear-gradient(180deg, #2D1B69 0%, #E65100 30%, #FF8F00 50%, #FFE0B2 80%, #A5D6A7 100%)",
  night: "linear-gradient(180deg, #0D0221 0%, #1A0A3E 30%, #1B2845 60%, #1a3a2a 100%)",
};

/* ── Cloud component ── */
const Cloud: React.FC<{
  x: number;
  y: number;
  scale: number;
  delay: number;
  duration: number;
}> = ({ x, y, scale, delay, duration }) => (
  <div
    className="absolute pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      transform: `scale(${scale})`,
      animation: `cloudFloat ${duration}s ease-in-out ${delay}s infinite`,
    }}
  >
    {/* Pixel cloud built from divs */}
    <div className="relative">
      <div className="w-16 h-4 bg-white/90 rounded-sm" />
      <div className="absolute -top-2 left-2 w-10 h-4 bg-white/90 rounded-sm" />
      <div className="absolute -top-1 left-6 w-6 h-3 bg-white/80 rounded-sm" />
      <div className="absolute top-1 -left-1 w-8 h-3 bg-white/85 rounded-sm" />
    </div>
  </div>
);

/* ── Mountain component ── */
const Mountain: React.FC<{
  x: number;
  height: number;
  width: number;
  color: string;
}> = ({ x, height, width, color }) => (
  <div
    className="absolute bottom-[38%] pointer-events-none"
    style={{
      left: `${x}%`,
      width: `${width}px`,
      height: `${height}px`,
    }}
  >
    <div
      className="w-full h-full"
      style={{
        background: color,
        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
      }}
    />
    {/* Snow cap */}
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2"
      style={{
        width: `${width * 0.3}px`,
        height: `${height * 0.15}px`,
        background: "white",
        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
      }}
    />
  </div>
);

/* ── Tree component ── */
const Tree: React.FC<{
  x: number;
  bottom: number;
  size: number;
  delay: number;
}> = ({ x, bottom, size, delay }) => (
  <div
    className="absolute pointer-events-none"
    style={{
      left: `${x}%`,
      bottom: `${bottom}%`,
      animation: `treeSway ${6 + delay}s ease-in-out ${delay}s infinite`,
      transformOrigin: "bottom center",
    }}
  >
    {/* Trunk */}
    <div
      className="mx-auto"
      style={{
        width: `${size * 0.2}px`,
        height: `${size * 0.4}px`,
        background: "#5D4037",
        borderRadius: "2px",
      }}
    />
    {/* Foliage layers */}
    <div
      className="absolute"
      style={{
        bottom: `${size * 0.3}px`,
        left: "50%",
        transform: "translateX(-50%)",
        width: `${size}px`,
        height: `${size * 0.6}px`,
        background: "#2E7D32",
        borderRadius: "50% 50% 10% 10%",
      }}
    />
    <div
      className="absolute"
      style={{
        bottom: `${size * 0.5}px`,
        left: "50%",
        transform: "translateX(-50%)",
        width: `${size * 0.7}px`,
        height: `${size * 0.4}px`,
        background: "#388E3C",
        borderRadius: "50%",
      }}
    />
  </div>
);

/* ── Grass tuft ── */
const GrassTuft: React.FC<{
  x: number;
  bottom: number;
  delay: number;
}> = ({ x, bottom, delay }) => (
  <div
    className="absolute pointer-events-none"
    style={{
      left: `${x}%`,
      bottom: `${bottom}%`,
      animation: `grassSway ${3 + delay}s ease-in-out ${delay}s infinite`,
      transformOrigin: "bottom center",
    }}
  >
    <div className="flex gap-[2px]">
      <div className="w-[3px] h-[14px] bg-[#4CAF50] rounded-t-full" style={{ transform: "rotate(-10deg)" }} />
      <div className="w-[3px] h-[18px] bg-[#43A047] rounded-t-full" />
      <div className="w-[3px] h-[14px] bg-[#66BB6A] rounded-t-full" style={{ transform: "rotate(10deg)" }} />
    </div>
  </div>
);

/* ── Flower ── */
const Flower: React.FC<{
  x: number;
  bottom: number;
  color: string;
  delay: number;
}> = ({ x, bottom, color, delay }) => (
  <div
    className="absolute pointer-events-none"
    style={{
      left: `${x}%`,
      bottom: `${bottom}%`,
      animation: `flowerBob ${2.5 + delay}s ease-in-out ${delay}s infinite`,
    }}
  >
    <div className="relative">
      {/* Stem */}
      <div className="w-[2px] h-[8px] bg-[#4CAF50] mx-auto" />
      {/* Petals */}
      <div
        className="absolute -top-1 left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full"
        style={{ background: color }}
      />
    </div>
  </div>
);

/* ── Star (night) ── */
const Star: React.FC<{
  x: number;
  y: number;
  size: number;
  delay: number;
}> = ({ x, y, size, delay }) => (
  <div
    className="absolute pointer-events-none rounded-full bg-white"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: `${size}px`,
      height: `${size}px`,
      animation: `twinkle ${2 + delay}s ease-in-out ${delay}s infinite`,
    }}
  />
);

/* ── Bird ── */
const Bird: React.FC<{
  y: number;
  delay: number;
  duration: number;
}> = ({ y, delay, duration }) => (
  <div
    className="absolute pointer-events-none"
    style={{
      top: `${y}%`,
      left: "-50px",
      animation: `birdFly ${duration}s linear ${delay}s infinite`,
    }}
  >
    <div className="text-[10px] text-gray-800 opacity-60">〰</div>
  </div>
);

/* ── Particle ── */
const Particle: React.FC<{
  x: number;
  y: number;
  delay: number;
}> = ({ x, y, delay }) => (
  <div
    className="absolute pointer-events-none rounded-full"
    style={{
      left: `${x}%`,
      bottom: `${y}%`,
      width: "3px",
      height: "3px",
      background: "rgba(255,255,200,0.7)",
      animation: `particleFloat ${5 + delay}s ease-in-out ${delay}s infinite`,
    }}
  />
);

/* ── Main GameWorld Component ── */
export const GameWorld: React.FC<GameWorldProps> = ({ timeOfDay, dimmed }) => {
  const isNight = timeOfDay === "night";
  const isEvening = timeOfDay === "evening";

  /* Memoize random positions so they don't change on re-render */
  const clouds = useMemo(
    () => [
      { x: 5, y: 5, scale: 1, delay: 0, duration: 20 },
      { x: 25, y: 8, scale: 0.7, delay: 3, duration: 25 },
      { x: 55, y: 3, scale: 1.2, delay: 1, duration: 22 },
      { x: 75, y: 10, scale: 0.8, delay: 5, duration: 28 },
      { x: 90, y: 6, scale: 0.6, delay: 2, duration: 18 },
    ],
    []
  );

  const trees = useMemo(
    () => [
      { x: 8, bottom: 32, size: 80, delay: 0 },
      { x: 18, bottom: 30, size: 100, delay: 1 },
      { x: 70, bottom: 31, size: 90, delay: 2 },
      { x: 82, bottom: 29, size: 110, delay: 0.5 },
      { x: 92, bottom: 33, size: 70, delay: 1.5 },
    ],
    []
  );

  const grassTufts = useMemo(
    () => [
      { x: 3, bottom: 18, delay: 0 },
      { x: 12, bottom: 22, delay: 0.5 },
      { x: 22, bottom: 16, delay: 1 },
      { x: 35, bottom: 20, delay: 0.3 },
      { x: 48, bottom: 24, delay: 0.8 },
      { x: 58, bottom: 18, delay: 1.2 },
      { x: 68, bottom: 22, delay: 0.2 },
      { x: 78, bottom: 16, delay: 0.7 },
      { x: 88, bottom: 20, delay: 1.1 },
      { x: 95, bottom: 24, delay: 0.4 },
    ],
    []
  );

  const flowers = useMemo(
    () => [
      { x: 15, bottom: 17, color: "#FF6B6B", delay: 0 },
      { x: 30, bottom: 19, color: "#FFD93D", delay: 0.5 },
      { x: 42, bottom: 15, color: "#C084FC", delay: 1 },
      { x: 55, bottom: 21, color: "#FF6B6B", delay: 0.3 },
      { x: 65, bottom: 17, color: "#60D5FA", delay: 0.8 },
      { x: 80, bottom: 19, color: "#FFD93D", delay: 1.2 },
      { x: 90, bottom: 16, color: "#FF6B6B", delay: 0.6 },
    ],
    []
  );

  const stars = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 35,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
      })),
    []
  );

  return (
    <div
      className="absolute inset-0 overflow-hidden transition-all duration-1000"
      style={{
        background: skyGradients[timeOfDay],
      }}
    >
      {/* Dimming overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          opacity: dimmed ? 0.5 : 0,
          background: "rgba(0,0,0,0.5)",
        }}
      />

      {/* ── STARS (night only) ── */}
      {isNight &&
        stars.map((s, i) => (
          <Star key={`star-${i}`} {...s} />
        ))}

      {/* ── MOON (night) ── */}
      {isNight && (
        <div
          className="absolute top-[8%] right-[15%] pointer-events-none"
          style={{ animation: "moonGlow 4s ease-in-out infinite" }}
        >
          <div className="w-16 h-16 rounded-full bg-[#FFFDE7] relative">
            <div className="absolute top-1 right-2 w-5 h-5 rounded-full bg-[#FFF9C4]" />
            <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-[#FFF9C4]" />
          </div>
        </div>
      )}

      {/* ── CLOUDS ── */}
      {!isNight &&
        clouds.map((c, i) => (
          <Cloud key={`cloud-${i}`} {...c} />
        ))}

      {/* ── MOUNTAINS ── */}
      <Mountain x={5} height={120} width={200} color={isNight ? "#1B3040" : isEvening ? "#5D4037" : "#78909C"} />
      <Mountain x={20} height={160} width={250} color={isNight ? "#152535" : isEvening ? "#4E342E" : "#607D8B"} />
      <Mountain x={50} height={100} width={180} color={isNight ? "#1A2D40" : isEvening ? "#6D4C41" : "#78909C"} />
      <Mountain x={70} height={140} width={220} color={isNight ? "#172838" : isEvening ? "#5D4037" : "#607D8B"} />
      <Mountain x={88} height={90} width={160} color={isNight ? "#1C2F42" : isEvening ? "#4E342E" : "#90A4AE"} />

      {/* ── GROUND ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: "35%" }}
      >
        {/* Main grass */}
        <div
          className="absolute inset-0"
          style={{
            background: isNight
              ? "linear-gradient(180deg, #1B5E20 0%, #0D3311 50%, #0A2A0B 100%)"
              : isEvening
              ? "linear-gradient(180deg, #33691E 0%, #1B5E20 50%, #0D3311 100%)"
              : "linear-gradient(180deg, #66BB6A 0%, #4CAF50 30%, #388E3C 60%, #2E7D32 100%)",
          }}
        />
        {/* Dirt path */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: "10%",
            width: "120px",
            height: "60%",
            background: isNight
              ? "linear-gradient(180deg, transparent, #3E2723 30%, #4E342E 70%, transparent)"
              : "linear-gradient(180deg, transparent, #8D6E63 30%, #A1887F 70%, transparent)",
            borderRadius: "40%",
            opacity: 0.6,
          }}
        />
      </div>

      {/* ── TREES ── */}
      {trees.map((t, i) => (
        <Tree key={`tree-${i}`} {...t} />
      ))}

      {/* ── GRASS TUFTS ── */}
      {grassTufts.map((g, i) => (
        <GrassTuft key={`grass-${i}`} {...g} />
      ))}

      {/* ── FLOWERS ── */}
      {flowers.map((f, i) => (
        <Flower key={`flower-${i}`} {...f} />
      ))}

      {/* ── BIRDS (day only) ── */}
      {!isNight && !isEvening && (
        <>
          <Bird y={12} delay={0} duration={15} />
          <Bird y={18} delay={8} duration={18} />
        </>
      )}

      {/* ── PARTICLES ── */}
      <Particle x={20} y={35} delay={0} />
      <Particle x={50} y={38} delay={2} />
      <Particle x={75} y={36} delay={4} />
      <Particle x={35} y={40} delay={1} />
      <Particle x={60} y={37} delay={3} />
    </div>
  );
};
