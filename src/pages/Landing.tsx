import React, { useState, useCallback, useEffect, useRef } from "react";
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
  const [timeOfDay] = useState<TimeOfDay>(getTimeOfDay);
  const [soundOn, setSoundOn] = useState(false);
  const [hatClicks, setHatClicks] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [greetingDone, setGreetingDone] = useState(false);
  const keySequence = useRef<string>("");

  /* title screen handlers */
  const handleTitleStart = useCallback((mode: "menu" | "about") => {
    sfx.enabled = true;
    setSoundOn(true);
    setScreen("world");
    if (mode === "about") {
      // "ABOUT" jumps straight to trainer card
      setTimeout(() => {
        setActiveSection("trainer");
        setScreen("section");
        sfx.play("sectionOpen");
      }, 350);
    }
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

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden select-none">
      {/* World */}
      {inWorld && (
        <>
          <GameWorld timeOfDay={timeOfDay} dimmed={screen !== "world"} />
          <Trainer onHatClick={handleHatClick} />
          <div className="crt-overlay" />
        </>
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

      {/* Sound toggle chip (top right) */}
      {inWorld && (
        <button
          onClick={() => { sfx.enabled = !sfx.enabled; setSoundOn(sfx.enabled); if (sfx.enabled) sfx.play("menuMove"); }}
          className="absolute top-3 right-3 z-50 panel-chip"
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

      {/* Time-of-day chip */}
      {inWorld && (
        <div
          className="absolute top-3 left-3 z-50 panel-chip"
          style={{
            fontFamily: "var(--rpg-font)",
            fontSize: 7,
            padding: "8px 10px",
            borderRadius: 8,
            color: "#444",
            pointerEvents: "none",
          }}
        >
          {timeOfDay === "day" ? "☀️ DAY" : timeOfDay === "evening" ? "🌆 EVENING" : "🌙 NIGHT"}
        </div>
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
