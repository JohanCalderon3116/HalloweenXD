import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { PixelFreddy, PixelPumpkin, PixelBonnie } from "./PixelAnimatronics";
import { securityAudio } from "../../../utils/securityAudio";

const PHRASES = [
  "¡Bienvenido al turno de hoy! 🍕",
  "¡Ventas monstruosas en caja! 🎃",
  "¡Cámara 1B activa: todo seguro! 📹",
  "¡Pídele a Chica una rebanada! 🍰",
  "¡SoftCreate POS listo para facturar! ⚡",
  "¡Cuidado con la batería del monitor! 🔋",
];

export const PixelAnimatronicSidebar = ({ isOpen, onOpenCameras }) => {
  const [mascotIndex, setMascotIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showSpeech, setShowSpeech] = useState(false);

  const mascots = [
    { component: <PixelFreddy size={isOpen ? "44px" : "36px"} />, name: "Freddy" },
    { component: <PixelPumpkin size={isOpen ? "44px" : "36px"} />, name: "Calabaza Bot" },
    { component: <PixelBonnie size={isOpen ? "44px" : "36px"} />, name: "Bonnie" },
  ];

  const handleClick = (e) => {
    e.stopPropagation();
    securityAudio.ensureContext();
    securityAudio.playSecurityBeep(980);
    // Cycle phrases & mascots
    setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    setShowSpeech(true);
    setMascotIndex((prev) => (prev + 1) % mascots.length);

    setTimeout(() => {
      setShowSpeech(false);
    }, 4500);
  };

  const handleOpenCCTV = (e) => {
    e.stopPropagation();
    securityAudio.ensureContext();
    securityAudio.playTactileClick();
    if (onOpenCameras) onOpenCameras();
  };

  const currentMascot = mascots[mascotIndex];

  return (
    <MascotContainer $isopen={isOpen} onClick={handleClick} title="Haz clic en tu animatrónico guardián">
      {showSpeech && isOpen && (
        <SpeechBubble onClick={(e) => e.stopPropagation()}>
          {PHRASES[phraseIndex]}
        </SpeechBubble>
      )}

      <div className="mascot-avatar">
        {currentMascot.component}
      </div>

      {isOpen && (
        <div className="mascot-info">
          <div className="mascot-header">
            <span className="live-dot" />
            <span className="mascot-name">GUARDIÁN NOCTURNO</span>
          </div>
          <button type="button" className="cctv-launch-btn" onClick={handleOpenCCTV}>
            📹 CÁMARAS FNAF
          </button>
        </div>
      )}
    </MascotContainer>
  );
};

const popIn = keyframes`
  0% { transform: translateY(8px) scale(0.85); opacity: 0; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
`;

const blinkLive = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

const MascotContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 12px 10px;
  padding: ${({ $isopen }) => ($isopen ? "10px 12px" : "8px 4px")};
  justify-content: ${({ $isopen }) => ($isopen ? "flex-start" : "center")};
  background: ${({ theme }) =>
    theme.body === "#080808"
      ? "linear-gradient(135deg, rgba(35, 20, 12, 0.9) 0%, rgba(20, 10, 6, 0.95) 100%)"
      : "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)"};
  border: 1.5px solid ${({ theme }) => theme.halloweenPrimary};
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.15);
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(217, 119, 6, 0.28);
  }

  .mascot-avatar {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mascot-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;
    overflow: hidden;
  }

  .mascot-header {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .live-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 6px #22c55e;
    animation: ${blinkLive} 1.5s infinite;
  }

  .mascot-name {
    font-family: "VT323", "Share Tech Mono", monospace;
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.halloweenPrimary};
    letter-spacing: 1px;
    white-space: nowrap;
  }

  .cctv-launch-btn {
    background: ${({ theme }) => theme.halloweenPrimary};
    color: #ffffff;
    border: none;
    padding: 3px 8px;
    border-radius: 6px;
    font-family: "Share Tech Mono", monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
      background: #ea580c;
      transform: scale(1.03);
    }
  }
`;

const SpeechBubble = styled.div`
  position: absolute;
  bottom: 105%;
  left: 10px;
  right: 10px;
  background: #18110b;
  color: #ffeedd;
  border: 1.5px solid #ff7700;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  padding: 6px 10px;
  font-family: "Share Tech Mono", monospace;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  z-index: 50;
  animation: ${popIn} 0.25s ease-out;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 24px;
    border-width: 6px;
    border-style: solid;
    border-color: #ff7700 transparent transparent transparent;
  }
`;
