import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ArrowButtonProps {
  visible: boolean;
  onClick: () => void;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({ visible, onClick }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          onClick={onClick}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
          style={{
            background: "rgba(15, 52, 96, 0.8)",
            border: "3px solid var(--rpg-gold)",
            padding: "10px 20px",
            animation: "arrowBounce 2s ease-in-out infinite, arrowGlow 3s ease-in-out infinite",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div
            className="text-center"
            style={{
              fontFamily: "var(--rpg-font)",
              fontSize: "16px",
              color: "var(--rpg-gold)",
              lineHeight: 1,
            }}
          >
            ▲
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
