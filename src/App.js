import React, { useState } from 'react';
import SetTimer from "./components/SetTimer";
import Timer from "./components/Timer";
import './App.css';


function App() {

  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timerIsRunning, setTimerIsRunning] = useState(false);

  // Time setting handlers
  const addSessionLength = () => {
    if (sessionLength < 60) {
      setSessionLength(prevLength => prevLength + 1);
    }
  }

  const reduceSessionLength = () => {
    if (sessionLength > 0) {
      setSessionLength(prevLength => prevLength - 1);
    }
  }

  const addBreakLength = () => {
    if (breakLength < 60) {
      setBreakLength(prevBreak => prevBreak + 1);
    }
  }

  const reduceBreakLength = () => {
    if (breakLength > 0) {
      setBreakLength(prevBreak => prevBreak - 1)
    }
  }

  const isTimerRunning = (bool) => {
    if (typeof bool == "boolean") {
      setTimerIsRunning(bool);
    }
  }

  return (
    <div className="App container">
      <h1>
        Pomodoro Tracker
      </h1>
      <div className="timer">
        <Timer sessionLength={sessionLength} breakLength={breakLength} isTimerRunning={isTimerRunning} />
      </div>
      <div className="settings-controllers">
        <SetTimer time={sessionLength} incrementFunc={addSessionLength} decrementFunc={reduceSessionLength} timerIsRunning={timerIsRunning} />
        <SetTimer time={breakLength} incrementFunc={addBreakLength} decrementFunc={reduceBreakLength} timerIsRunning={timerIsRunning} />
      </div>
    </div>
  );
}

export default App;
