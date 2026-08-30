import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrainerSection } from "./sections/TrainerSection";
import { PartySection } from "./sections/PartySection";
import { PokedexSection } from "./sections/PokedexSection";
import { BadgesSection } from "./sections/BadgesSection";
import { BagSection } from "./sections/BagSection";
import { QuestsSection } from "./sections/QuestsSection";

interface GameInterfaceProps {
  isOpen: boolean;
  section: string | null;
  onClose: () => void;
}

const sectionTitles: Record<string, { icon: string; title: string }> = {
  trainer: { icon: "🧑‍💻", title: "TRAINER CARD" },
  party: { icon: "⚔️", title: "PARTY" },
  pokedex: { icon: "📖", title: "POKéDEX" },
  badges: { icon: "🏆", title: "BADGES" },
  bag: { icon: "🎒", title: "BAG" },
  quests: { icon: "📜", title: "QUESTS" },
};

const sectionComponents: Record<string, React.FC> = {
  trainer: TrainerSection,
  party: PartySection,
  pokedex: PokedexSection,
  badges: BadgesSection,
  bag: BagSection,
  quests: QuestsSection,
};

export const GameInterface: React.FC<GameInterfaceProps> = ({
  isOpen,
  section,
  onClose,
}) => {
  /* ESC to close */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const SectionComponent = section ? sectionComponents[section] : null;
  const sectionInfo = section ? sectionTitles[section] : null;

  return (
    <AnimatePresence>
      {isOpen && section && SectionComponent && (
        <>
          {/* Dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30"
            style={{
              background: "rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(2px)",
            }}
            onClick={onClose}
          />

          {/* Interface panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-40 flex flex-col"
          >
            <div
              className="pixel-border flex-1 flex flex-col overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #0f3460 0%, #1a1a2e 100%)",
              }}
            >
              {/* Header bar */}
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  borderBottom: "3px solid var(--rpg-accent)",
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{sectionInfo?.icon}</span>
                  <span
                    style={{
                      fontFamily: "var(--rpg-font)",
                      fontSize: "12px",
                      color: "var(--rpg-gold)",
                      textShadow: "0 0 10px rgba(251, 191, 36, 0.5)",
                    }}
                  >
                    {sectionInfo?.title}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="rpg-button"
                  style={{
                    fontFamily: "var(--rpg-font)",
                    fontSize: "8px",
                    padding: "6px 12px",
                  }}
                >
                  ✕ BACK
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-hidden">
                <SectionComponent />
              </div>

              {/* Footer bar */}
              <div
                className="px-4 py-2 flex items-center justify-between"
                style={{
                  background: "rgba(0,0,0,0.2)",
                  borderTop: "2px solid rgba(233, 69, 96, 0.3)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--rpg-font)",
                    fontSize: "6px",
                    color: "var(--rpg-text-dim)",
                  }}
                >
                  PRESS ESC OR CLICK BACK TO RETURN
                </span>
                <span
                  style={{
                    fontFamily: "var(--rpg-font)",
                    fontSize: "6px",
                    color: "var(--rpg-accent)",
                  }}
                >
                  ▶ SELECT
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
