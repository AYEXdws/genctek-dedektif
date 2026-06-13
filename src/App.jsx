import React, { useMemo, useState } from "react";
import "./App.css";
import { tasks } from "./data/tasks";
import { createBadgePayload } from "./utils/badge";
import {
  getDetectiveRank,
  getHintCount,
  getTaskScore,
  getTotalScore
} from "./utils/scoring";
import BadgeCreator from "./components/BadgeCreator";
import CompletionScreen from "./components/CompletionScreen";
import FinalScreen from "./components/FinalScreen";
import IntroScreen from "./components/IntroScreen";
import MissionBriefing from "./components/MissionBriefing";
import OperationBootSequence from "./components/OperationBootSequence";
import OperationCloseSequence from "./components/OperationCloseSequence";
import ProgressPanel from "./components/ProgressPanel";
import ScoreIntro from "./components/ScoreIntro";
import TaskCard from "./components/TaskCard";

const STORAGE_KEY = "genctek-dijital-dedektifler";
const STATE_VERSION = 2;
const VALID_SCREENS = new Set([
  "intro",
  "boot",
  "score",
  "briefing",
  "task",
  "completion",
  "closing",
  "final",
  "identity"
]);
const TASK_IDS = tasks.map((task) => task.id);
const TASK_ID_SET = new Set(TASK_IDS);

const initialState = {
  version: STATE_VERSION,
  screen: "intro",
  activeTaskIndex: 0,
  completedTasks: [],
  totalScore: 0,
  taskScores: {},
  hintUsage: {},
  bootCompleted: false,
  userName: "",
  detectiveRank: "Aday Dedektif",
  certificatePayload: null
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialState;

    const parsed = JSON.parse(saved);
    if (parsed.version !== STATE_VERSION) return initialState;

    const sanitizedState = sanitizeState({ ...initialState, ...parsed });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizedState));
    return sanitizedState;
  } catch {
    return initialState;
  }
}

function saveState(nextState) {
  const sanitizedState = sanitizeState(nextState);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizedState));
  return sanitizedState;
}

function clampTaskIndex(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return 0;
  return Math.max(0, Math.min(Math.trunc(numericValue), tasks.length - 1));
}

function getUniqueValidCompletedTasks(value) {
  if (!Array.isArray(value)) return [];

  const seen = new Set();
  return value.filter((taskId) => {
    if (!TASK_ID_SET.has(taskId) || seen.has(taskId)) return false;
    seen.add(taskId);
    return true;
  });
}

function getValidHintUsage(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return TASK_IDS.reduce((usage, taskId) => {
    if (value[taskId] === true) usage[taskId] = true;
    return usage;
  }, {});
}

function getSafeTaskScores(completedTasks, hintUsage) {
  return completedTasks.reduce((scores, taskId) => {
    scores[taskId] = getTaskScore(Boolean(hintUsage[taskId]));
    return scores;
  }, {});
}

function sanitizeState(nextState) {
  const requestedActiveTaskIndex = clampTaskIndex(nextState.activeTaskIndex);
  const completedTasks = getUniqueValidCompletedTasks(nextState.completedTasks);
  const hintUsage = getValidHintUsage(nextState.hintUsage);
  const taskScores = getSafeTaskScores(completedTasks, hintUsage);
  const totalScore = getTotalScore(taskScores, TASK_IDS);
  const hintCount = getHintCount(hintUsage);
  const detectiveRank = getDetectiveRank(totalScore);
  const allTasksCompleted = completedTasks.length === tasks.length;
  const maxAccessibleTaskIndex = allTasksCompleted
    ? tasks.length - 1
    : Math.min(completedTasks.length, tasks.length - 1);
  const activeTaskIndex = Math.min(requestedActiveTaskIndex, maxAccessibleTaskIndex);
  const requestedScreen = VALID_SCREENS.has(nextState.screen)
    ? nextState.screen
    : initialState.screen;
  const protectedScreens = new Set(["closing", "final", "identity"]);
  const screen = protectedScreens.has(requestedScreen) && !allTasksCompleted
    ? "briefing"
    : requestedScreen;
  const userName = typeof nextState.userName === "string" ? nextState.userName : "";
  const storedCertificateName =
    typeof nextState.certificatePayload?.name === "string"
      ? nextState.certificatePayload.name
      : "";
  const certificateName = storedCertificateName || userName;
  const certificatePayload = allTasksCompleted && certificateName
    ? createBadgePayload(certificateName, {
        detectiveRank,
        hintCount,
        totalScore
      })
    : null;

  return {
    ...initialState,
    ...nextState,
    activeTaskIndex,
    bootCompleted: nextState.bootCompleted === true,
    certificatePayload,
    completedTasks,
    detectiveRank,
    hintUsage,
    screen,
    taskScores,
    totalScore,
    userName,
    version: STATE_VERSION
  };
}

