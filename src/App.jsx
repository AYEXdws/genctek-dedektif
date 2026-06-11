import React, { useMemo, useState } from "react";
import "./App.css";
import { tasks } from "./data/tasks";
import { createBadgeId, createBadgePayload } from "./utils/badge";
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
import ProgressPanel from "./components/ProgressPanel";
import ScoreIntro from "./components/ScoreIntro";
import TaskCard from "./components/TaskCard";

const STORAGE_KEY = "genctek-dijital-dedektifler";
const STATE_VERSION = 2;

const initialState = {
  version: STATE_VERSION,
  screen: "intro",
  activeTaskIndex: 0,
  completedTasks: [],
  totalScore: 0,
  taskScores: {},
  hintUsage: {},
  badgeId: "",
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

    return { ...initialState, ...parsed };
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

  const currentTask = tasks[state.activeTaskIndex] || tasks[0];
  const completedCount = state.completedTasks.length;
  const hintCount = useMemo(() => getHintCount(state.hintUsage), [state.hintUsage]);
  const currentTaskScore = getTaskScore(Boolean(state.hintUsage[currentTask.id]));
  const totalScore = getTotalScore(state.taskScores);
  const detectiveRank = getDetectiveRank(totalScore);

  const resetExperience = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
  };

  const updateState = (patch) => {
    setState((current) => saveState({ ...current, ...patch }));
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
      if (current.completedTasks.includes(taskId)) return current;

      const score = getTaskScore(Boolean(current.hintUsage[taskId]));
      const taskScores = { ...current.taskScores, [taskId]: score };
      const nextTotalScore = getTotalScore(taskScores);

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
      screen: isFinalTask ? "final" : "briefing"
    });
  };

  const createBadge = (name) => {
    const badgeId = state.badgeId || createBadgeId();
    const certificatePayload = createBadgePayload(name, badgeId, {
      detectiveRank,
      hintCount,
      totalScore
    });

    updateState({
      badgeId,
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
      totalScore={totalScore}
    />
  );

  return (
    <main className="app-shell">
      <button className="reset-button" onClick={resetExperience} type="button">
        Baştan Başla
      </button>

      {state.screen === "intro" && (
        <IntroScreen onStart={() => updateState({ screen: "score" })} />
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
