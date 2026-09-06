import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trainer } from "@/data";
import { PixelSprite } from "./PixelSprite";
import { trainerSprite } from "./sprites";

export const TrainerPanel: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute left-2 top-14 z-30 md:left-6 md:top-20 w-1/3"
        >
          <div className="panel-frame p-2.5 md:p-3 flex flex-col min-h-[210px] md:min-h-[290px]">
            {/* portrait + name */}
            <div className="flex items-center gap-2 mb-2">
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
            </div>

            <div className="panel-sep" />

            <div
              className="text-[6px] md:text-[7px] leading-relaxed"
              style={{ fontFamily: "var(--rpg-font)", color: "#4a4a4a" }}
            >
              {trainer.specialty.join(" · ")}
            </div>

            <p
              className="mt-2 text-[6px] md:text-[7px] leading-loose"
              style={{ fontFamily: "var(--rpg-font)", color: "#6a6a6a" }}
            >
              {trainer.description}
            </p>

            {/* HP-style level bar — pinned to the bottom of the extended panel */}
            <div className="mt-auto pt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="stat-label">HP</span>
                <span className="stat-label" style={{ color: "var(--rpg-green)" }}>
                  Lv {trainer.stats.level}
                </span>
              </div>
              <div className="hp-bar">
                <div className="hp-fill" style={{ width: "78%" }} />
              </div>
            </div>

            <div
              className="mt-2 text-[5px] text-right hidden md:block"
              style={{ fontFamily: "var(--rpg-font)", color: "#9a9a9a" }}
            >
              PRESS M FOR SOUND
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
