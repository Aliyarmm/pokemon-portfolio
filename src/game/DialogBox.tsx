import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "./sfx";

interface DialogBoxProps {
  text: string;
  speed?: number; // ms per char
  onDone?: () => void;
  className?: string;
  showPrompt?: boolean;
}

/** Classic Pokémon dialog box — rounded pixel frame on light parchment. */
export const DialogBox: React.FC<DialogBoxProps> = ({
  text,
  speed = 18,
  onDone,
  className = "",
  showPrompt = true,
}) => {
  const [shown, setShown] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    setShown(0);
    doneRef.current = false;
  }, [text]);

  useEffect(() => {
    if (shown >= text.length) {
      if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
      return;
    }
    const t = setTimeout(() => {
      setShown((s) => {
        if (s % 3 === 0) sfx.play("hover");
        return s + 1;
      });
    }, speed);
    return () => clearTimeout(t);
  }, [shown, text, speed, onDone]);

  const complete = shown >= text.length;

  return (
    <div className={`dialog-frame ${className}`}>
      <p className="dialog-text">
        {text.slice(0, shown)}
        {!complete && <span className="dialog-caret">▌</span>}
        {complete && showPrompt && (
          <span className="dialog-next" aria-hidden>
            ▼
          </span>
        )}
      </p>
    </div>
  );
};

/** Full-width bottom dialog used on world screen. */
export const WorldDialog: React.FC<{
  text: string;
  visible: boolean;
  onDone?: () => void;
}> = ({ text, visible, onDone }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.25 }}
        className="absolute left-2 right-2 bottom-2 z-30 md:left-8 md:right-8 md:bottom-6"
      >
        <DialogBox text={text} onDone={onDone} />
      </motion.div>
    )}
  </AnimatePresence>
);
