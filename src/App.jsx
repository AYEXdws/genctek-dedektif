import React, { useMemo, useState } from "react";
import "./App.css";
import { tasks } from "./data/tasks";
import { createBadgeId, createBadgePayload } from "./utils/badge";
import IntroScreen from "./components/IntroScreen";
import ProgressPanel from "./components/ProgressPanel";
import TaskCard from "./components/TaskCard";
import FinalScreen from "./components/FinalScreen";
import BadgeCreator from "./components/BadgeCreator";

const STORAGE_KEY = "genctek-dijital-dedektifler";

const initialState = {
  started: false,
  activeStep: 0,
  completedTasks: [],
  badgeId: "",
  userName: "",
  badge: null,
  identityRequested: false
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...initialState, ...JSON.parse(saved) } : initialState;
  } catch {
    return initialState;
  }
}

function saveState(nextState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  return nextState;
}

export default function App() {
  const [state, setState] = useState(loadState);

  const archiveIntegrity = useMemo(() => {
    return [25, 50, 75, 90, 100][state.completedTasks.length] || 25;
  }, [state.completedTasks.length]);

  const resetExperience = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
  };

  const updateState = (patch) => {
    setState((current) => saveState({ ...current, ...patch }));
  };

  const startMission = () => updateState({ started: true });

  const completeTask = (taskId) => {
    if (state.completedTasks.includes(taskId)) return;

    const completedTasks = [...state.completedTasks, taskId];
    const isFinalTask = completedTasks.length === tasks.length;

    updateState({
      completedTasks,
      activeStep: isFinalTask ? tasks.length : state.activeStep + 1
    });
  };

  const createBadge = (name) => {
    const badgeId = state.badgeId || createBadgeId();
    const badge = createBadgePayload(name, badgeId);
    updateState({ userName: name, badgeId, badge });
  };

  const currentTask = tasks[state.activeStep];
  const isArchiveComplete = state.completedTasks.length === tasks.length;

  return (
    <main className="app-shell">
      <button className="reset-button" onClick={resetExperience} type="button">
        Baştan Başla
      </button>

      {!state.started && <IntroScreen onStart={startMission} />}

      {state.started && !isArchiveComplete && currentTask && (
        <section className="mission-view">
          <ProgressPanel
            activeArea={currentTask.area}
            completedCount={state.completedTasks.length}
            integrity={archiveIntegrity}
          />
          <TaskCard task={currentTask} onComplete={completeTask} />
        </section>
      )}

      {state.started && isArchiveComplete && !state.badge && (
        <FinalScreen onCreateIdentity={() => updateState({ identityRequested: true })}>
          {state.identityRequested && (
            <BadgeCreator
              savedName={state.userName}
              onCreateBadge={createBadge}
            />
          )}
        </FinalScreen>
      )}

      {state.started && isArchiveComplete && state.badge && (
        <section className="badge-view">
          <ProgressPanel
            activeArea="Sistem Doğrulama"
            completedCount={4}
            integrity={100}
          />
          <BadgeCreator
            savedName={state.userName}
            badge={state.badge}
            onCreateBadge={createBadge}
          />
        </section>
      )}
    </main>
  );
}
