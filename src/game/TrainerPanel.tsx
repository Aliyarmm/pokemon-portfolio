import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trainer } from "@/data";
import { PixelSprite } from "./PixelSprite";
import { trainerSprite } from "./sprites";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay, ease: "easeOut" as const },
});

export const TrainerPanel: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute left-2 bottom-[150px] z-30 md:left-6 md:bottom-[190px] w-[180px] md:w-[32vw] md:max-w-[420px] md:min-w-[300px]"
          style={{ maxHeight: "calc(100dvh - 220px)" }}
        >
          <div className="panel-frame p-2.5 md:p-4 h-full overflow-y-auto rpg-scroll">
            {/* header row: portrait + name + location */}
            <motion.div {...fadeUp(0.05)} className="flex items-center gap-2.5 md:gap-3">
              <div className="portrait-box shrink-0">
                <PixelSprite sprite={trainerSprite} scale={2.5} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="panel-title" style={{ fontSize: 9 }}>{trainer.name}</div>
                <div
                  style={{ fontFamily: "var(--rpg-font)", fontSize: 6, color: "var(--rpg-red)" }}
                >
                  {trainer.class}
                </div>
                <div
                  className="mt-1 flex items-center gap-1 truncate"
                  style={{ fontFamily: "var(--rpg-font)", fontSize: 5, color: "#9a9a9a" }}
                >
                  <span>📍</span>
                  <span className="truncate">{trainer.location}</span>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.12)} className="panel-sep" />

            {/* two-column body: left = description, right = specialty + tags + HP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
              {/* left column — extended description */}
              <div className="space-y-1.5 min-w-0">
                {trainer.extendedDescription.map((para, i) => (
                  <motion.p
                    key={i}
                    {...fadeUp(0.18 + i * 0.08)}
                    className="text-[6px] leading-loose"
                    style={{ fontFamily: "var(--rpg-font)", color: "#6a6a6a" }}
                  >
                    {para}
                    {i < trainer.extendedDescription.length - 1 && (
                      <span style={{ color: "var(--rpg-red)" }}> ▾</span>
                    )}
                  </motion.p>
                ))}
              </div>

              {/* right column — specialty, interests, HP */}
              <div className="min-w-0">
                <motion.div {...fadeUp(0.26)}>
                  <div
                    className="text-[5px] mb-1"
                    style={{ fontFamily: "var(--rpg-font)", color: "#9a9a9a" }}
                  >
                    SPECIALTY
                  </div>
                  <div
                    className="text-[6px] leading-relaxed"
                    style={{ fontFamily: "var(--rpg-font)", color: "#4a4a4a" }}
                  >
                    {trainer.specialty.join(" · ")}
                  </div>
                </motion.div>

                <motion.div {...fadeUp(0.34)} className="mt-2">
                  <div
                    className="text-[5px] mb-1"
                    style={{ fontFamily: "var(--rpg-font)", color: "#9a9a9a" }}
                  >
                    INTERESTS
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {trainer.interests.map((tag) => (
                      <span
                        key={tag}
                        className="type-chip"
                        style={{ fontSize: 4.5, borderColor: "var(--rpg-purple)", color: "#7e57c2" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* HP-style level bar */}
                <motion.div {...fadeUp(0.42)} className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="stat-label">HP</span>
                    <span className="stat-label" style={{ color: "var(--rpg-green)" }}>
                      Lv {trainer.stats.level}
                    </span>
                  </div>
                  <div className="hp-bar">
                    <div className="hp-fill" style={{ width: "78%" }} />
                  </div>
                </motion.div>

                <motion.div
                  {...fadeUp(0.5)}
                  className="mt-2 text-[5px] text-right hidden md:block"
                  style={{ fontFamily: "var(--rpg-font)", color: "#9a9a9a" }}
                >
                  PRESS M FOR SOUND
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