export default function App() {
  const [state, setState] = useState(loadState);

  const currentTask = tasks[state.activeTaskIndex] || tasks[0];
  const completedCount = state.completedTasks.length;
  const hintCount = useMemo(() => getHintCount(state.hintUsage), [state.hintUsage]);
  const currentTaskScore = getTaskScore(Boolean(state.hintUsage[currentTask.id]));
  const totalScore = getTotalScore(state.taskScores, TASK_IDS);
  const detectiveRank = getDetectiveRank(totalScore);

  const resetExperience = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
  };

  const updateState = (patch) => {
    setState((current) => saveState({ ...current, ...patch }));
  };

  const startOperation = () => {
    updateState({ screen: state.bootCompleted ? "score" : "boot" });
  };

  const completeBootSequence = () => {
    updateState({ bootCompleted: true, screen: "score" });
  };

  const useHint = (taskId) => {
    setState((current) => {
      if (current.hintUsage[taskId]) return current;
      return saveState({
        ...current,
        hintUsage: { ...current.hintUsage, [taskId]: true }
      });
    });
  };

  const solveTask = (taskId) => {
    setState((current) => {
      if (current.completedTasks.includes(taskId)) {
        return saveState({
          ...current,
          screen: "completion"
        });
      }

      const score = getTaskScore(Boolean(current.hintUsage[taskId]));
      const taskScores = { ...current.taskScores, [taskId]: score };
      const nextTotalScore = getTotalScore(taskScores, TASK_IDS);

      return saveState({
        ...current,
        completedTasks: [...current.completedTasks, taskId],
        detectiveRank: getDetectiveRank(nextTotalScore),
        screen: "completion",
        taskScores,
        totalScore: nextTotalScore
      });
    });
  };

  const continueAfterCompletion = () => {
    const isFinalTask = state.completedTasks.length === tasks.length;

    updateState({
      activeTaskIndex: isFinalTask
        ? tasks.length - 1
        : Math.min(state.activeTaskIndex + 1, tasks.length - 1),
      screen: isFinalTask ? "closing" : "briefing"
    });
  };

  const goToTask = (taskIndex) => {
    const nextIndex = Math.max(0, Math.min(taskIndex, tasks.length - 1));

    updateState({
      activeTaskIndex: nextIndex,
      screen: "briefing"
    });
  };

  const createBadge = (name) => {
    if (state.completedTasks.length !== tasks.length) return;

    const certificatePayload = createBadgePayload(name, {
      detectiveRank,
      hintCount,
      totalScore
    });

    updateState({
      certificatePayload,
      detectiveRank,
      screen: "identity",
      totalScore,
      userName: name
    });
  };

  const progressPanel = (
    <ProgressPanel
      activeArea={currentTask.area}
      activeTaskIndex={state.activeTaskIndex}
      completedCount={completedCount}
      currentTaskScore={currentTaskScore}
      hintUsed={Boolean(state.hintUsage[currentTask.id])}
      onGoToTask={goToTask}
      totalScore={totalScore}
    />
  );

  return (
    <main className="app-shell">
      <button className="reset-button" onClick={resetExperience} type="button">
        Baştan Başla
      </button>

      {state.screen === "intro" && (
        <IntroScreen onStart={startOperation} />
      )}

      {state.screen === "boot" && (
        <OperationBootSequence onComplete={completeBootSequence} />
      )}

      {state.screen === "score" && (
        <ScoreIntro onContinue={() => updateState({ screen: "briefing" })} />
      )}

      {state.screen === "briefing" && (
        <section className="mission-view">
          {progressPanel}
          <MissionBriefing
            completedCount={completedCount}
            onStartTask={() => updateState({ screen: "task" })}
            task={currentTask}
          />
        </section>
      )}

      {state.screen === "task" && (
        <section className="mission-view">
          {progressPanel}
          <TaskCard
            hintUsed={Boolean(state.hintUsage[currentTask.id])}
            onBackToBriefing={() => updateState({ screen: "briefing" })}
            onSolved={solveTask}
            onUseHint={useHint}
            task={currentTask}
          />
        </section>
      )}

      {state.screen === "completion" && (
        <section className="mission-view">
          {progressPanel}
          <CompletionScreen
            hintUsed={Boolean(state.hintUsage[currentTask.id])}
            isFinal={completedCount === tasks.length}
            onContinue={continueAfterCompletion}
            task={currentTask}
            taskScore={state.taskScores[currentTask.id] || currentTaskScore}
            totalScore={totalScore}
          />
        </section>
      )}

      {state.screen === "closing" && (
        <OperationCloseSequence onComplete={() => updateState({ screen: "final" })} />
      )}

      {state.screen === "final" && (
        <FinalScreen
          detectiveRank={detectiveRank}
          hintCount={hintCount}
          onCreateIdentity={() => updateState({ screen: "identity" })}
          totalScore={totalScore}
        />
      )}

      {state.screen === "identity" && (
        <section className="badge-view">
          {progressPanel}
          <BadgeCreator
            badge={state.certificatePayload}
            onCreateBadge={createBadge}
            savedName={state.userName}
          />
        </section>
      )}
    </main>
  );
}
