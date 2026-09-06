import React from "react";

/**
 * The trainer — main character cutout (public/assets/trainer-cutout.png).
 * Stands on the field with a subtle idle breathing animation and a soft
 * ground shadow. Part of the world scene, never interactive.
 */
export const Trainer: React.FC = () => {
  return (
    <div
      className="absolute left-1/2 z-[5] pointer-events-none"
      style={{ bottom: "6%", transform: "translateX(-50%)" }}
    >
      <div
        className="relative"
        style={{ animation: "trainerIdle 3.2s ease-in-out infinite", transformOrigin: "50% 100%" }}
      >
        {/* soft shadow under the trainer */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
          style={{
            bottom: "-2%",
            width: "min(150px, 22vw)",
            height: "min(26px, 4vw)",
            background: "rgba(0,0,0,0.22)",
            filter: "blur(2px)",
          }}
        />

        {/* character cutout — scales with viewport, capped so it never dwarfs the scene */}
        <img
          src="/assets/trainer-cutout.png"
          alt="ABID, the trainer"
          draggable={false}
          className="block select-none"
          style={{
            height: "clamp(150px, 34vh, 330px)",
            width: "auto",
            maxWidth: "60vw",
            objectFit: "contain",
          }}
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
