import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { securityAudio } from "../../../utils/securityAudio";

const BOOT_LOGS = [
  "> FREDDY'S SECURITY OS - KERNEL v4.1987",
  "> CARGANDO CONTROLADORES DE VIDEO CRT...",
  "> COMPROBANDO CONEXIÓN A CÁMARAS 01-08... [OK]",
  "> DETECTANDO MOVIMIENTO EN CONDUCTO DE VENTILACIÓN...",
  "> INICIANDO MODO NOCTURNO: TURNO DE HALLOWEEN",
  "> SISTEMA DE CONTROL DE ACCESO PREPARADO.",
];

export const SecurityBootSequence = ({ onComplete }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState([]);
  const [isPoweringOff, setIsPoweringOff] = useState(false);

  // Fast typing & line stepping
  useEffect(() => {
    securityAudio.ensureContext();
    securityAudio.playCrtTurnOn();

    let timeoutId;
    if (currentLineIndex < BOOT_LOGS.length) {
      timeoutId = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, BOOT_LOGS[currentLineIndex]]);
        securityAudio.playTerminalBeep(700 + currentLineIndex * 80, 0.04);
        setCurrentLineIndex((prev) => prev + 1);
      }, 380);
    } else {
      // Completed, pause briefly and open console
      timeoutId = setTimeout(() => {
        finishBoot();
      }, 700);
    }

    return () => clearTimeout(timeoutId);
  }, [currentLineIndex]);

  const finishBoot = () => {
    setIsPoweringOff(true);
    securityAudio.playStaticBurst(0.2);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 450);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
      finishBoot();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <BootWrapper $exiting={isPoweringOff} onClick={finishBoot} role="region" aria-label="Security Boot Sequence">
      <div className="crt-horizontal-beam" />
      <div className="terminal-box">
        <div className="terminal-header">
          <span className="dot red" />
          <span className="dot amber" />
          <span className="dot green" />
          <span className="title-sys">TERMINAL BOOT // CCTV_SYS_1987</span>
        </div>

        <div className="terminal-body">
          {displayedLines.map((line, idx) => (
            <div key={idx} className="boot-line">
              {line}
            </div>
          ))}
          <div className="cursor-line">
            <span className="cursor-block">_</span>
          </div>
        </div>

        <div className="skip-hint">
          <span>[ CLICK O PULSA CUALQUIER TECLA PARA SALTAR ]</span>
        </div>
      </div>
    </BootWrapper>
  );
};

const crtTurnOnBeam = keyframes`
  0% { transform: scaleY(0.005) scaleX(0); filter: brightness(10); opacity: 0; }
  40% { transform: scaleY(0.008) scaleX(1); filter: brightness(5); opacity: 1; }
  70% { transform: scaleY(1) scaleX(1); filter: brightness(1.8); opacity: 1; }
  100% { transform: scaleY(1) scaleX(1); filter: brightness(1); opacity: 1; }
`;

const crtFadeOut = keyframes`
  0% { transform: scale(1); filter: brightness(1.5); opacity: 1; }
  60% { transform: scale(1.02) scaleY(0.008); filter: brightness(8); opacity: 0.9; }
  100% { transform: scale(0.8) scaleY(0); filter: brightness(0); opacity: 0; }
`;

const blinkCursor = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const BootWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  background: #060403;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  animation: ${({ $exiting }) => ($exiting ? crtFadeOut : crtTurnOnBeam)} 0.45s ease-out forwards;

  .terminal-box {
    width: 100%;
    max-width: 620px;
    background: rgba(12, 8, 6, 0.96);
    border: 2px solid #ff7700;
    box-shadow: 0 0 30px rgba(255, 119, 0, 0.3), inset 0 0 20px rgba(255, 119, 0, 0.15);
    border-radius: 8px;
    padding: 20px;
    font-family: "VT323", "Share Tech Mono", monospace;
  }

  .terminal-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 12px;
    border-bottom: 1px dashed rgba(255, 119, 0, 0.4);
    margin-bottom: 16px;

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      &.red { background: #ff3333; box-shadow: 0 0 6px #ff3333; }
      &.amber { background: #ffaa00; box-shadow: 0 0 6px #ffaa00; }
      &.green { background: #00ff66; box-shadow: 0 0 6px #00ff66; }
    }

    .title-sys {
      margin-left: 8px;
      color: #ffaa33;
      font-size: 18px;
      letter-spacing: 2px;
    }
  }

  .terminal-body {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 180px;
  }

  .boot-line {
    font-size: 20px;
    color: #ffcc66;
    letter-spacing: 1.5px;
    line-height: 1.3;
    text-shadow: 0 0 6px rgba(255, 200, 100, 0.5);
    word-break: break-word;

    &:nth-child(even) {
      color: #ffaa33;
    }
    &:last-child {
      color: #00ff88;
      text-shadow: 0 0 8px rgba(0, 255, 136, 0.6);
    }
  }

  .cursor-line {
    margin-top: 4px;
    .cursor-block {
      display: inline-block;
      width: 12px;
      height: 20px;
      background: #ffcc66;
      box-shadow: 0 0 8px #ffcc66;
      animation: ${blinkCursor} 0.6s infinite;
    }
  }

  .skip-hint {
    margin-top: 20px;
    text-align: right;
    font-size: 15px;
    color: rgba(255, 170, 51, 0.6);
    letter-spacing: 1.5px;
    animation: ${blinkCursor} 1.4s infinite;
  }
`;
