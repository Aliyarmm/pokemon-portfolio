import React from "react";

/**
 * The trainer — main character.
 * The character artwork lives inside public/assets/trainer.png at
 * x 490-753, y 25-791 of a 1248x832 canvas. We display just that
 * region via a proportional crop, so the feet sit exactly at the
 * bottom edge of the box and the character scales cleanly at any
 * viewport size (mobile → desktop).
 */
export const Trainer: React.FC = () => {
  return (
    <div
      className="absolute left-1/2 z-[5] pointer-events-none"
      style={{ bottom: "4%", transform: "translateX(-50%)" }}
    >
      <div
        className="relative"
        style={{
          height: "clamp(150px, 36vh, 340px)",
          aspectRatio: "264 / 767",
          animation: "trainerIdle 3.2s ease-in-out infinite",
          transformOrigin: "50% 100%",
        }}
      >
        {/* soft shadow under the trainer */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
          style={{
            bottom: -4,
            width: "120%",
            height: 14,
            background: "rgba(0,0,0,0.22)",
            filter: "blur(2px)",
          }}
        />

        {/* proportional crop: 264px-wide column of the 1248px canvas */}
        <img
          src="/assets/trainer.png"
          alt="ABID, the trainer"
          draggable={false}
          className="absolute select-none"
          style={{ width: "472.73%", left: "-185.61%", top: "-3.26%", maxWidth: "none" }}
        />
      </div>

      {/* name tag */}
      <div
        className="text-center select-none"
        style={{
          fontFamily: "var(--rpg-font)",
          fontSize: 7,
          marginTop: 6,
          color: "#fff",
          textShadow: "1px 1px 0 rgba(0,0,0,0.7)",
        }}
      >
        ABID
      </div>
    </div>
  );
};
