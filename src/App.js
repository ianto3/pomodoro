import React, { useState } from 'react';
import SetTimer from "./components/SetTimer";
import Timer from "./components/Timer";


function App() {

  const [sessionLength, setSessionLength] = useState(20);
  const [breakLength, setBreakLength] = useState(5);
  const [timerIsRunning, setTimerIsRunning] = useState(false);

  const addSessionLength = () => {
    if (sessionLength < 60) {
      setSessionLength(prevLength => prevLength + 1);
    }
  }

  const reduceSessionLength = () => {
    if (sessionLength > 1) {
      setSessionLength(prevLength => prevLength - 1);
    }
  }

  const addBreakLength = () => {
    if (breakLength < 60) {
      setBreakLength(prevBreak => prevBreak + 1);
    }
  }

  const reduceBreakLength = () => {
    if (breakLength > 1) {
      setBreakLength(prevBreak => prevBreak - 1)
    }
  }

  const isTimerRunning = (bool) => {
    if (typeof bool == "boolean") {
      setTimerIsRunning(bool);
    }
  }

  return (
    <div className="App">
      <header className="container">
        <h1>
          Pomodoro Timer
        </h1>
      </header>

      <main className="container">
        <div className="timer">
          <Timer sessionLength={sessionLength} breakLength={breakLength} isTimerRunning={isTimerRunning} />
        </div>
        <div className="settings-controllers">
          <div className="settings-group">
            <h3>Session Length</h3>
            <SetTimer time={sessionLength} incrementFunc={addSessionLength} decrementFunc={reduceSessionLength} timerIsRunning={timerIsRunning} />
          </div>
          <div className="settings-group">
            <h3>Break Length</h3>
            <SetTimer time={breakLength} incrementFunc={addBreakLength} decrementFunc={reduceBreakLength} timerIsRunning={timerIsRunning} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
