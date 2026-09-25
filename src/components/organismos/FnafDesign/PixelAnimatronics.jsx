import styled, { keyframes } from "styled-components";

// Pixel-Art Animatronics with crisp edges and charming retro animations

const pixelBounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
`;

const earTwitch = keyframes`
  0%, 90%, 100% { transform: rotate(0deg); }
  94% { transform: rotate(-6deg); }
  98% { transform: rotate(4deg); }
`;

const eyeBlink = keyframes`
  0%, 92%, 100% { opacity: 1; }
  95% { opacity: 0; }
`;

const PixelWrap = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  image-rendering: pixelated;
  width: ${({ $size }) => $size || "64px"};
  height: ${({ $size }) => $size || "64px"};
  animation: ${pixelBounce} 2.4s ease-in-out infinite;

  svg {
    width: 100%;
    height: 100%;
    display: block;
    shape-rendering: crispEdges;
  }

  .twitch {
    transform-origin: bottom center;
    animation: ${earTwitch} 4s ease-in-out infinite;
  }

  .blink {
    animation: ${eyeBlink} 3.2s infinite;
  }
`;

// 1. Pixel Freddy Bear (with Top Hat and Bowtie)
export const PixelFreddy = ({ size = "64px", className }) => (
  <PixelWrap $size={size} className={className}>
    <svg viewBox="0 0 24 24">
      {/* Top Hat */}
      <rect x="9" y="1" width="6" height="4" fill="#151515" />
      <rect x="7" y="5" width="10" height="2" fill="#151515" />
      <rect x="7" y="4" width="10" height="1" fill="#d97706" />

      {/* Ears */}
      <g className="twitch">
        <rect x="3" y="6" width="3" height="3" fill="#8c5324" />
        <rect x="4" y="7" width="1" height="1" fill="#4d2c11" />
        <rect x="18" y="6" width="3" height="3" fill="#8c5324" />
        <rect x="19" y="7" width="1" height="1" fill="#4d2c11" />
      </g>

      {/* Head */}
      <rect x="6" y="7" width="12" height="9" fill="#9e6231" />
      <rect x="5" y="8" width="14" height="7" fill="#9e6231" />

      {/* Eyes Socket & Eyes */}
      <rect x="7" y="9" width="3" height="3" fill="#1c1c1c" />
      <rect x="14" y="9" width="3" height="3" fill="#1c1c1c" />
      <g className="blink">
        <rect x="8" y="10" width="2" height="2" fill="#3b82f6" />
        <rect x="9" y="10" width="1" height="1" fill="#ffffff" />
        <rect x="15" y="10" width="2" height="2" fill="#3b82f6" />
        <rect x="16" y="10" width="1" height="1" fill="#ffffff" />
      </g>

      {/* Muzzle */}
      <rect x="8" y="12" width="8" height="4" fill="#c48a4d" />
      <rect x="11" y="12" width="2" height="1" fill="#1c1c1c" />
      {/* Freckles */}
      <rect x="9" y="13" width="1" height="1" fill="#4d2c11" />
      <rect x="14" y="13" width="1" height="1" fill="#4d2c11" />

      {/* Jaw & Endoskeleton Teeth */}
      <rect x="9" y="16" width="6" height="2" fill="#7a461b" />
      <rect x="10" y="15" width="4" height="1" fill="#ffffff" />

      {/* Bowtie */}
      <rect x="10" y="18" width="4" height="2" fill="#151515" />
      <rect x="9" y="18" width="1" height="1" fill="#151515" />
      <rect x="14" y="18" width="1" height="1" fill="#151515" />

      {/* Torso */}
      <rect x="7" y="19" width="10" height="5" fill="#8c5324" />
      <rect x="9" y="20" width="6" height="4" fill="#c48a4d" />
    </svg>
  </PixelWrap>
);

// 2. Pixel Bonnie (Purple Bunny with red guitar/bowtie)
export const PixelBonnie = ({ size = "64px", className }) => (
  <PixelWrap $size={size} className={className}>
    <svg viewBox="0 0 24 24">
      {/* Bunny Ears */}
      <g className="twitch">
        <rect x="6" y="1" width="3" height="6" fill="#7c5fb0" />
        <rect x="7" y="2" width="1" height="4" fill="#b9a6dc" />
        <rect x="15" y="1" width="3" height="6" fill="#7c5fb0" />
        <rect x="16" y="2" width="1" height="4" fill="#b9a6dc" />
      </g>

      {/* Head */}
      <rect x="6" y="7" width="12" height="9" fill="#694d9e" />
      <rect x="5" y="8" width="14" height="7" fill="#694d9e" />

      {/* Eyes */}
      <rect x="7" y="9" width="3" height="3" fill="#1c1c1c" />
      <rect x="14" y="9" width="3" height="3" fill="#1c1c1c" />
      <g className="blink">
        <rect x="8" y="10" width="2" height="2" fill="#ef4444" />
        <rect x="9" y="10" width="1" height="1" fill="#ffffff" />
        <rect x="15" y="10" width="2" height="2" fill="#ef4444" />
        <rect x="16" y="10" width="1" height="1" fill="#ffffff" />
      </g>

      {/* Muzzle */}
      <rect x="8" y="12" width="8" height="4" fill="#9f86cf" />
      <rect x="11" y="12" width="2" height="1" fill="#1c1c1c" />

      {/* Teeth */}
      <rect x="10" y="15" width="4" height="1" fill="#ffffff" />
      <rect x="9" y="16" width="6" height="2" fill="#523980" />

      {/* Red Bowtie */}
      <rect x="10" y="18" width="4" height="2" fill="#ef4444" />

      {/* Torso */}
      <rect x="7" y="19" width="10" height="5" fill="#694d9e" />
      <rect x="9" y="20" width="6" height="4" fill="#9f86cf" />
    </svg>
  </PixelWrap>
);

