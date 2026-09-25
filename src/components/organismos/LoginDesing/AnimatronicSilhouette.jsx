import styled, { css, keyframes } from "styled-components";

// Original, generic animatronic silhouette with robotic endoskeleton details and glowing eyes
export const AnimatronicSilhouette = ({ isVisible = false, peekPosition = "center" }) => {
  return (
    <SilhouetteContainer
      $visible={isVisible}
      $position={peekPosition}
      aria-hidden="true"
      style={{ opacity: 0.18, filter: 'brightness(0.7)' }}
    >
      <div className="animatronic-glow" />
      <svg
        className="animatronic-svg"
        viewBox="0 0 300 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="horror-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="eye-glow-radial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#ffb300" />
            <stop offset="70%" stopColor="#ff3300" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Head Shell Silhouette */}
        <g className="head-silhouette">
          {/* Left Mechanical Ear */}
          <path
            d="M80 90 C70 40, 95 10, 115 15 C130 18, 125 55, 110 85 Z"
            fill="#090504"
            stroke="#261611"
            strokeWidth="3"
          />
          <path
            d="M92 75 L98 40"
            stroke="#553322"
            strokeWidth="2"
            strokeDasharray="2 2"
          />

          {/* Right Mechanical Ear */}
          <path
            d="M220 90 C230 40, 205 10, 185 15 C170 18, 175 55, 190 85 Z"
            fill="#090504"
            stroke="#261611"
            strokeWidth="3"
          />
          <path
            d="M208 75 L202 40"
            stroke="#553322"
            strokeWidth="2"
            strokeDasharray="2 2"
          />

          {/* Upper Head / Brow */}
          <path
            d="M70 150 C65 100, 100 80, 150 80 C200 80, 235 100, 230 150 C230 170, 220 185, 205 195 C190 202, 110 202, 95 195 C80 185, 70 170, 70 150 Z"
            fill="#080403"
            stroke="#2b1a13"
            strokeWidth="3"
          />

          {/* Metallic Endoskeleton Brow Seams */}
          <path
            d="M100 135 Q150 145 200 135"
            stroke="#1c100b"
            strokeWidth="2.5"
            fill="none"
          />

          {/* Snout / Muzzle */}
          <ellipse
            cx="150"
            cy="195"
            rx="48"
            ry="30"
            fill="#0d0705"
            stroke="#2e1a12"
            strokeWidth="2"
          />
          {/* Triangular Animatronic Nose */}
          <path
            d="M142 182 Q150 177 158 182 L150 192 Z"
            fill="#1f110b"
          />

          {/* Heavy Hinged Lower Jaw */}
          <path
            d="M95 210 Q90 270 150 275 Q210 270 205 210 Q190 225 150 225 Q110 225 95 210 Z"
            fill="#050302"
            stroke="#261611"
            strokeWidth="3"
          />

          {/* Endoskeleton Jaw Hinges (Bolts/Rivets) */}
          <circle cx="86" cy="205" r="5" fill="#3a2218" stroke="#110a07" />
          <circle cx="214" cy="205" r="5" fill="#3a2218" stroke="#110a07" />

          {/* Metallic Flat Endoskeleton Teeth */}
          <g fill="#4a3e35" stroke="#110905" strokeWidth="1">
            {/* Upper Teeth */}
            <rect x="122" y="210" width="8" height="10" rx="1" />
            <rect x="134" y="211" width="8" height="11" rx="1" />
            <rect x="146" y="211" width="8" height="11" rx="1" />
            <rect x="158" y="211" width="8" height="11" rx="1" />
            <rect x="170" y="210" width="8" height="10" rx="1" />
            {/* Lower Teeth */}
            <rect x="124" y="235" width="7" height="9" rx="1" />
            <rect x="135" y="236" width="7" height="10" rx="1" />
            <rect x="146" y="236" width="7" height="10" rx="1" />
            <rect x="157" y="236" width="7" height="10" rx="1" />
            <rect x="168" y="235" width="7" height="9" rx="1" />
          </g>

          {/* Dark Eye Sockets */}
          <ellipse cx="115" cy="155" rx="20" ry="18" fill="#000000" />
          <ellipse cx="185" cy="155" rx="20" ry="18" fill="#000000" />

          {/* Glowing Animatronic Pupils (Pinprick Horror Light) */}
          <g filter="url(#horror-glow)">
            {/* Left Eye */}
            <circle cx="115" cy="155" r="14" fill="url(#eye-glow-radial)" opacity="0.8" />
            <circle cx="115" cy="155" r="4.5" fill="#ffffff" />
            <circle cx="115" cy="155" r="2" fill="#ffeedd" />

            {/* Right Eye */}
            <circle cx="185" cy="155" r="14" fill="url(#eye-glow-radial)" opacity="0.8" />
            <circle cx="185" cy="155" r="4.5" fill="#ffffff" />
            <circle cx="185" cy="155" r="2" fill="#ffeedd" />
          </g>

          {/* Torso & Shoulder Joints in Darkness */}
          <path
            d="M50 340 L80 270 Q150 285 220 270 L250 340 Z"
            fill="#050302"
            stroke="#1c100b"
            strokeWidth="2"
          />
          {/* Exposed Collar Wires */}
          <path
            d="M130 278 Q135 300 125 315"
            stroke="#ff3300"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M165 278 Q160 300 170 318"
            stroke="#ffaa00"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
        </g>
      </svg>
    </SilhouetteContainer>
  );
};

const twitch = keyframes`
  0% { transform: scale(1) translate(0, 0); }
  20% { transform: scale(1.02) translate(-4px, 2px) skewX(2deg); }
  40% { transform: scale(0.99) translate(3px, -2px) skewX(-2deg); }
  60% { transform: scale(1.01) translate(-2px, 1px); }
  80% { transform: scale(1) translate(1px, -1px); }
  100% { transform: scale(1) translate(0, 0); }
`;

const chromaticGlitch = keyframes`
  0% {
    filter: drop-shadow(0 0 15px rgba(255, 30, 0, 0.4));
  }
  30% {
    filter: drop-shadow(-8px 0 0 rgba(255, 0, 0, 0.7))
            drop-shadow(8px 0 0 rgba(0, 200, 255, 0.7))
            contrast(180%) brightness(1.2);
  }
  70% {
    filter: drop-shadow(6px 0 0 rgba(255, 0, 0, 0.8))
            drop-shadow(-6px 0 0 rgba(0, 255, 120, 0.8))
            contrast(200%);
  }
  100% {
    filter: drop-shadow(0 0 20px rgba(255, 80, 0, 0.5));
  }
`;

const SilhouetteContainer = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 0;
  transition: opacity 0.4s ease-in-out;
  opacity: ${({ $visible }) => ($visible ? "0.22" : "0")};
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ $position }) => {
    switch ($position) {
      case "left":
        return `
          left: 4%;
          bottom: 12%;
          width: clamp(180px, 24vw, 340px);
          transform: rotate(4deg);
        `;
      case "right":
        return `
          right: 4%;
          bottom: 15%;
          width: clamp(180px, 24vw, 340px);
          transform: scaleX(-1) rotate(4deg);
        `;
      case "center":
      default:
        return `
          left: 50%;
          top: 38%;
          transform: translate(-50%, -50%);
          width: clamp(260px, 36vw, 460px);
        `;
    }
  }}

  ${({ $visible }) =>
    $visible &&
    css`
      animation: ${twitch} 2s infinite alternate;
    `}

  .animatronic-svg {
    width: 100%;
    height: auto;
    display: block;
    filter: contrast(90%) brightness(0.7);
  }

  .animatronic-glow {
    display: none;
  }
`;
