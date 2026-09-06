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
          className="absolute left-2 top-14 z-30 md:left-6 md:top-20 w-[140px] md:w-[200px]"
        >
          <div
            className="panel-frame p-2.5 md:p-3 max-h-[calc(100dvh-90px)] overflow-y-auto rpg-scroll"
          >
            {/* portrait + name */}
            <motion.div {...fadeUp(0.05)} className="flex items-center gap-2 mb-2">
              <div className="portrait-box shrink-0">
                <PixelSprite sprite={trainerSprite} scale={2.5} />
              </div>
              <div className="min-w-0">
                <div className="panel-title" style={{ fontSize: 9 }}>{trainer.name}</div>
                <div
                  style={{ fontFamily: "var(--rpg-font)", fontSize: 6, color: "var(--rpg-red)" }}
                >
                  {trainer.class}
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.12)} className="panel-sep" />

            {/* location line */}
            <motion.div
              {...fadeUp(0.16)}
              className="flex items-center gap-1"
              style={{ fontFamily: "var(--rpg-font)", fontSize: 5, color: "#9a9a9a" }}
            >
              <span>📍</span>
              <span className="truncate">{trainer.location}</span>
            </motion.div>

            {/* specialty */}
            <motion.div
              {...fadeUp(0.2)}
              className="mt-1.5 text-[6px] leading-relaxed"
              style={{ fontFamily: "var(--rpg-font)", color: "#4a4a4a" }}
            >
              {trainer.specialty.join(" · ")}
            </motion.div>

            {/* extended description — staggered paragraphs */}
            <div className="mt-2 space-y-1.5">
              {trainer.extendedDescription.map((para, i) => (
                <motion.p
                  key={i}
                  {...fadeUp(0.26 + i * 0.08)}
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

            {/* interests */}
            <motion.div {...fadeUp(0.55)} className="mt-2 flex flex-wrap gap-1">
              {trainer.interests.map((tag) => (
                <span
                  key={tag}
                  className="type-chip"
                  style={{ fontSize: 4.5, borderColor: "var(--rpg-purple)", color: "#7e57c2" }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* HP-style level bar */}
            <motion.div {...fadeUp(0.62)} className="mt-3">
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
              {...fadeUp(0.7)}
              className="mt-2 text-[5px] text-right hidden md:block"
              style={{ fontFamily: "var(--rpg-font)", color: "#9a9a9a" }}
            >
              PRESS M FOR SOUND
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
