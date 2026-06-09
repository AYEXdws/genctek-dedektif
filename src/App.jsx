import React, { useMemo, useState } from "react";
import "./App.css";
import { tasks } from "./data/tasks";
import { createBadgeId, createBadgePayload } from "./utils/badge";
import IntroScreen from "./components/IntroScreen";
import ProgressPanel from "./components/ProgressPanel";
import TaskCard from "./components/TaskCard";
import FinalScreen from "./components/FinalScreen";
import BadgeCreator from "./components/BadgeCreator";
import CompletionScreen from "./components/CompletionScreen";

const STORAGE_KEY = "genctek-dijital-dedektifler";

const initialState = {
  started: false,
  activeStep: 0,
  completedTasks: [],
  badgeId: "",
  userName: "",
  badge: null,
  completionTaskId: "",
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

  const solveTask = (taskId) => {
    if (state.completedTasks.includes(taskId)) return;

    const completedTasks = [...state.completedTasks, taskId];

    updateState({
      completedTasks,
      completionTaskId: taskId
    });
  };

  const continueAfterCompletion = () => {
    const isFinalTask = state.completedTasks.length === tasks.length;

    updateState({
      activeStep: isFinalTask ? tasks.length : state.activeStep + 1,
      completionTaskId: ""
    });
  };

  const createBadge = (name) => {
    const badgeId = state.badgeId || createBadgeId();
    const badge = createBadgePayload(name, badgeId);
    updateState({ userName: name, badgeId, badge });
  };

  const currentTask = tasks[state.activeStep];
  const isArchiveComplete = state.completedTasks.length === tasks.length;
  const completionTask = tasks.find((task) => task.id === state.completionTaskId);

  return (
    <main className="app-shell">
      <button className="reset-button" onClick={resetExperience} type="button">
        Baştan Başla
      </button>

      {!state.started && <IntroScreen onStart={startMission} />}

      {state.started && completionTask && (
        <section className="mission-view">
          <ProgressPanel
            activeArea={completionTask.area}
            completedCount={state.completedTasks.length}
            integrity={archiveIntegrity}
          />
          <CompletionScreen
            completedCount={state.completedTasks.length}
            integrity={archiveIntegrity}
            isFinal={state.completedTasks.length === tasks.length}
            onContinue={continueAfterCompletion}
            task={completionTask}
          />
        </section>
      )}

      {state.started && !completionTask && !isArchiveComplete && currentTask && (
        <section className="mission-view">
          <ProgressPanel
            activeArea={currentTask.area}
            completedCount={state.completedTasks.length}
            integrity={archiveIntegrity}
          />
          <TaskCard task={currentTask} onSolved={solveTask} />
        </section>
      )}

      {state.started && !completionTask && isArchiveComplete && !state.badge && (
        <FinalScreen onCreateIdentity={() => updateState({ identityRequested: true })}>
          {state.identityRequested && (
            <BadgeCreator
              savedName={state.userName}
              onCreateBadge={createBadge}
            />
          )}
        </FinalScreen>
      )}

      {state.started && !completionTask && isArchiveComplete && state.badge && (
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
