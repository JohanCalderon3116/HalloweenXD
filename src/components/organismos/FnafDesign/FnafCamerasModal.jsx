import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  PixelFreddy,
  PixelBonnie,
  PixelChica,
  PixelFoxy,
  PixelPumpkin,
} from "./PixelAnimatronics";
import { securityAudio } from "../../../utils/securityAudio";

const CAMERAS = [
  {
    id: "1A",
    name: "ESCENARIO SHOW",
    desc: "Escenario principal de animatrónicos",
    renderScene: () => (
      <div className="scene-content">
        <div className="stage-curtains" />
        <div className="characters-row">
          <div className="char-spot">
            <PixelBonnie size="110px" />
            <span className="char-label">BONNIE [GUITARRA]</span>
          </div>
          <div className="char-spot lead">
            <PixelFreddy size="120px" />
            <span className="char-label">FREDDY [VOCAL]</span>
          </div>
          <div className="char-spot">
            <PixelChica size="105px" />
            <span className="char-label">CHICA [LET'S EAT]</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "1B",
    name: "MOSTRADOR POS",
    desc: "Caja registradora y atención de pedidos",
    renderScene: () => (
      <div className="scene-content">
        <div className="pos-counter">
          <div className="counter-top" />
          <div className="char-spot">
            <PixelChica size="120px" />
            <div className="speech-balloon">¡BIENVENIDO A SOFTCREATE POS! 🍕</div>
            <span className="char-label">CHICA • VIGILANTE DE CAJA</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "2A",
    name: "PASILLO ALMACÉN",
    desc: "Pasillo oeste y control de inventario",
    renderScene: () => (
      <div className="scene-content">
        <div className="pirate-cove">
          <div className="pirate-sign">IT'S ME</div>
          <div className="char-spot">
            <PixelFoxy size="125px" />
            <span className="char-label">FOXY • PIRATE COVE / STOCK</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "3",
    name: "SALA DE EMPLEADOS",
    desc: "Zona de descanso y casilleros",
    renderScene: () => (
      <div className="scene-content">
        <div className="break-room">
          <div className="char-spot">
            <PixelPumpkin size="115px" />
            <div className="speech-balloon">¡TURNO HALLOWEEN ACTIVO! 🎃</div>
            <span className="char-label">CALABAZA BOT • GUARDIA AUXILIAR</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "4",
    name: "OFICINA CENTRAL",
    desc: "Puesto del vigilante de seguridad",
    renderScene: () => (
      <div className="scene-content">
        <div className="office-view">
          <div className="desk-monitors" />
          <div className="office-status-text">
            <span>TODAS LAS PUERTAS: CERRADAS</span>
            <span>VENTILACIÓN: EN LÍNEA</span>
            <span className="highlight-green">SISTEMA POS OPERANDO NORMALMENTE</span>
          </div>
        </div>
      </div>
    ),
  },
];

export const FnafCamerasModal = ({ isOpen, onClose }) => {
  const [activeCamId, setActiveCamId] = useState("1A");
  const [isSwitching, setIsSwitching] = useState(false);
  const [camBattery, setCamBattery] = useState(94);

  useEffect(() => {
    if (!isOpen) return;
    securityAudio.ensureContext();
    securityAudio.playCrtTurnOn();

    const batteryInterval = setInterval(() => {
      setCamBattery((prev) => Math.max(12, prev - 1));
    }, 30000);

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      clearInterval(batteryInterval);
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  const switchCamera = (camId) => {
    if (camId === activeCamId) return;
    securityAudio.ensureContext();
    securityAudio.playSecurityBeep(880);
    securityAudio.playStaticBurst(0.12);
    setIsSwitching(true);
    setActiveCamId(camId);
    setTimeout(() => {
      setIsSwitching(false);
    }, 240);
  };

  if (!isOpen) return null;

  const currentCam = CAMERAS.find((c) => c.id === activeCamId) || CAMERAS[0];

  return (
    <ModalBackdrop onClick={onClose} role="dialog" aria-modal="true">
      <TabletFrame onClick={(e) => e.stopPropagation()}>
        {/* Tablet Top Bezel */}
        <TabletHeader>
          <div className="left-info">
            <span className="rec-dot" />
            <span className="rec-text">REC</span>
            <span className="cam-title">CAM {currentCam.id} - {currentCam.name}</span>
          </div>
          <div className="right-info">
            <span className="battery-meter">BATERÍA: {camBattery}%</span>
            <button className="close-btn" onClick={onClose} title="Cerrar monitor">
              ✕ BAJAR MONITOR
            </button>
          </div>
        </TabletHeader>

        {/* Camera Viewport Screen */}
        <ScreenView $isSwitching={isSwitching}>
          <div className="scanlines-overlay" />
          <div className="vignette-overlay" />
          <div className="cctv-hud-top">
            <span>FEED EN DIRECTO • 29.97 FPS</span>
            <span>24 OCT 1987 // 12:44 AM</span>
          </div>

          {/* Dynamic Animatronic Scene */}
          <div className="scene-wrapper">
            {currentCam.renderScene()}
          </div>

          <div className="cam-desc-pill">{currentCam.desc}</div>
        </ScreenView>

        {/* Bottom Interactive Minimap / Camera Switcher */}
        <MapSwitcher>
          <div className="map-title">MAPA DE VIGILANCIA CCTV</div>
          <div className="map-buttons-grid">
            {CAMERAS.map((cam) => (
              <button
                key={cam.id}
                className={`cam-btn ${activeCamId === cam.id ? "active" : ""}`}
                onClick={() => switchCamera(cam.id)}
              >
                <span className="btn-cam-tag">CAM {cam.id}</span>
                <span className="btn-cam-label">{cam.name}</span>
              </button>
            ))}
          </div>
        </MapSwitcher>
      </TabletFrame>
    </ModalBackdrop>
  );
};

/* ---------- Keyframes ---------- */
const tabletSlideUp = keyframes`
  0% { transform: translateY(100%) scale(0.9); opacity: 0; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
`;

const blinkRed = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
`;

const staticStatic = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(5px); }
`;

/* ---------- Styles ---------- */
const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const TabletFrame = styled.div`
  width: 100%;
  max-width: 860px;
  background: #18120e;
  border: 4px solid #3d2617;
  border-radius: 18px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.95), 0 0 40px rgba(255, 140, 20, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${tabletSlideUp} 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: "VT323", "Share Tech Mono", monospace;
`;

const TabletHeader = styled.div`
  background: #0f0a07;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid rgba(255, 140, 30, 0.25);

  .left-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .rec-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ff2222;
    box-shadow: 0 0 10px #ff0000;
    animation: ${blinkRed} 1.2s infinite;
  }

  .rec-text {
    font-size: 20px;
    font-weight: 700;
    color: #ff3333;
    letter-spacing: 2px;
  }

  .cam-title {
    font-size: 20px;
    color: #ffd699;
    letter-spacing: 1.5px;
  }

  .right-info {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .battery-meter {
    font-size: 18px;
    color: #00ff88;
    letter-spacing: 1px;
  }

  .close-btn {
    background: #7f1d1d;
    border: 1px solid #ef4444;
    color: #ffffff;
    font-family: inherit;
    font-size: 16px;
    padding: 4px 12px;
    border-radius: 6px;
    cursor: pointer;
    letter-spacing: 1px;
    transition: all 0.2s ease;
    &:hover {
      background: #b91c1c;
      box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
    }
  }
`;

const ScreenView = styled.div`
  position: relative;
  background: #0a0604;
  height: clamp(260px, 45vh, 400px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  ${({ $isSwitching }) =>
    $isSwitching &&
    `
    filter: brightness(2) contrast(1.5) blur(2px);
  `}

  .scanlines-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent 2px,
      rgba(0, 0, 0, 0.4) 2px,
      rgba(0, 0, 0, 0.4) 4px
    );
    z-index: 5;
  }

  .vignette-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(circle, transparent 60%, rgba(0, 0, 0, 0.9) 100%);
    z-index: 6;
  }

  .cctv-hud-top {
    position: absolute;
    top: 12px;
    left: 18px;
    right: 18px;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    color: rgba(255, 220, 160, 0.7);
    letter-spacing: 1.5px;
    z-index: 7;
  }

  .scene-wrapper {
    position: relative;
    z-index: 3;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .scene-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .characters-row {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: clamp(16px, 4vw, 40px);
  }

  .char-spot {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    &.lead {
      transform: translateY(-8px) scale(1.05);
    }
  }

  .char-label {
    font-size: 15px;
    letter-spacing: 1.5px;
    color: #ffaa33;
    background: rgba(0, 0, 0, 0.7);
    padding: 2px 8px;
    border-radius: 4px;
    border: 1px solid rgba(255, 170, 51, 0.3);
  }

  .speech-balloon {
    background: #ffeedd;
    color: #1a0f08;
    font-family: "Share Tech Mono", monospace;
    font-size: 13px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 8px;
    border: 2px solid #ff7700;
    box-shadow: 0 0 10px rgba(255, 119, 0, 0.4);
    margin-bottom: 6px;
    animation: ${staticStatic} 2s ease-in-out infinite alternate;
  }

  .pirate-sign {
    font-size: 32px;
    letter-spacing: 4px;
    color: #ff3333;
    text-shadow: 0 0 10px #ff0000;
    margin-bottom: 12px;
  }

  .office-status-text {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 18px;
    color: #ffeedd;
    letter-spacing: 1.5px;
    text-align: center;
    .highlight-green {
      color: #00ff88;
      text-shadow: 0 0 8px rgba(0, 255, 136, 0.6);
    }
  }

  .cam-desc-pill {
    position: absolute;
    bottom: 12px;
    left: 18px;
    background: rgba(0, 0, 0, 0.75);
    border: 1px solid rgba(255, 140, 20, 0.3);
    padding: 2px 10px;
    border-radius: 4px;
    font-size: 14px;
    color: rgba(255, 200, 140, 0.85);
    letter-spacing: 1px;
    z-index: 7;
  }
`;

const MapSwitcher = styled.div`
  background: #120c08;
  padding: 14px 18px;
  border-top: 2px solid rgba(255, 140, 30, 0.2);

  .map-title {
    font-size: 16px;
    letter-spacing: 2px;
    color: #ffaa33;
    margin-bottom: 10px;
  }

  .map-buttons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 10px;
  }

  .cam-btn {
    background: rgba(28, 16, 10, 0.85);
    border: 1.5px solid rgba(255, 140, 30, 0.3);
    border-radius: 8px;
    padding: 8px 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    transition: all 0.2s ease;
    font-family: inherit;

    .btn-cam-tag {
      font-size: 16px;
      font-weight: 700;
      color: #ff9900;
      letter-spacing: 1px;
    }

    .btn-cam-label {
      font-size: 12px;
      color: rgba(240, 210, 180, 0.65);
      letter-spacing: 0.5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }

    &:hover {
      background: rgba(255, 140, 20, 0.2);
      border-color: #ffaa33;
      transform: translateY(-2px);
    }

    &.active {
      background: rgba(255, 120, 0, 0.3);
      border-color: #00ff88;
      box-shadow: 0 0 12px rgba(0, 255, 136, 0.4);

      .btn-cam-tag {
        color: #00ff88;
      }
      .btn-cam-label {
        color: #ffffff;
      }
    }
  }
`;
