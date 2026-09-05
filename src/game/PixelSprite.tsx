import React from "react";
import type { SpriteDef } from "./sprites";

interface PixelSpriteProps {
  sprite: SpriteDef;
  scale?: number;   // pixels per grid cell
  className?: string;
  flipped?: boolean;
  frame?: number;   // animation frame offset (unused here, kept for API compat)
}

/** Renders a SpriteDef string-grid as crisp SVG pixels. */
export const PixelSprite: React.FC<PixelSpriteProps> = ({
  sprite,
  scale = 4,
  className = "",
  flipped = false,
}) => {
  const grid = sprite.grid;
  const w = grid[0]?.length ?? 0;
  const h = grid.length;

  const rects: React.ReactElement[] = [];
  grid.forEach((row, y) => {
    row.split("").forEach((ch, x) => {
      const fill = sprite.palette[ch];
      if (!fill) return;
      rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />);
    });
  });

  return (
    <svg
      width={w * scale}
      height={h * scale}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      className={className}
      style={{ imageRendering: "pixelated", transform: flipped ? "scaleX(-1)" : undefined }}
    >
      {rects}
    </svg>
  );
};
