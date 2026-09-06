import React, { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "./sfx";

export interface CommandOption {
  id: string;
  label: string;
  icon: string;
}

interface CommandMenuProps {
  isOpen: boolean;
  selectedIndex: number;
  onSelect: (index: number) => void;
  onHover: (index: number) => void;
  options: CommandOption[];
}

export const CommandMenu: React.FC<CommandMenuProps> = ({
  isOpen,
  selectedIndex,
  onSelect,
  onHover,
  options,
}) => {
  const move = useCallback(
    (dir: "up" | "down" | "left" | "right") => {
      const cols = 2;
      const rows = Math.ceil(options.length / cols);
      let r = Math.floor(selectedIndex / cols);
      let c = selectedIndex % cols;
      if (dir === "up") r = (r - 1 + rows) % rows;
      if (dir === "down") r = (r + 1) % rows;
      if (dir === "left") c = (c + 1) % 2;
      if (dir === "right") c = (c + 1) % 2;
      const next = Math.min(r * cols + c, options.length - 1);
      if (next !== selectedIndex) {
        sfx.play("menuMove");
        onHover(next);
      }
    },
    [selectedIndex, options.length, onHover]
  );

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowUp") { e.preventDefault(); move("up"); }
      else if (e.key === "ArrowDown") { e.preventDefault(); move("down"); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); move("left"); }
      else if (e.key === "ArrowRight") { e.preventDefault(); move("right"); }
      else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        sfx.play("menuSelect");
        onSelect(selectedIndex);
      } else if (e.key === "Escape") {
        e.preventDefault();
        sfx.play("menuBack");
        onSelect(-1); // parent interprets as close
      }
      // m toggles mute handled globally in Landing
    },
    [isOpen, selectedIndex, move, onSelect]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="w-full pointer-events-auto md:min-w-0 md:flex-1"
        >
          <div className="dialog-frame">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {options.map((opt, i) => {
                const sel = i === selectedIndex;
                return (
                  <button
                    key={opt.id}
                    onMouseEnter={() => { if (!sel) sfx.play("hover"); onHover(i); }}
                    onClick={() => { sfx.play("menuSelect"); onSelect(i); }}
                    className="flex items-center gap-2 py-2 md:py-2.5 px-2 text-left min-h-[44px]"
                    style={{ touchAction: "manipulation" }}
                  >
                    <span
                      className="text-[var(--rpg-red)]"
                      style={{
                        fontFamily: "var(--rpg-font)",
                        fontSize: 11,
                        opacity: sel ? 1 : 0,
                        transition: "opacity 80ms",
                      }}
                    >
                      ▶
                    </span>
                    <span style={{ fontSize: 16 }}>{opt.icon}</span>
                    <span
                      style={{
                        fontFamily: "var(--rpg-font)",
                        fontSize: "clamp(9px, 2.4vw, 12px)",
                        color: sel ? "#1a1a2e" : "#3a3a3a",
                        fontWeight: sel ? 700 : 400,
                      }}
                    >
                      {opt.label}
                    </span>
                    {sel && (
                      <span
                        className="ml-auto h-[6px] rounded-full"
                        style={{ width: 20, background: "var(--rpg-red)", animation: "pulseSoft 1.2s ease-in-out infinite" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <div
              className="text-right pr-2 pb-1"
              style={{ fontFamily: "var(--rpg-font)", fontSize: 6, color: "#8a8a8a" }}
            >
              ↑↓←→ MOVE · ENTER OK · ESC BACK
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
