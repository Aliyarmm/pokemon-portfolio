import React, { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CommandMenuProps {
  isOpen: boolean;
  selectedIndex: number;
  onSelect: (index: number) => void;
  onClose: () => void;
  onMove: (direction: "up" | "down" | "left" | "right") => void;
}

const menuOptions = [
  { label: "TRAINER", row: 0, col: 0 },
  { label: "PARTY", row: 0, col: 1 },
  { label: "POKéDEX", row: 1, col: 0 },
  { label: "BADGES", row: 1, col: 1 },
  { label: "BAG", row: 2, col: 0 },
  { label: "QUESTS", row: 2, col: 1 },
];

export const CommandMenu: React.FC<CommandMenuProps> = ({
  isOpen,
  selectedIndex,
  onSelect,
  onClose,
  onMove,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  /* Keyboard navigation */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          onMove("up");
          break;
        case "ArrowDown":
          e.preventDefault();
          onMove("down");
          break;
        case "ArrowLeft":
          e.preventDefault();
          onMove("left");
          break;
        case "ArrowRight":
          e.preventDefault();
          onMove("right");
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          onSelect(selectedIndex);
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    },
    [isOpen, selectedIndex, onSelect, onClose, onMove]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  /* Grid position for 2-column layout */
  const getGridPosition = (index: number) => {
    const option = menuOptions[index];
    return option ? { row: option.row, col: option.col } : { row: 0, col: 0 };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute right-4 bottom-20 md:right-8 md:bottom-24 z-20"
        >
          <div
            className="pixel-border relative"
            style={{
              background: "linear-gradient(180deg, #0f3460 0%, #1a1a2e 100%)",
              padding: "12px",
              minWidth: "280px",
            }}
          >
            {/* Decorative top bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{
                background: "linear-gradient(90deg, transparent, var(--rpg-gold), transparent)",
              }}
            />

            {/* 2-Column grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {menuOptions.map((option, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={option.label}
                    onClick={() => onSelect(index)}
                    onMouseEnter={() => onMove("right")}
                    className="flex items-center gap-2 py-2 px-2 text-left transition-all duration-100"
                    style={{
                      fontFamily: "var(--rpg-font)",
                      fontSize: "10px",
                      color: isSelected ? "#fff" : "var(--rpg-text-dim)",
                      textShadow: isSelected ? "0 0 8px var(--rpg-accent-glow)" : "none",
                      background: isSelected ? "rgba(233, 69, 96, 0.15)" : "transparent",
                      borderLeft: isSelected ? "3px solid var(--rpg-accent)" : "3px solid transparent",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--rpg-accent)",
                        opacity: isSelected ? 1 : 0,
                        transition: "opacity 0.1s",
                      }}
                    >
                      ▶
                    </span>
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom decorative bar */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[3px]"
              style={{
                background: "linear-gradient(90deg, transparent, var(--rpg-accent), transparent)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
