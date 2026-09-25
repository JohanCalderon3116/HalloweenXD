import styled, { keyframes } from "styled-components";
import { Telarana } from "./EscenaHalloween";

export const SecurityOfficeAtmosphere = () => {
  return (
    <OfficeContainer aria-hidden="true">
      {/* Background Hallway Darkness & Shadowed Walls */}
      <div className="security-hallway-bg" />

      {/* Emergency Alert Light Pulse in Ceiling */}
      <div className="ceiling-alert-beacon" />

      {/* Security Office Ventilation Grate / Window */}
      <div className="security-vent-grate">
        <div className="vent-slat" />
        <div className="vent-slat" />
        <div className="vent-slat" />
        <div className="vent-slat" />
      </div>

      {/* Subtle Cobwebs in Top Corners */}
      <div className="corner-web top-left">
        <Telarana />
      </div>
      <div className="corner-web top-right">
        <Telarana />
      </div>

      {/* Glowing Carved Jack-o'-Lantern on the desk */}
      <div className="desk-pumpkin-container">
        <svg viewBox="0 0 120 100" className="pumpkin-svg">
          <defs>
            <radialGradient id="pumpkin-candle" cx="50%" cy="60%" r="50%">
              <stop offset="0%" stopColor="#fff8db" />
              <stop offset="40%" stopColor="#ff9900" />
              <stop offset="80%" stopColor="#d44e00" />
              <stop offset="100%" stopColor="#4a1800" />
            </radialGradient>
            <filter id="flicker-glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Pumpkin Stem */}
          <path d="M56 18 C54 10 59 4 67 2 C64 8 66 12 68 18 Z" fill="#2d4a1d" />
          {/* Body */}
          <g fill="#241006" stroke="#4a220e" strokeWidth="1.5">
            <ellipse cx="32" cy="60" rx="26" ry="32" />
            <ellipse cx="88" cy="60" rx="26" ry="32" />
            <ellipse cx="60" cy="60" rx="28" ry="36" />
          </g>
          {/* Carved Glowing Eyes & Grin */}
          <g className="carved-candle" fill="url(#pumpkin-candle)" filter="url(#flicker-glow)">
            {/* Angry Triangular Eyes */}
            <path d="M38 52 L52 50 L44 38 Z" />
            <path d="M68 50 L82 52 L76 38 Z" />
            {/* Nose */}
            <path d="M57 62 L63 62 L60 55 Z" />
            {/* Sinister Tooth Grin */}
            <path d="M36 66 L44 74 L50 68 L60 76 L70 68 L76 74 L84 66 L80 80 L70 88 L60 84 L50 88 L40 80 Z" />
          </g>
        </svg>
        <div className="candle-aura" />
      </div>

      {/* Hazard Warning Stripes accent on bottom border */}
      <div className="bottom-hazard-line" />
    </OfficeContainer>
  );
};

const ambientFlicker = keyframes`
  0%, 100% { opacity: 0.25; }
  25% { opacity: 0.18; }
  50% { opacity: 0.35; }
  75% { opacity: 0.22; }
  85% { opacity: 0.38; }
`;

const candleLight = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 10px rgba(255, 140, 0, 0.8)) brightness(1);
    transform: scale(1);
  }
  30% {
    filter: drop-shadow(0 0 16px rgba(255, 170, 0, 0.95)) brightness(1.15);
    transform: scale(1.02);
  }
  60% {
    filter: drop-shadow(0 0 8px rgba(255, 100, 0, 0.6)) brightness(0.9);
    transform: scale(0.98);
  }
  80% {
    filter: drop-shadow(0 0 14px rgba(255, 150, 0, 0.85)) brightness(1.08);
  }
`;

const OfficeContainer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;

  .security-hallway-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(
        circle at 50% 30%,
        rgba(35, 20, 14, 0.6) 0%,
        rgba(14, 8, 6, 0.85) 50%,
        #040202 100%
      ),
      linear-gradient(180deg, #090504 0%, #030202 100%);
  }

  .ceiling-alert-beacon {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80vw;
    max-width: 900px;
    height: 180px;
    background: radial-gradient(
      ellipse at 50% 0%,
      rgba(255, 60, 0, 0.15) 0%,
      rgba(255, 140, 0, 0.05) 50%,
      transparent 80%
    );
    animation: ${ambientFlicker} 3.8s ease-in-out infinite;
  }

  .security-vent-grate {
    position: absolute;
    top: 25px;
    right: 8%;
    width: 90px;
    height: 55px;
    border: 2px solid rgba(255, 140, 40, 0.15);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 4px;
    opacity: 0.4;

    .vent-slat {
      width: 100%;
      height: 3px;
      background: rgba(255, 140, 40, 0.25);
      border-radius: 1px;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  .corner-web {
    position: absolute;
    top: 0;
    width: clamp(110px, 16vw, 220px);
    color: rgba(230, 200, 170, 0.14);
    opacity: 0.8;

    &.top-left {
      left: 0;
    }

    &.top-right {
      right: 0;
      transform: scaleX(-1);
    }
  }

  .desk-pumpkin-container {
    position: absolute;
    bottom: 22px;
    right: 3vw;
    width: clamp(80px, 9vw, 130px);
    z-index: 2;

    .pumpkin-svg {
      width: 100%;
      height: auto;
      display: block;
    }

    .carved-candle {
      animation: ${candleLight} 2.5s ease-in-out infinite alternate;
      transform-origin: center;
    }

    .candle-aura {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 60px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 120, 0, 0.18) 0%, transparent 70%);
      animation: ${ambientFlicker} 2.2s infinite;
    }

    @media (max-width: 640px) {
      display: none;
    }
  }

  .bottom-hazard-line {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: repeating-linear-gradient(
      -45deg,
      #ffaa00 0,
      #ffaa00 12px,
      #110a06 12px,
      #110a06 24px
    );
    opacity: 0.6;
    box-shadow: 0 0 10px rgba(255, 170, 0, 0.4);
  }
`;
