import React, { useEffect, useState } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader";
import CryptoGate from "./components/CryptoGate";
import GateTraceScreen from "./components/GateTraceScreen";
import MailPortal from "./components/MailPortal";
import MasterDetectivePage from "./components/MasterDetectivePage";
import {
  CHAIN_STATE_VERSION,
  CHAIN_STORAGE_KEY,
  FINAL_ROUTE,
  MAIL_ROUTE
} from "./data/chain";
import { createBadgeId, createBadgePayload } from "./utils/badge";

const initialState = {
  version: CHAIN_STATE_VERSION,
  screen: "intro",
  cryptoSolved: false,
  mailAuthenticated: false,
  mailOpened: false,
  userName: "",
  badgeId: "",
  certificatePayload: null
};

const LEGACY_STORAGE_KEY = "genctek-dijital-dedektifler";

function getPathname() {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

function normalizeScreen(value) {
  return value === "mission" || value === "trace" || value === "intro"
    ? value
    : "intro";
}

function sanitizeState(value) {
  if (!value || value.version !== CHAIN_STATE_VERSION) return initialState;

  const userName = typeof value.userName === "string" ? value.userName : "";
  const badgeId = typeof value.badgeId === "string" ? value.badgeId : "";
  const certificatePayload =
    value.certificatePayload && typeof value.certificatePayload.name === "string"
      ? createBadgePayload(value.certificatePayload.name, badgeId || value.certificatePayload.id)
      : null;

  return {
    ...initialState,
    screen: normalizeScreen(value.screen),
    cryptoSolved: value.cryptoSolved === true,
    mailAuthenticated: value.mailAuthenticated === true,
    mailOpened: value.mailOpened === true,
    userName,
    badgeId: certificatePayload?.id || badgeId,
    certificatePayload,
    version: CHAIN_STATE_VERSION
  };
}

function loadState() {
  try {
    const saved = localStorage.getItem(CHAIN_STORAGE_KEY);
    return sanitizeState(saved ? JSON.parse(saved) : initialState);
  } catch {
    return initialState;
  }
}

function saveState(nextState) {
  const sanitized = sanitizeState(nextState);
  localStorage.setItem(CHAIN_STORAGE_KEY, JSON.stringify(sanitized));
  return sanitized;
}

export default function App() {
  const [state, setState] = useState(loadState);
  const [path, setPath] = useState(getPathname);

  useEffect(() => {
    const syncPath = () => setPath(getPathname());
    window.addEventListener("popstate", syncPath);
    return () => window.removeEventListener("popstate", syncPath);
  }, []);

  const updateState = (patch) => {
    setState((current) => saveState({ ...current, ...patch }));
  };

  const goHome = () => {
    window.history.pushState({}, "", "/");
    setPath("/");
  };

  const resetExperience = () => {
    localStorage.removeItem(CHAIN_STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    localStorage.removeItem("genctek-usta-belge-id");
    setState(initialState);
    goHome();
  };

  const createBadge = (name) => {
    const cleanName = name.trim().replace(/\s+/g, " ").slice(0, 32);
    const badgeId = state.badgeId || createBadgeId();
    const certificatePayload = createBadgePayload(cleanName, badgeId);

    updateState({
      badgeId,
      certificatePayload,
      userName: cleanName
    });
  };

  if (path === MAIL_ROUTE || path === "/gorev-postasi") {
    return (
      <MailPortal
        authenticated={state.mailAuthenticated}
        mailOpened={state.mailOpened}
        onAuthenticated={() => updateState({ mailAuthenticated: true })}
        onMailOpened={() => updateState({ mailOpened: true })}
        onReset={resetExperience}
      />
    );
  }

  if (path === FINAL_ROUTE) {
    return (
      <MasterDetectivePage
        badge={state.certificatePayload}
        onCreateBadge={createBadge}
        onReset={resetExperience}
        savedName={state.userName}
      />
    );
  }

  return (
    <main className="app-shell chain-shell">
      <AppHeader onReset={resetExperience} />

      {state.screen === "intro" && (
        <section className="chain-home intro-only">
          <div className="chain-hero">
            <div className="hero-copy">
              <span>GENÇTEK DİJİTAL DEDEKTİFLER</span>
              <h1>KIRMIZI MÜHÜR OPERASYONU</h1>
              <p>
                Kırmızı Mühür sessiz izlere ayrıldı. Her iz, bir sonrakinin
                kapısını yalnızca dikkatli bakanlara gösterecek.
              </p>
              <p>
                Gördüğünle yetinme; harflerin yerini, satırların gölgesini ve
                fiziksel dünyaya taşınan son işareti takip et.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={() => updateState({ screen: "mission" })}
              type="button"
            >
              OPERASYONU BAŞLAT
            </button>
          </div>
        </section>
      )}

      {state.screen === "mission" && (
        <section className="chain-home mission-only">
          <CryptoGate
            onSolved={() => updateState({ cryptoSolved: true, screen: "trace" })}
          />
        </section>
      )}

      {state.screen === "trace" && (
        <GateTraceScreen onBack={() => updateState({ screen: "mission" })} />
      )}
    </main>
  );
}
