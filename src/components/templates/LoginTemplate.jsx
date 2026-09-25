import halloween from "../../assets/Frankenstein.json";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import {
  Btn1,
  Footer,
  InputText2,
  Linea,
  Lottieanimation,
  Title,
  useAuthStore,
  VolverBtn,
} from "../../index";
import { v } from "../../styles/variables";
import { Device } from "../../styles/breakpoints";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { useState, useEffect, useRef } from "react";
import { Sombrero } from "../organismos/LoginDesing/EscenaHalloween";
import { SecurityCardModos } from "../organismos/LoginDesing/SecurityCardModos";
import { StaticCanvas } from "../organismos/LoginDesing/StaticCanvas";
import { AnimatronicSilhouette } from "../organismos/LoginDesing/AnimatronicSilhouette";
import { SecurityHud } from "../organismos/LoginDesing/SecurityHud";
import { SecurityBootSequence } from "../organismos/LoginDesing/SecurityBootSequence";
import { SecurityOfficeAtmosphere } from "../organismos/LoginDesing/SecurityOfficeAtmosphere";
import { securityAudio } from "../../utils/securityAudio";
import { useContraseñaStore } from "../../store/ContraseñaStore";
import {
  useIniciarSesionConEmailMutationStack,
  useMostrarContraseñaQueryStack,
} from "../../tanstack/LoginStack";

