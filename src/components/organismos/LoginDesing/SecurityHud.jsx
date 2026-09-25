import { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { securityAudio } from "../../../utils/securityAudio";

export const SecurityHud = ({ isGlitching = false, onToggleSound, isMuted = false }) => {
  // Survival Horror Night shift timer: cycles from 12:00 AM to 6:00 AM
  const [shiftHour, setShiftHour] = useState(12);
  const [powerLevel, setPowerLevel] = useState(94);
  const [liveSeconds, setLiveSeconds] = useState(0);

  // Time simulation with unmount protection
  useEffect(() => {
    let isMounted = true;

    const clockInterval = setInterval(() => {
      if (isMounted) {
        setLiveSeconds((prev) => (prev + 1) % 60);
      }
    }, 1000);

    const shiftInterval = setInterval(() => {
      if (isMounted) {
        setShiftHour((prev) => (prev === 12 ? 1 : prev >= 5 ? 12 : prev + 1));
        setPowerLevel((prev) => Math.max(15, prev - Math.floor(Math.random() * 2 + 1)));
      }
    }, 45000);

    return () => {
      isMounted = false;
      clearInterval(clockInterval);
      clearInterval(shiftInterval);
    };
  }, []);

  const handleAudioClick = () => {
    securityAudio.ensureContext();
    const muted = securityAudio.toggleMute();
    if (!muted) {
      securityAudio.playSecurityBeep(1000);
    }
    if (onToggleSound) onToggleSound(muted);
  };

  const formattedSeconds = liveSeconds < 10 ? `0${liveSeconds}` : liveSeconds;

  return (
    <HudContainer $glitch={isGlitching} aria-hidden="true">
      {/* Top Left: CCTV Camera Status */}
      <HudSection className="top-left">
        <div className="rec-badge">
          <span className="rec-dot" />
          <span className="rec-text">REC</span>
        </div>
        <div className="cam-title">CAM_01: OFICINA DE SEGURIDAD</div>
        <div className="cam-meta">
          <span>24 OCT 1987</span>
          <span className="sep">•</span>
          <span>SP-FEED 29.97 FPS</span>
        </div>
      </HudSection>

      {/* Top Right: Survival Horror Clock */}
      <HudSection className="top-right">
        <div className="night-badge">NOCHE 1 • TURNO HALLOWEEN</div>
        <div className="shift-clock">
          {shiftHour}:00 <span className="am-label">AM</span>
          <span className="seconds-live">:{formattedSeconds}</span>
        </div>
        <button
          type="button"
          className="audio-toggle-btn"
          onClick={handleAudioClick}
          title="Activar/Desactivar efectos de sonido retro"
        >
          {isMuted ? "🔇 AUDIO: SILENCIO" : "🔊 AUDIO: ACTIVO"}
        </button>
      </HudSection>

      {/* Bottom Left: Power & Battery Gauge */}
      <HudSection className="bottom-left">
        <div className="gauge-label">
          <span>POTENCIA RESTANTE:</span>
          <span className="gauge-val">{powerLevel}%</span>
        </div>
        <div className="gauge-meter">
          <div
            className="gauge-fill"
            style={{
              width: `${powerLevel}%`,
              backgroundColor: powerLevel > 40 ? "#00ff66" : powerLevel > 20 ? "#ffb300" : "#ff3333",
            }}
          />
        </div>
        <div className="doors-status">DEFENSA / PUERTAS: OPERATIVO</div>
      </HudSection>

      {/* Bottom Right: Surveillance Network Tag */}
      <HudSection className="bottom-right">
        <div className="hud-corner-tag">SISTEMA CCTV FREDDY-NET v2.4</div>
        <div className="motion-status">
          <span className="radar-blip" />
          <span>SENSORES: MONITOREANDO</span>
        </div>
      </HudSection>
    </HudContainer>
  );
};

const pulseRec = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.2; transform: scale(0.9); }
`;

const glitchJitter = keyframes`
  0% { transform: translate(0, 0); }
  25% { transform: translate(-3px, 1px); }
  50% { transform: translate(2px, -2px); }
  75% { transform: translate(-1px, 2px); }
  100% { transform: translate(0, 0); }
