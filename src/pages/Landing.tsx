import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameWorld } from "@/game/GameWorld";
import { Trainer } from "@/game/Trainer";
import { CommandMenu, type CommandOption } from "@/game/CommandMenu";
import { TrainerPanel } from "@/game/TrainerPanel";
import { GameInterface } from "@/game/GameInterface";
import { ArrowButton } from "@/game/ArrowButton";
import { TitleScreen } from "@/game/TitleScreen";
import { WorldDialog } from "@/game/DialogBox";
import { sfx } from "@/game/sfx";
import "@/game.css";

type TimeOfDay = "day" | "evening" | "night";
type ScreenState = "title" | "world" | "menu" | "section";

const OPTIONS: CommandOption[] = [
  { id: "trainer", label: "TRAINER", icon: "🧑‍💻" },
  { id: "party", label: "PARTY", icon: "⚔️" },
  { id: "pokedex", label: "POKéDEX", icon: "📖" },
  { id: "badges", label: "BADGES", icon: "🏆" },
  { id: "bag", label: "BAG", icon: "🎒" },
  { id: "quests", label: "QUESTS", icon: "📜" },
];

function getTimeOfDay(): TimeOfDay {
  const h = new Date().getHours();
  if (h >= 6 && h < 17) return "day";
  if (h >= 17 && h < 20) return "evening";
  return "night";
}