export const LoginTemplate = () => {
  // State for Boot-up animation
  const [isBooting, setIsBooting] = useState(() => {
    // Only boot once per session if already viewed, or enable boot
    return !sessionStorage.getItem("sec_boot_done");
  });

  // State for Periodic Glitch & Animatronic Silhouette
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchPosition, setGlitchPosition] = useState("center");
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // Login Navigation States
  const [stateModos, setStateModos] = useState(true);
  const [stateModo, setStateModo] = useState(null);
  const [contraseñaOk, setContraseñaOk] = useState(false);
  const [inputContraseña, setInputContraseña] = useState("");

  const { loginGoogle } = useAuthStore();
  const { dataContraseña } = useContraseñaStore();
  const { register, handleSubmit } = useForm();
  useMostrarContraseñaQueryStack();

  // Periodic Glitch Interval with zero-leak pattern
  useEffect(() => {
    let isMounted = true;
    let glitchResetTimer = null;

    const glitchInterval = setInterval(() => {
      if (!isMounted) return;
      const positions = ["center", "left", "right"];
      const nextPos = positions[Math.floor(Math.random() * positions.length)];
      setGlitchPosition(nextPos);
      setIsGlitching(true);

      try {
        securityAudio.playStaticBurst(0.12);
      } catch {
        // Safe fail
      }

      glitchResetTimer = setTimeout(() => {
        if (isMounted) {
          setIsGlitching(false);
        }
      }, 300);
    }, 12000);

    return () => {
      isMounted = false;
      clearInterval(glitchInterval);
      if (glitchResetTimer) clearTimeout(glitchResetTimer);
    };
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem("sec_boot_done", "true");
    setIsBooting(false);
    securityAudio.playCrtTurnOn();
  };

  const handleInputFocus = () => {
    securityAudio.playSecurityBeep(880, 0.03);
  };

  const validarContraseña = () => {
    securityAudio.ensureContext();
    const data = dataContraseña;
    const contraseñaReal = data?.[0]?.contraseña;
    if (Number(inputContraseña) === contraseñaReal) {
      setContraseñaOk(true);
      securityAudio.playSecurityBeep(1200, 0.08);
      toast.success("Credencial verificada: Acceso SuperAdmin Concedido");
    } else {
      securityAudio.playSecurityBeep(300, 0.15);
      toast.error("Contraseña de seguridad incorrecta");
    }
  };

  const { mutate } = useIniciarSesionConEmailMutationStack();

  const manejadorEmailSesion = (data) => {
    securityAudio.playTactileClick();
    mutate({ email: data.email, password: data.password });
  };

  const manejadorEmailSesionTester = () => {
    securityAudio.playTactileClick();
    mutate({ email: "tester1@gmail.com", password: "123456" });
  };

  const handleSelectModo = (modo) => {
    securityAudio.playTactileClick();
    setStateModo(modo);
    setStateModos(false);
  };

  const handleVolver = () => {
    securityAudio.playTactileClick();
    setStateModos(true);
    setContraseñaOk(false);
    setInputContraseña("");
  };

  return (
    <Container $glitch={isGlitching}>
      {/* Google Fonts for 80s phosphor terminal and retro horror */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Creepster&family=VT323&family=Share+Tech+Mono&display=swap"
      />
      <Globales />

      {/* Boot-up sequence on initial load */}
      {isBooting && <SecurityBootSequence onComplete={handleBootComplete} />}

      {/* Surveillance Camera HUD */}
      <SecurityHud
        isGlitching={isGlitching}
        isMuted={isAudioMuted}
        onToggleSound={(muted) => setIsAudioMuted(muted)}
      />

      {/* Abandoned 80s Security Office Ambiance & Halloween Details */}
      <SecurityOfficeAtmosphere />

      {/* Animatronic Silhouette glitching in the camera feed */}
      <AnimatronicSilhouette isVisible={isGlitching} peekPosition={glitchPosition} />

      {/* CRT Scanlines & Analog TV Static Noise */}
      <StaticCanvas isGlitching={isGlitching} />

      <Toaster richColors position="top-center" />

      {/* Retro 80s Surveillance CRT Monitor Console */}
      <div className="card monitor-frame">
        {/* Monitor Bezel Header Details */}
        <div className="monitor-top-bar">
          <div className="power-led-group">
            <span className="power-led" />
            <span className="led-label">POWER</span>
          </div>
          <div className="model-brand">CCTV TERMINAL // SEC-1987</div>
          <div className="channel-badge">CANAL {stateModo ? stateModo.toUpperCase() : "01"}</div>
        </div>

        {/* CRT Glass Inner Screen */}
        <div className="screen-inner">
          <ContentLogo>
            <span className="marca">
              <img src={v.logo} alt="SoftCreate POS" />
              <Sombrero className="sombrero" />
            </span>
            <div className="brand-group">
              <span className="nombre">SoftCreate POS</span>
              <span className="sub-tag">EDICIÓN HALLOWEEN // NIGHT GUARD</span>
            </div>
          </ContentLogo>

          <TituloWrap>
            <Title $paddingBottom="10px">
              {stateModos ? "INICIAR SESIÓN" : "AUTENTICACIÓN CCTV"}
            </Title>
          </TituloWrap>

          <LottieHalo>
            <Lottieanimation
              ancho={170}
              alto={170}
              animacion={halloween}
            />
          </LottieHalo>

          {/* Mode Selection Cards */}
          {stateModos && (
            <ContentModos>
              <SecurityCardModos
                title="Super Administrador"
                subtitle="Gestión total de empresa y accesos."
                bgcolor="#9a3412"
                statusColor="#ff3333"
                level="01"
                img="https://i.ibb.co/Wp7FPzZQ/jack-o-linterna.png"
                funcion={() => handleSelectModo("superadmin")}
              />
              <SecurityCardModos
                title="Empleado"
                subtitle="Control de ventas y turno nocturno."
                bgcolor="#7f1d1d"
                statusColor="#ff9900"
                level="02"
                img="https://i.ibb.co/XkttsY0J/fantasma.png"
                funcion={() => handleSelectModo("empleado")}
              />
              <SecurityCardModos
                title="Invitado"
                subtitle="Acceso de prueba y monitoreo general."
                bgcolor="#14532d"
                statusColor="#00ff88"
                level="03"
                img="https://i.ibb.co/DDqXMfYP/ataud.png"
                funcion={() => handleSelectModo("invitado")}
              />
            </ContentModos>
          )}

          {/* Empleado Form */}
          {stateModo === "empleado" && !stateModos && (
            <PanelModo>
              <div className="panel-header">
                <VolverBtn funcion={handleVolver} />
                <span className="mode-badge">TURNO: EMPLEADO</span>
              </div>
              <p className="terminal-prompt">&gt; INGRESE CREDENCIALES DE SEGURIDAD</p>
              <form onSubmit={handleSubmit(manejadorEmailSesion)}>
                <div className="input-group-warning">
                  <InputText2>
                    <input
                      className="form__field retro-field"
                      placeholder="Correo electrónico"
                      type="email"
                      onFocus={handleInputFocus}
                      {...register("email", { required: true })}
                    />
                  </InputText2>
                </div>
                <div className="input-group-warning">
                  <InputText2>
                    <input
                      className="form__field retro-field"
                      placeholder="Contraseña"
                      type="password"
                      onFocus={handleInputFocus}
                      {...register("password", { required: true })}
                    />
                  </InputText2>
                </div>
                <Btn1
                  border="2px"
                  titulo="INGRESAR AL SISTEMA"
                  bgcolor="#d9530f"
                  color="#ffffff"
                  width="100%"
                />
              </form>
            </PanelModo>
          )}

          {/* Super Admin Form */}
          {stateModo === "superadmin" && !stateModos && (
            <PanelModo>
              <div className="panel-header">
                <VolverBtn funcion={handleVolver} />
                <span className="mode-badge super">TURNO: SUPER ADMINISTRADOR</span>
              </div>
              <p className="terminal-prompt">&gt; CLAVE MAESTRA REQUERIDA (NIVEL 01)</p>
              {!contraseñaOk ? (
                <div className="superadmin-block">
                  <div className="input-group-warning">
                    <InputText2>
                      <input
                        className="form__field retro-field"
                        placeholder="Contraseña de acceso maestro"
                        type="password"
                        value={inputContraseña}
                        onFocus={handleInputFocus}
                        onChange={(e) => setInputContraseña(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") validarContraseña();
                        }}
                      />
                    </InputText2>
                  </div>
                  <Btn1
                    titulo="VERIFICAR IDENTIDAD"
                    funcion={validarContraseña}
                    bgcolor="#b91c1c"
                    color="#ffffff"
                    width="100%"
                  />
                </div>
              ) : (
                <div className="oauth-panel">
                  <p className="auth-ready-msg">&gt; AUTORIZADO: INICIE SESIÓN CON GOOGLE</p>
                  <Btn1
                    border="2px"
                    funcion={loginGoogle}
                    titulo="CONTINUAR CON GOOGLE"
                    color={(theme) => theme.bgtotal}
                    icono={<v.iconogoogle />}
                    width="100%"
                  />
                  <Linea>
                    <span>O</span>
                  </Linea>
                </div>
              )}
            </PanelModo>
          )}

          {/* Invitado Form */}
          {stateModo === "invitado" && !stateModos && (
            <PanelModo>
              <div className="panel-header">
                <VolverBtn funcion={handleVolver} />
                <span className="mode-badge guest">TURNO: INVITADO NOCTURNO</span>
              </div>
              <p className="terminal-prompt">&gt; ACCESO RÁPIDO PARA EVALUACIÓN</p>
              <div className="guest-action-box">
                <Btn1
                  border="2px"
                  funcion={manejadorEmailSesionTester}
                  titulo="INGRESAR MODO INVITADO"
                  bgcolor="#15803d"
                  color="#ffffff"
                  width="100%"
                />
              </div>
            </PanelModo>
          )}
        </div>
      </div>

      <FooterWrap>
        <Footer />
      </FooterWrap>
    </Container>
  );
};

/* ---------- Keyframes ---------- */
const Globales = createGlobalStyle`
  @property --ang {
    syntax: "<angle>";
    inherits: false;
    initial-value: 0deg;
  }
`;

const crtScreenTurnOn = keyframes`
  0% {
    transform: scale(0.96) scaleY(0.01);
    filter: brightness(6) blur(6px);
    opacity: 0;
  }
  50% {
    transform: scale(0.98) scaleY(1);
    filter: brightness(2) blur(1px);
    opacity: 0.9;
  }
  100% {
    transform: scale(1) scaleY(1);
    filter: brightness(1) blur(0);
    opacity: 1;
  }
`;

const titilarTerror = keyframes`
  0%, 100% {
    opacity: 1;
    text-shadow: 0 0 6px rgba(255, 120, 24, 0.6), 0 0 16px rgba(255, 80, 0, 0.4);
  }
  48% { opacity: 0.95; }
  50% { opacity: 0.4; text-shadow: none; }
  52% { opacity: 1; text-shadow: 0 0 10px rgba(255, 60, 0, 0.8); }
  85% { opacity: 0.88; }
`;

const girarBorde = keyframes`
  to { --ang: 360deg; }
`;

const latidoHalo = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(0.92); opacity: 0.55; }
  50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.9; }