`;

const HudContainer = styled.aside`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 12;
  font-family: "VT323", "Share Tech Mono", monospace;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #ffeedd;
  user-select: none;

  ${({ $glitch }) =>
    $glitch &&
    css`
      animation: ${glitchJitter} 0.2s steps(2) infinite;
      filter: drop-shadow(-2px 0 #ff0055) drop-shadow(2px 0 #00ffff);
    `}

  @media (max-width: 768px) {
    padding: 10px 12px;
  }
`;

const HudSection = styled.div`
  display: flex;
  flex-direction: column;
  pointer-events: auto;

  &.top-left {
    position: absolute;
    top: 18px;
    left: 24px;
    text-align: left;
    @media (max-width: 768px) {
      top: 10px;
      left: 12px;
    }
  }

  &.top-right {
    position: absolute;
    top: 18px;
    right: 24px;
    text-align: right;
    align-items: flex-end;
    @media (max-width: 768px) {
      top: 10px;
      right: 12px;
    }
  }

  &.bottom-left {
    position: absolute;
    bottom: 18px;
    left: 24px;
    text-align: left;
    @media (max-width: 768px) {
      display: none;
    }
  }

  &.bottom-right {
    position: absolute;
    bottom: 18px;
    right: 24px;
    text-align: right;
    align-items: flex-end;
    @media (max-width: 768px) {
      display: none;
    }
  }

  .rec-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(180, 0, 0, 0.35);
    border: 1px solid rgba(255, 50, 50, 0.6);
    padding: 2px 8px;
    border-radius: 4px;
    width: fit-content;
  }

  .rec-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ff2222;
    box-shadow: 0 0 8px #ff0000;
    animation: ${pulseRec} 1.2s infinite;
  }

  .rec-text {
    font-size: 18px;
    letter-spacing: 2px;
    font-weight: 700;
    color: #ff4444;
    text-shadow: 0 0 6px #ff0000;
  }

  .cam-title {
    margin-top: 5px;
    font-size: 20px;
    letter-spacing: 1.5px;
    color: #e6c888;
    text-shadow: 0 0 8px rgba(230, 200, 136, 0.4);
  }

  .cam-meta {
    font-size: 15px;
    color: rgba(220, 200, 170, 0.65);
    display: flex;
    gap: 8px;
    letter-spacing: 1px;
    .sep {
      color: #ff7700;
    }
  }

  .night-badge {
    font-size: 15px;
    letter-spacing: 1.5px;
    color: #ff9900;
    text-shadow: 0 0 6px rgba(255, 153, 0, 0.5);
  }

  .shift-clock {
    font-size: 38px;
    letter-spacing: 2px;
    line-height: 1.1;
    color: #ffffff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 120, 0, 0.5);
    .am-label {
      font-size: 22px;
      color: #ffaa33;
    }
    .seconds-live {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .audio-toggle-btn {
    margin-top: 6px;
    background: rgba(20, 12, 8, 0.85);
    border: 1px solid rgba(255, 150, 40, 0.4);
    color: #ffaa44;
    padding: 3px 10px;
    font-family: inherit;
    font-size: 14px;
    letter-spacing: 1px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      background: rgba(255, 120, 20, 0.25);
      border-color: #ff9922;
      color: #ffffff;
      box-shadow: 0 0 8px rgba(255, 120, 20, 0.4);
    }
  }

  .gauge-label {
    font-size: 16px;
    letter-spacing: 1px;
    display: flex;
    gap: 8px;
    color: #bbb;
    .gauge-val {
      font-weight: 700;
      color: #ffffff;
    }
  }

  .gauge-meter {
    width: 140px;
    height: 8px;
    background: rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    overflow: hidden;
    margin: 4px 0;
  }

  .gauge-fill {
    height: 100%;
    transition: width 0.4s ease, background-color 0.4s ease;
    box-shadow: 0 0 6px currentColor;
  }

  .doors-status, .hud-corner-tag {
    font-size: 14px;
    color: rgba(200, 180, 150, 0.6);
    letter-spacing: 1px;
  }

  .motion-status {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 15px;
    color: #00ffaa;
    text-shadow: 0 0 6px rgba(0, 255, 170, 0.4);
  }

  .radar-blip {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #00ffaa;
    animation: ${pulseRec} 2s infinite;
  }
`;
