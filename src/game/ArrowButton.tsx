import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "./sfx";

export const ArrowButton: React.FC<{ visible: boolean; onClick: () => void }> = ({
  visible,
  onClick,
}) => (
  <AnimatePresence>
    {visible && (
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => { sfx.play("menuOpen"); onClick(); }}
        onMouseEnter={() => sfx.play("hover")}
        aria-label="Open menu"
        className="absolute left-1/2 z-30 -translate-x-1/2 cursor-pointer"
        style={{
          bottom: "5%",
          background: "var(--rpg-paper)",
          border: "3px solid var(--rpg-frame)",
          borderRadius: 10,
          padding: "10px 18px",
          boxShadow: "inset 0 0 0 2px #fff, 0 4px 0 rgba(0,0,0,0.3)",
          animation: "arrowBounce 1.6s ease-in-out infinite",
          touchAction: "manipulation",
          minHeight: 48,
          minWidth: 64,
        }}
        whileTap={{ scale: 0.92 }}
      >
        <span
          className="block text-center"
          style={{
            fontFamily: "var(--rpg-font)",
            fontSize: 15,
            color: "var(--rpg-red)",
            lineHeight: 1,
          }}
        >
          ▲
        </span>
      </motion.button>
    )}
  </AnimatePresence>
);
