import styled, { keyframes } from "styled-components";
import { securityAudio } from "../../../utils/securityAudio";

export const FnafFloatingLauncher = ({ onOpen }) => {
  const handleClick = () => {
    securityAudio.ensureContext();
    securityAudio.playTactileClick();
    if (onOpen) onOpen();
  };

  return (
    <FloatingBtn onClick={handleClick} title="Abrir sistema de cámaras CCTV FNAF">
      <span className="live-pulse" />
      <span className="icon-cam">📹</span>
      <span className="label-text">MONITOR CCTV FNAF</span>
    </FloatingBtn>
  );
};

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.4), 0 4px 15px rgba(0, 0, 0, 0.4);
    border-color: rgba(239, 68, 68, 0.7);
  }
  50% {
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.8), 0 4px 20px rgba(0, 0, 0, 0.6);
    border-color: #ef4444;
  }
`;

const blinkDot = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(0.8); }
`;

const FloatingBtn = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(20, 12, 8, 0.94);
  border: 1.5px solid #ef4444;
  border-radius: 30px;
  padding: 8px 16px;
  color: #ffeedd;
  font-family: "Share Tech Mono", monospace;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  animation: ${pulseGlow} 2.5s infinite;
  backdrop-filter: blur(8px);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-3px) scale(1.04);
    background: rgba(35, 18, 10, 0.98);
    color: #ffffff;
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  .live-pulse {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ef4444;
    animation: ${blinkDot} 1.2s infinite;
  }

  .icon-cam {
    font-size: 15px;
  }

  .label-text {
    white-space: nowrap;
    @media (max-width: 640px) {
      display: none;
    }
  }

  @media (max-width: 640px) {
    bottom: 16px;
    right: 16px;
    padding: 10px;
    border-radius: 50%;
  }
`;
