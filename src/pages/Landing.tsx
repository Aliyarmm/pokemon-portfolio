import React, { useState, useCallback, useEffect } from "react";
import { GameWorld } from "@/game/GameWorld";
import { Trainer } from "@/game/Trainer";
import { CommandMenu } from "@/game/CommandMenu";
import { TrainerPanel } from "@/game/TrainerPanel";
import { GameInterface } from "@/game/GameInterface";
import { ArrowButton } from "@/game/ArrowButton";
import "@/game.css";

type TimeOfDay = "day" | "evening" | "night";

function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 18) return "day";
  if (hour >= 18 && hour < 21) return "evening";
  return "night";
}

const sectionMap: Record<number, string> = {
  0: "trainer",
  1: "party",
  2: "pokedex",
  3: "badges",
  4: "bag",
  5: "quests",
};

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [interfaceOpen, setInterfaceOpen] = useState(false);
  const [hatClickCount, setHatClickCount] = useState(0);
  const [timeOfDay] = useState<TimeOfDay>(getTimeOfDay);
  const [showSecret, setShowSecret] = useState(false);

  /* Keyboard: arrow up to open menu from initial state */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      /* Easter egg: type "dev" to show secret */
      if (e.key === "d" && !menuOpen && !interfaceOpen) {
        setShowSecret(true);
        setTimeout(() => setShowSecret(false), 3000);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, interfaceOpen]);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
    setSelectedIndex(0);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const handleSelect = useCallback(
    (index: number) => {
      const section = sectionMap[index];
      if (section) {
        setMenuOpen(false);
        setActiveSection(section);
        setInterfaceOpen(true);
      }
    },
    []
  );

  const closeInterface = useCallback(() => {
    setInterfaceOpen(false);
    setActiveSection(null);
  }, []);

  const handleMove = useCallback(
    (direction: "up" | "down" | "left" | "right") => {
      if (!menuOpen) return;

      const currentRow = Math.floor(selectedIndex / 2);
      const currentCol = selectedIndex % 2;

      let newRow = currentRow;
      let newCol = currentCol;

      switch (direction) {
        case "up":
          newRow = Math.max(0, currentRow - 1);
          break;
        case "down":
          newRow = Math.min(2, currentRow + 1);
          break;
        case "left":
          newCol = 0;
          break;
        case "right":
          newCol = 1;
          break;
      }

      const newIndex = newRow * 2 + newCol;
      if (newIndex >= 0 && newIndex < 6) {
        setSelectedIndex(newIndex);
      }
    },
    [menuOpen, selectedIndex]
  );

  const handleHatClick = useCallback(() => {
    setHatClickCount((prev) => prev + 1);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Game World Background */}
      <GameWorld timeOfDay={timeOfDay} dimmed={menuOpen || interfaceOpen} />

      {/* Trainer Character */}
      <Trainer hatClickCount={hatClickCount} onHatClick={handleHatClick} />

      {/* Trainer Info Panel (left side when menu open) */}
      <TrainerPanel isOpen={menuOpen} />

      {/* Command Menu (right side) */}
      <CommandMenu
        isOpen={menuOpen}
        selectedIndex={selectedIndex}
        onSelect={handleSelect}
        onClose={closeMenu}
        onMove={handleMove}
      />

      {/* Bottom Arrow Button */}
      <ArrowButton visible={!menuOpen && !interfaceOpen} onClick={openMenu} />

      {/* Game Interface Overlay */}
      <GameInterface
        isOpen={interfaceOpen}
        section={activeSection}
        onClose={closeInterface}
      />

      {/* Secret Easter Egg */}
      {showSecret && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2"
          style={{
            fontFamily: "var(--rpg-font)",
            fontSize: "8px",
            color: "var(--rpg-gold)",
            background: "rgba(15, 52, 96, 0.95)",
            border: "2px solid var(--rpg-gold)",
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          ⚡ DEVELOPER MODE ACTIVATED ⚡
        </div>
      )}

      {/* Tiny footer (only visible on scroll) */}
      <div
        className="absolute bottom-0 left-0 right-0 translate-y-full"
        style={{
          fontFamily: "var(--rpg-font)",
          fontSize: "6px",
          color: "rgba(255,255,255,0.3)",
          padding: "20px",
          textAlign: "center",
          background: "rgba(0,0,0,0.8)",
        }}
      >
        © 2026 ABID · BUILT WITH REACT & TAILWIND
      </div>
    </div>
  );
}
