import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrainerSection } from "./sections/TrainerSection";
import { PartySection } from "./sections/PartySection";
import { PokedexSection } from "./sections/PokedexSection";
import { BadgesSection } from "./sections/BadgesSection";
import { BagSection } from "./sections/BagSection";
import { QuestsSection } from "./sections/QuestsSection";
import { sfx } from "./sfx";

interface GameInterfaceProps {
  isOpen: boolean;
  section: string | null;
  onClose: () => void;
}

const sections: Record<string, { icon: string; title: string; Comp: React.FC }> = {
  trainer: { icon: "🧑‍💻", title: "TRAINER CARD", Comp: TrainerSection },
  party: { icon: "⚔️", title: "PARTY", Comp: PartySection },
  pokedex: { icon: "📖", title: "POKéDEX", Comp: PokedexSection },
  badges: { icon: "🏆", title: "BADGE CASE", Comp: BadgesSection },
  bag: { icon: "🎒", title: "BAG", Comp: BagSection },
  quests: { icon: "📜", title: "QUEST LOG", Comp: QuestsSection },
};

export const GameInterface: React.FC<GameInterfaceProps> = ({
  isOpen,
  section,
  onClose,
}) => {
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        sfx.play("sectionClose");
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  const entry = section ? sections[section] : null;
  const Comp = entry?.Comp;

  return (
    <AnimatePresence>
      {isOpen && Comp && entry && (
        <>
          {/* dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(8, 8, 24, 0.6)" }}
            onClick={() => { sfx.play("sectionClose"); onClose(); }}
          />

          {/* centered game panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-50 flex flex-col inset-2 md:inset-x-10 lg:inset-x-24 inset-y-4 md:inset-y-8"
          >
            <div className="panel-frame flex-1 flex flex-col overflow-hidden">
              {/* header */}
              <div className="panel-header flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base md:text-lg">{entry.icon}</span>
                  <span className="panel-title">{entry.title}</span>
                </div>
                <button
                  onClick={() => { sfx.play("sectionClose"); onClose(); }}
                  className="rpg-button text-[8px] md:text-[9px] px-3 py-1.5 min-h-[36px]"
                >
                  ✕ BACK
                </button>
              </div>

              {/* content */}
              <div className="flex-1 min-h-0 overflow-hidden">
                <Comp />
              </div>

              {/* footer */}
              <div className="panel-footer">
                <span>ESC / BACK TO RETURN</span>
                <span className="hidden sm:inline">MADE WITH ♥ · 2026</span>
                <span className="text-[var(--rpg-red)]">▶</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
