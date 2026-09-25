import styled, { css, keyframes } from "styled-components";

const twitch = keyframes`
  0% { transform: translate(0,0) scale(1); }
  20% { transform: translate(-2px,1px) scale(1.01); }
  40% { transform: translate(2px,-1px) scale(0.99); }
  60% { transform: translate(-1px,2px) scale(1.005); }
  80% { transform: translate(1px,-2px) scale(0.995); }
  100% { transform: translate(0,0) scale(1); }
`;

export const AnimatronicToys = ({ isVisible = false, position = "center" }) => {
  return (
    <ToysContainer $visible={isVisible} $position={position} aria-hidden="true">
      {/* Toy Bonnie - conejo violeta */}
      <ToySVG $color="#a855f7" $left="-10%" $top="10%" $scale="0.7" $delay="0s">
        <svg viewBox="0 0 200 260" fill="none">
          <ellipse cx="100" cy="130" rx="60" ry="70" fill="#3b0764" stroke="#c084fc" strokeWidth="2.5" />
          <circle cx="70" cy="90" r="18" fill="#e9d5ff" opacity="0.9" />
          <circle cx="130" cy="90" r="18" fill="#e9d5ff" opacity="0.9" />
          <ellipse cx="70" cy="92" rx="6" ry="10" fill="#4a0e6e" />
          <ellipse cx="130" cy="92" rx="6" ry="10" fill="#4a0e6e" />
          <path d="M80 140 Q100 170 120 140" stroke="#f0abfc" strokeWidth="3" fill="none" />
          <rect x="85" y="170" width="30" height="40" rx="4" fill="#581c87" />
        </svg>
      </ToySVG>

      {/* Toy Freddy - oso marron */}
      <ToySVG $color="#f97316" $left="110%" $top="15%" $scale="0.65" $delay="0.8s">
        <svg viewBox="0 0 200 260" fill="none">
          <ellipse cx="100" cy="130" rx="65" ry="75" fill="#7c2d12" stroke="#fb923c" strokeWidth="2.5" />
          <circle cx="65" cy="95" r="20" fill="#fed7aa" opacity="0.95" />
          <circle cx="135" cy="95" r="20" fill="#fed7aa" opacity="0.95" />
          <ellipse cx="65" cy="97" rx="7" ry="12" fill="#431407" />
          <ellipse cx="135" cy="97" rx="7" ry="12" fill="#431407" />
          <path d="M80 145 Q100 175 120 145" stroke="#fb923c" strokeWidth="3" fill="none" />
          <rect x="82" y="175" width="36" height="42" rx="6" fill="#9a3412" />
        </svg>
      </ToySVG>

      {/* Toy Chica - chica amarilla */}
      <ToySVG $color="#facc15" $left="5%" $top="55%" $scale="0.6" $delay="1.6s">
        <svg viewBox="0 0 200 260" fill="none">
          <ellipse cx="100" cy="130" rx="58" ry="68" fill="#ca8a04" stroke="#fde047" strokeWidth="2.5" />
          <circle cx="72" cy="92" r="16" fill="#fef9c3" opacity="0.95" />
          <circle cx="128" cy="92" r="16" fill="#fef9c3" opacity="0.95" />
          <ellipse cx="72" cy="94" rx="5" ry="9" fill="#422006" />
          <ellipse cx="128" cy="94" rx="5" ry="9" fill="#422006" />
          <path d="M78 140 Q100 168 122 140" stroke="#fde047" strokeWidth="3" fill="none" />
          <rect x="84" y="168" width="32" height="42" rx="5" fill="#a16207" />
        </svg>
      </ToySVG>
    </ToysContainer>
  );
};

const ToysContainer = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 0;
  transition: opacity 0.6s ease-in-out;
  opacity: ${({ $visible }) => ($visible ? "0.25" : "0")};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  ${({ $position }) => {
    switch ($position) {
      case "left": return `left: 0; top: 40%;`; 
      case "right": return `right: 0; top: 40%;`; 
      default: return `left: 50%; top: 50%; transform: translate(-50%, -50%);`;
    }
  }}
`;

const ToySVG = styled.div`
  position: absolute;
  left: ${({ $left }) => $left || "50%"};
  top: ${({ $top }) => $top || "40%"};
  width: clamp(100px, 18vw, 220px);
  transform: translate(-50%, -50%) scale(${({ $scale }) => $scale || "0.7"});
  filter: drop-shadow(0 0 10px ${({ $color }) => $color || "#7c2d12"}66);
  opacity: 0.85;
  animation: ${twitch} 4s infinite ease-in-out alternate;
  animation-delay: ${({ $delay }) => $delay || "0s"};

  svg {
    width: 100%;
    height: auto;
    display: block;
  }
`;