// 3. Pixel Chica (Yellow Chicken with Bib)
export const PixelChica = ({ size = "64px", className }) => (
  <PixelWrap $size={size} className={className}>
    <svg viewBox="0 0 24 24">
      {/* Feather Tuft */}
      <rect x="11" y="3" width="2" height="4" fill="#eab308" />
      <rect x="10" y="4" width="4" height="2" fill="#facc15" />

      {/* Head */}
      <rect x="6" y="7" width="12" height="9" fill="#facc15" />
      <rect x="5" y="8" width="14" height="7" fill="#facc15" />

      {/* Eyes */}
      <rect x="7" y="9" width="3" height="3" fill="#1c1c1c" />
      <rect x="14" y="9" width="3" height="3" fill="#1c1c1c" />
      <g className="blink">
        <rect x="8" y="10" width="2" height="2" fill="#a855f7" />
        <rect x="9" y="10" width="1" height="1" fill="#ffffff" />
        <rect x="15" y="10" width="2" height="2" fill="#a855f7" />
        <rect x="16" y="10" width="1" height="1" fill="#ffffff" />
      </g>

      {/* Orange Beak */}
      <rect x="9" y="12" width="6" height="3" fill="#f97316" />
      <rect x="10" y="14" width="4" height="2" fill="#ea580c" />
      <rect x="11" y="13" width="2" height="1" fill="#ffffff" />

      {/* Bib "LET'S EAT" */}
      <rect x="8" y="17" width="8" height="6" fill="#f8fafc" />
      <rect x="9" y="19" width="6" height="2" fill="#f97316" />
      <rect x="10" y="20" width="4" height="1" fill="#eab308" />

      {/* Torso */}
      <rect x="7" y="18" width="10" height="6" fill="#eab308" />
    </svg>
  </PixelWrap>
);

// 4. Pixel Foxy (Red Pirate Fox with Eyepatch)
export const PixelFoxy = ({ size = "64px", className }) => (
  <PixelWrap $size={size} className={className}>
    <svg viewBox="0 0 24 24">
      {/* Fox Ears */}
      <g className="twitch">
        <rect x="4" y="3" width="4" height="4" fill="#b91c1c" />
        <rect x="5" y="4" width="2" height="2" fill="#f87171" />
        <rect x="16" y="3" width="4" height="4" fill="#b91c1c" />
        <rect x="17" y="4" width="2" height="2" fill="#f87171" />
      </g>

      {/* Head */}
      <rect x="6" y="7" width="12" height="9" fill="#dc2626" />
      <rect x="4" y="8" width="16" height="6" fill="#dc2626" />

      {/* Eyepatch Left & Glowing Yellow Eye Right */}
      <rect x="6" y="9" width="4" height="3" fill="#111111" />
      <rect x="5" y="8" width="6" height="1" fill="#111111" />
      <rect x="14" y="9" width="3" height="3" fill="#1c1c1c" />
      <g className="blink">
        <rect x="15" y="10" width="2" height="2" fill="#eab308" />
        <rect x="16" y="10" width="1" height="1" fill="#ffffff" />
      </g>

      {/* Long Snout */}
      <rect x="9" y="12" width="6" height="3" fill="#f87171" />
      <rect x="11" y="11" width="2" height="1" fill="#111111" />

      {/* Sharp Teeth */}
      <rect x="9" y="15" width="1" height="2" fill="#f8fafc" />
      <rect x="11" y="15" width="2" height="2" fill="#f8fafc" />
      <rect x="14" y="15" width="1" height="2" fill="#f8fafc" />
      <rect x="9" y="16" width="6" height="2" fill="#7f1d1d" />

      {/* Torso with Hook */}
      <rect x="7" y="18" width="10" height="6" fill="#b91c1c" />
      {/* Pirate Hook */}
      <rect x="18" y="19" width="2" height="3" fill="#94a3b8" />
      <rect x="17" y="21" width="1" height="2" fill="#94a3b8" />
    </svg>
  </PixelWrap>
);

// 5. Pixel Pumpkin Bot (Halloween Mascot)
export const PixelPumpkin = ({ size = "64px", className }) => (
  <PixelWrap $size={size} className={className}>
    <svg viewBox="0 0 24 24">
      {/* Stem */}
      <rect x="11" y="2" width="2" height="3" fill="#15803d" />
      <rect x="12" y="1" width="2" height="2" fill="#166534" />

      {/* Pumpkin Head */}
      <rect x="6" y="5" width="12" height="12" fill="#ea580c" />
      <rect x="4" y="7" width="16" height="8" fill="#f97316" />

      {/* Carved Glowing Eyes */}
      <rect x="7" y="8" width="3" height="2" fill="#fef08a" />
      <rect x="14" y="8" width="3" height="2" fill="#fef08a" />
      <rect x="8" y="10" width="1" height="1" fill="#fef08a" />
      <rect x="15" y="10" width="1" height="1" fill="#fef08a" />

      {/* Carved Grin */}
      <rect x="7" y="12" width="10" height="1" fill="#fef08a" />
      <rect x="8" y="13" width="2" height="1" fill="#fef08a" />
      <rect x="12" y="13" width="2" height="1" fill="#fef08a" />
      <rect x="10" y="11" width="2" height="1" fill="#fef08a" />

      {/* Torso & Ribs */}
      <rect x="7" y="17" width="10" height="6" fill="#1c1917" />
      <rect x="9" y="18" width="6" height="1" fill="#f97316" />
      <rect x="9" y="20" width="6" height="1" fill="#f97316" />
    </svg>
  </PixelWrap>
);