`;

const entrarSuave = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

const powerLedBlink = keyframes`
  0%, 100% { opacity: 1; box-shadow: 0 0 8px #00ff66; }
  50% { opacity: 0.5; box-shadow: 0 0 3px #00ff66; }
`;

const glitchShake = keyframes`
  0% { transform: translate(0, 0); }
  20% { transform: translate(-4px, 2px); }
  40% { transform: translate(4px, -2px); }
  60% { transform: translate(-3px, -1px); }
  80% { transform: translate(2px, 3px); }
  100% { transform: translate(0, 0); }
`;

/* ---------- Styled Components ---------- */
const Container = styled.div`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  padding: 40px 16px 24px;
  overflow-x: hidden;
  color: #d8d0bc;
  background: #080403;

  ${({ $glitch }) =>
    $glitch &&
    css`
      animation: ${glitchShake} 0.18s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    `}

  .monitor-frame {
    position: relative;
    z-index: 5;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 440px;
    margin: 20px auto;
    border-radius: 20px;
    background: linear-gradient(
      170deg,
      #24150d 0%,
      #130a06 40%,
      #0b0604 100%
    );
    border: 3px solid #3d2316;
    box-shadow:
      0 35px 80px -15px rgba(0, 0, 0, 0.95),
      0 0 35px rgba(255, 100, 20, 0.08),
      inset 0 2px 4px rgba(255, 200, 150, 0.12),
      inset 0 -2px 4px rgba(0, 0, 0, 0.8);
    animation: ${crtScreenTurnOn} 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards;

    /* High-voltage retro bezel glow */
    &::before {
      content: "";
      position: absolute;
      inset: -2px;
      padding: 2px;
      border-radius: 22px;
      pointer-events: none;
      opacity: 0.6;
      background: conic-gradient(
        from var(--ang),
        transparent 0 50%,
        #ff7700 70%,
        #993300 85%,
        transparent 100%
      );
      -webkit-mask:
        linear-gradient(#000 0 0) content-box,
        linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      animation: ${girarBorde} 8s linear infinite;
    }

    @media ${Device.tablet} {
      width: 440px;
    }
  }

  .monitor-top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 18px 8px;
    background: rgba(10, 6, 4, 0.8);
    border-bottom: 1px solid rgba(255, 120, 30, 0.2);
    border-top-left-radius: 17px;
    border-top-right-radius: 17px;
    font-family: "VT323", "Share Tech Mono", monospace;
  }

  .power-led-group {
    display: flex;
    align-items: center;
    gap: 6px;
    .power-led {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #00ff66;
      animation: ${powerLedBlink} 2s infinite;
    }
    .led-label {
      font-size: 13px;
      color: #00ff66;
      letter-spacing: 1px;
    }
  }

  .model-brand {
    font-size: 13px;
    color: rgba(255, 180, 100, 0.65);
    letter-spacing: 1.5px;
  }

  .channel-badge {
    font-size: 13px;
    color: #ffaa33;
    background: rgba(255, 140, 20, 0.15);
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid rgba(255, 140, 20, 0.3);
  }

  .screen-inner {
    padding: 18px 22px 24px;
    border-bottom-left-radius: 17px;
    border-bottom-right-radius: 17px;
    background: radial-gradient(
      circle at 50% 30%,
      rgba(26, 14, 8, 0.92) 0%,
      rgba(10, 5, 3, 0.98) 100%
    );
  }

  @media (prefers-reduced-motion: reduce) {
    &,
    & *,
    & *::before {
      animation: none !important;
    }
  }
`;

const ContentLogo = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin: 6px 0 12px;

  .marca {
    position: relative;
    display: inline-flex;
  }

  img {
    width: 44px;
    filter: drop-shadow(0 0 6px rgba(255, 120, 20, 0.35));
  }

  .sombrero {
    position: absolute;
    top: -18px;
    left: -7px;
    width: 32px;
    transform: rotate(-16deg);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8));
  }

  .brand-group {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .nombre {
    font-family: "Creepster", cursive;
    font-size: 26px;
    letter-spacing: 2px;
    background: linear-gradient(90deg, #ff8a2b, #ffbe53);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    line-height: 1.1;
  }

  .sub-tag {
    font-family: "VT323", "Share Tech Mono", monospace;
    font-size: 13px;
    color: #ffaa44;
    letter-spacing: 1.5px;
    opacity: 0.8;
  }
`;

const TituloWrap = styled.div`
  && * {
    font-family: "Creepster", cursive;
    font-size: 38px;
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: 2.5px;
    color: #e67c26;
    animation: ${titilarTerror} 4.5s infinite;
  }
`;

const LottieHalo = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 8px;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 170px;
    height: 170px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(255, 100, 20, 0.14),
      rgba(255, 80, 0, 0.04) 50%,
      transparent 70%
    );
    animation: ${latidoHalo} 3.2s ease-in-out infinite;
  }

  > * {
    position: relative;
    filter: saturate(0.85) hue-rotate(-30deg) brightness(0.9);
  }