export default function Landing() {
  const [screen, setScreen] = useState<ScreenState>("title");
  const [selIndex, setSelIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(getTimeOfDay);
  const [soundOn, setSoundOn] = useState(false);
  const [hatClicks, setHatClicks] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [greetingDone, setGreetingDone] = useState(false);
  const keySequence = useRef<string>("");

  /* title screen: any key / tap enters the world */
  const handleTitleStart = useCallback(() => {
    sfx.enabled = true;
    setSoundOn(true);
    setScreen("world");
  }, []);

  /* keyboard: M toggles sound, D-easter-egg, arrows open menu */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (screen !== "world") return;

      if (e.key.toLowerCase() === "m") {
        sfx.enabled = !sfx.enabled;
        setSoundOn(sfx.enabled);
        return;
      }

      if (e.key.toLowerCase() === "t") {
        cycleTime();
        return;
      }

      if (e.key === "ArrowUp" || e.key === "Enter") {
        e.preventDefault();
        sfx.play("menuOpen");
        setScreen("menu");
        setSelIndex(0);
      }

      /* dev-mode easter egg: type "dev" */
      keySequence.current = (keySequence.current + e.key.toLowerCase()).slice(-3);
      if (keySequence.current === "dev") {
        keySequence.current = "";
        setToast("⚡ DEV MODE — CONSOLE LIES AHEAD ⚡");
        console.log(
          "%c☕ Coffee: ∞   🐛 Bugs: ???   😴 Sleep: 0",
          "font-size:16px;color:#e8534f;font-family:monospace;font-weight:bold"
        );
        setTimeout(() => setToast(null), 3000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [screen]);

  /* menu select (also handles ESC via -1) */
  const handleMenuSelect = useCallback((index: number) => {
    if (index === -1) {
      sfx.play("menuBack");
      setScreen("world");
      return;
    }
    const opt = OPTIONS[index];
    if (!opt) return;
    setActiveSection(opt.id);
    setScreen("section");
    sfx.play("sectionOpen");
  }, []);

  const closeSection = useCallback(() => {
    setActiveSection(null);
    setScreen("menu");
  }, []);

  const handleHatClick = useCallback(() => {
    setHatClicks((c) => {
      const n = c + 1;
      if (n === 5) {
        setToast("✨ You found the hidden sparkle! The trainer is pleased. ✨");
        setTimeout(() => setToast(null), 3500);
        return 0;
      }
      return n;
    });
  }, []);

  /* greeting dialog text once world is entered */
  const greeting =
    timeOfDay === "night"
      ? "The stars are out. ABID is deep in code..."
      : timeOfDay === "evening"
      ? "The sun sets over the field. ABID pauses for coffee..."
      : "A wild portfolio appeared! ABID wants to show you around.";

  const inWorld = screen === "world" || screen === "menu" || screen === "section";
  const uiOpen = screen === "menu" || screen === "section";

  /* universal close: section → menu → world */
  const handleClose = useCallback(() => {
    if (screen === "section") {
      sfx.play("sectionClose");
      setActiveSection(null);
      setScreen("menu");
    } else if (screen === "menu") {
      sfx.play("menuBack");
      setScreen("world");
    }
  }, [screen]);

  /* day → evening → night cycle (T key or chip click) */
  const [timeFlash, setTimeFlash] = useState(false);
  const flashTimer = useRef<number | null>(null);
  const cycleTime = useCallback(() => {
    sfx.play("menuMove");
    setTimeOfDay((t) => (t === "day" ? "evening" : t === "evening" ? "night" : "day"));
    setTimeFlash(true);
    if (flashTimer.current) window.clearTimeout(flashTimer.current);
    flashTimer.current = window.setTimeout(() => setTimeFlash(false), 420);
  }, []);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden select-none">
      {/* World (z-0 stacking context) */}
      {inWorld && (
        <>
          <GameWorld timeOfDay={timeOfDay} />
          <Trainer onHatClick={handleHatClick} />
          <div className="crt-overlay" />
        </>
      )}

      {/* World dim layer — sits above world (z-0), below menu/section UI (z-30+) */}
      {inWorld && (
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{ opacity: screen === "world" ? 0 : 1, background: "rgba(10,10,30,0.55)" }}
        />
      )}

      {/* Time-cycle transition veil */}
      {inWorld && (
        <div
          className="absolute inset-0 pointer-events-none z-[15]"
          style={{
            background: "#000",
            opacity: timeFlash ? 1 : 0,
            transition: `opacity ${timeFlash ? 0.4 : 0.6}s ease-in-out`,
          }}
        />
      )}

      {/* Click-outside catcher — clicking the darkened world dismisses back to idle */}
      {uiOpen && (
        <div
          className="absolute inset-0 z-20"
          onClick={handleClose}
          aria-hidden
        />
      )}

      {/* Greeting dialog after title */}
      {screen === "world" && (
        <WorldDialog
          text={greeting}
          visible={!greetingDone}
          onDone={() => setTimeout(() => setGreetingDone(true), 1200)}
        />
      )}

      {/* Arrow prompt */}
      <ArrowButton
        visible={screen === "world" && greetingDone}
        onClick={() => { setScreen("menu"); setSelIndex(0); }}
      />

      {/* Command menu */}
      <CommandMenu
        isOpen={screen === "menu"}
        selectedIndex={selIndex}
        onSelect={handleMenuSelect}
        onHover={setSelIndex}
        options={OPTIONS}
      />

      {/* Trainer info panel */}
      <TrainerPanel isOpen={screen === "menu"} />

      {/* Section interface */}
      <GameInterface
        isOpen={screen === "section"}
        section={activeSection}
        onClose={closeSection}
      />

      {/* Sound toggle chip (hidden while a section panel is up — M key still works) */}
      {inWorld && screen !== "section" && (
        <button
          onClick={() => { sfx.enabled = !sfx.enabled; setSoundOn(sfx.enabled); if (sfx.enabled) sfx.play("menuMove"); }}
          className={`absolute z-[60] panel-chip ${uiOpen ? "top-[72px] right-2" : "top-3 right-3"}`}
          style={{
            fontFamily: "var(--rpg-font)",
            fontSize: 10,
            padding: "8px 10px",
            borderRadius: 8,
            minHeight: 40,
            minWidth: 40,
          }}
          aria-label="Toggle sound"
        >
          {soundOn ? "🔊" : "🔇"}
        </button>
      )}

      {/* Universal close button — exits section → menu → world */}
      <AnimatePresence>
        {uiOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.18 }}
            onClick={handleClose}
            onMouseEnter={() => sfx.play("hover")}
            aria-label="Close"
            title="Close (ESC)"
            className="absolute top-2 right-2 z-[70] flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              background: "var(--rpg-red)",
              border: "3px solid var(--rpg-frame)",
              borderRadius: 10,
              boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.85), 0 4px 0 rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <span
              style={{
                fontFamily: "var(--rpg-font)",
                fontSize: 14,
                color: "#fff",
                textShadow: "1px 1px 0 rgba(0,0,0,0.5)",
                lineHeight: 1,
              }}
            >
              ✕
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Time-of-day chip — click to cycle day → evening → night */}
      {inWorld && (
        <button
          onClick={cycleTime}
          onMouseEnter={() => sfx.play("hover")}
          title="Cycle time of day (T)"
          aria-label="Cycle time of day"
          className="absolute top-3 left-3 z-50 panel-chip"
          style={{
            fontFamily: "var(--rpg-font)",
            fontSize: 7,
            padding: "8px 10px",
            borderRadius: 8,
            color: "#444",
            minHeight: 36,
            touchAction: "manipulation",
          }}
        >
          {timeOfDay === "day" ? "☀️ DAY" : timeOfDay === "evening" ? "🌆 EVENING" : "🌙 NIGHT"} ⇄
        </button>
      )}

      {/* Toast for easter eggs */}
      {toast && (
        <div
          className="fixed top-16 left-1/2 -translate-x-1/2 z-[90] dialog-frame"
          style={{ animation: "fadeIn 0.3s ease-out", maxWidth: "90vw", textAlign: "center" }}
        >
          <p className="dialog-text" style={{ minHeight: 0 }}>{toast}</p>
        </div>
      )}

      {/* Title screen */}
      <TitleScreen visible={screen === "title"} onStart={handleTitleStart} />

      {/* mobile footer (below fold, needs scroll intent — keeping minimal) */}
      <div className="sr-only">
        © 2026 ABID — GitHub · Email · Built with React, Tailwind & WebAudio
      </div>
    </div>
  );
}
