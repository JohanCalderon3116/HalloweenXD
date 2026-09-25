import styled, { keyframes } from "styled-components";
import { PixelFreddy } from "./PixelAnimatronics";
import { useFnafStore } from "../../../store/FnafStore";
import { securityAudio } from "../../../utils/securityAudio";

export const CardFnafSecurityWidget = () => {
  const { openCameras } = useFnafStore();

  const handleOpen = () => {
    securityAudio.ensureContext();
    securityAudio.playTactileClick();
    openCameras();
  };

  return (
    <WidgetContainer onClick={handleOpen} title="Clic para monitorear las cámaras CCTV">
      <div className="widget-header">
        <div className="left-tag">
          <span className="live-dot" />
          <span className="tag-text">CCTV FNAF • EN VIVO</span>
        </div>
        <span className="cam-id">CAM 1A</span>
      </div>

      <div className="widget-body">
        <div className="mascot-box">
          <PixelFreddy size="58px" />
        </div>
        <div className="widget-info">
          <span className="status-title">Turno Nocturno 1987</span>
          <span className="status-subtitle">Animatrónicos en sus puestos</span>
          <div className="badge-row">
            <span className="pill-secure">SEGURIDAD: OK</span>
            <span className="pill-cam">5 CÁMARAS</span>
          </div>
        </div>
      </div>

      <div className="widget-footer">
        <span className="action-hint">► CLICK PARA ABRIR MONITOR CCTV</span>
      </div>
    </WidgetContainer>
  );
};

const pulseLive = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(0.85); }
`;

const scanlineMove = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const WidgetContainer = styled.div`
  position: relative;
  border-radius: 18px;
  background: ${({ theme }) =>
    theme.body === "#080808"
      ? "linear-gradient(135deg, rgba(32, 18, 12, 0.95) 0%, rgba(16, 8, 5, 0.98) 100%)"
      : "linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)"};
  border: 1.5px solid ${({ theme }) => theme.halloweenPrimary};
  box-shadow: 0 4px 15px rgba(217, 119, 6, 0.12);
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.25s ease;
  user-select: none;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(217, 119, 6, 0.25);
    border-color: #ea580c;

    .action-hint {
      color: #ea580c;
      transform: translateX(4px);
    }
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(249, 115, 22, 0.05) 50%,
      transparent 100%
    );
    opacity: 0.6;
    animation: ${scanlineMove} 4s linear infinite;
  }

  .widget-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .left-tag {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .live-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ef4444;
    box-shadow: 0 0 6px #ef4444;
    animation: ${pulseLive} 1.4s infinite;
  }

  .tag-text {
    font-family: "VT323", "Share Tech Mono", monospace;
    font-size: 14px;
    font-weight: 700;
    color: #ef4444;
    letter-spacing: 1px;
  }

  .cam-id {
    font-family: "VT323", "Share Tech Mono", monospace;
    font-size: 13px;
    color: ${({ theme }) => theme.halloweenPrimary};
    background: rgba(249, 115, 22, 0.12);
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid rgba(249, 115, 22, 0.3);
  }

  .widget-body {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .mascot-box {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    border: 1px solid rgba(249, 115, 22, 0.2);
  }

  .widget-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
    text-align: left;
  }

  .status-title {
    font-size: 16px;
    font-weight: 800;
    color: ${({ theme }) => theme.text};
    letter-spacing: 0.5px;
  }

  .status-subtitle {
    font-size: 12px;
    color: ${({ theme }) => theme.colorsubtitlecard || "#888888"};
  }

  .badge-row {
    display: flex;
    gap: 6px;
    margin-top: 4px;
  }

  .pill-secure {
    font-family: "Share Tech Mono", monospace;
    font-size: 10px;
    color: #10b981;
    background: rgba(16, 185, 129, 0.12);
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid rgba(16, 185, 129, 0.3);
    font-weight: 700;
  }

  .pill-cam {
    font-family: "Share Tech Mono", monospace;
    font-size: 10px;
    color: #f59e0b;
    background: rgba(245, 158, 11, 0.12);
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid rgba(245, 158, 11, 0.3);
    font-weight: 700;
  }

  .widget-footer {
    border-top: 1px dashed rgba(249, 115, 22, 0.2);
    padding-top: 6px;
    text-align: right;
  }

  .action-hint {
    font-family: "VT323", "Share Tech Mono", monospace;
    font-size: 13px;
    color: ${({ theme }) => theme.halloweenPrimary};
    letter-spacing: 1px;
    transition: transform 0.2s ease, color 0.2s ease;
    display: inline-block;
  }
`;
