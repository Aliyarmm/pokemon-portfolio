import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DialogBox } from "./DialogBox";
import { sfx } from "./sfx";

interface TitleScreenProps {
  onStart: (mode: "menu" | "about") => void;
  visible: boolean;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStart, visible }) => {
  const [phase, setPhase] = useState<"title" | "prompt">("title");
  const [sel, setSel] = useState(0);

  React.useEffect(() => {
    const t = setTimeout(() => setPhase("prompt"), 1600);
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    if (phase !== "prompt") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        setSel((s) => (s + 1) % 2);
        sfx.play("menuMove");
      } else if (e.key === "Enter" || e.key === " ") {
        sfx.play("menuSelect");
        onStart(sel === 0 ? "menu" : "about");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, sel, onStart]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(180deg, rgba(10,14,42,0.88) 0%, rgba(20,28,66,0.82) 100%)" }}
          onClick={() => phase === "title" && setPhase("prompt")}
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

          {/* press start / menu */}
          <div className="mt-10 w-full max-w-md px-4">
            {phase === "title" ? (
              <div
                className="text-center"
                style={{
                  fontFamily: "var(--rpg-font)",
                  fontSize: "clamp(9px, 2.6vw, 12px)",
                  color: "#fff",
                  animation: "pulseSoft 1.4s ease-in-out infinite",
                }}
              >
                PRESS ANYWHERE TO START
              </div>
            ) : (
              <div className="dialog-frame">
                {["NEW GAME", "ABOUT"].map((label, i) => (
                  <button
                    key={label}
                    onMouseEnter={() => { setSel(i); sfx.play("menuMove"); }}
                    onClick={() => { sfx.play("menuSelect"); onStart(i === 0 ? "menu" : "about"); }}
                    className="w-full flex items-center gap-2 py-2.5 px-2 min-h-[44px]"
                  >
                    <span style={{ color: "var(--rpg-red)", fontSize: 11, opacity: sel === i ? 1 : 0 }}>▶</span>
                    <span style={{ fontFamily: "var(--rpg-font)", fontSize: "clamp(10px,2.6vw,12px)", color: "var(--rpg-ink)" }}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
