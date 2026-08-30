import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trainer } from "@/data";

interface TrainerPanelProps {
  isOpen: boolean;
}

export const TrainerPanel: React.FC<TrainerPanelProps> = ({ isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -30, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute left-4 bottom-20 md:left-8 md:bottom-24 z-20"
        >
          <div
            className="pixel-border relative"
            style={{
              background: "linear-gradient(180deg, #0f3460 0%, #1a1a2e 100%)",
              padding: "12px 16px",
              minWidth: "200px",
              maxWidth: "240px",
            }}
          >
            {/* Decorative top */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{
                background: "linear-gradient(90deg, var(--rpg-gold), transparent)",
              }}
            />

            {/* Name */}
            <div
              style={{
                fontFamily: "var(--rpg-font)",
                fontSize: "14px",
                color: "var(--rpg-gold)",
                marginBottom: "4px",
                textShadow: "0 0 8px rgba(251, 191, 36, 0.5)",
              }}
            >
              {trainer.name}
            </div>

            {/* Class */}
            <div
              style={{
                fontFamily: "var(--rpg-font)",
                fontSize: "8px",
                color: "var(--rpg-accent)",
                marginBottom: "8px",
              }}
            >
              {trainer.class}
            </div>

            {/* Separator */}
            <div
              className="mb-2"
              style={{
                height: "2px",
                background: "linear-gradient(90deg, var(--rpg-panel-border), transparent)",
              }}
            />

            {/* Specialty */}
            <div
              style={{
                fontFamily: "var(--rpg-font)",
                fontSize: "7px",
                color: "var(--rpg-text-dim)",
                lineHeight: "1.6",
                marginBottom: "6px",
              }}
            >
              {trainer.specialty.join(" • ")}
            </div>

            {/* Description */}
            <div
              style={{
                fontFamily: "var(--rpg-font)",
                fontSize: "6px",
                color: "var(--rpg-text)",
                lineHeight: "1.8",
                opacity: 0.8,
              }}
            >
              {trainer.description}
            </div>

            {/* Decorative bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{
                background: "linear-gradient(90deg, var(--rpg-accent), transparent)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
