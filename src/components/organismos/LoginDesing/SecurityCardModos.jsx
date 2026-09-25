import styled, { keyframes } from "styled-components";
import { securityAudio } from "../../../utils/securityAudio";

export function SecurityCardModos({
  title,
  subtitle,
  img,
  bgcolor,
  level = "01",
  statusColor = "#ff3333",
  funcion,
}) {
  const handleClick = (e) => {
    securityAudio.ensureContext();
    securityAudio.playTactileClick();
    if (funcion) funcion(e);
  };

  const handleMouseEnter = () => {
    securityAudio.playTerminalBeep(1200, 0.02);
  };

  return (
    <CardContainer
      $bgcolor={bgcolor}
      $statusColor={statusColor}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick(e);
      }}
    >
      <div className="card-inner">
        {/* Left Indicator & Clearance Badge */}
        <div className="security-stripe" />

        <div className="content-col">
          <div className="header-row">
            <span className="clearance-tag">AUTORIZACIÓN NIVEL-{level}</span>
            <span className="status-led" />
          </div>
          <h3 className="role-title">{title}</h3>
          <p className="role-subtitle">{subtitle}</p>
        </div>

        {/* Right Badge Icon */}
        <div className="icon-col">
          <div className="img-frame">
            <img src={img} alt={title} className="character-icon" />
          </div>
          <span className="access-arrow">►</span>
        </div>
      </div>
      <div className="hover-scanline" />
    </CardContainer>
  );
}

const ledBlink = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(0.85); }
`;

const scanSweep = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const CardContainer = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    rgba(25, 14, 9, 0.95) 0%,
    rgba(14, 8, 5, 0.98) 100%
  );
  border: 1.5px solid rgba(255, 140, 40, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.7),
              inset 0 1px 0 rgba(255, 200, 150, 0.1);
  overflow: hidden;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;

  &:hover {
    transform: translateY(-3px) scale(1.01);
    border-color: ${({ $statusColor }) => $statusColor || "#ffaa00"};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.85),
                0 0 15px ${({ $statusColor }) => $statusColor ? `${$statusColor}44` : "rgba(255, 140, 40, 0.3)"};

    .hover-scanline {
      opacity: 1;
    }

    .access-arrow {
      transform: translateX(4px);
      color: ${({ $statusColor }) => $statusColor || "#ffaa00"};
    }
  }

  &:active {
    transform: translateY(0) scale(0.99);
  }

  .card-inner {
    position: relative;
    z-index: 2;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .security-stripe {
    width: 4px;
    align-self: stretch;
    border-radius: 2px;
    background: ${({ $statusColor }) => $statusColor || "#ffaa00"};
    box-shadow: 0 0 8px ${({ $statusColor }) => $statusColor || "#ffaa00"};
  }

  .content-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 3px;
  }

  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .clearance-tag {
    font-family: "VT323", "Share Tech Mono", monospace;
    font-size: 13px;
    letter-spacing: 1.5px;
    color: ${({ $statusColor }) => $statusColor || "#ffaa00"};
    text-shadow: 0 0 6px ${({ $statusColor }) => $statusColor ? `${$statusColor}66` : "transparent"};
    font-weight: 600;
  }

  .status-led {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ $statusColor }) => $statusColor || "#ffaa00"};
    box-shadow: 0 0 6px ${({ $statusColor }) => $statusColor || "#ffaa00"};
    animation: ${ledBlink} 1.8s infinite;
  }

  .role-title {
    font-size: 17px;
    font-weight: 700;
    color: #ffeedd;
    margin: 0;
    letter-spacing: 0.5px;
  }

  .role-subtitle {
    font-size: 13px;
    color: rgba(220, 200, 180, 0.7);
    margin: 0;
    line-height: 1.3;
  }

  .icon-col {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .img-frame {
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.45);
    border: 1px solid rgba(255, 140, 40, 0.2);
    border-radius: 8px;
    padding: 4px;

    .character-icon {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6));
    }
  }

  .access-arrow {
    font-size: 14px;
    color: rgba(255, 170, 50, 0.5);
    transition: transform 0.2s ease, color 0.2s ease;
  }

  .hover-scanline {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(255, 160, 50, 0.08) 50%,
      transparent 100%
    );
    opacity: 0;
    animation: ${scanSweep} 2s linear infinite;
  }
`;
