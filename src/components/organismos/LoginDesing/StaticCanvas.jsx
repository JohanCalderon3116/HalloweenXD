import styled, { keyframes } from "styled-components";

// Ultra-performant, 100% crash-proof static noise & scanlines using native CSS and SVG patterns
export const StaticCanvas = ({ isGlitching = false }) => {
  return (
    <NoiseWrapper $isGlitching={isGlitching} aria-hidden="true">
      <div className="pure-noise" />
      <div className="scanlines" />
      <div className="vignette" />
      <div className="crt-glow" />
    </NoiseWrapper>
  );
};

const staticShift = keyframes`
  0% { transform: translate(0, 0); }
  10% { transform: translate(-3%, -2%); }
  20% { transform: translate(2%, 3%); }
  30% { transform: translate(-1%, 4%); }
  40% { transform: translate(3%, -3%); }
  50% { transform: translate(-4%, 1%); }
  60% { transform: translate(2%, -2%); }
  70% { transform: translate(0%, 3%); }
  80% { transform: translate(-2%, -3%); }
  90% { transform: translate(3%, 1%); }
  100% { transform: translate(0, 0); }
`;

const subtleFlicker = keyframes`
  0%, 100% { opacity: 0.96; }
  50% { opacity: 1; }
  85% { opacity: 0.94; }
`;

const NoiseWrapper = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 10;
  overflow: hidden;
  animation: ${subtleFlicker} 0.25s infinite;

  .pure-noise {
    position: absolute;
    top: -20%;
    left: -20%;
    width: 140%;
    height: 140%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E");
    opacity: ${({ $isGlitching }) => ($isGlitching ? "0.35" : "0.08")};
    mix-blend-mode: screen;
    animation: ${staticShift} 0.2s steps(4) infinite;
    will-change: transform;
    transition: opacity 0.15s ease;
  }

  .scanlines {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0px,
      rgba(255, 255, 255, 0) 2px,
      rgba(0, 0, 0, 0.28) 2px,
      rgba(0, 0, 0, 0.4) 4px
    );
    opacity: 0.7;
  }

  .vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at 50% 50%,
      transparent 58%,
      rgba(8, 4, 3, 0.5) 80%,
      rgba(0, 0, 0, 0.9) 100%
    );
  }

  .crt-glow {
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 80px rgba(220, 100, 20, 0.04),
                inset 0 0 35px rgba(0, 0, 0, 0.7);
  }
`;
