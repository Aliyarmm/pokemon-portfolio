import React, { useState, useCallback } from "react";

interface TrainerProps {
  hatClickCount: number;
  onHatClick: () => void;
}

export const Trainer: React.FC<TrainerProps> = ({ hatClickCount, onHatClick }) => {
  const [isExcited, setIsExcited] = useState(false);

  const handleHatClick = useCallback(() => {
    onHatClick();
    if (hatClickCount >= 4) {
      setIsExcited(true);
      setTimeout(() => setIsExcited(false), 2000);
    }
  }, [hatClickCount, onHatClick]);

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 z-[5]"
      style={{ bottom: "20%", animation: "trainerIdle 3s ease-in-out infinite" }}
    >
      <div
        className="relative cursor-pointer"
        style={{ animation: "trainerBreathe 4s ease-in-out infinite" }}
        onClick={handleHatClick}
      >
        {/* Shadow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-black/20"
          style={{ width: "40px", height: "8px" }}
        />

        {/* Body */}
        <div className="relative" style={{ width: "48px", height: "72px" }}>
          {/* Hat */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
            style={{
              width: "32px",
              height: "14px",
              background: "#E53935",
              borderRadius: "4px 4px 0 0",
              transition: "transform 0.2s",
              transform: isExcited ? "rotate(-15deg) translateY(-5px)" : undefined,
            }}
          >
            {/* Hat brim */}
            <div
              className="absolute -bottom-1 -left-2"
              style={{
                width: "36px",
                height: "6px",
                background: "#C62828",
                borderRadius: "2px",
              }}
            />
            {/* Hat emblem */}
            <div
              className="absolute top-1 left-1/2 -translate-x-1/2 rounded-full"
              style={{
                width: "8px",
                height: "8px",
                background: "white",
                border: "2px solid #E53935",
              }}
            />
          </div>

          {/* Hair */}
          <div
            className="absolute top-[12px] left-1/2 -translate-x-1/2"
            style={{
              width: "24px",
              height: "10px",
              background: "#3E2723",
              borderRadius: "0 0 4px 4px",
            }}
          />

          {/* Face */}
          <div
            className="absolute top-[18px] left-1/2 -translate-x-1/2"
            style={{
              width: "20px",
              height: "14px",
              background: "#FFCC80",
              borderRadius: "4px",
            }}
          >
            {/* Eyes */}
            <div className="absolute top-[4px] left-[3px] w-[3px] h-[3px] bg-[#3E2723] rounded-full" />
            <div className="absolute top-[4px] right-[3px] w-[3px] h-[3px] bg-[#3E2723] rounded-full" />
            {/* Mouth */}
            <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-[4px] h-[1px] bg-[#5D4037] rounded-full" />
          </div>

          {/* Shirt */}
          <div
            className="absolute top-[30px] left-1/2 -translate-x-1/2"
            style={{
              width: "28px",
              height: "18px",
              background: "#42A5F5",
              borderRadius: "2px",
            }}
          >
            {/* Collar */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[6px] h-[4px] bg-white" />
          </div>

          {/* Arms */}
          <div
            className="absolute top-[32px]"
            style={{
              left: "0px",
              width: "8px",
              height: "16px",
              background: "#42A5F5",
              borderRadius: "2px",
            }}
          />
          <div
            className="absolute top-[32px]"
            style={{
              right: "0px",
              width: "8px",
              height: "16px",
              background: "#42A5F5",
              borderRadius: "2px",
            }}
          />

          {/* Pants */}
          <div
            className="absolute top-[46px] left-1/2 -translate-x-1/2"
            style={{
              width: "24px",
              height: "14px",
              background: "#37474F",
              borderRadius: "0 0 2px 2px",
            }}
          />

          {/* Shoes */}
          <div
            className="absolute bottom-0 left-[6px]"
            style={{
              width: "12px",
              height: "6px",
              background: "#5D4037",
              borderRadius: "2px",
            }}
          />
          <div
            className="absolute bottom-0 right-[6px]"
            style={{
              width: "12px",
              height: "6px",
              background: "#5D4037",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Excited sparkles */}
        {isExcited && (
          <>
            <div
              className="absolute -top-4 -left-4 text-[12px]"
              style={{ animation: "particleFloat 1s ease-out forwards" }}
            >
              ✨
            </div>
            <div
              className="absolute -top-2 -right-6 text-[12px]"
              style={{ animation: "particleFloat 1.2s ease-out 0.2s forwards" }}
            >
              ⭐
            </div>
            <div
              className="absolute -top-6 right-0 text-[12px]"
              style={{ animation: "particleFloat 0.8s ease-out 0.4s forwards" }}
            >
              💫
            </div>
          </>
        )}
      </div>

      {/* Trainer name tag */}
      <div
        className="text-center mt-1"
        style={{
          fontFamily: "var(--rpg-font)",
          fontSize: "8px",
          color: "white",
          textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
        }}
      >
        ABID
      </div>
    </div>
  );
};
