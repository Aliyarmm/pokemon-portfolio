import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "./sfx";

interface TitleScreenProps {
  onStart: () => void;
  visible: boolean;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStart, visible }) => {
  const [ready, setReady] = useState(false);
  const isTouch =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches;

  /* brief title beat before the prompt appears */
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1400);
    return () => clearTimeout(t);
  }, []);

  /* any key starts (desktop) */
  useEffect(() => {
    if (!ready || !visible) return;
    const onKey = () => {
      sfx.play("menuSelect");
      onStart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ready, visible, onStart]);

  const handleTap = () => {
    if (!ready) {
      setReady(true);
      return;
    }
    sfx.play("menuSelect");
    onStart();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center cursor-pointer"
          style={{ background: "linear-gradient(180deg, rgba(10,14,42,0.88) 0%, rgba(20,28,66,0.82) 100%)" }}
          onClick={handleTap}
        >
          {/* Title */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center px-4"
          >
            <div
              style={{
                fontFamily: "var(--rpg-font)",
                fontSize: "clamp(22px, 7vw, 52px)",
                color: "#fff",
                textShadow: "4px 4px 0 var(--rpg-red-dark), 0 0 26px rgba(232,83,79,0.5)",
                animation: "titleGlow 3s ease-in-out infinite",
                letterSpacing: 2,
              }}
            >
              ABID
            </div>
            <div
              className="mt-3"
              style={{
                fontFamily: "var(--rpg-font)",
                fontSize: "clamp(8px, 2.4vw, 13px)",
                color: "#ffd54f",
                textShadow: "2px 2px 0 rgba(0,0,0,0.6)",
              }}
            >
              CREATOR VERSION
            </div>
          </motion.div>

          {/* press-any-key / tap-anywhere prompt */}
          <div className="mt-12 px-4 text-center min-h-[24px]">
            {ready && (
              <div
                style={{
                  fontFamily: "var(--rpg-font)",
                  fontSize: "clamp(9px, 2.6vw, 12px)",
                  color: "#fff",
                  animation: "pulseSoft 1.4s ease-in-out infinite",
                  textShadow: "2px 2px 0 rgba(0,0,0,0.5)",
                }}
              >
                {isTouch ? "TAP ANYWHERE TO START" : "PRESS ANY KEY TO CONTINUE"}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