`;

const ContentModos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${entrarSuave} 0.5s ease backwards;
`;

const PanelModo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  animation: ${entrarSuave} 0.4s cubic-bezier(0.16, 1, 0.3, 1) backwards;

  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 8px;
    border-bottom: 1px dashed rgba(255, 120, 20, 0.3);
  }

  .mode-badge {
    font-family: "VT323", "Share Tech Mono", monospace;
    font-size: 17px;
    letter-spacing: 1.5px;
    color: #ff9900;
    background: rgba(255, 150, 0, 0.15);
    padding: 2px 8px;
    border-radius: 4px;
    border: 1px solid rgba(255, 150, 0, 0.35);

    &.super {
      color: #ff4444;
      border-color: rgba(255, 60, 60, 0.4);
      background: rgba(255, 60, 60, 0.15);
    }

    &.guest {
      color: #00ff88;
      border-color: rgba(0, 255, 136, 0.4);
      background: rgba(0, 255, 136, 0.15);
    }
  }

  .terminal-prompt {
    font-family: "VT323", "Share Tech Mono", monospace;
    font-size: 16px;
    color: #ffd699;
    letter-spacing: 1.2px;
    text-align: left;
    margin: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* Micro-animation on input hover and focus: warning amber/red flicker */
  .retro-field {
    color: #ffeedd !important;
    background: rgba(18, 10, 6, 0.75) !important;
    border: 1.5px solid rgba(255, 120, 30, 0.35) !important;
    border-radius: 10px;
    font-family: "Share Tech Mono", monospace;
    font-size: 15px;
    letter-spacing: 1px;
    transition: all 0.22s ease-in-out;

    &::placeholder {
      color: rgba(240, 210, 180, 0.45);
      font-family: "Share Tech Mono", monospace;
    }

    &:hover {
      border-color: #ff8800 !important;
      box-shadow: 0 0 10px rgba(255, 136, 0, 0.35);
    }

    &:focus {
      outline: none;
      border-color: #ff4400 !important;
      background: rgba(28, 14, 8, 0.95) !important;
      box-shadow:
        0 0 16px rgba(255, 68, 0, 0.55),
        inset 0 0 8px rgba(255, 68, 0, 0.2);
    }
  }

  .superadmin-block {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .oauth-panel {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .auth-ready-msg {
      font-family: "VT323", "Share Tech Mono", monospace;
      font-size: 17px;
      color: #00ff88;
      letter-spacing: 1.5px;
      text-shadow: 0 0 6px rgba(0, 255, 136, 0.5);
      margin: 0;
    }
  }

  .guest-action-box {
    margin-top: 6px;
  }

  button {
    font-family: "Share Tech Mono", monospace;
    letter-spacing: 1px;
    transition: transform 0.15s ease, filter 0.15s ease;
    &:hover {
      transform: translateY(-2px);
      filter: drop-shadow(0 6px 12px rgba(255, 80, 0, 0.4));
    }
    &:active {
      transform: scale(0.98);
    }
  }
`;

const FooterWrap = styled.div`
  position: relative;
  z-index: 5;
  color: #b8a58c;
  opacity: 0.8;
  margin-top: 10px;

  a {
    color: #ff8a2b;
  }
`;